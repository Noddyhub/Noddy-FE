import { useNavigate } from "react-router-dom";
import AirPodsImage from "@/assets/AirPodsImage.png";

export default function StartPageLayout() {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/instruction-page");
  };

  return (
    <>
      <div className="absolute -z-100 h-[100vh] w-[50vh] bg-gray-50"></div>
      <div className="flex justify-center text-6xl font-extrabold">Noddy</div>
      <img className="mt-10 w-[30vh]" src={AirPodsImage} />
      <button className="mt-10 cursor-pointer rounded-xl bg-gray-200 px-4 py-2 font-bold" onClick={clickHandler}>
        START
      </button>
    </>
  );
}
