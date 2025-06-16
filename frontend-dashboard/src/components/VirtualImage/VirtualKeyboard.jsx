import useSocket from "@/hooks/useSocket";
import { keyNameToKeyCode } from "@/constants/keyCodes";
import { useHotkeyStore } from "@/stores/useHotkeyStore";

export default function VirtualKeyboard({ name }) {
  const { sendMessage, clientId } = useSocket();
  const { assignedHotkeys, setAssignedHotkeys } = useHotkeyStore();

  const handleButtonPress = (key, value) => {
    const selectedHotkey = value;
    setAssignedHotkeys({ [name]: key });
    sendMessage(JSON.stringify({ type: "hotkey", name, value: selectedHotkey, clientId }));
  };

  const KeyboardStlye = ({ keys, values }) => {
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
  };

  return (
    <div className="absolute right-0 z-100 mt-2 flex w-[40vh] items-center justify-center rounded-lg bg-gray-300 p-2 text-[1.2vh] font-semibold shadow dark:bg-gray-600">
      <div className="grid gap-1">
        {Object.entries(keyNameToKeyCode).map(([keysGroupName, keysList]) => (
          <KeyboardStlye key={keysGroupName} keys={Object.keys(keysList)} values={Object.values(keysList)} />
        ))}
      </div>
    </div>
  );
}
