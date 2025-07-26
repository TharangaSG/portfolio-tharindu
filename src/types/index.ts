export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  category: 'web' | 'mobile' | 'desktop' | 'other';
}

export interface ResearchProject {
  id: string;
  title: string;
  description: string;
  abstract: string;
  authors: string[];
  publishedDate?: string;
  journal?: string;
  conference?: string;
  paperUrl?: string;
  tags: string[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string[];
  technologies?: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
  relevantCourses?: string[];
}

export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: 'Programming' | 'Framework' | 'Tool' | 'Database' | 'Other';
}