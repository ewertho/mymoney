import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

type TokenPayload = {
  sub: string;
  email: string;
};

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (req.method === "OPTIONS") {
    next();
    return;
  }

  const token = req.headers.authorization?.replace("Bearer ", "").trim();

  if (!token) {
    res.status(401).json({ message: "Token ausente." });
    return;
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as TokenPayload;
    req.userId = decoded.sub;
    next();
  } catch {
    res.status(401).json({ message: "Token inválido." });
  }
}
