import { useMovementStore } from "@/stores/useMovementStore";

export default function Header() {
  const setOptionPage = useMovementStore((state) => state.setOptionPage);

  return (
    <>
      <div className="h-[10vh] w-[50vh] rounded-2xl">
        <div className="flex justify-center text-4xl font-extrabold dark:text-white">Noddy</div>
        <div className="mt-[1.5vh] flex h-[3vh] w-[50vh]">
          <button
            className="mr-2 ml-auto h-[4vh] w-[7vh] cursor-pointer rounded-xl bg-gray-200 font-bold shadow dark:bg-gray-800 dark:text-white"
            onClick={() => setOptionPage("Cursor")}
          >
            Cursor
          </button>
          <button
            className="mr-3 h-[4vh] w-[7vh] cursor-pointer rounded-xl bg-gray-200 font-bold shadow dark:bg-gray-800 dark:text-white"
            onClick={() => setOptionPage("Scroll")}
          >
            Scroll
          </button>
        </div>
      </div>
    </>
  );
}
