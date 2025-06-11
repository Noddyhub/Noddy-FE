import { useEffect, useState } from "react";

export default function VirtualArrowKeys() {
  const [pressedKey, setPressedKey] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        setPressedKey(e.key);
      }
    };

    const handleKeyUp = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        setPressedKey(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="absolute z-50">
      <div className="grid h-40 w-40 grid-cols-3 grid-rows-3 gap-0.75">
        <div></div>
        <div
          className={`-z-50 flex items-center justify-center rounded border-b-10 border-gray-600 bg-gray-300 text-xl font-bold text-black transition-all ${pressedKey === "ArrowUp" ? "translate-y-1 bg-gray-400 shadow-inner" : ""}`}
        >
          ↑
        </div>
        <div></div>

        <div
          className={`flex items-center justify-center rounded border-b-10 border-gray-600 bg-gray-300 text-xl font-bold text-black transition-all ${pressedKey === "ArrowLeft" ? "translate-y-1 bg-gray-400 shadow-inner" : ""}`}
        >
          ←
        </div>
        <div
          className={`flex items-center justify-center rounded border-b-10 border-gray-600 bg-gray-300 text-xl font-bold text-black transition-all ${pressedKey === "ArrowDown" ? "translate-y-1 bg-gray-400 shadow-inner" : ""}`}
        >
          ↓
        </div>
        <div
          className={`flex items-center justify-center rounded border-b-10 border-gray-600 bg-gray-300 text-xl font-bold text-black transition-all ${pressedKey === "ArrowRight" ? "translate-y-1 bg-gray-400 shadow-inner" : ""}`}
        >
          →
        </div>
      </div>
    </div>
  );
}
