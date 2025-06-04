import ControlKey from "@/components/ControlKey";
import ControlSlider from "@/components/ControlSlider";

export default function CursorModeOptions() {
  return (
    <>
      <ControlSlider name={"Cursor Sensitivity"} />
      <ControlSlider name={"Cursor Reaction Speed"} />
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
