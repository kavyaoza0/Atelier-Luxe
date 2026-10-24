import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Compass,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ChevronDown,
  ArrowUpRight,
  Sparkles,
  Layers,
  Eye,
  Info,
  X,
  Sliders,
  MoveDown
} from 'lucide-react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
} from 'motion/react';
import { Project } from '../types';
import { projects } from '../data/projects';
import { useCursor } from '../context/CursorContext';
import { StaggeredHeading } from './StaggeredHeading';

interface Hotspot {
  id: string;
  title: string;
  category: string;
  spec: string;
  x: number; // percentage from left
  y: number; // percentage from top
  detailImage: string;
  artisanCredit: string;
}

interface SpatialChamber {
  id: string;
  projectId: string;
  number: string;
  code: string;
  name: string;
  subtitle: string;
  depthStart: number; // meters
  depthEnd: number; // meters
  elevation: string;
  orientation: string;
  lightingTemp: string;
  luxLevel: string;
  acousticReverb: string;
  quote: string;
  materials: string[];
  image: string;
  detailImage: string;
  hotspots: Hotspot[];
}

const CHAMBERS: SpatialChamber[] = [
  {
    id: 'chamber-01',
    projectId: 'quiet-residence',
    number: '01',
    code: '01. Atrium',
    name: 'The Courtyard Atrium',
    subtitle: 'Acoustic Sanctuary & Light Wells',
    depthStart: 0,
    depthEnd: 12,
    elevation: '+0.00m Ground Datum',
    orientation: 'North-East 42° Courtyard Axis',
    lightingTemp: '2700K Solar Ingress',
    luxLevel: '480 Lux Ambient',
    acousticReverb: 'RT60 0.35s · Fabric Dampened',
    quote: 'A transition from the intense daylight of the subcontinent into a muted, tactile sanctuary.',
    materials: ['Honed Roman Travertine', 'Custom Fluted White Oak', 'Unbleached Belgian Linen'],
    image: '/images/project_quiet_residence_1791807431306.jpg',
    detailImage: '/images/detail_courtyard_light_1791808661946.jpg',
    hotspots: [
      {
        id: 'spot-01-travertine',
        title: 'Floating Travertine Plinth',
        category: 'Stonecraft',
        spec: '60mm honed Roman travertine with 12mm recessed shadow-gap hearth datum.',
        x: 64,
        y: 74,
        detailImage: '/images/detail_courtyard_light_1791808661946.jpg',
        artisanCredit: 'Master Stonemasonry: Trivedi Stone Atelier',
      },
      {
        id: 'spot-01-louvres',
        title: 'Acoustic Oak Louvres',
        category: 'Millwork',
        spec: 'Continuous vertical white oak acoustic fins absorbing street reverberation.',
        x: 28,
        y: 46,
        detailImage: '/images/detail_courtyard_light_1791808661946.jpg',
        artisanCredit: 'Custom Joinery: Studio Kōzo',
      },
    ],
  },
  {
    id: 'chamber-02',
    projectId: 'limestone-house',
    number: '02',
    code: '02. Hearth',
    name: 'The Monolithic Hearth',
    subtitle: 'Curved Plaster & Unfilled Stone',
    depthStart: 12,
    depthEnd: 24,
    elevation: '+0.45m Raised Plinth',
    orientation: 'South-West 220° Clerestory Capture',
    lightingTemp: '2400K Architectural Grazing',
    luxLevel: '320 Lux Focused',
    acousticReverb: 'RT60 0.45s · Convex Plaster Diffusion',
    quote: 'A 2.4-tonne unpolished limestone hearth anchors the gravitational weight of the room.',
    materials: ['Jodhpur Limestone', 'Venetian Lime Plaster', 'Microcement Screed'],
    image: '/images/project_limestone_house_1791807444900.jpg',
    detailImage: '/images/detail_travertine_joinery_1791808649499.jpg',
    hotspots: [
      {
        id: 'spot-02-hearth',
        title: 'Monolithic Carved Hearth',
        category: 'Mineral Mass',
        spec: 'Quarried Jodhpur limestone block with hand-chiselled vertical texture.',
        x: 52,
        y: 62,
        detailImage: '/images/detail_travertine_joinery_1791808649499.jpg',
        artisanCredit: 'Limestone Extraction: Makrana Quarries',
      },
      {
        id: 'spot-02-plaster',
        title: 'Continuous Curved Plaster',
        category: 'Surface Finish',
        spec: 'Venetian lime plaster applied with zero visible joints or framing reveals.',
        x: 76,
        y: 36,
        detailImage: '/images/detail_travertine_joinery_1791808649499.jpg',
        artisanCredit: 'Plaster Guild: Stucco Veneziano Guild',
      },
    ],
  },
  {
    id: 'chamber-03',
    projectId: 'form-function',
    number: '03',
    code: '03. Horizon',
    name: 'The Sea Horizon Library',
    subtitle: 'Double-Height Timber & Coastal Light',
    depthStart: 24,
    depthEnd: 36,
    elevation: '+4.20m Mezzanine Elevation',
    orientation: 'Westward 270° Arabian Sea Panorama',
    lightingTemp: '2700K Architectural Diffuse',
    luxLevel: '620 Lux Natural Reflection',
    acousticReverb: 'RT60 0.38s · Solid Walnut Diffraction',
    quote: 'A vertical cathedral of monographs framing the endless horizon of the Arabian sea.',
    materials: ['Smoked American Walnut', 'Brushed Warm Bronze', 'Calacatta Paonazzo'],
    image: '/images/project_form_function_1791807457421.jpg',
    detailImage: '/images/detail_bespoke_oak_library_1791808673965.jpg',
    hotspots: [
      {
        id: 'spot-03-library',
        title: 'Bespoke Walnut Joinery',
        category: 'Architecture Millwork',
        spec: '6.4m vertical smoked walnut bookcase with integrated indirect linear warm LEDs.',
        x: 34,
        y: 48,
        detailImage: '/images/detail_bespoke_oak_library_1791808673965.jpg',
        artisanCredit: 'Cabinetry: Ebano Millwork',
      },
      {
        id: 'spot-03-bronze',
        title: 'Brushed Warm Bronze Apertures',
        category: 'Metalcraft',
        spec: 'Hand-patinated architectural bronze handles and slender pivot profiles.',
        x: 72,
        y: 72,
        detailImage: '/images/detail_bespoke_oak_library_1791808673965.jpg',
        artisanCredit: 'Patination: Studio Bronzista Milan',
      },
    ],
  },
  {
    id: 'chamber-04',
    projectId: 'living-gallery',
    number: '04',
    code: '04. Pavilion',
    name: 'The Living Gallery Pavilion',
    subtitle: 'Tactile Concrete & Garden Threshold',
    depthStart: 36,
    depthEnd: 48,
    elevation: '+0.00m In-Situ Terrazzo Datum',
    orientation: 'Dual 180° Garden Cross-Axis',
    lightingTemp: '2700K Museum Standard CRI 98',
    luxLevel: '390 Lux Calibrated',
    acousticReverb: 'RT60 0.52s · Courtyard Reverberance',
    quote: 'The boundary between internal meditation and the sculpture garden dissolves completely.',
    materials: ['Board-Marked Concrete', 'In-Situ Terrazzo', 'Dark Teak Joinery'],
    image: '/images/project_living_gallery_1791807515327.jpg',
    detailImage: '/images/philosophy_architectural_detail_1791807531294.jpg',
    hotspots: [
      {
        id: 'spot-04-concrete',
        title: 'Board-Marked Architectural Concrete',
        category: 'Structural Finish',
        spec: 'Poured in-situ with grain-transferred Douglas fir timber formwork.',
        x: 28,
        y: 56,
        detailImage: '/images/philosophy_architectural_detail_1791807531294.jpg',
        artisanCredit: 'Concrete Craft: Studio Terrazzieri',
      },
      {
        id: 'spot-04-terrazzo',
        title: 'River Pebble Terrazzo Screed',
        category: 'Seamless Flooring',
        spec: 'Locally gathered Sabarmati river stones diamond-honed to matte satin finish.',
        x: 58,
        y: 84,
        detailImage: '/images/philosophy_architectural_detail_1791807531294.jpg',
        artisanCredit: 'Aggregate Extraction: Sabarmati Basin Quarry',
      },
    ],
  },
];

interface SpatialTraversalProps {
  onOpenProject: (project: Project) => void;
}

export const SpatialTraversal: React.FC<SpatialTraversalProps> = ({ onOpenProject }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscNodeRef = useRef<OscillatorNode | null>(null);

  const shouldReduceMotion = useReducedMotion();
  const { setCursor, resetCursor } = useCursor();

  const [activeChamberIndex, setActiveChamberIndex] = useState(0);
  const [currentDepth, setCurrentDepth] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMouseInteracting, setIsMouseInteracting] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Scroll tracking across the 480vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track depth progress from 0m to 48m
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const rawProgress = Math.min(1, Math.max(0, latest));
    const depth = rawProgress * 48;
    setCurrentDepth(Math.round(depth * 10) / 10);

    // Chamber segmentation
    let idx = 0;
    if (rawProgress < 0.25) idx = 0;
    else if (rawProgress < 0.50) idx = 1;
    else if (rawProgress < 0.75) idx = 2;
    else idx = 3;

    if (idx !== activeChamberIndex) {
      setActiveChamberIndex(idx);
      // If audio is playing, modulate pitch gently to signify spatial acoustics
      if (oscNodeRef.current && audioCtxRef.current && isAudioActive) {
        const frequencies = [82, 73, 98, 65]; // low resonant architectural room modes
        const targetFreq = frequencies[idx] || 82;
        oscNodeRef.current.frequency.setTargetAtTime(targetFreq, audioCtxRef.current.currentTime, 0.4);
      }
    }
  });

  // Smooth mouse tilt parallax for spatial depth feeling
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xRel = (e.clientX - rect.left) / rect.width - 0.5;
    const yRel = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: xRel * 6, // degrees yaw
      y: -yRel * 5, // degrees pitch
    });
  }, [shouldReduceMotion]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsMouseInteracting(false);
    resetCursor();
  }, [resetCursor]);

  // Procedural subtle architectural acoustic room tone synthesizer
  const toggleSpatialAudio = () => {
    try {
      if (!isAudioActive) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        // Sub-bass warm drone (deep architectural stillness)
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(82, ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(140, ctx.currentTime);
        filter.Q.setValueAtTime(2, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.045, ctx.currentTime + 1.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        oscNodeRef.current = osc;
        gainNodeRef.current = gain;
        setIsAudioActive(true);
      } else {
        if (gainNodeRef.current && audioCtxRef.current) {
          gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.4);
          setTimeout(() => {
            audioCtxRef.current?.close();
            audioCtxRef.current = null;
            oscNodeRef.current = null;
            gainNodeRef.current = null;
            setIsAudioActive(false);
          }, 450);
        } else {
          setIsAudioActive(false);
        }
      }
    } catch {
      setIsAudioActive(false);
    }
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Atmospheric dust motes / sunbeam canvas particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      alpha: number;
      pulse: number;
    }> = [];

    const count = 38;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.5,
        speedY: (Math.random() - 0.5) * 0.25 - 0.1,
        speedX: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.4 + 0.15,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle diagonal sunbeam light shaft
      const gradient = ctx.createLinearGradient(0, 0, width, height * 0.85);
      gradient.addColorStop(0, 'rgba(232, 225, 215, 0.04)');
      gradient.addColorStop(0.4, 'rgba(232, 225, 215, 0.015)');
      gradient.addColorStop(1, 'rgba(232, 225, 215, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Render floating light motes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.pulse += 0.02;
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const currentAlpha = p.alpha + Math.sin(p.pulse) * 0.1;
        ctx.fillStyle = `rgba(245, 242, 236, ${Math.max(0, currentAlpha)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Jump to specific chamber smoothly
  const scrollToChamber = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const targetScroll = containerTop + (index / 4 + 0.03) * (containerHeight - window.innerHeight);

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  // Chamber 0 Motion transforms
  const chamber0Scale = useTransform(scrollYProgress, [0, 0.15, 0.24, 0.29], [1.0, 1.05, 1.25, 1.45]);
  const chamber0Opacity = useTransform(scrollYProgress, [0, 0.16, 0.24, 0.28], [1, 1, 0.4, 0]);
  const chamber0Blur = useTransform(scrollYProgress, [0, 0.16, 0.25], ['blur(0px)', 'blur(0px)', 'blur(6px)']);

  // Chamber 1 Motion transforms
  const chamber1Scale = useTransform(scrollYProgress, [0.18, 0.26, 0.40, 0.49, 0.54], [0.82, 1.0, 1.05, 1.24, 1.45]);
  const chamber1Opacity = useTransform(scrollYProgress, [0.18, 0.26, 0.42, 0.49, 0.53], [0, 1, 1, 0.4, 0]);
  const chamber1Blur = useTransform(scrollYProgress, [0.18, 0.26, 0.42, 0.50], ['blur(6px)', 'blur(0px)', 'blur(0px)', 'blur(6px)']);

  // Chamber 2 Motion transforms
  const chamber2Scale = useTransform(scrollYProgress, [0.43, 0.51, 0.65, 0.74, 0.79], [0.82, 1.0, 1.05, 1.24, 1.45]);
  const chamber2Opacity = useTransform(scrollYProgress, [0.43, 0.51, 0.67, 0.74, 0.78], [0, 1, 1, 0.4, 0]);
  const chamber2Blur = useTransform(scrollYProgress, [0.43, 0.51, 0.67, 0.75], ['blur(6px)', 'blur(0px)', 'blur(0px)', 'blur(6px)']);

  // Chamber 3 Motion transforms
  const chamber3Scale = useTransform(scrollYProgress, [0.68, 0.76, 0.90, 1.0], [0.82, 1.0, 1.04, 1.1]);
  const chamber3Opacity = useTransform(scrollYProgress, [0.68, 0.76, 0.90, 1.0], [0, 1, 1, 1]);
  const chamber3Blur = useTransform(scrollYProgress, [0.68, 0.76, 1.0], ['blur(6px)', 'blur(0px)', 'blur(0px)']);

  // Camera depth wireframe portal tunnel scale
  const tunnelScale = useTransform(scrollYProgress, [0, 1], [0.9, 2.8]);
  const tunnelOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0.25, 0.45, 0.45, 0.2]);

  const activeChamber = CHAMBERS[activeChamberIndex];
  const activeProject = projects.find((p) => p.id === activeChamber.projectId);

  return (
    <section
      ref={containerRef}
      id="traverse"
      className={`relative h-[480vh] bg-[#141311] text-[#F5F2EC] ${
        isFullscreen ? 'fixed inset-0 z-50 h-screen overflow-y-auto' : ''
      }`}
    >
      {/* Sticky Spatial Viewport Container */}
      <div
        className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden flex flex-col justify-between select-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Ambient Canvas: Dust Motes & Volumetric Sunlight */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-10 opacity-70"
        />

        {/* 3D Perspective Chamber Stage */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{
            perspective: '1200px',
            perspectiveOrigin: '50% 50%',
          }}
        >
          {/* Subtle Parallax Tilt Wrapper responding to mouse cursor */}
          <div
            className="w-full h-full relative transition-transform duration-300 ease-out"
            style={{
              transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Architectural Camera Wireframe Portal Tunnel (Visual Depth Aperture) */}
            <motion.div
              style={{
                scale: tunnelScale,
                opacity: tunnelOpacity,
              }}
              className="absolute inset-[8%] sm:inset-[10%] border border-[#E8E1D7]/15 pointer-events-none z-20 flex items-center justify-center"
            >
              <div className="w-[88%] sm:w-[85%] h-[88%] sm:h-[85%] border border-[#E8E1D7]/10 relative">
                {/* Crosshairs at grid corners */}
                <span className="absolute -top-1.5 -left-1.5 text-[9px] font-mono text-[#E8E1D7]/40">+</span>
                <span className="absolute -top-1.5 -right-1.5 text-[9px] font-mono text-[#E8E1D7]/40">+</span>
                <span className="absolute -bottom-1.5 -left-1.5 text-[9px] font-mono text-[#E8E1D7]/40">+</span>
                <span className="absolute -bottom-1.5 -right-1.5 text-[9px] font-mono text-[#E8E1D7]/40">+</span>

                {/* Perspective depth horizon guide */}
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#E8E1D7]/10" />
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#E8E1D7]/10" />
              </div>
            </motion.div>

            {/* Chamber 00 Layer */}
            <motion.div
              style={{
                scale: chamber0Scale,
                opacity: chamber0Opacity,
                filter: chamber0Blur,
              }}
              className="absolute inset-0 w-full h-full will-change-transform pointer-events-auto"
            >
              <img
                src={CHAMBERS[0].image}
                alt={CHAMBERS[0].name}
                className="w-full h-full object-cover brightness-[0.72] contrast-[1.05]"
                onError={(e) => {
                  const target = e.currentTarget;
                  const fallback = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85';
                  if (target.src !== fallback) target.src = fallback;
                }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141311] via-transparent to-[#141311]/70" />
            </motion.div>

            {/* Chamber 01 Layer */}
            <motion.div
              style={{
                scale: chamber1Scale,
                opacity: chamber1Opacity,
                filter: chamber1Blur,
              }}
              className="absolute inset-0 w-full h-full will-change-transform pointer-events-auto"
            >
              <img
                src={CHAMBERS[1].image}
                alt={CHAMBERS[1].name}
                className="w-full h-full object-cover brightness-[0.72] contrast-[1.05]"
                onError={(e) => {
                  const target = e.currentTarget;
                  const fallback = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85';
                  if (target.src !== fallback) target.src = fallback;
                }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141311] via-transparent to-[#141311]/70" />
            </motion.div>

            {/* Chamber 02 Layer */}
            <motion.div
              style={{
                scale: chamber2Scale,
                opacity: chamber2Opacity,
                filter: chamber2Blur,
              }}
              className="absolute inset-0 w-full h-full will-change-transform pointer-events-auto"
            >
              <img
                src={CHAMBERS[2].image}
                alt={CHAMBERS[2].name}
                className="w-full h-full object-cover brightness-[0.72] contrast-[1.05]"
                onError={(e) => {
                  const target = e.currentTarget;
                  const fallback = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85';
                  if (target.src !== fallback) target.src = fallback;
                }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141311] via-transparent to-[#141311]/70" />
            </motion.div>

            {/* Chamber 03 Layer */}
            <motion.div
              style={{
                scale: chamber3Scale,
                opacity: chamber3Opacity,
                filter: chamber3Blur,
              }}
              className="absolute inset-0 w-full h-full will-change-transform pointer-events-auto"
            >
              <img
                src={CHAMBERS[3].image}
                alt={CHAMBERS[3].name}
                className="w-full h-full object-cover brightness-[0.72] contrast-[1.05]"
                onError={(e) => {
                  const target = e.currentTarget;
                  const fallback = 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85';
                  if (target.src !== fallback) target.src = fallback;
                }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141311] via-transparent to-[#141311]/70" />
            </motion.div>
          </div>
        </div>

        {/* Interactive Architectural Hotspots in Current Active Chamber */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {activeChamber.hotspots.map((spot) => (
            <div
              key={spot.id}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
            >
              <button
                type="button"
                onClick={() => setActiveHotspot(spot)}
                onMouseEnter={() => setCursor('inspect', 'Detail +')}
                onMouseLeave={() => resetCursor()}
                className="group relative flex items-center justify-center w-11 h-11 focus:outline-none cursor-pointer"
                aria-label={`Inspect detail: ${spot.title}`}
              >
                {/* Architectural reticle with smooth hover expansion */}
                <span className="absolute w-8 h-8 rounded-full border border-[#E8E1D7]/30 scale-90 group-hover:scale-125 group-hover:border-[#E8E1D7]/70 transition-all duration-300" />
                <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-[#141311]/85 border border-[#E8E1D7]/60 text-[#E8E1D7] backdrop-blur-md group-hover:border-[#E8E1D7] group-hover:bg-[#E8E1D7] group-hover:text-[#141311] transition-all">
                  <span className="text-xs font-mono font-medium">+</span>
                </span>

                {/* Floating Tooltip Label */}
                <span className="absolute left-10 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#141311]/90 border border-[#E8E1D7]/20 backdrop-blur-md px-2.5 py-1 text-[10px] tracking-[0.16em] uppercase text-[#E8E1D7] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg hidden sm:block">
                  {spot.title}
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* TOP TELEMETRY HUD BAR */}
        <header className="relative z-30 pt-3 sm:pt-6 px-3.5 sm:px-8 md:px-12 flex items-center justify-between border-b border-[#E8E1D7]/15 pb-2.5 sm:pb-4 bg-gradient-to-b from-[#141311]/95 via-[#141311]/70 to-transparent">
          <div className="flex items-center gap-2 sm:gap-4">
            <Compass className="w-3.5 h-3.5 text-[#E8E1D7] shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[#E8E1D7] font-medium">
                Spatial Traversal · Z-Axis
              </span>
              <div className="flex items-center gap-1.5 text-[8px] sm:text-[9px] uppercase tracking-[0.14em] text-[#A69F91]">
                <span>{activeChamber.code}</span>
                <span className="hidden sm:inline">· {activeChamber.elevation}</span>
                <span className="text-[#E8E1D7] font-mono sm:hidden">· {currentDepth.toFixed(1)}m</span>
              </div>
            </div>
          </div>

          {/* Center Coordinates & Depth Telemetry (Desktop) */}
          <div className="hidden lg:flex items-center gap-6 font-mono text-[10px] tracking-[0.2em] text-[#E8E1D7]/80">
            <div className="flex items-center gap-1.5">
              <span className="text-[#A69F91]">DEPTH:</span>
              <span className="text-[#F5F2EC] font-semibold">{currentDepth.toFixed(1)}m</span>
              <span className="text-[#A69F91]">/ 48.0m</span>
            </div>
            <span className="text-[#E8E1D7]/20">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[#A69F91]">LUX:</span>
              <span>{activeChamber.luxLevel}</span>
            </div>
            <span className="text-[#E8E1D7]/20">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[#A69F91]">ACOUSTICS:</span>
              <span>{activeChamber.acousticReverb}</span>
            </div>
          </div>

          {/* Right Action Tools: Audio Ambiance & Fullscreen */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <button
              type="button"
              onClick={toggleSpatialAudio}
              className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-none text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.18em] font-medium bg-[#292722]/80 hover:bg-[#292722] text-[#E8E1D7] border border-[#E8E1D7]/20 transition-colors cursor-pointer"
              title="Toggle architectural room acoustic tone"
            >
              {isAudioActive ? <Volume2 className="w-3.5 h-3.5 text-[#E8E1D7]" /> : <VolumeX className="w-3.5 h-3.5 text-[#A69F91]" />}
              <span className="hidden sm:inline">{isAudioActive ? 'Acoustics: On' : 'Room Tone'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="inline-flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.18em] font-medium bg-[#292722]/80 hover:bg-[#292722] text-[#E8E1D7] border border-[#E8E1D7]/20 transition-colors cursor-pointer"
              title={isFullscreen ? 'Exit full immersion' : 'Full immersion'}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isFullscreen ? 'Exit' : 'Immersion'}</span>
            </button>
          </div>
        </header>

        {/* CENTER LATERAL HUD OVERLAYS */}
        <div className="relative z-30 px-3.5 sm:px-8 md:px-12 flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-between pointer-events-none pt-2 sm:pt-0">
          {/* Mobile Chamber Pill Selector */}
          <div className="pointer-events-auto flex sm:hidden items-center gap-1 bg-[#141311]/85 backdrop-blur-md p-1 border border-[#E8E1D7]/20 shadow-md">
            {CHAMBERS.map((ch, idx) => {
              const isActive = idx === activeChamberIndex;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => scrollToChamber(idx)}
                  className={`px-2 py-1 text-[9px] font-mono transition-colors cursor-pointer ${
                    isActive ? 'bg-[#E8E1D7] text-[#141311] font-bold shadow-xs' : 'text-[#A69F91] hover:text-[#E8E1D7]'
                  }`}
                >
                  {ch.number}
                </button>
              );
            })}
          </div>

          {/* Desktop Left Spatial Chambers Waypoint Navigation */}
          <div className="pointer-events-auto hidden sm:flex flex-col gap-1.5 sm:gap-2 max-w-[280px]">
            <div className="text-[9px] uppercase tracking-[0.24em] text-[#A69F91] mb-1 font-mono">
              Chambers (Z-Axis)
            </div>
            {CHAMBERS.map((ch, idx) => {
              const isActive = idx === activeChamberIndex;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => scrollToChamber(idx)}
                  className={`group flex items-center gap-2 sm:gap-3 text-left py-1 transition-all cursor-pointer ${
                    isActive ? 'opacity-100 translate-x-1' : 'opacity-40 hover:opacity-80'
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] w-4 sm:w-5 text-right transition-colors ${
                      isActive ? 'text-[#E8E1D7] font-bold' : 'text-[#A69F91]'
                    }`}
                  >
                    {ch.number}
                  </span>
                  <span
                    className={`h-[1px] transition-all ${
                      isActive ? 'w-6 sm:w-8 bg-[#E8E1D7]' : 'w-2 sm:w-3 bg-[#E8E1D7]/30 group-hover:w-4'
                    }`}
                  />
                  <div className="flex flex-col">
                    <span
                      className={`text-[11px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.18em] transition-colors ${
                        isActive ? 'text-[#F5F2EC] font-medium' : 'text-[#A69F91]'
                      }`}
                    >
                      {ch.name}
                    </span>
                    <span className="text-[9px] tracking-[0.14em] text-[#A69F91]">
                      {ch.depthStart}m — {ch.depthEnd}m
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Blueprint Floorplan Minimap */}
          <div className="pointer-events-auto hidden md:flex flex-col items-end gap-3 bg-[#141311]/75 backdrop-blur-md p-4 border border-[#E8E1D7]/15">
            <div className="flex items-center justify-between w-full gap-4 text-[9px] uppercase tracking-[0.22em] text-[#A69F91] font-mono border-b border-[#E8E1D7]/10 pb-2">
              <span>Section Elevation</span>
              <span className="text-[#E8E1D7] font-semibold">{currentDepth.toFixed(1)}m</span>
            </div>

            {/* SVG Architectural Longitudinal Section Plan */}
            <svg
              className="w-48 h-20 text-[#E8E1D7]/40 stroke-current"
              viewBox="0 0 192 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Ground & Ceiling Datum lines */}
              <line x1="10" y1="65" x2="182" y2="65" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="10" y1="15" x2="182" y2="15" strokeWidth="0.75" strokeOpacity="0.4" />

              {/* 4 Chamber volumetric outlines */}
              <rect
                x="14"
                y="20"
                width="38"
                height="45"
                strokeWidth={activeChamberIndex === 0 ? '1.5' : '0.8'}
                stroke={activeChamberIndex === 0 ? '#E8E1D7' : 'currentColor'}
                fill={activeChamberIndex === 0 ? 'rgba(232, 225, 215, 0.12)' : 'none'}
              />
              <rect
                x="56"
                y="28"
                width="38"
                height="37"
                strokeWidth={activeChamberIndex === 1 ? '1.5' : '0.8'}
                stroke={activeChamberIndex === 1 ? '#E8E1D7' : 'currentColor'}
                fill={activeChamberIndex === 1 ? 'rgba(232, 225, 215, 0.12)' : 'none'}
              />
              <rect
                x="98"
                y="15"
                width="38"
                height="50"
                strokeWidth={activeChamberIndex === 2 ? '1.5' : '0.8'}
                stroke={activeChamberIndex === 2 ? '#E8E1D7' : 'currentColor'}
                fill={activeChamberIndex === 2 ? 'rgba(232, 225, 215, 0.12)' : 'none'}
              />
              <rect
                x="140"
                y="22"
                width="38"
                height="43"
                strokeWidth={activeChamberIndex === 3 ? '1.5' : '0.8'}
                stroke={activeChamberIndex === 3 ? '#E8E1D7' : 'currentColor'}
                fill={activeChamberIndex === 3 ? 'rgba(232, 225, 215, 0.12)' : 'none'}
              />

              {/* Chamber index labels in SVG */}
              <text x="33" y="46" fontSize="8" fill="#A69F91" textAnchor="middle" stroke="none">01</text>
              <text x="75" y="48" fontSize="8" fill="#A69F91" textAnchor="middle" stroke="none">02</text>
              <text x="117" y="44" fontSize="8" fill="#A69F91" textAnchor="middle" stroke="none">03</text>
              <text x="159" y="46" fontSize="8" fill="#A69F91" textAnchor="middle" stroke="none">04</text>

              {/* Live Observer Position Pin along Z-Axis */}
              <circle
                cx={14 + (currentDepth / 48) * 164}
                cy="65"
                r="3.5"
                fill="#E8E1D7"
                stroke="#141311"
                strokeWidth="1.5"
              />
              <line
                x1={14 + (currentDepth / 48) * 164}
                y1="10"
                x2={14 + (currentDepth / 48) * 164}
                y2="65"
                stroke="#E8E1D7"
                strokeWidth="0.75"
                strokeDasharray="2 2"
              />
            </svg>

            <div className="flex items-center justify-between w-full text-[9px] uppercase tracking-[0.16em] text-[#A69F91] pt-1">
              <span>Entry Axis</span>
              <span>Garden Exit</span>
            </div>
          </div>
        </div>

        {/* BOTTOM ACTIVE CHAMBER MONOGRAPH HUD */}
        <footer className="relative z-30 pb-4 sm:pb-8 px-3.5 sm:px-8 md:px-12 bg-gradient-to-t from-[#141311] via-[#141311]/90 to-transparent pt-3 sm:pt-8">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-6 items-end">
            {/* Left: Active Chamber Identity & Typographic Title */}
            <div className="md:col-span-6 lg:col-span-7">
              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[#E8E1D7]/75 font-mono">
                <span>Chamber {activeChamber.number}</span>
                <span className="opacity-40">/</span>
                <span className="truncate max-w-[200px] sm:max-w-none">{activeChamber.subtitle}</span>
              </div>

              <h2 className="text-xl sm:text-3xl md:text-5xl font-serif font-light tracking-[-0.01em] text-[#F5F2EC] mb-1.5 sm:mb-3">
                {activeChamber.name}
              </h2>

              <p className="text-xs sm:text-sm text-[#E8E1D7]/85 font-light leading-relaxed max-w-xl italic font-serif line-clamp-2 sm:line-clamp-none">
                &ldquo;{activeChamber.quote}&rdquo;
              </p>

              {/* Material Chips */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2.5 sm:mt-4">
                {activeChamber.materials.map((mat) => (
                  <span
                    key={mat}
                    className="text-[8px] sm:text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.18em] px-2 sm:px-2.5 py-0.5 sm:py-1 bg-[#292722]/80 border border-[#E8E1D7]/20 text-[#E8E1D7]"
                  >
                    {mat}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Scroll Guidance & Project Archival Action */}
            <div className="md:col-span-6 lg:col-span-5 flex flex-col md:items-end justify-between gap-2.5 sm:gap-6">
              {/* Primary Interactive Scroll Cue */}
              <div className="group flex items-center gap-2.5 sm:gap-3 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#141311]/85 backdrop-blur-md border border-[#E8E1D7]/20 shadow-md">
                <div className="flex flex-col items-center">
                  <MoveDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E8E1D7] group-hover:translate-y-0.5 transition-transform duration-300" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.22em] font-medium text-[#F5F2EC]">
                    Scroll Vertically to Traverse
                  </span>
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.14em] text-[#A69F91]">
                    Depth: {currentDepth.toFixed(1)}m of 48.0m · 3D Perspective
                  </span>
                </div>
              </div>

              {/* Monograph Project Lightbox Link */}
              {activeProject && (
                <button
                  type="button"
                  onClick={() => onOpenProject(activeProject)}
                  className="min-h-[44px] sm:min-h-0 flex items-center gap-2 text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-medium text-[#E8E1D7] pb-1 border-b border-[#E8E1D7] hover:text-[#FFFFFF] hover:border-[#FFFFFF] transition-colors cursor-pointer"
                >
                  <span className="truncate max-w-[260px] sm:max-w-none">Inspect Archive: {activeProject.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </button>
              )}
            </div>
          </div>
        </footer>
      </div>

      {/* Hotspot Inspection Slide-Over Drawer */}
      <AnimatePresence>
        {activeHotspot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#141311]/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl bg-[#1E1D19] border border-[#E8E1D7]/25 p-6 sm:p-8 text-[#F5F2EC] shadow-2xl"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveHotspot(null)}
                className="absolute top-5 right-5 p-2 text-[#A69F91] hover:text-[#F5F2EC] transition-colors focus:outline-none"
                aria-label="Close detail modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[#A69F91] font-mono mb-2">
                <span>{activeChamber.code}</span>
                <span>/</span>
                <span>{activeHotspot.category}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-light text-[#F5F2EC] mb-4">
                {activeHotspot.title}
              </h3>

              <div className="aspect-[16/9] w-full overflow-hidden bg-[#141311] mb-5 border border-[#E8E1D7]/15">
                <img
                  src={activeHotspot.detailImage}
                  alt={activeHotspot.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const fallback = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85';
                    if (target.src !== fallback) target.src = fallback;
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-3 mb-6">
                <div className="text-xs sm:text-sm text-[#E8E1D7]/90 font-light leading-relaxed">
                  {activeHotspot.spec}
                </div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-[#A69F91] pt-2 border-t border-[#E8E1D7]/10">
                  {activeHotspot.artisanCredit}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E8E1D7]/15">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#A69F91]">
                  Chamber Elevation: {activeChamber.elevation}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveHotspot(null)}
                  className="px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium bg-[#E8E1D7] text-[#141311] hover:bg-[#FFFFFF] transition-colors"
                >
                  Return to Traversal
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
