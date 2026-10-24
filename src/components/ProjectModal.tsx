import React, { useEffect, useState } from 'react';
import { X, ArrowUpRight, Compass, Layers, SunMedium, Users2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  allProjects: Project[];
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSelectProject,
  allProjects,
}) => {
  const [activePlateView, setActivePlateView] = useState<'primary' | 'detail'>('primary');

  useEffect(() => {
    setActivePlateView('primary');
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  const currentImage = activePlateView === 'detail' && project.detailImage
    ? project.detailImage
    : project.image;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 md:p-10 bg-[#292722]/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#F5F2EC] text-[#292722] border border-[#292722]/15 shadow-2xl my-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar inside modal */}
        <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-5 border-b border-[#292722]/10 bg-[#F5F2EC]">
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#777765]">
            <span>Plate {project.number}</span>
            <span aria-hidden="true">·</span>
            <span>{project.category}</span>
            {project.details.coordinates && (
              <>
                <span aria-hidden="true" className="hidden sm:inline">·</span>
                <span className="hidden sm:inline font-mono">{project.details.coordinates}</span>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center -mr-1 text-[#292722] hover:text-[#777765] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#292722] cursor-pointer"
            aria-label="Close project monograph"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="max-h-[84vh] sm:max-h-[82vh] overflow-y-auto p-4 sm:p-8 md:p-12">
          {/* Main Visual Frame with Dual-Plate Toggle */}
          <div className="relative aspect-[4/5] sm:aspect-[16/9] w-full overflow-hidden bg-[#E8E1D7] mb-6 border border-[#292722]/10">
            <img
              src={currentImage}
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-500"
              onError={(e) => {
                const target = e.currentTarget;
                const fallback = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85';
                if (target.src !== fallback) target.src = fallback;
              }}
              referrerPolicy="no-referrer"
            />

            {/* Monograph corner badge */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-sans text-white/95 bg-[#292722]/80 px-2.5 py-1 backdrop-blur-sm">
              {activePlateView === 'detail' ? 'Plate Detail · Architectural Study' : 'Plate Primary · Living Spatial Volume'}
            </div>

            {/* Bottom Plate Selectors */}
            {project.detailImage && (
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-1 bg-[#292722]/85 backdrop-blur-md p-1 border border-white/10">
                <button
                  type="button"
                  onClick={() => setActivePlateView('primary')}
                  className={`px-3 py-1.5 min-h-[36px] inline-flex items-center text-[10px] uppercase tracking-[0.16em] transition-all cursor-pointer ${
                    activePlateView === 'primary'
                      ? 'bg-[#E8E1D7] text-[#292722] font-semibold shadow-xs'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  View 01 (Chamber)
                </button>
                <button
                  type="button"
                  onClick={() => setActivePlateView('detail')}
                  className={`px-3 py-1.5 min-h-[36px] inline-flex items-center text-[10px] uppercase tracking-[0.16em] transition-all cursor-pointer ${
                    activePlateView === 'detail'
                      ? 'bg-[#E8E1D7] text-[#292722] font-semibold shadow-xs'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  View 02 (Detail)
                </button>
              </div>
            )}
          </div>

          {/* Editorial Title & Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-[#292722]/10">
            <div className="lg:col-span-7">
              <span className="text-xs uppercase tracking-[0.22em] text-[#777765] block mb-2">
                Project Monograph Archive
              </span>
              <h3
                id="modal-project-title"
                className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#292722] mb-2"
              >
                {project.title}
              </h3>
              {project.subtitle && (
                <p className="text-xs sm:text-sm text-[#777765] uppercase tracking-[0.18em] mb-4">
                  {project.subtitle}
                </p>
              )}
              <p className="text-base sm:text-lg text-[#34332F]/90 font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between py-1.5 border-b border-[#292722]/10">
                  <span className="text-[#777765] uppercase tracking-wider">Location</span>
                  <span className="font-medium text-[#292722]">{project.location}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#292722]/10">
                  <span className="text-[#777765] uppercase tracking-wider">Spatial Scale</span>
                  <span className="font-medium text-[#292722]">{project.details.area}</span>
                </div>
                {project.details.orientation && (
                  <div className="flex justify-between py-1.5 border-b border-[#292722]/10">
                    <span className="text-[#777765] uppercase tracking-wider">Orientation</span>
                    <span className="font-medium text-[#292722] text-right">{project.details.orientation}</span>
                  </div>
                )}
                {project.details.lightingTemp && (
                  <div className="flex justify-between py-1.5 border-b border-[#292722]/10">
                    <span className="text-[#777765] uppercase tracking-wider">Light Optics</span>
                    <span className="font-medium text-[#292722] text-right">{project.details.lightingTemp}</span>
                  </div>
                )}
                <div className="flex justify-between py-1.5 border-b border-[#292722]/10">
                  <span className="text-[#777765] uppercase tracking-wider">Year Completed</span>
                  <span className="font-medium text-[#292722]">{project.year}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Architectural Concept & Materiality */}
          <div className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 border-b border-[#292722]/10">
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#777765] flex items-center gap-2">
                <Compass className="w-3.5 h-3.5" />
                <span>Spatial Concept</span>
              </h4>
              <p className="text-sm sm:text-base text-[#34332F]/85 font-light leading-relaxed">
                {project.details.concept}
              </p>

              <div className="pt-4 space-y-2">
                <h5 className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#777765]">
                  Key Architectural Interventions
                </h5>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[#34332F]/80">
                  {project.details.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#777765]">—</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#777765] flex items-center gap-2 mb-3">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Material Palette</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.details.materials.map((mat, i) => (
                    <span
                      key={i}
                      className="text-xs bg-[#E8E1D7] text-[#292722] px-3 py-1.5 font-light border border-[#292722]/5"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              {project.details.artisanCredits && (
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-[#777765] flex items-center gap-2 mb-2">
                    <Users2 className="w-3.5 h-3.5" />
                    <span>Artisan & Atelier Collaborators</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-[#34332F]/75 font-light">
                    {project.details.artisanCredits.map((credit, i) => (
                      <li key={i}>· {credit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Next Project Footer Link */}
          <div className="pt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="text-xs uppercase tracking-[0.2em] text-[#777765] hover:text-[#292722] transition-colors"
            >
              ← Back to Gallery
            </button>

            <button
              type="button"
              onClick={() => onSelectProject(nextProject)}
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#292722] hover:text-[#777765] transition-colors"
            >
              <span>Next: {nextProject.title}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
