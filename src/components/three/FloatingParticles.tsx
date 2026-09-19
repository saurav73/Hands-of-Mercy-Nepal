import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function InstancedParticles({ count = 200, color = '#818cf8' }: { count?: number; color?: string }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const tempObject = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        speed: 0.2 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
        scale: 0.02 + Math.random() * 0.04,
      });
    }
    return arr;
  }, [count]);

  useEffect(() => {
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      tempObject.position.set(p.x, p.y, p.z);
      tempObject.scale.setScalar(p.scale);
      tempObject.updateMatrix();
      meshRef.current!.setMatrixAt(i, tempObject.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [particles, tempObject]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    particles.forEach((p, i) => {
      tempObject.position.set(
        p.x + Math.sin(time * p.speed + p.offset) * 0.1,
        p.y + Math.cos(time * p.speed * 0.7 + p.offset) * 0.1,
        p.z + Math.sin(time * p.speed * 0.5 + p.offset) * 0.08
      );
      tempObject.scale.setScalar(p.scale * (1 + Math.sin(time * 1.5 + p.offset) * 0.2));
      tempObject.updateMatrix();
      meshRef.current!.setMatrixAt(i, tempObject.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color={color} transparent opacity={0.6} roughness={0.3} metalness={0.2} />
    </instancedMesh>
  );
}

function Scene({ count, color }: { count: number; color: string }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <pointLight position={[-3, 2, 4]} intensity={0.3} color={color} />
      <InstancedParticles count={count} color={color} />
    </>
  );
}

interface FloatingParticlesProps {
  className?: string;
  count?: number;
  color?: string;
}

export function FloatingParticles({ className, count = 200, color = '#818cf8' }: FloatingParticlesProps) {
  return (
    <div className={`three-container ${className ?? ''}`} style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ overflow: 'visible' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene count={count} color={color} />
      </Canvas>
    </div>
  );
}
