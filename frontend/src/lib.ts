import { create } from "zustand";
import { persist } from "zustand/middleware";

export const CATEGORIES = ["housing", "food", "transport", "health", "education", "leisure", "other"] as const;
export type Category = (typeof CATEGORIES)[number];

export type Credit = { name: string; cents: number; recurring: boolean };
export type Debt = Credit & { category: Category; dueDate: string | null; paidAt: string | null };
export type Period = { year: number; month: number };
export type Cycle = Period & { notes: string; credits: Credit[]; debts: Debt[] };
export type Budgets = Partial<Record<Category, number>>;
export type Summary = {
  income: number;
  expense: number;
  paid: number;
  open: number;
  balance: number;
  savingsRate: number;
  categories: { category: Category; spent: number; budget: number | null; over: boolean }[];
  overdue: (Period & { name: string; cents: number; dueDate: string })[];
  series: (Period & { income: number; expense: number })[];
};
export type User = { id: string; name: string; email: string };

type Language = "pt-BR" | "en-US";

type Store = {
  token: string | null;
  user: User | null;
  hideValues: boolean;
  theme: "light" | "dark" | null;
  language: Language;
  setSession: (token: string | null, user: User | null) => void;
  set: (patch: Partial<Pick<Store, "hideValues" | "theme" | "language">>) => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      hideValues: false,
      theme: null, // null = segue o sistema
      language: navigator.language.startsWith("pt") ? "pt-BR" : "en-US",
      setSession: (token, user) => set({ token, user }),
      set,
    }),
    { name: "mymoney" },
  ),
);

export class ApiError extends Error {}

export async function api<T>(path: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const { token, setSession } = useStore.getState();
  const response = await fetch(`/api${path}`, {
    method: init?.method ?? "GET",
    headers: {
      ...(init?.body !== undefined && { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: init?.body === undefined ? undefined : JSON.stringify(init.body),
  });
  if (response.status === 401 && token) setSession(null, null);
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new ApiError(data?.message ?? `Erro ${response.status}`);
  }
  return response.status === 204 ? (undefined as T) : response.json();
}

/** "1.234,56" e "1234.56" viram 123456. Retorna null se não for um valor válido. */
export function parseCents(input: string): number | null {
  const clean = input.replace(/[^\d.,]/g, "");
  const normalized = clean.includes(",") ? clean.replace(/\./g, "").replace(",", ".") : clean;
  const value = Number(normalized);
  return normalized !== "" && Number.isFinite(value) && value >= 0 ? Math.round(value * 100) : null;
}

export const today = () => new Date().toLocaleDateString("sv"); // sv = YYYY-MM-DD, no fuso local

export const shift = ({ year, month }: Period, by: number): Period => {
  const k = year * 12 + (month - 1) + by;
  return { year: Math.floor(k / 12), month: (k % 12) + 1 };
};
