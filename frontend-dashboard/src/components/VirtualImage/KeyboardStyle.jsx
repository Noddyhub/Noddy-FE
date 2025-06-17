import useSocket from "@/hooks/useSocket";
import { useHotkeyStore } from "@/stores/useHotkeyStore";
import useUserSetting from "@/hooks/useUserSetting";
import { useEffect } from "react";

export default function KeyboardStyle({ keyName, keys, values, name, defaultValue, handleButtonPress }) {
  const { sendMessage, clientId } = useSocket();
  const { assignedHotkeys, setAssignedHotkeys } = useHotkeyStore();
  // const { value, updateSetting } = useUserSetting(keyName, defaultValue);

  useEffect(() => {
    setAssignedHotkeys({ [keyName]: value });
  }, []);

  const handleButton = (key, buttonValue) => {
    const selectedHotkeyKeycode = buttonValue;
    console.log("in handleButtonPress KEY: ", key);

    // setAssignedHotkeys({ [keyName]: key });
    //updateSetting(key);
    handleButtonPress(key);
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
            onClick={() => handleButton(key, value)} // key: "A", value: 65
          >
            {key}
          </div>
        );
      })}
    </div>
  );
}
