import OptionsList from "@/components/Control/OptionsList";
import { useHotkeyStore } from "@/stores/useHotkeyStore";

export default function ControlKey({ KeyName, name, defaultValue }) {
  const assignedHotkeys = useHotkeyStore((state) => state.assignedHotkeys);

  return (
    <div className="mb-2 flex w-[45vh] flex-row items-center justify-between rounded-2xl px-2">
      <div className="mt-2 mb-2 ml-2 text-lg font-semibold dark:text-white">
        {name} : <span className="font-bold">{assignedHotkeys[KeyName]}</span>
      </div>
      <div>
        <OptionsList KeyName={KeyName} name={name} defaultValue={defaultValue} />
      </div>
    </div>
  );
}
