import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { PersonGeometry, SpeechBubbleGeometry, StarShape, GroundPlane } from './geometries';

function TypingDots({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {[0, 1, 2].map((i) => (
        <Float key={i} speed={3 + i} floatIntensity={0.15}>
          <mesh position={[(i - 1) * 0.06, 0, 0]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.8} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function StoryBubble({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.05;
    }
  });
  return (
    <group ref={ref} position={position} scale={scale}>
      <SpeechBubbleGeometry scale={0.8} />
      <TypingDots position={[0, 0.02, 0.06]} />
    </group>
  );
}

function Person({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <PersonGeometry position={position} color={color} />
  );
}

function Particle({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.2 + position[0] * 4) * 0.12;
      const s = 0.5 + Math.sin(state.clock.elapsedTime * 2 + position[1]) * 0.5;
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
  const stories = useMemo(() => [
    { person: [-1.2, 0, 0] as [number, number, number], bubble: [-1.2, 1.2, 0] as [number, number, number], color: '#3b82f6', scale: 1 },
    { person: [0, 0, 0.5] as [number, number, number], bubble: [0, 1.3, 0.5] as [number, number, number], color: '#10b981', scale: 0.9 },
    { person: [1.2, 0, 0] as [number, number, number], bubble: [1.2, 1.2, 0] as [number, number, number], color: '#f59e0b', scale: 0.95 },
  ], []);

  const particles = useMemo(() =>
    Array.from({ length: 30 }, () => ({
      pos: [(Math.random() - 0.5) * 6, Math.random() * 2 + 0.5, (Math.random() - 0.5) * 4] as [number, number, number],
      color: ['#f59e0b', '#6366f1', '#10b981', '#ec4899'][Math.floor(Math.random() * 4)],
    })), []);

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize={1024} />
      <pointLight position={[-3, 3, -2]} color="#6366f1" intensity={0.5} />
      <pointLight position={[3, 2, 2]} color="#f59e0b" intensity={0.3} />
      <fog attach="fog" args={['#fafafa', 5, 12]} />
      <Environment preset="city" />

      {stories.map((s, i) => (
        <group key={i}>
          <Person position={s.person} color={s.color} />
          <StoryBubble position={s.bubble} scale={s.scale} />
        </group>
      ))}

      <StarShape position={[-2, 1.5, -1]} scale={0.5} color="#f59e0b" />
      <StarShape position={[2, 1.2, -0.8]} scale={0.35} color="#fbbf24" />
      <StarShape position={[0, 1.8, -1.5]} scale={0.4} color="#f59e0b" />

      <GroundPlane color="#f0f0f0" size={8} />

      {particles.map((p, i) => (
        <Particle key={i} position={p.pos} color={p.color} />
      ))}

      <ContactShadows position={[0, -0.12, 0]} opacity={0.3} scale={8} blur={2} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={0.6} />
      </EffectComposer>
    </>
  );
}

export function Stories3D() {
  return (
    <Canvas camera={{ position: [0, 1.5, 5], fov: 42 }} shadows style={{ background: 'transparent' }}>
      <Scene />
    </Canvas>
  );
}
