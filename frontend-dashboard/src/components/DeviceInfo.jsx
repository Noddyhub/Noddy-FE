import { useDeviceInfoStore } from "@/stores/useDeviceInfoStore";
import { useTranslation } from "react-i18next";

function AirPodsMacInfo() {
  const { airPodsName, macBattery } = useDeviceInfoStore();
  const { t } = useTranslation();

  return (
    <>
      <div className="mb-[1vh] flex h-[5.5vh] w-[17vh] flex-col items-center justify-center rounded-2xl bg-gray-200 text-sm dark:bg-gray-800 dark:text-white">
        <div className="flex h-[3vh] items-center text-sm font-bold">{airPodsName}</div>
      </div>
      <div className="mb-[1vh] flex h-[5.5vh] w-[17vh] flex-col items-center justify-center rounded-2xl bg-gray-200 text-sm dark:bg-gray-800 dark:text-white">
        <div className="text-sm font-semibold">Mac {t("macBattery")}</div>
        <div className="h-2 w-21 rounded bg-gray-300">
          <div
            className="h-full rounded"
            style={{
              width: `${macBattery}%`,
              backgroundColor: macBattery <= 20 ? "red" : macBattery < 80 ? "gold" : "limegreen",
            }}
          />
        </div>
      </div>
    </>
  );
}

function AppInfo() {
  const runningTime = useDeviceInfoStore((state) => state.runningTime);
  const { t } = useTranslation();

  return (
    <div className="flex h-[12vh] w-[17vh] flex-col items-center justify-center rounded-2xl bg-gray-200 text-sm dark:bg-gray-800 dark:text-white">
      <div className="flex h-[3vh] items-center text-sm font-bold">{t("runningTime")}</div>
      <div className="flex h-[6vh] flex-col justify-center">
        <div className="flex flex-col items-center text-lg font-semibold">{runningTime}</div>
      </div>
    </div>
  );
}

export default function DeviceInfo() {
  return (
    <div className="flex flex-col">
      <AirPodsMacInfo />
      <AppInfo />
    </div>
  );
}
