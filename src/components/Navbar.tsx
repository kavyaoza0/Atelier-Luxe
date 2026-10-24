import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { Magnetic } from './Magnetic';

interface NavbarProps {
  onOpenProjectConsultation: () => void;
}

const NAV_LINKS = [
  { href: '#studio', label: 'Studio', number: '01' },
  { href: '#traverse', label: 'Traverse Space', number: '02', tag: '3D Spatial' },
  { href: '#work', label: 'Selected Work', number: '03', tag: 'Monograph' },
  { href: '#materials', label: 'Materials & Craft', number: '04' },
  { href: '#services', label: 'Services', number: '05' },
  { href: '#approach', label: 'Our Approach', number: '06' },
  { href: '#contact', label: 'Contact', number: '07' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenProjectConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when full-screen mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F5F2EC]/92 backdrop-blur-md border-b border-[#292722]/10 py-3.5 sm:py-4 shadow-[0_4px_30px_rgba(41,39,34,0.03)]'
            : 'bg-transparent py-5 sm:py-6 md:py-8'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between gap-6">
          {/* Zone 1: Single Text Element Wordmark */}
          <a
            href="#"
            className="text-base sm:text-lg md:text-xl font-serif tracking-[0.22em] font-medium text-[#292722] hover:opacity-75 transition-opacity whitespace-nowrap shrink-0"
          >
            ATELIER / 08
          </a>

          {/* Zone 2: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-10 text-[11px] uppercase tracking-[0.22em] font-medium text-[#34332F]/80">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[#292722] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#292722] hover:after:w-full after:transition-all whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <Magnetic strength={0.25} maxDisplacement={5}>
              <button
                type="button"
                onClick={onOpenProjectConsultation}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-[11px] uppercase tracking-[0.2em] font-medium text-[#292722] border border-[#292722]/30 hover:border-[#292722] hover:bg-[#292722] hover:text-[#F5F2EC] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </Magnetic>

            {/* Mobile Hamburger Trigger (44px min touch target) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden flex items-center justify-center w-11 h-11 -mr-2 text-[#292722] hover:opacity-75 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#292722] cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Slim Scroll Reading Progress Hairline */}
        <motion.div
          style={{ scaleX: scrollYProgress, originX: 0 }}
          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#292722]/25"
        />
      </header>

      {/* Full-Screen Editorial Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#F5F2EC] flex flex-col justify-between overflow-y-auto no-scrollbar md:hidden"
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#292722]/10">
              <span className="text-base font-serif tracking-[0.22em] font-medium text-[#292722]">
                ATELIER / 08
              </span>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-11 h-11 -mr-2 text-[#292722] hover:opacity-75 focus:outline-none cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation List with 48px+ touch targets and Staggered Motion */}
            <nav className="flex-1 flex flex-col justify-center px-6 sm:px-10 py-6 divide-y divide-[#292722]/10">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.04 * idx, ease: [0.16, 1, 0.3, 1] }}
                  className="min-h-[52px] flex items-center justify-between py-3.5 text-[#292722] hover:text-[#777765] transition-colors"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] text-[#777765]">{link.number}</span>
                    <span className="text-2xl sm:text-3xl font-serif font-light tracking-[-0.01em]">
                      {link.label}
                    </span>
                  </div>
                  {link.tag && (
                    <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-[#777765] bg-[#E8E1D7] px-2 py-0.5">
                      {link.tag}
                    </span>
                  )}
                </motion.a>
              ))}
            </nav>

            {/* Bottom Actions & Studio Location */}
            <div className="p-6 border-t border-[#292722]/10 space-y-4 bg-[#E8E1D7]/30">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenProjectConsultation();
                }}
                className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-medium bg-[#1E1B18] text-[#F5F2EC] hover:bg-[#34332F] transition-colors cursor-pointer"
              >
                <span>Start a Project Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-between text-[10px] text-[#777765] tracking-[0.16em] uppercase font-mono pt-1">
                <span>Ahmedabad · 23°02'N</span>
                <span>Commissions Open</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
