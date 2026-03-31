import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCycle } from "../billingCycleService";
export function useDeleteCycle() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (cycle) => deleteCycle(cycle._id),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["billing-cycles"] }),
                queryClient.invalidateQueries({ queryKey: ["summary"] }),
            ]);
        },
    });
}
