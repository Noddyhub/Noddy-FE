import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useSocket from "../hooks/useSocket";

export default function InstructionPageLayout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  useSocket();

  const skipPages = () => {
    navigate("/option-page");
  };

  const pageOrder = ["/instruction-page/page-1", "/instruction-page/page-2"];

  const currentIndex = pageOrder.indexOf(location.pathname);

  const goToPreviousPage = () => {
    if (currentIndex > 0) {
      navigate(pageOrder[currentIndex - 1]);
    }
  };

  const goToNextPage = () => {
    if (currentIndex < pageOrder.length - 1) {
      navigate(pageOrder[currentIndex + 1]);
    }
  };

  return (
    <>
      <div className="flex w-[50vh] flex-col items-center justify-between">
        <div className="flex h-[50vh] w-[45vh] flex-col items-center justify-center rounded-4xl">
          <Outlet />
        </div>
        <div className="my-4 flex gap-2">
          <button
            onClick={goToPreviousPage}
            disabled={currentIndex === 0}
            className="cursor-pointer rounded-xl bg-gray-200 px-4 py-2 font-bold tracking-widest shadow disabled:opacity-50 dark:bg-gray-800 dark:text-white"
          >
            {t("prev")}
          </button>
          <button
            onClick={goToNextPage}
            disabled={currentIndex === pageOrder.length - 1}
            className="cursor-pointer rounded-xl bg-gray-200 px-4 py-2 font-bold tracking-widest shadow disabled:opacity-50 dark:bg-gray-800 dark:text-white"
          >
            {t("next")}
          </button>
          <button
            className="cursor-pointer rounded-xl bg-gray-200 px-4 py-2 font-bold tracking-widest shadow dark:bg-gray-800 dark:text-white"
            onClick={skipPages}
          >
            {t("skip")}
          </button>
        </div>
      </div>
    </>
  );
}
