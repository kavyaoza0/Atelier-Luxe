import React, { useState, useEffect } from 'react';
import { projects } from '../data/projects';
import { Project } from '../types';
import { Layers } from 'lucide-react';

interface FolioBarProps {
  onOpenProject: (project: Project) => void;
}

export const FolioBar: React.FC<FolioBarProps> = ({ onOpenProject }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past hero (~500px) and hide near bottom
      const scrolled = window.scrollY > 500;
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 700;
      setIsVisible(scrolled && !nearBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden xl:flex items-center gap-2 bg-[#292722]/92 backdrop-blur-md text-[#F5F2EC] px-4 py-2 border border-white/10 shadow-[0_12px_36px_rgba(41,39,34,0.18)] animate-fadeIn">
      <div className="flex items-center gap-2 pr-3 border-r border-white/15 text-[10px] uppercase tracking-[0.22em] text-[#E8E1D7]/75">
        <Layers className="w-3.5 h-3.5 text-[#E8E1D7]" />
        <span>Archive:</span>
      </div>

      <div className="flex items-center gap-1">
        {projects.map((proj) => (
          <button
            key={proj.id}
            type="button"
            onClick={() => onOpenProject(proj)}
            onMouseEnter={() => setHoveredProject(proj)}
            onMouseLeave={() => setHoveredProject(null)}
            className="px-2.5 py-1 text-[11px] font-mono hover:bg-white/15 text-[#F5F2EC] transition-colors cursor-pointer"
            aria-label={`Open Plate ${proj.number}: ${proj.title}`}
          >
            {proj.number}
          </button>
        ))}
      </div>

      {hoveredProject && (
        <div className="pl-3 border-l border-white/15 text-[10px] text-[#E8E1D7] uppercase tracking-[0.16em] whitespace-nowrap animate-fadeIn">
          {hoveredProject.title}
        </div>
      )}
    </div>
  );
};
