import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

// 1. Interactive 3D Wave Mesh Grid (Liquid Blueprint Landscape)
const WaveGrid = () => {
  const meshRef = useRef<THREE.Points>(null);
  const countX = 50;
  const countY = 50;
  const numParticles = countX * countY;

  const [positions, initialY] = useMemo(() => {
    const pos = new Float32Array(numParticles * 3);
    const inY = new Float32Array(numParticles);
    let i = 0;
    for (let x = 0; x < countX; x++) {
      for (let y = 0; y < countY; y++) {
        const u = (x / countX - 0.5) * 30;
        const v = (y / countY - 0.5) * 30;
        pos[i * 3] = u;
        pos[i * 3 + 1] = -4; // Y height base
        pos[i * 3 + 2] = v;
        inY[i] = -4;
        i++;
      }
    }
    return [pos, inY];
  }, [numParticles]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttribute = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttribute.array as Float32Array;

    let i = 0;
    for (let x = 0; x < countX; x++) {
      for (let y = 0; y < countY; y++) {
        const index = i * 3;
        const u = array[index];
        const v = array[index + 2];

        // Wave formula
        const wave1 = Math.sin(u * 0.4 + time * 1.2) * 0.6;
        const wave2 = Math.cos(v * 0.4 + time * 1.5) * 0.6;
        const wave3 = Math.sin((u + v) * 0.2 + time * 0.8) * 0.4;

        array[index + 1] = initialY[i] + wave1 + wave2 + wave3;
        i++;
      }
    }
    posAttribute.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={numParticles}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#38BDF8"
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
};

// 2. Rotating 3D Cinema Film Reel Ring
const FilmReel3D = ({ position, color = "#0284C7" }: { position: [number, number, number]; color?: string }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z += 0.005;
    groupRef.current.rotation.y += 0.003;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Outer ring */}
      <mesh>
        <torusGeometry args={[2, 0.04, 16, 64]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.4} />
      </mesh>
      {/* Inner ring */}
      <mesh>
        <torusGeometry args={[1.2, 0.03, 16, 48]} />
        <meshStandardMaterial color="#EAB308" wireframe transparent opacity={0.3} />
      </mesh>
      {/* Spokes */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <mesh key={i} rotation={[0, 0, (deg * Math.PI) / 180]}>
          <boxGeometry args={[0.03, 2.4, 0.03]} />
          <meshBasicMaterial color={color} transparent opacity={0.25} />
        </mesh>
      ))}
    </group>
  );
};

// 3. 3D Architectural Wireframe Structure
const ArchStructure3D = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main tower wireframe */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 5, 1.5]} />
        <meshBasicMaterial color="#8B1A1A" wireframe transparent opacity={0.25} />
      </mesh>
      {/* Outer cage */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.2, 6, 2.2]} />
        <meshBasicMaterial color="#EAB308" wireframe transparent opacity={0.15} />
      </mesh>
      {/* Top pyramid */}
      <mesh position={[0, 3.2, 0]}>
        <coneGeometry args={[1.2, 1.5, 4]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

// 4. Floating 3D Geometric Polyhedra
const FloatingPolyhedra = () => {
  return (
    <>
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.6}>
        <mesh position={[-5, 2, -1]}>
          <icosahedronGeometry args={[0.8, 1]} />
          <meshStandardMaterial color="#0284C7" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={1} floatIntensity={0.8}>
        <mesh position={[5, -1, 1]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#EAB308" wireframe transparent opacity={0.35} />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.4}>
        <mesh position={[-3, -3, -2]}>
          <dodecahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial color="#8B1A1A" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
    </>
  );
};

// 5. Main 3D Interactive Scene
const Main3DScene = () => {
  const sceneGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!sceneGroupRef.current) return;
    const { x, y } = state.pointer;
    // Interactive camera tilt based on mouse position
    sceneGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      sceneGroupRef.current.rotation.y,
      x * 0.35,
      0.05
    );
    sceneGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      sceneGroupRef.current.rotation.x,
      -y * 0.2,
      0.05
    );
  });

  return (
    <group ref={sceneGroupRef}>
      <WaveGrid />
      <FilmReel3D position={[4, 2, -3]} color="#38BDF8" />
      <FilmReel3D position={[-4.5, -1, -2]} color="#EAB308" />
      <ArchStructure3D position={[-3.5, 1, -4]} />
      <ArchStructure3D position={[3.8, -2, -4]} />
      <FloatingPolyhedra />

      {/* Dynamic Multi-Color Volumetric Lights */}
      <ambientLight intensity={0.4} />
      <pointLight position={[-6, 6, 4]} intensity={1.2} color="#0284C7" distance={20} />
      <pointLight position={[6, -4, 4]} intensity={1.0} color="#EAB308" distance={20} />
      <pointLight position={[0, 4, -4]} intensity={0.8} color="#8B1A1A" distance={18} />
      <pointLight position={[0, -5, 2]} intensity={0.6} color="#10B981" distance={15} />

      <Stars radius={100} depth={50} count={1200} factor={4} saturation={0.5} fade speed={0.5} />
    </group>
  );
};

// Canvas Wrapper
const Full3DBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ background: '#040712' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Main3DScene />
      </Canvas>
      {/* Silk Glow Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(2, 132, 199, 0.15) 0%, rgba(4, 7, 18, 0.7) 70%, rgba(4, 7, 18, 0.95) 100%)',
        }}
      />
    </div>
  );
};

export default Full3DBackground;
