import { useState, useEffect } from "react";
import { useHotkeyStore } from "@/stores/useHotkeyStore";

export default function useUserSetting(key, defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const { assignedHotkeys, setAssignedHotkeys } = useHotkeyStore();
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email || !key) return;

    const fetchSetting = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/settings?email=${email}`);
        const data = await res.json();

        const matchedSetting = data.find((item) => item.key === key);

        if (matchedSetting && matchedSetting.value !== undefined) {
          setValue(matchedSetting.value);
          setAssignedHotkeys((prev) => ({ ...prev, [key]: matchedSetting.value }));
        } else {
          setValue(defaultValue);
          setAssignedHotkeys((prev) => ({ ...prev, [key]: defaultValue }));
        }
      } catch (err) {
        console.error("설정 불러오기 실패", err);
        setValue(defaultValue);
        setAssignedHotkeys((prev) => ({ ...prev, [key]: defaultValue }));
      }
    };

    fetchSetting();
  }, [email, key, defaultValue]);

  const updateSetting = async (newValue) => {
    setValue(newValue);
    setAssignedHotkeys((prev) => ({ ...prev, [key]: newValue }));

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

  return { value, updateSetting };
}
