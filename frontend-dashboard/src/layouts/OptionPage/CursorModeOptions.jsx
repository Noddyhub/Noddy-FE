import { useTranslation } from "react-i18next";
import ControlKey from "@/components/Control/ControlKey";
import ControlSlider from "@/components/Control/ControlSlider";

export default function CursorModeOptions() {
  const { t } = useTranslation();

  return (
    <>
      <ControlSlider name={t("cursorSensitivity")} min={1} max={10} step={1} defaultValue={5} />
      <ControlSlider name={t("cursorReactionSpeed")} min={1} max={10} step={1} defaultValue={5} />
      <ControlKey name={t("toggleMode")} />
      <ControlKey name={t("leftClick")} />
      <ControlKey name={t("rightClick")} />
      <ControlKey name={t("cursorPause")} />
      <ControlKey name={t("cursorUp")} />
      <ControlKey name={t("cursorDown")} />
      <ControlKey name={t("cursorLeft")} />
      <ControlKey name={t("cursorRight")} />
    </>
  );
}
