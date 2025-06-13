import { create } from "zustand";

export const usePageStore = create((set) => ({
  optionPage: "cursor",

  setOptionPage: (optionPage) => set({ optionPage }),
}));
