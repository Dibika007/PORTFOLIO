import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Award,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Plus,
} from 'lucide-react';

export const CertificationsSection: React.FC = () => {
  const { data, setIsCmsOpen, isOwnerMode } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Programming',
    'Artificial Intelligence and Machine Learning',
    'Electronics and Embedded Systems',
    'Cloud and Developer Tools',
    'Sustainability',
    'Leadership and Professional Development',
  ];

  const filteredCerts =
    selectedCategory === 'All'
      ? data.certifications
      : data.certifications.filter((c) => c.category === selectedCategory);

  return (
    <section id="certifications" className="py-24 border-t border-slate-200/60 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <div className="text-xs font-mono tracking-widest text-[#4F8CFF] dark:text-[#36D9E8] uppercase">
            07 · Verified Learning
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Certifications &amp; Badges
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Formal technical badges, verified coursework credentials, and professional development milestones.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-900/80 rounded-xl border border-slate-200/80 dark:border-slate-800 mb-10 w-fit">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-[#10172A] text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#10172A] hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between shadow-xs space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="text-[#4F8CFF] dark:text-[#36D9E8] font-semibold">{cert.issuer}</span>
                  {cert.issueDate && <span>{cert.issueDate}</span>}
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-[#4F8CFF] shrink-0 mt-0.5">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {cert.name}
                    </h3>
                    <div className="text-[11px] font-mono text-slate-500 mt-0.5">{cert.category}</div>
                  </div>
                </div>

                {cert.skillsGained && cert.skillsGained.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="text-[11px] font-mono text-slate-400">Competencies verified:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skillsGained.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 text-[#4F8CFF] hover:underline"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-slate-400">Verified Badge Record</span>
                )}

                {cert.credentialId && (
                  <span className="text-[11px] text-slate-500 font-mono">ID: {cert.credentialId}</span>
                )}
              </div>
            </div>
          ))}

          {/* Add Certificate Card for Owner */}
          <div
            onClick={() => setIsCmsOpen(true)}
            className="p-6 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 hover:border-[#4F8CFF] dark:hover:border-[#36D9E8] transition-colors flex flex-col items-center justify-center text-center space-y-2 cursor-pointer group bg-slate-50/50 dark:bg-transparent"
          >
            <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:scale-105 transition-transform text-[#4F8CFF]">
              <Plus className="w-5 h-5" />
            </div>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Add New Certification
            </div>
            <p className="text-xs text-slate-500 max-w-xs">
              Manage and append verified badges, certificates, and course completion records via the Owner CMS.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
