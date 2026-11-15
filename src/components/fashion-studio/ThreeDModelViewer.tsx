'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Product } from '@/types/product';
import {
  RotateCcw,
  Sun,
  Moon,
  Sparkles,
  Maximize2,
  Grid,
  Camera,
  Play,
  Pause,
  Layers,
} from 'lucide-react';

export interface ThreeDModelViewerProps {
  product: Product;
  className?: string;
}

type CameraPreset = 'front' | 'side' | 'back' | 'low';
type LightingPreset = 'editorial' | 'cyber' | 'golden';

export default function ThreeDModelViewer({ product, className = '' }: ThreeDModelViewerProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  const [lighting, setLighting] = useState<LightingPreset>('editorial');
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isWireframe, setIsWireframe] = useState(false);
  const [activeCameraAngle, setActiveCameraAngle] = useState<CameraPreset>('front');
  const [isLoading, setIsLoading] = useState(true);

  // References to Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const lightsGroupRef = useRef<THREE.Group | null>(null);
  const materialsRef = useRef<THREE.Material[]>([]);

  // ── 1. Initialize Scene, Camera, Renderer, Controls ─────────
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 500;
    const height = mount.clientHeight || 700;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.8);
    cameraRef.current = camera;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.1; // Don't go below floor
    controls.minDistance = 1.8;
    controls.maxDistance = 6.0;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;
    controlsRef.current = controls;

    // Groups
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    const lightsGroup = new THREE.Group();
    scene.add(lightsGroup);
    lightsGroupRef.current = lightsGroup;

    // Ground Studio Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(5, 5);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.15 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.55;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Floor Reflection Disc
    const floorGeo = new THREE.CircleGeometry(1.6, 64);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xeeeeea,
      roughness: 0.4,
      metalness: 0.1,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -1.56;
    scene.add(floorMesh);

    // Render loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    setIsLoading(false);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  // ── 2. Studio Lighting Presets ──────────────────────────────
  const applyLighting = useCallback((preset: LightingPreset) => {
    const lightsGroup = lightsGroupRef.current;
    if (!lightsGroup) return;

    // Clear existing lights
    while (lightsGroup.children.length > 0) {
      lightsGroup.remove(lightsGroup.children[0]);
    }

    if (preset === 'editorial') {
      // High-fashion clean studio key + rim
      const ambient = new THREE.AmbientLight(0xffffff, 1.2);
      lightsGroup.add(ambient);

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
      keyLight.position.set(2.5, 4, 3);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      lightsGroup.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xf0ede6, 0.8);
      fillLight.position.set(-2.5, 2, 2);
      lightsGroup.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xffffff, 1.5);
      rimLight.position.set(0, 3, -3);
      lightsGroup.add(rimLight);
    } else if (preset === 'cyber') {
      // Cyberpunk Runway (Cyan rim + Magenta key)
      const ambient = new THREE.AmbientLight(0x0a0a14, 0.8);
      lightsGroup.add(ambient);

      const cyanRim = new THREE.DirectionalLight(0x00f0ff, 3.5);
      cyanRim.position.set(-3, 3, -2);
      lightsGroup.add(cyanRim);

      const magentaKey = new THREE.DirectionalLight(0xff0055, 3.0);
      magentaKey.position.set(3, 2, 3);
      magentaKey.castShadow = true;
      lightsGroup.add(magentaKey);

      const topLight = new THREE.PointLight(0xffffff, 1.0, 10);
      topLight.position.set(0, 4, 0);
      lightsGroup.add(topLight);
    } else if (preset === 'golden') {
      // Golden Hour Haute Couture
      const ambient = new THREE.AmbientLight(0x403020, 1.0);
      lightsGroup.add(ambient);

      const sun = new THREE.DirectionalLight(0xffb060, 3.0);
      sun.position.set(3, 3.5, 2.5);
      sun.castShadow = true;
      lightsGroup.add(sun);

      const warmFill = new THREE.DirectionalLight(0xffe0c0, 1.2);
      warmFill.position.set(-2, 1, 1);
      lightsGroup.add(warmFill);
    }
  }, []);

  useEffect(() => {
    applyLighting(lighting);
  }, [lighting, applyLighting]);

  // ── 3. Build / Update 3D Fashion Mannequin & Garment ─────────
  useEffect(() => {
    const modelGroup = modelGroupRef.current;
    if (!modelGroup) return;

    // Clear previous geometry
    while (modelGroup.children.length > 0) {
      const child = modelGroup.children[0];
      modelGroup.remove(child);
    }
    materialsRef.current = [];

    // Color extraction
    const primaryColorHex = product.colors[0]?.hex || '#1a1a1a';
    const primaryColor = new THREE.Color(primaryColorHex);

    // Mannequin base material (matte alabaster porcelain)
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xe6e2dd,
      roughness: 0.65,
      metalness: 0.05,
      wireframe: isWireframe,
    });
    materialsRef.current.push(skinMat);

    // Garment PBR Material based on category
    let garmentMat: THREE.MeshStandardMaterial;

    if (product.category.slug === 'dresses') {
      // Liquid Satin / Chrome
      garmentMat = new THREE.MeshStandardMaterial({
        color: primaryColor,
        roughness: 0.15,
        metalness: 0.85,
        wireframe: isWireframe,
      });
    } else if (product.category.slug === 'corsets') {
      // Glossy Patent Leather
      garmentMat = new THREE.MeshStandardMaterial({
        color: primaryColor,
        roughness: 0.2,
        metalness: 0.4,
        wireframe: isWireframe,
      });
    } else if (product.category.slug === 'coats') {
      // Heavy Trench Wool
      garmentMat = new THREE.MeshStandardMaterial({
        color: primaryColor,
        roughness: 0.85,
        metalness: 0.05,
        wireframe: isWireframe,
      });
    } else {
      // High-grade Second Skin Jersey
      garmentMat = new THREE.MeshStandardMaterial({
        color: primaryColor,
        roughness: 0.45,
        metalness: 0.2,
        wireframe: isWireframe,
      });
    }
    materialsRef.current.push(garmentMat);

    // ── Check if genuine GLB model exists ──
    if (product.assets?.glbModel && product.assets.glbModel.endsWith('.glb')) {
      const loader = new GLTFLoader();
      loader.load(
        product.assets.glbModel,
        (gltf) => {
          const loadedScene = gltf.scene;
          loadedScene.position.set(0, -1.5, 0);
          loadedScene.traverse((node) => {
            if ((node as THREE.Mesh).isMesh) {
              node.castShadow = true;
              node.receiveShadow = true;
            }
          });
          modelGroup.add(loadedScene);
        },
        undefined,
        () => {
          // Fallback to sculpted procedural fashion model
          buildSculptedMannequin(modelGroup, skinMat, garmentMat, product.category.slug);
        }
      );
    } else {
      buildSculptedMannequin(modelGroup, skinMat, garmentMat, product.category.slug);
    }
  }, [product, isWireframe]);

  // ── Sculpted High-Fashion Mannequin Builder ──────────────────
  const buildSculptedMannequin = (
    group: THREE.Group,
    skin: THREE.Material,
    garment: THREE.Material,
    catSlug: string
  ) => {
    const root = new THREE.Group();
    root.position.set(0, -0.4, 0);

    // 1. Stylized Head (Egg profile)
    const headGeo = new THREE.SphereGeometry(0.18, 32, 32);
    headGeo.scale(0.85, 1.15, 0.95);
    const head = new THREE.Mesh(headGeo, skin);
    head.position.set(0, 1.55, 0);
    head.castShadow = true;
    root.add(head);

    // High fashion neck collar
    const neckGeo = new THREE.CylinderGeometry(0.08, 0.1, 0.32, 32);
    const neck = new THREE.Mesh(neckGeo, skin);
    neck.position.set(0, 1.35, 0);
    neck.castShadow = true;
    root.add(neck);

    // 2. High-Fashion Torso
    const torsoGeo = new THREE.CylinderGeometry(0.24, 0.16, 0.55, 32);
    const torso = new THREE.Mesh(torsoGeo, skin);
    torso.position.set(0, 0.95, 0);
    torso.castShadow = true;
    root.add(torso);

    // 3. Pelvis & Hips
    const pelvisGeo = new THREE.CylinderGeometry(0.16, 0.23, 0.35, 32);
    const pelvis = new THREE.Mesh(pelvisGeo, skin);
    pelvis.position.set(0, 0.55, 0);
    pelvis.castShadow = true;
    root.add(pelvis);

    // 4. Couture Legs (Elongated high-fashion proportion)
    const legGeo = new THREE.CylinderGeometry(0.08, 0.05, 1.35, 32);

    const leftLeg = new THREE.Mesh(legGeo, skin);
    leftLeg.position.set(-0.13, -0.3, 0);
    leftLeg.castShadow = true;
    root.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, skin);
    rightLeg.position.set(0.13, -0.3, 0);
    rightLeg.castShadow = true;
    root.add(rightLeg);

    // 5. High-Fashion Arms
    const armGeo = new THREE.CylinderGeometry(0.05, 0.04, 0.95, 32);

    const leftArm = new THREE.Mesh(armGeo, skin);
    leftArm.position.set(-0.32, 0.85, 0);
    leftArm.rotation.z = Math.PI / 16;
    leftArm.castShadow = true;
    root.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, skin);
    rightArm.position.set(0.32, 0.85, 0);
    rightArm.rotation.z = -Math.PI / 16;
    rightArm.castShadow = true;
    root.add(rightArm);

    // ── 6. Category-Specific 3D Garment Mesh ──
    if (catSlug === 'dresses') {
      // Flowing Column / Ballgown Mesh
      const dressTopGeo = new THREE.CylinderGeometry(0.25, 0.18, 0.58, 32);
      const dressTop = new THREE.Mesh(dressTopGeo, garment);
      dressTop.position.set(0, 0.95, 0);
      dressTop.castShadow = true;
      root.add(dressTop);

      const dressSkirtGeo = new THREE.ConeGeometry(0.55, 1.45, 32, 1, true);
      const dressSkirt = new THREE.Mesh(dressSkirtGeo, garment);
      dressSkirt.position.set(0, 0.0, 0);
      dressSkirt.castShadow = true;
      root.add(dressSkirt);
    } else if (catSlug === 'corsets') {
      // Structured Boned Corset
      const corsetGeo = new THREE.CylinderGeometry(0.25, 0.17, 0.45, 32);
      const corset = new THREE.Mesh(corsetGeo, garment);
      corset.position.set(0, 0.88, 0);
      corset.castShadow = true;
      root.add(corset);

      // Choker
      const chokerGeo = new THREE.TorusGeometry(0.09, 0.02, 16, 32);
      const choker = new THREE.Mesh(chokerGeo, garment);
      choker.rotation.x = Math.PI / 2;
      choker.position.set(0, 1.38, 0);
      root.add(choker);
    } else if (catSlug === 'coats') {
      // Monumental Cocoon / Trench Coat
      const coatGeo = new THREE.CylinderGeometry(0.34, 0.42, 1.6, 32);
      const coat = new THREE.Mesh(coatGeo, garment);
      coat.position.set(0, 0.45, 0);
      coat.castShadow = true;
      root.add(coat);
    } else {
      // Second Skin / Bodysuit
      const bodyTopGeo = new THREE.CylinderGeometry(0.25, 0.17, 0.56, 32);
      const bodyTop = new THREE.Mesh(bodyTopGeo, garment);
      bodyTop.position.set(0, 0.95, 0);
      bodyTop.castShadow = true;
      root.add(bodyTop);

      const bodyBottomGeo = new THREE.CylinderGeometry(0.17, 0.24, 0.38, 32);
      const bodyBottom = new THREE.Mesh(bodyBottomGeo, garment);
      bodyBottom.position.set(0, 0.55, 0);
      bodyBottom.castShadow = true;
      root.add(bodyBottom);
    }

    group.add(root);
  };

  // ── 4. Camera Angle Snap Presets ─────────────────────────────
  const setCameraAngle = (angle: CameraPreset) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    setActiveCameraAngle(angle);

    switch (angle) {
      case 'front':
        camera.position.set(0, 0, 3.8);
        break;
      case 'side':
        camera.position.set(3.8, 0, 0);
        break;
      case 'back':
        camera.position.set(0, 0, -3.8);
        break;
      case 'low':
        camera.position.set(0, -1.2, 3.2);
        break;
    }
    controls.target.set(0, 0, 0);
    controls.update();
  };

  const toggleAutoRotate = () => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = !isAutoRotate;
      setIsAutoRotate(!isAutoRotate);
    }
  };

  const toggleWireframe = () => {
    materialsRef.current.forEach((m) => {
      // @ts-expect-error wireframe property
      if (m.wireframe !== undefined) m.wireframe = !isWireframe;
    });
    setIsWireframe(!isWireframe);
  };

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top 3D Telemetry Overlay */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-3 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        <span className="text-[7px] tracking-[0.3em] uppercase text-black/60 font-bold">
          WebGL 3D · 60 FPS PBR Engine
        </span>
      </div>

      {/* Camera Angle Snap Bar (Top Right) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-white/80 backdrop-blur-sm border border-black/10 p-1">
        <span className="text-[6px] tracking-[0.25em] uppercase text-black/40 px-2">Angle</span>
        {(['front', 'side', 'back', 'low'] as CameraPreset[]).map((ang) => (
          <button
            key={ang}
            onClick={() => setCameraAngle(ang)}
            className={`text-[7px] tracking-[0.2em] uppercase px-2.5 py-1 border transition-all ${
              activeCameraAngle === ang
                ? 'bg-black text-white border-black font-bold'
                : 'border-transparent text-black/60 hover:border-black/20'
            }`}
          >
            {ang}
          </button>
        ))}
      </div>

      {/* Interactive 3D Control Bar (Bottom Floating HUD) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md border border-black/10 px-4 py-2 shadow-lg">
        {/* Turntable Auto-Rotate */}
        <button
          onClick={toggleAutoRotate}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-[7px] tracking-[0.25em] uppercase border transition-all ${
            isAutoRotate ? 'bg-black text-white border-black font-bold' : 'border-black/20 text-black/70'
          }`}
          title="Toggle Turntable Rotation"
        >
          {isAutoRotate ? <Pause size={10} /> : <Play size={10} />}
          360° Turntable
        </button>

        {/* Wireframe / Cybernetic Mesh Mode */}
        <button
          onClick={toggleWireframe}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-[7px] tracking-[0.25em] uppercase border transition-all ${
            isWireframe ? 'bg-black text-white border-black font-bold' : 'border-black/20 text-black/70'
          }`}
          title="Toggle Wireframe Shading"
        >
          <Grid size={10} />
          {isWireframe ? 'Solid Mode' : 'Cyber Mesh'}
        </button>

        {/* Studio Lighting Switcher */}
        <div className="flex items-center gap-1 border-l border-black/10 pl-2">
          <span className="text-[6px] tracking-[0.2em] uppercase text-black/40 mr-1">Light</span>
          <button
            onClick={() => setLighting('editorial')}
            className={`p-1.5 border transition-all ${
              lighting === 'editorial' ? 'bg-black text-white border-black' : 'border-black/15 text-black/60'
            }`}
            title="Haute Editorial Studio Lighting"
          >
            <Sun size={10} />
          </button>
          <button
            onClick={() => setLighting('cyber')}
            className={`p-1.5 border transition-all ${
              lighting === 'cyber' ? 'bg-black text-white border-black' : 'border-black/15 text-black/60'
            }`}
            title="Cyberpunk Runway Neon"
          >
            <Sparkles size={10} />
          </button>
          <button
            onClick={() => setLighting('golden')}
            className={`p-1.5 border transition-all ${
              lighting === 'golden' ? 'bg-black text-white border-black' : 'border-black/15 text-black/60'
            }`}
            title="Golden Hour Runway"
          >
            <Moon size={10} />
          </button>
        </div>
      </div>

      {/* Orbit Tip Hint */}
      <div className="absolute bottom-5 right-4 z-20 text-[6px] tracking-[0.2em] uppercase text-black/35 pointer-events-none">
        Click + Drag to Orbit · Scroll to Zoom
      </div>
    </div>
  );
}
