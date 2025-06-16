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
      <ControlKey KeyName="toggleMode" name={t("toggleMode")} />
      <ControlKey KeyName="leftClick" name={t("leftClick")} />
      <ControlKey KeyName="rightClick" name={t("rightClick")} />
      <ControlKey KeyName="cursorPause" name={t("cursorPause")} />
      <ControlKey KeyName="cursorUp" name={t("cursorUp")} />
      <ControlKey KeyName="cursorDown" name={t("cursorDown")} />
      <ControlKey KeyName="cursorLeft" name={t("cursorLeft")} />
      <ControlKey KeyName="cursorRight" name={t("cursorRight")} />
    </>
  );
}
