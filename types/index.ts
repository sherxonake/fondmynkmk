/** TypeScript interfaces for WordPress content types */

export interface LogoImage {
  url: string;
  width: number;
  height: number;
}

export interface SiteSettings {
  address: string;
  phone: string;
  trustPhone: string;
  email: string;
  telegram?: string;
  instagram?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  logo: LogoImage;
}

export interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

export interface StatItem {
  value: number;
  label: string;
  suffix?: string;
}

export interface DirectionItem {
  number: string;
  icon: "HeartPulse" | "TreePine" | "Palette";
  title: string;
  description: string;
}

export interface QuoteData {
  text: string;
  author: string;
}

export interface PartnerItem {
  name: string;
  logoUrl?: string;
}

export interface NewsStory {
  id: number;
  image: string;
  title: string;
  date: string;
  category?: string;
}

export interface NewsArticle {
  id: number;
  image: string;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}
