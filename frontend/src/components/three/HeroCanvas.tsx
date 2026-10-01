import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Wireframe architectural building block
const BuildingBlock = ({
  position,
  size,
  rotation = [0, 0, 0],
  speed = 0.002,
  opacity = 0.15,
}: {
  position: [number, number, number];
  size: [number, number, number];
  rotation?: [number, number, number];
  speed?: number;
  opacity?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += speed;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <boxGeometry args={size} />
      <meshBasicMaterial
        color="#8B1A1A"
        wireframe
        transparent
        opacity={opacity}
      />
    </mesh>
  );
};

// Floating geometric lines (like architectural blueprints)
const ArchLines = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.04;
  });

  const lines = useMemo(() => {
    const arr = [];
    // Create architectural cross-lines
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const r = 4 + Math.random() * 2;
      arr.push({
        position: [Math.cos(angle) * r, (Math.random() - 0.5) * 4, Math.sin(angle) * r] as [number, number, number],
        size: [0.015, 0.015, 1.5 + Math.random() * 2] as [number, number, number],
        rotation: [0, angle, Math.PI / 2 * Math.random()] as [number, number, number],
      });
    }
    return arr;
  }, []);

  return (
    <group ref={groupRef}>
      {lines.map((line, i) => (
        <mesh key={i} position={line.position} rotation={line.rotation}>
          <boxGeometry args={line.size} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.06} />
        </mesh>
      ))}
    </group>
  );
};

// Particle system
const Particles = () => {
  const meshRef = useRef<THREE.Points>(null);
  const count = 600;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
};

const Scene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Mouse movement parallax interpolation
    const { x, y } = state.pointer;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.25 + Math.sin(state.clock.elapsedTime * 0.15) * 0.05, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.15, 0.05);
  });

  return (
    <group ref={groupRef}>
      {/* Main tall building wireframes */}
      <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.3}>
        <BuildingBlock position={[-3, 1, -2]} size={[1.2, 4, 1.2]} speed={0.001} opacity={0.22} />
      </Float>
      <Float speed={0.6} rotationIntensity={0.05} floatIntensity={0.2}>
        <BuildingBlock position={[2.5, -0.5, -3]} size={[1, 5.5, 1]} speed={0.0015} opacity={0.18} />
      </Float>
      <Float speed={1.0} rotationIntensity={0.08} floatIntensity={0.4}>
        <BuildingBlock position={[-1, -1, 1]} size={[0.8, 3, 0.8]} speed={0.002} opacity={0.15} />
      </Float>

      {/* Medium blocks with multi-color wireframe accents */}
      <BuildingBlock position={[4, 0.5, 0]} size={[0.8, 2.5, 0.8]} speed={0.003} opacity={0.12} />
      <BuildingBlock position={[-4.5, -0.5, -1]} size={[1, 2, 1]} speed={0.002} opacity={0.1} />
      <BuildingBlock position={[0.5, 1.5, -4]} size={[1.5, 3.5, 1.5]} speed={0.001} opacity={0.16} />

      {/* Small accent floating cubes */}
      <Float speed={2} floatIntensity={0.6}>
        <BuildingBlock position={[3.5, 2, 2]} size={[0.4, 0.4, 0.4]} speed={0.008} opacity={0.3} />
      </Float>
      <Float speed={1.5} floatIntensity={0.5}>
        <BuildingBlock position={[-2.5, 3, 0.5]} size={[0.3, 0.3, 0.3]} speed={0.006} opacity={0.25} />
      </Float>

      <ArchLines />
      <Particles />

      {/* Dynamic Multi-Color Lights (Maroon, Gold, Electric Blue, Emerald Green) */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#8B1A1A" />
      <pointLight position={[-4, 4, 3]} intensity={0.8} color="#EAB308" distance={15} />
      <pointLight position={[4, -3, -2]} intensity={0.7} color="#0284C7" distance={15} />
      <pointLight position={[0, 3, -4]} intensity={0.5} color="#10B981" distance={12} />
    </group>
  );
};

const HeroCanvas = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Scene />
      <Stars
        radius={80}
        depth={40}
        count={1000}
        factor={3}
        saturation={0.5}
        fade
        speed={0.4}
      />
    </Canvas>
  );
};

export default HeroCanvas;
