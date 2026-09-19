import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function createHeartShape(): THREE.Shape {
  const shape = new THREE.Shape();
  const x = 0, y = 0;
  shape.moveTo(x, y + 0.5);
  shape.bezierCurveTo(x, y + 0.5, x - 0.5, y + 1.3, x - 1, y + 1.3);
  shape.bezierCurveTo(x - 1.7, y + 1.3, x - 1.7, y + 0.5, x - 1.7, y + 0.5);
  shape.bezierCurveTo(x - 1.7, y, x - 1, y - 0.5, x, y - 1);
  shape.bezierCurveTo(x + 1, y - 0.5, x + 1.7, y, x + 1.7, y + 0.5);
  shape.bezierCurveTo(x + 1.7, y + 0.5, x + 1.7, y + 1.3, x + 1, y + 1.3);
  shape.bezierCurveTo(x + 0.5, y + 1.3, x, y + 0.5, x, y + 0.5);
  return shape;
}

function Heart({ scale = 1 }: { scale?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const heartGeometry = useMemo(() => {
    const shape = createHeartShape();
    const extrudeSettings = { depth: 0.4, bevelEnabled: true, bevelSegments: 8, steps: 2, bevelSize: 0.1, bevelThickness: 0.1 };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.08;
      ref.current.scale.set(scale * pulse, scale * pulse, scale * pulse);
    }
  });

  return (
    <mesh ref={ref} geometry={heartGeometry} rotation={[Math.PI, 0, 0]} position={[0, -0.3, 0]}>
      <meshStandardMaterial color="#ef4444" roughness={0.2} metalness={0.3} emissive="#dc2626" emissiveIntensity={0.3} />
    </mesh>
  );
}

function OrbitingHand({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const angleOffset = (index * Math.PI * 2) / 2;

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * 0.5 + angleOffset;
      ref.current.position.x = Math.cos(t) * 2;
      ref.current.position.z = Math.sin(t) * 1.2;
      ref.current.position.y = Math.sin(t * 0.7) * 0.5;
      ref.current.rotation.y = -t + Math.PI / 2;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.25, 16, 8]} />
      <meshStandardMaterial color="#fcd34d" roughness={0.4} metalness={0.2} transparent opacity={0.85} />
    </mesh>
  );
}

function GlowParticles({ count = 20 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 5;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#fca5a5" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} color="#fef3c7" />
      <pointLight position={[-3, 2, 3]} intensity={0.5} color="#f87171" />
      <pointLight position={[3, -1, 2]} intensity={0.3} color="#60a5fa" />
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
        <Heart scale={0.8} />
      </Float>
      <OrbitingHand index={0} />
      <OrbitingHand index={1} />
      <GlowParticles />
    </>
  );
}

interface MercyHeart3DProps {
  className?: string;
}

export function MercyHeart3D({ className }: MercyHeart3DProps) {
  return (
    <div className={`three-container ${className ?? ''}`} style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ overflow: 'visible' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
