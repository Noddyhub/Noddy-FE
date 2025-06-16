import { useState } from "react";
import OptionsList from "@/components/Control/OptionsList";

export default function ControlKey({ name }) {
  const [hotkey, setHotkey] = useState("");
  return (
    <div className="mb-2 flex w-[45vh] flex-row items-center justify-between rounded-2xl px-2">
      <div className="mt-2 mb-2 ml-2 text-lg font-semibold dark:text-white">
        {name} : {hotkey}
      </div>
      <div>
        <OptionsList name={name} setHotkey={setHotkey} />
      </div>
    </div>
  );
}
