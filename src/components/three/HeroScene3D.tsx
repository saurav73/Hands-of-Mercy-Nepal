import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { BookGeometry, PencilGeometry, StarShape, HeartShape } from './geometries';

function GraduationCap() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.15;
  });
  return (
    <group ref={ref} position={[0, 0.6, 0]}>
      {/* Board */}
      <mesh position={[0, 0, 0]} castShadow rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.04, 6]} />
        <meshStandardMaterial color="#111827" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Top cap */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.05, 6]} />
        <meshStandardMaterial color="#111827" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Tassel string */}
      <mesh position={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.3, 4]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Tassel end */}
      <mesh position={[0.2, -0.16, 0]}>
        <coneGeometry args={[0.025, 0.06, 6]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Button on top */}
      <mesh position={[0, 0.07, 0]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.3} metalness={0.5} />
      </mesh>
    </group>
  );
}

function FloatingBook({ position, rotation, color }: { position: [number, number, number]; rotation: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.7 + position[2]) * 0.08;
    }
  });
  return (
    <group ref={ref} position={position} rotation={rotation}>
      <BookGeometry color={color} />
    </group>
  );
}

function Particle({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0] * 3) * 0.15;
      ref.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.5 + position[2] * 2) * 0.08;
      const s = 0.6 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.4;
      ref.current.scale.setScalar(s);
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.025, 6, 6]} />
      <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1.5} roughness={0.3} metalness={0.2} />
    </mesh>
  );
}

function Scene() {
  const particles = useMemo(() =>
    Array.from({ length: 30 }, () => [
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 3,
      (Math.random() - 0.5) * 4,
    ] as [number, number, number]), []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize={1024} />
      <pointLight position={[-3, 2, -2]} color="#f59e0b" intensity={0.6} />
      <fog attach="fog" args={['#fafafa', 5, 12]} />
      <Environment preset="city" />

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <GraduationCap />
      </Float>

      <FloatingBook position={[-1.5, -0.3, -0.5]} rotation={[0.2, 0.5, 0.1]} color="#3b82f6" />
      <FloatingBook position={[1.5, 0.1, -0.3]} rotation={[-0.1, -0.3, -0.1]} color="#ef4444" />
      <FloatingBook position={[-0.8, 0.4, 0.8]} rotation={[0.3, 0.8, -0.2]} color="#10b981" />
      <FloatingBook position={[0.9, -0.5, 0.6]} rotation={[-0.2, 0.6, 0.15]} color="#f59e0b" />

      <PencilGeometry position={[-2, 0.2, 0]} rotation={[0, 0, 0.5]} />
      <PencilGeometry position={[2, -0.1, 0.3]} rotation={[0, 0, -0.3]} />
      <PencilGeometry position={[0, -0.8, -0.5]} rotation={[0.2, 0, 0.8]} />

      <StarShape position={[-1.8, 0.8, -1]} scale={0.8} />
      <StarShape position={[1.5, 0.7, -0.8]} scale={0.5} />
      <StarShape position={[0, 1, -1.5]} scale={0.6} />

      <HeartShape position={[1.8, 0.6, -1.2]} scale={0.08} color="#ef4444" />
      <HeartShape position={[-1.5, -0.6, -1]} scale={0.06} color="#ec4899" />

      {particles.map((pos, i) => (
        <Particle key={i} position={pos} />
      ))}

      <ContactShadows position={[0, -1.2, 0]} opacity={0.3} scale={8} blur={2} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.8} luminanceSmoothing={0.9} intensity={0.6} />
      </EffectComposer>
    </>
  );
}

export function HeroScene3D() {
  return (
    <Canvas camera={{ position: [0, 0.5, 4], fov: 45 }} shadows style={{ background: 'transparent' }}>
      <Scene />
    </Canvas>
  );
}
