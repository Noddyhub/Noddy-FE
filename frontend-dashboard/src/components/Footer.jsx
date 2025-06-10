import { useDeviceInfoStore } from "@/stores/useDeviceInfoStore";
import ThreeDimensionalImage from "@/components/ThreeDimensionalImage";
import Model3D from "@/components/Model3D";

export default function Footer() {
  const { macBattery, airPodsName, airPodsLeftBattery, airPodsRightBattery } = useDeviceInfoStore();
  const VALUE_ROTATING_MODEL_FORWARD = 3.8;

  return (
    <div className="mt-[2vh] flex w-[45vh] items-center justify-between rounded-2xl px-2">
      <div className="h-[25vh] w-[25vh] overflow-hidden rounded-2xl">
        <ThreeDimensionalImage model={<Model3D direction={VALUE_ROTATING_MODEL_FORWARD} />} />
      </div>
      <div className="flex h-[25vh] w-[17vh] flex-col items-center justify-center rounded-2xl bg-gray-200 text-sm dark:bg-gray-800 dark:text-white">
        <div className="flex justify-center">Name : {airPodsName}</div>
        <div className="flex justify-center">Mac Battery: {macBattery}%</div>
        <div className="flex justify-center">Left: {airPodsLeftBattery}%</div>
        <div className="flex justify-center">Right: {airPodsRightBattery}%</div>
      </div>
    </div>
  );
}
