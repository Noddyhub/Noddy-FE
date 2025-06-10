import { Routes, Route } from "react-router-dom";
import InstructionPageLayout from "@/layouts/InstructionPageLayout";
import OptionPageLayout from "@/layouts/OptionPageLayout";
import StartPageLayout from "@/layouts/StartPageLayout";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import DetailedInstructionPageLayout from "@/layouts/DetailedInstructionPageLayout";
import Model3D from "@/components/Model3D";
import VirtualWindow from "@/components/VirtualWindow";
import VirtualArrowKeys from "@/components/VirtualArrowKeys";

export default function App() {
  const VALUE_ROTATING_MODEL_BACKWARD = 0.5;
  const VALUE_MOVING_MODEL_DOWN = -1.6;
  const VALUE_MOVING_CAMERA_UP = 20;

  return (
    <>
      <div className="absolute -z-100 h-[100vh] w-[50vh] bg-gray-50 dark:bg-gray-700"></div>
      <ThemeToggleButton />
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
                  model={
                    <Model3D direction={VALUE_ROTATING_MODEL_BACKWARD} modelTranslationY={VALUE_MOVING_MODEL_DOWN} />
                  }
                  cameraRotation={VALUE_MOVING_CAMERA_UP}
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
        </Route>
        <Route path="/option-page" element={<OptionPageLayout />} />
      </Routes>
    </>
  );
}
