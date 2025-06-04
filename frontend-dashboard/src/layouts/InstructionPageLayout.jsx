import { useNavigate } from "react-router-dom";

export default function InstructionPageLayout() {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/option-page");
  };

  return (
    <>
      <div className="flex w-[50vh] flex-col items-center justify-between">
        <div className="flex h-[45vh] w-[45vh] flex-col items-center justify-center rounded-4xl bg-gray-100">
          안내 이미지
        </div>
        <div className="my-4 flex gap-2">
          <button className="cursor-pointer rounded-xl bg-gray-200 px-4 py-2 font-bold shadow dark:bg-gray-800 dark:text-white">
            Prev
          </button>
          <button className="cursor-pointer rounded-xl bg-gray-200 px-4 py-2 font-bold shadow dark:bg-gray-800 dark:text-white">
            Next
          </button>
          <button
            className="cursor-pointer rounded-xl bg-gray-200 px-4 py-2 font-bold shadow dark:bg-gray-800 dark:text-white"
            onClick={clickHandler}
          >
            Skip
          </button>
        </div>
      </div>
    </>
  );
}
