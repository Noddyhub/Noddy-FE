import { useDeviceInfoStore } from "@/stores/useDeviceInfoStore";

function AirPodsInfo() {
  const { airPodsName, airPodsLeftBattery, airPodsRightBattery } = useDeviceInfoStore();

  return (
    <div className="mb-[1vh] flex h-[12vh] w-[17vh] flex-col items-center justify-center rounded-2xl bg-gray-200 text-sm dark:bg-gray-800 dark:text-white">
      <div className="flex h-[3vh] items-center text-xl font-bold">{airPodsName}</div>
      <div className="flex h-[7.5vh] flex-col justify-center">
        <div className="flex flex-col items-center">
          <div className="mb-0.5 text-xs font-semibold">L 유닛 배터리</div>
          <div className="mb-1.5 h-2 w-18 rounded bg-gray-300">
            <div
              className="h-full rounded"
              style={{
                width: `${airPodsLeftBattery}%`,
                backgroundColor: airPodsLeftBattery <= 20 ? "red" : airPodsLeftBattery < 80 ? "gold" : "limegreen",
              }}
            />
          </div>
          <div className="mb-0.5 text-xs font-semibold">R 유닛 배터리</div>
          <div className="h-2 w-18 rounded bg-gray-300">
            <div
              className="h-full rounded"
              style={{
                width: `${airPodsRightBattery}%`,
                backgroundColor: airPodsRightBattery <= 20 ? "red" : airPodsRightBattery < 80 ? "gold" : "limegreen",
              }}
            />
          </div>
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
      <div className="flex h-[7.5vh] flex-col justify-center">
        <div className="flex flex-col items-center">
          <div className="mb-0.5 font-semibold">본체 배터리</div>
          <div className="h-2 w-18 rounded bg-gray-300">
            <div
              className="h-full rounded"
              style={{
                width: `${macBattery}%`,
                backgroundColor: macBattery <= 20 ? "red" : macBattery < 80 ? "gold" : "limegreen",
              }}
            />
          </div>
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
