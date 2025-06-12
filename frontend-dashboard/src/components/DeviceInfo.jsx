import { useDeviceInfoStore } from "@/stores/useDeviceInfoStore";

function AirPodsInfo() {
  const { airPodsName, airPodsLeftBattery, airPodsRightBattery } = useDeviceInfoStore();

  return (
    <div className="mb-[1vh] flex h-[12vh] w-[17vh] flex-col items-center justify-center rounded-2xl bg-gray-200 text-sm dark:bg-gray-800 dark:text-white">
      <div className="flex h-[3vh] items-center text-xl font-bold">{airPodsName}</div>
      <div className="flex h-[6vh] flex-col justify-center">
        <div>
          <span className="font-semibold">L 유닛 배터리: </span>
          {airPodsLeftBattery}%
        </div>
        <div>
          <span className="font-semibold">R 유닛 배터리: </span>
          {airPodsRightBattery}%
        </div>
      </div>
    </div>
  );
}

function MacInfo() {
  const macBattery = useDeviceInfoStore((state) => state.macBattery);

  return (
    <div className="flex h-[12vh] w-[17vh] flex-col items-center justify-center rounded-2xl bg-gray-200 text-sm dark:bg-gray-800 dark:text-white">
      <div className="flex h-[3vh] items-center text-xl font-bold">Mac</div>
      <div className="flex h-[6vh] flex-col justify-center">
        <div>
          <span className="font-semibold">본체 배터리: </span>
          {macBattery}%
        </div>
      </div>
    </div>
  );
}

export default function DeviceInfo() {
  return (
    <div className="flex flex-col">
      <AirPodsInfo />
      <MacInfo />
    </div>
  );
}
