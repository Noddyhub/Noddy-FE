export default async function fetchClientId() {
  try {
    const res = await fetch(`http://${import.meta.env.VITE_EC2_PUBLIC_IP}:${import.meta.env.VITE_EC2_PORT}/client-id`)
    if (!res.ok) throw new Error("서버에서 clientId를 가져오지 못했습니다");

    const { clientId } = await res.json();
    return clientId;
  } catch (error) {
    console.error("❌ clientId 가져오기 실패:", error);
    return null;
  }
}

