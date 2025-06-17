import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import InstructionPageLayout from "@/layouts/InstructionPageLayout";
import OptionPageLayout from "@/layouts/OptionPage/OptionPageLayout";
import StartPageLayout from "@/layouts/StartPageLayout";
import ControlTheme from "@/components/Control/ControlTheme";
import DetailedInstructionPageLayout from "@/layouts/DetailedInstructionPageLayout";
import Model3D from "@/components/3D/Model3D";
import VirtualWindow from "@/components/VirtualImage/VirtualWindow";
import VirtualArrowKeys from "@/components/VirtualImage/VirtualArrowKeys";
import GoogleSignIn from "@/pages/login/GoogleSignIn";
import OAuthSuccessPage from "@/pages/login/OAuthSuccessPage";
import "@/utils/i18n";

export default function App() {
  const { t } = useTranslation();
  const VALUE_ROTATING_MODEL_BACKWARD = 0.5;
  const VALUE_MOVING_MODEL_DOWN = -1.6;
  const VALUE_MOVING_CAMERA_UP = 20;

  return (
    <>
      <div className="absolute -z-100 h-[100vh] w-[50vh] bg-gray-50 transition duration-300 dark:bg-gray-700"></div>
      <ControlTheme />
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
                <div className="flex w-[45vh] items-center justify-center rounded-2xl px-4 pt-4 text-center text-lg font-bold whitespace-pre-line transition duration-300 dark:text-white">
                  {t("cursorGuide")}
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
                <div className="flex w-[45vh] items-center justify-center rounded-xl px-4 pt-4 text-center text-lg font-bold whitespace-pre-line transition duration-300 dark:text-white">
                  {t("directionKeyGuide")}
                </div>
              </>
            }
          />
        </Route>
        <Route path="/option-page" element={<OptionPageLayout />} />
        <Route path="/oauth-success" element={<OAuthSuccessPage />} />
        <Route path="/oauth" element={<GoogleSignIn />} />
      </Routes>
    </>
  );
}
