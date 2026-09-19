import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { HandGeometry, HeartShape } from './geometries';

function PulsingHeart() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      const beat = 1 + Math.sin(t * 3) * 0.06 + Math.sin(t * 6) * 0.03;
      ref.current.scale.setScalar(beat);
      ref.current.rotation.y = t * 0.15;
    }
  });
  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={ref} position={[0, 0.2, 0]}>
        <HeartShape scale={0.35} color="#ef4444" />
      </group>
    </Float>
  );
}

function OrbitingSpheres() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.3;
  });
  return (
    <group ref={ref}>
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        const r = 1.2;
        const colors = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899'];
        return (
          <Float key={i} speed={2 + i * 0.5} floatIntensity={0.2}>
            <mesh position={[Math.cos(angle) * r, Math.sin(angle * 0.5) * 0.3, Math.sin(angle) * r]}>
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshStandardMaterial
                color={colors[i]}
                emissive={colors[i]}
                emissiveIntensity={0.5}
                roughness={0.2}
                metalness={0.4}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

function OpenHands() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });
  return (
    <group ref={ref} position={[0, -0.5, 0.3]}>
      {/* Left hand */}
      <HandGeometry position={[-0.35, 0, 0]} rotation={[0, 0, 0.2]} color="#fcd34d" />
      {/* Right hand */}
      <HandGeometry position={[0.35, 0, 0]} rotation={[0, 0, -0.2]} color="#fcd34d" />
    </group>
  );
}

function Particle({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.2 + position[0] * 5) * 0.15;
      ref.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.8 + position[2] * 3) * 0.05;
      const s = 0.5 + Math.sin(state.clock.elapsedTime * 2 + position[1]) * 0.5;
      ref.current.scale.setScalar(s);
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.025, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} roughness={0.3} />
    </mesh>
  );
}

function Scene() {
  const particles = useMemo(() =>
    Array.from({ length: 40 }, () => ({
      pos: [
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 4,
      ] as [number, number, number],
      color: ['#ef4444', '#ec4899', '#f59e0b', '#fbbf24'][Math.floor(Math.random() * 4)],
    })), []);

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize={1024} />
      <pointLight position={[-3, 2, -2]} color="#ef4444" intensity={0.8} />
      <pointLight position={[3, -1, 2]} color="#ec4899" intensity={0.4} />
      <fog attach="fog" args={['#fafafa', 5, 12]} />
      <Environment preset="city" />

      <PulsingHeart />
      <OrbitingSpheres />
      <OpenHands />

      {particles.map((p, i) => (
        <Particle key={i} position={p.pos} color={p.color} />
      ))}

      <ContactShadows position={[0, -1.2, 0]} opacity={0.25} scale={8} blur={2} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={0.8} />
      </EffectComposer>
    </>
  );
}

export function MercyHeart3D() {
  return (
    <Canvas camera={{ position: [0, 0.5, 4], fov: 45 }} shadows style={{ background: 'transparent' }}>
      <Scene />
    </Canvas>
  );
}
