import { usePageStore } from "@/stores/usePageStore";
import { CursorArrowRippleIcon, ArrowsUpDownIcon } from "@heroicons/react/20/solid";

export default function Header() {
  const setOptionPage = usePageStore((state) => state.setOptionPage);

  return (
    <>
      <div className="h-[10vh] w-[50vh] rounded-2xl">
        <div className="flex justify-center text-4xl font-extrabold tracking-tight dark:text-white">Noddy</div>
        <div className="mt-[1.5vh] flex h-[3vh] w-[50vh]">
          <button
            className="mr-3 ml-auto flex h-[4vh] w-[4vh] cursor-pointer items-center justify-center rounded-xl bg-gray-200 p-1 shadow dark:bg-gray-800 dark:text-white"
            onClick={() => setOptionPage("커서")}
          >
            <CursorArrowRippleIcon className="h-full w-full p-1" />
          </button>
          <button
            className="mr-8 flex h-[4vh] w-[4vh] cursor-pointer items-center justify-center rounded-xl bg-gray-200 p-1 shadow dark:bg-gray-800 dark:text-white"
            onClick={() => setOptionPage("스크롤")}
          >
            <ArrowsUpDownIcon className="h-full w-full p-1" />
          </button>
        </div>
      </div>
    </>
  );
}
