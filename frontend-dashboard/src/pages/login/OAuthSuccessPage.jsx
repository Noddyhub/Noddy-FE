import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import i18n from "@/utils/i18n";

export default function OAuthSuccessPage() {
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
      console.log("✅ 로그인한 사용자:", user);

      if (user?.locale) {
        i18n.changeLanguage(user.locale);
        console.log("사용자 locale: ", user.locale);
      }

      const callbackId = localStorage.getItem("callbackId");
      if (callbackId) {
        (async () => {
          try {
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
              throw new Error("❌ 서버 응답 실패");
            }
          } catch (err) {
            console.error("❌ 서버에 토큰 전달 실패:", err);
          }
        })();
      }
    } else {
      navigate("/");
    }
  }, []);

  const handleAppLaunch = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <p>로그인 완료! 앱으로 이동하려면 아래 버튼을 눌러주세요</p>
      <button onClick={handleAppLaunch} className="mt-4 rounded bg-blue-500 px-4 py-2 text-white">
        앱 실행하기
      </button>
    </div>
  );
}
