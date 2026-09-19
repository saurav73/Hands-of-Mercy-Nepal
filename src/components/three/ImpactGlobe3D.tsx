import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function Globe() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#1e3a5f" roughness={0.4} metalness={0.3} transparent opacity={0.85} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.52, 24, 24]} />
        <meshStandardMaterial color="#60a5fa" wireframe transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

function NepalMarker() {
  const ref = useRef<THREE.Mesh>(null);
  const position = useMemo(() => latLngToVector3(28.3949, 84.1240, 1.55), []);

  useFrame((state) => {
    if (ref.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
      ref.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshStandardMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={0.8} />
    </mesh>
  );
}

function ArcLine({ start, end, color }: { start: THREE.Vector3; end: THREE.Vector3; color: string }) {
  const curve = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    mid.normalize().multiplyScalar(2.5);
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return curve;
  }, [start, end]);

  const ref = useRef<THREE.Line>(null);
  useFrame((state) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  const points = useMemo(() => curve.getPoints(50), [curve]);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  const lineObj = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.5 });
    return new THREE.Line(geometry, mat);
  }, [geometry, color]);

  useFrame((state) => {
    if (lineObj) {
      (lineObj.material as THREE.LineBasicMaterial).opacity = 0.4 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return <primitive ref={ref as never} object={lineObj} />;
}

function ArcLines() {
  const nepalPos = useMemo(() => latLngToVector3(28.3949, 84.1240, 1.55), []);
  const destinations = useMemo(() => [
    latLngToVector3(40.7128, -74.0060, 1.55),
    latLngToVector3(51.5074, -0.1278, 1.55),
    latLngToVector3(35.6762, 139.6503, 1.55),
    latLngToVector3(-33.8688, 151.2093, 1.55),
    latLngToVector3(25.2048, 55.2708, 1.55),
  ], []);

  const colors = ['#60a5fa', '#818cf8', '#a78bfa', '#c084fc', '#f472b6'];

  return (
    <>
      {destinations.map((dest, i) => (
        <ArcLine key={i} start={nepalPos} end={dest} color={colors[i]} />
      ))}
    </>
  );
}

function FloatingParticles({ count = 40 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#93c5fd" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#bfdbfe" />
      <pointLight position={[-4, 3, 4]} intensity={0.5} color="#818cf8" />
      <pointLight position={[3, -2, 3]} intensity={0.3} color="#60a5fa" />
      <Globe />
      <NepalMarker />
      <ArcLines />
      <FloatingParticles />
    </>
  );
}

interface ImpactGlobe3DProps {
  className?: string;
}

export function ImpactGlobe3D({ className }: ImpactGlobe3DProps) {
  return (
    <div className={`three-container ${className ?? ''}`} style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 1, 4.5], fov: 45 }}
        style={{ overflow: 'visible' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
