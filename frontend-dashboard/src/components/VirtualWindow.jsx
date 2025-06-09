import { useMovementStore } from "@/stores/useMovementStore";
import { CursorArrowRippleIcon } from "@heroicons/react/20/solid";
import windowBackground from "@/assets/windowBackground.jpg";
import cursor from "@/assets/cursor.png";

export default function VirtualWindow() {
  const { pitch, yaw } = useMovementStore();

  return (
    <div className="absolute z-50 h-[15.5vh] w-[25vh] -translate-y-35 overflow-hidden">
      <img src={windowBackground} className="rounded-lg" />
      <img
        src={cursor}
        className="absolute w-2 text-black drop-shadow"
        style={{
          left: `${yaw * 25}vh`,
          bottom: `${pitch * 15.5}vh`,
          transform: "translate(-50%, 50%)",
        }}
      />
    </div>
  );
}
