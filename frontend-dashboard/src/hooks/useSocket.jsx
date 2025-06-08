import { useState, useEffect, useRef } from "react";
import { useMovementStore } from "@/stores/useMovementStore";
import fetchClientId from "@/utils/fetchClientId";

export default function useSocket() {
  const [clientId, setClientId] = useState(null);
  const socketRef = useRef(null);
  const { setPitch, setYaw } = useMovementStore();

  useEffect(() => {
    const getClientId = async () => {
      const clientId = "abc123"; // 임시 clientID 할당
      if (!clientId) return;

      setClientId(clientId);

      socketRef.current = new WebSocket(`ws://${import.meta.env.VITE_EC2_PUBLIC_IP}:${import.meta.env.VITE_EC2_PORT}`);
      const socket = socketRef.current;

      socket.onopen = () => {
        socket.send(JSON.stringify({ type: "register-react", clientId }));
        console.log("✅ React 클라이언트 ID 전송:", clientId);
      };

      socket.onmessage = (event) => {
        try {
          console.log("📥 수신한 원시 데이터:", event.data);
          const message = JSON.parse(event.data);
          setPitch(message.pitch);
          setYaw(message.yaw);
        } catch(e) {
          console.warn("❗데이터 타입이 JSON이 아닙니다.", event.data);
          return;
        }
      };

      socket.onerror = (err) => { console.error("WebSocket 에러:", err) };
      socket.onclose = () => { console.log("WebSocket 연결 종료") };
    }

    getClientId();

    return () => socketRef.current?.close();;
  }, []);

  const sendMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      console.log(message)
      socketRef.current.send(message);
    } else {
      console.warn("⚠️ WebSocket이 아직 열리지 않았습니다.");
    }
  };

  return { sendMessage, clientId };
};
