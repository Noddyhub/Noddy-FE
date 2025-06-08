import { useNavigate } from "react-router-dom";
import AirPodsImage from "@/assets/AirPodsImage.png";

export default function StartPageLayout() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/instruction-page/page-1");
  };

  return (
    <>
      <div className="flex justify-center text-6xl font-extrabold dark:text-white">Noddy</div>
      <img className="mt-10 w-[30vh]" src={AirPodsImage} />
      <button
        className="mt-10 cursor-pointer rounded-xl bg-gray-200 px-4 py-2 font-bold shadow dark:bg-gray-800 dark:text-white"
        onClick={handleStartClick}
      >
        START
      </button>
    </>
  );
}
