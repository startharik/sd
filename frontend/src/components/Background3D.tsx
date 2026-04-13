'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function BuildingModel() {
  const { scene } = useGLTF('/building.glb');
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Apply low opacity to all materials in the model
  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          materials.forEach((mat) => {
            mat.transparent = true;
            mat.opacity = 0.4; // Increased from 0.15 for better visibility
            mat.depthWrite = true; // Changed to true to prevent weird transparency issues
            if ('color' in mat) {
              (mat as any).color.set('#10b981'); // Emerald tint
            }
          });
        }
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Mouse movement interaction
    const mouseX = state.mouse.x * viewport.width / 2;
    const mouseY = state.mouse.y * viewport.height / 2;
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.1, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY * 0.1, 0.05);

    // Scroll interaction
    const scrollY = window.scrollY;
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -scrollY * 0.005, 0.05);
  });

  return (
    <group ref={groupRef}>
      <primitive 
        object={scene} 
        scale={4} 
        position={[0, -1, 0]} 
      />
    </group>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-transparent h-screen w-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <fog attach="fog" args={['#020617', 5, 15]} />
        
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        
        <Suspense fallback={null}>
          <Float
            speed={2} 
            rotationIntensity={0.8} 
            floatIntensity={0.8}
          >
            <BuildingModel />
          </Float>
          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#10b981" />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
