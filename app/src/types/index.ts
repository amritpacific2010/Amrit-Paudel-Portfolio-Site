export type Theme = 'light' | 'dark';

export interface TimelineEntry {
  company: string;
  position: string;
  duration: string;
  location: string;
  type: 'responsibilities' | 'achievements';
  items: string[];
  badge?: string;
}

export interface SkillCategory {
  icon: string;
  title: string;
  skills: string[];
}

export interface Project {
  id: string;
  image: string;
  title: string;
  description: string;
  tags: string[];
}

export interface Education {
  icon: string;
  degree: string;
  institution: string;
  location: string;
  year: string;
  badge: string;
}

export interface Certification {
  name: string;
  status: 'In Progress' | 'Completed';
  progress: number;
}

export interface Language {
  name: string;
  level: string;
  percentage: number;
}

export interface Highlight {
  icon: string;
  title: string;
  description: string;
}
