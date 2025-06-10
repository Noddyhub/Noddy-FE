import { useThemeStore } from "@/stores/useThemeStore";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";

export default function ThemeToggleButton() {
  const { isThemeDark, setIsThemeDark } = useThemeStore();

  return (
    <div className="pointer-events-none absolute z-50 h-[100vh] w-[50vh]">
      <button
        className="pointer-events-auto absolute top-4 right-6 w-[6vh] cursor-pointer rounded-4xl bg-gray-200 px-4 py-2 shadow dark:bg-gray-800 dark:text-white"
        onClick={setIsThemeDark}
      >
        {isThemeDark ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
}
