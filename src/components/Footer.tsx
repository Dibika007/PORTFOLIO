import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUp, Github, Linkedin, Sliders } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, isOwnerMode, setIsOwnerMode, setIsCmsOpen } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-900 dark:bg-[#0B1020] text-slate-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Wordmark & Tagline */}
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-extrabold text-white text-base font-mono tracking-wider">
                {data.profile.brandName}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">Electronics &amp; Communication Engineering</span>
            </div>
            <p className="text-slate-500 text-xs">
              {data.profile.tagline}
            </p>
          </div>

          {/* Quiet Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#education" className="hover:text-white transition-colors">Education</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#achievements" className="hover:text-white transition-colors">Achievements</a>
            <a href="#resume" className="hover:text-white transition-colors">Resume</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={data.profile.linkedinUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-white transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={data.profile.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Bar: Quiet Copyright & Owner Mode Affordance */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 font-mono text-[11px]">
          <div>
            © {new Date().getFullYear()} {data.profile.fullName}. Built with precision in Chennai, India.
          </div>

          <div className="flex items-center gap-3">
            <span>Portfolio v1.0</span>
            <span>·</span>
            <button
              onClick={() => {
                setIsOwnerMode(!isOwnerMode);
                setIsCmsOpen(true);
              }}
              className="hover:text-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Sliders className="w-3 h-3 text-[#36D9E8]" />
              <span>{isOwnerMode ? 'Manage Content (Open)' : 'Owner Content Settings'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
