import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { env } from "./config/env";
import { errorMiddleware } from "./middlewares/error";
import { routes } from "./routes";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerDocument = require("../swagger_output.json");

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigin }));
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", routes);
app.use(errorMiddleware);
