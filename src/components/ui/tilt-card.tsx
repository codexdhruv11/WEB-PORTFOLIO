import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
}

const springConfig = {
  damping: 55,
  stiffness: 250,
  mass: 1.25,
  restDelta: 0.0005,
  restSpeed: 0.0005,
};

const transformConfig = {
  smoothing: 50,
  clamp: true, // Enable clamping to prevent overshooting
};

const scaleSpringConfig = {
  ...springConfig,
  damping: 20,
  stiffness: 300,
};

export function TiltCard({
  children,
  className,
  rotateAmplitude = 7,
  scaleOnHover = 1.02,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position values with smoothing
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations for rotation with balanced stiffness
  const rotateX = useSpring(mouseY, {
    ...springConfig,
    // Same stiffness for consistent movement
    stiffness: springConfig.stiffness,
  });
  
  const rotateY = useSpring(mouseX, {
    ...springConfig,
    // Same stiffness for consistent movement
    stiffness: springConfig.stiffness,
  });

  // Extra smooth scale animation
  const scale = useSpring(1, scaleSpringConfig);

  // Transform mouse position to rotation angles with symmetric interpolation
  const transformedRotateX = useTransform(
    rotateX, 
    [-1, 0, 1], 
    [rotateAmplitude, 0, -rotateAmplitude],
    transformConfig
  );
  const transformedRotateY = useTransform(
    rotateY, 
    [-1, 0, 1], 
    [-rotateAmplitude, 0, rotateAmplitude],
    transformConfig
  );

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || !isHovered) return;

    const rect = ref.current.getBoundingClientRect();
    
    // Calculate center point
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate normalized mouse position relative to center
    const mouseXRel = event.clientX - centerX;
    const mouseYRel = event.clientY - centerY;
    
    // Convert to normalized coordinates (-1 to 1) with proper scaling
    const normalizedX = (mouseXRel / (rect.width / 2));
    const normalizedY = (mouseYRel / (rect.height / 2));
    
    // Apply symmetric smoothing
    const smoothX = Math.min(Math.max(normalizedX, -1), 1);
    const smoothY = Math.min(Math.max(normalizedY, -1), 1);
    
    // Update mouse position with balanced values
    mouseX.set(smoothX);
    mouseY.set(smoothY);
  }

  function handleMouseEnter() {
    setIsHovered(true);
    scale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    scale.set(1);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        rotateX: transformedRotateX,
        rotateY: transformedRotateY,
        scale,
        transformPerspective: 1000,
        transformOrigin: "center center",
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ 
        transform: `translateZ(${isHovered ? '2px' : '0px'})`,
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        {children}
      </div>
    </motion.div>
  );
} 