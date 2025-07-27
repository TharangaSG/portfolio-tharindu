// Data mapping utilities to handle differences between frontend and backend data structures

import { Project, ResearchProject, Experience, Education, Skill } from '../types';

// Map frontend project category to backend enum
export const mapProjectCategory = (category: string): string => {
  const categoryMap: { [key: string]: string } = {
    'web': 'WEB',
    'mobile': 'MOBILE', 
    'desktop': 'DESKTOP',
    'other': 'OTHER'
  };
  return categoryMap[category] || 'OTHER';
};

// Map backend project category to frontend
export const mapBackendProjectCategory = (category: string): 'web' | 'mobile' | 'desktop' | 'other' => {
  const categoryMap: { [key: string]: 'web' | 'mobile' | 'desktop' | 'other' } = {
    'WEB': 'web',
    'MOBILE': 'mobile',
    'DESKTOP': 'desktop', 
    'OTHER': 'other'
  };
  return categoryMap[category] || 'other';
};

// Map skill level to backend enum
export const mapSkillLevel = (level: string): string => {
  const levelMap: { [key: string]: string } = {
    'Beginner': 'BEGINNER',
    'Intermediate': 'INTERMEDIATE',
    'Advanced': 'ADVANCED',
    'Expert': 'EXPERT'
  };
  return levelMap[level] || 'BEGINNER';
};

// Map backend skill level to frontend
export const mapBackendSkillLevel = (level: string): 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' => {
  const levelMap: { [key: string]: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' } = {
    'BEGINNER': 'Beginner',
    'INTERMEDIATE': 'Intermediate', 
    'ADVANCED': 'Advanced',
    'EXPERT': 'Expert'
  };
  return levelMap[level] || 'Beginner';
};

// Map skill category to backend enum
export const mapSkillCategory = (category: string): string => {
  const categoryMap: { [key: string]: string } = {
    'Programming': 'PROGRAMMING',
    'Framework': 'FRAMEWORK',
    'Tool': 'TOOL',
    'Database': 'DATABASE',
    'Other': 'OTHER'
  };
  return categoryMap[category] || 'OTHER';
};

// Map backend skill category to frontend
export const mapBackendSkillCategory = (category: string): 'Programming' | 'Framework' | 'Tool' | 'Database' | 'Other' => {
  const categoryMap: { [key: string]: 'Programming' | 'Framework' | 'Tool' | 'Database' | 'Other' } = {
    'PROGRAMMING': 'Programming',
    'FRAMEWORK': 'Framework',
    'TOOL': 'Tool', 
    'DATABASE': 'Database',
    'OTHER': 'Other'
  };
  return categoryMap[category] || 'Other';
};

// Convert frontend project to backend format
export const mapProjectToBackend = (project: Project) => {
  return {
    ...project,
    id: project.id === 'new' ? undefined : parseInt(project.id), // Convert string ID to number, undefined for new
    category: mapProjectCategory(project.category)
  };
};

// Convert backend project to frontend format
export const mapProjectFromBackend = (project: any): Project => {
  return {
    ...project,
    id: project.id.toString(), // Convert number ID to string
    category: mapBackendProjectCategory(project.category)
  };
};

// Convert frontend skill to backend format
export const mapSkillToBackend = (skill: Skill) => {
  return {
    ...skill,
    level: mapSkillLevel(skill.level),
    category: mapSkillCategory(skill.category)
  };
};

// Convert backend skill to frontend format
export const mapSkillFromBackend = (skill: any): Skill => {
  return {
    ...skill,
    level: mapBackendSkillLevel(skill.level),
    category: mapBackendSkillCategory(skill.category)
  };
};

// Convert date strings to proper format
export const formatDateForBackend = (dateString: string): string => {
  if (!dateString) return '';
  // Convert YYYY-MM format to YYYY-MM-DD for backend
  if (dateString.match(/^\d{4}-\d{2}$/)) {
    return `${dateString}-01`;
  }
  return dateString;
};

// Convert backend date to frontend format
export const formatDateFromBackend = (dateString: string): string => {
  if (!dateString) return '';
  // Convert YYYY-MM-DD to YYYY-MM for frontend
  return dateString.substring(0, 7);
};