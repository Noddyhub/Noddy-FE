import { useTranslation } from "react-i18next";
import ControlKey from "@/components/Control/ControlKey";
import ControlSlider from "@/components/Control/ControlSlider";

export default function SliderModeOptions() {
  const { t } = useTranslation();

  return (
    <>
      <ControlSlider KeyName="scrollSpeed" name={t("scrollSpeed")} min={50} max={550} step={10} defaultValue={300} />
      <ControlKey KeyName="scrollPause" name={t("scrollPause")} />
    </>
  );
}
