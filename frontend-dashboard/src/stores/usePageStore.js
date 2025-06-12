import { create } from "zustand";

export const usePageStore = create((set) => ({
  optionPage: "커서",

  setOptionPage: (optionPage) => set({ optionPage }),
}));
