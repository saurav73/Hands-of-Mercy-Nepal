import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { DeskGeometry, ChairGeometry, PersonGeometry, ChalkboardGeometry, BookGeometry, PencilGeometry, GlobeGeometry, GroundPlane } from './geometries';

function Classroom() {
  return (
    <group>
      {/* Floor */}
      <GroundPlane color="#e8ddd0" size={8} />

      {/* Chalkboard */}
      <ChalkboardGeometry position={[0, 0.9, -1.8]} />

      {/* Teacher desk */}
      <DeskGeometry position={[0, 0, -1]} />

      {/* Teacher */}
      <PersonGeometry position={[0, 0.0, -1]} color="#1e293b" />

      {/* Student desks in rows */}
      {[
        [-0.8, 0, 0], [0.8, 0, 0],
        [-0.8, 0, 1], [0.8, 0, 1],
        [-0.8, 0, 2], [0.8, 0, 2],
      ].map((pos, i) => (
        <group key={i}>
          <DeskGeometry position={pos as [number, number, number]} />
          <ChairGeometry position={[pos[0], pos[1], pos[2] + 0.35]} />
          {/* Student figure */}
          <PersonGeometry
            position={[pos[0], pos[1] + 0.05, pos[2] + 0.15]}
            color={['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#ec4899'][i]}
          />
          {/* Books on desk */}
          <BookGeometry
            position={[pos[0] + 0.15, 0.42, pos[2] - 0.05]}
            color={['#3b82f6', '#ef4444', '#8b5cf6'][i % 3]}
            width={0.25}
            height={0.3}
            thickness={0.04}
          />
          {/* Pencil on desk */}
          <PencilGeometry
            position={[pos[0] - 0.15, 0.43, pos[2] + 0.05]}
            rotation={[Math.PI / 2, 0, 0.3]}
          />
        </group>
      ))}

      {/* Globe on shelf */}
      <GlobeGeometry position={[1.5, 0.7, -1.7]} scale={0.12} />

      {/* Shelf */}
      <mesh position={[1.5, 0.45, -1.7]} castShadow>
        <boxGeometry args={[0.4, 0.03, 0.15]} />
        <meshStandardMaterial color="#8b7355" roughness={0.5} />
      </mesh>

      {/* Extra books on shelf */}
      {[-0.1, 0, 0.1].map((x, i) => (
        <BookGeometry
          key={i}
          position={[1.5 + x, 0.53, -1.7]}
          color={['#3b82f6', '#10b981', '#f59e0b'][i]}
          width={0.06}
          height={0.12}
          thickness={0.04}
        />
      ))}
    </group>
  );
}

function FloatingParticles() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          child.position.y = 1.5 + Math.sin(state.clock.elapsedTime * 0.6 + i * 0.5) * 0.5;
          child.position.x = (i % 5 - 2) * 0.8 + Math.sin(state.clock.elapsedTime * 0.4 + i) * 0.15;
          const s = 0.4 + Math.sin(state.clock.elapsedTime * 1.5 + i) * 0.6;
          child.scale.setScalar(s);
        }
      });
    }
  });
  return (
    <group ref={ref}>
      {Array.from({ length: 15 }, (_, i) => (
        <mesh key={i} position={[(i % 5 - 2) * 0.8, 1.5, Math.floor(i / 5) * 0.5 - 0.5]}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1.2} />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize={1024} />
      <pointLight position={[-3, 3, -2]} color="#f59e0b" intensity={0.4} />
      <fog attach="fog" args={['#fafafa', 6, 14]} />
      <Environment preset="city" />

      <Classroom />
      <FloatingParticles />

      <ContactShadows position={[0, -0.12, 0]} opacity={0.25} scale={10} blur={2} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.8} luminanceSmoothing={0.9} intensity={0.4} />
      </EffectComposer>
    </>
  );
}

export function Classroom3D() {
  return (
    <Canvas camera={{ position: [0, 2.5, 5], fov: 40 }} shadows style={{ background: 'transparent' }}>
      <Scene />
    </Canvas>
  );
}
