import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectCategory, ProjectItem } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';
import {
  ExternalLink,
  Github,
  Layers,
  ArrowRight,
  Filter,
  BarChart3,
  Cpu,
  Leaf,
  GraduationCap,
  Code2,
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { data } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const categories: { label: string; value: ProjectCategory; icon?: React.ReactNode }[] = [
    { label: 'All Projects', value: 'All' },
    { label: 'Software Development', value: 'Software Development' },
    { label: 'AI/ML', value: 'AI/ML' },
    { label: 'Electronics', value: 'Electronics' },
    { label: 'Sustainability', value: 'Sustainability' },
    { label: 'Learning Activities', value: 'Learning Activities' },
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? data.projects
      : data.projects.filter((p) => p.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Software Development':
        return <Code2 className="w-4 h-4 text-[#4F8CFF]" />;
      case 'AI/ML':
        return <BarChart3 className="w-4 h-4 text-[#8B5CF6]" />;
      case 'Electronics':
        return <Cpu className="w-4 h-4 text-[#36D9E8]" />;
      case 'Sustainability':
        return <Leaf className="w-4 h-4 text-emerald-500" />;
      case 'Learning Activities':
      default:
        return <GraduationCap className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <section id="projects" className="py-24 border-t border-slate-200/60 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <div className="text-xs font-mono tracking-widest text-[#4F8CFF] dark:text-[#36D9E8] uppercase">
            05 · Featured Projects
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Selected Works &amp; Research
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Engineering architectures, experimental machine learning classification studies, sustainability data projects,
            and circuit design teaching initiatives.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-900/80 rounded-xl border border-slate-200/80 dark:border-slate-800 mb-12 w-fit">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-[#10172A] text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-8 space-y-3">
            <Layers className="w-8 h-8 text-slate-400 mx-auto" />
            <div className="text-base font-semibold text-slate-700 dark:text-slate-300">
              No projects in this category yet
            </div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              New project explorations are currently in development. You can add more projects using the Owner CMS.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#10172A] hover:border-slate-300 dark:hover:border-slate-700 transition-all p-7 flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div className="space-y-4">
                  {/* Category & Status */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-[#4F8CFF] dark:text-[#36D9E8]">
                      {getCategoryIcon(project.category)}
                      <span className="font-semibold">{project.category}</span>
                    </div>
                    <span className="text-slate-400 dark:text-slate-500 text-[11px]">
                      {project.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#4F8CFF] dark:group-hover:text-[#36D9E8] transition-colors leading-snug">
                    {project.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* Quick Metric highlight if available */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 text-xs">
                      <div className="text-[11px] font-mono text-slate-400 mb-1">
                        Empirical Benchmark Preview
                      </div>
                      <div className="flex items-center gap-4 text-xs font-mono">
                        <div>
                          <span className="text-slate-500">Grad. Boost: </span>
                          <span className="font-semibold text-slate-900 dark:text-white">80.77% Acc</span>
                        </div>
                        <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">|</span>
                        <div>
                          <span className="text-slate-500">Logistic Reg: </span>
                          <span className="font-semibold text-[#4F8CFF] dark:text-[#36D9E8]">51.55% F1</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4F8CFF] dark:text-[#36D9E8] hover:underline cursor-pointer"
                  >
                    <span>View Details &amp; Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label="GitHub Repository"
                        className="p-1.5 rounded text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label="Live Demo"
                        className="p-1.5 rounded text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
};
