import React, { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Text, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// 3D Models as simple geometries for demonstration
function HeartModel({ annotations, showAnnotations }: { annotations: any[]; showAnnotations: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  
  return (
    <group ref={meshRef}>
      {/* Main heart body - more anatomical shape */}
      <mesh position={[0, -0.2, 0]}>
        <sphereGeometry args={[0.8, 16, 12]} />
        <meshStandardMaterial 
          color="#dc2626" 
          roughness={0.3} 
          metalness={0.1}
          emissive="#441111"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Left ventricle */}
      <mesh position={[-0.3, -0.5, 0.1]} scale={[1.2, 1.4, 0.8]}>
        <sphereGeometry args={[0.5, 12, 10]} />
        <meshStandardMaterial color="#b91c1c" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Right ventricle */}
      <mesh position={[0.4, -0.4, 0.2]} scale={[0.9, 1.2, 0.7]}>
        <sphereGeometry args={[0.45, 12, 10]} />
        <meshStandardMaterial color="#b91c1c" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Left atrium */}
      <mesh position={[-0.4, 0.4, 0]} scale={[0.8, 0.9, 0.8]}>
        <sphereGeometry args={[0.4, 12, 8]} />
        <meshStandardMaterial color="#ef4444" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Right atrium */}
      <mesh position={[0.4, 0.4, 0]} scale={[0.7, 0.8, 0.8]}>
        <sphereGeometry args={[0.35, 12, 8]} />
        <meshStandardMaterial color="#ef4444" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Aorta */}
      <mesh position={[0, 0.8, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.15, 0.18, 0.8]} />
        <meshStandardMaterial color="#dc2626" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Pulmonary artery */}
      <mesh position={[0.2, 0.7, 0.1]} rotation={[0, 0, -Math.PI / 8]}>
        <cylinderGeometry args={[0.12, 0.15, 0.6]} />
        <meshStandardMaterial color="#dc2626" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Subtle annotations */}
      {showAnnotations && annotations.slice(0, 4).map((annotation, index) => (
        <Html key={index} position={annotation.position} center>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.9, scale: 1 }}
            className="bg-background/80 backdrop-blur-sm border border-border/60 rounded-md p-1.5 text-xs max-w-28 pointer-events-none shadow-lg"
          >
            <div className="font-medium text-foreground text-xs">{annotation.title}</div>
          </motion.div>
        </Html>
      ))}
      
      {/* Minimal hotspots */}
      {showAnnotations && annotations.slice(0, 4).map((annotation, index) => (
        <mesh key={`hotspot-${index}`} position={annotation.position}>
          <sphereGeometry args={[0.04]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function ChemicalBondsModel({ annotations, showAnnotations }: { annotations: any[]; showAnnotations: boolean }) {
  const moleculeRef = useRef<THREE.Group>(null);
  
  return (
    <group ref={moleculeRef}>
      {/* Water molecule (H2O) */}
      <group position={[0, 0, 0]}>
        {/* Oxygen atom */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.3]} />
          <meshStandardMaterial color="#ef4444" roughness={0.2} metalness={0.3} />
        </mesh>
        
        {/* Hydrogen atoms */}
        <mesh position={[-0.6, -0.4, 0]}>
          <sphereGeometry args={[0.15]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[0.6, -0.4, 0]}>
          <sphereGeometry args={[0.15]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.3} metalness={0.2} />
        </mesh>
        
        {/* Covalent bonds */}
        <mesh position={[-0.3, -0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.03, 0.03, 0.5]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
        <mesh position={[0.3, -0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <cylinderGeometry args={[0.03, 0.03, 0.5]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
      </group>
      
      {/* Methane molecule (CH4) */}
      <group position={[2.5, 0, 0]}>
        {/* Carbon atom */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.25]} />
          <meshStandardMaterial color="#374151" roughness={0.2} metalness={0.3} />
        </mesh>
        
        {/* Hydrogen atoms in tetrahedral arrangement */}
        {[
          [0.5, 0.5, 0.5],
          [-0.5, -0.5, 0.5],
          [-0.5, 0.5, -0.5],
          [0.5, -0.5, -0.5]
        ].map((pos, index) => (
          <group key={index}>
            <mesh position={pos as [number, number, number]}>
              <sphereGeometry args={[0.12]} />
              <meshStandardMaterial color="#f1f5f9" roughness={0.3} metalness={0.2} />
            </mesh>
            <mesh position={[pos[0] * 0.5, pos[1] * 0.5, pos[2] * 0.5]} 
                  rotation={[Math.atan2(pos[1], pos[0]), 0, Math.atan2(pos[2], Math.sqrt(pos[0] * pos[0] + pos[1] * pos[1]))]}>
              <cylinderGeometry args={[0.025, 0.025, 0.4]} />
              <meshStandardMaterial color="#10b981" />
            </mesh>
          </group>
        ))}
      </group>
      
      {/* Annotations */}
      {showAnnotations && annotations.map((annotation, index) => (
        <Html key={index} position={annotation.position} center>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background/90 backdrop-blur-md border border-border rounded-lg p-2 text-xs max-w-32"
          >
            <div className="font-semibold text-foreground">{annotation.title}</div>
            <div className="text-muted-foreground">{annotation.description}</div>
          </motion.div>
        </Html>
      ))}
    </group>
  );
}

function AncientRomeModel({ annotations, showAnnotations }: { annotations: any[]; showAnnotations: boolean }) {
  const romeRef = useRef<THREE.Group>(null);
  
  return (
    <group ref={romeRef}>
      {/* Colosseum base */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[2, 2.2, 0.3, 32]} />
        <meshStandardMaterial color="#d4a574" roughness={0.8} metalness={0.1} />
      </mesh>
      
      {/* Colosseum walls */}
      {Array.from({ length: 3 }).map((_, level) => (
        <group key={level}>
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            const radius = 1.8 - level * 0.1;
            const height = 0.4;
            const y = -0.3 + level * height;
            
            return (
              <group key={i}>
                {/* Arches */}
                <mesh 
                  position={[
                    Math.cos(angle) * radius,
                    y,
                    Math.sin(angle) * radius
                  ]}
                  rotation={[0, angle, 0]}
                >
                  <boxGeometry args={[0.3, height, 0.15]} />
                  <meshStandardMaterial color="#c4a574" roughness={0.9} metalness={0.1} />
                </mesh>
              </group>
            );
          })}
        </group>
      ))}
      
      {/* Roman columns */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 2.8;
        
        return (
          <group key={i}>
            {/* Column base */}
            <mesh 
              position={[
                Math.cos(angle) * radius,
                -0.4,
                Math.sin(angle) * radius
              ]}
            >
              <cylinderGeometry args={[0.15, 0.18, 0.1]} />
              <meshStandardMaterial color="#f3e8d0" roughness={0.7} metalness={0.1} />
            </mesh>
            
            {/* Column shaft */}
            <mesh 
              position={[
                Math.cos(angle) * radius,
                0.2,
                Math.sin(angle) * radius
              ]}
            >
              <cylinderGeometry args={[0.12, 0.15, 1.2]} />
              <meshStandardMaterial color="#e8dcc0" roughness={0.8} metalness={0.1} />
            </mesh>
            
            {/* Column capital */}
            <mesh 
              position={[
                Math.cos(angle) * radius,
                0.9,
                Math.sin(angle) * radius
              ]}
            >
              <cylinderGeometry args={[0.18, 0.12, 0.15]} />
              <meshStandardMaterial color="#f3e8d0" roughness={0.7} metalness={0.1} />
            </mesh>
          </group>
        );
      })}
      
      {/* Annotations */}
      {showAnnotations && annotations.map((annotation, index) => (
        <Html key={index} position={annotation.position} center>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background/90 backdrop-blur-md border border-border rounded-lg p-2 text-xs max-w-32"
          >
            <div className="font-semibold text-foreground">{annotation.title}</div>
            <div className="text-muted-foreground">{annotation.description}</div>
          </motion.div>
        </Html>
      ))}
    </group>
  );
}

function MathFunctionsModel({ annotations, showAnnotations }: { annotations: any[]; showAnnotations: boolean }) {
  const mathRef = useRef<THREE.Group>(null);
  
  // Create sine wave surface
  const createSineWave = () => {
    const geometry = new THREE.PlaneGeometry(4, 4, 32, 32);
    const vertices = geometry.attributes.position.array;
    
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const z = vertices[i + 2];
      vertices[i + 1] = Math.sin(x * 2) * Math.cos(z * 2) * 0.5;
    }
    
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
    return geometry;
  };
  
  return (
    <group ref={mathRef}>
      {/* Sine wave surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <primitive object={createSineWave()} />
        <meshStandardMaterial 
          color="#3b82f6" 
          roughness={0.3} 
          metalness={0.7}
          transparent
          opacity={0.8}
          wireframe={false}
        />
      </mesh>
      
      {/* Coordinate axes */}
      {/* X-axis */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 4]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
      <mesh position={[2, 0, 0]}>
        <coneGeometry args={[0.05, 0.2]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
      
      {/* Y-axis */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 4]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>
      <mesh position={[0, 2, 0]}>
        <coneGeometry args={[0.05, 0.2]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>
      
      {/* Z-axis */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 4]} />
        <meshBasicMaterial color="#8b5cf6" />
      </mesh>
      <mesh position={[0, 0, 2]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.05, 0.2]} />
        <meshBasicMaterial color="#8b5cf6" />
      </mesh>
      
      {/* Parametric curve */}
      {Array.from({ length: 100 }).map((_, i) => {
        const t = (i / 100) * Math.PI * 4;
        const x = Math.cos(t) * (1 + t * 0.1);
        const y = Math.sin(t) * 0.5;
        const z = t * 0.1;
        
        return (
          <mesh key={i} position={[x, y + 1, z - 1]}>
            <sphereGeometry args={[0.03]} />
            <meshBasicMaterial color="#f59e0b" />
          </mesh>
        );
      })}
      
      {/* Annotations */}
      {showAnnotations && annotations.map((annotation, index) => (
        <Html key={index} position={annotation.position} center>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background/90 backdrop-blur-md border border-border rounded-lg p-2 text-xs max-w-32"
          >
            <div className="font-semibold text-foreground">{annotation.title}</div>
            <div className="text-muted-foreground">{annotation.description}</div>
          </motion.div>
        </Html>
      ))}
    </group>
  );
}

function DNAModel({ annotations, showAnnotations }: { annotations: any[]; showAnnotations: boolean }) {
  const helixRef = useRef<THREE.Group>(null);
  
  return (
    <group ref={helixRef}>
      {/* DNA double helix */}
      {Array.from({ length: 20 }).map((_, i) => {
        const y = (i - 10) * 0.2;
        const angle1 = i * 0.5;
        const angle2 = angle1 + Math.PI;
        
        return (
          <group key={i}>
            {/* First strand */}
            <mesh position={[Math.cos(angle1) * 0.8, y, Math.sin(angle1) * 0.8]}>
              <sphereGeometry args={[0.05]} />
              <meshStandardMaterial color="#3b82f6" />
            </mesh>
            
            {/* Second strand */}
            <mesh position={[Math.cos(angle2) * 0.8, y, Math.sin(angle2) * 0.8]}>
              <sphereGeometry args={[0.05]} />
              <meshStandardMaterial color="#ef4444" />
            </mesh>
            
            {/* Base pairs */}
            {i % 2 === 0 && (
              <mesh position={[0, y, 0]} rotation={[0, angle1, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 1.6]} />
                <meshStandardMaterial color="#10b981" />
              </mesh>
            )}
          </group>
        );
      })}
      
      {/* Annotations */}
      {showAnnotations && annotations.map((annotation, index) => (
        <Html key={index} position={annotation.position} center>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background/90 backdrop-blur-md border border-border rounded-lg p-2 text-xs max-w-32"
          >
            <div className="font-semibold text-foreground">{annotation.title}</div>
            <div className="text-muted-foreground">{annotation.description}</div>
          </motion.div>
        </Html>
      ))}
    </group>
  );
}

function SolarSystemModel({ annotations, showAnnotations }: { annotations: any[]; showAnnotations: boolean }) {
  const systemRef = useRef<THREE.Group>(null);
  
  const planets = [
    { size: 0.1, distance: 1, color: '#fbbf24', speed: 0.02 },
    { size: 0.15, distance: 1.5, color: '#f97316', speed: 0.015 },
    { size: 0.2, distance: 2, color: '#3b82f6', speed: 0.01 },
    { size: 0.12, distance: 2.5, color: '#ef4444', speed: 0.008 },
  ];
  
  return (
    <group ref={systemRef}>
      {/* Sun */}
      <mesh>
        <sphereGeometry args={[0.3]} />
        <meshBasicMaterial color="#fbbf24" />
      </mesh>
      
      {/* Planets */}
      {planets.map((planet, index) => (
        <group key={index}>
          <mesh position={[planet.distance, 0, 0]}>
            <sphereGeometry args={[planet.size]} />
            <meshStandardMaterial color={planet.color} />
          </mesh>
        </group>
      ))}
      
      {/* Annotations */}
      {showAnnotations && annotations.map((annotation, index) => (
        <Html key={index} position={annotation.position} center>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background/90 backdrop-blur-md border border-border rounded-lg p-2 text-xs max-w-32"
          >
            <div className="font-semibold text-foreground">{annotation.title}</div>
            <div className="text-muted-foreground">{annotation.description}</div>
          </motion.div>
        </Html>
      ))}
    </group>
  );
}

interface ModelViewerProps {
  modelType: string;
  annotations?: any[];
  showAnnotations?: boolean;
  autoRotate?: boolean;
  showGrid?: boolean;
  className?: string;
}

export default function ModelViewer({
  modelType,
  annotations = [],
  showAnnotations = false,
  autoRotate = true,
  showGrid = false,
  className = ''
}: ModelViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive detection safely
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const renderModel = () => {
    switch (modelType) {
      case 'heart':
        return <HeartModel annotations={annotations} showAnnotations={showAnnotations} />;
      case 'dna':
        return <DNAModel annotations={annotations} showAnnotations={showAnnotations} />;
      case 'solar-system':
        return <SolarSystemModel annotations={annotations} showAnnotations={showAnnotations} />;
      case 'chemical-bonds':
        return <ChemicalBondsModel annotations={annotations} showAnnotations={showAnnotations} />;
      case 'ancient-rome':
        return <AncientRomeModel annotations={annotations} showAnnotations={showAnnotations} />;
      case 'math-functions':
        return <MathFunctionsModel annotations={annotations} showAnnotations={showAnnotations} />;
      default:
        return <HeartModel annotations={annotations} showAnnotations={showAnnotations} />;
    }
  };

  return (
    <div className={`relative w-full h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] bg-gradient-to-br from-background to-muted ${className}`}>
      <Canvas
        camera={{ position: [3, 2, 3], fov: isMobile ? 60 : 50 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={() => setIsLoading(false)}
        className="touch-none"
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />
          
          {/* Environment */}
          <Environment preset="studio" />
          
          {/* Grid */}
          {showGrid && (
            <gridHelper args={[10, 10, '#666666', '#444444']} />
          )}
          
          {/* Model */}
          {renderModel()}
          
          {/* Ground */}
          <ContactShadows 
            position={[0, -1.5, 0]} 
            opacity={0.3} 
            scale={10} 
            blur={1.5} 
            far={1.5} 
          />
          
          {/* Controls */}
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
            minDistance={isMobile ? 2 : 1}
            maxDistance={isMobile ? 15 : 10}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            panSpeed={isMobile ? 1 : 2}
            rotateSpeed={isMobile ? 0.5 : 1}
            zoomSpeed={isMobile ? 0.5 : 1}
          />
        </Suspense>
      </Canvas>
      
      {/* Loading indicator */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <div className="text-center p-4">
              <div className="animate-spin w-6 h-6 sm:w-8 sm:h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-xs sm:text-sm text-muted-foreground">Loading 3D model...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}