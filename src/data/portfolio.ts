import Brochure from '../Assets/Broucher-20250821T104541Z-1-001/Broucher/Brochure.jpg';
import Brochure2 from '../Assets/Broucher-20250821T104541Z-1-001/Broucher/Brochure2.jpg';

import Holding1 from '../Assets/Hordings-20250821T104541Z-1-001/Hordings/Billboard Mockup with Large Size.jpg';
import Holding2 from '../Assets/Hordings-20250821T104541Z-1-001/Hordings/Free Billboard Mockup PSD.jpg';
import Holding3 from '../Assets/Hordings-20250821T104541Z-1-001/Hordings/Free Parking Lot Billboard Mockup PSD.jpg';

import Logo5 from '../Assets/Logo-20250821T104544Z-1-001/Logo/Logo-5.jpg';
import Logo7 from '../Assets/Logo-20250821T104544Z-1-001/Logo/Logo-7.jpg';
import MeenakshiLifestyle from '../Assets/Meenakshi_lifestyle.jpg';

import Box4 from '../Assets/Pakaging-20250821T104552Z-1-001/Pakaging/ALMONDS 5.jpg';
import Box5 from '../Assets/Pakaging-20250821T104552Z-1-001/Pakaging/Box-3.jpg';
import Box6 from '../Assets/Pakaging-20250821T104552Z-1-001/Pakaging/Kulfi_packaging (1).jpg';

import vs1 from '../Assets/Visiting Card-20250821T104554Z-1-001/Visiting Card/Business Card.png';
import vs2 from '../Assets/Visiting Card-20250821T104554Z-1-001/Visiting Card/Cretolive.jpg';
import vs3 from '../Assets/Visiting Card-20250821T104554Z-1-001/Visiting Card/Radhe Fashion.jpg';

export type PortfolioItem = {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  category: 'brochure' | 'holding' | 'logo' | 'packaging' | 'visiting';
  description?: string;
};

const s = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

export const portfolioItems: PortfolioItem[] = [
  { title: 'A Textbook of Power Plant Engineering – Brochure', subtitle: 'Book Cover Design', image: Brochure, category: 'brochure', slug: s('AP Investment') },
  { title: 'PumpTork – Product Brochure', subtitle: 'Brochure / Cover + Contact Page ', image: Brochure2, category: 'brochure', slug: s('Ashirvad Jewellers') },
  
  { title: 'Ashirvad Jewellers – Billboard 1', subtitle: 'Billboard', image: Holding1, category: 'holding', slug: s('Holding 1') },
  { title: 'Ashirvad Jewellers – Hoarding 2', subtitle: 'Billboard', image: Holding2, category: 'holding', slug: s('Holding 2') },
  { title: 'Ashirvad Jewellers – Hoarding 3', subtitle: 'Billboard', image: Holding3, category: 'holding', slug: s('Holding 3') },

  { title: 'Vrindavan Chaat Bhandar', subtitle: 'Food & Beverage', image: Logo5, category: 'logo', slug: s('Vrindavan Chaat Bhandar') },
  { title: 'Radhe Fashion', subtitle: 'Fashion & Lifestyle', image: Logo7, category: 'logo', slug: s('Radhe Fashion') },
  { title: 'Meenakshi Lifestyle Logo', subtitle: 'Lifestyle Brand', image: MeenakshiLifestyle, category: 'logo', slug: s('Meenakshi Lifestyle Logo') },

  { title: 'Nut Sizer', subtitle: 'Flavored Roasted Almonds - Almond Sizzler', image: Box4, category: 'packaging', slug: s('nut-sizer-flavored-roasted-almonds') },
  { title: 'Dplus', subtitle: 'The Strength Behind Every Innovation', image: Box5, category: 'packaging', slug: s('dotvod-packaging-box') },
  { title: 'Crunchy Chocobar', subtitle: 'Big happiness come in small packs', image: Box6, category: 'packaging', slug: s('crunchy-chocobar') },

  { title: 'PumpTrock', subtitle: 'Industrial Brand', image: vs1, category: 'visiting', slug: s('PumpTrock') },
  { title: 'Rajkot Marketing', subtitle: 'Marketing Agency', image: vs2, category: 'visiting', slug: s('Rajkot Marketing') },
  { title: 'Shreeji Packaging', subtitle: 'Packaging Solutions', image: vs3, category: 'visiting', slug: s('Shreeji Packaging') },
];

export const sectionByCategory: Record<PortfolioItem['category'], PortfolioItem[]> = {
  brochure: portfolioItems.filter(p => p.category === 'brochure'),
  holding: portfolioItems.filter(p => p.category === 'holding'),
  logo: portfolioItems.filter(p => p.category === 'logo'),
  packaging: portfolioItems.filter(p => p.category === 'packaging'),
  visiting: portfolioItems.filter(p => p.category === 'visiting'),
};

export const getItemBySlug = (slug: string) => portfolioItems.find(p => p.slug === slug);
