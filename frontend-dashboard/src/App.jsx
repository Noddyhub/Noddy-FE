import { Routes, Route } from "react-router-dom";
import { useThemeStore } from "@/stores/useThemeStore";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import InstructionPageLayout from "@/layouts/InstructionPageLayout";
import OptionPageLayout from "@/layouts/OptionPageLayout";
import StartPageLayout from "@/layouts/StartPageLayout";
import DetailedInstructionPageLayout from "@/layouts/DetailedInstructionPageLayout";
import Model3D from "@/components/Model3D";
import VirtualWindow from "@/components/VirtualWindow";
import VirtualArrowKeys from "@/components/VirtualArrowKeys";

export default function App() {
  const { isThemeDark, setIsThemeDark } = useThemeStore();
  const valueRotatingModelBackward = 0.5;
  const valueMovingCameraUp = 40;
  const valueMovingModelDown = -2;

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
          <Route
            path="page-1"
            element={
              <>
                <VirtualWindow />
                <DetailedInstructionPageLayout
                  rounded="4xl"
                  model={<Model3D direction={valueRotatingModelBackward} modelTranslationY={valueMovingModelDown} />}
                  cameraRotation={valueMovingCameraUp}
                />
                <div className="flex w-[45vh] items-center justify-center rounded-2xl px-4 pt-4 text-center text-xl font-bold dark:text-white">
                  위 이미지를 참고해 정면을 바라봐 주세요.
                </div>
              </>
            }
          />
          <Route
            path="page-2"
            element={
              <>
                <VirtualArrowKeys />
                <DetailedInstructionPageLayout rounded="4xl" />
                <div className="flex w-[45vh] items-center justify-center rounded-xl px-4 pt-4 text-center text-xl font-bold dark:text-white">
                  방향키를 눌러서 커서를 세부조정 해보세요.
                </div>
              </>
            }
          />
          <Route
            path="page-3"
            element={
              <>
                <DetailedInstructionPageLayout rounded="4xl" />
                <div className="flex w-[45vh] items-center justify-center rounded-xl px-4 pt-4 text-center text-xl font-bold dark:text-white"></div>
              </>
            }
          />
          <Route
            path="page-4"
            element={
              <>
                <DetailedInstructionPageLayout rounded="4xl" />
                <div className="flex w-[45vh] items-center justify-center rounded-xl px-4 pt-4 text-center text-xl font-bold dark:text-white"></div>
              </>
            }
          />
        </Route>
        <Route path="/option-page" element={<OptionPageLayout />} />
      </Routes>
    </>
  );
}
