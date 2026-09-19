import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, Line } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { GlobeGeometry, StarShape, HeartShape } from './geometries';

function RotatingGlobe() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.08;
  });
  return (
    <group ref={ref}>
      <GlobeGeometry scale={0.8} />
    </group>
  );
}

function MapMarker({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.05;
    }
  });
  return (
    <group ref={ref} position={position}>
      {/* Pin body */}
      <mesh castShadow>
        <coneGeometry args={[0.05, 0.12, 8]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} emissive={color} emissiveIntensity={0.3} />
      </mesh>
      {/* Pin head */}
      <mesh position={[0, 0.08, 0]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.5} emissive={color} emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

function ConnectionLine({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const points = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3((start[0] + end[0]) / 2, Math.max(start[1], end[1]) + 0.5, (start[2] + end[2]) / 2),
      new THREE.Vector3(...end)
    );
    return curve.getPoints(32).map(p => [p.x, p.y, p.z] as [number, number, number]);
  }, [start, end]);

  return (
    <Line points={points} color="#60a5fa" lineWidth={1} transparent opacity={0.4} />
  );
}

function OrbitRing({ radius, color }: { radius: number; color: string }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.005, 8, 64]} />
      <meshStandardMaterial color={color} transparent opacity={0.2} />
    </mesh>
  );
}

function Particle({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0] * 3) * 0.1;
      const s = 0.4 + Math.sin(state.clock.elapsedTime * 2 + position[2]) * 0.6;
      ref.current.scale.setScalar(s);
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.015, 6, 6]} />
      <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1.5} />
    </mesh>
  );
}

function Scene() {
  const markers = useMemo(() => [
    { pos: [0.5, 0.8, 0.5] as [number, number, number], color: '#ef4444' },
    { pos: [-0.3, 0.85, 0.6] as [number, number, number], color: '#f59e0b' },
    { pos: [0.2, 0.7, -0.6] as [number, number, number], color: '#3b82f6' },
    { pos: [-0.6, 0.6, -0.4] as [number, number, number], color: '#10b981' },
    { pos: [0.7, 0.4, -0.3] as [number, number, number], color: '#8b5cf6' },
  ], []);

  const particles = useMemo(() =>
    Array.from({ length: 25 }, () => [
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 3,
      (Math.random() - 0.5) * 5,
    ] as [number, number, number]), []);

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize={1024} />
      <pointLight position={[-4, 3, -3]} color="#3b82f6" intensity={0.5} />
      <fog attach="fog" args={['#fafafa', 6, 14]} />
      <Environment preset="city" />

      <RotatingGlobe />

      {markers.map((m, i) => (
        <MapMarker key={i} position={m.pos} color={m.color} />
      ))}

      <ConnectionLine start={[0.5, 0.8, 0.5]} end={[-0.3, 0.85, 0.6]} />
      <ConnectionLine start={[0.5, 0.8, 0.5]} end={[0.2, 0.7, -0.6]} />
      <ConnectionLine start={[-0.6, 0.6, -0.4]} end={[0.7, 0.4, -0.3]} />

      <OrbitRing radius={1.2} color="#3b82f6" />
      <OrbitRing radius={1.5} color="#60a5fa" />

      <StarShape position={[2, 1, -1]} scale={0.4} color="#f59e0b" />
      <StarShape position={[-2, 0.5, -1.5]} scale={0.3} color="#fbbf24" />
      <HeartShape position={[1.5, -0.5, -1]} scale={0.1} color="#ef4444" />

      {particles.map((pos, i) => (
        <Particle key={i} position={pos} />
      ))}

      <ContactShadows position={[0, -1.5, 0]} opacity={0.2} scale={10} blur={2} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.7} luminanceSmoothing={0.9} intensity={0.5} />
      </EffectComposer>
    </>
  );
}

export function Globe3D() {
  return (
    <Canvas camera={{ position: [0, 1, 4], fov: 42 }} shadows style={{ background: 'transparent' }}>
      <Scene />
    </Canvas>
  );
}
