import { useEffect } from "react";
import { useHotkeyStore } from "@/stores/useHotkeyStore";
import OptionsList from "@/components/Control/OptionsList";
import { useHotkeyStore } from "@/stores/useHotkeyStore";

export default function ControlKey({ keyName, name, defaultValue }) {
  const { value, updateSetting } = useUserSetting(keyName, defaultValue);
  const setAssignedHotkeys = useHotkeyStore((state) => state.setAssignedHotkeys);

  useEffect(() => {
    setAssignedHotkeys({ [keyName]: value });
  }, []);

  const handleKeyValue = (key) => {
    updateSetting(key);
    setAssignedHotkeys({ [keyName]: key });
  };

  return (
    <div className="mb-2 flex w-[45vh] flex-row items-center justify-between rounded-2xl px-2">
      <div className="mt-2 mb-2 ml-2 text-lg font-semibold dark:text-white">
        {name} : <span className="font-bold">{assignedHotkeys[KeyName]}</span>
      </div>
      <div>
        <OptionsList name={name} handleButtonPress={handleKeyValue} />
      </div>
    </div>
  );
}
