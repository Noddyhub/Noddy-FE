import useSocket from "../hooks/useSocket";

export default function ControlSlider(props) {
  const { name, min, max, step, defaultValue } = props;
  const { sendMessage, clientId } = useSocket();

  const handleSliderChange = (e) => {
    if (!clientId) return;
    const sliderValue = Number(e.target.value);
    sendMessage(JSON.stringify({ type: "control", name, value: sliderValue, clientId }));
  };

  return (
    <div className="mb-2 flex w-[45vh] flex-row items-center justify-between rounded-2xl px-2">
      <div className="mt-2 mb-2 ml-2 font-medium dark:text-white">{name}</div>
      <div className="flex flex-row">
        <input
          type="range"
          className="w-50 rounded-2xl px-2"
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
