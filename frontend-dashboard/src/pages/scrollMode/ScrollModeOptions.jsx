import ControlKey from "@/components/ControlKey";
import ControlSlider from "@/components/ControlSlider";

export default function SliderModeOptions() {
  return (
    <>
      <ControlSlider
        name={"Scroll Speed"}
        min={50}
        max={550}
        step={10}
        defaultValue={300}
      />
      <ControlKey name={"Pause Scroll"} />
    </>
  );
}
