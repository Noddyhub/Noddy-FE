import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useThemeStore } from "@/stores/useThemeStore";

export default function Footer() {
  const canvasRef = useRef();
  const isThemeDark = useThemeStore((state) => state.isThemeDark);

  const midX = window.innerWidth / 2;
  const midY = window.innerHeight / 2;

  const whiteColor = new THREE.Color("white");
  const blackColor = new THREE.Color("black");

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(8, 1, 1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });

    const width = canvasRef.current.clientWidth;
    const height = canvasRef.current.clientHeight;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height, false);
    camera.position.set(0, 0, -30);
    camera.lookAt(0, 0, 0);

    scene.background = isThemeDark ? whiteColor : blackColor;

    const mouse = { x: midX, y: midY };

    const loader = new GLTFLoader();
    loader.load("headImage.gltf", (gltf) => {
      const model = gltf.scene;
      model.position.set(0, 0.2, 0);

      scene.add(model);

      const animate = () => {
        requestAnimationFrame(animate);

        model.rotation.y = -(mouse.x - midX) * 0.0008;
        model.rotation.x = (mouse.y - midY) * 0.0008;

        renderer.render(scene, camera);
      };
      animate();
    });

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isThemeDark]);

  return (
    <div className="flex h-[20vh] w-[50vh] items-center justify-center rounded-2xl">
      <canvas ref={canvasRef} className="mr-[2vh] h-[17vh] w-[17vh] rounded-2xl"></canvas>
      <div className="flex h-[17vh] w-[25vh] flex-col items-center justify-center rounded-2xl bg-gray-200 dark:bg-gray-800 dark:text-white">
        <div className="flex justify-center">AirPods</div>
        <div className="pl-2">Name: Name</div>
        <div className="pl-2">Battery: 90%</div>
      </div>
    </div>
  );
}
