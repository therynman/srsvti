"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

const FlowingBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const materialRef = useRef<THREE.ShaderMaterial | null>(null);
    const timeRef = useRef<number>(0);
    const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const targetMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Initialize scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Initialize camera
        const camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 1;
        cameraRef.current = camera;

        // Initialize renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
            antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        rendererRef.current = renderer;

        // Custom shader material for flowing animation
        const material = new THREE.ShaderMaterial({
            vertexShader: `
                varying vec2 vUv;
                
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec2 resolution;
                uniform vec2 mouse;
                varying vec2 vUv;
                
                // Simplex noise function
                vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

                float snoise(vec2 v) {
                    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                                        -0.577350269189626, 0.024390243902439);
                    vec2 i  = floor(v + dot(v, C.yy));
                    vec2 x0 = v -   i + dot(i, C.xx);
                    vec2 i1;
                    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                    vec4 x12 = x0.xyxy + C.xxzz;
                    x12.xy -= i1;
                    i = mod(i, 289.0);
                    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                    + i.x + vec3(0.0, i1.x, 1.0));
                    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                                            dot(x12.zw, x12.zw)), 0.0);
                    m = m*m;
                    m = m*m;
                    vec3 x = 2.0 * fract(p * C.www) - 1.0;
                    vec3 h = abs(x) - 0.5;
                    vec3 ox = floor(x + 0.5);
                    vec3 a0 = x - ox;
                    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
                    vec3 g;
                    g.x = a0.x * x0.x + h.x * x0.y;
                    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                    return 130.0 * dot(m, g);
                }
                
                void main() {
                    vec2 uv = vUv;
                    
                    // Adjust aspect ratio
                    float aspect = resolution.x / resolution.y;
                    uv.x *= aspect;
                    
                    // Mouse influence
                    vec2 mousePos = mouse;
                    mousePos.x *= aspect;
                    
                    // Calculate distance from current point to mouse
                    float mouseDistance = distance(uv, mousePos);
                    float mouseInfluence = smoothstep(0.4, 0.0, mouseDistance);
                    
                    // Flow animation parameters
                    float flowSpeed = 0.15;
                    float flowIntensity = 0.15;
                    
                    // Generate multiple layers of noise
                    float scale1 = 2.0;
                    float scale2 = 5.0;
                    float scale3 = 8.0;
                    
                    // Animate noise over time
                    float n1 = snoise(vec2(uv.x * scale1 + time * flowSpeed, uv.y * scale1 - time * flowSpeed * 0.5));
                    float n2 = snoise(vec2(uv.x * scale2 - time * flowSpeed * 0.7, uv.y * scale2 + time * flowSpeed * 0.3));
                    float n3 = snoise(vec2(uv.x * scale3 + time * flowSpeed * 0.2, uv.y * scale3 - time * flowSpeed * 0.1));
                    
                    // Combine noise layers
                    float noise = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
                    
                    // Add mouse influence to make noise flow away from mouse
                    noise += mouseInfluence * 0.5;
                    
                    // Create flowing gradient effect
                    vec3 color1 = vec3(0.03, 0.03, 0.05); // Dark blue/black
                    vec3 color2 = vec3(0.1, 0.15, 0.2);   // Slightly lighter blue
                    vec3 color3 = vec3(0.6, 0.7, 0.7);    // Highlight color
                    
                    // Create base gradient
                    vec3 baseColor = mix(color1, color2, noise);
                    
                    // Add subtle highlights based on noise peaks
                    float highlight = smoothstep(0.6, 0.8, noise);
                    baseColor = mix(baseColor, color3, highlight * 0.15);
                    
                    // Add subtle vignette
                    float vignette = smoothstep(1.0, 0.3, length(vUv - 0.5) * 1.5);
                    baseColor *= vignette;
                    
                    // Apply mouse glow
                    vec3 mouseGlow = vec3(0.4, 0.5, 0.6) * mouseInfluence * 0.5;
                    baseColor += mouseGlow;
                    
                    // Final color with transparency
                    gl_FragColor = vec4(baseColor, 0.8);
                }
            `,
            uniforms: {
                time: { value: 0 },
                resolution: {
                    value: new THREE.Vector2(
                        window.innerWidth,
                        window.innerHeight
                    ),
                },
                mouse: { value: new THREE.Vector2(0.5, 0.5) },
            },
            transparent: true,
        });
        materialRef.current = material;

        // Create a plane that fills the screen
        const geometry = new THREE.PlaneGeometry(2, 2);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Handle mouse movement
        const handleMouseMove = (e: MouseEvent) => {
            targetMouseRef.current = {
                x: e.clientX / window.innerWidth,
                y: 1 - e.clientY / window.innerHeight, // Invert Y for WebGL coordinates
            };
        };

        // Handle window resize
        const handleResize = () => {
            if (
                !rendererRef.current ||
                !cameraRef.current ||
                !materialRef.current
            )
                return;

            const width = window.innerWidth;
            const height = window.innerHeight;

            cameraRef.current.aspect = width / height;
            cameraRef.current.updateProjectionMatrix();

            rendererRef.current.setSize(width, height);
            materialRef.current.uniforms.resolution.value.set(width, height);
        };

        // Animation loop
        const animate = () => {
            timeRef.current += 0.005;

            if (materialRef.current) {
                materialRef.current.uniforms.time.value = timeRef.current;

                // Smooth mouse movement with GSAP
                gsap.to(mouseRef.current, {
                    x: targetMouseRef.current.x,
                    y: targetMouseRef.current.y,
                    duration: 1,
                    ease: "power2.out",
                    onUpdate: () => {
                        if (materialRef.current) {
                            materialRef.current.uniforms.mouse.value.set(
                                mouseRef.current.x,
                                mouseRef.current.y
                            );
                        }
                    },
                });
            }

            if (rendererRef.current && sceneRef.current && cameraRef.current) {
                rendererRef.current.render(sceneRef.current, cameraRef.current);
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        // Start animation and add event listeners
        animate();
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }

            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);

            // Clean up Three.js resources
            if (rendererRef.current) {
                rendererRef.current.dispose();
            }

            scene.traverse((object) => {
                if (object instanceof THREE.Mesh) {
                    object.geometry.dispose();
                    if (object.material instanceof THREE.Material) {
                        object.material.dispose();
                    } else if (Array.isArray(object.material)) {
                        object.material.forEach((material) =>
                            material.dispose()
                        );
                    }
                }
            });
        };
    }, []);

    return (
        <div className="fixed inset-0 -z-10 w-screen h-screen overflow-hidden">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />

            {/* Noise Overlay */}
            <div
                className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"
                style={{ backgroundRepeat: "repeat" }}
            />
        </div>
    );
};

export default FlowingBackground;
