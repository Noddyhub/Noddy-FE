import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";

export default function OAuthSuccessPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      const user = jwtDecode(token);
      const name = user.name;
      const email = user.email;
      localStorage.setItem("email", email);

      const callbackId = localStorage.getItem("callbackId");
      if (callbackId) {
        (async () => {
          const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              callbackId,
              token,
              name,
              email,
            }),
          });

          if (!res.ok) {
            throw new Error("서버 응답 실패");
          }
        })();
      }
    } else {
      navigate("/main");
    }
  }, []);

  const handleAppLaunch = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    navigate("/main");
  };

  return (
    <div className="flex flex-col items-center justify-center text-center whitespace-pre-line transition duration-300 dark:text-white">
      <p>{t("signInSuccess")}</p>
      <button
        onClick={handleAppLaunch}
        className="dark:text-whit mt-4 cursor-pointer rounded-xl bg-gray-200 px-4 py-2 font-semibold shadow transition duration-300 hover:shadow-md dark:bg-gray-800"
      >
        {t("signInSuccessButton")}
      </button>
    </div>
  );
}
