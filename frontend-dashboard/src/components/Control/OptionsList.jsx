import { useState } from "react";
import { useTranslation } from "react-i18next";
import useSocket from "@/hooks/useSocket";
import { keyNameToKeyCode } from "@/constants/keyCodes";

export default function OptionsList({ name }) {
  const [hotKey, setHotkey] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { sendMessage, clientId } = useSocket();
  const { t } = useTranslation();

  const handleSelectChange = (e) => {
    const selectedHotKey = e.target.value;
    setHotkey(selectedHotKey);
    sendMessage(JSON.stringify({ type: "hotkey", name, value: selectedHotKey.charCodeAt(0), clientId }));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        className="w-[12.5vh] cursor-pointer rounded-lg bg-gray-200 py-0.5 shadow dark:bg-gray-800 dark:text-white"
      >
        {t("shortcutSelection")}
      </button>
      {showDropdown && (
        <div className="absolute right-0 z-50 mt-2 flex h-[15vh] w-[30vh] items-center justify-center rounded-lg bg-gray-300 p-2 shadow dark:bg-gray-600">
          키보드
        </div>
      )}
    </div>
  );
}
