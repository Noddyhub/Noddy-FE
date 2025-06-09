import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton() {
  const handleLogin = () => {
    window.location.href = "http://localhost:8080/auth/google";
  };

  return (
    <button
      onClick={handleLogin}
      className="flex items-center gap-3 px-5 py-3 bg-white border border-gray-300 rounded-xl shadow hover:shadow-md transition duration-200"
    >
      <FcGoogle className="text-2xl" />
      <span className="text-gray-800 font-medium">Google로 로그인</span>
    </button>
  );
}
