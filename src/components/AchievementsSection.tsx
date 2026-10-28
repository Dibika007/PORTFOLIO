import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Trophy,
  Award,
  Star,
  CheckCircle,
  ExternalLink,
  Users,
  Compass,
  Cpu,
  GitBranch,
} from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const { data } = usePortfolio();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Ambassador':
        return <Star className="w-5 h-5 text-amber-500" />;
      case 'Competition':
        return <Trophy className="w-5 h-5 text-[#4F8CFF]" />;
      case 'Leadership':
        return <Users className="w-5 h-5 text-[#8B5CF6]" />;
      case 'Open Source':
        return <GitBranch className="w-5 h-5 text-emerald-500" />;
      case 'Academic':
      default:
        return <Award className="w-5 h-5 text-[#36D9E8]" />;
    }
  };

  return (
    <section id="achievements" className="py-24 border-t border-slate-200/60 dark:border-slate-800/80 bg-slate-50/50 dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-16">
          <div className="text-xs font-mono tracking-widest text-[#4F8CFF] dark:text-[#36D9E8] uppercase">
            06 · Recognition &amp; Milestones
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Achievements &amp; Honors
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Recorded milestones across ambassador initiatives, competitive campus programs, and engineering leadership.
          </p>
        </div>

        {/* 3-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.achievements.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#10172A] hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-4">
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80">
                    {getCategoryIcon(item.category)}
                  </div>

                  {item.date && (
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                      {item.date}
                    </span>
                  )}
                </div>

                <div>
                  <div className="text-xs font-mono text-[#4F8CFF] dark:text-[#36D9E8] mb-1 font-semibold">
                    {item.organization}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Specific Stats (e.g. GeeksforGeeks Campus Mantri) */}
                {item.stats && item.stats.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    {item.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="p-2 rounded bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-center">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">
                          {stat.label}
                        </div>
                        <div className="text-xs font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Status footer */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 dark:text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{item.verificationStatus || 'Verified Milestone'}</span>
                </span>
                {item.verificationUrl ? (
                  <a
                    href={item.verificationUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-[#4F8CFF] dark:hover:text-[#36D9E8] transition-colors flex items-center gap-1"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[11px] text-slate-400">Details logged</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
