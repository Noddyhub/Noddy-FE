import { useTranslation } from "react-i18next";
import ControlKey from "@/components/Control/ControlKey";
import ControlSlider from "@/components/Control/ControlSlider";

export default function CursorModeOptions() {
  const { t } = useTranslation();

  return (
    <>
      <ControlSlider
        name={t("cursorSensitivity")}
        keyName="cursorSensitivity"
        min={1}
        max={10}
        step={1}
        defaultValue={5}
      />
      <ControlSlider
        name={t("cursorReactionSpeed")}
        keyName="cursorReactionSpeed"
        min={1}
        max={10}
        step={1}
        defaultValue={5}
      />
      <ControlKey keyName="toggleMode" name={t("toggleMode")} defaultValue={"TAB"} />
      <ControlKey keyName="leftClick" name={t("leftClick")} defaultValue={"F9"} />
      <ControlKey keyName="rightClick" name={t("rightClick")} defaultValue={"F10"} />
      <ControlKey keyName="cursorPause" name={t("cursorPause")} defaultValue={"F11"} />
      <ControlKey keyName="cursorUp" name={t("cursorUp")} defaultValue={"↑"} />
      <ControlKey keyName="cursorDown" name={t("cursorDown")} defaultValue={"↓"} />
      <ControlKey keyName="cursorLeft" name={t("cursorLeft")} defaultValue={"←"} />
      <ControlKey keyName="cursorRight" name={t("cursorRight")} defaultValue={"→"} />
    </>
  );
}
