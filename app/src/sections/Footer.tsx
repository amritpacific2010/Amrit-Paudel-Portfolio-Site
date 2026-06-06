import { Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

export function Footer() {
  return (
    <footer
      className="border-t py-12"
      style={{
        borderColor: 'var(--border-color)',
        backgroundColor: 'var(--surface)',
      }}
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Logo / Name */}
          <div className="text-lg font-bold tracking-[0.05em]" style={{ color: 'var(--text-primary)' }}>
            {personalInfo.name}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:scale-110 hover:text-[var(--accent-blue)]"
              style={{ color: 'var(--text-muted)' }}
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="transition-all duration-200 hover:scale-110 hover:text-[var(--accent-blue)]"
              style={{ color: 'var(--text-muted)' }}
              aria-label="Email"
            >
              <Mail size={22} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px w-full" style={{ backgroundColor: 'var(--border-color)' }} />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Copyright &copy; 2026 {personalInfo.name}. All rights reserved.
          </p>
          <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
            Electronics Engineer | Technology Enthusiast | Problem Solver
          </p>
        </div>
      </div>
    </footer>
  );
}
