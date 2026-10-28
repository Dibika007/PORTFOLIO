import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { CircuitGraphic } from './CircuitGraphic';
import {
  ArrowDown,
  Linkedin,
  Github,
  MapPin,
  GraduationCap,
  Award,
  Copy,
  Check,
  FileDown,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { data } = usePortfolio();
  const { profile } = data;
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState<'linkedin' | 'github' | null>(null);

  // Rotating headline without layout shift
  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % profile.rotatingHeadlines.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [profile.rotatingHeadlines.length]);

  const copyToClipboard = (url: string, type: 'linkedin' | 'github') => {
    navigator.clipboard.writeText(url);
    setCopiedLink(type);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-24 pb-16 flex flex-col justify-between overflow-hidden"
    >
      {/* Subtle background circuit accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#4F8CFF]/5 dark:bg-[#4F8CFF]/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#8B5CF6]/5 dark:bg-[#8B5CF6]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        {/* Main 2-column Hero split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#4F8CFF] dark:text-[#36D9E8] uppercase">
              <span className="w-2 h-0.5 bg-[#4F8CFF] dark:bg-[#36D9E8]" />
              <span>ELECTRONICS &amp; COMMUNICATION ENGINEERING</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Hi, I'm <span className="text-[#4F8CFF] dark:text-[#36D9E8]">{profile.fullName}</span>.
              </h1>

              {/* Fixed height container for rotating headlines to prevent layout shift */}
              <div className="h-10 sm:h-12 flex items-center overflow-hidden">
                <p
                  key={headlineIndex}
                  className="text-xl sm:text-2xl font-medium text-slate-700 dark:text-slate-300 transition-all duration-500 transform translate-y-0 opacity-100"
                >
                  {profile.rotatingHeadlines[headlineIndex]}
                </p>
              </div>
            </div>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              I'm an Electronics and Communication Engineering student at Panimalar Engineering College,
              interested in software development, artificial intelligence, embedded systems, and technology-driven
              problem solving. I enjoy learning new technologies, building practical projects, and contributing to
              communities that help students grow.
            </p>

            {/* Quick Context Badges - Unboxed metadata */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-medium text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#4F8CFF]" />
                <span>{profile.location}</span>
              </div>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>B.E. ECE · Expected {profile.education.expectedGraduation}</span>
              </div>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#36D9E8]" />
                <span>CGPA: <strong className="text-slate-900 dark:text-white font-mono">{profile.education.cgpa}</strong></span>
              </div>
            </div>

            {/* Primary Action Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#4F8CFF] hover:bg-[#3b79f0] transition-colors shadow-md shadow-[#4F8CFF]/20"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#resume"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-800 dark:text-slate-100 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 border border-slate-300/80 dark:border-slate-700/80 transition-colors"
              >
                <FileDown className="w-4 h-4 text-[#4F8CFF]" />
                <span>Download Resume</span>
              </a>

              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#0077B5]" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>

            {/* Working Social & Copy Affordances */}
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-mono text-[11px]">Connect:</span>
              <div className="flex items-center gap-2">
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                  aria-label="GitHub Profile"
                  title="Visit GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <button
                  onClick={() => copyToClipboard(profile.githubUrl, 'github')}
                  className="inline-flex items-center gap-1 text-[11px] font-mono hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                  title="Copy GitHub URL"
                >
                  {copiedLink === 'github' ? (
                    <Check className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>{copiedLink === 'github' ? 'Copied' : 'github.com/Dibika007'}</span>
                </button>
              </div>

              <span aria-hidden="true">·</span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(profile.linkedinUrl, 'linkedin')}
                  className="inline-flex items-center gap-1 text-[11px] font-mono hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                  title="Copy LinkedIn URL"
                >
                  {copiedLink === 'linkedin' ? (
                    <Check className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>{copiedLink === 'linkedin' ? 'Copied' : 'dibika-p-7aaa32323'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Engineering-Inspired Interactive Circuit Graphic */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <CircuitGraphic />
          </div>
        </div>

        {/* Academic & Professional Overview Row (Full-width row below split) */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="space-y-1">
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Department
            </div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white">
              Electronics &amp; Comm.
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Panimalar Engg. College</div>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Academic Standing
            </div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white font-mono">
              8.35 / 10 CGPA
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Class of 2028 · Pre-Final Year</div>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Campus Ambassador
            </div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white">
              Google Student Ambassador
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Gemini Campus Ambassador '26</div>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Focus Tracks
            </div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white">
              Software &amp; Embedded
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Java · AI/ML · KiCad · Web</div>
          </div>
        </div>

        {/* Minimal Scroll Indicator */}
        <div className="mt-8 flex justify-center">
          <a
            href="#about"
            aria-label="Scroll to About section"
            className="group p-2 rounded-full text-slate-400 hover:text-[#4F8CFF] transition-colors flex flex-col items-center gap-1"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase opacity-70 group-hover:opacity-100">
              Scroll
            </span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
