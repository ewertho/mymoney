import bcrypt from "bcryptjs";
import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { z, ZodError } from "zod";
import {
  budgetsSchema,
  cycleBodySchema,
  periodSchema,
  rollover,
  summarize,
  type Cycle,
} from "./domain.ts";
import { env } from "./env.ts";
import { CycleModel, User } from "./models.ts";

class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const signupSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().max(160),
  password: z.string().min(8).max(128),
});
const loginSchema = signupSchema.pick({ email: true, password: true });

const session = (user: { id: string; name: string; email: string }) => ({
  token: jwt.sign({ sub: user.id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  }),
  user: { id: user.id, name: user.name, email: user.email },
});

// Só os campos do domínio saem do banco: nada de userId, __v ou timestamps na resposta.
const cycleFields = "-_id year month notes credits debts";
const today = () => new Date().toISOString().slice(0, 10);

export const app = express();

app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN.split(",") }));
app.use(express.json({ limit: "200kb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

const api = express.Router();
app.use("/api", api);

// Login e cadastro são o alvo óbvio de força bruta.
const authLimiter = rateLimit({ windowMs: 15 * 60_000, limit: 30, standardHeaders: "draft-8", legacyHeaders: false });

api.post("/auth/signup", authLimiter, async (req, res) => {
  const { name, email, password } = signupSchema.parse(req.body);
  if (await User.exists({ email: email.toLowerCase() })) {
    throw new HttpError(409, "Este e-mail já tem conta.");
  }
  const user = await User.create({ name, email, passwordHash: await bcrypt.hash(password, 12) });
  res.status(201).json(session(user));
});

api.post("/auth/login", authLimiter, async (req, res) => {
  const { email, password } = loginSchema.parse(req.body);
  const user = await User.findOne({ email: email.toLowerCase() });
  // Mesma mensagem para e-mail inexistente e senha errada: não revela quem tem conta.
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new HttpError(401, "E-mail ou senha incorretos.");
  }
  res.json(session(user));
});

api.use((req, res, next) => {
  const token = req.headers.authorization?.replace(/^Bearer /, "");
  try {
    res.locals.userId = (jwt.verify(token ?? "", env.JWT_SECRET) as { sub: string }).sub;
    next();
  } catch {
    throw new HttpError(401, "Sessão expirada. Entre de novo.");
  }
});

const userId = (res: Response) => new Types.ObjectId(res.locals.userId as string);

api.get("/budgets", async (_req, res) => {
  const user = await User.findById(userId(res)).select("budgets").lean();
  res.json(user?.budgets ?? {});
});

api.put("/budgets", async (req, res) => {
  const budgets = budgetsSchema.parse(req.body);
  await User.updateOne({ _id: userId(res) }, { budgets });
  res.json(budgets);
});

api.get("/cycles/:year/:month", async (req, res) => {
  const period = periodSchema.parse(req.params);
  const cycle = await CycleModel.findOne({ userId: userId(res), ...period }).select(cycleFields).lean();
  // Mês sem lançamentos não é erro: é um mês vazio.
  res.json(cycle ?? { ...period, notes: "", credits: [], debts: [] });
});

api.put("/cycles/:year/:month", async (req, res) => {
  const period = periodSchema.parse(req.params);
  const body = cycleBodySchema.parse(req.body);
  // ponytail: o ciclo é salvo inteiro, última gravação vence. Trocar por versão (If-Match) se houver edição simultânea.
  const cycle = await CycleModel.findOneAndUpdate(
    { userId: userId(res), ...period },
    { $set: body },
    { upsert: true, returnDocument: "after", runValidators: true },
  ).select(cycleFields).lean();
  res.json(cycle);
});

api.delete("/cycles/:year/:month", async (req, res) => {
  const period = periodSchema.parse(req.params);
  await CycleModel.deleteOne({ userId: userId(res), ...period });
  res.status(204).end();
});

api.post("/cycles/:year/:month/rollover", async (req, res) => {
  const period = periodSchema.parse(req.params);
  const cycle = await CycleModel.findOne({ userId: userId(res), ...period }).select(cycleFields).lean<Cycle>();
  if (!cycle) throw new HttpError(404, "Este mês ainda não tem lançamentos para levar adiante.");

  const next = rollover(cycle);
  try {
    await CycleModel.create({ ...next, userId: userId(res) });
  } catch (error) {
    // O índice único decide a corrida entre duas viradas simultâneas.
    if ((error as { code?: number }).code === 11000) {
      throw new HttpError(409, "O mês seguinte já existe. Abra-o para editar.");
    }
    throw error;
  }
  res.status(201).json(next);
});

api.get("/summary/:year/:month", async (req, res) => {
  const period = periodSchema.parse(req.params);
  const [cycles, user] = await Promise.all([
    CycleModel.find({ userId: userId(res) }).select(cycleFields).lean<Cycle[]>(),
    User.findById(userId(res)).select("budgets").lean(),
  ]);
  res.json(summarize(cycles, user?.budgets ?? {}, period, today()));
});

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof ZodError) {
    res.status(400).json({ message: "Dados inválidos.", issues: z.flattenError(error).fieldErrors });
    return;
  }
  if (error instanceof HttpError) {
    res.status(error.status).json({ message: error.message });
    return;
  }
  console.error(error);
  res.status(500).json({ message: "Erro interno." });
});
