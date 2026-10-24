import { ServiceDisciplineItem } from '../types';

export const servicesData: ServiceDisciplineItem[] = [
  {
    id: 'architecture',
    number: '01',
    title: 'Architectural Design',
    subtitle: 'Massing, Solar Orientation & Structural Purity',
    summary: 'Ground-up private residences and sculptural pavilion additions conceived from site topography, diurnal light cycles, and monolithic spatial volume.',
    details: 'Every structure begins with solar topography and structural datum. We carve apertures to choreograph morning and evening sun, framing landscape horizons while creating introverted courtyards that insulate the interior against external clamor.',
    deliverables: [
      'Topographical solar path mapping (Equinox & Solstice simulations)',
      'Volumetric massing & passive thermal environmental modeling',
      'Monolithic stone facade & frameless fenestration detailing',
      'Full statutory planning, zoning compliance & engineering coordination'
    ],
    keyMilestone: '1:50 Physical Plaster Massing Models & Envelope Mockup',
    toleranceSpec: 'ORIENTATION ACCURACY: ±0.5° · STRUCTURAL DATUM: MONOLITHIC',
    leadArchitectQuote: 'A building should feel as though it were quarried directly from its terrain, catching the sun with measured reverence.',
    photographyAsset: '/src/assets/images/detail_courtyard_light_1791808661946.jpg',
    photoCaption: 'Aperture Geometry · Solar incidence study on monolithic travertine courtyard'
  },
  {
    id: 'interiors',
    number: '02',
    title: 'Interior Architecture',
    subtitle: 'Spatial Thresholds, Acoustic Tone & Tactile Flow',
    summary: 'Curating the emotional cadence of interior space through seamless floor-to-ceiling portals, acoustic material layering, and concealed shadow-line details.',
    details: 'Interior architecture is the choreography of touch and sight. We dissolve clumsy room divisions in favor of monumental pivoting portals, continuous travertine plinths, and hand-troweled lime plaster that calms ambient acoustics and diffuses daylight.',
    deliverables: [
      'Spatial sequence mapping & portal threshold engineering',
      'Hand-troweled lime plaster & honed travertine surface detailing',
      'Concealed linear architectural lighting choreography (2700K CRI 98)',
      'Acoustic absorption engineering & reverberation calibration'
    ],
    keyMilestone: '1:1 Tactile Material Sample Trays & Physical Light Mockup',
    toleranceSpec: 'SHADOW GAP TOLERANCE: ±1.0MM · COLOR ACCURACY: CRI > 98',
    leadArchitectQuote: 'True luxury within the home is quietude: the absence of glare, the dampening of harsh sound, and the honesty of cool stone under hand.',
    photographyAsset: '/src/assets/images/detail_travertine_joinery_1791808649499.jpg',
    photoCaption: 'Threshold Junction · Unfilled travertine plinth meeting hand-troweled lime wall'
  },
  {
    id: 'millwork',
    number: '03',
    title: 'Bespoke Millwork',
    subtitle: 'Cabinetry, Custom Bronzework & Precision Joinery',
    summary: 'Custom-commissioned furniture, library walls, and architectural joinery handcrafted by master cabinetmakers and foundry metal artisans.',
    details: 'We believe cabinetry should possess the longevity of fine architecture. Working with smoked European oak and hand-patinated bronze, each junction is cut with millimeter precision, incorporating concealed pivot hinges and shadow reveals.',
    deliverables: [
      'Wire-brushed European oak & walnut bookmatched veneers',
      'Bridle, mortise & tenon joinery with continuous grain flow',
      'Foundry-cast patinated bronze handles & linear reveal profiles',
      'Integrated soft-close architectural hardware & concealed drawer runs'
    ],
    keyMilestone: 'Full-Scale Joinery Corner Prototypes & Foundry Castings',
    toleranceSpec: 'CABINETRY CLEARANCE: ±1.5MM · PATINA PROFILE: NATURAL BOTANICAL OXIDATION',
    leadArchitectQuote: 'When you grasp a door pull or open a library drawer, the weight, resistance, and tactile warmth should feel inevitable.',
    photographyAsset: '/src/assets/images/detail_bespoke_oak_library_1791808673965.jpg',
    photoCaption: 'Timber Craft · Wire-brushed smoked oak bookcase with patinated bronze reveals'
  }
];
