import { Routes, Route } from "react-router-dom";
import { useThemeStore } from "@/stores/useThemeStore";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import InstructionPageLayout from "@/layouts/InstructionPageLayout";
import OptionPageLayout from "@/layouts/OptionPageLayout";
import StartPageLayout from "@/layouts/StartPageLayout";
import DetailedInstructionPageLayout from "@/layouts/DetailedInstructionPageLayout";

export default function App() {
  const { isThemeDark, setIsThemeDark } = useThemeStore();

  return (
    <>
      <div className="absolute -z-100 h-[100vh] w-[50vh] bg-gray-50 dark:bg-gray-700"></div>
      <div className="pointer-events-none absolute z-50 h-[100vh] w-[50vh]">
        <button
          className="pointer-events-auto absolute top-4 right-6 w-[6vh] cursor-pointer rounded-4xl bg-gray-200 px-4 py-2 shadow dark:bg-gray-800 dark:text-white"
          onClick={setIsThemeDark}
        >
          {isThemeDark ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
      <Routes>
        <Route path="/" element={<StartPageLayout />} />
        <Route path="/instruction-page" element={<InstructionPageLayout />}>
          <Route path="page-1" element={<DetailedInstructionPageLayout rounded={"4xl"} />} />
          <Route path="page-2" element={<DetailedInstructionPageLayout rounded={"4xl"} />} />
          <Route path="page-3" element={<DetailedInstructionPageLayout rounded={"4xl"} />} />
          <Route path="page-4" element={<DetailedInstructionPageLayout rounded={"4xl"} />} />
        </Route>
        <Route path="/option-page" element={<OptionPageLayout />} />
      </Routes>
    </>
  );
}
