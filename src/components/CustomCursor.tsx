import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useCursor } from '../context/CursorContext';

export const CustomCursor: React.FC = () => {
  const { cursorType, cursorText } = useCursor();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isInsideWindow, setIsInsideWindow] = useState(false);

  // Mouse coordinate values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs with immediate responsiveness
  const springX = useSpring(mouseX, { damping: 26, stiffness: 350, mass: 0.4 });
  const springY = useSpring(mouseY, { damping: 26, stiffness: 350, mass: 0.4 });

  useEffect(() => {
    // Only enable on pointer: fine devices (desktop with mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsEnabled(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsEnabled(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isInsideWindow) setIsInsideWindow(true);
    };

    const handleMouseLeave = () => {
      setIsInsideWindow(false);
    };

    const handleMouseEnter = () => {
      setIsInsideWindow(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isInsideWindow]);

  if (!isEnabled) return null;

  const isInspect = cursorType === 'inspect';
  const isVisible = isInsideWindow && cursorType !== 'hidden';

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: springX,
        y: springY,
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.15 }}
    >
      {isInspect ? (
        // Editorial Inspect Badge
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.4, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="-translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-[88px] sm:h-[88px] rounded-full bg-[#292722]/92 backdrop-blur-md text-[#F5F2EC] border border-[#F5F2EC]/20 shadow-[0_16px_40px_rgba(41,39,34,0.35)] flex flex-col items-center justify-center p-2 text-center"
        >
          <span className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase font-sans font-medium text-[#F5F2EC] leading-tight">
            {cursorText || 'Inspect ↗'}
          </span>
          <span className="text-[8px] tracking-[0.26em] uppercase text-[#B5A99A] mt-0.5">
            Plate
          </span>
        </motion.div>
      ) : (
        // Subtle minimal resting dot
        <motion.div
          animate={{
            scale: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
          className="-translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#292722]/50 border border-white/40 shadow-sm"
        />
      )}
    </motion.div>
  );
};
