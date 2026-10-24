import { MaterialDetail, ApproachStep } from '../types';

export const materialsData: MaterialDetail[] = [
  {
    id: 'travertine',
    name: 'Unfilled Roman Travertine',
    origin: 'Tivoli, Italy & Rajasthan Quaries',
    lrv: '52% (Warm Diffuse)',
    patinaProfile: 'Deepens in honey richness; void edges soften over decades',
    acousticProperty: 'High density dampening; disperses flutter echoes',
    description: 'Selected for its natural cavernous voids, warm honey-stone undertones, and honest geologic tactile presence.',
    tactileQuality: 'Cool, porous, honed matte finish with subtle crystalline depth.',
    application: 'Monolithic fireplace hearths, low plinths, cantilevered bathroom vanities.'
  },
  {
    id: 'oak',
    name: 'Smoked & Wire-Brushed White Oak',
    origin: 'Sustainably Managed Alpine Woodlands',
    lrv: '28% (Muted Absorption)',
    patinaProfile: 'Organic tannins react with ambient light to develop an amber-smoked patina',
    acousticProperty: 'Natural wood grain attenuates mid-range acoustic resonance',
    description: 'Treated with natural organic tannins rather than artificial stains to reveal deep grain texture that ages with grace.',
    tactileQuality: 'Velvety wire-brushed grain with subtle resistance under hand.',
    application: 'Full-height fluted partitions, architectural library walls, bespoke bedroom cabinetry.'
  },
  {
    id: 'linen',
    name: 'Raw Belgian Linen & Slub Wool',
    origin: 'Flanders, Belgium',
    lrv: '68% (Luminous Softness)',
    patinaProfile: 'Flax fibers relax into gentle sculptural drapery folds over time',
    acousticProperty: 'NRC 0.65 acoustic absorption coefficient when acoustic-backed',
    description: 'Heavyweight flax weaves spun with intentional irregularities that soften architectural edges and absorb acoustic resonance.',
    tactileQuality: 'Substantially heavy, dry hand feel, softens beautifully over decades.',
    application: 'Acoustic wall linings, floor-to-ceiling drapery, deep lounge upholstery.'
  },
  {
    id: 'plaster',
    name: 'Hand-Troweled Lime Plaster',
    origin: 'Artisanal Slaked Lime & Fine Marble Dust',
    lrv: '74% (Ambient Luminescence)',
    patinaProfile: 'Micro-crystalline carbonation makes the surface harder with each passing year',
    acousticProperty: 'Non-specular diffuse sound reflection creating calm spatial tone',
    description: 'Applied in multiple paper-thin passes to diffuse harsh sunlight into a serene, ambient, non-reflective interior luminescence.',
    tactileQuality: 'Chalky, silky micro-texture that breathes naturally with indoor humidity.',
    application: 'Continuous curved walls, vaulted ceiling planes, seamless corridor transitions.'
  },
  {
    id: 'bronze',
    name: 'Patinated Architectural Bronze',
    origin: 'Foundry Cast Copper-Tin Alloy',
    lrv: '16% (Deep Specular)',
    patinaProfile: 'Hand contact develops warm burnished highlights along touch points',
    acousticProperty: 'Solid mass acoustic deadener for door portals and custom ironmongery',
    description: 'Cold-patinated using botanical sulphur baths to achieve a deep charcoal-umber tone with warm undertones that reveal themselves under incandescent light.',
    tactileQuality: 'Substantial, weighted cool metal with smooth hand-buffed wax finish.',
    application: 'Custom pivot handles, linear lighting channels, fireplace edge reveals.'
  }
];

export const approachSteps: ApproachStep[] = [
  {
    number: '01',
    title: 'Understand',
    phaseLabel: 'Discovery & Spatial Ritual',
    keyMilestone: 'Sensory Brief & Solar Analysis',
    summary: 'We begin with your routines, aspirations and the way you want your space to feel.',
    details: 'Before sketching a single wall, we listen to how your mornings unfold, how you entertain, how natural light affects your rhythm, and what quietude means to you. We study site orientation, architectural envelope, and acoustic environment.',
    deliverables: [
      'Spatial programming & ritual mapping',
      'Solar orientation & light path simulation (21 Dec / 21 Jun)',
      'Initial acoustic & environmental audit',
      'Creative direction monograph & sensory brief'
    ]
  },
  {
    number: '02',
    title: 'Imagine',
    phaseLabel: 'Form, Light & Tactile Alchemy',
    keyMilestone: '1:1 Material Trays & Spatial Models',
    summary: 'We develop the spatial language, material palette and details that give each project its character.',
    details: 'We sculpt proportions, carve apertures, and curate a tactile symphony of stone, timber, metal and cloth. Physical material sample trays are composed by hand, testing how stones and textiles dialogue under varying daylight conditions.',
    deliverables: [
      '3D spatial volumes & architectural plans',
      'Curated physical material & sample trays',
      'Custom millwork & bespoke furniture concepts',
      'Architectural lighting choreography (2700K)'
    ]
  },
  {
    number: '03',
    title: 'Realise',
    phaseLabel: 'Artisanal Execution & Handover',
    keyMilestone: 'Millimeter Tolerances & Turnkey Living',
    summary: 'We bring the vision together through considered execution, craftsmanship and attention to detail.',
    details: 'True quiet luxury lives in the joint: the invisible junction where stone meets plaster, the concealed hinge, the shadow gap. We work closely alongside master stonemasons, carpenters, and metal artisans to ensure exacting execution.',
    deliverables: [
      'Millimeter-precise construction documentation',
      'Artisan coordination & custom prototyping',
      'Full on-site architectural supervision',
      'Curated styling, art placement & handover'
    ]
  }
];
