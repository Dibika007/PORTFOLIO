import React, { useState, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { SkillCategory, SkillLevel, ProjectCategory } from '../types/portfolio';
import {
  X,
  Save,
  Download,
  Upload,
  RotateCcw,
  Plus,
  Trash2,
  Check,
  User,
  GraduationCap,
  Wrench,
  Briefcase,
  Layers,
  Award,
  Database,
  Camera,
  FileText,
} from 'lucide-react';

export const OwnerCmsModal: React.FC = () => {
  const {
    data,
    isCmsOpen,
    setIsCmsOpen,
    updateProfile,
    addSkill,
    removeSkill,
    updateProject,
    addProject,
    removeProject,
    updateExperience,
    addExperience,
    removeExperience,
    addCertification,
    removeCertification,
    resetToDefaults,
    exportDataJson,
    importDataJson,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<
    'profile' | 'education' | 'skills' | 'experience' | 'projects' | 'achievements' | 'backup'
  >('profile');

  const [saveToast, setSaveToast] = useState(false);
  const jsonFileInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  // Local draft states for adding new items
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<SkillCategory>('Programming');
  const [newSkillLevel, setNewSkillLevel] = useState<SkillLevel>('Intermediate');
  const [newSkillNotes, setNewSkillNotes] = useState('');

  const [newExpRole, setNewExpRole] = useState('');
  const [newExpOrg, setNewExpOrg] = useState('');
  const [newExpDates, setNewExpDates] = useState('');
  const [newExpDesc, setNewExpDesc] = useState('');
  const [newExpType, setNewExpType] = useState<'experience' | 'leadership'>('experience');

  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjShortDesc, setNewProjShortDesc] = useState('');
  const [newProjFullDesc, setNewProjFullDesc] = useState('');
  const [newProjCategory, setNewProjCategory] = useState<Exclude<ProjectCategory, 'All'>>('Software Development');
  const [newProjTechStack, setNewProjTechStack] = useState('');

  const triggerSaved = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  if (!isCmsOpen) return null;

  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateProfile({ customAvatarUrl: reader.result });
        triggerSaved();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResumeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateProfile({ customResumeDataUrl: reader.result, resumeFileName: file.name });
        triggerSaved();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleJsonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const ok = importDataJson(reader.result);
        if (ok) {
          triggerSaved();
          alert('Portfolio data imported successfully!');
        } else {
          alert('Could not import JSON. Please ensure it follows the portfolio schema.');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cms-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-5xl h-[90vh] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#10172A] shadow-2xl flex flex-col overflow-hidden text-slate-900 dark:text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#4F8CFF]/10 text-[#4F8CFF]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 id="cms-dialog-title" className="text-lg font-bold text-slate-900 dark:text-white">
                Owner Content Management System
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Live editor with instant browser persistence &amp; configuration export
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {saveToast && (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-500 font-mono font-medium animate-pulse">
                <Check className="w-3.5 h-3.5" />
                <span>Changes Persisted</span>
              </span>
            )}
            <button
              onClick={() => setIsCmsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-[#0B1020] px-6 py-2 gap-2 text-xs font-medium">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'profile'
                ? 'bg-white dark:bg-[#10172A] text-[#4F8CFF] dark:text-[#36D9E8] font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile &amp; Bio</span>
          </button>

          <button
            onClick={() => setActiveTab('education')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'education'
                ? 'bg-white dark:bg-[#10172A] text-[#4F8CFF] dark:text-[#36D9E8] font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Education &amp; CGPA</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'skills'
                ? 'bg-white dark:bg-[#10172A] text-[#4F8CFF] dark:text-[#36D9E8] font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Skills ({data.skills.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('experience')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'experience'
                ? 'bg-white dark:bg-[#10172A] text-[#4F8CFF] dark:text-[#36D9E8] font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Experience &amp; Leadership</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'projects'
                ? 'bg-white dark:bg-[#10172A] text-[#4F8CFF] dark:text-[#36D9E8] font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Projects ({data.projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'backup'
                ? 'bg-white dark:bg-[#10172A] text-[#4F8CFF] dark:text-[#36D9E8] font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>JSON Backup &amp; Reset</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* TAB: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono font-medium text-slate-500">Full Name</label>
                  <input
                    type="text"
                    value={data.profile.fullName}
                    onChange={(e) => {
                      updateProfile({ fullName: e.target.value });
                      triggerSaved();
                    }}
                    className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-medium text-slate-500">Brand Name</label>
                  <input
                    type="text"
                    value={data.profile.brandName}
                    onChange={(e) => {
                      updateProfile({ brandName: e.target.value });
                      triggerSaved();
                    }}
                    className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono font-medium text-slate-500">Professional Headline</label>
                <input
                  type="text"
                  value={data.profile.professionalHeadline}
                  onChange={(e) => {
                    updateProfile({ professionalHeadline: e.target.value });
                    triggerSaved();
                  }}
                  className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono font-medium text-slate-500">Location</label>
                  <input
                    type="text"
                    value={data.profile.location}
                    onChange={(e) => {
                      updateProfile({ location: e.target.value });
                      triggerSaved();
                    }}
                    className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-medium text-slate-500">LinkedIn URL</label>
                  <input
                    type="url"
                    value={data.profile.linkedinUrl}
                    onChange={(e) => {
                      updateProfile({ linkedinUrl: e.target.value });
                      triggerSaved();
                    }}
                    className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono font-medium text-slate-500">GitHub Profile URL</label>
                <input
                  type="url"
                  value={data.profile.githubUrl}
                  onChange={(e) => {
                    updateProfile({ githubUrl: e.target.value });
                    triggerSaved();
                  }}
                  className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                />
              </div>

              {/* Biography Paragraphs */}
              <div className="space-y-3">
                <label className="text-xs font-mono font-medium text-slate-500">Biography Paragraphs</label>
                {data.profile.bioParagraphs.map((para, pIdx) => (
                  <textarea
                    key={pIdx}
                    rows={3}
                    value={para}
                    onChange={(e) => {
                      const updated = [...data.profile.bioParagraphs];
                      updated[pIdx] = e.target.value;
                      updateProfile({ bioParagraphs: updated });
                      triggerSaved();
                    }}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                  />
                ))}
              </div>

              {/* Avatar Upload */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">Profile Photo</div>
                  <div className="text-xs text-slate-500">
                    {data.profile.customAvatarUrl ? 'Custom photo uploaded' : 'Default schematic monogram avatar active'}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {data.profile.customAvatarUrl && (
                    <button
                      onClick={() => {
                        updateProfile({ customAvatarUrl: undefined });
                        triggerSaved();
                      }}
                      className="text-xs text-rose-500 font-mono hover:underline"
                    >
                      Reset Photo
                    </button>
                  )}
                  <button
                    onClick={() => avatarInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#4F8CFF] text-white"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Upload Image</span>
                  </button>
                  <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarFile} />
                </div>
              </div>
            </div>
          )}

          {/* TAB: EDUCATION */}
          {activeTab === 'education' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <label className="text-xs font-mono font-medium text-slate-500">Degree Title</label>
                <input
                  type="text"
                  value={data.profile.education.degree}
                  onChange={(e) => {
                    updateProfile({ education: { ...data.profile.education, degree: e.target.value } });
                    triggerSaved();
                  }}
                  className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-medium text-slate-500">Institution / College</label>
                <input
                  type="text"
                  value={data.profile.education.institution}
                  onChange={(e) => {
                    updateProfile({ education: { ...data.profile.education, institution: e.target.value } });
                    triggerSaved();
                  }}
                  className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-mono font-medium text-slate-500">CGPA</label>
                  <input
                    type="text"
                    value={data.profile.education.cgpa}
                    onChange={(e) => {
                      updateProfile({ education: { ...data.profile.education, cgpa: e.target.value } });
                      triggerSaved();
                    }}
                    className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-medium text-slate-500">Expected Graduation</label>
                  <input
                    type="text"
                    value={data.profile.education.expectedGraduation}
                    onChange={(e) => {
                      updateProfile({ education: { ...data.profile.education, expectedGraduation: e.target.value } });
                      triggerSaved();
                    }}
                    className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-medium text-slate-500">Academic Stage</label>
                  <input
                    type="text"
                    value={data.profile.education.academicStage}
                    onChange={(e) => {
                      updateProfile({ education: { ...data.profile.education, academicStage: e.target.value } });
                      triggerSaved();
                    }}
                    className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: SKILLS */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              {/* Add Skill form */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-3">
                <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                  Add New Technical Skill
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <input
                    type="text"
                    placeholder="Skill name (e.g. Docker, TypeScript)"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    className="px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                  <select
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value as SkillCategory)}
                    className="px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  >
                    <option value="Programming">Programming</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Data and Productivity">Data and Productivity</option>
                    <option value="Development Tools">Development Tools</option>
                    <option value="Emerging Technical Interests">Emerging Technical Interests</option>
                  </select>
                  <select
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(e.target.value as SkillLevel)}
                    className="px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  >
                    <option value="Learning">Learning</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                  <button
                    onClick={() => {
                      if (!newSkillName.trim()) return;
                      addSkill({
                        name: newSkillName.trim(),
                        category: newSkillCategory,
                        level: newSkillLevel,
                        notes: newSkillNotes.trim() || undefined,
                      });
                      setNewSkillName('');
                      setNewSkillNotes('');
                      triggerSaved();
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[#4F8CFF] text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Skill</span>
                  </button>
                </div>
              </div>

              {/* Skills list table */}
              <div className="divide-y divide-slate-200 dark:divide-slate-800">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-900 dark:text-white w-36 truncate">{skill.name}</span>
                      <span className="text-slate-400 font-mono w-44 truncate">{skill.category}</span>
                      <span className="text-[#4F8CFF] font-mono">{skill.level}</span>
                    </div>
                    <button
                      onClick={() => {
                        removeSkill(skill.id);
                        triggerSaved();
                      }}
                      className="p-1 rounded text-slate-400 hover:text-rose-500 transition-colors"
                      title="Delete skill"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              {/* Add experience */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-3">
                <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                  Add Role or Experience
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Role Title (e.g. Summer Intern)"
                    value={newExpRole}
                    onChange={(e) => setNewExpRole(e.target.value)}
                    className="px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                  <input
                    type="text"
                    placeholder="Organization (e.g. Tech Corp)"
                    value={newExpOrg}
                    onChange={(e) => setNewExpOrg(e.target.value)}
                    className="px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                  <input
                    type="text"
                    placeholder="Dates (e.g. June 2026 – August 2026)"
                    value={newExpDates}
                    onChange={(e) => setNewExpDates(e.target.value)}
                    className="px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                  <select
                    value={newExpType}
                    onChange={(e) => setNewExpType(e.target.value as 'experience' | 'leadership')}
                    className="px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  >
                    <option value="experience">Professional Experience / Internship</option>
                    <option value="leadership">Campus Leadership / Club Role</option>
                  </select>
                </div>
                <textarea
                  rows={2}
                  placeholder="Summary of responsibilities and achievements..."
                  value={newExpDesc}
                  onChange={(e) => setNewExpDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
                <button
                  onClick={() => {
                    if (!newExpRole.trim() || !newExpOrg.trim()) return;
                    addExperience({
                      role: newExpRole.trim(),
                      organization: newExpOrg.trim(),
                      dates: newExpDates.trim(),
                      description: newExpDesc.trim(),
                      type: newExpType,
                    });
                    setNewExpRole('');
                    setNewExpOrg('');
                    setNewExpDates('');
                    setNewExpDesc('');
                    triggerSaved();
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#4F8CFF] text-white"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Save Role</span>
                </button>
              </div>

              {/* Existing items */}
              <div className="space-y-4">
                {data.experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#10172A] flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-mono text-[#4F8CFF] font-semibold">{exp.organization}</div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{exp.role}</div>
                      <div className="text-xs text-slate-400 font-mono">{exp.dates} · {exp.type}</div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">{exp.description}</p>
                    </div>
                    <button
                      onClick={() => {
                        removeExperience(exp.id);
                        triggerSaved();
                      }}
                      className="p-1 rounded text-slate-400 hover:text-rose-500 transition-colors"
                      title="Delete experience entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {/* Add Project Form */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-3">
                <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                  Add New Featured Project
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Project Title"
                    value={newProjTitle}
                    onChange={(e) => setNewProjTitle(e.target.value)}
                    className="px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                  <select
                    value={newProjCategory}
                    onChange={(e) => setNewProjCategory(e.target.value as Exclude<ProjectCategory, 'All'>)}
                    className="px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  >
                    <option value="Software Development">Software Development</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Sustainability">Sustainability</option>
                    <option value="Learning Activities">Learning Activities</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Tech Stack comma-separated (e.g. React, Python, Scikit-Learn)"
                  value={newProjTechStack}
                  onChange={(e) => setNewProjTechStack(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
                <textarea
                  rows={2}
                  placeholder="Short Description for preview cards"
                  value={newProjShortDesc}
                  onChange={(e) => setNewProjShortDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
                <textarea
                  rows={3}
                  placeholder="Full Detailed Overview for modal dialog"
                  value={newProjFullDesc}
                  onChange={(e) => setNewProjFullDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
                <button
                  onClick={() => {
                    if (!newProjTitle.trim() || !newProjShortDesc.trim()) return;
                    addProject({
                      title: newProjTitle.trim(),
                      shortDescription: newProjShortDesc.trim(),
                      fullDescription: newProjFullDesc.trim() || newProjShortDesc.trim(),
                      category: newProjCategory,
                      status: 'In development',
                      techStack: newProjTechStack.split(',').map((s) => s.trim()).filter(Boolean),
                    });
                    setNewProjTitle('');
                    setNewProjShortDesc('');
                    setNewProjFullDesc('');
                    setNewProjTechStack('');
                    triggerSaved();
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#4F8CFF] text-white"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Save Project</span>
                </button>
              </div>

              {/* Projects List */}
              <div className="space-y-4">
                {data.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#10172A] flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-mono text-[#36D9E8]">{proj.category} · {proj.status}</div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{proj.title}</div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{proj.shortDescription}</p>
                      <div className="text-[11px] font-mono text-slate-400 mt-1">
                        Stack: {proj.techStack.join(', ')}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        removeProject(proj.id);
                        triggerSaved();
                      }}
                      className="p-1 rounded text-slate-400 hover:text-rose-500 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: BACKUP & EXPORT */}
          {activeTab === 'backup' && (
            <div className="space-y-6 max-w-2xl">
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Export Portfolio Configuration
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Download a full JSON snapshot of your current content (biography, CGPA, projects, experiences, and skills).
                    You can save this file in your source control or restore it anytime.
                  </p>
                </div>
                <button
                  onClick={exportDataJson}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-[#4F8CFF] text-white hover:bg-[#3b79f0] transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export JSON File</span>
                </button>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Import Portfolio Configuration
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Upload a previously exported JSON file to populate all portfolio sections instantly.
                  </p>
                </div>
                <button
                  onClick={() => jsonFileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span>Choose JSON File</span>
                </button>
                <input
                  ref={jsonFileInputRef}
                  type="file"
                  accept="application/json"
                  className="hidden"
                  onChange={handleJsonUpload}
                />
              </div>

              <div className="p-6 rounded-2xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/40 dark:bg-rose-950/20 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-rose-600 dark:text-rose-400">
                    Reset to Verified Defaults
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Revert all portfolio data back to the verified default data provided in your specification.
                  </p>
                </div>
                <button
                  onClick={resetToDefaults}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Data</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
