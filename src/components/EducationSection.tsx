import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { GraduationCap, MapPin, Calendar, BookOpen, Sparkles, Award } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const { data } = usePortfolio();
  const { education } = data.profile;

  return (
    <section id="education" className="py-24 border-t border-slate-200/60 dark:border-slate-800/80 bg-slate-50/50 dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-16">
          <div className="text-xs font-mono tracking-widest text-[#4F8CFF] dark:text-[#36D9E8] uppercase">
            02 · Academic Foundation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineering Education
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Undergraduate engineering studies bridging electronic hardware architecture, telecommunications, and software computation.
          </p>
        </div>

        {/* Education Highlight Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Institution Card */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#10172A] p-8 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#4F8CFF] dark:text-[#36D9E8]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF] dark:bg-[#36D9E8]" />
                    <span>{education.academicStatus}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {education.degree}
                  </h3>
                  <div className="text-base font-semibold text-slate-700 dark:text-slate-300">
                    {education.institution}
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-right">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Cumulative CGPA
                  </div>
                  <div className="text-lg font-mono font-bold text-slate-900 dark:text-white">
                    {education.cgpa}
                  </div>
                </div>
              </div>

              {/* Context Row */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{education.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Expected Graduation: {education.expectedGraduation}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span>{education.academicStage}</span>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Currently undergoing rigorous coursework covering analog &amp; digital signal chains, microcontroller
                architectures, communication systems, algorithmic problem solving, and semiconductor devices.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Department of ECE</span>
              <span>Chennai, India</span>
            </div>
          </div>

          {/* Academic Interests & Relevant Domains */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#10172A] p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-[#8B5CF6]" />
                <h4 className="text-sm font-mono font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
                  Academic &amp; Coursework Focus
                </h4>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Curriculum areas and technical disciplines currently being explored and strengthened:
              </p>

              <div className="space-y-2.5">
                {education.academicInterests.map((interest, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF]" />
                    <span className="font-medium">{interest}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 font-mono">
              Theoretical foundations paired with hands-on labs &amp; projects
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
