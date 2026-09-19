import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { PersonGeometry, BookGeometry, HeartShape, GroundPlane } from './geometries';

function GroupOfPeople() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#ec4899'];
  const positions: [number, number, number][] = [
    [-0.8, 0, 0.3], [0, 0, 0.5], [0.8, 0, 0.3],
    [-0.5, 0, -0.3], [0.5, 0, -0.3], [0, 0, -0.5],
  ];
  return (
    <group ref={ref}>
      {positions.map((pos, i) => (
        <PersonGeometry
          key={i}
          position={pos}
          color={colors[i]}
          skinColor={['#f5d0b0', '#d4a574', '#c68c5c', '#f0c8a0', '#e0b090', '#d4956a'][i]}
        />
      ))}
    </group>
  );
}

function FloatingBooks() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });
  return (
    <group ref={ref} position={[0, 1.2, 0]}>
      <Float speed={2} floatIntensity={0.3}>
        <BookGeometry position={[-0.4, 0, 0]} color="#3b82f6" />
      </Float>
      <Float speed={2.5} floatIntensity={0.3}>
        <BookGeometry position={[0.4, 0, 0]} color="#10b981" />
      </Float>
    </group>
  );
}

function Particle({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0] * 3) * 0.1;
      const s = 0.5 + Math.sin(state.clock.elapsedTime * 1.8 + position[2]) * 0.5;
      ref.current.scale.setScalar(s);
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.025, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
    </mesh>
  );
}

function Scene() {
  const particles = useMemo(() =>
    Array.from({ length: 35 }, () => ({
      pos: [(Math.random() - 0.5) * 6, Math.random() * 2 + 0.5, (Math.random() - 0.5) * 4] as [number, number, number],
      color: ['#f59e0b', '#3b82f6', '#10b981', '#ec4899'][Math.floor(Math.random() * 4)],
    })), []);

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize={1024} />
      <pointLight position={[-3, 3, -2]} color="#10b981" intensity={0.5} />
      <pointLight position={[3, 2, 2]} color="#3b82f6" intensity={0.3} />
      <fog attach="fog" args={['#fafafa', 5, 12]} />
      <Environment preset="city" />

      <GroupOfPeople />
      <FloatingBooks />
      <HeartShape position={[0, 1.8, 0]} scale={0.08} color="#ef4444" />
      <GroundPlane />

      {particles.map((p, i) => (
        <Particle key={i} position={p.pos} color={p.color} />
      ))}

      <ContactShadows position={[0, -0.12, 0]} opacity={0.3} scale={8} blur={2} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.7} luminanceSmoothing={0.9} intensity={0.5} />
      </EffectComposer>
    </>
  );
}

export function Community3D() {
  return (
    <Canvas camera={{ position: [0, 1.5, 5], fov: 42 }} shadows style={{ background: 'transparent' }}>
      <Scene />
    </Canvas>
  );
}
