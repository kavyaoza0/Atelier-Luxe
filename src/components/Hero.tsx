import React, { useState, useRef } from 'react';
import { ArrowUpRight, ArrowDown, Eye, Compass, MoveDown } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { StaggeredHeading } from './StaggeredHeading';
import { useCursor } from '../context/CursorContext';
import { Magnetic } from './Magnetic';

interface HeroProps {
  onExploreWork: () => void;
  onDiscoverApproach: () => void;
  onTraverseSpace?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onDiscoverApproach, onTraverseSpace }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { setCursor, resetCursor } = useCursor();
  const heroRef = useRef<HTMLElement>(null);

  // Motion transition cubic-bezier tuple
  const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  // Scroll tracking across the hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Layered parallax transformations for subtle, architectural depth
  // Top Folio Kicker Strip: drifts slightly upward and softly fades out as you descend
  const kickerY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0px', '0px'] : ['0px', '-28px']);
  const kickerOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0.2]);

  // Left Column Typography: Multi-tiered Parallax Planes
  const textColumnY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0px', '0px'] : ['0px', '-42px']);
  const textColumnOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.35]);
  const microKickerY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0px', '0px'] : ['0px', '-18px']);
  const headlineParallaxY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0px', '0px'] : ['0px', '-26px']);
  const subHeadlineParallaxY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0px', '0px'] : ['0px', '-14px']);

  // Right Column: Architectural Photography Frame counter-motion (heavier mass, floats downward relative to scroll)
  const imageFrameY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0px', '0px'] : ['0px', '48px']);
  const imageCaptionY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0px', '0px'] : ['0px', '20px']);

  // Photographic Window Parallax: subtle internal image translation creating an optical depth-of-field
  const imageInnerY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['-3%', '7%']);
  const imageInnerScale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1.02, 1.07]);

  // Subtle Background Architectural Geometry (Deepest Layer)
  const bgGridY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0px', '0px'] : ['0px', '80px']);
  const bgGridOpacity = useTransform(scrollYProgress, [0, 0.8], [0.35, 0.05]);

  // Hero Bottom Editorial Metadata Strip
  const bottomStripY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0px', '0px'] : ['0px', '-18px']);
  const bottomStripOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.3]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[94vh] lg:min-h-screen pt-28 pb-12 px-6 sm:px-8 md:px-12 flex flex-col justify-between max-w-[1440px] mx-auto overflow-hidden"
    >
      {/* Subtle Background Architectural Depth Layer */}
      <motion.div
        style={{ y: bgGridY, opacity: bgGridOpacity }}
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 right-[4%] w-[440px] h-[360px] border border-[#292722]/[0.05] hidden lg:block" />
        <div className="absolute left-[38%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#292722]/[0.04] to-transparent hidden md:block" />
        <div className="absolute right-[35%] top-28 w-12 h-px bg-[#292722]/[0.08] hidden md:block" />
        <div className="absolute right-[35%] top-28 h-12 w-px bg-[#292722]/[0.08] hidden md:block" />
        <div className="absolute left-8 top-1/2 w-6 h-px bg-[#292722]/[0.06] hidden md:block" />
      </motion.div>

      {/* Editorial Folio Kicker Strip with Parallax */}
      <motion.div
        style={{ y: kickerY, opacity: kickerOpacity }}
        className="z-10 will-change-transform"
      >
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: luxuryEase }}
          className="flex items-center justify-between border-b border-[#292722]/10 pb-3 pt-2 text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-[#777765]"
        >
          <div className="flex items-center gap-2">
            <span>Monograph No. 08</span>
            <span aria-hidden="true" className="opacity-40">/</span>
            <span>Interior Architecture Archive</span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <Compass className="w-3 h-3 text-[#777765]" />
            <span>23°02&apos;N 72°34&apos;E · Ahmedabad</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Editorial Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end pt-6 md:pt-10 mb-8 relative z-10">
        {/* Left Column: Typographic Monumentality with Multi-Layer Parallax */}
        <motion.div
          style={{ y: textColumnY, opacity: textColumnOpacity }}
          className="lg:col-span-7 flex flex-col justify-between z-10 will-change-transform"
        >
          <div className="mb-4">
            {/* Studio Micro-Kicker with subtle independent drift */}
            <motion.div style={{ y: microKickerY }}>
              <motion.span
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: luxuryEase }}
                className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-medium text-[#777765] block mb-5"
              >
                Atelier / 08 · Spatial Architecture
              </motion.span>
            </motion.div>

            {/* Staggered Headline Lines with Parallax */}
            <motion.div style={{ y: headlineParallaxY }}>
              <StaggeredHeading
                as="h1"
                lines={[
                  { text: "Spaces that feel" },
                  { text: "like they belong" },
                  { text: "to you.", italic: true, className: "font-light text-[#34332F]" },
                ]}
                animateOnMount={true}
                delay={0.35}
                staggerDelay={0.16}
                duration={0.95}
                className="text-[2.15rem] xs:text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[5.75rem] font-serif font-light leading-[1.05] tracking-[-0.015em] text-[#292722]"
              />
            </motion.div>
          </div>

          <motion.div style={{ y: subHeadlineParallaxY }} className="pt-4 sm:pt-8 max-w-xl">
            {/* Staggered Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.8, ease: luxuryEase }}
              className="text-sm sm:text-lg text-[#34332F]/80 font-light leading-relaxed mb-6 sm:mb-8"
            >
              Considered interiors. Timeless materials. Spaces shaped around the way you live.
            </motion.p>

            {/* Staggered Understated Actions */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.95, ease: luxuryEase }}
              className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 pt-1"
            >
              <Magnetic strength={0.3} maxDisplacement={6}>
                <button
                  type="button"
                  onClick={onExploreWork}
                  className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#292722] py-2 sm:py-1 border-b border-[#292722] hover:border-[#777765] hover:text-[#777765] transition-colors cursor-pointer"
                >
                  <span>Explore our work</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </Magnetic>

              <Magnetic strength={0.3} maxDisplacement={6}>
                <button
                  type="button"
                  onClick={onTraverseSpace}
                  className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#292722] py-2 sm:py-1 border-b border-[#292722]/30 hover:border-[#292722] transition-colors cursor-pointer"
                >
                  <span>Traverse Space (3D)</span>
                  <MoveDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </Magnetic>

              <Magnetic strength={0.3} maxDisplacement={6}>
                <button
                  type="button"
                  onClick={onDiscoverApproach}
                  className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#777765] py-2 sm:py-1 border-b border-transparent hover:border-[#292722] hover:text-[#292722] transition-colors cursor-pointer"
                >
                  <span>Our approach</span>
                  <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </Magnetic>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Column: High-Fidelity Architectural Photography Container with Counter-Parallax */}
        <motion.div
          style={{ y: imageFrameY }}
          className="lg:col-span-5 relative mt-4 lg:mt-0 will-change-transform z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.97, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.45, ease: luxuryEase }}
          >
            <div
              className="relative aspect-[4/3] lg:aspect-[5/4] xl:aspect-[4/3] w-full overflow-hidden bg-[#E8E1D7] shadow-[0_24px_60px_rgba(41,39,34,0.08)] border border-[#292722]/10 group select-none cursor-pointer"
              onMouseEnter={() => setCursor('inspect', 'Study Daylight ✦')}
              onMouseLeave={resetCursor}
            >
              {!imageError ? (
                <motion.div
                  style={{ y: imageInnerY, scale: imageInnerScale }}
                  className="w-full h-full will-change-transform"
                >
                  <img
                    src="/images/hero_architectural_interior_1791807419701.jpg"
                    alt="Contemporary minimalist living pavilion with travertine plinth and serene natural morning daylight"
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      isFocusMode ? 'scale-105 filter brightness-105' : 'scale-100'
                    } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => {
                      const target = e.currentTarget;
                      const fallback = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85';
                      if (target.src !== fallback) {
                        target.src = fallback;
                      } else {
                        setImageError(true);
                      }
                    }}
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ) : (
                <div className="w-full h-full bg-[#E8E1D7] flex items-center justify-center p-8 text-center text-[#777765]">
                  <p className="text-xs uppercase tracking-[0.18em] font-serif">Contemporary Architectural Sanctuary</p>
                </div>
              )}

              {/* Corner architectural crosshair marks */}
              <div className="absolute top-3 left-3 text-[10px] font-mono text-[#292722]/50 pointer-events-none">+</div>
              <div className="absolute top-3 right-3 text-[10px] font-mono text-[#292722]/50 pointer-events-none">+</div>
              <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#292722]/50 pointer-events-none">+</div>

              {/* Interactive Focus Action Overlay */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFocusMode(!isFocusMode);
                  }}
                  className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-sans text-[#F5F2EC] bg-[#292722]/80 hover:bg-[#292722] px-3 py-1.5 border border-white/10 backdrop-blur-md transition-all cursor-pointer shadow-sm"
                  title="Toggle daylight focus"
                >
                  <Eye className="w-3 h-3 text-[#E8E1D7]" />
                  <span>{isFocusMode ? 'Normal View' : 'Focus Study'}</span>
                </button>
              </div>
            </div>

            <motion.div
              style={{ y: imageCaptionY }}
              className="mt-2.5 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[#777765]"
            >
              <span>Plate 01 · Morning Solar Path</span>
              <span>Honed Travertine & Plaster</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Hero Bottom Editorial Metadata Strip with Parallax */}
      <motion.div
        style={{ y: bottomStripY, opacity: bottomStripOpacity }}
        className="z-10 will-change-transform"
      >
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: luxuryEase }}
          className="pt-6 border-t border-[#292722]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] sm:text-xs text-[#777765] tracking-[0.22em] uppercase font-medium"
        >
          <div className="flex items-center gap-3">
            <span>Interior Architecture & Design</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span>Bespoke Residential Commisions</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Ahmedabad · Working Everywhere</span>
            <button
              type="button"
              onClick={onTraverseSpace}
              className="hidden md:inline-flex items-center gap-2 text-[#292722] hover:text-[#777765] pb-0.5 border-b border-[#292722]/30 hover:border-[#292722] transition-colors group cursor-pointer"
            >
              <span className="font-medium tracking-[0.2em]">Scroll vertically to traverse space</span>
              <MoveDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
