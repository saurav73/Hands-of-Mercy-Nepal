import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Book({ position, color, rotation = [0, 0, 0], scale = 1 }: { position: [number, number, number]; color: string; rotation?: [number, number, number]; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.4 + position[0] * 2) * 0.3;
    }
  });
  return (
    <mesh ref={ref} position={position} rotation={rotation} scale={scale} castShadow>
      <boxGeometry args={[0.7, 0.9, 0.12]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
    </mesh>
  );
}

function Globe({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });
  return (
    <group ref={ref} position={position}>
      <mesh>
        <sphereGeometry args={[0.4, 24, 24]} />
        <meshStandardMaterial color="#60a5fa" roughness={0.3} metalness={0.2} transparent opacity={0.7} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.42, 16, 16]} />
        <meshStandardMaterial color="#93c5fd" wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function Pencil({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = rotation[2] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.15;
    }
  });
  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <cylinderGeometry args={[0.025, 0.025, 1, 8]} />
      <meshStandardMaterial color="#f59e0b" roughness={0.5} />
    </mesh>
  );
}

function Ruler({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = rotation[0] + Math.sin(state.clock.elapsedTime * 0.35 + position[1]) * 0.1;
    }
  });
  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <boxGeometry args={[1.2, 0.02, 0.15]} />
      <meshStandardMaterial color="#a78bfa" roughness={0.4} metalness={0.1} />
    </mesh>
  );
}

function Particles({ count = 25 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 7;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#c4b5fd" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#e0e7ff" />
      <pointLight position={[-4, 2, 3]} intensity={0.4} color="#818cf8" />
      <pointLight position={[3, -2, 4]} intensity={0.3} color="#6366f1" />
      <group ref={groupRef}>
        <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.4}>
          <Book position={[-1.5, 0.8, 0]} color="#3b82f6" />
          <Book position={[-0.5, -0.5, 0.5]} color="#6366f1" rotation={[0.2, 0.5, 0.1]} />
          <Book position={[0.8, 0.3, -0.3]} color="#8b5cf6" rotation={[-0.1, 0.3, -0.2]} />
          <Book position={[1.5, -0.2, 0.2]} color="#a78bfa" rotation={[0.3, 0.7, 0.15]} />
          <Book position={[0, 1, -0.5]} color="#4f46e5" rotation={[0.1, 0.4, 0.05]} scale={0.85} />
        </Float>
        <Globe position={[1.8, 1, -0.5]} />
        <Pencil position={[-1.8, -0.8, 0.3]} rotation={[0, 0, 0.6]} />
        <Pencil position={[1, -1, 0.1]} rotation={[0, 0, -0.4]} />
        <Ruler position={[-0.3, -1.2, 0.2]} rotation={[0.1, 0.2, 0.05]} />
      </group>
      <Particles />
    </>
  );
}

interface FloatingBooks3DProps {
  className?: string;
}

export function FloatingBooks3D({ className }: FloatingBooks3DProps) {
  return (
    <div className={`three-container ${className ?? ''}`} style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ overflow: 'visible' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
