import { Schema, Types, model, type InferSchemaType } from "mongoose";

const moneyField = {
  type: Number,
  min: 0,
  required: true,
} as const;

const creditSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    value: moneyField,
    receivedAt: { type: Date },
  },
  { _id: false },
);

const debtSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    value: moneyField,
    category: {
      type: String,
      enum: ["FIXED", "VARIABLE"],
      default: "VARIABLE",
    },
    status: {
      type: String,
      enum: ["PENDING", "SCHEDULED", "PAID", "OVERDUE"],
      default: "PENDING",
    },
    dueDate: { type: Date },
    paidAt: { type: Date },
    isEssential: { type: Boolean, default: false },
  },
  { _id: false },
);

const billingCycleSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true },
    month: { type: Number, min: 1, max: 12, required: true },
    year: { type: Number, min: 2000, max: 2100, required: true },
    recurrence: {
      type: String,
      enum: ["MONTHLY", "ONE_TIME"],
      default: "MONTHLY",
    },
    credits: { type: [creditSchema], default: [] },
    debts: { type: [debtSchema], default: [] },
    notes: { type: String, default: "" },
  },
  { timestamps: true },
);

billingCycleSchema.index({ userId: 1, year: -1, month: -1 });

export type BillingCycle = InferSchemaType<typeof billingCycleSchema> & {
  _id: string;
};

export const BillingCycleModel = model("BillingCycle", billingCycleSchema);
