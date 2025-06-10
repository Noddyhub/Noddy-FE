import { create } from "zustand";

export const useDeviceInfoStore = create((set) => ({
  airPodsName: "AirPods",
  airPodsLeftBattery: 0,
  airPodsRightBattery: 0,
  macBattery: 0,

  setAirPodsName: (airPodsName) => set({ airPodsName }),
  setAirPodsLeftBattery: (airPodsLeftBattery) => set({ airPodsLeftBattery }),
  setAirPodsRightBattery: (airPodsRightBattery) => set({ airPodsRightBattery }),
  setMacBattery: (macBattery) => set({ macBattery }),
}));
