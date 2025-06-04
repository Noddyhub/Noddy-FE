import { useState } from "react";

export default function OptionsList() {
  const [hotKey, setHotKey] = useState("");

  return (
    <select
      className="mr-2 h-7 w-30 rounded-lg bg-gray-200 px-2 font-medium shadow dark:bg-gray-800 dark:text-white"
      value={hotKey}
      onChange={(e) => setHotKey(e.target.value)}
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
