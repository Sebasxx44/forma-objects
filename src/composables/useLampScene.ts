import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export const useLampScene = (finish: string) => {
  // Refs and state
  const mountRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const [available, setAvailable] = useState(false);

  // Scene lifecycle
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); }
    catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    mount.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 50);
    camera.position.set(4, 2.8, 7.7);
    camera.lookAt(0, 1.5, 0);
    scene.add(new THREE.AmbientLight(0xfff0dd, 1.8));
    const key = new THREE.DirectionalLight(0xffead1, 4.5);
    key.position.set(-3, 7, 4);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -5; key.shadow.camera.right = 5;
    key.shadow.camera.top = 6; key.shadow.camera.bottom = -5;
    key.shadow.normalBias = .025;
    key.shadow.radius = 5;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xf9d6b7, 1.2);
    fill.position.set(4, 2, -2); scene.add(fill);

    const lamp = new THREE.Group();
    scene.add(lamp);
    const body = new THREE.MeshStandardMaterial({ color: "#c45539", roughness: .28, metalness: .3 });
    materialRef.current = body;
    const inside = new THREE.MeshStandardMaterial({ color: "#f4e1bc", roughness: .65, side: THREE.DoubleSide });
    const shade = new THREE.Mesh(new THREE.SphereGeometry(1.42, 96, 48, 0, Math.PI * 2, 0, Math.PI / 2), body);
    shade.scale.y = .68; shade.position.y = 2.25;
    shade.castShadow = true; shade.receiveShadow = true; lamp.add(shade);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(1.41, .035, 12, 96), body);
    rim.rotation.x = Math.PI / 2; rim.position.y = 2.25; lamp.add(rim);
    const lining = new THREE.Mesh(new THREE.CircleGeometry(1.37, 96), inside);
    lining.rotation.x = Math.PI / 2; lining.position.y = 2.255; lamp.add(lining);
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(.14, .21, 2.13, 48), body);
    stem.position.y = 1.17; stem.castShadow = true; lamp.add(stem);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(.78, .85, .16, 80), body);
    base.position.y = .08; base.castShadow = true; lamp.add(base);
    const domeLight = new THREE.PointLight(0xffd499, 7, 4, 1.8);
    domeLight.position.set(0, 2, 0); lamp.add(domeLight);
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(.15, 24, 16), new THREE.MeshStandardMaterial({ color: "#ffe9bb", emissive: "#ffc96e", emissiveIntensity: 2 }));
    bulb.position.y = 2.15; lamp.add(bulb);
    const cord = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([
      new THREE.Vector3(.15, .05, -.2), new THREE.Vector3(1.2, .04, -.7), new THREE.Vector3(1.9, .04, -.4), new THREE.Vector3(2.9, .04, -.8),
    ]), 48, .018, 6, false), new THREE.MeshStandardMaterial({ color: "#4b2d23", roughness: .9 }));
    lamp.add(cord);

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.ShadowMaterial({ opacity: .2 }));
    floor.rotation.x = -Math.PI / 2; floor.position.y = -.005; floor.receiveShadow = true; scene.add(floor);
    let frame = 0;
    let angle = -.25;
    let dragging = false;
    let lastX = 0;
    let visible = true;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const render = () => renderer.render(scene, camera);
    const animate = () => {
      if (visible && !motion.matches && !dragging) {
        lamp.rotation.y = angle + Math.sin(performance.now() * .00025) * .13;
        render();
      }
      frame = requestAnimationFrame(animate);
    };
    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / height; camera.updateProjectionMatrix(); render();
    };
    const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(mount);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }); observer.observe(mount);
    const down = (event: PointerEvent) => { dragging = true; lastX = event.clientX; renderer.domElement.setPointerCapture(event.pointerId); };
    const move = (event: PointerEvent) => {
      if (!dragging) return;
      angle += (event.clientX - lastX) * .008; lastX = event.clientX; lamp.rotation.y = angle; render();
    };
    const up = () => { dragging = false; };
    renderer.domElement.addEventListener("pointerdown", down);
    renderer.domElement.addEventListener("pointermove", move);
    renderer.domElement.addEventListener("pointerup", up);
    renderer.domElement.addEventListener("pointercancel", up);
    const finishListener = () => render();
    mount.addEventListener("finishchange", finishListener);
    resize(); animate(); setAvailable(true);
    return () => {
      cancelAnimationFrame(frame); resizeObserver.disconnect(); observer.disconnect();
      mount.removeEventListener("finishchange", finishListener);
      renderer.domElement.removeEventListener("pointerdown", down);
      renderer.domElement.removeEventListener("pointermove", move);
      renderer.domElement.removeEventListener("pointerup", up);
      renderer.domElement.removeEventListener("pointercancel", up);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose(); renderer.domElement.remove(); materialRef.current = null;
    };
  }, []);

  // Material updates
  useEffect(() => {
    materialRef.current?.color.set(finish);
    mountRef.current?.dispatchEvent(new Event("finishchange"));
  }, [finish, available]);

  return { mountRef, available };
};
