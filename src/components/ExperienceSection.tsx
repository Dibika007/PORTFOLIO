import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Briefcase,
  Users,
  Calendar,
  Sparkles,
  Award,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { data } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'all' | 'experience' | 'leadership'>('all');

  const professionalExperiences = data.experiences.filter((e) => e.type === 'experience');
  const leadershipRoles = data.experiences.filter((e) => e.type === 'leadership');

  const displayedList =
    activeTab === 'all'
      ? data.experiences
      : activeTab === 'experience'
      ? professionalExperiences
      : leadershipRoles;

  return (
    <section id="experience" className="py-24 border-t border-slate-200/60 dark:border-slate-800/80 bg-slate-50/50 dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <div className="text-xs font-mono tracking-widest text-[#4F8CFF] dark:text-[#36D9E8] uppercase">
            04 · Journey &amp; Leadership
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Experience &amp; Campus Leadership
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            A chronological timeline of professional internships, open-source initiatives, ambassadorships, and campus leadership roles.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-900/80 rounded-xl border border-slate-200/80 dark:border-slate-800 mb-12 w-fit">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'all'
                ? 'bg-white dark:bg-[#10172A] text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Engagements ({data.experiences.length})
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'experience'
                ? 'bg-white dark:bg-[#10172A] text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Internships &amp; Ambassadorships ({professionalExperiences.length})
          </button>
          <button
            onClick={() => setActiveTab('leadership')}
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'leadership'
                ? 'bg-white dark:bg-[#10172A] text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Campus Leadership ({leadershipRoles.length})
          </button>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-8 border-l border-slate-200 dark:border-slate-800 space-y-12">
          {displayedList.map((item, index) => {
            const isAmbassador = item.organization.includes('Google');
            return (
              <div key={item.id} className="relative group">
                {/* Timeline node */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 bg-white dark:bg-[#0B1020] transition-colors ${
                    isAmbassador
                      ? 'border-[#36D9E8] ring-4 ring-[#36D9E8]/20'
                      : 'border-slate-400 dark:border-slate-600 group-hover:border-[#4F8CFF]'
                  }`}
                />

                <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#10172A] shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-4">
                  {/* Role Header */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">
                        <span className="font-semibold text-[#4F8CFF] dark:text-[#36D9E8]">
                          {item.organization}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{item.type === 'leadership' ? 'Campus Leadership' : 'Professional Experience'}</span>
                        {item.status && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-slate-500">{item.status}</span>
                          </>
                        )}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        {item.role}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.dates}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Associated Skills */}
                  {item.skills && item.skills.length > 0 && (
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">Skills:</span>
                      {item.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
