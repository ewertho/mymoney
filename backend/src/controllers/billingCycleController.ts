import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import {
  createCycleService,
  deleteCycleService,
  getCycleService,
  getSummaryService,
  listCyclesService,
  updateCycleService,
} from "../services/billingCycleService";

function requireUserId(req: Request): string {
  if (!req.userId) {
    throw new AppError(401, "Usuário não autenticado.");
  }
  return req.userId;
}

function requireCycleId(req: Request): string {
  const id = req.params.id;
  if (typeof id !== "string") {
    throw new AppError(400, "ID inválido.");
  }
  return id;
}

export async function listBillingCycles(
  req: Request,
  res: Response,
): Promise<void> {
  const cycles = await listCyclesService(requireUserId(req));
  res.json(cycles);
}

export async function getBillingCycle(
  req: Request,
  res: Response,
): Promise<void> {
  const cycle = await getCycleService(requireCycleId(req), requireUserId(req));
  res.json(cycle);
}

export async function createBillingCycle(
  req: Request,
  res: Response,
): Promise<void> {
  const cycle = await createCycleService(requireUserId(req), req.body);
  res.status(201).json(cycle);
}

export async function updateBillingCycle(
  req: Request,
  res: Response,
): Promise<void> {
  const cycle = await updateCycleService(
    requireCycleId(req),
    requireUserId(req),
    req.body,
  );
  res.json(cycle);
}

export async function deleteBillingCycle(
  req: Request,
  res: Response,
): Promise<void> {
  await deleteCycleService(requireCycleId(req), requireUserId(req));
  res.status(204).send();
}

export async function getSummary(req: Request, res: Response): Promise<void> {
  const summary = await getSummaryService(requireUserId(req));
  res.json(summary);
}
