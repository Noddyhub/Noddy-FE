import HeadImage from "@/assets/headImage.jpg";

export default function Footer() {
  return (
    <>
      <div className="flex h-[20vh] w-[50vh] items-center justify-center rounded-2xl">
        <img className="mr-[2vh] h-[17vh] w-[17vh] rounded-2xl" src={HeadImage}></img>
        <div className="flex h-[17vh] w-[25vh] flex-col items-center justify-center rounded-2xl bg-gray-200 dark:bg-gray-800 dark:text-white">
          <div className="flex justify-center">AirPods</div>
          <div className="pl-2">Name: Name</div>
          <div className="pl-2">Battery: 90%</div>
        </div>
      </div>
    </>
  );
}
