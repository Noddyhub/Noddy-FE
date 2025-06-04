import { useNavigate } from "react-router-dom";

export default function InstructionPageLayout() {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/option-page");
  };

  return (
    <>
      <div className="absolute -z-100 h-[100vh] w-[50vh] bg-gray-50"></div>
      <div className="flex h-[50vh] w-[50vh] flex-col justify-between">
        <div className="flex h-[50vh] w-full flex-col items-center justify-center rounded-4xl bg-gray-100">
          안내 이미지
        </div>
        <div className="my-4 flex justify-end gap-2">
          <button className="cursor-pointer rounded-xl bg-gray-200 px-4 py-2 font-bold">Prev</button>
          <button className="cursor-pointer rounded-xl bg-gray-200 px-4 py-2 font-bold">Next</button>
          <button className="cursor-pointer rounded-xl bg-gray-200 px-4 py-2 font-bold" onClick={clickHandler}>
            Skip
          </button>
        </div>
      </div>
    </>
  );
}
