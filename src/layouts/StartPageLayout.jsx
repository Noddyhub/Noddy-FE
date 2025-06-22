import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AirPodsImage from "@/assets/AirPodsImage.png";

export default function StartPageLayout() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/instruction-page/page-1");
  };

  return (
    <>
      <div className="flex justify-center text-6xl font-extrabold tracking-tight transition duration-300 dark:text-white">
        Noddy
      </div>
      <img className="mt-10 w-[30vh]" src={AirPodsImage} />
      <button
        className="mt-10 cursor-pointer rounded-xl bg-gray-200 px-4 py-2 text-2xl font-medium tracking-widest shadow transition duration-300 hover:shadow-md dark:bg-gray-800 dark:text-white"
        onClick={handleStartClick}
      >
        {t("start")}
      </button>
    </>
  );
}
