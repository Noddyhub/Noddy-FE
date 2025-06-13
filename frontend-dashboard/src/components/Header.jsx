import { useTranslation } from "react-i18next";
import { CursorArrowRippleIcon, ArrowsUpDownIcon } from "@heroicons/react/20/solid";
import { usePageStore } from "@/stores/usePageStore";

export default function Header() {
  const { t } = useTranslation();
  const setOptionPage = usePageStore((state) => state.setOptionPage);

  return (
    <>
      <div className="h-[10vh] w-[50vh] rounded-2xl">
        <div className="flex justify-center text-4xl font-extrabold tracking-tight dark:text-white">Noddy</div>
        <div className="mt-[1.5vh] flex h-[3vh] w-[50vh]">
          <button
            className="mr-3 ml-auto flex h-[4vh] w-[4vh] cursor-pointer items-center justify-center rounded-xl bg-gray-200 p-1 shadow dark:bg-gray-800 dark:text-white"
            onClick={() => setOptionPage(t("cursor"))}
          >
            <CursorArrowRippleIcon className="h-full w-full p-1" />
          </button>
          <button
            className="mr-8 flex h-[4vh] w-[4vh] cursor-pointer items-center justify-center rounded-xl bg-gray-200 p-1 shadow dark:bg-gray-800 dark:text-white"
            onClick={() => setOptionPage(t("scroll"))}
          >
            <ArrowsUpDownIcon className="h-full w-full p-1" />
          </button>
        </div>
      </div>
    </>
  );
}
