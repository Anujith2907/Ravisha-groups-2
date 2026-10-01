// ============================================
// RAVISHA GROUPS 2 — TYPESCRIPT TYPES
// ============================================

export interface Image {
  url: string;
  publicId: string;
}

export interface Project {
  _id: string;
  name: string;
  type: string;
  location: string;
  year: string;
  status: 'Completed' | 'Ongoing' | 'Upcoming' | '';
  description: string;
  constructionDetails: string;
  client?: string;
  area?: string;
  mainImage: Image;
  additionalImages: (Image & { order: number })[];
  featured: boolean;
  order: number;
  createdAt: string;
}

export interface Production {
  _id: string;
  title: string;
  year: string;
  productionRole: string;
  contribution: string;
  filmArtsDetails: string;
  description: string;
  genre?: string;
  director?: string;
  synopsis?: string;
  cast?: string[];
  trailerUrl?: string;
  stills?: (Image | string)[];
  mainPoster: Image;
  mainImage: Image;
  additionalImages: (Image & { order: number })[];
  featured: boolean;
  order: number;
  createdAt: string;
}

export interface Founder {
  _id: string;
  name: string;
  designation: string;
  biography: string;
  vision: string;
  quote: string;
  image: Image;
  updatedAt: string;
}

export interface ValueItem {
  title: string;
  description: string;
  icon: string;
}

export interface SiteContent {
  _id: string;
  hero: {
    heading: string;
    tagline: string;
    description: string;
    image: Image;
  };
  about: {
    heading: string;
    description: string;
    image: Image;
  };
  values: {
    heading: string;
    items: ValueItem[];
  };
}

export interface Inquiry {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
  status: 'NEW' | 'READ' | 'CONTACTED' | 'CLOSED';
  createdAt: string;
}

export interface Settings {
  _id: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    linkedin: string;
  };
  seo: {
    title: string;
    description: string;
  };
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface Media {
  _id: string;
  url: string;
  publicId: string;
  category: 'construction' | 'production' | 'founder' | 'general';
  alt: string;
  order: number;
  createdAt: string;
}
