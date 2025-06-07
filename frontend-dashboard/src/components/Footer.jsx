import ThreeDimensionalImage from "@/components/ThreeDimensionalImage";

export default function Footer() {
  return (
    <div className="flex h-[20vh] w-[50vh] items-center justify-center rounded-2xl">
      <div className="mr-[2vh] h-[17vh] w-[17vh] overflow-hidden rounded-2xl">
        <ThreeDimensionalImage />
      </div>
      <div className="flex h-[17vh] w-[25vh] flex-col items-center justify-center rounded-2xl bg-gray-200 dark:bg-gray-800 dark:text-white">
        <div className="flex justify-center">AirPods</div>
        <div className="pl-2">Name: Name</div>
        <div className="pl-2">Battery: 90%</div>
      </div>
    </div>
  );
}
