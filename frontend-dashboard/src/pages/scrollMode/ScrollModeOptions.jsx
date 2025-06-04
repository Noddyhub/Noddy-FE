import ControlKey from "@/components/ControlKey";
import ControlSlider from "@/components/ControlSlider";

export default function SliderModeOptions() {
  return (
    <>
      <ControlSlider name={"Scroll Speed"} />
      <ControlKey name={"Pause Scroll"} />
    </>
  );
}
