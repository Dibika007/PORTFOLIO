import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Sun,
  Moon,
  Menu,
  X,
  FileText,
  Sliders,
  ExternalLink,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { data, theme, toggleTheme, isOwnerMode, setIsOwnerMode, setIsCmsOpen } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'education', 'skills', 'experience', 'projects', 'achievements', 'certifications', 'resume', 'contact'];
      const scrollPos = window.scrollY + 140;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Achievements', href: '#achievements', id: 'achievements' },
    { label: 'Resume', href: '#resume', id: 'resume' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/90 dark:bg-[#0B1020]/90 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/80 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          className="group flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#4F8CFF] to-[#36D9E8] flex items-center justify-center text-white font-mono text-sm font-extrabold shadow-sm group-hover:scale-105 transition-transform">
            DP
          </div>
          <span className="font-extrabold tracking-wider">{data.profile.brandName}</span>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative hover:text-slate-900 dark:hover:text-white ${
                  isActive
                    ? 'text-[#4F8CFF] dark:text-[#36D9E8] font-semibold'
                    : ''
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4F8CFF] dark:bg-[#36D9E8] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action + Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Owner Mode Toggle */}
          <button
            onClick={() => {
              setIsOwnerMode(!isOwnerMode);
              if (!isOwnerMode) setIsCmsOpen(true);
            }}
            title={isOwnerMode ? 'Owner CMS Active (Click to open editor)' : 'Switch to Owner Edit Mode'}
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono rounded-md border transition-all ${
              isOwnerMode
                ? 'bg-amber-500/10 border-amber-500 text-amber-500 dark:text-amber-400 font-semibold shadow-sm'
                : 'border-slate-300 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="text-[11px]">{isOwnerMode ? 'CMS Active' : 'Owner CMS'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-2 focus-visible:outline-[#4F8CFF]"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Primary CTA */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-medium text-white bg-[#4F8CFF] hover:bg-[#3d77e6] dark:bg-[#4F8CFF] dark:hover:bg-[#3b79f0] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-[#4F8CFF]/20"
          >
            Let's Connect
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#0B1020]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-6 py-5 shadow-2xl">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 text-sm font-medium transition-colors border-b border-slate-100 dark:border-slate-800/60 ${
                  activeSection === link.id
                    ? 'text-[#4F8CFF] dark:text-[#36D9E8] font-bold'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-sm font-medium text-[#4F8CFF] dark:text-[#36D9E8]"
            >
              Contact
            </a>

            <div className="pt-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsOwnerMode(true);
                  setIsCmsOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-mono border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200"
              >
                <Sliders className="w-4 h-4" />
                <span>Owner Content Management</span>
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 px-4 rounded-lg text-xs font-semibold text-white bg-[#4F8CFF]"
              >
                Let's Connect
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
