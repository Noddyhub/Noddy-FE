import useSocket from "@/hooks/useSocket";
import { useHotkeyStore } from "@/stores/useHotkeyStore";

export default function KeyboardStyle({ keys, values, name, handleButtonPress }) {
  const { sendMessage, clientId } = useSocket();
  const { assignedHotkeys } = useHotkeyStore();

  const handleButton = (key, buttonValue) => {
    const selectedHotkeyKeycode = buttonValue;

    handleButtonPress(key);
    sendMessage(JSON.stringify({ type: "hotkey", name, value: selectedHotkeyKeycode, clientId }));
  };

  return (
    <div className="grid auto-cols-max grid-flow-col justify-center gap-1 text-black transition duration-300 dark:text-white">
      {keys.map((key, index) => {
        const value = values[index];
        const isAssigned = Object.values(assignedHotkeys).includes(key);

        return (
          <div
            key={key}
            value={value}
            className={`flex h-7 w-6 items-center justify-center rounded px-2 shadow-inner transition duration-300 ${isAssigned ? "cursor-pointer bg-gray-400 opacity-50" : "cursor-pointer bg-white hover:bg-gray-200 dark:bg-gray-700"} `}
            onClick={() => handleButton(key, value)}
          >
            {key}
          </div>
        );
      })}
    </div>
  );
}
