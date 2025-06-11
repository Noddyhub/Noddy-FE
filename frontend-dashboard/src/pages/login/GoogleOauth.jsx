import { useEffect } from "react";
import GoogleLoginButton from "./GoogleLoginButton";

export default function GoogleOAuth() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const callbackId = urlParams.get("callbackId");

    if (callbackId) {
      localStorage.setItem("callbackId", callbackId);
      console.log("✅ callbackId 저장됨:", callbackId);
    }
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5">
      <h2 className="text-2xl font-semibold">로그인</h2>
      <p className="text-gray-600">Google 계정으로 로그인하고 macOS 앱과 연결하세요.</p>
      <GoogleLoginButton />
    </div>
  );
}
