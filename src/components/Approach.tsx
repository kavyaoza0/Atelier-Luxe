import React, { useState } from 'react';
import { approachSteps } from '../data/materials';
import { Plus, Minus, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { StaggeredHeading } from './StaggeredHeading';
import { Magnetic } from './Magnetic';

interface PhaseMeta {
  duration: string;
  discipline: string;
  progressPercent: number;
}

const PHASE_METAS: Record<string, PhaseMeta> = {
  '01': {
    duration: '4–6 Weeks',
    discipline: 'Dialogue & Spatial Audit',
    progressPercent: 16,
  },
  '02': {
    duration: '8–12 Weeks',
    discipline: 'Physical Material Trays & Prototyping',
    progressPercent: 50,
  },
  '03': {
    duration: 'On-Site Delivery',
    discipline: 'Turnkey Architectural Supervision',
    progressPercent: 100,
  },
};

export const Approach: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string>('01');
  const shouldReduceMotion = useReducedMotion();

  const currentMeta = PHASE_METAS[activeStep] || PHASE_METAS['01'];

  const toggleStep = (num: string) => {
    setActiveStep(num);
  };

  return (
    <section id="approach" className="py-24 sm:py-32 md:py-40 bg-[#F5F2EC] border-t border-[#292722]/10 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12">
        {/* Section Header Folio with Hairline Datum */}
        <div className="relative pb-6 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-[#777765]"
          >
            <span>07 — How We Work</span>
            <span className="hidden sm:inline">Architectural Methodology & Milestone Timeline</span>
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

        {/* Section Title with Staggered Lines */}
        <div className="mb-14 md:mb-20">
          <StaggeredHeading
            as="h2"
            lines={[
              { text: 'Thoughtful by design.' },
              { text: 'Personal by nature.', italic: true },
            ]}
            delay={0.1}
            staggerDelay={0.16}
            duration={0.9}
            className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-[#292722] tracking-[-0.01em]"
          />
        </div>

        {/* Interactive Architectural Milestone Progress Connector Track */}
        <div className="mb-14 sm:mb-20 bg-[#E8E1D7]/60 border border-[#292722]/15 p-6 sm:p-8 backdrop-blur-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#292722]/10 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#1E1B18]" />
              <span className="uppercase tracking-[0.22em] text-[10px] sm:text-[11px] font-mono text-[#777765]">
                Methodology Timeline
              </span>
            </div>
            <div className="flex items-center gap-4 text-[10px] sm:text-[11px] font-mono text-[#777765]">
              <span>ACTIVE PHASE: <strong className="text-[#1E1B18]">{activeStep} / 03</strong></span>
              <span aria-hidden="true">·</span>
              <span className="text-[#1E1B18]">{currentMeta.duration}</span>
            </div>
          </div>

          {/* Progress Connector Track */}
          <div className="relative py-4">
            {/* Background Line */}
            <div className="absolute top-1/2 left-4 right-4 h-[1px] -translate-y-1/2 bg-[#292722]/20" />

            {/* Active Animated Connector Line */}
            <motion.div
              initial={false}
              animate={{ width: `${currentMeta.progressPercent}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-1/2 left-4 h-[2px] -translate-y-1/2 bg-[#1E1B18]"
            />

            {/* Milestone Nodes */}
            <div className="relative flex justify-between items-center px-1 sm:px-2">
              {approachSteps.map((step, idx) => {
                const isActive = activeStep === step.number;
                const isPassed = parseInt(activeStep, 10) > parseInt(step.number, 10);
                return (
                  <Magnetic key={step.number} strength={0.25} maxDisplacement={5}>
                    <button
                      type="button"
                      onClick={() => toggleStep(step.number)}
                      className="group flex flex-col items-center cursor-pointer focus:outline-none"
                    >
                      <motion.div
                        animate={{
                          scale: isActive ? 1.15 : 1,
                          backgroundColor: isActive ? '#1E1B18' : isPassed ? '#292722' : '#F5F2EC',
                          borderColor: isActive || isPassed ? '#1E1B18' : '#777765',
                        }}
                        transition={{ duration: 0.35 }}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center text-xs font-mono transition-shadow duration-300 shadow-xs"
                      >
                        {isPassed ? (
                          <Check className="w-3.5 h-3.5 text-[#F5F2EC]" />
                        ) : (
                          <span className={isActive ? 'text-[#F5F2EC] font-semibold' : 'text-[#777765]'}>
                            {step.number}
                          </span>
                        )}
                      </motion.div>
                      <span className={`text-[9px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.18em] font-sans mt-2 transition-colors text-center ${
                        isActive ? 'text-[#1E1B18] font-medium' : 'text-[#777765] group-hover:text-[#292722]'
                      }`}>
                        {step.title}
                      </span>
                    </button>
                  </Magnetic>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3 Editorial Columns with Gallery Monograph Dark Charcoal Styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-start">
          {approachSteps.map((step, index) => {
            const isActive = activeStep === step.number;
            const meta = PHASE_METAS[step.number];

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.85,
                  delay: index * 0.14,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => toggleStep(step.number)}
                className={`group flex flex-col justify-between p-6 sm:p-8 transition-all duration-400 cursor-pointer border ${
                  isActive
                    ? 'bg-[#F5F2EC] border-[#1E1B18] shadow-[0_16px_45px_rgba(30,27,24,0.08)] -translate-y-1'
                    : 'bg-[#F5F2EC]/60 border-[#292722]/15 hover:border-[#292722]/40 hover:bg-[#F5F2EC]'
                }`}
              >
                <div>
                  {/* Monograph Plate Header */}
                  <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-[#292722]/10">
                    <span className={`font-serif text-3xl sm:text-4xl font-light transition-colors ${
                      isActive ? 'text-[#1E1B18]' : 'text-[#777765] group-hover:text-[#292722]'
                    }`}>
                      {step.number}
                    </span>

                    {/* Dark Charcoal Monograph Tag */}
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[9px] uppercase tracking-[0.2em] font-mono px-2 py-0.5 transition-colors ${
                        isActive
                          ? 'bg-[#1E1B18] text-[#F5F2EC]'
                          : 'bg-[#E8E1D7] text-[#777765] group-hover:text-[#292722]'
                      }`}>
                        {meta.duration}
                      </span>
                      <span className="p-1 text-[#777765] group-hover:text-[#292722]">
                        {isActive ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#777765] block mb-2 font-mono">
                    {step.phaseLabel}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#292722] mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[#34332F]/85 font-light leading-relaxed mb-6">
                    "{step.summary}"
                  </p>

                  <div className="text-[11px] text-[#777765] pb-4 font-mono border-b border-[#292722]/10">
                    <span className="text-[#1E1B18] font-medium uppercase tracking-wider">Milestone:</span>{' '}
                    {step.keyMilestone}
                  </div>

                  {/* Expandable Phase Discipline Details */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden pt-4 space-y-4"
                      >
                        <p className="text-xs sm:text-sm text-[#34332F]/75 font-light leading-relaxed">
                          {step.details}
                        </p>

                        <div className="pt-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-mono font-medium text-[#1E1B18]">
                              Deliverables & Rigour
                            </span>
                            <span className="text-[9px] font-mono text-[#777765]">4 DOCUMENTS</span>
                          </div>
                          <ul className="space-y-2 text-xs text-[#34332F]/85">
                            {step.deliverables.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span className="text-[10px] font-mono text-[#777765] pt-0.5">0{idx + 1}</span>
                                <span className="leading-snug">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-6 mt-6 border-t border-[#292722]/10 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-mono text-[#777765]">
                  <span>{isActive ? 'Active Phase' : 'Select Phase'}</span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${
                    isActive ? 'translate-x-1 text-[#1E1B18]' : 'group-hover:translate-x-0.5'
                  }`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Architectural Methodology Vignette Container with Continuous Ambient Kinetic Drift */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 sm:mt-24 pt-8 border-t border-[#292722]/10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#E8E1D7]/50 p-6 sm:p-10 border border-[#292722]/15 shadow-[0_12px_36px_rgba(41,39,34,0.04)]">
            <div className="lg:col-span-5 relative aspect-[16/10] overflow-hidden bg-[#292722] border border-[#292722]/15 group">
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, -6, 0] }}
                transition={shouldReduceMotion ? undefined : { repeat: Infinity, duration: 9, ease: 'easeInOut' }}
                className="w-full h-full relative"
              >
                <img
                  src="/src/assets/images/detail_courtyard_light_1791808661946.jpg"
                  alt="Courtyard light study and pivot door threshold"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 text-[8px] uppercase tracking-[0.24em] font-mono text-white/90 bg-[#1E1B18]/80 px-2 py-0.5 backdrop-blur-xs">
                  SPEC. 07-EXECUTION
                </div>
                <div className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.2em] font-sans text-white/95 bg-[#1E1B18]/85 px-3 py-1 backdrop-blur-sm">
                  Execution Study · Solar Aperture
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.24em] font-mono text-[#777765]">
                Methodological Standard · Physical Calibration
              </span>
              <h4 className="text-2xl sm:text-3xl font-serif text-[#292722] font-light">
                Every threshold is tested in physical reality.
              </h4>
              <p className="text-sm text-[#34332F]/80 font-light leading-relaxed">
                Before final installation, our team conducts on-site mockups of critical apertures, ensuring sunlight casts the intended shadow geometry across your chosen stone and timber surfaces.
              </p>
              <div className="pt-2 text-xs font-mono text-[#1E1B18] bg-[#F5F2EC] p-3 border border-[#292722]/10 flex flex-wrap items-center justify-between gap-2">
                <span>TOLERANCE SPECIFICATION: ±1.5MM</span>
                <span className="text-[#777765]">SITE SUPERVISION: PRINCIPAL DIRECTED</span>
                <span className="text-[#777765]">23°01'N · AHMEDABAD</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
