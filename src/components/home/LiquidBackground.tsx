"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

const LiquidBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mousePosition = useRef({ x: 0, y: 0 });
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const sphereRef = useRef<THREE.Mesh | null>(null);
    const rafIdRef = useRef<number | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Setup
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Camera
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        );
        camera.position.z = 5;
        cameraRef.current = camera;

        // Renderer
        const rendererInstance = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        rendererInstance.setSize(width, height);
        rendererInstance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(rendererInstance.domElement);
        rendererRef.current = rendererInstance;

        // Create a more translucent material for liquid effect
        const sphereMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xb0c4b1, // Using your sage accent color
            metalness: 0.3,
            roughness: 0.4,
            transmission: 0.6, // Makes it more transparent/translucent
            thickness: 0.5, // Refraction thickness
            clearcoat: 1, // Adds a clear reflective layer
            clearcoatRoughness: 0.1,
            opacity: 0.7,
        });

        // Create a simple environment for the reflective material
        scene.background = new THREE.Color(0x000000); // Black background
        scene.fog = new THREE.FogExp2(0x000000, 0.001);

        // Add subtle environmental lighting
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
        hemiLight.position.set(0, 300, 0);
        scene.add(hemiLight);

        // Create an organic, slightly irregular blob shape instead of a perfect sphere
        const sphereGeometry = new THREE.SphereGeometry(2, 128, 128);

        // Add some noise to the sphere vertices to make it look more organic
        const positions = sphereGeometry.attributes.position;
        const vector = new THREE.Vector3();

        for (let i = 0; i < positions.count; i++) {
            vector.fromBufferAttribute(positions, i);
            vector.normalize();

            // Add some noise to create an irregular shape
            const noise = 0.2 * (Math.random() - 0.5);
            vector.multiplyScalar(1 + noise);

            positions.setXYZ(i, vector.x * 2, vector.y * 2, vector.z * 2);
        }

        // Update geometry
        positions.needsUpdate = true;
        sphereGeometry.computeVertexNormals();

        // Create the mesh
        const sphereInstance = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphereInstance.position.set(1, 0, 0); // Offset slightly from center
        scene.add(sphereInstance);
        sphereRef.current = sphereInstance;

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 2, 3);
        scene.add(directionalLight);

        // Mouse move event
        const handleMouseMove = (event: MouseEvent) => {
            // Calculate normalized mouse position (-1 to 1)
            mousePosition.current = {
                x: (event.clientX / width) * 2 - 1,
                y: -(event.clientY / height) * 2 + 1,
            };
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Animation
        const animate = () => {
            if (!sphereRef.current) return;

            // Smoothly move the sphere towards the mouse position
            gsap.to(sphereRef.current.rotation, {
                x: mousePosition.current.y * 0.5,
                y: mousePosition.current.x * 0.5,
                duration: 1,
                ease: "power2.out",
            });

            // Create more organic distortion based on time and mouse position
            const time = performance.now() * 0.001; // Current time in seconds
            const vertices = (
                sphereRef.current.geometry as THREE.SphereGeometry
            ).attributes.position;
            const initialPositions = (
                sphereGeometry.attributes.position as THREE.BufferAttribute
            ).array;

            for (let i = 0; i < vertices.count; i++) {
                const x = initialPositions[i * 3];
                const y = initialPositions[i * 3 + 1];
                const z = initialPositions[i * 3 + 2];

                const distance = Math.sqrt(x * x + y * y + z * z);
                const normX = x / distance;
                const normY = y / distance;

                // Calculate more organic distortions
                const distortion =
                    Math.sin(x * 2 + time) * 0.1 +
                    Math.cos(y * 2 + time * 0.8) * 0.1 +
                    Math.sin(z * 2 + time * 0.6) * 0.1;

                // Add mouse influence
                const mouseDistortion =
                    Math.sin(normX * 5 + mousePosition.current.x * 3) *
                        0.05 *
                        Math.abs(mousePosition.current.x) +
                    Math.cos(normY * 5 + mousePosition.current.y * 3) *
                        0.05 *
                        Math.abs(mousePosition.current.y);

                vertices.setXYZ(
                    i,
                    x * (1 + distortion * 0.15 + mouseDistortion),
                    y * (1 + distortion * 0.15 + mouseDistortion),
                    z * (1 + distortion * 0.15 + mouseDistortion)
                );
            }

            // Scale based on mouse position - make the blob more reactive
            const scaleFactor =
                1 +
                Math.sin(time) * 0.05 +
                Math.abs(mousePosition.current.x) * 0.1 +
                Math.abs(mousePosition.current.y) * 0.1;

            sphereRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);

            vertices.needsUpdate = true;

            // Render scene
            rendererRef.current?.render(scene, camera);
            rafIdRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Handle window resize
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            // Update camera
            if (cameraRef.current) {
                cameraRef.current.aspect = width / height;
                cameraRef.current.updateProjectionMatrix();
            }

            // Update renderer
            rendererRef.current?.setSize(width, height);
        };

        window.addEventListener("resize", handleResize);

        // Capture DOM nodes and THREE.js objects for cleanup
        const containerNode = containerRef.current;

        // Cleanup
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);

            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
            }

            // Using captured values to avoid redeclaration issues
            if (containerNode && rendererRef.current) {
                containerNode.removeChild(rendererRef.current.domElement);
            }

            // Dispose of Three.js resources
            if (sphereRef.current) {
                sphereRef.current.geometry.dispose();
                (sphereRef.current.material as THREE.Material).dispose();
            }

            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 -z-10 w-screen h-screen overflow-hidden"
            style={{
                background:
                    "radial-gradient(circle at center, rgba(18, 18, 18, 0.8) 0%, rgba(0, 0, 0, 1) 80%)",
            }}
        >
            {/* Additional overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40 pointer-events-none" />

            {/* Noise texture overlay */}
            <div
                className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"
                style={{ backgroundRepeat: "repeat" }}
            />
        </div>
    );
};

export default LiquidBackground;
