import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { StaggeredHeading } from './StaggeredHeading';

export const Philosophy: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const tenets = [
    {
      id: '01',
      num: 'Tenet I',
      title: 'Quietude',
      text: 'Spaces that quiet the senses from outside noise, offering acoustic and mental sanctuary.',
    },
    {
      id: '02',
      num: 'Tenet II',
      title: 'Patina',
      text: 'Surfaces that gain grace and character over time rather than requiring disposable replacement.',
    },
    {
      id: '03',
      num: 'Tenet III',
      title: 'Proportion',
      text: 'Classical geometric harmonies that feel instinctively balanced and restful to human perception.',
    },
    {
      id: '04',
      num: 'Tenet IV',
      title: 'Void & Light',
      text: 'Negative space treated not as an emptiness, but as a deliberate volume bathed in sculpted light.',
    },
  ];

  return (
    <section className="py-28 sm:py-36 md:py-48 bg-[#E8E1D7] text-[#292722] border-t border-[#292722]/10 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12">
        {/* Folio Header with Animated Hairline Datum */}
        <div className="relative pb-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-[#777765]"
          >
            <span>Studio Manifesto · 08</span>
            <span>Ahmedabad Spatial Philosophy</span>
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Expressive Serif Statement */}
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] sm:text-[11px] uppercase tracking-[0.26em] font-medium text-[#777765] block mb-6"
            >
              Core Principle
            </motion.span>

            <StaggeredHeading
              as="h2"
              lines={[
                { text: "We don't design" },
                { text: 'for the moment.' },
                { text: 'We design for', italic: true },
                { text: 'the years that follow.' },
              ]}
              delay={0.15}
              staggerDelay={0.14}
              duration={0.9}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] font-serif font-light leading-[1.08] text-[#292722] tracking-[-0.015em] mb-8"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2 max-w-xl"
            >
              <p className="text-base sm:text-lg text-[#34332F]/80 font-light leading-relaxed">
                Enduring materials. Considered decisions. Interiors that grow with you.
              </p>
            </motion.div>

            {/* Tenet Pillars Grid with Sequential Reveals & Micro-Interactions */}
            <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-8 border-t border-[#292722]/15 text-xs text-[#34332F]">
              {tenets.map((tenet, idx) => (
                <motion.div
                  key={tenet.id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + idx * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative p-3 -m-3 transition-all duration-400 hover:bg-[#FAF8F5]/50 border border-transparent hover:border-[#292722]/10"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#777765]">
                      {tenet.num}
                    </span>
                    <span className="text-[9px] font-mono text-[#777765]/50 opacity-0 group-hover:opacity-100 transition-opacity">
                      {tenet.id}/04
                    </span>
                  </div>
                  <span className="font-serif text-lg text-[#292722] block font-light group-hover:text-[#292722] transition-colors">
                    {tenet.title}
                  </span>
                  <p className="text-[#34332F]/70 font-light text-[11px] leading-relaxed pt-1.5">
                    {tenet.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Architectural Detail Cropped Photograph with Subtle Kinetic Ambient Drift */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/4] sm:aspect-[4/5] w-full max-w-md overflow-hidden bg-[#B5A99A] border border-[#292722]/15 shadow-[0_24px_60px_rgba(41,39,34,0.08)] group"
            >
              {/* Continuous Ambient Kinetic Drift */}
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, -6, 0] }}
                transition={shouldReduceMotion ? undefined : { repeat: Infinity, duration: 9.5, ease: 'easeInOut' }}
                className="w-full h-full relative"
              >
                <img
                  src="/src/assets/images/philosophy_architectural_detail_1791807531294.jpg"
                  alt="Architectural study of fluted limestone column and raw plaster joint in morning sunlight"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 text-[8px] uppercase tracking-[0.24em] font-mono text-white/90 bg-[#292722]/75 px-2 py-0.5 backdrop-blur-xs">
                  SPEC. 08-AHM
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] font-sans text-white/95 bg-[#292722]/75 px-3 py-1.5 backdrop-blur-sm">
                  <span>Material Study</span>
                  <span className="font-mono text-[9px] opacity-80">Ahmedabadi Sunlight</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
