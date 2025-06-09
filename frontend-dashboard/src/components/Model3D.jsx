import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useThemeStore } from "@/stores/useThemeStore";
import { useMovementStore } from "@/stores/useMovementStore";

export default function Model3D({ direction }) {
  const { scene } = useGLTF("/headImage.gltf");
  const modelRef = useRef();
  const isThemeDark = useThemeStore((state) => state.isThemeDark);
  const { pitch, yaw } = useMovementStore();
  const rotatingDirection = direction === 3.8 ? 1 : -1;

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set(isThemeDark ? "rgb(140,140,140)" : "white");
      }
    });
  }, [isThemeDark, scene]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.x = (pitch - 0.5) * window.innerWidth * 0.0004;
      modelRef.current.rotation.y = rotatingDirection * (yaw - direction) * window.innerHeight * 0.001;
    }
  });

  return <primitive object={scene} ref={modelRef} position={[0, 0.2, 0]} />;
}
