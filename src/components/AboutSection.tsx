import React, { useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Code2,
  Cpu,
  Sparkles,
  Camera,
  Layers,
  Compass,
  ArrowUpRight,
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { data, updateProfile, isOwnerMode } = usePortfolio();
  const { profile } = data;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WebP).');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be under 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateProfile({ customAvatarUrl: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const getPillarIcon = (number: string) => {
    switch (number) {
      case '01':
        return <Code2 className="w-5 h-5 text-[#4F8CFF]" />;
      case '02':
        return <Sparkles className="w-5 h-5 text-[#8B5CF6]" />;
      case '03':
      default:
        return <Cpu className="w-5 h-5 text-[#36D9E8]" />;
    }
  };

  return (
    <section id="about" className="py-24 border-t border-slate-200/60 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-16">
          <div className="text-xs font-mono tracking-widest text-[#4F8CFF] dark:text-[#36D9E8] uppercase">
            01 · Background &amp; Focus
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            A little about me
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            {profile.tagline}
          </p>
        </div>

        {/* Top Split: Bio prose + Profile Visual / Photo Upload Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Authentic Bio */}
          <div className="lg:col-span-7 space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed text-base">
            {profile.bioParagraphs.map((paragraph, idx) => (
              <p key={idx} className="text-justify sm:text-left">
                {paragraph}
              </p>
            ))}

            {/* Currently Exploring List */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                <Compass className="w-4 h-4 text-[#4F8CFF]" />
                <span>Currently Exploring</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.currentlyExploring.map((topic, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center text-xs px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 font-medium"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Profile Avatar / Monogram Card with Upload */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#0B1020] shadow-xl flex items-center justify-center text-center p-6">
              {profile.customAvatarUrl ? (
                <img
                  src={profile.customAvatarUrl}
                  alt={profile.fullName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4">
                  {/* Stylized Monogram Avatar */}
                  <div className="w-24 h-24 rounded-2xl bg-white dark:bg-gradient-to-tr dark:from-[#10172A] dark:to-[#1E293B] border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-inner relative">
                    <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#4F8CFF] to-[#36D9E8] font-mono">
                      DP
                    </span>
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#36D9E8] ring-4 ring-slate-100 dark:ring-[#0B1020]" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-slate-900 dark:text-white tracking-wide">{profile.fullName}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-0.5">Panimalar Engineering College</div>
                    <div className="text-[11px] text-[#4F8CFF] mt-1 font-mono">Chennai, Tamil Nadu</div>
                  </div>
                </div>
              )}

              {/* Upload trigger button (Always available for owner) */}
              <button
                onClick={() => fileInputRef.current?.click()}
                title="Upload Profile Picture"
                className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white cursor-pointer"
              >
                <Camera className="w-6 h-6 mb-1 text-[#36D9E8]" />
                <span className="text-xs font-semibold">
                  {profile.customAvatarUrl ? 'Replace Photo' : 'Upload Your Photo'}
                </span>
                <span className="text-[10px] text-slate-400 mt-1">PNG, JPG up to 2MB</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </div>

            {/* Remove custom photo option if one exists */}
            {profile.customAvatarUrl && (
              <button
                onClick={() => updateProfile({ customAvatarUrl: undefined })}
                className="mt-2 text-xs text-slate-500 hover:text-rose-500 transition-colors font-mono"
              >
                Reset to Monogram Avatar
              </button>
            )}

            <p className="mt-3 text-xs text-center text-slate-500 dark:text-slate-400 max-w-xs">
              Personal photograph can be uploaded securely anytime and stored locally in your browser session.
            </p>
          </div>
        </div>

        {/* 3 Visual Interest Pillars */}
        <div className="space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Core Development Areas
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profile.interestPillars.map((pillar) => (
              <div
                key={pillar.number}
                className="p-6 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#10172A]/70 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#4F8CFF] dark:text-[#36D9E8]">
                      {pillar.number}
                    </span>
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/70">
                      {getPillarIcon(pillar.number)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                      {pillar.subtitle}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 text-[11px] text-slate-400 font-mono">
                  Active Area of Study
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
