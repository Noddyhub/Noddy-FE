import useSocket from "@/hooks/useSocket";
import useUserSetting from "@/hooks/useUserSetting";

export default function ControlSlider(props) {
  const { KeyName, name, min, max, step, defaultValue } = props;
  const { sendMessage, clientId } = useSocket();
  const { value, updateSetting } = useUserSetting(KeyName, defaultValue);

  const handleSliderChange = (e) => {
    if (!clientId) return;

    const sliderValue = Number(e.target.value);
    updateSetting(sliderValue);
    sendMessage(JSON.stringify({ type: "control", name, value: sliderValue, clientId }));
  };

  return (
    <div className="mb-2 flex w-[45vh] flex-row items-center justify-between rounded-2xl px-2">
      <div className="mt-2 mb-2 ml-2 text-lg font-semibold dark:text-white">
        {name} : <span className="font-bold">{value}</span>
      </div>
      <div className="flex flex-row">
        <input
          type="range"
          className="h-2 w-[12.5vh] cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-500 dark:bg-gray-800 dark:accent-blue-200"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderChange}
        />
      </div>
    </div>
  );
}
