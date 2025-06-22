import { useState, useEffect } from "react";

export default function useUserSetting(key, defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email || !key) return;

    const fetchSetting = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/settings?email=${email}`);
      const data = await res.json();

      if (data && data[key] !== undefined) {
        setValue(data[key]);
      }
    };

    fetchSetting();
  }, [email, key]);

  const updateSetting = async (newValue) => {
    setValue(newValue);

    if (!email || !key) return;

    await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/settings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        key,
        value: newValue,
      }),
    });
  };

  return { value, updateSetting };
}
