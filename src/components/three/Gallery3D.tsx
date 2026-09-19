import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function PhotoFrame({ position, rotation, color }: { position: [number, number, number]; rotation: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.05;
    }
  });
  return (
    <group ref={ref} position={position} rotation={rotation}>
      {/* Frame */}
      <mesh castShadow>
        <boxGeometry args={[0.6, 0.45, 0.03]} />
        <meshStandardMaterial color="#8b7355" roughness={0.4} metalness={0.2} />
      </mesh>
      {/* Inner photo */}
      <mesh position={[0, 0, 0.016]}>
        <boxGeometry args={[0.5, 0.35, 0.005]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      {/* Glass reflection */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[0.5, 0.35, 0.002]} />
        <meshStandardMaterial color="white" transparent opacity={0.1} roughness={0.1} metalness={0.8} />
      </mesh>
    </group>
  );
}

function Camera() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.05;
    }
  });
  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.2}>
      <group ref={ref}>
        {/* Body */}
        <mesh castShadow>
          <boxGeometry args={[0.35, 0.25, 0.2]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* Lens cylinder */}
        <mesh position={[0, 0, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.1, 0.12, 16]} />
          <meshStandardMaterial color="#334155" roughness={0.2} metalness={0.7} />
        </mesh>
        {/* Lens glass */}
        <mesh position={[0, 0, 0.22]}>
          <circleGeometry args={[0.07, 16]} />
          <meshStandardMaterial color="#60a5fa" transparent opacity={0.6} roughness={0.1} metalness={0.9} />
        </mesh>
        {/* Flash */}
        <mesh position={[-0.12, 0.14, 0.05]}>
          <boxGeometry args={[0.06, 0.04, 0.04]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.3} metalness={0.4} />
        </mesh>
        {/* Grip */}
        <mesh position={[0.2, -0.05, 0]}>
          <boxGeometry args={[0.04, 0.28, 0.16]} />
          <meshStandardMaterial color="#111827" roughness={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

function Particle({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0] * 3) * 0.12;
      const s = 0.4 + Math.sin(state.clock.elapsedTime * 2 + position[2]) * 0.6;
      ref.current.scale.setScalar(s);
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.018, 6, 6]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
    </mesh>
  );
}

function Scene() {
  const particles = useMemo(() =>
    Array.from({ length: 25 }, () => ({
      pos: [(Math.random() - 0.5) * 6, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 4] as [number, number, number],
      color: ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6'][Math.floor(Math.random() * 4)],
    })), []);

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize={1024} />
      <pointLight position={[-3, 3, -2]} color="#f59e0b" intensity={0.5} />
      <fog attach="fog" args={['#fafafa', 5, 12]} />
      <Environment preset="city" />

      <Camera />

      <PhotoFrame position={[-1.5, 0, -0.5]} rotation={[0, 0.3, 0]} color="#3b82f6" />
      <PhotoFrame position={[1.5, 0.3, -0.3]} rotation={[0, -0.3, 0]} color="#10b981" />
      <PhotoFrame position={[-0.8, -0.5, 0.5]} rotation={[0, 0.1, 0.1]} color="#f59e0b" />
      <PhotoFrame position={[0.8, -0.3, 0.3]} rotation={[0, -0.2, -0.1]} color="#8b5cf6" />

      {particles.map((p, i) => (
        <Particle key={i} position={p.pos} color={p.color} />
      ))}

      <ContactShadows position={[0, -1.2, 0]} opacity={0.25} scale={8} blur={2} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.7} luminanceSmoothing={0.9} intensity={0.5} />
      </EffectComposer>
    </>
  );
}

export function Gallery3D() {
  return (
    <Canvas camera={{ position: [0, 0.5, 4.5], fov: 42 }} shadows style={{ background: 'transparent' }}>
      <Scene />
    </Canvas>
  );
}
