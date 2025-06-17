import useSocket from "@/hooks/useSocket";
import { useHotkeyStore } from "@/stores/useHotkeyStore";
import useUserSetting from "@/hooks/useUserSetting";
import { useEffect } from "react";

export default function KeyboardStyle({ KeyName, keys, values, name, defaultValue }) {
  const { sendMessage, clientId } = useSocket();
  const { assignedHotkeys, setAssignedHotkeys } = useHotkeyStore();
  const { value, updateSetting } = useUserSetting(keyName, defaultValue);

  useEffect(() => {
    setAssignedHotkeys({ [keyName]: value });
  }, []);

  const handleButtonPress = (key, value) => {
    const selectedHotkeyKeycode = value;

    updateSetting(key);
    sendMessage(JSON.stringify({ type: "hotkey", name, value: selectedHotkeyKeycode, clientId }));
  };

  return (
    <div className="grid auto-cols-max grid-flow-col justify-center gap-1 text-black dark:text-white">
      {keys.map((key, index) => {
        const value = values[index];
        const isAssigned = Object.values(assignedHotkeys).includes(key);

        return (
          <div
            key={key}
            value={value}
            className={`flex h-7 w-6 items-center justify-center rounded px-2 shadow-inner ${isAssigned ? "cursor-pointer bg-gray-400 opacity-50" : "cursor-pointer bg-white hover:bg-gray-200 dark:bg-gray-700"} `}
            onClick={() => handleButtonPress(key, value)}
          >
            {key}
          </div>
        );
      })}
    </div>
  );
}
