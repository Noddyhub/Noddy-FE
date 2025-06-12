import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton() {
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
  const TEST_STATIC_INCLUDE = `${API_ENDPOINT}/__include_this__`;

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_ENDPOINT}/auth/google`;
  };

  return (
    <button
      onClick={handleLogin}
      className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-5 py-3 shadow transition duration-200 hover:shadow-md"
    >
      <FcGoogle className="text-2xl" />
      <span className="font-medium text-gray-800">Google로 로그인</span>
    </button>
  );
}
