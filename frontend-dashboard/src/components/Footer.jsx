import HeadImage from "@/assets/headImage.jpg";

export default function Footer() {
  return (
    <>
      <div className="flex h-[20vh] w-[50vh] items-center justify-center rounded-2xl border-2">
        <img className="mr-[2vh] h-[17vh] w-[17vh] rounded-2xl" src={HeadImage}></img>
        <div className="flex h-[17vh] w-[25vh] flex-col items-center justify-center rounded-2xl border-2">
          <div className="flex justify-center">AirPods</div>
          <div className="mt-[1vh] flex h-[10vh] w-[20vh] flex-col justify-center rounded-xl border-2">
            <div className="pl-2">Name: Name</div>
            <div className="pl-2">Battery: 90%</div>
          </div>
        </div>
      </div>
    </>
  );
}
