import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  PortfolioData,
  ProfileInfo,
  SkillItem,
  ProjectItem,
  ExperienceItem,
  AchievementItem,
  CertificationItem,
} from '../types/portfolio';
import { initialPortfolioData } from '../data/portfolioData';

const STORAGE_KEY = 'dibika_portfolio_v1';
const THEME_KEY = 'dibika_portfolio_theme';

interface PortfolioContextType {
  data: PortfolioData;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isOwnerMode: boolean;
  setIsOwnerMode: (val: boolean) => void;
  isCmsOpen: boolean;
  setIsCmsOpen: (val: boolean) => void;
  updateProfile: (updates: Partial<ProfileInfo>) => void;
  updateSkills: (skills: SkillItem[]) => void;
  addSkill: (skill: Omit<SkillItem, 'id'>) => void;
  removeSkill: (id: string) => void;
  updateProject: (id: string, updates: Partial<ProjectItem>) => void;
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  removeProject: (id: string) => void;
  updateExperience: (id: string, updates: Partial<ExperienceItem>) => void;
  addExperience: (experience: Omit<ExperienceItem, 'id'>) => void;
  removeExperience: (id: string) => void;
  updateAchievement: (id: string, updates: Partial<AchievementItem>) => void;
  addAchievement: (achievement: Omit<AchievementItem, 'id'>) => void;
  removeAchievement: (id: string) => void;
  updateCertification: (id: string, updates: Partial<CertificationItem>) => void;
  addCertification: (cert: Omit<CertificationItem, 'id'>) => void;
  removeCertification: (id: string) => void;
  resetToDefaults: () => void;
  exportDataJson: () => void;
  importDataJson: (jsonStr: string) => boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback to initial
    }
    return initialPortfolioData;
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    } catch {
      // ignore
    }
    return 'dark'; // Midnight navy default as requested
  });

  const [isOwnerMode, setIsOwnerMode] = useState<boolean>(false);
  const [isCmsOpen, setIsCmsOpen] = useState<boolean>(false);

  // Sync theme to DOM
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
    root.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  // Sync data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Could not save portfolio to localStorage:', e);
    }
  }, [data]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const updateProfile = (updates: Partial<ProfileInfo>) => {
    setData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...updates,
        education: updates.education
          ? { ...prev.profile.education, ...updates.education }
          : prev.profile.education,
      },
    }));
  };

  const updateSkills = (skills: SkillItem[]) => {
    setData((prev) => ({ ...prev, skills }));
  };

  const addSkill = (skill: Omit<SkillItem, 'id'>) => {
    const newItem: SkillItem = {
      ...skill,
      id: `sk-${Date.now()}`,
    };
    setData((prev) => ({ ...prev, skills: [...prev.skills, newItem] }));
  };

  const removeSkill = (id: string) => {
    setData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s.id !== id) }));
  };

  const updateProject = (id: string, updates: Partial<ProjectItem>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));
  };

  const addProject = (project: Omit<ProjectItem, 'id'>) => {
    const newItem: ProjectItem = {
      ...project,
      id: `proj-${Date.now()}`,
    };
    setData((prev) => ({ ...prev, projects: [newItem, ...prev.projects] }));
  };

  const removeProject = (id: string) => {
    setData((prev) => ({ ...prev, projects: prev.projects.filter((p) => p.id !== id) }));
  };

  const updateExperience = (id: string, updates: Partial<ExperienceItem>) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    }));
  };

  const addExperience = (experience: Omit<ExperienceItem, 'id'>) => {
    const newItem: ExperienceItem = {
      ...experience,
      id: `exp-${Date.now()}`,
    };
    setData((prev) => ({ ...prev, experiences: [newItem, ...prev.experiences] }));
  };

  const removeExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id),
    }));
  };

  const updateAchievement = (id: string, updates: Partial<AchievementItem>) => {
    setData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((a) => (a.id === id ? { ...a, ...updates } : a)),
    }));
  };

  const addAchievement = (achievement: Omit<AchievementItem, 'id'>) => {
    const newItem: AchievementItem = {
      ...achievement,
      id: `ach-${Date.now()}`,
    };
    setData((prev) => ({ ...prev, achievements: [...prev.achievements, newItem] }));
  };

  const removeAchievement = (id: string) => {
    setData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((a) => a.id !== id),
    }));
  };

  const updateCertification = (id: string, updates: Partial<CertificationItem>) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    }));
  };

  const addCertification = (cert: Omit<CertificationItem, 'id'>) => {
    const newItem: CertificationItem = {
      ...cert,
      id: `cert-${Date.now()}`,
    };
    setData((prev) => ({ ...prev, certifications: [...prev.certifications, newItem] }));
  };

  const removeCertification = (id: string) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id),
    }));
  };

  const resetToDefaults = () => {
    if (window.confirm('Reset all portfolio content back to the verified default data?')) {
      setData(initialPortfolioData);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  };

  const exportDataJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dibika_portfolio_data_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importDataJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.profile && parsed.skills && parsed.projects) {
        setData(parsed);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON import', e);
    }
    return false;
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        theme,
        toggleTheme,
        isOwnerMode,
        setIsOwnerMode,
        isCmsOpen,
        setIsCmsOpen,
        updateProfile,
        updateSkills,
        addSkill,
        removeSkill,
        updateProject,
        addProject,
        removeProject,
        updateExperience,
        addExperience,
        removeExperience,
        updateAchievement,
        addAchievement,
        removeAchievement,
        updateCertification,
        addCertification,
        removeCertification,
        resetToDefaults,
        exportDataJson,
        importDataJson,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
