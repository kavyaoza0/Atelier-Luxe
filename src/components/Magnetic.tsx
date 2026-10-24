import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // Factor between 0.1 and 0.5 (default 0.3)
  maxDisplacement?: number; // Max pixels to displace (default 8)
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  className = '',
  strength = 0.32,
  maxDisplacement = 8,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth, refined organic spring physics
  const springConfig = { stiffness: 220, damping: 18, mass: 0.6 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    // Clamp displacement to prevent jarring detachment
    const clampedX = Math.max(-maxDisplacement, Math.min(maxDisplacement, deltaX));
    const clampedY = Math.max(-maxDisplacement, Math.min(maxDisplacement, deltaY));

    x.set(clampedX);
    y.set(clampedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};
