import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { SkillCategory, SkillLevel } from '../types/portfolio';
import {
  Code,
  Globe,
  Database,
  Wrench,
  Cpu,
  BookOpen,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { data } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: { label: string; value: string; icon: React.ReactNode }[] = [
    { label: 'All Domains', value: 'All', icon: <Filter className="w-3.5 h-3.5" /> },
    { label: 'Programming', value: 'Programming', icon: <Code className="w-3.5 h-3.5" /> },
    { label: 'Web Development', value: 'Web Development', icon: <Globe className="w-3.5 h-3.5" /> },
    { label: 'Data & Productivity', value: 'Data and Productivity', icon: <Database className="w-3.5 h-3.5" /> },
    { label: 'Development Tools', value: 'Development Tools', icon: <Wrench className="w-3.5 h-3.5" /> },
    { label: 'Emerging Interests', value: 'Emerging Technical Interests', icon: <Cpu className="w-3.5 h-3.5" /> },
  ];

  const filteredSkills =
    selectedCategory === 'All'
      ? data.skills
      : data.skills.filter((skill) => skill.category === selectedCategory);

  const getLevelBadge = (level: SkillLevel) => {
    switch (level) {
      case 'Advanced':
        return (
          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
            Advanced
          </span>
        );
      case 'Intermediate':
        return (
          <span className="text-[11px] font-mono text-[#4F8CFF] dark:text-[#36D9E8] font-semibold">
            Intermediate
          </span>
        );
      case 'Beginner':
        return (
          <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 font-medium">
            Beginner
          </span>
        );
      case 'Learning':
      default:
        return (
          <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Learning
          </span>
        );
    }
  };

  return (
    <section id="skills" className="py-24 border-t border-slate-200/60 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <div className="text-xs font-mono tracking-widest text-[#4F8CFF] dark:text-[#36D9E8] uppercase">
            03 · Technical Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Skills &amp; Technical Interests
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            A transparent overview of programming languages, productivity tools, and hardware-software domains
            with verified proficiency tiers.
          </p>
        </div>

        {/* Interactive Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-900/80 rounded-xl border border-slate-200/80 dark:border-slate-800 mb-10 w-fit">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-[#10172A] text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#10172A] hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between space-y-3 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {skill.name}
                  </h3>
                  {getLevelBadge(skill.level)}
                </div>
                <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">
                  {skill.category}
                </div>
              </div>

              {skill.notes && (
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-2.5">
                  {skill.notes}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Currently Learning Subsection */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-50 to-white dark:from-[#10172A] dark:to-[#0B1020] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#4F8CFF]" />
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Active Learning Roadmaps
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Disciplines currently being actively developed through coursework, projects, and self-study
                </p>
              </div>
            </div>
            <div className="text-xs font-mono text-[#36D9E8] px-2.5 py-1 rounded bg-[#36D9E8]/10 w-fit">
              Semester Study Tracks
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.currentlyLearning.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#36D9E8] mt-1.5 shrink-0" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
