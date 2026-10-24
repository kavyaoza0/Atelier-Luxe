export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  category: 'Residential' | 'Private Residence' | 'Contemporary Apartment' | 'Residential Interiors';
  location: string;
  year: string;
  description: string;
  image: string;
  detailImage?: string;
  aspectRatio: 'landscape' | 'portrait' | 'wide';
  details: {
    area: string;
    coordinates?: string;
    orientation?: string;
    lightingTemp?: string;
    materials: string[];
    concept: string;
    highlights: string[];
    artisanCredits?: string[];
  };
}

export interface MaterialDetail {
  id: string;
  name: string;
  origin: string;
  lrv?: string;
  patinaProfile?: string;
  acousticProperty?: string;
  description: string;
  tactileQuality: string;
  application: string;
}

export interface ApproachStep {
  number: string;
  title: string;
  phaseLabel: string;
  summary: string;
  details: string;
  deliverables: string[];
  keyMilestone: string;
}

export type ServiceDisciplineId = 'architecture' | 'interiors' | 'millwork';

export interface ServiceDisciplineItem {
  id: ServiceDisciplineId;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  details: string;
  deliverables: string[];
  keyMilestone: string;
  toleranceSpec: string;
  leadArchitectQuote: string;
  photographyAsset?: string;
  photoCaption?: string;
}
