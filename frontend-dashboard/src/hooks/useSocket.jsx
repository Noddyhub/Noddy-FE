import { useEffect, useRef } from "react";

export default function useSocket() {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket(`ws://${import.meta.env.VITE_EC2_PUBLIC_IP}:${import.meta.env.VITE_EC2_PORT}`);
    const socket = socketRef.current;

    socket.onopen = (event) => { console.log('WebSocket 연결 완료:', event) };

    socket.onmessage = (event) => { console.log("서버 응답:", event.data) };

    socket.onerror = (err) => { console.error("WebSocket 에러:", err) };

    socket.onclose = () => { console.log("WebSocket 연결 종료") };

    return () => socketRef.current.close();
  }, []);

  const sendMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    } else {
      console.warn("⚠️ WebSocket이 아직 열리지 않았습니다.");
    }
  };

  return { sendMessage };
};
