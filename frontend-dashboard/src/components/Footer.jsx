import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";

export default function Footer() {
  const canvasRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(8, 1, 1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });

    const width = canvasRef.current.clientWidth;
    const height = canvasRef.current.clientHeight;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height, false);
    camera.position.setZ(30);

    const loader = new GLTFLoader();
    loader.load("headImage.gltf", (gltf) => {
      const model = gltf.scene;
      model.position.set(0, 0.2, 0);
      model.rotation.y = Math.PI;

      scene.add(model);

      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();
    });

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    new OrbitControls(camera, renderer.domElement);
  }, []);

  return (
    <div className="flex h-[20vh] w-[50vh] items-center justify-center rounded-2xl">
      <canvas ref={canvasRef} className="mr-[2vh] h-[17vh] w-[17vh] rounded-2xl border-2"></canvas>
      <div className="flex h-[17vh] w-[25vh] flex-col items-center justify-center rounded-2xl bg-gray-200 dark:bg-gray-800 dark:text-white">
        <div className="flex justify-center">AirPods</div>
        <div className="pl-2">Name: Name</div>
        <div className="pl-2">Battery: 90%</div>
      </div>
    </div>
  );
}
