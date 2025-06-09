import { useMovementStore } from "@/stores/useMovementStore";
import windowBackground from "@/assets/windowBackground.jpg";

export default function VirtualWindow() {
  const { pitch, yaw } = useMovementStore();

  return (
    <div className="absolute z-50 h-[15.5vh] w-[25vh] -translate-y-24 overflow-hidden bg-amber-50">
      <img src={windowBackground} />
      <div
        className="absolute h-2 w-2 rounded-full bg-black"
        style={{
          left: `${yaw * 25}vh`,
          bottom: `${pitch * 15.5}vh`,
          transform: "translate(-50%, 50%)",
        }}
      />
    </div>
  );
}
