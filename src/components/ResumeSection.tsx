import React, { useState, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ResumeModal } from './ResumeModal';
import {
  FileText,
  Download,
  Eye,
  Linkedin,
  Github,
  Upload,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

export const ResumeSection: React.FC = () => {
  const { data, updateProfile, isOwnerMode } = usePortfolio();
  const { profile } = data;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownload = () => {
    if (profile.customResumeDataUrl) {
      // Download the uploaded custom PDF
      const a = document.createElement('a');
      a.href = profile.customResumeDataUrl;
      a.download = profile.resumeFileName || 'Dibika_P_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    // Default download action: open print view or generate structured download
    setIsModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a valid PDF document.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('PDF file size must be less than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateProfile({
          customResumeDataUrl: reader.result,
          resumeFileName: file.name,
        });
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="resume" className="py-24 border-t border-slate-200/60 dark:border-slate-800/80 bg-slate-50/50 dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#10172A] p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl space-y-6">
            <div className="text-xs font-mono tracking-widest text-[#4F8CFF] dark:text-[#36D9E8] uppercase">
              08 · Professional Document
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Interested in my journey?
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Explore my education, technical skills, project work, and experience in a clean, comprehensive format.
              Review verified milestones, coursework tracks, and community leadership engagements.
            </p>

            {/* Document preview card */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-red-500/10 text-red-500 shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                    {profile.resumeFileName || 'Dibika_P_Resume.pdf'}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    B.E. Electronics &amp; Communication Engineering · Class of 2028
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#4F8CFF]" />
                  <span>View Resume</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#4F8CFF] hover:bg-[#3b79f0] transition-colors cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resume</span>
                </button>
              </div>
            </div>

            {/* Quick Link Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#0077B5]" />
                <span>Connect on LinkedIn</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Explore GitHub</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              {/* Owner Upload Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer border border-dashed border-slate-300 dark:border-slate-700"
                title="Upload updated PDF resume file"
              >
                <Upload className="w-3.5 h-3.5 text-[#36D9E8]" />
                <span>{profile.customResumeDataUrl ? 'Replace PDF Asset' : 'Upload PDF Resume'}</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>

            {uploadSuccess && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-500 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Resume PDF updated successfully! Saved to your browser workspace.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <ResumeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDownload={handleDownload}
      />
    </section>
  );
};
