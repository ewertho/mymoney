import { api } from "../../api";
import type {
  BillingCycle,
  CreateCyclePayload,
  Summary,
} from "../../types/domain";

export async function fetchCycles(): Promise<BillingCycle[]> {
  const { data } = await api.get<BillingCycle[]>("/billing-cycles");
  return data;
}

export async function fetchSummary(): Promise<Summary> {
  const { data } = await api.get<Summary>("/billing-cycles/summary");
  return data;
}

export async function createCycle(
  payload: CreateCyclePayload,
): Promise<BillingCycle> {
  const { data } = await api.post<BillingCycle>("/billing-cycles", payload);
  return data;
}

export async function deleteCycle(id: string): Promise<void> {
  await api.delete(`/billing-cycles/${id}`);
}

export async function updateCycle(
  id: string,
  payload: Partial<CreateCyclePayload>,
): Promise<BillingCycle> {
  const { data } = await api.put<BillingCycle>(
    `/billing-cycles/${id}`,
    payload,
  );
  return data;
}
