import { Canvas } from "@react-three/fiber";
import { useThemeStore } from "@/stores/useThemeStore";
import Model3D from "@/components/Model3D";

export default function ThreeDimensionalImage() {
  const isThemeDark = useThemeStore((state) => state.isThemeDark);

  return (
    <Canvas
      dpr={window.devicePixelRatio}
      camera={{ fov: 8, position: [0, 0, -30], near: 1, far: 1000 }}
      style={{
        background: isThemeDark ? "white" : "black",
        borderRadius: "1rem",
      }}
    >
      <hemisphereLight args={["#ffffff", "#444444", 1.5]} position={[0, 20, 0]} />
      <Model3D />
    </Canvas>
  );
}
