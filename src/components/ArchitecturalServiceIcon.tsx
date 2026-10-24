import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ServiceDisciplineId } from '../types';

interface ArchitecturalServiceIconProps {
  discipline: ServiceDisciplineId;
  inView: boolean;
  className?: string;
  delayOffset?: number;
}

export const ArchitecturalServiceIcon: React.FC<ArchitecturalServiceIconProps> = ({
  discipline,
  inView,
  className = 'w-14 h-14',
  delayOffset = 0,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Custom luxury ease curve
  const easeTransition = [0.16, 1, 0.3, 1] as const;

  // Helper function to generate motion props for each stroke
  const getStrokeMotion = (stepDelay: number, duration: number = 0.9) => {
    if (shouldReduceMotion) {
      return {
        initial: { pathLength: 1, opacity: 1 },
        animate: { pathLength: 1, opacity: 1 },
        transition: { duration: 0 },
      };
    }

    return {
      initial: { pathLength: 0, opacity: 0 },
      animate: inView
        ? { pathLength: 1, opacity: 1 }
        : { pathLength: 0, opacity: 0 },
      transition: {
        duration,
        delay: delayOffset + stepDelay,
        ease: easeTransition,
        opacity: { duration: 0.25, delay: delayOffset + stepDelay },
      },
    };
  };

  // Rendering Architectural Design Icon
  if (discipline === 'architecture') {
    return (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} overflow-visible`}
        aria-hidden="true"
      >
        {/* Step 1: Base Ground Datum Line & End Calibration Ticks */}
        <motion.line
          x1="8"
          y1="50"
          x2="56"
          y2="50"
          stroke="#292722"
          strokeWidth="1.15"
          strokeLinecap="round"
          {...getStrokeMotion(0.05, 0.8)}
        />
        <motion.line
          x1="8"
          y1="47"
          x2="8"
          y2="53"
          stroke="#777765"
          strokeWidth="0.85"
          strokeLinecap="round"
          {...getStrokeMotion(0.12, 0.4)}
        />
        <motion.line
          x1="56"
          y1="47"
          x2="56"
          y2="53"
          stroke="#777765"
          strokeWidth="0.85"
          strokeLinecap="round"
          {...getStrokeMotion(0.15, 0.4)}
        />

        {/* Step 2: Structural Columns / Pilasters */}
        <motion.line
          x1="18"
          y1="50"
          x2="18"
          y2="28"
          stroke="#292722"
          strokeWidth="1.1"
          strokeLinecap="round"
          {...getStrokeMotion(0.2, 0.75)}
        />
        <motion.line
          x1="46"
          y1="50"
          x2="46"
          y2="28"
          stroke="#292722"
          strokeWidth="1.1"
          strokeLinecap="round"
          {...getStrokeMotion(0.25, 0.75)}
        />
        <motion.line
          x1="32"
          y1="50"
          x2="32"
          y2="34"
          stroke="#777765"
          strokeWidth="0.85"
          strokeLinecap="round"
          strokeDasharray="1.5 2"
          {...getStrokeMotion(0.3, 0.6)}
        />

        {/* Step 3: Cantilevered Pavilion Roof Plane (Axonometric) */}
        <motion.path
          d="M 10 28 L 32 16 L 54 28 L 32 40 Z"
          stroke="#292722"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...getStrokeMotion(0.38, 0.95)}
        />

        {/* Step 4: Roof Fascia Depth Return */}
        <motion.path
          d="M 10 28 L 10 32 L 32 44 L 54 32 L 54 28"
          stroke="#292722"
          strokeWidth="1.0"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...getStrokeMotion(0.5, 0.7)}
        />
        <motion.line
          x1="32"
          y1="40"
          x2="32"
          y2="44"
          stroke="#292722"
          strokeWidth="1.0"
          strokeLinecap="round"
          {...getStrokeMotion(0.56, 0.4)}
        />

        {/* Step 5: Solar Aperture Study Ray & Angle Arc */}
        <motion.line
          x1="14"
          y1="9"
          x2="26"
          y2="21"
          stroke="#777765"
          strokeWidth="0.85"
          strokeLinecap="round"
          {...getStrokeMotion(0.65, 0.6)}
        />
        <motion.path
          d="M 19 14 A 6 6 0 0 1 24 19"
          stroke="#777765"
          strokeWidth="0.8"
          strokeLinecap="round"
          {...getStrokeMotion(0.72, 0.5)}
        />

        {/* Step 6: Portal Aperture Threshold */}
        <motion.path
          d="M 27 50 L 27 38 L 37 38 L 37 50"
          stroke="#292722"
          strokeWidth="0.95"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...getStrokeMotion(0.78, 0.65)}
        />

        {/* Step 7: Drafting Dimension Height Caliper */}
        <motion.line
          x1="59"
          y1="16"
          x2="59"
          y2="44"
          stroke="#777765"
          strokeWidth="0.75"
          strokeDasharray="2 2"
          {...getStrokeMotion(0.85, 0.6)}
        />
        <motion.line
          x1="57"
          y1="16"
          x2="61"
          y2="16"
          stroke="#777765"
          strokeWidth="0.75"
          {...getStrokeMotion(0.9, 0.3)}
        />
        <motion.line
          x1="57"
          y1="44"
          x2="61"
          y2="44"
          stroke="#777765"
          strokeWidth="0.75"
          {...getStrokeMotion(0.92, 0.3)}
        />
      </svg>
    );
  }

  // Rendering Interior Architecture Icon
  if (discipline === 'interiors') {
    return (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} overflow-visible`}
        aria-hidden="true"
      >
        {/* Step 1: Base Plinth Datum */}
        <motion.line
          x1="8"
          y1="52"
          x2="56"
          y2="52"
          stroke="#292722"
          strokeWidth="1.15"
          strokeLinecap="round"
          {...getStrokeMotion(0.05, 0.8)}
        />

        {/* Step 2: Outer Monolithic Spatial Portal Frame */}
        <motion.path
          d="M 12 52 L 12 14 L 52 14 L 52 52"
          stroke="#292722"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...getStrokeMotion(0.18, 0.9)}
        />

        {/* Step 3: Architectural Shadow Gap Incision Reveal */}
        <motion.path
          d="M 16 52 L 16 18 L 48 18 L 48 52"
          stroke="#777765"
          strokeWidth="0.85"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="3 2"
          {...getStrokeMotion(0.32, 0.75)}
        />

        {/* Step 4: Spatial Depth Perspective Lines */}
        <motion.line
          x1="12"
          y1="14"
          x2="22"
          y2="24"
          stroke="#292722"
          strokeWidth="1.0"
          strokeLinecap="round"
          {...getStrokeMotion(0.42, 0.65)}
        />
        <motion.line
          x1="52"
          y1="14"
          x2="42"
          y2="24"
          stroke="#292722"
          strokeWidth="1.0"
          strokeLinecap="round"
          {...getStrokeMotion(0.45, 0.65)}
        />
        <motion.line
          x1="12"
          y1="52"
          x2="22"
          y2="46"
          stroke="#777765"
          strokeWidth="0.85"
          strokeLinecap="round"
          {...getStrokeMotion(0.5, 0.6)}
        />
        <motion.line
          x1="52"
          y1="52"
          x2="42"
          y2="46"
          stroke="#777765"
          strokeWidth="0.85"
          strokeLinecap="round"
          {...getStrokeMotion(0.53, 0.6)}
        />

        {/* Step 5: Recessed Inner Portal Elevation */}
        <motion.path
          d="M 22 24 L 42 24 L 42 46 L 22 46 Z"
          stroke="#292722"
          strokeWidth="1.15"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...getStrokeMotion(0.6, 0.8)}
        />

        {/* Step 6: Floor Plane Joint Geometry & Travertine Rhythm */}
        <motion.line
          x1="28"
          y1="46"
          x2="24"
          y2="52"
          stroke="#777765"
          strokeWidth="0.75"
          strokeLinecap="round"
          {...getStrokeMotion(0.72, 0.5)}
        />
        <motion.line
          x1="36"
          y1="46"
          x2="40"
          y2="52"
          stroke="#777765"
          strokeWidth="0.75"
          strokeLinecap="round"
          {...getStrokeMotion(0.75, 0.5)}
        />

        {/* Step 7: Architectural Cove Lighting Beam Wash */}
        <motion.line
          x1="26"
          y1="18"
          x2="38"
          y2="18"
          stroke="#777765"
          strokeWidth="1.0"
          strokeLinecap="round"
          {...getStrokeMotion(0.82, 0.55)}
        />
        <motion.line
          x1="32"
          y1="18"
          x2="32"
          y2="28"
          stroke="#777765"
          strokeWidth="0.85"
          strokeLinecap="round"
          strokeDasharray="1.5 2"
          {...getStrokeMotion(0.88, 0.45)}
        />
      </svg>
    );
  }

  // Rendering Bespoke Millwork Icon
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} overflow-visible`}
      aria-hidden="true"
    >
      {/* Step 1: Base Precision Datum & Dimension Tick Marks */}
      <motion.line
        x1="8"
        y1="52"
        x2="56"
        y2="52"
        stroke="#292722"
        strokeWidth="1.15"
        strokeLinecap="round"
        {...getStrokeMotion(0.05, 0.8)}
      />

      {/* Step 2: Primary Solid Timber Frame Block */}
      <motion.path
        d="M 12 52 L 12 18 L 34 18 L 34 52 Z"
        stroke="#292722"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...getStrokeMotion(0.18, 0.9)}
      />

      {/* Step 3: Interlocking Tenon & Mortise Lap Joint */}
      <motion.path
        d="M 34 24 L 50 24 L 50 46 L 34 46"
        stroke="#292722"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...getStrokeMotion(0.32, 0.85)}
      />
      <motion.path
        d="M 26 24 L 34 24 L 34 35 L 26 35 Z"
        stroke="#777765"
        strokeWidth="0.95"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...getStrokeMotion(0.44, 0.65)}
      />

      {/* Step 4: Vertical Timber Grain Hairlines */}
      <motion.line
        x1="18"
        y1="22"
        x2="18"
        y2="48"
        stroke="#777765"
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeDasharray="2 3"
        {...getStrokeMotion(0.55, 0.65)}
      />
      <motion.line
        x1="24"
        y1="38"
        x2="24"
        y2="48"
        stroke="#777765"
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeDasharray="2 3"
        {...getStrokeMotion(0.6, 0.55)}
      />
      <motion.line
        x1="42"
        y1="28"
        x2="42"
        y2="42"
        stroke="#777765"
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeDasharray="2 3"
        {...getStrokeMotion(0.64, 0.55)}
      />

      {/* Step 5: Shadow Gap Reveal Edge */}
      <motion.line
        x1="12"
        y1="14"
        x2="34"
        y2="14"
        stroke="#777765"
        strokeWidth="0.85"
        strokeLinecap="round"
        {...getStrokeMotion(0.72, 0.5)}
      />
      <motion.line
        x1="12"
        y1="14"
        x2="12"
        y2="18"
        stroke="#777765"
        strokeWidth="0.85"
        strokeLinecap="round"
        {...getStrokeMotion(0.75, 0.35)}
      />

      {/* Step 6: Hand-Turned Bronze Pull & Pin Profile */}
      <motion.circle
        cx="44"
        cy="35"
        r="3.5"
        stroke="#292722"
        strokeWidth="1.1"
        strokeLinecap="round"
        {...getStrokeMotion(0.8, 0.6)}
      />
      <motion.circle
        cx="44"
        cy="35"
        r="1.2"
        fill="#777765"
        {...getStrokeMotion(0.86, 0.3)}
      />

      {/* Step 7: Caliper Millimeter Tolerance Gauge */}
      <motion.line
        x1="6"
        y1="18"
        x2="6"
        y2="52"
        stroke="#777765"
        strokeWidth="0.75"
        strokeDasharray="2 2"
        {...getStrokeMotion(0.9, 0.6)}
      />
      <motion.line
        x1="4"
        y1="18"
        x2="8"
        y2="18"
        stroke="#777765"
        strokeWidth="0.75"
        {...getStrokeMotion(0.94, 0.25)}
      />
      <motion.line
        x1="4"
        y1="52"
        x2="8"
        y2="52"
        stroke="#777765"
        strokeWidth="0.75"
        {...getStrokeMotion(0.96, 0.25)}
      />
    </svg>
  );
};
