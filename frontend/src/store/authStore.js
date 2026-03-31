import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useAuthStore = create()(persist((set) => ({
    token: null,
    user: null,
    setSession: (token, user) => set({ token, user }),
    clearSession: () => set({ token: null, user: null }),
}), { name: "mymoney-auth" }));
