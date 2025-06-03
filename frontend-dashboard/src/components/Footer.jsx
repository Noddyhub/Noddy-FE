import HeadImage from "@/assets/headImage.jpg";

export default function Footer() {
  return (
    <>
      <div className="flex h-[20vh] w-[50vh] justify-center rounded-2xl border-2">
        <img className="h-[19vh] w-[19vh] rounded-2xl" src={HeadImage}></img>
        <div className="h-[19vh] w-[30vh] rounded-2xl border-2">
          <div className="flex justify-center">AirPods</div>
          <div className="rounded-xl border-2">
            <div>Name: Name</div>
            <div>Battery: 90%</div>
          </div>
        </div>
      </div>
    </>
  );
}
