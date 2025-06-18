import { create } from "zustand";

export const useHotkeyStore = create((set) => ({
  assignedHotkeys: {},

  setAssignedHotkeys: (newHotkey) =>
    set((state) => {
      const name = Object.keys(newHotkey);
      const key = newHotkey[name];
      const updatedHotkeys = { ...state.assignedHotkeys };
      updatedHotkeys[name] = key;

      return { assignedHotkeys: updatedHotkeys };
    }),
}));
