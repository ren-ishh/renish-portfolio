export interface Project {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    tech: string[];
    github: string;
    live: string | null;
    status: string;
    featured: boolean;
  }
  
  export interface Skill {
    name: string;
    level: number;
    icon: string;
  }
  
  export interface SkillCategory {
    category: string;
    items: Skill[];
  }
  
  export interface Achievement {
    id: number;
    title: string;
    issuer: string;
    year: string;
    type: string;
    description: string;
  }
  
  export interface Education {
    id: number;
    degree: string;
    institution: string;
    location: string;
    year: string;
    status: string;
    description: string;
  }