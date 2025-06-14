export default function VirtualKeyboard() {
  const KEY_LINE_STYLE = "grid auto-cols-max grid-flow-col justify-center gap-1 text-black dark:text-white";
  const KEY_BUTTON_STYLE =
    "flex h-7 w-6 items-center justify-center rounded bg-white px-2 shadow-inner dark:bg-gray-700";

  return (
    <div className="absolute right-0 z-100 mt-2 flex w-[40vh] items-center justify-center rounded-lg bg-gray-300 p-2 text-[1.2vh] font-semibold shadow dark:bg-gray-600">
      <div className="grid gap-1">
        <div className={KEY_LINE_STYLE}>
          {["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"].map((key) => (
            <div key={key} className={KEY_BUTTON_STYLE}>
              {key}
            </div>
          ))}
        </div>
        <div className={KEY_LINE_STYLE}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((key) => (
            <div key={key} className={KEY_BUTTON_STYLE}>
              {key}
            </div>
          ))}
        </div>
        <div className="grid auto-cols-max grid-flow-col justify-center gap-1 text-black dark:text-white">
          {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
            <div key={key} className={KEY_BUTTON_STYLE}>
              {key}
            </div>
          ))}
        </div>
        <div className={KEY_LINE_STYLE}>
          {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
            <div key={key} className={KEY_BUTTON_STYLE}>
              {key}
            </div>
          ))}
        </div>
        <div className={KEY_LINE_STYLE}>
          {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
            <div key={key} className={KEY_BUTTON_STYLE}>
              {key}
            </div>
          ))}
        </div>
        <div className={KEY_LINE_STYLE}>
          {["TAB", "↑", "↓", "←", "→"].map((key) => (
            <div key={key} className={KEY_BUTTON_STYLE}>
              {key}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
