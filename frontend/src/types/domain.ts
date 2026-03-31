export type User = {
  id: string;
  name: string;
  email: string;
};

export type AuthResult = {
  token: string;
  user: User;
};

export type BillingItem = {
  name: string;
  value: number;
};

export type BillingCycle = {
  _id: string;
  name: string;
  month: number;
  year: number;
  recurrence: "MONTHLY" | "ONE_TIME";
  notes: string;
  credits: BillingItem[];
  debts: BillingItem[];
};

export type CreateCyclePayload = {
  name: string;
  month: number;
  year: number;
  recurrence: "MONTHLY" | "ONE_TIME";
  notes: string;
  credits: BillingItem[];
  debts: BillingItem[];
};

export type Summary = {
  totalCredit: number;
  totalDebt: number;
  net: number;
  overdueDebts: number;
  savingsRate: number;
};
