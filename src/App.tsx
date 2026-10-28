/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { EducationSection } from './components/EducationSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ResumeSection } from './components/ResumeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { OwnerCmsModal } from './components/OwnerCmsModal';

export default function App() {
  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-white dark:bg-[#0B1020] text-slate-900 dark:text-[#F8FAFC] selection:bg-[#4F8CFF]/20 selection:text-[#36D9E8] transition-colors duration-200">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Sections */}
        <main>
          <HeroSection />
          <AboutSection />
          <EducationSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <AchievementsSection />
          <CertificationsSection />
          <ResumeSection />
          <ContactSection />
        </main>

        {/* Site Footer */}
        <Footer />

        {/* Owner Content Management System Modal */}
        <OwnerCmsModal />
      </div>
    </PortfolioProvider>
  );
}
