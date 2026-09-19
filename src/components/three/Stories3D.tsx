import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function SpeechBubble({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + position[0]) * 0.1;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.05;
    }
  });
  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="white" roughness={0.3} transparent opacity={0.9} />
      </mesh>
      {/* Tail */}
      <mesh position={[-0.15, -0.35, 0]} rotation={[0, 0, 0.3]}>
        <coneGeometry args={[0.08, 0.15, 8]} />
        <meshStandardMaterial color="white" roughness={0.3} transparent opacity={0.9} />
      </mesh>
      {/* Dots inside */}
      {[-0.1, 0, 0.1].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.36]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
      ))}
    </group>
  );
}

function Person({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.7 + position[0] * 3) * 0.08;
    }
  });
  return (
    <group ref={ref} position={position}>
      <mesh position={[0, 0.65, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.15, 0.18, 0.55, 8]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
      </mesh>
    </group>
  );
}

function Star({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.5;
      const s = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      ref.current.scale.set(s, s, s);
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.08, 0]} />
      <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} />
    </mesh>
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
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#fbbf24" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} color="#fef3c7" />
      <pointLight position={[-3, 2, 3]} intensity={0.5} color="#f87171" />
      <pointLight position={[3, -1, 2]} intensity={0.3} color="#60a5fa" />
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.4}>
        <Person position={[-1.5, -0.5, 0]} color="#3b82f6" />
        <Person position={[1.5, -0.5, 0]} color="#8b5cf6" />
        <SpeechBubble position={[-0.8, 0.8, 0.3]} scale={0.8} />
        <SpeechBubble position={[0.8, 1.1, -0.2]} scale={0.6} />
        <Star position={[0, 1.5, 0]} />
        <Star position={[-1.8, 1.2, 0.5]} />
        <Star position={[1.8, 0.8, -0.3]} />
      </Float>
      <Particles />
    </>
  );
}

export function Stories3D({ className }: { className?: string }) {
  return (
    <div className={`three-container ${className ?? ''}`} style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0.5, 5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <Scene />
      </Canvas>
    </div>
  );
}
