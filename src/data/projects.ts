import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'quiet-residence',
    number: '01',
    title: 'The Quiet Residence',
    subtitle: 'Acoustic Sanctuary & Light Wells',
    category: 'Residential',
    location: 'Ahmedabad, India',
    year: '2025',
    description: 'A restrained home shaped by natural light, warm timber and tactile stone.',
    image: '/images/project_quiet_residence_1791807431306.jpg',
    detailImage: '/images/detail_courtyard_light_1791808661946.jpg',
    aspectRatio: 'landscape',
    details: {
      area: '6,200 sq.ft',
      coordinates: '23°02\'N 72°31\'E',
      orientation: 'North-East courtyard axis',
      lightingTemp: '2700K Warm Dim · CRI 98',
      materials: ['Custom Fluted White Oak', 'Honed Roman Travertine', 'Unbleached Belgian Linen', 'Handmade Stoneware'],
      concept: 'Conceived as an acoustic and sensory sanctuary within the city. Every partition was replaced with rhythmic oak louvres and floor-to-ceiling pivot apertures opening onto a quiet contemplative stone courtyard with gravel and olive foliage.',
      highlights: [
        'Custom floating travertine plinth with integrated hearth and concealed shadow gap',
        'Concealed acoustic wall panels wrapped in raw textured linen to absorb city reverberation',
        'Micro-climate courtyard ventilation creating natural cross-breezes throughout summer'
      ],
      artisanCredits: ['Master Stonemasonry: Trivedi Stone Atelier', 'Custom Joinery: Studio Kōzo', 'Textile Curations: De Le Cuona']
    }
  },
  {
    id: 'limestone-house',
    number: '02',
    title: 'The Limestone House',
    subtitle: 'Monolithic Hearth & Curved Plaster',
    category: 'Private Residence',
    location: 'Ahmedabad, India',
    year: '2024',
    description: 'Sculptural forms, soft neutrals and an understated material palette.',
    image: '/images/project_limestone_house_1791807444900.jpg',
    detailImage: '/images/detail_travertine_joinery_1791808649499.jpg',
    aspectRatio: 'portrait',
    details: {
      area: '8,400 sq.ft',
      coordinates: '23°04\'N 72°30\'E',
      orientation: 'South-West clerestory solar capture',
      lightingTemp: '2400K–2700K Architectural Grazing',
      materials: ['Jodhpur Limestone', 'Venetian Lime Plaster', 'Microcement Screed', 'Bouclé Upholstery'],
      concept: 'An exploration of monolithic solidity and sweeping curve geometry. The central living chamber is anchored by a sculptural limestone fireplace that catches morning sunlight through an overhead clerestory aperture.',
      highlights: [
        'Monolithic unfilled limestone hearth weighing 2.4 tonnes carved on-site',
        'Continuous radius curved plaster wall with invisible door frames and 10mm reveals',
        'Seamless matte microcement flooring throughout ground living volume without movement joints'
      ],
      artisanCredits: ['Limestone Extraction: Makrana Quarries', 'Plaster Artistry: Stucco Veneziano Guild', 'Sculptural Metalwork: Atelier V']
    }
  },
  {
    id: 'form-function',
    number: '03',
    title: 'Form & Function',
    subtitle: 'Double-Height Library & Sea Horizon',
    category: 'Contemporary Apartment',
    location: 'Mumbai, India',
    year: '2025',
    description: 'A study in proportion, functional elegance and considered detail.',
    image: '/images/project_form_function_1791807457421.jpg',
    detailImage: '/images/detail_bespoke_oak_library_1791808673965.jpg',
    aspectRatio: 'landscape',
    details: {
      area: '4,100 sq.ft',
      coordinates: '18°58\'N 72°49\'E',
      orientation: 'Westward Arabian Sea panorama',
      lightingTemp: '2700K Architectural Diffuse & Micro-Optics',
      materials: ['Smoked American Walnut', 'Brushed Warm Bronze', 'Calacatta Paonazzo Marble', 'Cashmere Wool'],
      concept: 'Designed for a collector of rare architectural monographs and contemporary Indian photography. A double-height walnut library wall frames sweeping views of the Arabian Sea while creating intimate reading nooks.',
      highlights: [
        'Precision floor-to-ceiling timber joinery with integrated linear warm lighting',
        'Bespoke curved low-slung conversation lounge in tactile off-white bouclé',
        'Full acoustic isolation from the coastal urban perimeter below'
      ],
      artisanCredits: ['Architectural Cabinetry: Ebano Millwork', 'Bronze Patination: Studio Bronzista', 'Acoustic Engineering: Soundlabs Mumbai']
    }
  },
  {
    id: 'living-gallery',
    number: '04',
    title: 'The Living Gallery',
    subtitle: 'Monochrome Canvasses & Garden Threshold',
    category: 'Residential Interiors',
    location: 'Ahmedabad, India',
    year: '2024',
    description: 'A curated interior where art, architecture and everyday living coexist.',
    image: '/images/project_living_gallery_1791807515327.jpg',
    detailImage: '/images/philosophy_architectural_detail_1791807531294.jpg',
    aspectRatio: 'wide',
    details: {
      area: '7,500 sq.ft',
      coordinates: '23°01\'N 72°33\'E',
      orientation: 'Dual North-South gallery alignment',
      lightingTemp: '2700K Museum Standard CRI 98 (Zero UV)',
      materials: ['Board-Marked Concrete', 'Terrazzo Flooring', 'Patinated Saddle Leather', 'Dark Teak Joinery'],
      concept: 'A modernist pavilion built to house large-scale tactile monochrome canvasses. Architectural concrete walls provide a textured backdrop against verdant sub-tropical courtyard vegetation framed by slender steel portals.',
      highlights: [
        'Museum-grade gallery illumination calibrated to 2700K CRI 98 with track flexibility',
        'Poured in-situ polished terrazzo flooring with river pebble aggregate from the Sabarmati basin',
        'Seamless floor-to-ceiling sliding glass portals dissolving interior into sculpture garden'
      ],
      artisanCredits: ['In-Situ Terrazzo: Studio Terrazzieri', 'Steel Portal Joinery: Jansen Systems', 'Curation Collaboration: Experimenter Gallery']
    }
  }
];
