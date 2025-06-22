import { create } from "zustand";

export const useDeviceInfoStore = create((set) => ({
  airPodsName: "AirPods",
  macBattery: 0,
  runningTime: "00:00:00",

  setAirPodsName: (airPodsName) => set({ airPodsName }),
  setMacBattery: (macBattery) => set({ macBattery }),
  setRunningTime: (runningTime) => set({ runningTime }),
}));
