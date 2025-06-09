import { create } from "zustand";

export const useMovementStore = create((set) => ({
  optionPage: "Cursor",
  pitch: 0.5,
  yaw: 0.5,

  setOptionPage: (optionPage) => set({ optionPage }),
  setPitch: (pitch) => set({ pitch }),
  setYaw: (yaw) => set({ yaw }),
}));
