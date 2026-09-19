export interface ProgramItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  highlights: string[];
  badgeText: string;
  audience: string;
}

export interface ImpactStat {
  id: string;
  label: string;
  value: string;
  numericTarget?: number;
  suffix?: string;
  description: string;
  isPlaceholder: boolean;
}

export interface StoryItem {
  id: string;
  category: 'Student Journey' | 'Parent Perspective' | 'Volunteer Reflection' | 'Community Note';
  title: string;
  excerpt: string;
  content: string;
  author: string;
  role: string;
  location: string;
  isPlaceholder: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Classes & Learning' | 'Community & Fellowship' | 'Children & Activities' | 'Bungamati Life';
  imageUrl: string;
  caption: string;
  date?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
