import React, { useState, useRef } from 'react';
import { ArrowUpRight, Grid3X3, SplitSquareVertical } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import { Project } from '../types';
import { projects } from '../data/projects';
import { useCursor } from '../context/CursorContext';
import { StaggeredHeading } from './StaggeredHeading';

interface SelectedWorkProps {
  onOpenProject: (project: Project) => void;
}

interface ParallaxImageFrameProps {
  src: string;
  alt: string;
  aspectRatioClass: string;
  badgeText: string;
  cursorLabel?: string;
  actionButton?: React.ReactNode;
  delay?: number;
  duration?: number;
}

const ParallaxImageFrame: React.FC<ParallaxImageFrameProps> = ({
  src,
  alt,
  aspectRatioClass,
  badgeText,
  cursorLabel = 'Inspect ↗',
  actionButton,
  delay = 0.05,
  duration = 0.95,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { setCursor, resetCursor } = useCursor();

  // 3D Tilt Motion Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const hoverScaleTarget = useMotionValue(1);

  // Smooth, tactile spring physics
  const springConfig = { stiffness: 260, damping: 24, mass: 0.8 };
  const rawRotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rawRotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);
  const scale = useSpring(hoverScaleTarget, { stiffness: 280, damping: 26 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Subtle slow-moving parallax translation within the clipped container bounds
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0px', '0px'] : ['-28px', '28px']
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
    hoverScaleTarget.set(1.02);
  };

  const handleMouseEnter = () => {
    setCursor('inspect', cursorLabel);
    if (!shouldReduceMotion) {
      hoverScaleTarget.set(1.02);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    hoverScaleTarget.set(1);
    resetCursor();
  };

  return (
    <div className="[perspective:1200px]">
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          scale: shouldReduceMotion ? 1 : scale,
          transformStyle: 'preserve-3d',
        }}
        className={`relative ${aspectRatioClass} overflow-hidden bg-[#E8E1D7] select-none cursor-pointer will-change-transform shadow-[0_12px_32px_rgba(41,39,34,0.06)] hover:shadow-[0_28px_65px_rgba(41,39,34,0.13)] transition-shadow duration-500`}
      >
        <motion.img
          src={src}
          alt={alt}
          style={{ y, scale: 1.14 }}
          className="w-full h-full object-cover will-change-transform transition-all duration-700 ease-out group-hover:scale-[1.17]"
          referrerPolicy="no-referrer"
        />

        {/* Plate Badge */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.22em] uppercase font-sans text-white/95 bg-[#292722]/80 px-2 sm:px-2.5 py-0.5 sm:py-1 backdrop-blur-sm pointer-events-none z-10 shadow-sm">
          {badgeText}
        </div>

        {/* Interactive Toggle Action Button */}
        {actionButton}
      </motion.div>
    </div>
  );
};

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onOpenProject }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'spread' | 'index'>('spread');
  const [activeDetailPlate, setActiveDetailPlate] = useState<Record<string, boolean>>({});
  const shouldReduceMotion = useReducedMotion();
  const { setCursor, resetCursor } = useCursor();

  const togglePlateImage = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    setActiveDetailPlate((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="work" className="py-24 sm:py-32 md:py-40 bg-[#F5F2EC] border-t border-[#292722]/10 relative">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Header Strip with Label, Filter Controls & View Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-24 pb-8 border-b border-[#292722]/10">
          <div>
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.26em] font-medium text-[#777765] mb-4">
              <span>02 — Selected Work</span>
              <span aria-hidden="true">·</span>
              <span>Monograph Folio</span>
            </div>
            <StaggeredHeading
              as="h2"
              lines={[
                { text: 'Spaces with' },
                { text: 'a point of view.', italic: true },
              ]}
              delay={0.1}
              staggerDelay={0.16}
              duration={0.9}
              className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-[#292722] tracking-[-0.01em]"
            />
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Typology Filter Tabs */}
            <div className="w-full sm:w-auto overflow-x-auto no-scrollbar flex items-center gap-1 p-1 bg-[#E8E1D7]/70 border border-[#292722]/10 shrink-0">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-[#292722] text-[#F5F2EC] shadow-sm'
                    : 'text-[#34332F]/80 hover:text-[#292722]'
                }`}
              >
                All Works
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('Residential')}
                className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activeFilter === 'Residential'
                    ? 'bg-[#292722] text-[#F5F2EC] shadow-sm'
                    : 'text-[#34332F]/80 hover:text-[#292722]'
                }`}
              >
                Residential
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('Private Residence')}
                className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activeFilter === 'Private Residence'
                    ? 'bg-[#292722] text-[#F5F2EC] shadow-sm'
                    : 'text-[#34332F]/80 hover:text-[#292722]'
                }`}
              >
                Private Residence
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('Contemporary Apartment')}
                className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activeFilter === 'Contemporary Apartment'
                    ? 'bg-[#292722] text-[#F5F2EC] shadow-sm'
                    : 'text-[#34332F]/80 hover:text-[#292722]'
                }`}
              >
                Contemporary Apartment
              </button>
            </div>

            {/* View Mode Switcher */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-[#E8E1D7]/70 border border-[#292722]/10">
              <button
                type="button"
                onClick={() => setViewMode('spread')}
                className={`p-1.5 text-xs transition-colors ${
                  viewMode === 'spread'
                    ? 'bg-[#292722] text-[#F5F2EC]'
                    : 'text-[#777765] hover:text-[#292722]'
                }`}
                title="Editorial Spread View"
              >
                <SplitSquareVertical className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('index')}
                className={`p-1.5 text-xs transition-colors ${
                  viewMode === 'index'
                    ? 'bg-[#292722] text-[#F5F2EC]'
                    : 'text-[#777765] hover:text-[#292722]'
                }`}
                title="Architectural Index View"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* View Mode: Architectural Index View (2-Column Grid) */}
        {viewMode === 'index' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-14">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.9,
                  delay: (index % 2) * 0.14,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => {
                  resetCursor();
                  onOpenProject(project);
                }}
                className="group cursor-pointer bg-[#F5F2EC] border border-[#292722]/12 p-5 sm:p-8 hover:border-[#292722] transition-colors"
              >
                <div className="overflow-hidden bg-[#E8E1D7] mb-6 border border-[#292722]/10">
                  <ParallaxImageFrame
                    src={project.image}
                    alt={project.title}
                    aspectRatioClass="aspect-[4/5] sm:aspect-[16/10]"
                    badgeText={`Plate ${project.number}`}
                    cursorLabel="Inspect ↗"
                    delay={(index % 2) * 0.14}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#777765]">
                    <span>{project.category}</span>
                    <span>{project.details.area}</span>
                  </div>

                  <h3 className="text-2xl font-serif text-[#292722] group-hover:text-[#777765] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#34332F]/80 font-light leading-relaxed">
                    {project.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-[#292722]/10 text-[11px] text-[#777765]">
                    <span>{project.location}</span>
                    <span className="inline-flex items-center gap-1 uppercase tracking-[0.18em] text-[#292722] group-hover:translate-x-1 transition-transform">
                      Inspect <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View Mode: Editorial Spread View (Asymmetrical Magazine Layouts) */}
        {viewMode === 'spread' && (
          <div className="space-y-28 sm:space-y-40 md:space-y-48">
            {filteredProjects.map((project) => {
              const isShowingDetail = !!activeDetailPlate[project.id];
              const displayImage = isShowingDetail && project.detailImage ? project.detailImage : project.image;

              if (project.id === 'quiet-residence') {
                return (
                  <div
                    key={project.id}
                    className="group cursor-pointer"
                    onClick={() => {
                      resetCursor();
                      onOpenProject(project);
                    }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end">
                      <div className="lg:col-span-8 overflow-hidden bg-[#E8E1D7] border border-[#292722]/12 relative shadow-[0_20px_50px_rgba(41,39,34,0.06)]">
                        <ParallaxImageFrame
                          src={displayImage}
                          alt={project.title}
                          aspectRatioClass="aspect-[4/5] sm:aspect-[16/10]"
                          badgeText={`Plate ${project.number} ${isShowingDetail ? '· Architectural Aperture Detail' : '· Main Chamber'}`}
                          cursorLabel="Inspect ↗"
                          actionButton={
                            project.detailImage ? (
                              <button
                                type="button"
                                onMouseEnter={(e) => {
                                  e.stopPropagation();
                                  setCursor('default');
                                }}
                                onMouseLeave={(e) => {
                                  e.stopPropagation();
                                  setCursor('inspect', 'Inspect ↗');
                                }}
                                onClick={(e) => togglePlateImage(e, project.id)}
                                className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-[#292722] bg-[#F5F2EC]/95 hover:bg-[#F5F2EC] px-3 sm:px-3.5 py-2 sm:py-1.5 min-h-[36px] inline-flex items-center backdrop-blur-sm border border-[#292722]/20 transition-all z-20 shadow-sm"
                              >
                                {isShowingDetail ? '← View Main Room' : 'View Courtyard Aperture →'}
                              </button>
                            ) : undefined
                          }
                        />
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-4 flex flex-col justify-end space-y-4 lg:pb-6"
                      >
                        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#777765]">
                          <span>{project.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.location}</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-[#292722] group-hover:text-[#777765] transition-colors">
                          {project.title}
                        </h3>
                        {project.subtitle && (
                          <span className="text-xs text-[#777765] uppercase tracking-[0.16em] block">
                            {project.subtitle}
                          </span>
                        )}
                        <p className="text-sm sm:text-base text-[#34332F]/80 font-light leading-relaxed">
                          {project.description}
                        </p>

                        <div className="pt-2 text-[11px] text-[#777765] space-y-1">
                          <div><span className="text-[#292722] font-medium">Area:</span> {project.details.area}</div>
                          <div><span className="text-[#292722] font-medium">Orientation:</span> {project.details.orientation}</div>
                        </div>

                        <div className="pt-2">
                          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#292722] group-hover:text-[#777765] transition-colors">
                            <span>Open Monograph</span>
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                );
              }

              if (project.id === 'limestone-house') {
                return (
                  <div
                    key={project.id}
                    className="group cursor-pointer"
                    onClick={() => {
                      resetCursor();
                      onOpenProject(project);
                    }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                      <motion.div
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center space-y-5 lg:pr-6"
                      >
                        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#777765]">
                          <span>{project.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.location}</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-[#292722] group-hover:text-[#777765] transition-colors">
                          {project.title}
                        </h3>
                        {project.subtitle && (
                          <span className="text-xs text-[#777765] uppercase tracking-[0.16em] block">
                            {project.subtitle}
                          </span>
                        )}
                        <p className="text-sm sm:text-base text-[#34332F]/80 font-light leading-relaxed">
                          {project.description}
                        </p>

                        <div className="pt-2 text-[11px] text-[#777765] space-y-1">
                          <div><span className="text-[#292722] font-medium">Scale:</span> {project.details.area}</div>
                          <div><span className="text-[#292722] font-medium">Materials:</span> Jodhpur Limestone, Venetian Plaster</div>
                        </div>

                        <div className="pt-2">
                          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#292722] group-hover:text-[#777765] transition-colors">
                            <span>Open Monograph</span>
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </span>
                        </div>
                      </motion.div>

                      <div className="lg:col-span-7 order-1 lg:order-2 overflow-hidden bg-[#E8E1D7] border border-[#292722]/12 relative shadow-[0_20px_50px_rgba(41,39,34,0.06)]">
                        <ParallaxImageFrame
                          src={displayImage}
                          alt={project.title}
                          aspectRatioClass="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[16/11]"
                          badgeText={`Plate ${project.number} ${isShowingDetail ? '· Travertine Joinery Detail' : '· Sculptural Volume'}`}
                          cursorLabel="Inspect ↗"
                          actionButton={
                            project.detailImage ? (
                              <button
                                type="button"
                                onMouseEnter={(e) => {
                                  e.stopPropagation();
                                  setCursor('default');
                                }}
                                onMouseLeave={(e) => {
                                  e.stopPropagation();
                                  setCursor('inspect', 'Inspect ↗');
                                }}
                                onClick={(e) => togglePlateImage(e, project.id)}
                                className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-[#292722] bg-[#F5F2EC]/95 hover:bg-[#F5F2EC] px-3 sm:px-3.5 py-2 sm:py-1.5 min-h-[36px] inline-flex items-center backdrop-blur-sm border border-[#292722]/20 transition-all z-20 shadow-sm"
                              >
                                {isShowingDetail ? '← View Hearth' : 'View Stone Joinery →'}
                              </button>
                            ) : undefined
                          }
                        />
                      </div>
                    </div>
                  </div>
                );
              }

              if (project.id === 'form-function') {
                return (
                  <div
                    key={project.id}
                    className="group cursor-pointer"
                    onClick={() => {
                      resetCursor();
                      onOpenProject(project);
                    }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end">
                      <div className="lg:col-span-8 overflow-hidden bg-[#E8E1D7] border border-[#292722]/12 relative shadow-[0_20px_50px_rgba(41,39,34,0.06)]">
                        <ParallaxImageFrame
                          src={displayImage}
                          alt={project.title}
                          aspectRatioClass="aspect-[4/5] sm:aspect-[16/10]"
                          badgeText={`Plate ${project.number} ${isShowingDetail ? '· Library Reading Nook' : '· Double-Height Living Volume'}`}
                          cursorLabel="Inspect ↗"
                          actionButton={
                            project.detailImage ? (
                              <button
                                type="button"
                                onMouseEnter={(e) => {
                                  e.stopPropagation();
                                  setCursor('default');
                                }}
                                onMouseLeave={(e) => {
                                  e.stopPropagation();
                                  setCursor('inspect', 'Inspect ↗');
                                }}
                                onClick={(e) => togglePlateImage(e, project.id)}
                                className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-[#292722] bg-[#F5F2EC]/95 hover:bg-[#F5F2EC] px-3 sm:px-3.5 py-2 sm:py-1.5 min-h-[36px] inline-flex items-center backdrop-blur-sm border border-[#292722]/20 transition-all z-20 shadow-sm"
                              >
                                {isShowingDetail ? '← View Living Volume' : 'View Library Joinery →'}
                              </button>
                            ) : undefined
                          }
                        />
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-4 flex flex-col justify-end space-y-4 lg:pb-6"
                      >
                        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#777765]">
                          <span>{project.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.location}</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-[#292722] group-hover:text-[#777765] transition-colors">
                          {project.title}
                        </h3>
                        {project.subtitle && (
                          <span className="text-xs text-[#777765] uppercase tracking-[0.16em] block">
                            {project.subtitle}
                          </span>
                        )}
                        <p className="text-sm sm:text-base text-[#34332F]/80 font-light leading-relaxed">
                          {project.description}
                        </p>

                        <div className="pt-2 text-[11px] text-[#777765] space-y-1">
                          <div><span className="text-[#292722] font-medium">Panoramas:</span> Arabian Sea Westward</div>
                          <div><span className="text-[#292722] font-medium">Acoustics:</span> Acoustic Decoupling & Linen Lined</div>
                        </div>

                        <div className="pt-2">
                          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#292722] group-hover:text-[#777765] transition-colors">
                            <span>Open Monograph</span>
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                );
              }

              // living-gallery (wide cinematic)
              return (
                <div
                  key={project.id}
                  className="group cursor-pointer"
                  onClick={() => {
                    resetCursor();
                    onOpenProject(project);
                  }}
                >
                  <div className="space-y-6">
                    <div className="overflow-hidden bg-[#E8E1D7] border border-[#292722]/12 relative shadow-[0_20px_50px_rgba(41,39,34,0.06)]">
                      <ParallaxImageFrame
                        src={displayImage}
                        alt={project.title}
                        aspectRatioClass="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]"
                        badgeText={`Plate ${project.number} ${isShowingDetail ? '· Fluted Column Vignette' : '· Gallery Pavilion'}`}
                        cursorLabel="Inspect ↗"
                        actionButton={
                          project.detailImage ? (
                            <button
                              type="button"
                              onMouseEnter={(e) => {
                                e.stopPropagation();
                                setCursor('default');
                              }}
                              onMouseLeave={(e) => {
                                e.stopPropagation();
                                setCursor('inspect', 'Inspect ↗');
                              }}
                              onClick={(e) => togglePlateImage(e, project.id)}
                              className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-[#292722] bg-[#F5F2EC]/95 hover:bg-[#F5F2EC] px-3 sm:px-3.5 py-2 sm:py-1.5 min-h-[36px] inline-flex items-center backdrop-blur-sm border border-[#292722]/20 transition-all z-20 shadow-sm"
                            >
                              {isShowingDetail ? '← View Gallery' : 'View Stone Column Vignette →'}
                            </button>
                          ) : undefined
                        }
                      />
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 pt-2"
                    >
                      <div>
                        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#777765] mb-2">
                          <span>{project.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.location}</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#292722] group-hover:text-[#777765] transition-colors">
                          {project.title}
                        </h3>
                        {project.subtitle && (
                          <span className="text-xs text-[#777765] uppercase tracking-[0.16em] block pt-1">
                            {project.subtitle}
                          </span>
                        )}
                      </div>

                      <div className="sm:max-w-md">
                        <p className="text-sm sm:text-base text-[#34332F]/80 font-light leading-relaxed mb-3">
                          {project.description}
                        </p>
                        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#292722] group-hover:text-[#777765] transition-colors">
                          <span>Open Monograph</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
