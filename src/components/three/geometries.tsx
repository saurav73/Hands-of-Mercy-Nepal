import { useMemo } from 'react';
import * as THREE from 'three';

export function BookGeometry({ color = '#3b82f6', width = 0.7, height = 0.9, thickness = 0.12, position, rotation, scale }: { color?: string; width?: number; height?: number; thickness?: number; position?: [number, number, number]; rotation?: [number, number, number]; scale?: number | [number, number, number] }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Front cover */}
      <mesh position={[0, 0, thickness / 2]}>
        <boxGeometry args={[width, height, 0.01]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Back cover */}
      <mesh position={[0, 0, -thickness / 2]}>
        <boxGeometry args={[width, height, 0.01]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Spine */}
      <mesh position={[-width / 2, 0, 0]}>
        <boxGeometry args={[0.02, height, thickness]} />
        <meshStandardMaterial color={new THREE.Color(color).multiplyScalar(0.7)} roughness={0.4} />
      </mesh>
      {/* Pages (stack of white layers) */}
      <mesh position={[0.02, 0, 0]}>
        <boxGeometry args={[width - 0.06, height - 0.04, thickness - 0.03]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.9} />
      </mesh>
      {/* Top page edge lines */}
      {[0.02, 0.04, 0.06].map((_y, i) => (
        <mesh key={i} position={[0.02, height / 2 - 0.02 - i * 0.015, 0]}>
          <boxGeometry args={[width - 0.06, 0.003, thickness - 0.03]} />
          <meshStandardMaterial color="#e8e0d0" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

export function PencilGeometry({ position = [0, 0, 0] as [number, number, number], rotation = [0, 0, 0] as [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Body */}
      <mesh>
        <cylinderGeometry args={[0.025, 0.025, 0.9, 8]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.5} />
      </mesh>
      {/* Tip (cone) */}
      <mesh position={[0, 0.5, 0]}>
        <coneGeometry args={[0.025, 0.1, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} />
      </mesh>
      {/* Tip point */}
      <mesh position={[0, 0.56, 0]}>
        <coneGeometry args={[0.008, 0.04, 6]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} />
      </mesh>
      {/* Eraser */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.028, 0.028, 0.08, 8]} />
        <meshStandardMaterial color="#ec4899" roughness={0.6} />
      </mesh>
      {/* Metal band */}
      <mesh position={[0, -0.45, 0]}>
        <cylinderGeometry args={[0.027, 0.027, 0.03, 8]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
}

export function PersonGeometry({ position = [0, 0, 0] as [number, number, number], color = '#3b82f6', skinColor = '#f5d0b0' }: { position?: [number, number, number]; color?: string; skinColor?: string }) {
  return (
    <group position={position}>
      {/* Head */}
      <mesh position={[0, 0.85, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={skinColor} roughness={0.5} />
      </mesh>
      {/* Hair */}
      <mesh position={[0, 0.95, -0.02]}>
        <sphereGeometry args={[0.13, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} />
      </mesh>
      {/* Body/Torso */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.15, 0.5, 8]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
      </mesh>
      {/* Left arm */}
      <mesh position={[-0.2, 0.55, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.035, 0.03, 0.35, 8]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      {/* Right arm */}
      <mesh position={[0.2, 0.55, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.035, 0.03, 0.35, 8]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      {/* Left hand */}
      <mesh position={[-0.3, 0.38, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color={skinColor} roughness={0.5} />
      </mesh>
      {/* Right hand */}
      <mesh position={[0.3, 0.38, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color={skinColor} roughness={0.5} />
      </mesh>
      {/* Left leg */}
      <mesh position={[-0.06, 0.08, 0]}>
        <cylinderGeometry args={[0.04, 0.035, 0.35, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} />
      </mesh>
      {/* Right leg */}
      <mesh position={[0.06, 0.08, 0]}>
        <cylinderGeometry args={[0.04, 0.035, 0.35, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} />
      </mesh>
      {/* Left shoe */}
      <mesh position={[-0.06, -0.1, 0.02]}>
        <boxGeometry args={[0.06, 0.04, 0.1]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} />
      </mesh>
      {/* Right shoe */}
      <mesh position={[0.06, -0.1, 0.02]}>
        <boxGeometry args={[0.06, 0.04, 0.1]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} />
      </mesh>
    </group>
  );
}

export function HandGeometry({ position = [0, 0, 0] as [number, number, number], rotation = [0, 0, 0] as [number, number, number], color = '#fcd34d' }: { position?: [number, number, number]; rotation?: [number, number, number]; color?: string }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Palm */}
      <mesh castShadow>
        <boxGeometry args={[0.25, 0.12, 0.1]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Thumb */}
      <mesh position={[-0.15, 0.02, 0]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.02, 0.018, 0.1, 6]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      {/* Thumb tip */}
      <mesh position={[-0.2, 0.06, 0]} rotation={[0, 0, 0.5]}>
        <sphereGeometry args={[0.02, 6, 6]} />
        <meshStandardMaterial color={new THREE.Color(color).multiplyScalar(0.9)} roughness={0.4} />
      </mesh>
      {/* Fingers */}
      {[-0.06, -0.02, 0.02, 0.06].map((x, i) => (
        <group key={i}>
          {/* Finger base */}
          <mesh position={[x, 0.1, 0]}>
            <cylinderGeometry args={[0.016, 0.014, 0.08, 6]} />
            <meshStandardMaterial color={color} roughness={0.4} />
          </mesh>
          {/* Finger tip */}
          <mesh position={[x, 0.15, 0]}>
            <sphereGeometry args={[0.016, 6, 6]} />
            <meshStandardMaterial color={new THREE.Color(color).multiplyScalar(0.9)} roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function DeskGeometry({ position = [0, 0, 0] as [number, number, number] }: { position?: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Desktop */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 0.04, 0.45]} />
        <meshStandardMaterial color="#c4a076" roughness={0.6} />
      </mesh>
      {/* Front edge trim */}
      <mesh position={[0, 0.38, 0.22]}>
        <boxGeometry args={[0.7, 0.02, 0.01]} />
        <meshStandardMaterial color="#a08060" roughness={0.5} />
      </mesh>
      {/* Legs */}
      {[[-0.3, 0.2, -0.18], [0.3, 0.2, -0.18], [-0.3, 0.2, 0.18], [0.3, 0.2, 0.18]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.018, 0.018, 0.4, 8]} />
          <meshStandardMaterial color="#8b7355" roughness={0.5} />
        </mesh>
      ))}
      {/* Crossbar */}
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.56, 0.02, 0.02]} />
        <meshStandardMaterial color="#8b7355" roughness={0.5} />
      </mesh>
    </group>
  );
}

export function ChairGeometry({ position = [0, 0, 0] as [number, number, number] }: { position?: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Seat */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.03, 0.3]} />
        <meshStandardMaterial color="#6366f1" roughness={0.5} />
      </mesh>
      {/* Back */}
      <mesh position={[0, 0.42, -0.14]} castShadow>
        <boxGeometry args={[0.3, 0.3, 0.025]} />
        <meshStandardMaterial color="#6366f1" roughness={0.5} />
      </mesh>
      {/* Front legs */}
      {[[-0.12, 0.12, 0.12], [0.12, 0.12, 0.12]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.25, 6]} />
          <meshStandardMaterial color="#4f46e5" roughness={0.5} />
        </mesh>
      ))}
      {/* Back legs */}
      {[[-0.12, 0.18, -0.12], [0.12, 0.18, -0.12]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.36, 6]} />
          <meshStandardMaterial color="#4f46e5" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

export function CoinGeometry({ position = [0, 0, 0] as [number, number, number], color = '#fbbf24' }: { position?: [number, number, number]; color?: string }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.015, 24]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Edge ring */}
      <mesh>
        <torusGeometry args={[0.08, 0.005, 8, 24]} />
        <meshStandardMaterial color={new THREE.Color(color).multiplyScalar(0.8)} roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Inner circle detail */}
      <mesh position={[0, 0.008, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.04, 0.003, 6, 16]} />
        <meshStandardMaterial color={new THREE.Color(color).multiplyScalar(0.9)} roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}

export function HeartShape({ position = [0, 0, 0] as [number, number, number], scale = 1, color = '#ef4444' }: { position?: [number, number, number]; scale?: number; color?: string }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.5);
    shape.bezierCurveTo(0, 0.5, -0.5, 1.3, -1, 1.3);
    shape.bezierCurveTo(-1.7, 1.3, -1.7, 0.5, -1.7, 0.5);
    shape.bezierCurveTo(-1.7, 0, -1, -0.5, 0, -1);
    shape.bezierCurveTo(1, -0.5, 1.7, 0, 1.7, 0.5);
    shape.bezierCurveTo(1.7, 0.5, 1.7, 1.3, 1, 1.3);
    shape.bezierCurveTo(0.5, 1.3, 0, 0.5, 0, 0.5);
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.4, bevelEnabled: true, bevelSegments: 8,
      steps: 2, bevelSize: 0.1, bevelThickness: 0.1,
    });
  }, []);
  return (
    <mesh geometry={geometry} position={position} scale={scale} rotation={[Math.PI, 0, 0]} castShadow>
      <meshStandardMaterial color={color} roughness={0.2} metalness={0.3} emissive={color} emissiveIntensity={0.2} />
    </mesh>
  );
}

export function StarShape({ position = [0, 0, 0] as [number, number, number], scale = 1, color = '#f59e0b' }: { position?: [number, number, number]; scale?: number; color?: string }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const outerR = 0.15, innerR = 0.06, points = 5;
    for (let i = 0; i < points * 2; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const a = (i * Math.PI) / points - Math.PI / 2;
      if (i === 0) shape.moveTo(Math.cos(a) * r, Math.sin(a) * r);
      else shape.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, { depth: 0.03, bevelEnabled: true, bevelSegments: 2, bevelSize: 0.01, bevelThickness: 0.01 });
  }, []);
  return (
    <mesh geometry={geometry} position={position} scale={scale}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.3} metalness={0.4} />
    </mesh>
  );
}

export function DonationBoxGeometry({ position = [0, 0, 0] as [number, number, number] }: { position?: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Main box */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.4, 0.5]} />
        <meshStandardMaterial color="#ef4444" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Top lid */}
      <mesh position={[0, 0.21, 0]} castShadow>
        <boxGeometry args={[0.52, 0.02, 0.52]} />
        <meshStandardMaterial color="#dc2626" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Coin slot */}
      <mesh position={[0, 0.225, 0]}>
        <boxGeometry args={[0.15, 0.008, 0.03]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* Heart on front */}
      <HeartShape position={[0, 0, 0.26]} scale={0.12} color="white" />
      {/* Gold trim */}
      <mesh position={[0, -0.18, 0]}>
        <boxGeometry args={[0.52, 0.02, 0.52]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
}

export function GlobeGeometry({ position = [0, 0, 0] as [number, number, number], scale = 1 }: { position?: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      {/* Ocean sphere */}
      <mesh castShadow>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial color="#1e3a5f" roughness={0.4} metalness={0.3} transparent opacity={0.85} />
      </mesh>
      {/* Land masses (scattered bumps) */}
      {[
        { pos: [0.6, 0.5, 0.6] as [number, number, number], scale: 0.3 },
        { pos: [-0.3, 0.7, 0.6] as [number, number, number], scale: 0.25 },
        { pos: [0.2, -0.3, 0.8] as [number, number, number], scale: 0.2 },
        { pos: [-0.5, -0.2, 0.7] as [number, number, number], scale: 0.22 },
        { pos: [0.8, 0.1, 0.3] as [number, number, number], scale: 0.18 },
      ].map((land, i) => (
        <mesh key={i} position={land.pos}>
          <sphereGeometry args={[land.scale, 12, 12]} />
          <meshStandardMaterial color="#2d5a3d" roughness={0.6} />
        </mesh>
      ))}
      {/* Wireframe overlay */}
      <mesh>
        <sphereGeometry args={[1.005, 32, 32]} />
        <meshStandardMaterial color="#60a5fa" wireframe transparent opacity={0.15} />
      </mesh>
      {/* Latitude lines */}
      {[-0.5, -0.25, 0, 0.25, 0.5].map((y, i) => (
        <mesh key={`lat-${i}`} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[Math.sqrt(Math.max(0, 1 - y * y)), 0.006, 8, 64]} />
          <meshStandardMaterial color="#93c5fd" transparent opacity={0.2} />
        </mesh>
      ))}
      {/* Longitude lines */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh key={`lng-${i}`} rotation={[0, (i * Math.PI) / 6, 0]}>
          <torusGeometry args={[1, 0.006, 8, 64]} />
          <meshStandardMaterial color="#93c5fd" transparent opacity={0.15} />
        </mesh>
      ))}
      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[1.15, 32, 32]} />
        <meshStandardMaterial color="#60a5fa" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

export function ChalkboardGeometry({ position = [0, 0, 0] as [number, number, number] }: { position?: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Board */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.7, 0.04]} />
        <meshStandardMaterial color="#1a472a" roughness={0.8} />
      </mesh>
      {/* Frame */}
      {[
        [0, 0.37, 0.02, 1.24, 0.04, 0.06],
        [0, -0.37, 0.02, 1.24, 0.04, 0.06],
        [-0.62, 0, 0.02, 0.04, 0.74, 0.06],
        [0.62, 0, 0.02, 0.04, 0.74, 0.06],
      ].map((f, i) => (
        <mesh key={i} position={[f[0], f[1], f[2]] as [number, number, number]}>
          <boxGeometry args={[f[3], f[4], f[5]] as [number, number, number]} />
          <meshStandardMaterial color="#8b7355" roughness={0.5} />
        </mesh>
      ))}
      {/* Chalk tray */}
      <mesh position={[0, -0.42, 0.06]}>
        <boxGeometry args={[0.8, 0.02, 0.08]} />
        <meshStandardMaterial color="#8b7355" roughness={0.5} />
      </mesh>
      {/* Chalk pieces */}
      <mesh position={[-0.2, -0.4, 0.08]} rotation={[0, 0, 0.1]}>
        <cylinderGeometry args={[0.008, 0.008, 0.06, 6]} />
        <meshStandardMaterial color="white" roughness={0.9} />
      </mesh>
      <mesh position={[0.1, -0.4, 0.08]} rotation={[0, 0, -0.15]}>
        <cylinderGeometry args={[0.008, 0.008, 0.05, 6]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.9} />
      </mesh>
    </group>
  );
}

export function GroundPlane({ color = '#f0f0f0', size = 10 }: { color?: string; size?: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, 0]} receiveShadow>
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial color={color} roughness={0.8} />
    </mesh>
  );
}

export function SpeechBubbleGeometry({ position = [0, 0, 0] as [number, number, number], scale = 1 }: { position?: [number, number, number]; scale?: number }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const w = 0.5, h = 0.35, r = 0.12;
    shape.moveTo(-w + r, -h);
    shape.lineTo(w - r, -h);
    shape.quadraticCurveTo(w, -h, w, -h + r);
    shape.lineTo(w, h - r);
    shape.quadraticCurveTo(w, h, w - r, h);
    shape.lineTo(-w + r, h);
    shape.quadraticCurveTo(-w, h, -w, h - r);
    shape.lineTo(-w, -h + r);
    shape.quadraticCurveTo(-w, -h, -w + r, -h);
    // Tail
    shape.lineTo(-0.1, -h);
    shape.lineTo(-0.2, -h - 0.15);
    shape.lineTo(0.05, -h);
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, { depth: 0.05, bevelEnabled: true, bevelSegments: 3, bevelSize: 0.02, bevelThickness: 0.02 });
  }, []);
  return (
    <mesh geometry={geometry} position={position} scale={scale}>
      <meshStandardMaterial color="white" roughness={0.3} transparent opacity={0.95} />
    </mesh>
  );
}
