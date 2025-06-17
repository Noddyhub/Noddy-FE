import { keyNameToKeyCode } from "@/constants/keyCodes";
import KeyboardStyle from "@/components/VirtualImage/KeyboardStyle";

export default function VirtualKeyboard({ name, handleButtonPress }) {
  return (
    <div className="absolute right-0 z-100 mt-2 flex w-[40vh] items-center justify-center rounded-lg bg-gray-300 p-2 text-[1.2vh] font-semibold shadow dark:bg-gray-600">
      <div className="grid gap-1">
        {Object.entries(keyNameToKeyCode).map(([keysGroupName, keysList]) => (
          <KeyboardStyle
            keys={Object.keys(keysList)}
            values={Object.values(keysList)}
            name={name}
            handleButtonPress={handleButtonPress}
          />
        ))}
      </div>
    </div>
  );
}
