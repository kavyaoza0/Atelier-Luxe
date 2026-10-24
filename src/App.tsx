import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StudioIntro } from './components/StudioIntro';
import { SpatialTraversal } from './components/SpatialTraversal';
import { SelectedWork } from './components/SelectedWork';
import { MaterialsStatement } from './components/MaterialsStatement';
import { Services } from './components/Services';
import { Approach } from './components/Approach';
import { Philosophy } from './components/Philosophy';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { AboutModal } from './components/AboutModal';
import { FolioBar } from './components/FolioBar';
import { CustomCursor } from './components/CustomCursor';
import { CursorProvider } from './context/CursorContext';
import { Project } from './types';
import { projects } from './data/projects';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const scrollToContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWork = () => {
    const workEl = document.getElementById('work');
    if (workEl) {
      workEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTraverse = () => {
    const traverseEl = document.getElementById('traverse');
    if (traverseEl) {
      traverseEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToApproach = () => {
    const approachEl = document.getElementById('approach');
    if (approachEl) {
      approachEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <CursorProvider>
      <div className="min-h-screen bg-[#F5F2EC] text-[#292722] font-sans selection:bg-[#E8E1D7] selection:text-[#292722]">
        {/* Custom Editorial Cursor */}
        <CustomCursor />

        {/* 01. Minimal Luxury Navigation */}
        <Navbar onOpenProjectConsultation={scrollToContact} />

        {/* 02. Immersive Hero */}
        <main>
          <Hero
            onExploreWork={scrollToWork}
            onDiscoverApproach={scrollToApproach}
            onTraverseSpace={scrollToTraverse}
          />

          {/* 03. Studio Introduction */}
          <StudioIntro onOpenAbout={() => setIsAboutModalOpen(true)} />

          {/* 04. Spatial Traversal: Scroll Vertically to Traverse Space */}
          <SpatialTraversal onOpenProject={(proj) => setSelectedProject(proj)} />

          {/* 05. Selected Projects */}
          <SelectedWork onOpenProject={(proj) => setSelectedProject(proj)} />

          {/* 05. A Statement About Materials */}
          <MaterialsStatement />

          {/* 06. Disciplines & Practice (Services) */}
          <Services />

          {/* 07. Our Approach & Methodology */}
          <Approach />

          {/* 07. The Studio Philosophy */}
          <Philosophy />

          {/* 08. Contact / Start a Project */}
          <ContactSection />
        </main>

        {/* 09. Minimal Footer */}
        <Footer />

        {/* Architectural Project Monograph Lightbox */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(proj) => setSelectedProject(proj)}
          allProjects={projects}
        />

        {/* Studio Monograph Modal */}
        <AboutModal
          isOpen={isAboutModalOpen}
          onClose={() => setIsAboutModalOpen(false)}
          onStartProject={scrollToContact}
        />

        {/* Discreet Monograph Folio Quick-Jump Bar */}
        <FolioBar onOpenProject={(proj) => setSelectedProject(proj)} />
      </div>
    </CursorProvider>
  );
}
