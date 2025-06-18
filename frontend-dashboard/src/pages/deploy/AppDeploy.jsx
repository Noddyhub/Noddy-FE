import logoImg from "../../../public/noddyLogo.png";
import { useTranslation } from "react-i18next";

export default function AppDeploy() {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5 dark:text-white">
      <button>
        <a
          href="https://noddy-app.s3.ap-northeast-2.amazonaws.com/Noddy.dmg"
          className="flex items-center justify-center"
          download
        >
          <img src={logoImg} className="w-[20%]" alt="LogoImg" />
        </a>
      </button>
      <p className="text-2xl">{t("download")}</p>
    </div>
  );
}
