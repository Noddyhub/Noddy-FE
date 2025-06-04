import { useMovementStore } from "@/stores/useMovementStore";

export default function Body({ children }) {
  const optionPage = useMovementStore((state) => state.optionPage);

  return (
    <>
      <div className="mt-2 mb-2 flex justify-center text-2xl font-bold dark:text-white">{optionPage}</div>
      <div className="m-2 flex h-[30vh] w-[50vh] flex-col items-center justify-start overflow-y-auto rounded-2xl">
        <div className="flex flex-col items-center">{children}</div>
      </div>
    </>
  );
}
