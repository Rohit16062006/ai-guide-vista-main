import React, { useEffect, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Text } from '@react-three/drei';

// 3D AI Teacher Component using React Three Fiber
function TeacherModel() {
  return <group>
      {/* Head */}
      <Sphere position={[0, 1.5, 0]} scale={0.5}>
        <meshStandardMaterial color="#4A90E2" />
      </Sphere>
      
      {/* Body */}
      <Box position={[0, 0.5, 0]} scale={[0.6, 1, 0.4]}>
        <meshStandardMaterial color="#357ABD" />
      </Box>
      
      {/* Arms */}
      <Box position={[-0.5, 0.5, 0]} scale={[0.2, 0.6, 0.2]}>
        <meshStandardMaterial color="#357ABD" />
      </Box>
      <Box position={[0.5, 0.5, 0]} scale={[0.2, 0.6, 0.2]}>
        <meshStandardMaterial color="#357ABD" />
      </Box>
    </group>;
}
function AITeacher3D() {
  return <div className="relative w-full h-full overflow-hidden">
      <Canvas camera={{
      position: [0, 0, 3],
      fov: 50
    }} gl={{
      preserveDrawingBuffer: true,
      antialias: true,
      alpha: false
    }} onCreated={({
      gl
    }) => {
      gl.setClearColor('#f0f9ff', 1);
    }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 2, 2]} intensity={0.8} />
          
          <TeacherModel />
          
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} enableDamping dampingFactor={0.05} />
        </Suspense>
      </Canvas>
    </div>;
}

// Chat bubble component
function ChatBubble({
  message,
  isVisible
}: {
  message: string;
  isVisible: boolean;
}) {
  return <AnimatePresence>
      {isVisible && <motion.div initial={{
      opacity: 0,
      scale: 0.8,
      y: 20
    }} animate={{
      opacity: 1,
      scale: 1,
      y: 0
    }} exit={{
      opacity: 0,
      scale: 0.8,
      y: 20
    }} className="absolute top-4 left-1/2 transform -translate-x-1/2 glass-card px-4 py-2 max-w-xs z-10">
          <p className="text-sm text-glass-foreground font-medium">{message}</p>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-glass-border/50"></div>
          </div>
        </motion.div>}
    </AnimatePresence>;
}

// Voice input button (mock)
function VoiceMicButton() {
  const [isGlowing, setIsGlowing] = useState(false);
  return <motion.button whileHover={{
    scale: 1.05
  }} whileTap={{
    scale: 0.95
  }} onClick={() => setIsGlowing(!isGlowing)} className={`neuro-button w-12 h-12 rounded-full flex items-center justify-center ${isGlowing ? 'glow-primary pulse-glow' : ''} transition-all duration-300`}>
      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    </motion.button>;
}

// Main AI Teacher component
interface AITeacherProps {
  size?: 'small' | 'medium' | 'large';
  position?: 'fixed' | 'relative';
  message?: string;
  showMessage?: boolean;
  isWaving?: boolean;
  isPointing?: boolean;
  isClapping?: boolean;
  showMicButton?: boolean;
  className?: string;
}
export default function AITeacher({
  size = 'medium',
  position = 'fixed',
  message = "Hello! I'm here to help you learn!",
  showMessage = false,
  isWaving = false,
  isPointing = false,
  isClapping = false,
  showMicButton = true,
  className = ''
}: AITeacherProps) {
  const [currentMessage, setCurrentMessage] = useState(message);
  const [showBubble, setShowBubble] = useState(showMessage);
  const sizeClasses = {
    small: 'w-32 h-32',
    medium: 'w-48 h-48',
    large: 'w-64 h-64'
  };
  const positionClasses = position === 'fixed' ? 'fixed bottom-8 right-8 z-50' : 'relative';
  useEffect(() => {
    setCurrentMessage(message);
    setShowBubble(showMessage);
  }, [message, showMessage]);
  const handleTeacherClick = () => {
    const messages = ["Welcome back! Ready to learn?", "Great progress today!", "Let's explore something new!", "You're doing amazing!", "Keep up the excellent work!"];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setCurrentMessage(randomMessage);
    setShowBubble(true);
    setTimeout(() => {
      setShowBubble(false);
    }, 3000);
  };
  return <div className={`${positionClasses} ${sizeClasses[size]} ${className}`}>
      
    </div>;
}