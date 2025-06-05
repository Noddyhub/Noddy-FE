import ControlKey from "@/components/ControlKey";
import ControlSlider from "@/components/ControlSlider";

export default function CursorModeOptions() {
  return (
    <>
      <ControlSlider
        name={"Cursor Sensitivity"}
        min={3}
        max={10}
        step={0.1}
        defaultValue={6}
      />
      <ControlSlider
        name={"Cursor Reaction Speed"}
        min={1}
        max={10}
        step={1}
        defaultValue={5}
      />
      <ControlKey name={"Toggle Mode"} />
      <ControlKey name={"Left Click"} />
      <ControlKey name={"Right Click"} />
      <ControlKey name={"Pause Cursor"} />
      <ControlKey name={"Move Cursor Up"} />
      <ControlKey name={"Move Cursor Down"} />
      <ControlKey name={"Move Cursor Left"} />
      <ControlKey name={"Move Cursor Right"} />
    </>
  );
}
