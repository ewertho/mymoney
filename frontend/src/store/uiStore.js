import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useUiStore = create()(persist((set) => ({
    hideValues: false,
    theme: "dark",
    language: "pt-BR",
    toggleHideValues: () => set((state) => ({ hideValues: !state.hideValues })),
    toggleTheme: () => set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
    toggleLanguage: () => set((state) => ({
        language: state.language === "pt-BR" ? "en-US" : "pt-BR",
    })),
}), { name: "mymoney-ui" }));
