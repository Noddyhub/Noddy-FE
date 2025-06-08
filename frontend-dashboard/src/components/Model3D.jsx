import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useThemeStore } from "@/stores/useThemeStore";
import { useMovementStore } from "@/stores/useMovementStore";

export default function Model3D() {
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
