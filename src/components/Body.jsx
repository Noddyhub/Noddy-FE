import { useTranslation } from "react-i18next";
import { usePageStore } from "@/stores/usePageStore";

export default function Body({ children }) {
  const { t } = useTranslation();
  const optionPage = usePageStore((state) => state.optionPage);

  return (
    <>
      <div className="mt-2 mb-2 flex justify-center text-2xl font-bold tracking-widest transition duration-300 dark:text-white">
        {t(optionPage)}
      </div>
      <div className="m-2 flex h-[30vh] w-[50vh] flex-col items-center justify-start overflow-y-auto rounded-2xl">
        <div className="flex flex-col items-center">{children}</div>
      </div>
    </>
  );
}
