import { create } from "zustand";

export const useMovementStore = create((set) => ({
  optionPage: "Cursor",
  pitch: 0,
  yaw: 0,

  setOptionPage: (optionPage) => set({ optionPage }),
  setPitch: (pitch) => set({ pitch }),
  setYaw: (yaw) => set({ yaw })
}));
