import { api } from "../../api";
import type { AuthResult } from "../../types/domain";

export async function login(
  email: string,
  password: string,
): Promise<AuthResult> {
  const { data } = await api.post<AuthResult>("/auth/login", {
    email,
    password,
  });
  return data;
}

export async function signup(
  name: string,
  email: string,
  password: string,
): Promise<AuthResult> {
  const { data } = await api.post<AuthResult>("/auth/signup", {
    name,
    email,
    password,
  });
  return data;
}
