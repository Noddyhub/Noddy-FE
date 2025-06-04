import { create } from "zustand";

export const useThemeStore = create((set) => ({
  isThemeDark: false,

  setIsThemeDark: () =>
    set((state) => {
      const nextIsThemeDark = !state.isThemeDark;
      document.documentElement.classList.toggle("dark", nextIsThemeDark);
      return { isThemeDark: nextIsThemeDark };
    }),
}));
