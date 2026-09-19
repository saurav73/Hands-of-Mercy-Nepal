import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { BookGeometry, GlobeGeometry, PencilGeometry } from './geometries';

function RotatingGlobe() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.12;
  });
  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={ref}>
        <GlobeGeometry scale={0.5} />
      </group>
    </Float>
  );
}

function Ruler() {
  return (
    <group position={[0, 0, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.08, 1.2, 0.02]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.4} metalness={0.1} transparent opacity={0.85} />
      </mesh>
      {/* Measurement markings */}
      {Array.from({ length: 24 }, (_, i) => (
        <mesh key={i} position={[0.042, -0.55 + i * 0.05, 0]}>
          <boxGeometry args={[i % 5 === 0 ? 0.025 : 0.012, 0.003, 0.002]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
      ))}
      {/* Numbers */}
      {[0, 1, 2, 3, 4, 5].map((n) => (
        <mesh key={`n-${n}`} position={[0.042, -0.55 + n * 0.25, 0.002]}>
          <boxGeometry args={[0.015, 0.02, 0.001]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
      ))}
    </group>
  );
}

function FloatingBookItem({ position, rotation, color }: { position: [number, number, number]; rotation: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.4 + position[0] * 2) * 0.15;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + position[2]) * 0.06;
    }
  });
  return (
    <group ref={ref} position={position} rotation={rotation}>
      <BookGeometry color={color} width={0.6} height={0.8} thickness={0.1} />
    </group>
  );
}

function Particle({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0] * 4) * 0.2;
      const s = 0.5 + Math.sin(state.clock.elapsedTime * 1.5 + position[2]) * 0.5;
      ref.current.scale.setScalar(s);
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.02, 6, 6]} />
      <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={1} />
    </mesh>
  );
}

function Scene() {
  const particles = useMemo(() =>
    Array.from({ length: 25 }, () => [
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 3,
      (Math.random() - 0.5) * 4,
    ] as [number, number, number]), []);

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize={1024} />
      <pointLight position={[-3, 3, -2]} color="#3b82f6" intensity={0.5} />
      <fog attach="fog" args={['#fafafa', 5, 14]} />
      <Environment preset="city" />

      <RotatingGlobe />

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
        <group position={[2, 0.5, 0]} rotation={[0.2, 0.5, 0.1]}>
          <Ruler />
        </group>
      </Float>

      <FloatingBookItem position={[-1.5, -0.3, 0]} rotation={[0.1, 0.3, 0]} color="#3b82f6" />
      <FloatingBookItem position={[1.5, -0.5, -0.5]} rotation={[-0.1, -0.2, 0.1]} color="#10b981" />
      <FloatingBookItem position={[-0.5, 0.6, -0.8]} rotation={[0.2, 0.8, -0.1]} color="#8b5cf6" />

      <PencilGeometry position={[-2, 0.3, 0.5]} rotation={[0, 0, 0.6]} />
      <PencilGeometry position={[2.2, -0.2, 0.3]} rotation={[0.1, 0, -0.4]} />

      {particles.map((pos, i) => (
        <Particle key={i} position={pos} />
      ))}

      <ContactShadows position={[0, -1.2, 0]} opacity={0.25} scale={8} blur={2} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.7} luminanceSmoothing={0.9} intensity={0.5} />
      </EffectComposer>
    </>
  );
}

export function FloatingBooks3D() {
  return (
    <Canvas camera={{ position: [0, 0.5, 4.5], fov: 42 }} shadows style={{ background: 'transparent' }}>
      <Scene />
    </Canvas>
  );
}
