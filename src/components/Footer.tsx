import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F5F2EC] text-[#292722] border-t border-[#292722]/15 pt-16 pb-12">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#292722]/10">
          {/* Wordmark and statement */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="text-xl font-serif tracking-[0.2em] font-medium text-[#292722] block"
            >
              ATELIER / 08
            </a>
            <p className="text-xs sm:text-sm text-[#777765] font-light max-w-sm leading-relaxed">
              Interior architecture, considered materials, and enduring spaces crafted for quiet contemplation and everyday living.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#777765] block mb-3 font-medium">
              Navigation
            </span>
            <ul className="space-y-1 text-xs uppercase tracking-[0.16em] text-[#34332F]/80">
              <li>
                <a href="#studio" className="hover:text-[#292722] transition-colors py-1 inline-block">Studio</a>
              </li>
              <li>
                <a href="#work" className="hover:text-[#292722] transition-colors py-1 inline-block">Selected Work</a>
              </li>
              <li>
                <a href="#materials" className="hover:text-[#292722] transition-colors py-1 inline-block">Materials & Craft</a>
              </li>
              <li>
                <a href="#approach" className="hover:text-[#292722] transition-colors py-1 inline-block">Approach</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#292722] transition-colors py-1 inline-block">Contact</a>
              </li>
            </ul>
          </div>

          {/* Studio Connections */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#777765] block mb-3 font-medium">
              Correspondence
            </span>
            <div className="space-y-2 text-xs text-[#34332F]/80 font-light">
              <p>Sindhu Bhavan Road, Ahmedabad, India</p>
              <p>
                <a href="mailto:studio@atelier08.design" className="hover:text-[#292722] underline decoration-[#777765]/40 underline-offset-4 transition-colors py-1 inline-block">
                  studio@atelier08.design
                </a>
              </p>
              <p>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#292722] underline decoration-[#777765]/40 underline-offset-4 transition-colors py-1 inline-block">
                  Instagram: @atelier08.studio ↗
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777765] font-light">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-center sm:text-left">
            <span>© {currentYear} ATELIER / 08. All rights reserved.</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span className="italic font-serif text-sm text-[#292722]">Made with intention.</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3 py-2 border border-[#292722]/15 hover:border-[#292722] hover:text-[#292722] transition-colors uppercase tracking-[0.16em] text-[11px] min-h-[44px] cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
