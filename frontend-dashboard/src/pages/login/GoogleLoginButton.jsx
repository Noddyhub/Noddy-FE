import { FcGoogle } from "react-icons/fc";
import { useTranslation } from "react-i18next";

export default function GoogleLoginButton() {
  const { t } = useTranslation();

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_ENDPOINT}/auth/google`;
  };

  return (
    <button
      onClick={handleLogin}
      className="borde flex items-center gap-3 rounded-xl bg-white px-5 py-3 shadow transition duration-200 hover:shadow-md dark:bg-gray-500"
    >
      <FcGoogle className="text-2xl" />
      <span className="font-medium text-gray-800 dark:text-gray-50">{t("signInButton")}</span>
    </button>
  );
}
