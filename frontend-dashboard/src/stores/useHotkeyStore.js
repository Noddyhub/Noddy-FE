import { create } from "zustand";

export const useHotkeyStore = create((set) => ({
  assignedHotkeys: {
    toggleMode: "TAB",
    leftClick: "F9",
    rightClick: "F10",
    cursorPause: "F11",
    cursorUp: "↑",
    cursorDown: "↓",
    cursorLeft: "←",
    cursorRight: "→",
  },

  setAssignedHotkeys: (newHotkey) =>
    set((state) => {
      const name = Object.keys(newHotkey);
      const key = newHotkey[name];
      const updatedHotkeys = { ...state.assignedHotkeys };
      updatedHotkeys[name] = key;

      return { assignedHotkeys: updatedHotkeys };
    }),
}));
