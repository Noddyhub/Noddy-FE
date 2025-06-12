import ControlKey from "@/components/Control/ControlKey";
import ControlSlider from "@/components/Control/ControlSlider";

export default function SliderModeOptions() {
  return (
    <>
      <ControlSlider name={"스크롤 속도"} min={50} max={550} step={10} defaultValue={300} />
      <ControlKey name={"스크롤 일시정지"} />
    </>
  );
}
