import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export interface HeadingLine {
  text: string;
  italic?: boolean;
  className?: string;
}

export type HeadingLineInput = string | HeadingLine;

interface StaggeredHeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';
  lines: HeadingLineInput[];
  className?: string;
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  animateOnMount?: boolean;
  viewportMargin?: string;
  once?: boolean;
}

export const StaggeredHeading: React.FC<StaggeredHeadingProps> = ({
  as = 'h2',
  lines,
  className = '',
  delay = 0.1,
  staggerDelay = 0.14,
  duration = 0.9,
  animateOnMount = false,
  viewportMargin = '-60px',
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  // Normalise lines into consistent objects
  const parsedLines: HeadingLine[] = lines.map((line) => {
    if (typeof line === 'string') {
      return { text: line };
    }
    return line;
  });

  const fullText = parsedLines.map((l) => l.text).join(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const lineVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 38,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : duration,
        ease: luxuryEase,
      },
    },
  };

  const Component = as as keyof typeof motion;
  const MotionTag = motion[as as 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div'] || motion.h2;

  const animationProps = animateOnMount
    ? {
        initial: 'hidden',
        animate: 'visible',
      }
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once, margin: viewportMargin },
      };

  return (
    <MotionTag
      {...animationProps}
      variants={containerVariants}
      className={`text-balance ${className}`}
      aria-label={fullText}
    >
      {parsedLines.map((line, idx) => (
        <span key={idx} className="block overflow-hidden py-0.5 -my-0.5">
          <motion.span
            variants={lineVariants}
            className={`block will-change-transform ${line.italic ? 'italic' : ''} ${line.className || ''}`}
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
};
