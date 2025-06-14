export default function VirtualKeyboard() {
  return (
    <div className="absolute right-0 z-50 mt-2 flex w-[40vh] items-center justify-center rounded-lg bg-gray-300 p-2 text-[1.2vh] font-semibold shadow dark:bg-gray-600">
      <div className="grid gap-1">
        <div className="grid auto-cols-max grid-flow-col justify-center gap-1 text-black dark:text-white">
          {["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"].map((key) => (
            <div
              key={key}
              className="flex h-7 w-6 items-center justify-center rounded bg-white px-2 shadow-inner dark:bg-gray-700"
            >
              {key}
            </div>
          ))}
        </div>
        <div className="grid auto-cols-max grid-flow-col justify-center gap-1 text-black dark:text-white">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((key) => (
            <div
              key={key}
              className="flex h-7 w-6 items-center justify-center rounded bg-white px-2 shadow-inner dark:bg-gray-700"
            >
              {key}
            </div>
          ))}
        </div>
        <div className="grid auto-cols-max grid-flow-col justify-center gap-1 text-black dark:text-white">
          {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
            <div
              key={key}
              className="flex h-7 w-6 items-center justify-center rounded bg-white px-2 shadow-inner dark:bg-gray-700"
            >
              {key}
            </div>
          ))}
        </div>
        <div className="grid auto-cols-max grid-flow-col justify-center gap-1 text-black dark:text-white">
          {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
            <div
              key={key}
              className="flex h-7 w-6 items-center justify-center rounded bg-white px-2 shadow-inner dark:bg-gray-700"
            >
              {key}
            </div>
          ))}
        </div>
        <div className="grid auto-cols-max grid-flow-col justify-center gap-1 text-black dark:text-white">
          {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
            <div
              key={key}
              className="flex h-7 w-6 items-center justify-center rounded bg-white px-2 shadow-inner dark:bg-gray-700"
            >
              {key}
            </div>
          ))}
        </div>
        <div className="grid auto-cols-max grid-flow-col justify-center gap-1 text-black dark:text-white">
          {["TAB", "↑", "↓", "←", "→"].map((key) => (
            <div
              key={key}
              className="flex h-7 w-6 items-center justify-center rounded bg-white px-2 shadow-inner dark:bg-gray-700"
            >
              {key}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
