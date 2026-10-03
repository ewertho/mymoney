import { Schema, Types, model } from "mongoose";
import { CATEGORIES, type Budgets, type Cycle } from "./domain.ts";

type UserDoc = { name: string; email: string; passwordHash: string; budgets: Budgets };

export const User = model<UserDoc>(
  "User",
  new Schema<UserDoc>(
    {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, unique: true, lowercase: true, trim: true },
      passwordHash: { type: String, required: true },
      budgets: { type: Schema.Types.Mixed, default: {} },
    },
    { timestamps: true, minimize: false },
  ),
);

type CycleDoc = Cycle & { userId: Types.ObjectId };

const cycleSchema = new Schema<CycleDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    notes: { type: String, default: "" },
    credits: [
      { _id: false, name: String, cents: Number, recurring: Boolean },
    ],
    debts: [
      {
        _id: false,
        name: String,
        cents: Number,
        category: { type: String, enum: CATEGORIES },
        recurring: Boolean,
        dueDate: String,
        paidAt: String,
      },
    ],
  },
  { timestamps: true },
);

// Um ciclo por mês por usuário: a constraint mora no banco, não num if.
cycleSchema.index({ userId: 1, year: 1, month: 1 }, { unique: true });

export const CycleModel = model<CycleDoc>("Cycle", cycleSchema);
