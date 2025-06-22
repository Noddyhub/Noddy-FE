import { useEffect } from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import { useTranslation } from "react-i18next";

export default function GoogleSignIn() {
  const { t } = useTranslation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const callbackId = urlParams.get("callbackId");

    if (callbackId) {
      localStorage.setItem("callbackId", callbackId);
      console.log("✅ callbackId 저장됨:", callbackId);
    }
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5 dark:text-white">
      <h2 className="text-2xl font-semibold transition duration-300">{t("signIn")}</h2>
      <p className="text-gray-600 transition duration-300 dark:text-gray-200">{t("signInInstruction")}</p>
      <GoogleLoginButton />
    </div>
  );
}
