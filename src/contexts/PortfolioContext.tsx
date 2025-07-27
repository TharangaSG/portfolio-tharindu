import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, ResearchProject, Experience, Education, Skill } from '../types';
import { 
  personalInfo as defaultPersonalInfo, 
  projects as defaultProjects,
  researchProjects as defaultResearchProjects,
  experience as defaultExperience,
  education as defaultEducation,
  skills as defaultSkills
} from '../data/portfolio';
import { apiService } from '../services/api';

interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
  bio: string;
}

interface PortfolioContextType {
  personalInfo: PersonalInfo;
  projects: Project[];
  researchProjects: ResearchProject[];
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  updatePersonalInfo: (info: PersonalInfo) => Promise<void>;
  addProject: (project: Project) => Promise<void>;
  updateProject: (id: string, project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addResearchProject: (research: ResearchProject) => Promise<void>;
  updateResearchProject: (id: string, research: ResearchProject) => Promise<void>;
  deleteResearchProject: (id: string) => Promise<void>;
  addExperience: (exp: Experience) => Promise<void>;
  updateExperience: (id: string, exp: Experience) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  addEducation: (edu: Education) => Promise<void>;
  updateEducation: (id: string, edu: Education) => Promise<void>;
  deleteEducation: (id: string) => Promise<void>;
  addSkill: (skill: Skill) => Promise<void>;
  updateSkill: (name: string, skill: Skill) => Promise<void>;
  deleteSkill: (name: string) => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

interface PortfolioProviderProps {
  children: ReactNode;
}

export const PortfolioProvider = ({ children }: PortfolioProviderProps) => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(defaultPersonalInfo);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [researchProjects, setResearchProjects] = useState<ResearchProject[]>(defaultResearchProjects);
  const [experience, setExperience] = useState<Experience[]>(defaultExperience);
  const [education, setEducation] = useState<Education[]>(defaultEducation);
  const [skills, setSkills] = useState<Skill[]>(defaultSkills);

  // Load data from API on mount, fallback to localStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        // Try to load from API first
        const [
          personalInfoData,
          projectsData,
          researchData,
          experienceData,
          educationData,
          skillsData
        ] = await Promise.all([
          apiService.getPersonalInfo(),
          apiService.getProjects(),
          apiService.getResearchProjects(),
          apiService.getExperiences(),
          apiService.getEducation(),
          apiService.getSkills()
        ]);

        setPersonalInfo(personalInfoData && Object.keys(personalInfoData).length > 0 ? personalInfoData : defaultPersonalInfo);
        setProjects(Array.isArray(projectsData) && projectsData.length > 0 ? projectsData : defaultProjects);
        setResearchProjects(Array.isArray(researchData) && researchData.length > 0 ? researchData : defaultResearchProjects);
        setExperience(Array.isArray(experienceData) && experienceData.length > 0 ? experienceData : defaultExperience);
        setEducation(Array.isArray(educationData) && educationData.length > 0 ? educationData : defaultEducation);
        setSkills(Array.isArray(skillsData) && skillsData.length > 0 ? skillsData : defaultSkills);
      } catch (error) {
        console.warn('Failed to load from API, using localStorage:', error);
        // Fallback to localStorage
        const savedData = localStorage.getItem('portfolioData');
        if (savedData) {
          const data = JSON.parse(savedData);
          setPersonalInfo(data.personalInfo || defaultPersonalInfo);
          setProjects(data.projects || defaultProjects);
          setResearchProjects(data.researchProjects || defaultResearchProjects);
          setExperience(data.experience || defaultExperience);
          setEducation(data.education || defaultEducation);
          setSkills(data.skills || defaultSkills);
        }
      }
    };

    loadData();
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    const data = {
      personalInfo,
      projects,
      researchProjects,
      experience,
      education,
      skills
    };
    localStorage.setItem('portfolioData', JSON.stringify(data));
  }, [personalInfo, projects, researchProjects, experience, education, skills]);

  const updatePersonalInfo = async (info: PersonalInfo) => {
    try {
      const updatedInfo = await apiService.updatePersonalInfo(info);
      setPersonalInfo(updatedInfo);
    } catch (error) {
      console.error('Failed to update personal info:', error);
      // Fallback to local update
      setPersonalInfo(info);
    }
  };

  const addProject = async (project: Project) => {
    try {
      const newProject = await apiService.createProject(project);
      setProjects(prev => [...prev, newProject]);
    } catch (error) {
      console.error('Failed to create project:', error);
      setProjects(prev => [...prev, project]);
    }
  };

  const updateProject = async (id: string, project: Project) => {
    try {
      const updatedProject = await apiService.updateProject(id, project);
      setProjects(prev => prev.map(p => p.id === id ? updatedProject : p));
    } catch (error) {
      console.error('Failed to update project:', error);
      setProjects(prev => prev.map(p => p.id === id ? project : p));
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await apiService.deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Failed to delete project:', error);
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  const addResearchProject = async (research: ResearchProject) => {
    try {
      const newResearch = await apiService.createResearchProject(research);
      setResearchProjects(prev => [...prev, newResearch]);
    } catch (error) {
      console.error('Failed to create research project:', error);
      setResearchProjects(prev => [...prev, research]);
    }
  };

  const updateResearchProject = async (id: string, research: ResearchProject) => {
    try {
      const updatedResearch = await apiService.updateResearchProject(id, research);
      setResearchProjects(prev => prev.map(r => r.id === id ? updatedResearch : r));
    } catch (error) {
      console.error('Failed to update research project:', error);
      setResearchProjects(prev => prev.map(r => r.id === id ? research : r));
    }
  };

  const deleteResearchProject = async (id: string) => {
    try {
      await apiService.deleteResearchProject(id);
      setResearchProjects(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error('Failed to delete research project:', error);
      setResearchProjects(prev => prev.filter(r => r.id !== id));
    }
  };

  const addExperience = async (exp: Experience) => {
    try {
      const newExperience = await apiService.createExperience(exp);
      setExperience(prev => [...prev, newExperience]);
    } catch (error) {
      console.error('Failed to create experience:', error);
      setExperience(prev => [...prev, exp]);
    }
  };

  const updateExperience = async (id: string, exp: Experience) => {
    try {
      const updatedExperience = await apiService.updateExperience(id, exp);
      setExperience(prev => prev.map(e => e.id === id ? updatedExperience : e));
    } catch (error) {
      console.error('Failed to update experience:', error);
      setExperience(prev => prev.map(e => e.id === id ? exp : e));
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      await apiService.deleteExperience(id);
      setExperience(prev => prev.filter(e => e.id !== id));
    } catch (error) {
      console.error('Failed to delete experience:', error);
      setExperience(prev => prev.filter(e => e.id !== id));
    }
  };

  const addEducation = async (edu: Education) => {
    try {
      const newEducation = await apiService.createEducation(edu);
      setEducation(prev => [...prev, newEducation]);
    } catch (error) {
      console.error('Failed to create education:', error);
      setEducation(prev => [...prev, edu]);
    }
  };

  const updateEducation = async (id: string, edu: Education) => {
    try {
      const updatedEducation = await apiService.updateEducation(id, edu);
      setEducation(prev => prev.map(e => e.id === id ? updatedEducation : e));
    } catch (error) {
      console.error('Failed to update education:', error);
      setEducation(prev => prev.map(e => e.id === id ? edu : e));
    }
  };

  const deleteEducation = async (id: string) => {
    try {
      await apiService.deleteEducation(id);
      setEducation(prev => prev.filter(e => e.id !== id));
    } catch (error) {
      console.error('Failed to delete education:', error);
      setEducation(prev => prev.filter(e => e.id !== id));
    }
  };

  const addSkill = async (skill: Skill) => {
    try {
      const newSkill = await apiService.createSkill(skill);
      setSkills(prev => [...prev, newSkill]);
    } catch (error) {
      console.error('Failed to create skill:', error);
      setSkills(prev => [...prev, skill]);
    }
  };

  const updateSkill = async (name: string, skill: Skill) => {
    try {
      const updatedSkill = await apiService.updateSkillByName(name, skill);
      setSkills(prev => prev.map(s => s.name === name ? updatedSkill : s));
    } catch (error) {
      console.error('Failed to update skill:', error);
      setSkills(prev => prev.map(s => s.name === name ? skill : s));
    }
  };

  const deleteSkill = async (name: string) => {
    try {
      await apiService.deleteSkillByName(name);
      setSkills(prev => prev.filter(s => s.name !== name));
    } catch (error) {
      console.error('Failed to delete skill:', error);
      setSkills(prev => prev.filter(s => s.name !== name));
    }
  };

  return (
    <PortfolioContext.Provider value={{
      personalInfo,
      projects,
      researchProjects,
      experience,
      education,
      skills,
      updatePersonalInfo,
      addProject,
      updateProject,
      deleteProject,
      addResearchProject,
      updateResearchProject,
      deleteResearchProject,
      addExperience,
      updateExperience,
      deleteExperience,
      addEducation,
      updateEducation,
      deleteEducation,
      addSkill,
      updateSkill,
      deleteSkill
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};