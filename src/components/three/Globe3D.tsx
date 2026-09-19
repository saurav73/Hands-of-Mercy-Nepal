import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Globe() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.15;
  });
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[1.5, 48, 48]} />
        <meshStandardMaterial color="#1e3a5f" roughness={0.4} metalness={0.3} transparent opacity={0.85} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.52, 32, 32]} />
        <meshStandardMaterial color="#60a5fa" wireframe transparent opacity={0.25} />
      </mesh>
      {/* Latitude lines */}
      {[-0.5, 0, 0.5].map((y, i) => (
        <mesh key={`lat-${i}`} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[Math.sqrt(1.5 * 1.5 - y * y), 0.008, 8, 64]} />
          <meshStandardMaterial color="#93c5fd" transparent opacity={0.3} />
        </mesh>
      ))}
      {/* Longitude lines */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={`lng-${i}`} rotation={[0, (i * Math.PI) / 4, 0]}>
          <torusGeometry args={[1.5, 0.008, 8, 64]} />
          <meshStandardMaterial color="#93c5fd" transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function Marker({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
      ref.current.scale.set(s, s, s);
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
    </mesh>
  );
}

function Ring({ radius, y }: { radius: number; y: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });
  return (
    <mesh ref={ref} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.01, 8, 64]} />
      <meshStandardMaterial color="#3b82f6" transparent opacity={0.4} />
    </mesh>
  );
}

function FloatingParticles({ count = 60 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count]);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.01;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#93c5fd" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#bfdbfe" />
      <pointLight position={[-4, 3, 4]} intensity={0.6} color="#818cf8" />
      <pointLight position={[3, -2, 3]} intensity={0.3} color="#60a5fa" />
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
        <Globe />
        <Marker position={[1.4, 0.8, 0.8]} color="#ef4444" />
        <Marker position={[-1.2, 0.5, 1.0]} color="#22c55e" />
        <Marker position={[0.3, -1.0, 1.2]} color="#f59e0b" />
        <Ring radius={1.8} y={0} />
        <Ring radius={2.0} y={0.3} />
      </Float>
      <FloatingParticles />
    </>
  );
}

export function Globe3D({ className }: { className?: string }) {
  return (
    <div className={`three-container ${className ?? ''}`} style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 1, 5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <Scene />
      </Canvas>
    </div>
  );
}
