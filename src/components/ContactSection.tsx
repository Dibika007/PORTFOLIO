import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Mail,
  Linkedin,
  Github,
  Send,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  MapPin,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { data } = usePortfolio();
  const { profile } = data;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '', // Spam protection
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please provide a subject.';
    if (!formData.message.trim()) {
      errs.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Message must be at least 15 characters long.';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // Silent discard for bot spam

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Prepare authentic mailto dispatch
    const subjectEncoded = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject}`);
    const bodyEncoded = encodeURIComponent(
      `Hello Dibika,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n`
    );

    // Attempt mailto trigger
    window.location.href = `mailto:dibika007@gmail.com?subject=${subjectEncoded}&body=${bodyEncoded}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionStatus('success');
    }, 600);
  };

  const copyUrl = (url: string, key: string) => {
    navigator.clipboard.writeText(url);
    setCopiedField(key);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="contact" className="py-24 border-t border-slate-200/60 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-16">
          <div className="text-xs font-mono tracking-widest text-[#4F8CFF] dark:text-[#36D9E8] uppercase">
            09 · Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Let's build something meaningful.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            I'm always interested in learning opportunities, technical collaborations, internships, and conversations
            about software, AI, and engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct channels and social links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#10172A] shadow-xs space-y-5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Direct Channels &amp; Profiles
              </h3>

              {/* LinkedIn */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#0077B5]/10 text-[#0077B5]">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400">LinkedIn Profile</div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">
                      dibika-p-7aaa32323
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => copyUrl(profile.linkedinUrl, 'linkedin')}
                    title="Copy LinkedIn URL"
                    className="p-1.5 rounded text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  >
                    {copiedField === 'linkedin' ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="p-1.5 rounded text-slate-500 hover:text-[#4F8CFF] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* GitHub */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400">GitHub Profile</div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">
                      github.com/Dibika007
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => copyUrl(profile.githubUrl, 'github')}
                    title="Copy GitHub URL"
                    className="p-1.5 rounded text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  >
                    {copiedField === 'github' ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="p-1.5 rounded text-slate-500 hover:text-[#4F8CFF] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Location Badge */}
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                <MapPin className="w-4 h-4 text-[#4F8CFF]" />
                <span>Based in {profile.location} (IST / UTC+5:30)</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#10172A] shadow-xs space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Recruitment &amp; Internship Status
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Open to software engineering internships, research fellowships, embedded system projects,
                and technical community opportunities for 2026–2027.
              </p>
            </div>
          </div>

          {/* Right Column: Validated Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#10172A] shadow-xs space-y-5"
            >
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#4F8CFF]" />
                <span>Send a Direct Message</span>
              </h3>

              {/* Honeypot for spam bots */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maya Sharma"
                    className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-900 border transition-colors focus-visible:outline-2 focus-visible:outline-[#4F8CFF] text-slate-900 dark:text-white ${
                      errors.name ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-rose-500">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                    Your Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. maya@company.com"
                    className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-900 border transition-colors focus-visible:outline-2 focus-visible:outline-[#4F8CFF] text-slate-900 dark:text-white ${
                      errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-rose-500">{errors.email}</p>}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                  Subject <span className="text-rose-500">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Internship Opportunity / Technical Collaboration"
                  className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-900 border transition-colors focus-visible:outline-2 focus-visible:outline-[#4F8CFF] text-slate-900 dark:text-white ${
                    errors.subject ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
                {errors.subject && <p className="text-[11px] text-rose-500">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                  Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details regarding your team, the role, or a technical discussion topic..."
                  className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-900 border transition-colors focus-visible:outline-2 focus-visible:outline-[#4F8CFF] text-slate-900 dark:text-white ${
                    errors.message ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
                {errors.message && <p className="text-[11px] text-rose-500">{errors.message}</p>}
              </div>

              {/* Submission Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs font-semibold text-white bg-[#4F8CFF] hover:bg-[#3b79f0] transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
              >
                {isSubmitting ? (
                  <span>Preparing Dispatch...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message via Email Client</span>
                  </>
                )}
              </button>

              {/* Submission Feedback */}
              {submissionStatus === 'success' && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-500 space-y-1">
                  <div className="font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    <span>Your email draft is staged in your mail application!</span>
                  </div>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400">
                    If your email client didn't launch automatically, you can directly connect with Dibika on LinkedIn or copy the details above.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
