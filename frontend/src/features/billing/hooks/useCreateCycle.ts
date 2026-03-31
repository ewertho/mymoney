import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateCyclePayload } from "../../../types/domain";
import { createCycle } from "../billingCycleService";

export function useCreateCycle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCyclePayload) => createCycle(payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["billing-cycles"] }),
        queryClient.invalidateQueries({ queryKey: ["summary"] }),
      ]);
    },
  });
}
