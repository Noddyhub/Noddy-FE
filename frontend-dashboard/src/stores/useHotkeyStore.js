import { create } from "zustand";

export const useHotkeyStore = create((set) => ({
  assignedHotkeys: [],

  setAssignedHotkeys: (newHotkey) =>
    set((state) => ({
      assignedHotkeys: [...state.assignedHotkeys, newHotkey],
    })),
}));
