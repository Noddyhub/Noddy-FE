import ThreeDimensionalImage from "@/components/ThreeDimensionalImage";

export default function Footer() {
  return (
    <div className="mt-[2vh] flex items-center justify-center rounded-2xl">
      <div className="mr-[3vh] h-[25vh] w-[25vh] overflow-hidden rounded-2xl">
        <ThreeDimensionalImage />
      </div>
      <div className="flex h-[25vh] w-[14vh] flex-col items-center justify-center rounded-2xl bg-gray-200 dark:bg-gray-800 dark:text-white">
        <div className="flex justify-center">AirPods</div>
        <div className="pl-2">Name: Name</div>
        <div className="pl-2">Battery: 90%</div>
      </div>
    </div>
  );
}
