import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { BillingCycle } from "../../../types/domain";
import { deleteCycle } from "../billingCycleService";

export function useDeleteCycle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cycle: BillingCycle) => deleteCycle(cycle._id),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["billing-cycles"] }),
        queryClient.invalidateQueries({ queryKey: ["summary"] }),
      ]);
    },
  });
}
