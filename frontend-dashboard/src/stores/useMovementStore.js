import { create } from "zustand";

export const useMovementStore = create((set) => ({
  optionPage: "Cursor",

  setOptionPage: (optionPage) => set({ optionPage }),
}));
