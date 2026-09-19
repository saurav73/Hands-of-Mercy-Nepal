import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Book({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.3;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[2]) * 0.15;
    }
  });
  return (
    <mesh ref={ref} position={position} scale={scale} castShadow>
      <boxGeometry args={[0.8, 1, 0.15]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
    </mesh>
  );
}

function GraduationCap({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.2;
    }
  });
  return (
    <group ref={ref} position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.05, 4]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.25, 0.35, 0.25, 4]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} />
      </mesh>
    </group>
  );
}

function Pencil({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = rotation[2] + Math.sin(state.clock.elapsedTime * 0.4 + position[0]) * 0.2;
    }
  });
  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <cylinderGeometry args={[0.03, 0.03, 1.2, 8]} />
      <meshStandardMaterial color="#f59e0b" roughness={0.5} />
    </mesh>
  );
}

function Particles({ count = 30 }: { count?: number }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return positions;
  }, [count]);
  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#93c5fd" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-3, 2, 4]} intensity={0.4} color="#818cf8" />
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Book position={[-1.2, 0.5, 0]} color="#3b82f6" />
        <Book position={[0, -0.3, 0.5]} color="#6366f1" scale={0.8} />
        <Book position={[1.3, 0.2, -0.3]} color="#8b5cf6" scale={0.9} />
      </Float>
      <GraduationCap position={[0.5, 1.2, -0.5]} />
      <Pencil position={[-1.5, -0.8, 0.3]} rotation={[0, 0, 0.5]} />
      <Pencil position={[1.8, 0.8, -0.2]} rotation={[0, 0, -0.3]} />
      <Particles />
    </>
  );
}

interface HeroScene3DProps {
  className?: string;
}

export function HeroScene3D({ className }: HeroScene3DProps) {
  return (
    <div className={`three-container ${className ?? ''}`} style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ overflow: 'visible' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
