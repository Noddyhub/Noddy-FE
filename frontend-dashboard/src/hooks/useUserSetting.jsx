import { useState, useEffect } from "react";

export default function useUserSetting(key, defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email || !key) return;

    const fetchSetting = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/settings?email=${email}`);
        const data = await res.json();

        if (data && data[key] !== undefined) {
          setValue(data[key]);
        }
      } catch (err) {
        console.error("설정 불러오기 실피", err);
      }
    };

    fetchSetting();
  }, [email, key]);

  const updateSetting = async (newValue) => {
    setValue(newValue);
    if (!email || !key) return;
    try {
      await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          key,
          value: newValue,
        }),
      });
    } catch (err) {
      console.error("설정 저장 실패: ", err);
    }
  };

  return [value, updateSetting];
}
