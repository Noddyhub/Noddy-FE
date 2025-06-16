import { create } from "zustand";

export const useHotkeyStore = create((set) => ({
  assignedHotkeys: {
    "모드 변환": "TAB",
    좌클릭: "F9",
    우클릭: "F10",
    "커서 조작 일시정지": "F11",
    "커서 위로": "↑",
    "커서 아래로": "↓",
    "커서 왼쪽으로": "←",
    "커서 오른쪽으로": "→",
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
