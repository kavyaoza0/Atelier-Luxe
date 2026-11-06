import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate, useReducedMotion } from 'motion/react';
import { ServiceDisciplineItem } from '../types';
import { ArchitecturalServiceIcon } from './ArchitecturalServiceIcon';
import { Plus, Minus, Maximize2, X, Eye } from 'lucide-react';

interface ServiceCardProps {
  discipline: ServiceDisciplineItem;
  index: number;
  inViewSection: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  meta: {
    tag: string;
    icon: React.ComponentType<{ className?: string }>;
  };
}

const DISCIPLINE_FALLBACKS: Record<string, string> = {
  architecture: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
  interiors: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
  millwork: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  discipline,
  index,
  inViewSection,
  isExpanded,
  onToggleExpand,
  meta,
}) => {
  const cardRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isPhotoInspectOpen, setIsPhotoInspectOpen] = useState(false);
  const [photoLoaded, setPhotoLoaded] = useState(false);

  const fallbackUrl = DISCIPLINE_FALLBACKS[discipline.id] || DISCIPLINE_FALLBACKS.architecture;

  // Motion values for normalized cursor coordinates (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Exact cursor pixel position for tracking the perimeter border gleam
  const cursorPxX = useMotionValue(0);
  const cursorPxY = useMotionValue(0);
  const borderGleamTarget = useMotionValue(0);
  const borderGleamOpacity = useSpring(borderGleamTarget, { stiffness: 300, damping: 28 });

  // Spring physics: stiffness 260, damping 24 for subtle, smooth dampening
  const springConfig = { stiffness: 260, damping: 24, mass: 0.8 };
  const rawRotateX = useTransform(mouseY, [-0.5, 0.5], [6, -6]);
  const rawRotateY = useTransform(mouseX, [-0.5, 0.5], [-6, 6]);

  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);

  // Dynamic perimeter border gleam gradient
  const borderBackground = useMotionTemplate`radial-gradient(320px circle at ${cursorPxX}px ${cursorPxY}px, rgba(184, 153, 118, 0.6), rgba(119, 119, 101, 0.25) 50%, transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
    cursorPxX.set(e.clientX - rect.left);
    cursorPxY.set(e.clientY - rect.top);
    borderGleamTarget.set(1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    borderGleamTarget.set(0);
  };

  const DisciplineIcon = meta.icon;

  return (
    <>
      <motion.article
        ref={cardRef}
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.9,
          delay: index * 0.16,
          ease: [0.16, 1, 0.3, 1],
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="group relative flex flex-col justify-between p-8 sm:p-10 bg-[#FAF8F5] border border-[#292722]/15 hover:border-[#292722]/35 transition-colors duration-500 will-change-transform shadow-[0_4px_20px_rgba(41,39,34,0.03)] hover:shadow-[0_20px_45px_rgba(41,39,34,0.08)] select-none"
      >
        {/* Dynamic Cursor-Tracking Perimeter Border Gleam */}
        <motion.div
          className="pointer-events-none absolute -inset-[1px] transition-opacity duration-300"
          style={{
            opacity: borderGleamOpacity,
            background: borderBackground,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '1px',
          }}
          aria-hidden="true"
        />

        {/* Top Folio and Card Body (Uniform Single-Plane Tilt) */}
        <div>
          {/* Top Folio: Discipline Number & Fine-Line Animated Icon */}
          <div className="flex items-start justify-between pb-8 mb-8 border-b border-[#292722]/10">
            <div>
              <span className="font-serif text-3xl sm:text-4xl text-[#777765] group-hover:text-[#292722] transition-colors font-light block leading-none">
                {discipline.number}
              </span>
              <span className="text-[10px] uppercase tracking-[0.24em] font-mono text-[#777765] mt-2 block">
                {meta.tag}
              </span>
            </div>

            {/* Architectural Drafting Icon Badge with Sequential Stroke Reveals */}
            <div className="relative p-3.5 bg-[#E8E1D7]/25 group-hover:bg-[#E8E1D7]/55 border border-[#292722]/15 transition-all duration-500 shrink-0">
              <ArchitecturalServiceIcon
                discipline={discipline.id}
                inView={inViewSection}
                delayOffset={index * 0.18}
                className="w-12 h-12 sm:w-14 sm:h-14"
              />
            </div>
          </div>

          {/* Title & Subtitle */}
          <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#292722] mb-2 leading-tight">
            {discipline.title}
          </h3>

          <div className="text-[11px] uppercase tracking-[0.2em] font-mono text-[#777765] mb-5">
            {discipline.subtitle}
          </div>

          {/* Summary Narrative */}
          <p className="text-sm sm:text-base text-[#34332F]/85 font-light leading-relaxed mb-6">
            {discipline.summary}
          </p>

          {/* Tolerance Datum Tag */}
          <div className="pt-3 pb-3 border-t border-b border-[#292722]/10 text-[10px] font-mono text-[#777765] tracking-[0.14em]">
            <span className="text-[#292722] font-medium">{discipline.toleranceSpec}</span>
          </div>

          {/* Milestone Preview */}
          <div className="mt-4 text-xs text-[#777765] font-light">
            <span className="font-mono uppercase tracking-[0.18em] text-[10px] text-[#292722] block mb-1">
              Key Milestone:
            </span>
            {discipline.keyMilestone}
          </div>

          {/* Expandable Discipline Monograph Details */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="pt-6 mt-6 border-t border-[#292722]/10 space-y-6 overflow-hidden"
              >
                {/* Detailed Methodology Prose */}
                <p className="text-xs sm:text-sm text-[#34332F]/80 font-light leading-relaxed">
                  {discipline.details}
                </p>

                {/* Deliverables List */}
                <div>
                  <span className="text-[10px] uppercase tracking-[0.22em] font-mono font-medium text-[#292722] block mb-2.5">
                    Architectural Scope & Rigour
                  </span>
                  <ul className="space-y-2 text-xs text-[#34332F]/80 font-light">
                    {discipline.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-[#777765] font-serif text-sm leading-none">—</span>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lead Quote */}
                <blockquote className="pl-4 border-l-2 border-[#292722]/30 italic font-serif text-xs sm:text-sm text-[#777765] leading-relaxed">
                  "{discipline.leadArchitectQuote}"
                </blockquote>

                {/* Photography Asset Study with Resilient Fallback & Lightbox Trigger */}
                {discipline.photographyAsset && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-[#777765]">
                      <span>Study Plate · {discipline.number}</span>
                      <button
                        type="button"
                        onClick={() => setIsPhotoInspectOpen(true)}
                        className="inline-flex items-center gap-1 text-[#292722] hover:text-[#777765] transition-colors cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Inspect Study</span>
                      </button>
                    </div>

                    <div
                      onClick={() => setIsPhotoInspectOpen(true)}
                      className="relative aspect-[16/10] overflow-hidden bg-[#E8E1D7] border border-[#292722]/15 shadow-sm group/photo cursor-pointer"
                    >
                      <img
                        src={discipline.photographyAsset}
                        alt={discipline.photoCaption || discipline.title}
                        onLoad={() => setPhotoLoaded(true)}
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== fallbackUrl) {
                            target.src = fallbackUrl;
                          }
                        }}
                        className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover/photo:scale-105 ${
                          photoLoaded ? 'opacity-100' : 'opacity-90'
                        }`}
                        referrerPolicy="no-referrer"
                      />

                      {/* Corner Crosshairs */}
                      <span className="absolute top-2 left-2 text-[9px] font-mono text-white/70 drop-shadow-xs pointer-events-none">+</span>
                      <span className="absolute top-2 right-2 text-[9px] font-mono text-white/70 drop-shadow-xs pointer-events-none">+</span>
                      <span className="absolute bottom-2 left-2 text-[9px] font-mono text-white/70 drop-shadow-xs pointer-events-none">+</span>
                      <span className="absolute bottom-2 right-2 text-[9px] font-mono text-white/70 drop-shadow-xs pointer-events-none">+</span>

                      {/* Expand Overlay Pill */}
                      <div className="absolute inset-0 bg-[#292722]/20 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-3 py-1.5 bg-[#292722]/90 text-white text-[10px] font-mono uppercase tracking-[0.2em] backdrop-blur-xs flex items-center gap-1.5 shadow-md">
                          <Maximize2 className="w-3 h-3 text-[#E8E1D7]" />
                          <span>Enlarge Study</span>
                        </span>
                      </div>

                      <div className="absolute bottom-2 left-2 right-2 text-[9px] uppercase tracking-[0.14em] font-mono text-white/95 bg-[#292722]/85 px-2.5 py-1 backdrop-blur-xs line-clamp-1">
                        {discipline.photoCaption}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Toggle Bar */}
        <div className="pt-6 mt-8 border-t border-[#292722]/10 flex items-center justify-between">
          <button
            type="button"
            onClick={onToggleExpand}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-medium text-[#777765] group-hover:text-[#292722] transition-colors focus:outline-none cursor-pointer"
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} scope for ${discipline.title}`}
          >
            <span>{isExpanded ? 'Collapse Scope' : 'Explore Scope'}</span>
            {isExpanded ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          </button>

          <DisciplineIcon className="w-3.5 h-3.5 text-[#777765]/60 group-hover:text-[#292722] transition-colors" />
        </div>
      </motion.article>

      {/* Enlarged High-Resolution Study Plate Modal */}
      <AnimatePresence>
        {isPhotoInspectOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#141311]/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-[#FAF8F5] border border-[#292722]/20 shadow-2xl p-6 sm:p-10 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#292722]/10 text-xs font-mono uppercase tracking-[0.2em] text-[#777765]">
                <div className="flex items-center gap-2">
                  <span className="text-[#292722] font-semibold">Discipline 0{discipline.number}</span>
                  <span className="opacity-40">/</span>
                  <span>{discipline.title}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPhotoInspectOpen(false)}
                  className="flex items-center gap-1.5 text-[#777765] hover:text-[#292722] transition-colors p-1 cursor-pointer"
                  aria-label="Close study plate"
                >
                  <X className="w-4 h-4" />
                  <span className="text-[10px]">Close</span>
                </button>
              </div>

              {/* Large Image Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E8E1D7] border border-[#292722]/15 shadow-inner">
                <img
                  src={discipline.photographyAsset || fallbackUrl}
                  alt={discipline.photoCaption || discipline.title}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== fallbackUrl) target.src = fallbackUrl;
                  }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Fine Crosshairs */}
                <span className="absolute top-3 left-3 text-xs font-mono text-white/80">+</span>
                <span className="absolute top-3 right-3 text-xs font-mono text-white/80">+</span>
                <span className="absolute bottom-3 left-3 text-xs font-mono text-white/80">+</span>
                <span className="absolute bottom-3 right-3 text-xs font-mono text-white/80">+</span>
              </div>

              {/* Study Plate Caption and Specifications */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#292722]/10">
                <div>
                  <h4 className="text-base sm:text-lg font-serif font-light text-[#292722]">
                    {discipline.photoCaption}
                  </h4>
                  <p className="text-xs text-[#777765] font-mono uppercase tracking-[0.16em] mt-1">
                    {discipline.toleranceSpec}
                  </p>
                </div>
                <div className="shrink-0 text-xs font-mono uppercase tracking-[0.2em] text-[#292722] bg-[#E8E1D7] px-3 py-1.5">
                  Archival Study Monograph
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
