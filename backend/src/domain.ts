// Regras de negócio puras: sem Express, sem Mongo. Tudo aqui é testável com node --test.
import { z } from "zod";

export const CATEGORIES = [
  "housing",
  "food",
  "transport",
  "health",
  "education",
  "leisure",
  "other",
] as const;
export type Category = (typeof CATEGORIES)[number];

// Dinheiro é sempre inteiro em centavos; float só existe na formatação da tela.
const cents = z.number().int().min(0).max(100_000_000_00);
const name = z.string().trim().min(1).max(80);
const isoDate = z.iso.date();

export const creditSchema = z.object({
  name,
  cents,
  recurring: z.boolean().default(false),
});

export const debtSchema = z.object({
  name,
  cents,
  category: z.enum(CATEGORIES).default("other"),
  recurring: z.boolean().default(false),
  dueDate: isoDate.nullable().default(null),
  paidAt: isoDate.nullable().default(null),
});

export const cycleBodySchema = z.object({
  credits: z.array(creditSchema).max(200).default([]),
  debts: z.array(debtSchema).max(500).default([]),
  notes: z.string().max(2000).default(""),
});

export const periodSchema = z.object({
  year: z.coerce.number().int().min(2000).max(2100),
  month: z.coerce.number().int().min(1).max(12),
});

export const budgetsSchema = z.partialRecord(z.enum(CATEGORIES), cents);

export type Credit = z.infer<typeof creditSchema>;
export type Debt = z.infer<typeof debtSchema>;
export type CycleBody = z.infer<typeof cycleBodySchema>;
export type Period = z.infer<typeof periodSchema>;
export type Budgets = z.infer<typeof budgetsSchema>;
export type Cycle = Period & CycleBody;

export type DebtStatus = "paid" | "overdue" | "pending";

/** `today` no formato YYYY-MM-DD; datas ISO comparam corretamente como string. */
export function debtStatus(debt: Debt, today: string): DebtStatus {
  if (debt.paidAt) return "paid";
  if (debt.dueDate && debt.dueDate < today) return "overdue";
  return "pending";
}

export function nextPeriod({ year, month }: Period): Period {
  return month === 12 ? { year: year + 1, month: 1 } : { year, month: month + 1 };
}

/** Avança um mês mantendo o dia, limitado ao último dia do mês seguinte (31/01 -> 28/02). */
export function shiftMonth(date: string): string {
  const [y, m, d] = date.split("-").map(Number) as [number, number, number];
  const next = nextPeriod({ year: y, month: m });
  const lastDay = new Date(Date.UTC(next.year, next.month, 0)).getUTCDate();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${next.year}-${pad(next.month)}-${pad(Math.min(d, lastDay))}`;
}

/** Virada de mês: só o que é recorrente segue adiante, e as contas voltam a ficar em aberto. */
export function rollover(cycle: Cycle): Cycle {
  return {
    ...nextPeriod(cycle),
    notes: "",
    credits: cycle.credits.filter((c) => c.recurring),
    debts: cycle.debts
      .filter((d) => d.recurring)
      .map((d) => ({
        ...d,
        paidAt: null,
        dueDate: d.dueDate ? shiftMonth(d.dueDate) : null,
      })),
  };
}

const sum = (items: { cents: number }[]) =>
  items.reduce((total, item) => total + item.cents, 0);

export function totals(cycle: CycleBody) {
  const income = sum(cycle.credits);
  const expense = sum(cycle.debts);
  const paid = sum(cycle.debts.filter((d) => d.paidAt));
  return { income, expense, paid, open: expense - paid, balance: income - expense };
}

export function summarize(
  cycles: Cycle[],
  budgets: Budgets,
  period: Period,
  today: string,
) {
  const key = (p: Period) => p.year * 12 + p.month;
  const current = cycles.find((c) => key(c) === key(period));
  const month = totals(current ?? { credits: [], debts: [], notes: "" });

  const categories = CATEGORIES.map((category) => {
    const spent = sum(current?.debts.filter((d) => d.category === category) ?? []);
    const budget = budgets[category] ?? null;
    return { category, spent, budget, over: budget !== null && spent > budget };
  }).filter((c) => c.spent > 0 || c.budget !== null);

  // Vencidos olham todos os meses: uma conta de agosto em aberto continua sendo problema em outubro.
  const overdue = cycles
    .flatMap((c) =>
      c.debts
        .filter((d) => debtStatus(d, today) === "overdue")
        .map((d) => ({ year: c.year, month: c.month, name: d.name, cents: d.cents, dueDate: d.dueDate! })),
    )
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  const series = Array.from({ length: 6 }, (_, i) => {
    const k = key(period) - (5 - i);
    const p = { year: Math.floor((k - 1) / 12), month: ((k - 1) % 12) + 1 };
    const found = cycles.find((c) => key(c) === k);
    const t = totals(found ?? { credits: [], debts: [], notes: "" });
    return { ...p, income: t.income, expense: t.expense };
  });

  return {
    ...month,
    savingsRate: month.income > 0 ? Math.round((month.balance / month.income) * 100) : 0,
    categories,
    overdue,
    series,
  };
}
