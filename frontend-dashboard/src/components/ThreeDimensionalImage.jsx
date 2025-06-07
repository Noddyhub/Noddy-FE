import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useThemeStore } from "@/stores/useThemeStore";
import useMousePosition from "@/hooks/useMousePosition";

function Model({ mousePosition }) {
  const { scene } = useGLTF("/headImage.gltf");
  const ref = useRef();
  const isThemeDark = useThemeStore((state) => state.isThemeDark);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set(isThemeDark ? "rgb(140,140,140)" : "white");
      }
    });
  }, [isThemeDark, scene]);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y = -(mousePosition.current.x - window.innerWidth / 2) * 0.0008;
      ref.current.rotation.x = (mousePosition.current.y - window.innerHeight / 2) * 0.0008;
    }
  });

  return <primitive object={scene} ref={ref} position={[0, 0.2, 0]} />;
}

export default function ThreeDimensionalImage() {
  const isThemeDark = useThemeStore((state) => state.isThemeDark);
  const mousePosition = useMousePosition();

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
      <Model mousePosition={mousePosition} />
    </Canvas>
  );
}
