import { useMovementStore } from "@/stores/useMovementStore";
import { CursorArrowRippleIcon, ArrowsUpDownIcon } from "@heroicons/react/20/solid";
import windowBackground from "@/assets/windowBackground.jpg";

export default function VirtualWindow() {
  const { pitch, yaw } = useMovementStore();

  return (
    <div className="absolute z-50 h-[15.5vh] w-[25vh] -translate-y-35 overflow-hidden rounded-lg">
      <div className="absolute left-[12.5vh] h-[15.5vh] w-0.5 bg-black"></div>
      <div className="absolute top-[7.75vh] h-0.5 w-[25vh] bg-black"></div>
      <img src={windowBackground} />
      <div
        className="absolute h-2 w-2 rounded-full border-1 border-white bg-black shadow"
        style={{
          left: `${yaw * 25}vh`,
          bottom: `${pitch * 15.5}vh`,
          transform: "translate(-50%, 50%)",
        }}
      />
    </div>
  );
}
