import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AppError } from "../errors/AppError";
import { UserModel } from "../models/User";

type AuthResult = {
  token: string;
  user: { id: string; name: string; email: string };
};

function createToken(userId: string, email: string): string {
  const expiresIn = env.jwtExpiresIn as jwt.SignOptions["expiresIn"];
  return jwt.sign({ sub: userId, email }, env.jwtSecret as jwt.Secret, {
    expiresIn,
  });
}

export async function signupService(
  name: string,
  email: string,
  password: string,
): Promise<AuthResult> {
  const existing = await UserModel.findOne({ email: email.toLowerCase() });
  if (existing) {
    throw new AppError(409, "Usuário já cadastrado.");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    name,
    email: email.toLowerCase(),
    passwordHash,
  });

  const token = createToken(user.id, user.email);
  return { token, user: { id: user.id, name: user.name, email: user.email } };
}

export async function loginService(
  email: string,
  password: string,
): Promise<AuthResult> {
  const user = await UserModel.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new AppError(401, "Usuário ou senha inválidos.");
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) {
    throw new AppError(401, "Usuário ou senha inválidos.");
  }

  const token = createToken(user.id, user.email);
  return { token, user: { id: user.id, name: user.name, email: user.email } };
}

export function verifyTokenService(token: string): boolean {
  try {
    jwt.verify(token, env.jwtSecret);
    return true;
  } catch {
    return false;
  }
}
