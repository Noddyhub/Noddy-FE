import { create } from "zustand";

export const useMovementStore = create((set) => ({
  pitch: 0.5,
  yaw: 0.5,

  setPitch: (pitch) => set({ pitch }),
  setYaw: (yaw) => set({ yaw }),
}));
