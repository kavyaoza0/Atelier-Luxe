import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { StaggeredHeading } from './StaggeredHeading';
import { Magnetic } from './Magnetic';

interface StudioIntroProps {
  onOpenAbout: () => void;
}

export const StudioIntro: React.FC<StudioIntroProps> = ({ onOpenAbout }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="studio" className="py-24 sm:py-32 md:py-40 bg-[#F5F2EC] border-t border-[#292722]/10 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12">
        {/* Section Identifier & Folio */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between mb-12 md:mb-16 pb-4 border-b border-[#292722]/10 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] font-medium text-[#777765]"
        >
          <span>01 — The Studio</span>
          <span>Ahmedabad Heritage & European Minimalist Discourse</span>
        </motion.div>

        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Oversized Statement */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <StaggeredHeading
              as="h2"
              lines={[
                { text: 'Good design is' },
                { text: 'felt before it' },
                { text: 'is understood.', italic: true },
              ]}
              delay={0.15}
              staggerDelay={0.15}
              duration={0.9}
              className="text-3xl sm:text-5xl md:text-6xl font-serif font-light leading-[1.12] text-[#292722] tracking-[-0.01em]"
            />

            <div className="pt-8 text-xs font-mono uppercase tracking-[0.2em] text-[#777765] flex items-center gap-3">
              <span>EST. 2018</span>
              <span aria-hidden="true">/</span>
              <span>COMMISSION ONLY</span>
              <span aria-hidden="true">/</span>
              <span className="text-[#292722]/60 hidden sm:inline">23°01'N · 72°34'E</span>
            </div>

            {/* Architectural Vignette Image Container with Subtle Ambient Kinetic Drift */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 max-w-md hidden sm:block overflow-hidden bg-[#E8E1D7] border border-[#292722]/10 group relative shadow-[0_12px_32px_rgba(41,39,34,0.04)]"
            >
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, -5, 0] }}
                transition={shouldReduceMotion ? undefined : { repeat: Infinity, duration: 8.5, ease: "easeInOut" }}
                className="relative aspect-[16/10] overflow-hidden"
              >
                <img
                  src="/src/assets/images/detail_travertine_joinery_1791808649499.jpg"
                  alt="Travertine and plaster architectural shadow gap joint"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 right-2.5 text-[8px] uppercase tracking-[0.24em] font-mono text-white/90 bg-[#292722]/75 px-2 py-0.5 backdrop-blur-xs">
                  DATUM REF. 01-B
                </div>
                <div className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.2em] font-sans text-white/95 bg-[#292722]/75 px-2.5 py-0.5 backdrop-blur-xs">
                  Plate 01-B · 10mm Recessed Shadow Gap Detail
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: Supporting Journal Prose Container */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 pt-2 lg:pt-4 space-y-8"
          >
            <p className="text-base sm:text-lg text-[#34332F]/85 font-light leading-relaxed">
              We create thoughtful interiors where architecture, material, light and everyday life come together. Every decision is intentional, every detail considered, and every space designed to feel unmistakably personal.
            </p>

            <p className="text-sm sm:text-base text-[#777765] font-light leading-relaxed">
              Grounded in the architectural heritage of Ahmedabad and informed by European minimalism, our practice approaches interior environments not as decorative staging, but as enduring shelters for quiet contemplation and shared ritual.
            </p>

            <div className="pt-2">
              <Magnetic strength={0.35} maxDisplacement={7}>
                <button
                  type="button"
                  onClick={onOpenAbout}
                  className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#292722] pb-1 border-b border-[#292722] hover:text-[#777765] hover:border-[#777765] transition-colors cursor-pointer"
                >
                  <span>A little about us</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </Magnetic>
            </div>

            {/* Mobile architectural image */}
            <div className="sm:hidden pt-4 overflow-hidden bg-[#E8E1D7] border border-[#292722]/10">
              <div className="relative aspect-[16/10]">
                <img
                  src="/src/assets/images/detail_travertine_joinery_1791808649499.jpg"
                  alt="Travertine and plaster architectural shadow gap joint"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Editorial Architectural Dimension Strip with delicate hairline borders */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-[#292722]/10 text-[#34332F]"
        >
          <div className="group transition-transform duration-300 hover:-translate-y-0.5">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#777765] block mb-1">Discipline</span>
            <span className="font-serif text-lg md:text-xl font-light group-hover:text-[#292722] transition-colors">Interior Architecture</span>
          </div>
          <div className="group transition-transform duration-300 hover:-translate-y-0.5">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#777765] block mb-1">Atmosphere</span>
            <span className="font-serif text-lg md:text-xl font-light group-hover:text-[#292722] transition-colors">Tactile & Restrained</span>
          </div>
          <div className="group transition-transform duration-300 hover:-translate-y-0.5">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#777765] block mb-1">Geography</span>
            <span className="font-serif text-lg md:text-xl font-light group-hover:text-[#292722] transition-colors">India & Global Inquiries</span>
          </div>
          <div className="group transition-transform duration-300 hover:-translate-y-0.5">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#777765] block mb-1">Commission</span>
            <span className="font-serif text-lg md:text-xl font-light group-hover:text-[#292722] transition-colors">Select Residencies</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
