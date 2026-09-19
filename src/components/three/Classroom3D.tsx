import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Desk({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  return (
    <group ref={ref} position={position}>
      {/* Desktop */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.6, 0.04, 0.4]} />
        <meshStandardMaterial color="#d4a574" roughness={0.6} />
      </mesh>
      {/* Legs */}
      {[[-0.25, 0.2, -0.15], [0.25, 0.2, -0.15], [-0.25, 0.2, 0.15], [0.25, 0.2, 0.15]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.015, 0.015, 0.4, 6]} />
          <meshStandardMaterial color="#8b7355" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function Chair({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Seat */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[0.3, 0.03, 0.3]} />
        <meshStandardMaterial color="#6366f1" roughness={0.5} />
      </mesh>
      {/* Back */}
      <mesh position={[0, 0.4, -0.14]}>
        <boxGeometry args={[0.3, 0.25, 0.03]} />
        <meshStandardMaterial color="#6366f1" roughness={0.5} />
      </mesh>
    </group>
  );
}

function Book({ position, color, rotation = [0, 0, 0] }: { position: [number, number, number]; color: string; rotation?: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.4 + position[0] * 2) * 0.2;
    }
  });
  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <boxGeometry args={[0.35, 0.45, 0.06]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
    </mesh>
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
      <cylinderGeometry args={[0.015, 0.015, 0.5, 8]} />
      <meshStandardMaterial color="#f59e0b" roughness={0.5} />
    </mesh>
  );
}

function Globe({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.3;
  });
  return (
    <group ref={ref} position={position}>
      <mesh>
        <sphereGeometry args={[0.2, 24, 24]} />
        <meshStandardMaterial color="#60a5fa" roughness={0.3} metalness={0.2} transparent opacity={0.7} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#93c5fd" wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function Particles({ count = 25 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4;
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
      <pointsMaterial size={0.03} color="#c4b5fd" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} color="#e0e7ff" />
      <pointLight position={[-3, 3, 3]} intensity={0.4} color="#818cf8" />
      <group ref={groupRef}>
        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
          {/* Desks & chairs */}
          <Desk position={[-1, -0.5, 0]} />
          <Chair position={[-1, -0.5, 0.5]} />
          <Desk position={[1, -0.5, 0]} />
          <Chair position={[1, -0.5, 0.5]} />
          {/* Books */}
          <Book position={[-1, 0, 0]} color="#3b82f6" />
          <Book position={[1, 0, 0]} color="#8b5cf6" rotation={[0.1, 0.3, 0]} />
          <Book position={[0, 0.8, 0.5]} color="#6366f1" rotation={[-0.1, 0.5, 0.1]} />
          {/* Pencils */}
          <Pencil position={[-0.7, 0, 0.2]} rotation={[0, 0, 0.4]} />
          <Pencil position={[1.3, 0, -0.1]} rotation={[0, 0, -0.3]} />
          {/* Globe */}
          <Globe position={[0, 0.5, -0.5]} />
        </Float>
      </group>
      <Particles />
    </>
  );
}

export function Classroom3D({ className }: { className?: string }) {
  return (
    <div className={`three-container ${className ?? ''}`} style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 1, 5.5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <Scene />
      </Canvas>
    </div>
  );
}
