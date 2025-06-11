import ThreeDimensionalImage from "@/components/3D/ThreeDimensionalImage";
import Model3D from "@/components/3D/Model3D";
import DeviceInfo from "@/components/DeviceInfo";

export default function Footer() {
  const VALUE_ROTATING_MODEL_FORWARD = 3.8;

  return (
    <div className="mt-[2vh] flex w-[45vh] items-center justify-between rounded-2xl px-2">
      <div className="h-[25vh] w-[25vh] overflow-hidden rounded-2xl">
        <ThreeDimensionalImage model={<Model3D direction={VALUE_ROTATING_MODEL_FORWARD} />} />
      </div>
      <DeviceInfo />
    </div>
  );
}
