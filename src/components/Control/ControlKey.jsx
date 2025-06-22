import { useEffect } from "react";
import { useHotkeyStore } from "@/stores/useHotkeyStore";
import useUserSetting from "@/hooks/useUserSetting";
import OptionsList from "@/components/Control/OptionsList";

export default function ControlKey({ keyName, name, defaultValue }) {
  const { value, updateSetting } = useUserSetting(keyName, defaultValue);
  const setAssignedHotkeys = useHotkeyStore((state) => state.setAssignedHotkeys);

  useEffect(() => {
    setAssignedHotkeys({ [keyName]: value });
  }, [value]);

  const handleKeyValue = (key) => {
    updateSetting(key);
  };

  return (
    <div className="mb-2 flex w-[45vh] flex-row items-center justify-between rounded-2xl px-2">
      <div className="mt-2 mb-2 ml-2 text-lg font-semibold transition duration-300 dark:text-white">
        {name} : <span className="font-bold">{value}</span>
      </div>
      <div>
        <OptionsList name={name} handleButtonPress={handleKeyValue} />
      </div>
    </div>
  );
}
