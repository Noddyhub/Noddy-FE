import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import VirtualKeyboard from "@/components/VirtualImage/VirtualKeyboard";

export default function OptionsList({ name, handleButtonPress }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { t } = useTranslation();

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        className="w-[12.5vh] cursor-pointer rounded-lg bg-gray-200 py-0.5 shadow transition duration-300 hover:shadow-md dark:bg-gray-800 dark:text-white"
      >
        {t("shortcutSelection")}
      </button>
      {showDropdown && <VirtualKeyboard name={name} handleButtonPress={handleButtonPress} />}
    </div>
  );
}
