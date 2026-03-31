import { useQuery } from "@tanstack/react-query";
import type { Summary } from "../../../types/domain";
import { fetchCycles, fetchSummary } from "../billingCycleService";

const defaultSummary: Summary = {
  totalCredit: 0,
  totalDebt: 0,
  net: 0,
  overdueDebts: 0,
  savingsRate: 0,
};

export function useBillingCycles() {
  const cyclesQuery = useQuery({
    queryKey: ["billing-cycles"],
    queryFn: fetchCycles,
  });

  const summaryQuery = useQuery({
    queryKey: ["summary"],
    queryFn: fetchSummary,
  });

  return {
    cycles: cyclesQuery.data ?? [],
    summary: summaryQuery.data ?? defaultSummary,
    isLoading: cyclesQuery.isLoading || summaryQuery.isLoading,
    isError: cyclesQuery.isError || summaryQuery.isError,
  };
}
