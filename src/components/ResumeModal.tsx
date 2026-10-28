import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  X,
  Download,
  Printer,
  Linkedin,
  Github,
  Mail,
  MapPin,
  Calendar,
  Award,
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, onDownload }) => {
  const { data } = usePortfolio();
  const { profile } = data;
  const { education } = profile;
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-doc-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1020] shadow-2xl flex flex-col text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Action Toolbar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B1020]/95 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold font-mono text-[#4F8CFF]">Dibika_P_Resume.pdf</span>
            <span className="text-xs text-slate-400">· Document Viewer</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              title="Print Resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={onDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#4F8CFF] text-white hover:bg-[#3b79f0] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close resume viewer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document View */}
        <div ref={printRef} className="p-8 sm:p-12 space-y-8 print:p-0 print:text-black">
          {/* Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
            <h1 id="resume-doc-title" className="text-3xl font-extrabold tracking-tight">
              {data.profile.fullName}
            </h1>
            <p className="text-sm font-medium text-[#4F8CFF] dark:text-[#36D9E8]">
              {data.profile.professionalHeadline}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-mono pt-1">
              <span>{data.profile.location}</span>
              <span>·</span>
              <a
                href={data.profile.linkedinUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="hover:underline text-[#4F8CFF]"
              >
                LinkedIn: {data.profile.linkedinUrl.replace('https://www.', '')}
              </a>
              <span>·</span>
              <a
                href={data.profile.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="hover:underline text-[#4F8CFF]"
              >
                GitHub: {data.profile.githubUrl.replace('https://', '')}
              </a>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold border-b border-slate-100 dark:border-slate-800 pb-1">
              Education
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-sm">
              <div>
                <strong className="text-base text-slate-900 dark:text-white">
                  {data.profile.education.institution}
                </strong>
                <div className="text-slate-600 dark:text-slate-300">
                  {data.profile.education.degree}
                </div>
              </div>
              <div className="text-right text-xs font-mono text-slate-500 shrink-0">
                <div>Graduation: {data.profile.education.expectedGraduation}</div>
                <div>CGPA: <strong className="text-slate-900 dark:text-white font-bold">{data.profile.education.cgpa}</strong></div>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold border-b border-slate-100 dark:border-slate-800 pb-1">
              Experience &amp; Internships
            </h2>
            <div className="space-y-5">
              {data.experiences
                .filter((e) => e.type === 'experience')
                .map((exp) => (
                  <div key={exp.id} className="space-y-1 text-sm">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {exp.role} <span className="font-normal text-slate-500">— {exp.organization}</span>
                      </span>
                      <span className="text-xs font-mono text-slate-500 shrink-0">{exp.dates}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold border-b border-slate-100 dark:border-slate-800 pb-1">
              Selected Technical Projects
            </h2>
            <div className="space-y-5">
              {data.projects.map((proj) => (
                <div key={proj.id} className="space-y-1 text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {proj.title}
                    </span>
                    <span className="text-xs font-mono text-slate-500 shrink-0">{proj.status}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {proj.shortDescription}
                  </p>
                  <div className="text-[11px] font-mono text-slate-500">
                    Stack: {proj.techStack.join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold border-b border-slate-100 dark:border-slate-800 pb-1">
              Technical Proficiencies &amp; Interests
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <strong className="font-mono text-slate-500">Programming: </strong>
                <span>Java, Python, C++</span>
              </div>
              <div>
                <strong className="font-mono text-slate-500">Web Development: </strong>
                <span>HTML, CSS, Responsive Web Design</span>
              </div>
              <div>
                <strong className="font-mono text-slate-500">Data Tools: </strong>
                <span>Tableau, Microsoft Excel</span>
              </div>
              <div>
                <strong className="font-mono text-slate-500">Hardware &amp; Tools: </strong>
                <span>GitHub, Git, KiCad EDA</span>
              </div>
              <div className="sm:col-span-2">
                <strong className="font-mono text-slate-500">Emerging Focus: </strong>
                <span>AI/ML, Embedded Systems, IoT, VLSI &amp; Semiconductor Technologies</span>
              </div>
            </div>
          </div>

          {/* Leadership & Activities */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold border-b border-slate-100 dark:border-slate-800 pb-1">
              Leadership &amp; Campus Engagement
            </h2>
            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <li>Google Student Ambassador | Gemini Campus Ambassador 2026</li>
              <li>UCI/YUCI ECE Club Coordinator &amp; AICTE-associated KiCad PCB Teaching Activity</li>
              <li>Class / Block Leader &amp; Parade Controller, Panimalar Engineering College</li>
              <li>Department Student Mentor supporting junior peers in core engineering subjects</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
