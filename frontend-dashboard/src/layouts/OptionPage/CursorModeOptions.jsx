import ControlKey from "@/components/Control/ControlKey";
import ControlSlider from "@/components/Control/ControlSlider";

export default function CursorModeOptions() {
  return (
    <>
      <ControlSlider name={"커서 민감도"} min={1} max={10} step={1} defaultValue={5} />
      <ControlSlider name={"커서 반응속도"} min={1} max={10} step={1} defaultValue={5} />
      <ControlKey name={"모드 변환"} />
      <ControlKey name={"좌클릭"} />
      <ControlKey name={"우클릭"} />
      <ControlKey name={"커서 조작 일시정지"} />
      <ControlKey name={"커서 위로"} />
      <ControlKey name={"커서 아래로"} />
      <ControlKey name={"커서 왼쪽으로"} />
      <ControlKey name={"커서 오른쪽으로"} />
    </>
  );
}
