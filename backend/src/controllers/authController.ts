import { Request, Response } from "express";
import {
  loginService,
  signupService,
  verifyTokenService,
} from "../services/authService";

const emailRegex = /\S+@\S+\.\S+/;

export async function signup(req: Request, res: Response): Promise<void> {
  const { name, email, password } = req.body as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!name || !email || !password) {
    res.status(400).json({ message: "Nome, email e senha são obrigatórios." });
    return;
  }

  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Email inválido." });
    return;
  }

  if (password.length < 8) {
    res
      .status(400)
      .json({ message: "A senha deve ter no mínimo 8 caracteres." });
    return;
  }

  const result = await signupService(name, email, password);
  res.status(201).json(result);
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    res.status(400).json({ message: "Email e senha são obrigatórios." });
    return;
  }

  const result = await loginService(email, password);
  res.json(result);
}

export function validateToken(req: Request, res: Response): void {
  const token =
    (req.body?.token as string | undefined) ??
    req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    res.json({ valid: false });
    return;
  }

  res.json({ valid: verifyTokenService(token) });
}
