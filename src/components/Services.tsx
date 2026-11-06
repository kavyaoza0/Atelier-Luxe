import React, { useState } from 'react';
import { servicesData } from '../data/services';
import { ServiceCard } from './ServiceCard';
import { StaggeredHeading } from './StaggeredHeading';
import { Compass, Layers, Hammer } from 'lucide-react';
import { ServiceDisciplineId } from '../types';
import { StaggerSection, StaggerItem } from './StaggerSection';

export const Services: React.FC = () => {
  const [expandedId, setExpandedId] = useState<ServiceDisciplineId | null>('architecture');
  const [inViewSection, setInViewSection] = useState(false);

  const toggleExpand = (id: ServiceDisciplineId) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getDisciplineIconMeta = (id: ServiceDisciplineId) => {
    switch (id) {
      case 'architecture':
        return { tag: 'Spatial Massing', icon: Compass };
      case 'interiors':
        return { tag: 'Atmosphere & Flow', icon: Layers };
      case 'millwork':
        return { tag: 'Precision Joinery', icon: Hammer };
    }
  };

  return (
    <StaggerSection
      id="services"
      className="py-16 sm:py-24 md:py-32 lg:py-36 bg-[#F5F2EC] border-t border-[#292722]/10 relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        {/* Section Header Folio with StaggerItem step 0 */}
        <StaggerItem
          step={0}
          className="flex items-center justify-between pb-4 sm:pb-6 mb-10 sm:mb-14 md:mb-16 border-b border-[#292722]/10 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.26em] text-[#777765]"
        >
          <span>06 — Disciplines & Practice</span>
          <span className="truncate max-w-[200px] sm:max-w-none">Architectural Services · Precision Tolerances</span>
        </StaggerItem>

        {/* Section Title & Description with StaggerItem step 1 */}
        <StaggerItem
          step={1}
          className="mb-10 sm:mb-16 md:mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8"
        >
          <div className="max-w-3xl">
            <StaggeredHeading
              as="h2"
              lines={[
                { text: 'Disciplines shaped by light,' },
                { text: 'materiality, and precision.', italic: true },
              ]}
              delay={0.1}
              staggerDelay={0.16}
              duration={0.9}
              className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-[#292722] tracking-[-0.01em]"
            />
          </div>

          <p className="text-sm sm:text-base text-[#34332F]/80 max-w-md font-light leading-relaxed">
            We do not separate architecture from the touch of a door handle. Every project is conceived as an indivisible continuum from topography to bespoke joinery.
          </p>
        </StaggerItem>

        {/* 3 Editorial Discipline Cards with StaggerItem step 2 */}
        <StaggerItem step={2}>
          <div
            onMouseEnter={() => setInViewSection(true)}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 pt-2 sm:pt-4 [perspective:1200px]"
          >
            {servicesData.map((discipline, index) => {
              const isExpanded = expandedId === discipline.id;
              const meta = getDisciplineIconMeta(discipline.id);

              return (
                <ServiceCard
                  key={discipline.id}
                  discipline={discipline}
                  index={index}
                  inViewSection={inViewSection || true}
                  isExpanded={isExpanded}
                  onToggleExpand={() => toggleExpand(discipline.id)}
                  meta={meta}
                />
              );
            })}
          </div>
        </StaggerItem>

        {/* Monograph Craft Continuum Banner with StaggerItem step 3 */}
        <StaggerItem
          step={3}
          className="mt-12 sm:mt-16 md:mt-20 p-6 sm:p-8 md:p-10 bg-[#E8E1D7]/35 border border-[#292722]/15"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.24em] font-mono text-[#777765]">
                Continuum of Execution
              </span>
              <h4 className="text-xl sm:text-2xl font-serif text-[#292722] font-light">
                From monolithic exterior massing to the tactile resistance of a patinated bronze pivot handle.
              </h4>
              <p className="text-xs sm:text-sm text-[#34332F]/80 font-light leading-relaxed">
                By maintaining architectural design, interior architecture, and bespoke millwork under one unified direction, we eliminate compromises between exterior facades and interior cabinetry tolerances.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 border-t lg:border-t-0 lg:border-l border-[#292722]/15 pt-6 lg:pt-0 lg:pl-8 text-xs font-mono text-[#777765]">
              <div>
                <span className="text-[#292722] font-medium block">DIURNAL SOLAR MODELING</span>
                <span>365-day light simulations</span>
              </div>
              <div>
                <span className="text-[#292722] font-medium block">ZERO SYNTHETIC STAINS</span>
                <span>Tannin & natural beeswax patinas</span>
              </div>
              <div>
                <span className="text-[#292722] font-medium block">SHADOW GAP DISCIPLINE</span>
                <span>Concealed reveals & clean junctions</span>
              </div>
            </div>
          </div>
        </StaggerItem>
      </div>
    </StaggerSection>
  );
};
