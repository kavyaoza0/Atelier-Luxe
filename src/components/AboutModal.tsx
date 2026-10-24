import React, { useEffect } from 'react';
import { X, ArrowUpRight, Compass, Building, Palette } from 'lucide-react';
import { StaggeredHeading } from './StaggeredHeading';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartProject: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, onStartProject }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 md:p-10 bg-[#292722]/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#F5F2EC] text-[#292722] border border-[#292722]/15 shadow-2xl my-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-5 border-b border-[#292722]/10 bg-[#F5F2EC]">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#777765]">
            Studio Monograph · About Atelier / 08
          </span>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center -mr-1 text-[#292722] hover:text-[#777765] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#292722] cursor-pointer"
            aria-label="Close studio monograph"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[82vh] sm:max-h-[80vh] overflow-y-auto p-5 sm:p-10 md:p-14 space-y-8 sm:space-y-10">
          <div>
            <span className="text-xs uppercase tracking-[0.26em] font-medium text-[#777765] block mb-3">
              Architectural Lineage
            </span>
            <StaggeredHeading
              as="h3"
              lines={[
                { text: 'Rooted in Ahmedabad.' },
                { text: 'Conversing with the world.', italic: true },
              ]}
              animateOnMount={true}
              delay={0.15}
              staggerDelay={0.14}
              duration={0.85}
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#292722] leading-tight"
            />
          </div>

          <div className="space-y-6 text-sm sm:text-base text-[#34332F]/85 font-light leading-relaxed">
            <p>
              Founded in Ahmedabad, ATELIER / 08 draws daily inspiration from the city&apos;s storied dialogue with modern architecture. Surrounded by the profound brick vaults of Louis Kahn, the brutalist concrete poeticism of Le Corbusier, and the climatic sensitivity of Balkrishna Doshi, we approach interior architecture as a continuation of timeless spatial honesty.
            </p>
            <p>
              Our studio rejects transient stylistic trends and disposable surfaces. We believe an interior must possess the quiet gravitas of permanent architecture—orchestrated with honest stones, hand-troweled lime plasters, natural tannins, and tactile textiles that deepen in beauty over decades of domestic use.
            </p>
          </div>

          {/* Heritage & Practice pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-[#292722]/10">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#777765] block mb-2">
                01. The Art of Subtraction
              </span>
              <p className="text-xs sm:text-sm text-[#34332F]/80 font-light leading-relaxed">
                We strip away visual clutter until only essential proportions, sculptural shadows, and authentic textures remain.
              </p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#777765] block mb-2">
                02. The Mastery of Joinery
              </span>
              <p className="text-xs sm:text-sm text-[#34332F]/80 font-light leading-relaxed">
                Every transition between stone, timber, and plaster is custom-detailed at 1:1 scale with generational artisans and stonemasons.
              </p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#777765] block mb-2">
                03. Daylight as Structure
              </span>
              <p className="text-xs sm:text-sm text-[#34332F]/80 font-light leading-relaxed">
                We calibrate aperture positions, courtyard vistas, and matte surfaces to soften harsh sun into a soothing, ambient light bath.
              </p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#777765] block mb-2">
                04. Acoustic Serenity
              </span>
              <p className="text-xs sm:text-sm text-[#34332F]/80 font-light leading-relaxed">
                Quiet luxury is literally quiet. We engineer room acoustics through linen linings, acoustic wool, and micro-climate airflow.
              </p>
            </div>
          </div>

          {/* Practice Details Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#292722]/10 text-xs">
            <div>
              <span className="text-[#777765] uppercase tracking-wider block mb-1">Collaborators</span>
              <p className="font-light text-[#292722]">Trivedi Stone, Studio Kōzo, Jansen Systems</p>
            </div>
            <div>
              <span className="text-[#777765] uppercase tracking-wider block mb-1">Geographic Scope</span>
              <p className="font-light text-[#292722]">Ahmedabad, Mumbai, Delhi, London, Dubai</p>
            </div>
            <div>
              <span className="text-[#777765] uppercase tracking-wider block mb-1">Annual Cap</span>
              <p className="font-light text-[#292722]">Maximum 6 commissions per year</p>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-8 border-t border-[#292722]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs text-[#777765] uppercase tracking-[0.2em]">
              Accepting commissions for 2025 – 2026
            </span>

            <button
              type="button"
              onClick={() => {
                onClose();
                onStartProject();
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium bg-[#292722] text-[#F5F2EC] hover:bg-[#34332F] transition-colors"
            >
              <span>Initiate a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
