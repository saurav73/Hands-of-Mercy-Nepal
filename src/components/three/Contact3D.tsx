import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { HeartShape } from './geometries';

function Envelope() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });
  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.2}>
      <group ref={ref}>
        {/* Envelope body */}
        <mesh castShadow>
          <boxGeometry args={[0.9, 0.6, 0.04]} />
          <meshStandardMaterial color="#f5f0e8" roughness={0.6} />
        </mesh>
        {/* Envelope flap (triangle) */}
        <mesh position={[0, 0.1, 0.025]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.5, 0.35, 3]} />
          <meshStandardMaterial color="#e8ddd0" roughness={0.5} side={THREE.DoubleSide} />
        </mesh>
        {/* Seal */}
        <mesh position={[0, -0.05, 0.025]}>
          <circleGeometry args={[0.06, 16]} />
          <meshStandardMaterial color="#ef4444" roughness={0.3} metalness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

function MapPin() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });
  return (
    <Float speed={2} floatIntensity={0.2}>
      <group ref={ref}>
        <mesh castShadow>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#ef4444" roughness={0.3} metalness={0.4} emissive="#ef4444" emissiveIntensity={0.2} />
        </mesh>
        <mesh position={[0, -0.15, 0]}>
          <coneGeometry args={[0.06, 0.15, 8]} />
          <meshStandardMaterial color="#ef4444" roughness={0.3} metalness={0.4} />
        </mesh>
        {/* Inner circle */}
        <mesh position={[0, 0, 0.1]}>
          <circleGeometry args={[0.04, 12]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </group>
    </Float>
  );
}

function Particle({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0] * 3) * 0.15;
      const s = 0.5 + Math.sin(state.clock.elapsedTime * 2 + position[2]) * 0.5;
      ref.current.scale.setScalar(s);
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.02, 6, 6]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
    </mesh>
  );
}

function Scene() {
  const particles = useMemo(() =>
    Array.from({ length: 25 }, () => ({
      pos: [(Math.random() - 0.5) * 6, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 4] as [number, number, number],
      color: ['#ef4444', '#f59e0b', '#3b82f6'][Math.floor(Math.random() * 3)],
    })), []);

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize={1024} />
      <pointLight position={[-3, 2, -2]} color="#ef4444" intensity={0.5} />
      <fog attach="fog" args={['#fafafa', 5, 12]} />
      <Environment preset="city" />

      <group position={[0, 0, 0]}>
        <Envelope />
      </group>
      <group position={[1.5, 0.5, 0]}>
        <MapPin />
      </group>
      <group position={[-1.5, -0.3, 0.5]}>
        <HeartShape scale={0.08} color="#ef4444" />
      </group>

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

export function Contact3D() {
  return (
    <Canvas camera={{ position: [0, 0.5, 4], fov: 45 }} shadows style={{ background: 'transparent' }}>
      <Scene />
    </Canvas>
  );
}
