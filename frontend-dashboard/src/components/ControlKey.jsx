import { useState } from "react";

export default function ControlKey({ name }) {
  const [hotKey, setHotKey] = useState("");

  return (
    <div className="mb-2 flex w-[45vh] flex-row items-center justify-between rounded-2xl px-2">
      <div className="mt-2 mb-2 ml-2 font-bold">{name}</div>
      <div className="flex flex-row">
        <select
          className="mr-2 h-7 w-20 rounded-lg bg-gray-200 px-2 font-bold shadow"
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
      </div>
    </div>
  );
}
