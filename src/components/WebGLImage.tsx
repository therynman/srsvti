"use client";

import React, { useRef, useState, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree, useLoader, invalidate } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  uniform float uVelocity;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    float curve = sin(uv.y * 3.14159265);
    pos.z -= curve * uVelocity * 0.015; 
    pos.y -= curve * uVelocity * 0.015;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uHover;
  uniform float uTime;
  uniform vec2 uPlaneResolution;
  uniform vec2 uImageResolution;

  varying vec2 vUv;

  void main() {
    float planeAspect = uPlaneResolution.x / uPlaneResolution.y;
    float imageAspect = uImageResolution.x / max(uImageResolution.y, 1.0);
    
    vec2 uv = vUv - 0.5;
    if (planeAspect < imageAspect) {
      uv.x *= planeAspect / imageAspect;
    } else {
      uv.y *= imageAspect / planeAspect;
    }
    uv += 0.5;

    vec2 center = vec2(0.5);
    vec2 zoomedUv = center + (uv - center) * (1.0 - (uHover * 0.04)); 
    
    zoomedUv.x += sin(zoomedUv.y * 10.0 + uTime * 2.0) * 0.002;
    zoomedUv.y += cos(zoomedUv.x * 10.0 + uTime * 2.0) * 0.002;
    
    vec4 color = texture2D(uTexture, zoomedUv);
    gl_FragColor = color;
    
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

// Global scroll velocity tracker that lives OUTSIDE React render cycle
// This ensures it never gets reset by React re-renders or R3F lifecycle
const scrollState = {
  current: 0,
  previous: 0,
  velocity: 0,
  initialized: false,
};

if (typeof window !== "undefined") {
  const onScroll = () => {
    scrollState.current = window.scrollY || 0;
    if (!scrollState.initialized) {
      scrollState.previous = scrollState.current;
      scrollState.initialized = true;
    }
    scrollState.velocity = scrollState.current - scrollState.previous;
    scrollState.previous = scrollState.current;
  };

  // Use passive listener for maximum performance
  window.addEventListener("scroll", onScroll, { passive: true });
}

function Scene({ src }: { src: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const texture = useLoader(THREE.TextureLoader, src);
  texture.colorSpace = THREE.SRGBColorSpace;
  
  const { viewport } = useThree();
  const [hovered, setHover] = useState(false);
  
  const currentVelocity = useRef(0);

  useFrame((state, delta) => {
    if (!materialRef.current) return;
    
    // Force R3F to keep rendering every frame
    state.invalidate();
    
    // Read from global scroll state (always fresh, never stale)
    const target = scrollState.velocity;
    
    // Smooth spring interpolation
    currentVelocity.current = THREE.MathUtils.lerp(
      currentVelocity.current, 
      target, 
      1 - Math.exp(-8 * delta)
    );
    
    // Decay the global velocity so it springs back to 0 when scroll stops
    scrollState.velocity *= 0.9;

    // Update uniforms
    materialRef.current.uniforms.uVelocity.value = currentVelocity.current;
    
    let time = materialRef.current.uniforms.uTime.value + delta * 0.5;
    if (time > 10000) time = 0;
    materialRef.current.uniforms.uTime.value = time;
    
    const targetHover = hovered ? 1 : 0;
    materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uHover.value,
      targetHover,
      1 - Math.exp(-10 * delta)
    );
  });

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uVelocity: { value: 0 },
      uHover: { value: 0 },
      uTime: { value: 0 },
      uPlaneResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
      uImageResolution: { value: new THREE.Vector2((texture.image as any)?.width || 1, (texture.image as any)?.height || 1) },
    }),
    [texture, viewport]
  );

  return (
    <mesh 
      ref={meshRef} 
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      scale={[viewport.width, viewport.height, 1]}
    >
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}

export default function WebGLImage({ src, alt, className }: { src: string; alt?: string; className?: string }) {
  return (
    <div className={`${className || ""} relative overflow-hidden`} style={{ cursor: 'pointer' }}>
       <Canvas 
          frameloop="always"
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 10 }}
          gl={{ alpha: true, antialias: true }}
       >
          <Suspense fallback={null}>
            <Scene src={src} />
          </Suspense>
       </Canvas>
       
       <img 
         src={src} 
         alt={alt || "Image"} 
         className="w-full h-full object-cover opacity-0 relative z-0" 
         style={{ pointerEvents: 'none' }}
       />
    </div>
  );
}
