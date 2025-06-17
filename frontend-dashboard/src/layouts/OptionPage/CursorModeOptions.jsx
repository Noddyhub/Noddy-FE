import { useTranslation } from "react-i18next";
import ControlKey from "@/components/Control/ControlKey";
import ControlSlider from "@/components/Control/ControlSlider";

export default function CursorModeOptions() {
  const { t } = useTranslation();

  return (
    <>
      <ControlSlider
        name={t("cursorSensitivity")}
        KeyName="cursorSensitivity"
        min={1}
        max={10}
        step={1}
        defaultValue={5}
      />
      <ControlSlider
        name={t("cursorReactionSpeed")}
        KeyName="cursorReactionSpeed"
        min={1}
        max={10}
        step={1}
        defaultValue={5}
      />
      <ControlKey KeyName="toggleMode" name={t("toggleMode")} defaultValue={"TAB"} />
      <ControlKey KeyName="leftClick" name={t("leftClick")} defaultValue={"F9"} />
      <ControlKey KeyName="rightClick" name={t("rightClick")} defaultValue={"F10"} />
      <ControlKey KeyName="cursorPause" name={t("cursorPause")} defaultValue={"F11"} />
      <ControlKey KeyName="cursorUp" name={t("cursorUp")} defaultValue={"↑"} />
      <ControlKey KeyName="cursorDown" name={t("cursorDown")} defaultValue={"↓"} />
      <ControlKey KeyName="cursorLeft" name={t("cursorLeft")} defaultValue={"←"} />
      <ControlKey KeyName="cursorRight" name={t("cursorRight")} defaultValue={"→"} />
    </>
  );
}
