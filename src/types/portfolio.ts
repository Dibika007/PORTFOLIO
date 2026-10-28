export type SkillLevel = 'Learning' | 'Beginner' | 'Intermediate' | 'Advanced';

export type SkillCategory =
  | 'Programming'
  | 'Web Development'
  | 'Data and Productivity'
  | 'Development Tools'
  | 'Emerging Technical Interests';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  iconName?: string;
  notes?: string;
}

export type ProjectCategory =
  | 'All'
  | 'Software Development'
  | 'AI/ML'
  | 'Electronics'
  | 'Sustainability'
  | 'Learning Activities';

export interface ProjectMetric {
  modelName: string;
  accuracy: string;
  f1Score: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: Exclude<ProjectCategory, 'All'>;
  status: string;
  techStack: string[];
  thumbnail?: string;
  metrics?: ProjectMetric[];
  metricsNote?: string;
  keyAreas?: string[];
  challenges?: string;
  learningOutcomes?: string[];
  githubUrl?: string;
  demoUrl?: string;
  organization?: string;
  dates?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  dates: string;
  status?: string;
  description: string;
  skills?: string[];
  type: 'experience' | 'leadership';
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  date?: string;
  description: string;
  category: 'Ambassador' | 'Competition' | 'Leadership' | 'Open Source' | 'Internship' | 'Academic';
  stats?: { label: string; value: string }[];
  verificationStatus?: string;
  verificationUrl?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  category: string;
  skillsGained?: string[];
}

export interface EducationInfo {
  degree: string;
  institution: string;
  location: string;
  expectedGraduation: string;
  academicStage: string;
  cgpa: string;
  academicStatus: string;
  academicInterests: string[];
}

export interface ProfileInfo {
  fullName: string;
  brandName: string;
  tagline: string;
  supportingTagline: string;
  professionalHeadline: string;
  rotatingHeadlines: string[];
  bioParagraphs: string[];
  location: string;
  education: EducationInfo;
  linkedinUrl: string;
  githubUrl: string;
  customAvatarUrl?: string;
  resumeFileName?: string;
  customResumeDataUrl?: string;
  currentlyExploring: string[];
  interestPillars: {
    number: string;
    title: string;
    subtitle: string;
    description: string;
  }[];
}

export interface PortfolioData {
  profile: ProfileInfo;
  skills: SkillItem[];
  currentlyLearning: string[];
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  achievements: AchievementItem[];
  certifications: CertificationItem[];
}
