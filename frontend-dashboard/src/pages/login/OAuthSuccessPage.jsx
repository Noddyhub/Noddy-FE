import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function OAuthSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);

      const user = jwtDecode(token);
      console.log("✅ 로그인한 사용자:", user);

      // 토큰 저장 후 메인 페이지로 이동
      navigate("/");
    } else {
      console.error("❌ 토큰이 없습니다.");
      navigate("/"); // 실패 시 기본 경로로 이동
    }
  }, []);

  return <p>로그인 중입니다...</p>;
}
