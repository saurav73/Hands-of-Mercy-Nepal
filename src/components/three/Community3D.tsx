import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Person({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0] * 2) * 0.15;
    }
  });
  return (
    <group ref={ref} position={position}>
      {/* Head */}
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.5, 8]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
      </mesh>
    </group>
  );
}

function Book({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.3;
    }
  });
  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <boxGeometry args={[0.5, 0.6, 0.08]} />
      <meshStandardMaterial color="#3b82f6" roughness={0.3} />
    </mesh>
  );
}

function Heart3D({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.3);
    shape.bezierCurveTo(0, 0.3, -0.3, 0.8, -0.6, 0.8);
    shape.bezierCurveTo(-1, 0.8, -1, 0.3, -1, 0.3);
    shape.bezierCurveTo(-1, 0, -0.5, -0.3, 0, -0.6);
    shape.bezierCurveTo(0.5, -0.3, 1, 0, 1, 0.3);
    shape.bezierCurveTo(1, 0.3, 1, 0.8, 0.6, 0.8);
    shape.bezierCurveTo(0.3, 0.8, 0, 0.3, 0, 0.3);
    return new THREE.ExtrudeGeometry(shape, { depth: 0.2, bevelEnabled: true, bevelSegments: 4, bevelSize: 0.05, bevelThickness: 0.05 });
  }, []);
  useFrame((state) => {
    if (ref.current) {
      const s = 0.4 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      ref.current.scale.set(s, s, s);
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });
  return (
    <mesh ref={ref} geometry={geometry} position={position} rotation={[Math.PI, 0, 0]}>
      <meshStandardMaterial color="#ef4444" roughness={0.3} emissive="#dc2626" emissiveIntensity={0.3} />
    </mesh>
  );
}

function Particles({ count = 30 }: { count?: number }) {
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
      <pointsMaterial size={0.03} color="#c4b5fd" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} color="#e0e7ff" />
      <pointLight position={[-3, 2, 3]} intensity={0.5} color="#818cf8" />
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
        <Person position={[-1.2, -0.5, 0]} color="#3b82f6" />
        <Person position={[0, -0.3, 0.3]} color="#6366f1" />
        <Person position={[1.2, -0.5, -0.2]} color="#8b5cf6" />
        <Book position={[-0.5, 0.2, 0.5]} rotation={[0.2, 0.5, 0.1]} />
        <Book position={[0.8, 0.4, -0.3]} rotation={[-0.1, 0.3, -0.2]} />
        <Heart3D position={[0, 1.2, 0]} />
      </Float>
      <Particles />
    </>
  );
}

export function Community3D({ className }: { className?: string }) {
  return (
    <div className={`three-container ${className ?? ''}`} style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0.5, 5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <Scene />
      </Canvas>
    </div>
  );
}
