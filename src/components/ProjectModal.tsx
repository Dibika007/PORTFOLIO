import React, { useEffect } from 'react';
import { ProjectItem } from '../types/portfolio';
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertCircle,
  Cpu,
  BarChart2,
  Calendar,
  Layers,
} from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#10172A] p-6 sm:p-8 shadow-2xl space-y-6 text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#4F8CFF] dark:text-[#36D9E8]">
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>{project.status}</span>
              {project.dates && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-400">{project.dates}</span>
                </>
              )}
            </div>
            <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close project details"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Detailed Prose */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Project Overview
          </h3>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {project.fullDescription}
          </p>
        </div>

        {/* Empirical Metrics Table (If Flood Guard AI or ML Project) */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="space-y-3 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-white">
              <BarChart2 className="w-4 h-4 text-[#4F8CFF]" />
              <span>Comparative Classifier Performance</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono">
                    <th className="py-2 font-medium">Model Architecture</th>
                    <th className="py-2 font-medium">Classification Accuracy</th>
                    <th className="py-2 font-medium">F1 Score (Hazard Positive)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                  {project.metrics.map((m, idx) => (
                    <tr key={idx} className="hover:bg-slate-100/50 dark:hover:bg-slate-800/40">
                      <td className="py-2.5 font-sans font-semibold text-slate-800 dark:text-slate-200">
                        {m.modelName}
                      </td>
                      <td className="py-2.5 text-slate-700 dark:text-slate-300 tabular-nums">
                        {m.accuracy}
                      </td>
                      <td className="py-2.5 text-[#4F8CFF] dark:text-[#36D9E8] font-bold tabular-nums">
                        {m.f1Score}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {project.metricsNote && (
              <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Methodology Note: </span>
                {project.metricsNote}
              </div>
            )}
          </div>
        )}

        {/* Key Areas / Deliverables */}
        {project.keyAreas && project.keyAreas.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Core Technical Deliverables
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.keyAreas.map((area, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#36D9E8] shrink-0" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Challenges & Learning Outcomes */}
        {(project.challenges || (project.learningOutcomes && project.learningOutcomes.length > 0)) && (
          <div className="space-y-4 pt-2">
            {project.challenges && (
              <div className="space-y-1">
                <h4 className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Engineering Challenges Addressed
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {project.challenges}
                </p>
              </div>
            )}

            {project.learningOutcomes && project.learningOutcomes.length > 0 && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Key Learning Outcomes
                </h4>
                <ul className="space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {project.learningOutcomes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#4F8CFF] mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Tech Stack */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Technology Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-medium border border-slate-200 dark:border-slate-700/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* External Links / Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View Source Repository</span>
              </a>
            ) : (
              <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                Repository in active development
              </span>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#4F8CFF] hover:bg-[#3b79f0] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demonstration</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
