import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useThemeStore } from "@/stores/useThemeStore";
import { useMovementStore } from "@/stores/useMovementStore";

export default function Model3D(props) {
  const { scene } = useGLTF("/headImage.gltf");
  const modelRef = useRef();
  const isThemeDark = useThemeStore((state) => state.isThemeDark);
  const { pitch, yaw } = useMovementStore();
  const { direction, modelTranslationY } = props;
  const ROTATING_DIRECTION = direction === 4.2 ? 1 : -1;

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set(isThemeDark ? "rgb(140,140,140)" : "white");
      }
    });
  }, [isThemeDark, scene]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.x = ROTATING_DIRECTION * (pitch - 0.5) * window.innerWidth * 0.0004;
      modelRef.current.rotation.y = ROTATING_DIRECTION * (yaw - direction) * window.innerHeight * 0.001;
    }
  });

  return <primitive object={scene} ref={modelRef} position={[0, modelTranslationY || 0.2, 0]} />;
}
