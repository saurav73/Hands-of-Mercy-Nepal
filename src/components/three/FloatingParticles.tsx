import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function Particle({ position, color, size }: { position: [number, number, number]; color: string; size: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + position[0] * 3) * 0.3;
      ref.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.4 + position[2] * 2) * 0.1;
      const s = (0.6 + Math.sin(state.clock.elapsedTime * 1.5 + position[1] * 2) * 0.4) * size;
      ref.current.scale.setScalar(s);
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.1, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.2}
        roughness={0.3}
        metalness={0.2}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

function Scene() {
  const particles = useMemo(() =>
    Array.from({ length: 60 }, () => ({
      pos: [(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 6] as [number, number, number],
      color: ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444', '#ec4899'][Math.floor(Math.random() * 6)],
      size: 0.3 + Math.random() * 0.7,
    })), []);

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} castShadow shadow-mapSize={1024} />
      <fog attach="fog" args={['#fafafa', 4, 12]} />
      <Environment preset="city" />

      {particles.map((p, i) => (
        <Particle key={i} position={p.pos} color={p.color} size={p.size} />
      ))}

      <ContactShadows position={[0, -3, 0]} opacity={0.15} scale={12} blur={2} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={0.8} />
      </EffectComposer>
    </>
  );
}

export function FloatingParticles() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} shadows style={{ background: 'transparent' }}>
      <Scene />
    </Canvas>
  );
}
