import { Types } from "mongoose";
import { AppError } from "../errors/AppError";
import { BillingCycleModel } from "../models/BillingCycle";

export async function listCyclesService(userId: string) {
  return BillingCycleModel.find({ userId }).sort({
    year: -1,
    month: -1,
    createdAt: -1,
  });
}

export async function getCycleService(id: string, userId: string) {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(400, "ID inválido.");
  }

  const cycle = await BillingCycleModel.findOne({ _id: id, userId });
  if (!cycle) {
    throw new AppError(404, "Ciclo não encontrado.");
  }

  return cycle;
}

export async function createCycleService(
  userId: string,
  data: Record<string, unknown>,
) {
  return BillingCycleModel.create({ ...data, userId });
}

export async function updateCycleService(
  id: string,
  userId: string,
  data: Record<string, unknown>,
) {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(400, "ID inválido.");
  }

  const cycle = await BillingCycleModel.findOneAndUpdate(
    { _id: id, userId },
    data,
    { new: true, runValidators: true },
  );

  if (!cycle) {
    throw new AppError(404, "Ciclo não encontrado.");
  }

  return cycle;
}

export async function deleteCycleService(id: string, userId: string) {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(400, "ID inválido.");
  }

  const cycle = await BillingCycleModel.findOneAndDelete({ _id: id, userId });
  if (!cycle) {
    throw new AppError(404, "Ciclo não encontrado.");
  }
}

export async function getSummaryService(userId: string) {
  const cycles = await BillingCycleModel.find({ userId }).lean();

  const totalCredit = cycles.reduce(
    (sum, cycle) =>
      sum + cycle.credits.reduce((acc, item) => acc + item.value, 0),
    0,
  );

  const totalDebt = cycles.reduce(
    (sum, cycle) =>
      sum + cycle.debts.reduce((acc, item) => acc + item.value, 0),
    0,
  );

  const now = new Date();
  const overdueDebts = cycles.reduce((count, cycle) => {
    const cycleOverdues = cycle.debts.filter((debt) => {
      if (debt.status === "PAID" || !debt.dueDate) return false;
      return new Date(debt.dueDate) < now;
    }).length;
    return count + cycleOverdues;
  }, 0);

  const net = totalCredit - totalDebt;
  const savingsRate =
    totalCredit > 0 ? Number(((net / totalCredit) * 100).toFixed(2)) : 0;

  return { totalCredit, totalDebt, net, overdueDebts, savingsRate };
}
