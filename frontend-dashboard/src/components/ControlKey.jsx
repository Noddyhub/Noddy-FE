import { useState } from "react";

export default function ControlKey({ name }) {
  const [hotKey, setHotKey] = useState("");

  return (
    <div className="mb-2 flex h-[5vh] w-[48vh] flex-row items-center justify-between rounded-2xl border-2 px-2">
      <div>{name}</div>
      <div className="flex flex-row">
        <input
          className="rounded-2xl border-2 px-2"
          placeholder="단축키.."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setHotKey(e.target.value);
            }
          }}
        />
        <div className="rounded-2xl border-2 pr-2 pl-2">{hotKey}</div>
      </div>
    </div>
  );
}
