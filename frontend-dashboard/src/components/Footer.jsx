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

function ThreeScene() {
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

export default function Footer() {
  return (
    <div className="flex h-[20vh] w-[50vh] items-center justify-center rounded-2xl">
      <div className="mr-[2vh] h-[17vh] w-[17vh] overflow-hidden rounded-2xl">
        <ThreeScene />
      </div>
      <div className="flex h-[17vh] w-[25vh] flex-col items-center justify-center rounded-2xl bg-gray-200 dark:bg-gray-800 dark:text-white">
        <div className="flex justify-center">AirPods</div>
        <div className="pl-2">Name: Name</div>
        <div className="pl-2">Battery: 90%</div>
      </div>
    </div>
  );
}
