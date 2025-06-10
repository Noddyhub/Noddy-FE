import { create } from "zustand";

export const usePageStore = create((set) => ({
  optionPage: "Cursor",

  setOptionPage: (optionPage) => set({ optionPage }),
}));
