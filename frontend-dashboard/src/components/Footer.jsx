import ThreeDimensionalImage from "@/components/ThreeDimensionalImage";
import Model3D from "@/components/Model3D";

export default function Footer() {
  const VALUE_ROTATING_MODEL_FORWARD = 3.8;

  return (
    <div className="mt-[2vh] flex w-[45vh] items-center justify-between rounded-2xl px-2">
      <div className="h-[25vh] w-[25vh] overflow-hidden rounded-2xl">
        <ThreeDimensionalImage model={<Model3D direction={VALUE_ROTATING_MODEL_FORWARD} />} />
      </div>
      <div className="flex h-[25vh] w-[14vh] flex-col items-center justify-center rounded-2xl bg-gray-200 dark:bg-gray-800 dark:text-white">
        <div className="flex justify-center">AirPods</div>
        <div className="pl-2">Name: Name</div>
        <div className="pl-2">Battery: 90%</div>
      </div>
    </div>
  );
}
