import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Mail, MapPin, Instagram, Clock, Phone, Sparkles, SlidersHorizontal, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { StaggeredHeading } from './StaggeredHeading';
import { Magnetic } from './Magnetic';

interface TypologyOption {
  id: string;
  label: string;
  desc: string;
}

interface ScopeOption {
  id: string;
  label: string;
  tag: string;
}

interface InvestmentTier {
  id: number;
  label: string;
  range: string;
  timeline: string;
  scopeSummary: string;
}

const PROJECT_TYPOLOGIES: TypologyOption[] = [
  { id: 'Private Residence', label: 'Private Residence', desc: 'Bespoke independent architectural villa' },
  { id: 'Penthouse Flat', label: 'Penthouse Flat', desc: 'High-altitude panoramic apartment envelope' },
  { id: 'Heritage Restoration', label: 'Heritage Restoration', desc: 'Historical lime & stone conservation' },
  { id: 'Sculptural Pavilion', label: 'Sculptural Pavilion', desc: 'Garden retreat, tea house or private library' },
  { id: 'Commercial Gallery', label: 'Commercial Gallery', desc: 'Boutique atelier, workspace or gallery volume' },
];

const SPATIAL_SCOPES: ScopeOption[] = [
  { id: '< 3,500 sq.ft', label: '< 3,500 sq.ft', tag: 'Intimate Sanctuary' },
  { id: '3,500 – 7,500 sq.ft', label: '3,500 – 7,500 sq.ft', tag: 'Substantial Residence' },
  { id: '7,500 – 15,000 sq.ft', label: '7,500 – 15,000 sq.ft', tag: 'Architectural Compound' },
  { id: '15,000+ sq.ft', label: '15,000+ sq.ft', tag: 'Estate Demesne' },
];

const INVESTMENT_TIERS: InvestmentTier[] = [
  {
    id: 0,
    label: 'Curated Architectural Interior',
    range: '₹1.5Cr – ₹3Cr ($180k – $360k)',
    timeline: '6–8 Months Inception to Handover',
    scopeSummary: 'Custom fluted millwork, architectural 2700K lighting & tactile plaster envelope.',
  },
  {
    id: 1,
    label: 'Comprehensive Master Craft',
    range: '₹3Cr – ₹6Cr ($360k – $720k)',
    timeline: '8–14 Months Inception to Handover',
    scopeSummary: 'Full Roman travertine stonecraft, bespoke cast bronze joinery & 1:1 physical sample trays.',
  },
  {
    id: 2,
    label: 'Monolithic Turnkey Monograph',
    range: '₹6Cr+ ($720k+)',
    timeline: '14–20 Months Inception to Handover',
    scopeSummary: 'Uncompromising principal supervision, custom furniture suites, artisan commissioning & turnkey styling.',
  },
];

const AESTHETIC_AFFINITIES = [
  'Raw Travertine & Lime Plaster',
  'Wire-Brushed Oak & Belgian Linen',
  'Monolithic Cast Bronze & Slate',
  'Subcontinental Courtyard Light',
];

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Private Residence',
    scope: '3,500 – 7,500 sq.ft',
    investmentTierIndex: 1,
    aesthetic: 'Raw Travertine & Lime Plaster',
    location: '',
    timeline: 'Within 6 months',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBrief, setSubmittedBrief] = useState<typeof formData | null>(null);
  const [briefRef, setBriefRef] = useState<string>('');
  const shouldReduceMotion = useReducedMotion();

  const currentTier = INVESTMENT_TIERS[formData.investmentTierIndex] || INVESTMENT_TIERS[1];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your full name';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.description.trim()) {
      errs.description = 'Please provide a brief outline of your space or vision';
    } else if (formData.description.trim().length < 15) {
      errs.description = 'Please share at least a few details (minimum 15 characters)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setBriefRef(`ATL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
      setSubmittedBrief({ ...formData });
    }, 600);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 md:py-40 bg-[#F5F2EC] border-t border-[#292722]/10 relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12">
        {/* Folio Header with Expanding Hairline */}
        <div className="relative pb-6 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-[#777765]"
          >
            <span>04 — Your Space, Reimagined</span>
            <span className="hidden sm:inline">Commission Intake & Architectural Dossier</span>
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

        {/* Section Heading & Studio Capacity Indicator */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-20">
          <div>
            <StaggeredHeading
              as="h2"
              lines={[
                { text: 'Have a space' },
                { text: 'in mind?', italic: true },
              ]}
              delay={0.1}
              staggerDelay={0.16}
              duration={0.9}
              className="text-4xl sm:text-6xl md:text-7xl font-serif font-light text-[#292722] tracking-[-0.015em]"
            />
            <p className="mt-4 text-base sm:text-lg text-[#34332F]/80 font-light max-w-xl leading-relaxed">
              Tell us a little about what you're imagining. We review every architectural inquiry personally.
            </p>
          </div>

          {/* Live Studio Capacity Availability Badge */}
          <div className="bg-[#E8E1D7]/70 border border-[#292722]/15 p-4 sm:p-5 max-w-md shrink-0 shadow-xs">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#292722] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#292722]" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] font-mono font-medium text-[#292722]">
                Studio Availability Status
              </span>
            </div>
            <p className="text-xs text-[#34332F]/85 font-light leading-relaxed">
              Accepting commissions for <strong className="font-medium text-[#292722]">Q4 2026 / Q1 2027</strong>.
              Currently <strong className="font-medium text-[#292722]">2 of 4</strong> residential envelopes allocated.
            </p>
          </div>
        </div>

        {/* Contact Layout: Interactive Form + Studio Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Interactive Form Column */}
          <div className="lg:col-span-7 bg-[#F5F2EC] p-6 sm:p-10 border border-[#292722]/15 shadow-[0_8px_32px_rgba(41,39,34,0.03)]">
            <AnimatePresence mode="wait">
              {submittedBrief ? (
                <motion.div
                  key="submitted"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6 py-4"
                >
                  <div className="flex items-center gap-3 text-[#292722]">
                    <CheckCircle2 className="w-6 h-6 text-[#1E1B18]" />
                    <div>
                      <h3 className="font-serif text-2xl text-[#1E1B18]">Project Brief Staged</h3>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#777765]">
                        Reference: {briefRef}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-[#34332F]/85 font-light leading-relaxed">
                    Thank you, <strong className="font-medium text-[#292722]">{submittedBrief.name}</strong>. Your consultation dossier for a <strong className="font-medium text-[#292722]">{submittedBrief.projectType}</strong> project ({submittedBrief.scope}) has been compiled.
                  </p>

                  {/* Structured Architectural Dossier Preview */}
                  <div className="bg-[#E8E1D7] p-6 text-xs text-[#292722] space-y-2.5 border border-[#292722]/15 font-mono shadow-xs">
                    <div className="flex items-center justify-between border-b border-[#292722]/15 pb-2 mb-2 font-bold uppercase tracking-wider">
                      <span>Atelier / 08 Commission Intake</span>
                      <span>{briefRef}</span>
                    </div>
                    <div><span className="text-[#777765]">Client:</span> {submittedBrief.name} &lt;{submittedBrief.email}&gt;</div>
                    {submittedBrief.phone && <div><span className="text-[#777765]">Phone:</span> {submittedBrief.phone}</div>}
                    <div><span className="text-[#777765]">Typology:</span> {submittedBrief.projectType} · {submittedBrief.scope}</div>
                    <div><span className="text-[#777765]">Investment Scale:</span> {currentTier.range} ({currentTier.label})</div>
                    <div><span className="text-[#777765]">Material Affinity:</span> {submittedBrief.aesthetic}</div>
                    <div><span className="text-[#777765]">Location:</span> {submittedBrief.location || 'Ahmedabad / India / Global'}</div>
                    <div><span className="text-[#777765]">Target Schedule:</span> {submittedBrief.timeline}</div>
                    <div className="pt-2 border-t border-[#292722]/15 text-[#292722]/90 italic">
                      "{submittedBrief.description}"
                    </div>
                  </div>

                  <p className="text-xs text-[#777765] font-light leading-relaxed">
                    Our principal architectural partners personally review every dossier to ensure alignment with our current commission schedule. We respond within two business days.
                  </p>

                  <div className="pt-4 flex flex-wrap gap-4">
                    <Magnetic strength={0.25} maxDisplacement={4}>
                      <a
                        href={`mailto:studio@atelier08.design?subject=${encodeURIComponent(`[${briefRef}] Project Inquiry: ${submittedBrief.projectType} - ${submittedBrief.name}`)}&body=${encodeURIComponent(
                          `Client: ${submittedBrief.name}\nEmail: ${submittedBrief.email}\nPhone: ${submittedBrief.phone || 'N/A'}\nTypology: ${submittedBrief.projectType}\nScope: ${submittedBrief.scope}\nInvestment Tier: ${currentTier.range}\nMaterial Affinity: ${submittedBrief.aesthetic}\nLocation: ${submittedBrief.location || 'Flexible'}\nTimeline: ${submittedBrief.timeline}\n\nProject Vision:\n${submittedBrief.description}`
                        )}`}
                        className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-[0.18em] font-medium bg-[#1E1B18] text-[#F5F2EC] hover:bg-[#34332F] transition-colors"
                      >
                        <span>Launch Direct Email Client</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </Magnetic>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedBrief(null);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          projectType: 'Private Residence',
                          scope: '3,500 – 7,500 sq.ft',
                          investmentTierIndex: 1,
                          aesthetic: 'Raw Travertine & Lime Plaster',
                          location: '',
                          timeline: 'Within 6 months',
                          description: '',
                        });
                      }}
                      className="px-6 py-3 text-xs uppercase tracking-[0.18em] font-medium border border-[#292722]/30 text-[#292722] hover:bg-[#E8E1D7] transition-colors cursor-pointer"
                    >
                      Draft Another Inquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-7">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs uppercase tracking-[0.2em] font-medium text-[#292722] mb-2 font-mono">
                        Full Name <span className="text-[#777765]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Maya Mehta"
                        className={`w-full bg-[#E8E1D7]/40 border ${
                          errors.name ? 'border-red-600' : 'border-[#292722]/20'
                        } px-4 py-3 text-base sm:text-sm text-[#292722] placeholder-[#777765]/60 focus:outline-none focus:border-[#292722] transition-colors`}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs uppercase tracking-[0.2em] font-medium text-[#292722] mb-2 font-mono">
                        Email Address <span className="text-[#777765]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. maya@example.com"
                        className={`w-full bg-[#E8E1D7]/40 border ${
                          errors.email ? 'border-red-600' : 'border-[#292722]/20'
                        } px-4 py-3 text-base sm:text-sm text-[#292722] placeholder-[#777765]/60 focus:outline-none focus:border-[#292722] transition-colors`}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Interactive Project Typology Selector Tiles */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] font-medium text-[#292722] mb-2.5 font-mono">
                      Project Typology
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      {PROJECT_TYPOLOGIES.map((typology) => {
                        const isActive = formData.projectType === typology.id;
                        return (
                          <button
                            key={typology.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, projectType: typology.id })}
                            className={`p-3 text-left border transition-all duration-200 cursor-pointer ${
                              isActive
                                ? 'bg-[#1E1B18] text-[#F5F2EC] border-[#1E1B18] shadow-sm translate-y-[-1px]'
                                : 'bg-[#E8E1D7]/30 text-[#292722] border-[#292722]/15 hover:border-[#292722]/40 hover:bg-[#E8E1D7]/60'
                            }`}
                          >
                            <span className="block text-xs uppercase tracking-[0.14em] font-medium mb-1">
                              {typology.label}
                            </span>
                            <span className={`block text-[10px] leading-snug line-clamp-2 ${
                              isActive ? 'text-[#F5F2EC]/75' : 'text-[#777765]'
                            }`}>
                              {typology.desc}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Interactive Spatial Scale Pills */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] font-medium text-[#292722] mb-2.5 font-mono">
                      Spatial Scale
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {SPATIAL_SCOPES.map((scope) => {
                        const isActive = formData.scope === scope.id;
                        return (
                          <button
                            key={scope.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, scope: scope.id })}
                            className={`py-2.5 px-3 text-center border transition-all duration-200 cursor-pointer ${
                              isActive
                                ? 'bg-[#1E1B18] text-[#F5F2EC] border-[#1E1B18] shadow-xs'
                                : 'bg-[#E8E1D7]/30 text-[#292722] border-[#292722]/15 hover:border-[#292722]'
                            }`}
                          >
                            <span className="block text-[11px] font-mono font-medium">
                              {scope.label}
                            </span>
                            <span className={`block text-[9px] uppercase tracking-wider mt-0.5 ${
                              isActive ? 'text-[#F5F2EC]/70' : 'text-[#777765]'
                            }`}>
                              {scope.tag}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Interactive Commission Investment Scale Slider */}
                  <div className="bg-[#E8E1D7]/50 p-5 border border-[#292722]/15 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-[#292722]/10">
                      <div className="flex items-center gap-2">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-[#1E1B18]" />
                        <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#1E1B18] font-mono">
                          Commission Investment Scale
                        </span>
                      </div>
                      <span className="text-xs font-mono font-medium text-[#1E1B18]">
                        {currentTier.range}
                      </span>
                    </div>

                    {/* Range Slider Control */}
                    <div className="py-3 sm:py-2">
                      <input
                        type="range"
                        min="0"
                        max="2"
                        step="1"
                        value={formData.investmentTierIndex}
                        onChange={(e) => setFormData({ ...formData, investmentTierIndex: parseInt(e.target.value, 10) })}
                        className="w-full accent-[#1E1B18] cursor-pointer h-2 bg-[#292722]/20 rounded-none touch-pan-x"
                      />
                      <div className="flex justify-between text-[9px] uppercase tracking-wider font-mono text-[#777765] pt-2.5">
                        <span>Tier I: Interior</span>
                        <span>Tier II: Master Craft</span>
                        <span>Tier III: Turnkey</span>
                      </div>
                    </div>

                    {/* Dynamic Scope Summary Box */}
                    <div className="bg-[#F5F2EC] p-3 text-xs border border-[#292722]/10 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#777765]">
                        <span className="text-[#1E1B18] font-medium uppercase">{currentTier.label}</span>
                        <span>{currentTier.timeline}</span>
                      </div>
                      <p className="text-[#34332F]/85 font-light text-[11px] leading-relaxed">
                        {currentTier.scopeSummary}
                      </p>
                    </div>
                  </div>

                  {/* Material Affinity & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] font-medium text-[#292722] mb-2 font-mono">
                        Material Affinity
                      </label>
                      <select
                        value={formData.aesthetic}
                        onChange={(e) => setFormData({ ...formData, aesthetic: e.target.value })}
                        className="w-full bg-[#E8E1D7]/40 border border-[#292722]/20 px-4 py-3 text-base sm:text-xs uppercase tracking-wider text-[#292722] focus:outline-none focus:border-[#292722] transition-colors cursor-pointer"
                      >
                        {AESTHETIC_AFFINITIES.map((aes) => (
                          <option key={aes} value={aes}>{aes}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="location" className="block text-xs uppercase tracking-[0.2em] font-medium text-[#292722] mb-2 font-mono">
                        Project Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Ahmedabad, Mumbai, London"
                        className="w-full bg-[#E8E1D7]/40 border border-[#292722]/20 px-4 py-3 text-base sm:text-sm text-[#292722] placeholder-[#777765]/60 focus:outline-none focus:border-[#292722] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label htmlFor="description" className="block text-xs uppercase tracking-[0.2em] font-medium text-[#292722] mb-2 font-mono">
                      Project Vision & Lifestyle Rituals <span className="text-[#777765]">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the architectural envelope, orientation, daylight requirements, or rituals you envision..."
                      className={`w-full bg-[#E8E1D7]/40 border ${
                        errors.description ? 'border-red-600' : 'border-[#292722]/20'
                      } px-4 py-3 text-base sm:text-sm text-[#292722] placeholder-[#777765]/60 focus:outline-none focus:border-[#292722] transition-colors`}
                    />
                    {errors.description && (
                      <p className="mt-1.5 text-xs text-red-600">{errors.description}</p>
                    )}
                  </div>

                  {/* Submit Button Wrapped in Magnetic */}
                  <div className="pt-2">
                    <Magnetic strength={0.25} maxDisplacement={5}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 min-h-[48px] text-xs uppercase tracking-[0.22em] font-medium bg-[#1E1B18] text-[#F5F2EC] hover:bg-[#34332F] transition-all disabled:opacity-50 cursor-pointer shadow-xs"
                      >
                        <span>{isSubmitting ? 'Compiling Dossier...' : 'Stage Architectural Dossier'}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </Magnetic>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>

          {/* Studio Details Column with Monograph Aesthetic */}
          <div className="lg:col-span-5 space-y-10 lg:pl-4">
            <div>
              <span className="text-xs uppercase tracking-[0.26em] font-medium text-[#777765] block mb-3 font-mono">
                Studio Headquarters · Practice Datum
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#292722] mb-4">
                Atelier / 08 Studio
              </h3>
              <p className="text-sm text-[#34332F]/80 font-light leading-relaxed">
                We accept a strictly limited number of commissions each year to ensure uncompromising creative immersion, material honesty, and on-site oversight from inception to handover.
              </p>
            </div>

            <div className="space-y-6 pt-2 border-t border-[#292722]/15 text-sm">
              <div className="flex items-start gap-4">
                <MapPin className="w-4 h-4 text-[#777765] mt-1 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#777765] block mb-0.5 font-mono">Location</span>
                  <p className="text-[#292722] font-light">
                    Sindhu Bhavan Road, Bodakdev,<br />
                    Ahmedabad, Gujarat 380054, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-4 h-4 text-[#777765] mt-1 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#777765] block mb-0.5 font-mono">Inquiries</span>
                  <a
                    href="mailto:studio@atelier08.design"
                    className="text-[#292722] hover:text-[#777765] transition-colors font-light"
                  >
                    studio@atelier08.design
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-4 h-4 text-[#777765] mt-1 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#777765] block mb-0.5 font-mono">Direct Line</span>
                  <a
                    href="tel:+917926560808"
                    className="text-[#292722] hover:text-[#777765] transition-colors font-light"
                  >
                    +91 (0) 79 2656 0808
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-4 h-4 text-[#777765] mt-1 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#777765] block mb-0.5 font-mono">Consultations</span>
                  <p className="text-[#292722] font-light">
                    Monday — Friday, 10:00 – 18:30 IST<br />
                    By prior appointment only
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Instagram className="w-4 h-4 text-[#777765] mt-1 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#777765] block mb-0.5 font-mono">Monograph Journal</span>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#292722] hover:text-[#777765] transition-colors font-light"
                  >
                    @atelier08.studio ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
