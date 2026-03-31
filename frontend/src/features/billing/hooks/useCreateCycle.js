import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCycle } from "../billingCycleService";
export function useCreateCycle() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload) => createCycle(payload),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["billing-cycles"] }),
                queryClient.invalidateQueries({ queryKey: ["summary"] }),
            ]);
        },
    });
}
