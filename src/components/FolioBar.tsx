import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
      // 1. Must be scrolled past hero (~500px)
      const scrolled = window.scrollY > 500;

      // 2. Must not be near the footer
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 650;

      // 3. CRITICAL: Never display while traversing through the 3D Spatial Traversal (#traverse) section
      // to eliminate any collision between "Archive: 01 02 03" and the chamber materials (e.g. Honed Roman Travertine)
      const traverseEl = document.getElementById('traverse');
      let inTraverse = false;
      if (traverseEl) {
        const rect = traverseEl.getBoundingClientRect();
        // Traverse is on-screen if its top is above the bottom of viewport and its bottom is below top of viewport
        inTraverse = rect.top < window.innerHeight - 50 && rect.bottom > 80;
      }

      setIsVisible(scrolled && !nearBottom && !inTraverse);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-40 hidden xl:flex items-center gap-2 bg-[#292722]/95 backdrop-blur-md text-[#F5F2EC] px-4 py-2 border border-[#E8E1D7]/20 shadow-[0_16px_40px_rgba(41,39,34,0.22)]"
        >
          <div className="flex items-center gap-2 pr-3 border-r border-[#E8E1D7]/20 text-[10px] uppercase tracking-[0.22em] text-[#E8E1D7]/80 font-mono">
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
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="pl-3 border-l border-[#E8E1D7]/20 text-[10px] text-[#E8E1D7] uppercase tracking-[0.16em] whitespace-nowrap"
            >
              {hoveredProject.title}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
