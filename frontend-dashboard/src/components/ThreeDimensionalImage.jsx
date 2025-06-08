import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useThemeStore } from "@/stores/useThemeStore";
import { useMovementStore } from "@/stores/useMovementStore";

function Model() {
  const { scene } = useGLTF("/headImage.gltf");
  const ref = useRef();
  const isThemeDark = useThemeStore((state) => state.isThemeDark);
  const { pitch, yaw } = useMovementStore();

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set(isThemeDark ? "rgb(140,140,140)" : "white");
      }
    });
  }, [isThemeDark, scene]);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x = -(pitch - 0.5) * window.innerWidth * 0.0004;
      ref.current.rotation.y = -(yaw - 0.5) * window.innerHeight * 0.001;
    }
  });

  return <primitive object={scene} ref={ref} position={[0, 0.2, 0]} />;
}

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
      <Model />
    </Canvas>
  );
}
