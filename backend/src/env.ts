import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(4007),
  MONGO_URI: z.string().min(1),
  JWT_SECRET: z.string().min(16, "JWT_SECRET precisa de pelo menos 16 caracteres"),
  JWT_EXPIRES_IN: z.string().default("12h"),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
});

export const env = schema.parse(process.env);
