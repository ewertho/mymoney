import dotenv from "dotenv";

dotenv.config();

const required = ["JWT_SECRET", "MONGO_URI"] as const;

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 3000),
  mongoUri: process.env.MONGO_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "12h",
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
};
