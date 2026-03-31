import { create } from "zustand";
import { persist } from "zustand/middleware";

type Language = "pt-BR" | "en-US";
type Theme = "light" | "dark";

type UiState = {
  hideValues: boolean;
  theme: Theme;
  language: Language;
  toggleHideValues: () => void;
  toggleTheme: () => void;
  toggleLanguage: () => void;
};

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      hideValues: false,
      theme: "dark",
      language: "pt-BR",
      toggleHideValues: () =>
        set((state) => ({ hideValues: !state.hideValues })),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
      toggleLanguage: () =>
        set((state) => ({
          language: state.language === "pt-BR" ? "en-US" : "pt-BR",
        })),
    }),
    { name: "mymoney-ui" },
  ),
);
