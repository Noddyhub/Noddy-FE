import useSocket from "../hooks/useSocket";

export default function ControlSlider(props) {
  const { name, min, max, step, defaultValue } = props;
  const { sendMessage, clientId } = useSocket();

  const handleSliderChange = (e) => {
    if (!clientId) return;
    const sliderValue = Number(e.target.value);
    sendMessage({ type: "control", name, value: sliderValue, clientId });
  };

  return (
    <div className="mb-2 flex w-[45vh] flex-row items-center justify-between rounded-2xl px-2">
      <div className="mt-2 mb-2 ml-2 font-medium dark:text-white">{name}</div>
      <div className="flex flex-row">
        <input
          type="range"
          className="h-2 w-[12.5vh] cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-500 dark:bg-gray-800 dark:accent-blue-200"
          min={min}
          max={max}
          step={step}
          defaultValue={defaultValue}
          onChange={handleSliderChange}
        />
      </div>
    </div>
  );
}
