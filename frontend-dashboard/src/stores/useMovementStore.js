import { create } from "zustand";

export const useMovementStore = create((set) => ({
  optionPage: "cursor",

  setOptionPage: (optionPage) => set({ optionPage }),
}));
