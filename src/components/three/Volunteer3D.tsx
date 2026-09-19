import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { DonationBoxGeometry, HandGeometry, CoinGeometry, HeartShape } from './geometries';

function DonationBox() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });
  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={ref} position={[0, 0, 0]}>
        <DonationBoxGeometry />
      </group>
    </Float>
  );
}

function DroppingCoins() {
  const coins = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      offset: i * 1.5,
      x: (Math.random() - 0.5) * 0.3,
      z: (Math.random() - 0.5) * 0.3,
    })), []);

  return (
    <>
      {coins.map((coin, i) => (
        <CoinDropper key={i} offset={coin.offset} x={coin.x} z={coin.z} />
      ))}
    </>
  );
}

function CoinDropper({ offset, x, z }: { offset: number; x: number; z: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = ((state.clock.elapsedTime + offset) % 3) / 3;
      ref.current.position.y = 2 - t * 1.8;
      ref.current.rotation.x = t * 4;
      ref.current.rotation.z = t * 2;
      ref.current.scale.setScalar(t < 0.1 ? t * 10 : t > 0.9 ? (1 - t) * 10 : 1);
    }
  });
  return (
    <group ref={ref} position={[x, 2, z]}>
      <CoinGeometry color="#fbbf24" />
    </group>
  );
}

function OpenHands() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
      ref.current.position.y = -0.3 + Math.sin(state.clock.elapsedTime * 0.6) * 0.05;
    }
  });
  return (
    <group ref={ref}>
      <HandGeometry position={[-0.4, 0, 0.3]} rotation={[0, 0, 0.3]} color="#fcd34d" />
      <HandGeometry position={[0.4, 0, 0.3]} rotation={[0, 0, -0.3]} color="#fcd34d" />
    </group>
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
      <sphereGeometry args={[0.02, 6, 6]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
    </mesh>
  );
}

function Scene() {
  const particles = useMemo(() =>
    Array.from({ length: 30 }, () => ({
      pos: [(Math.random() - 0.5) * 6, Math.random() * 2 + 0.5, (Math.random() - 0.5) * 4] as [number, number, number],
      color: ['#fbbf24', '#f59e0b', '#ef4444', '#ec4899'][Math.floor(Math.random() * 4)],
    })), []);

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize={1024} />
      <pointLight position={[-3, 3, -2]} color="#f59e0b" intensity={0.6} />
      <pointLight position={[3, -1, 2]} color="#ef4444" intensity={0.4} />
      <fog attach="fog" args={['#fafafa', 5, 12]} />
      <Environment preset="city" />

      <DonationBox />
      <DroppingCoins />
      <OpenHands />
      <HeartShape position={[0, 1.5, -0.5]} scale={0.08} color="#ef4444" />
      <HeartShape position={[-1, 0.8, -0.8]} scale={0.05} color="#ec4899" />
      <HeartShape position={[1, 1, -0.6]} scale={0.06} color="#ef4444" />

      {particles.map((p, i) => (
        <Particle key={i} position={p.pos} color={p.color} />
      ))}

      <ContactShadows position={[0, -0.8, 0]} opacity={0.3} scale={8} blur={2} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={0.7} />
      </EffectComposer>
    </>
  );
}

export function Volunteer3D() {
  return (
    <Canvas camera={{ position: [0, 0.5, 4.5], fov: 42 }} shadows style={{ background: 'transparent' }}>
      <Scene />
    </Canvas>
  );
}
