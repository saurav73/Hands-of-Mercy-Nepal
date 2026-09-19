import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Hand({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + position[0]) * 0.1;
      ref.current.rotation.z = rotation[2] + Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
    }
  });
  return (
    <group ref={ref} position={position} rotation={rotation}>
      {/* Palm */}
      <mesh>
        <boxGeometry args={[0.3, 0.15, 0.12]} />
        <meshStandardMaterial color="#fcd34d" roughness={0.4} metalness={0.2} />
      </mesh>
      {/* Fingers */}
      {[-0.1, -0.033, 0.033, 0.1].map((x, i) => (
        <mesh key={i} position={[x, 0.15, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.12, 6]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.4} />
        </mesh>
      ))}
      {/* Thumb */}
      <mesh position={[-0.2, 0.05, 0]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.025, 0.025, 0.1, 6]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.4} />
      </mesh>
    </group>
  );
}

function DonationBox({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.3;
  });
  return (
    <group ref={ref} position={position}>
      <mesh>
        <boxGeometry args={[0.5, 0.4, 0.5]} />
        <meshStandardMaterial color="#ef4444" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Slot */}
      <mesh position={[0, 0.21, 0]}>
        <boxGeometry args={[0.2, 0.02, 0.05]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* Heart on front */}
      <mesh position={[0, 0, 0.26]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="white" roughness={0.3} />
      </mesh>
    </group>
  );
}

function Coin({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 2;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
      <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={0.8} />
    </mesh>
  );
}

function Heart3D({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.3);
    shape.bezierCurveTo(0, 0.3, -0.3, 0.8, -0.6, 0.8);
    shape.bezierCurveTo(-1, 0.8, -1, 0.3, -1, 0.3);
    shape.bezierCurveTo(-1, 0, -0.5, -0.3, 0, -0.6);
    shape.bezierCurveTo(0.5, -0.3, 1, 0, 1, 0.3);
    shape.bezierCurveTo(1, 0.3, 1, 0.8, 0.6, 0.8);
    shape.bezierCurveTo(0.3, 0.8, 0, 0.3, 0, 0.3);
    return new THREE.ExtrudeGeometry(shape, { depth: 0.15, bevelEnabled: true, bevelSegments: 4, bevelSize: 0.04, bevelThickness: 0.04 });
  }, []);
  useFrame((state) => {
    if (ref.current) {
      const s = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.04;
      ref.current.scale.set(s, s, s);
    }
  });
  return (
    <mesh ref={ref} geometry={geometry} position={position} rotation={[Math.PI, 0, 0]}>
      <meshStandardMaterial color="#ef4444" roughness={0.3} emissive="#dc2626" emissiveIntensity={0.4} />
    </mesh>
  );
}

function Particles({ count = 20 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, [count]);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#fca5a5" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} color="#fef3c7" />
      <pointLight position={[-3, 2, 3]} intensity={0.5} color="#f87171" />
      <pointLight position={[3, -1, 2]} intensity={0.3} color="#fbbf24" />
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
        <DonationBox position={[0, -0.3, 0]} />
        <Hand position={[-1.2, 0.5, 0.3]} rotation={[0, 0, 0.3]} />
        <Hand position={[1.2, 0.5, -0.3]} rotation={[0, 0, -0.3]} />
        <Coin position={[-0.3, 0.8, 0.2]} />
        <Coin position={[0.3, 1.0, -0.1]} />
        <Coin position={[0, 0.6, 0.4]} />
        <Heart3D position={[0, 1.5, 0]} />
      </Float>
      <Particles />
    </>
  );
}

export function Volunteer3D({ className }: { className?: string }) {
  return (
    <div className={`three-container ${className ?? ''}`} style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0.5, 5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <Scene />
      </Canvas>
    </div>
  );
}
