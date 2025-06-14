import { keyNameToKeyCode } from "@/constants/keyCodes";

export default function VirtualKeyboard({ handleButtonPress }) {
  const KeyboardStlye = ({ keys, values }) => {
    return (
      <div className="grid auto-cols-max grid-flow-col justify-center gap-1 text-black dark:text-white">
        {keys.map((key, index) => (
          <div
            key={key}
            value={values[index]}
            className="flex h-7 w-6 cursor-pointer items-center justify-center rounded bg-white px-2 shadow-inner hover:bg-gray-200 dark:bg-gray-700"
            onClick={() => handleButtonPress(values[index])}
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
        <KeyboardStlye
          keys={Object.keys(keyNameToKeyCode.functionKeys)}
          values={Object.values(keyNameToKeyCode.functionKeys)}
        />
        <KeyboardStlye keys={Object.keys(keyNameToKeyCode.numbers)} values={Object.values(keyNameToKeyCode.numbers)} />
        <KeyboardStlye
          keys={Object.keys(keyNameToKeyCode.alphabetLine1)}
          values={Object.values(keyNameToKeyCode.alphabetLine1)}
        />
        <KeyboardStlye
          keys={Object.keys(keyNameToKeyCode.alphabetLine2)}
          values={Object.values(keyNameToKeyCode.alphabetLine2)}
        />
        <KeyboardStlye
          keys={Object.keys(keyNameToKeyCode.alphabetLine3)}
          values={Object.values(keyNameToKeyCode.alphabetLine3)}
        />
        <KeyboardStlye
          keys={Object.keys(keyNameToKeyCode.tabAndArrowKeys)}
          values={Object.values(keyNameToKeyCode.tabAndArrowKeys)}
        />
      </div>
    </div>
  );
}
