import { useState } from "react";
import useSocket from "../hooks/useSocket";

export default function OptionsList({ name }) {
  const [hotKey, setHotkey] = useState("");
  const { sendMessage, clientId } = useSocket();

  const handleSelectChange = (e) => {
    const selectedHotKey = e.target.value;

    setHotkey(selectedHotKey);
    sendMessage({ type: "control", name, value: selectedHotKey.charCodeAt(0), clientId });
  };

  return (
    <select
      className="mr-2 h-7 w-30 rounded-lg bg-gray-200 px-2 font-medium shadow dark:bg-gray-800 dark:text-white"
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
  );
}
