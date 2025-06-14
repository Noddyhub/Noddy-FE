export default function VirtualKeyboard() {
  const KeyboardStlye = ({ keys }) => {
    return (
      <div className="grid auto-cols-max grid-flow-col justify-center gap-1 text-black dark:text-white">
        {keys.map((key) => (
          <div
            key={key}
            className="flex h-7 w-6 items-center justify-center rounded bg-white px-2 shadow-inner dark:bg-gray-700"
          >
            {key}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="absolute right-0 z-100 mt-2 flex w-[40vh] items-center justify-center rounded-lg bg-gray-300 p-2 text-[1.2vh] font-semibold shadow dark:bg-gray-600">
      <div className="grid gap-1">
        <KeyboardStlye keys={["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"]} />
        <KeyboardStlye keys={[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]} />
        <KeyboardStlye keys={["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]} />
        <KeyboardStlye keys={["A", "S", "D", "F", "G", "H", "J", "K", "L"]} />
        <KeyboardStlye keys={["Z", "X", "C", "V", "B", "N", "M"]} />
        <KeyboardStlye keys={["TAB", "↑", "↓", "←", "→"]} />
      </div>
    </div>
  );
}
