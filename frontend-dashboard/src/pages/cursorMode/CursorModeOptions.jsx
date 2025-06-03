import ControlKey from "@/components/ControlKey";
import ControlSlider from "@/components/ControlSlider";

export default function CursorModeOptions() {
  return (
    <>
      <div className="m-2 flex h-[50vh] w-[50vh] flex-col items-center justify-start rounded-2xl border-2">
        <div className="font-bold">Option</div>
        <ControlSlider name={"Cursor Sensitivity"} />
        <ControlKey name={"Toggle Mode"} />
        <ControlKey name={"Left Click"} />
      </div>
    </>
  );
}
