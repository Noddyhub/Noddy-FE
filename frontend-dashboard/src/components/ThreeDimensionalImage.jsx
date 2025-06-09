import { Canvas } from "@react-three/fiber";
import { useThemeStore } from "@/stores/useThemeStore";

export default function ThreeDimensionalImage(options) {
  const isThemeDark = useThemeStore((state) => state.isThemeDark);
  const { rounded, model, cameraRotation } = options;

  return (
    <Canvas
      dpr={window.devicePixelRatio}
      camera={{ fov: 8, position: [0, cameraRotation || 0, -30], near: 1, far: 1000 }}
      style={{
        background: isThemeDark ? "white" : "black",
      }}
      className={`rounded-${rounded ? rounded : "2xl"}`}
    >
      <hemisphereLight args={["#ffffff", "#444444", 1.5]} position={[0, 20, 0]} />
      {model}
    </Canvas>
  );
}
