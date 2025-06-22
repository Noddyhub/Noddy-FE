import { useState, useEffect, useRef } from "react";
import { useMovementStore } from "@/stores/useMovementStore";
import { useDeviceInfoStore } from "@/stores/useDeviceInfoStore";

export default function useSocket() {
  const [clientId, setClientId] = useState(null);
  const socketRef = useRef(null);
  const { setPitch, setYaw } = useMovementStore();
  const { setMacBattery, setAirPodsName, setRunningTime } = useDeviceInfoStore();

  useEffect(() => {
    const getClientId = async () => {
      const clientId = localStorage.getItem("token");

      if (!clientId) return;

      setClientId(clientId);

      socketRef.current = new WebSocket(`${import.meta.env.VITE_SOCKET_ENDPOINT}`);
      const socket = socketRef.current;

      socket.onopen = () => {
        socket.send(JSON.stringify({ type: "register-react", clientId }));
      };

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          setPitch(message.pitch);
          setYaw(message.yaw);
          setMacBattery(message.macBattery);
          setAirPodsName(message.name);
          setRunningTime(message.time);
        } catch (e) {
          return;
        }
      };
    };

    getClientId();

    return () => socketRef.current?.close();
  }, []);

  const sendMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    }
  };

  return { sendMessage, clientId };
}
