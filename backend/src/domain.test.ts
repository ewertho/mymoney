import assert from "node:assert/strict";
import { test } from "node:test";
import {
  cycleBodySchema,
  debtStatus,
  rollover,
  shiftMonth,
  summarize,
  type Cycle,
  type Debt,
} from "./domain.ts";

const debt = (over: Partial<Debt>): Debt => ({
  name: "Conta",
  cents: 10_000,
  category: "other",
  recurring: false,
  dueDate: null,
  paidAt: null,
  ...over,
});

test("shiftMonth limita ao último dia e vira o ano", () => {
  assert.equal(shiftMonth("2026-01-31"), "2026-02-28");
  assert.equal(shiftMonth("2028-01-31"), "2028-02-29");
  assert.equal(shiftMonth("2026-12-10"), "2027-01-10");
});

test("debtStatus: pago vence qualquer data; vencimento hoje ainda não está vencido", () => {
  assert.equal(debtStatus(debt({ dueDate: "2026-10-01", paidAt: "2026-10-05" }), "2026-10-10"), "paid");
  assert.equal(debtStatus(debt({ dueDate: "2026-10-09" }), "2026-10-10"), "overdue");
  assert.equal(debtStatus(debt({ dueDate: "2026-10-10" }), "2026-10-10"), "pending");
  assert.equal(debtStatus(debt({}), "2026-10-10"), "pending");
});

const october: Cycle = {
  year: 2026,
  month: 10,
  notes: "anotação",
  credits: [
    { name: "Salário", cents: 500_000, recurring: true },
    { name: "Freela", cents: 80_000, recurring: false },
  ],
  debts: [
    debt({ name: "Aluguel", cents: 180_000, category: "housing", recurring: true, dueDate: "2026-10-05", paidAt: "2026-10-05" }),
    debt({ name: "Mercado", cents: 90_000, category: "food" }),
    debt({ name: "Internet", cents: 12_000, category: "housing", recurring: true, dueDate: "2026-10-08" }),
  ],
};

test("rollover leva só o recorrente, reabre as contas e avança o vencimento", () => {
  const next = rollover({ ...october, year: 2026, month: 12 });
  assert.deepEqual([next.year, next.month], [2027, 1]);
  assert.deepEqual(next.credits.map((c) => c.name), ["Salário"]);
  assert.deepEqual(next.debts.map((d) => [d.name, d.paidAt, d.dueDate]), [
    ["Aluguel", null, "2026-11-05"],
    ["Internet", null, "2026-11-08"],
  ]);
  assert.equal(next.notes, "");
});

test("summarize: totais, orçamento estourado, vencidos de outros meses e série de 6 meses", () => {
  const august: Cycle = {
    year: 2026, month: 8, notes: "", credits: [],
    debts: [debt({ name: "IPVA", cents: 30_000, dueDate: "2026-08-20" })],
  };
  const s = summarize([october, august], { housing: 150_000, leisure: 20_000 }, { year: 2026, month: 10 }, "2026-10-10");

  assert.equal(s.income, 580_000);
  assert.equal(s.expense, 282_000);
  assert.equal(s.balance, 298_000);
  assert.equal(s.open, 102_000);
  assert.equal(s.savingsRate, 51);

  const housing = s.categories.find((c) => c.category === "housing")!;
  assert.deepEqual([housing.spent, housing.over], [192_000, true]);
  assert.equal(s.categories.find((c) => c.category === "leisure")!.over, false);
  assert.equal(s.categories.some((c) => c.category === "health"), false);

  assert.deepEqual(s.overdue.map((o) => o.name), ["IPVA", "Internet"]);
  assert.deepEqual(s.series.map((p) => p.month), [5, 6, 7, 8, 9, 10]);
  assert.equal(s.series[3]!.expense, 30_000);
});

test("série de 6 meses atravessa a virada de ano", () => {
  const s = summarize([], {}, { year: 2027, month: 2 }, "2027-02-01");
  assert.deepEqual(s.series.map((p) => `${p.year}-${p.month}`), ["2026-9", "2026-10", "2026-11", "2026-12", "2027-1", "2027-2"]);
  assert.equal(s.savingsRate, 0);
});

test("entrada é validada: centavos inteiros, sem campos extras vazando", () => {
  assert.equal(cycleBodySchema.safeParse({ debts: [{ name: "x", cents: 10.5 }] }).success, false);
  assert.equal(cycleBodySchema.safeParse({ debts: [{ name: " ", cents: 1 }] }).success, false);
  const parsed = cycleBodySchema.parse({ userId: "outro", credits: [{ name: "a", cents: 1 }] });
  assert.equal("userId" in parsed, false);
});
