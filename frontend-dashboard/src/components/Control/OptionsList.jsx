import { useState } from "react";
import useSocket from "@/hooks/useSocket";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function OptionsList({ name }) {
  const [hotKey, setHotkey] = useState("");
  const { sendMessage, clientId } = useSocket();

  const handleSelectChange = (e) => {
    const selectedHotKey = e.target.value;

    setHotkey(selectedHotKey);
    sendMessage(JSON.stringify({ type: "hotkey", name, value: selectedHotKey.charCodeAt(0), clientId }));
  };

  return (
    <div className="relative w-32">
      <select
        className={`h-7 w-[13.5vh] appearance-none rounded-lg bg-gray-200 px-2 font-medium shadow dark:bg-gray-800 ${
          hotKey === "" ? "text-gray-400 dark:text-gray-700" : "text-black dark:text-white"
        }`}
        value={hotKey}
        onChange={handleSelectChange}
      >
        <option value="" disabled>
          단축키 선택
        </option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
        <option value="F">F</option>
        <option value="G">G</option>
      </select>
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-gray-500" />
    </div>
  );
}
