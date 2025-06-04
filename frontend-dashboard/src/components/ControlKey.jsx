import { useState } from "react";

export default function ControlKey({ name }) {
  const [hotKey, setHotKey] = useState("");

  return (
    <div className="mb-2 flex w-[45vh] flex-row items-center justify-between rounded-2xl bg-gray-200 px-2">
      <div className="mt-2 mb-2 ml-2">{name}</div>
      <div className="flex flex-row">
        <input
          className="mr-2 w-38 rounded-lg bg-gray-300 px-2"
          placeholder="단축키.."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setHotKey(e.target.value);
            }
          }}
        />
        <div className="rounded-lg bg-gray-300 pr-5 pl-5">{hotKey}</div>
      </div>
    </div>
  );
}
