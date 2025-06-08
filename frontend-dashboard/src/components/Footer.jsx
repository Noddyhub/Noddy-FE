import ThreeDimensionalImage from "@/components/ThreeDimensionalImage";

export default function Footer() {
  return (
    <div className="mt-[2vh] flex w-[45vh] items-center justify-between rounded-2xl px-2">
      <div className="h-[25vh] w-[25vh] overflow-hidden rounded-2xl">
        <ThreeDimensionalImage rounded={"2xl"} />
      </div>
      <div className="flex h-[25vh] w-[14vh] flex-col items-center justify-center rounded-2xl bg-gray-200 dark:bg-gray-800 dark:text-white">
        <div className="flex justify-center">AirPods</div>
        <div className="pl-2">Name: Name</div>
        <div className="pl-2">Battery: 90%</div>
      </div>
    </div>
  );
}
