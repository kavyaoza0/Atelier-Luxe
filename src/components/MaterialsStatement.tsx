import React, { useState, useRef } from 'react';
import { materialsData } from '../data/materials';
import { MaterialDetail } from '../types';
import { Sun, Compass, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { StaggeredHeading } from './StaggeredHeading';
import { Magnetic } from './Magnetic';

interface SensoryMetric {
  label: string;
  value: number; // percentage 0-100
  note: string;
}

const MATERIAL_SENSORY_METRICS: Record<string, SensoryMetric[]> = {
  'travertine': [
    { label: 'Surface Porosity', value: 78, note: 'Micro-cavities retain natural raking shadows' },
    { label: 'Thermal Mass', value: 85, note: 'Slow heat dissipation, naturally cool touch' },
    { label: '25-Year Patina Affinity', value: 92, note: 'Evolves deeper amber veins over decades' },
  ],
  'lime-plaster': [
    { label: 'Vapor Permeability', value: 92, note: 'Breathable lime cycle regulates interior humidity' },
    { label: 'Specular Light Diffusion', value: 88, note: 'Silky velvet chalk grain eliminates harsh glare' },
    { label: 'Artisan Stroke Memory', value: 95, note: 'Hand-troweled rhythmic movement visible at raking angles' },
  ],
  'belgian-linen': [
    { label: 'Acoustic Absorption', value: 82, note: 'Dampens high-frequency flutter echoes (NRC 0.45)' },
    { label: 'Tactile Warmth', value: 86, note: 'Raw slub flax texture softens stone boundaries' },
    { label: 'Solar Grazing Translucency', value: 74, note: 'Filters daylight into a soft luminous scrim' },
  ],
  'white-oak': [
    { label: 'Grain Rigidity', value: 76, note: 'Wire-brushed cathedral heartwood with matte wax' },
    { label: 'Thermal Comfort', value: 90, note: 'Warm ambient tactile response beneath bare feet' },
    { label: 'Tannin Maturation', value: 84, note: 'Gentle golden honey patina under natural UV exposure' },
  ],
  'cast-bronze': [
    { label: 'Mass & Density', value: 98, note: 'Heavy cold-cast alloy with substantial hand-feel' },
    { label: 'Patina Oxidation', value: 94, note: 'Living unsealed finish darkens and highlights with touch' },
    { label: 'Specular Sheen', value: 48, note: 'Soft brushed satin luster reflecting warm 2400K points' },
  ],
};

export const MaterialsStatement: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialDetail>(materialsData[0]);
  const [lightPhase, setLightPhase] = useState<'dawn' | 'noon' | 'dusk'>('dawn');
  const sectionRef = useRef<HTMLElement>(null);
  const heroImageContainerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking for micro-parallax
  const { scrollYProgress } = useScroll({
    target: heroImageContainerRef,
    offset: ['start end', 'end start'],
  });

  // Micro-parallax transformations: macro background image moves down, quote block floats gently upward
  const imageParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0px', '0px'] : ['-24px', '24px']
  );

  const quoteParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0px', '0px'] : ['16px', '-16px']
  );

  const lightPhaseDetails = {
    dawn: {
      name: 'Dawn · Raking Sunlight',
      azimuthDeg: 72,
      altitude: '14° ALT',
      azimuth: '072° AZI (ENE)',
      temp: '2700K Solar Ingress',
      lux: '340 Lux Grazing',
      desc: 'Low horizontal solar rays carve tactile shadows across rough travertine cavities and wire-brushed oak grain.',
      filter: 'brightness(98%) contrast(108%) sepia(12%) hue-rotate(-8deg)',
      overlayTint: 'from-[#292722]/90 via-[#402C1B]/40 to-transparent',
    },
    noon: {
      name: 'Zenith · Soft Diffused Daylight',
      azimuthDeg: 180,
      altitude: '68° ALT',
      azimuth: '180° AZI (MERIDIAN)',
      temp: '5400K Diffused Skylight',
      lux: '980 Lux Ambient',
      desc: 'Ambient high daylight reflects evenly across lime plaster, revealing silky chalk micro-texture and matte honesty.',
      filter: 'brightness(102%) contrast(100%) saturate(95%)',
      overlayTint: 'from-[#292722]/85 via-[#292722]/35 to-transparent',
    },
    dusk: {
      name: 'Dusk · Incandescent Grazing',
      azimuthDeg: 278,
      altitude: '08° ALT',
      azimuth: '278° AZI (WSW)',
      temp: '2200K Incandescent Grazing',
      lux: '160 Lux Low Grazing',
      desc: 'Warm 2200K architectural point-sources ignite deep bronze highlights and amber undertones within aged wood.',
      filter: 'brightness(90%) contrast(115%) sepia(26%) hue-rotate(6deg)',
      overlayTint: 'from-[#1E1B18]/92 via-[#3D2517]/55 to-transparent',
    },
  };

  const currentPhase = lightPhaseDetails[lightPhase];
  const activeMetrics = MATERIAL_SENSORY_METRICS[selectedMaterial.id] || MATERIAL_SENSORY_METRICS['travertine'];

  return (
    <section
      id="materials"
      ref={sectionRef}
      className="py-24 sm:py-32 md:py-40 bg-[#E8E1D7]/50 border-t border-[#292722]/10 relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12">
        {/* Section Header Folio with Animated Expanding Hairline */}
        <div className="relative pb-6 mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-[#777765]"
          >
            <span>05 — Material Study · Geology & Provenance</span>
            <span className="hidden sm:inline">Tactile Palette Archive & Solar Ingress Simulation</span>
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#292722]/15"
          />
        </div>

        {/* Full-width Immersive Photography Frame with Editorial Overlay & Micro-Parallax */}
        <div
          ref={heroImageContainerRef}
          className="relative min-h-[400px] sm:min-h-0 aspect-[4/5] sm:aspect-[16/10] md:aspect-[21/10] w-full overflow-hidden bg-[#292722] border border-[#292722]/12 shadow-[0_28px_70px_rgba(41,39,34,0.09)] mb-12 md:mb-16 select-none"
        >
          {/* Parallax Macro Background Image with Smooth Daylight Filter Transitions */}
          <motion.img
            src="/src/assets/images/materials_tactile_macro_1791807470321.jpg"
            alt="Tactile macro architectural study of raw travertine, Belgian linen, wire-brushed oak, and lime plaster with natural raking light"
            style={{
              y: imageParallaxY,
              scale: 1.12,
              filter: currentPhase.filter,
            }}
            className="w-full h-full object-cover opacity-85 will-change-transform transition-[filter] duration-1000 ease-out"
            referrerPolicy="no-referrer"
          />

          {/* Dynamic Light Phase Tint Layer */}
          <div
            className={`absolute inset-0 bg-gradient-to-t ${currentPhase.overlayTint} transition-all duration-1000`}
          />

          {/* Measured Editorial Contrast Scrim with Micro-Parallax Floating Quote */}
          <motion.div
            style={{ y: quoteParallaxY }}
            className="absolute inset-0 flex flex-col justify-end p-5 sm:p-10 md:p-16 pointer-events-none"
          >
            <div className="max-w-3xl">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-medium text-[#E8E1D7] block mb-2 sm:mb-3">
                Materiality & Patina
              </span>
              <StaggeredHeading
                as="h2"
                lines={[
                  { text: 'Material has a memory.' },
                  { text: 'Light gives it life.', italic: true, className: 'text-[#E8E1D7]' },
                ]}
                delay={0.15}
                staggerDelay={0.16}
                duration={0.9}
                className="text-2xl sm:text-5xl md:text-6xl font-serif font-light text-[#F5F2EC] leading-[1.08] tracking-[-0.01em] mb-3 sm:mb-6"
              />
              <p className="text-xs sm:text-base md:text-lg text-[#F5F2EC]/85 font-light leading-relaxed max-w-2xl">
                We gravitate toward materials that celebrate the passage of time rather than resist it. Unsealed stones that absorb stories, timbers that darken with age, and hand-worked plasters that reveal the artisan’s rhythmic stroke.
              </p>
            </div>
          </motion.div>

          {/* Interactive Daylight Simulator & Solar Azimuth Telemetry Controls */}
          <div className="absolute top-3 right-3 sm:top-6 sm:right-6 bg-[#292722]/90 backdrop-blur-md border border-white/15 p-2 sm:p-3.5 text-white flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3 shadow-[0_12px_32px_rgba(0,0,0,0.3)] z-10">
            <div className="flex items-center gap-2.5 pr-1 border-b sm:border-b-0 sm:border-r border-white/15 pb-2 sm:pb-0 sm:pr-3 text-[10px] tracking-[0.2em] font-mono text-[#E8E1D7]">
              {/* Animated Rotating Azimuth Needle Dial */}
              <div className="relative w-4 h-4 rounded-full border border-white/40 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: currentPhase.azimuthDeg }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="w-[1px] h-3 bg-amber-300 origin-center"
                />
              </div>
              <div className="flex flex-col text-[9px] leading-tight">
                <span className="font-semibold text-white/95">{currentPhase.altitude}</span>
                <span className="text-[#E8E1D7]/70">{currentPhase.temp}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {(['dawn', 'noon', 'dusk'] as const).map((phase) => {
                const isActive = lightPhase === phase;
                return (
                  <Magnetic key={phase} strength={0.25} maxDisplacement={4}>
                    <button
                      type="button"
                      onClick={() => setLightPhase(phase)}
                      className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-mono transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-[#E8E1D7] text-[#292722] font-semibold shadow-sm'
                          : 'text-[#E8E1D7]/75 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {phase.toUpperCase()}
                    </button>
                  </Magnetic>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tactile Material Lab & Provenance Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pt-4 items-start">
          {/* Left Column: Specimen Selection with Magnetic Touch */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs uppercase tracking-[0.24em] font-medium text-[#777765]">
                The Tactile Palette
              </span>
              <span className="h-[1px] w-6 bg-[#292722]/20" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#292722] mb-4">
              Honest substances, unadorned.
            </h3>
            <p className="text-sm text-[#34332F]/80 font-light leading-relaxed mb-6">
              Every interior is anchored by an uncompromising dialogue between mineral, fiber, and botanical matter. Select an element to inspect its architectural provenance and sensory profile.
            </p>

            {/* Material Selector List */}
            <div className="space-y-2">
              {materialsData.map((mat) => {
                const isActive = selectedMaterial.id === mat.id;
                return (
                  <Magnetic key={mat.id} strength={0.2} maxDisplacement={4} className="w-full">
                    <button
                      type="button"
                      onClick={() => setSelectedMaterial(mat)}
                      className={`w-full text-left py-3.5 px-4 border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'border-[#292722] bg-[#F5F2EC] text-[#292722] shadow-[0_4px_16px_rgba(41,39,34,0.06)] font-medium translate-x-1'
                          : 'border-[#292722]/10 bg-transparent text-[#777765] hover:text-[#292722] hover:border-[#292722]/30 hover:bg-[#F5F2EC]/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${
                            isActive ? 'bg-[#292722]' : 'bg-transparent border border-[#777765]'
                          }`}
                        />
                        <span className="text-xs uppercase tracking-[0.16em]">{mat.name}</span>
                      </div>
                      <span className="text-[10px] text-[#777765] tracking-wider uppercase font-mono">
                        {isActive ? 'Active' : 'Inspect ↗'}
                      </span>
                    </button>
                  </Magnetic>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Specimen Specification Sheet with AnimatePresence */}
          <div className="lg:col-span-8 bg-[#F5F2EC] p-8 sm:p-10 border border-[#292722]/12 shadow-[0_8px_36px_rgba(41,39,34,0.04)] min-h-[440px] relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMaterial.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* Specimen Header & Geological Provenance */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-[#292722]/10">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.24em] font-mono text-[#777765] block mb-1">
                      Specimen No. {materialsData.findIndex((m) => m.id === selectedMaterial.id) + 1} / 05
                    </span>
                    <h4 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#292722]">
                      {selectedMaterial.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#292722] bg-[#E8E1D7] px-3 py-1">
                      {selectedMaterial.origin}
                    </span>
                  </div>
                </div>

                {/* Prose Summary */}
                <div className="py-2">
                  <p className="text-base text-[#34332F]/90 font-light leading-relaxed">
                    {selectedMaterial.description}
                  </p>
                </div>

                {/* Animated Tactile Sensory Metrics */}
                <div className="pt-2 pb-4">
                  <span className="text-[10px] uppercase tracking-[0.22em] font-mono text-[#777765] block mb-4">
                    Tactile Sensory Calibration
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {activeMetrics.map((metric) => (
                      <div key={metric.label} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#34332F] font-medium">{metric.label}</span>
                          <span className="font-mono text-[#777765] text-[11px]">{metric.value}%</span>
                        </div>
                        {/* Meter Bar */}
                        <div className="w-full h-1.5 bg-[#E8E1D7] overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${metric.value}%` }}
                            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="h-full bg-[#292722]"
                          />
                        </div>
                        <p className="text-[10px] text-[#777765] leading-snug pt-0.5">
                          {metric.note}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Architectural Rigour Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#292722]/10 text-xs">
                  <div>
                    <span className="uppercase tracking-[0.2em] text-[#777765] block mb-1 font-mono text-[10px]">
                      Tactile Quality
                    </span>
                    <p className="text-[#34332F] font-light leading-relaxed">
                      {selectedMaterial.tactileQuality}
                    </p>
                  </div>

                  <div>
                    <span className="uppercase tracking-[0.2em] text-[#777765] block mb-1 font-mono text-[10px]">
                      Studio Application
                    </span>
                    <p className="text-[#34332F] font-light leading-relaxed">
                      {selectedMaterial.application}
                    </p>
                  </div>

                  {selectedMaterial.lrv && (
                    <div>
                      <span className="uppercase tracking-[0.2em] text-[#777765] block mb-1 font-mono text-[10px]">
                        Light Reflectance Value (LRV)
                      </span>
                      <p className="text-[#34332F] font-light leading-relaxed font-mono">
                        {selectedMaterial.lrv}
                      </p>
                    </div>
                  )}

                  {selectedMaterial.patinaProfile && (
                    <div>
                      <span className="uppercase tracking-[0.2em] text-[#777765] block mb-1 font-mono text-[10px]">
                        25-Year Patina Profile
                      </span>
                      <p className="text-[#34332F] font-light leading-relaxed">
                        {selectedMaterial.patinaProfile}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
