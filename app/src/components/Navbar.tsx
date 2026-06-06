import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { navLinks } from '@/data/portfolio';
import type { Theme } from '@/types';

interface NavbarProps {
  theme: Theme;
  isScrolled: boolean;
  scrollDirection: 'up' | 'down';
  scrollY: number;
  onThemeToggle: () => void;
}

export function Navbar({ theme, isScrolled, scrollDirection, scrollY, onThemeToggle }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  const hidden = scrollDirection === 'down' && scrollY > 200;

  const handleNavClick = (target: string) => {
    setActiveSection(target);
    setMenuOpen(false);
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-40 h-[72px] transition-all duration-300',
          isScrolled
            ? 'border-b bg-[var(--surface)]/80 backdrop-blur-xl shadow-sm'
            : 'bg-transparent border-b-transparent',
          hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'
        )}
        style={{ borderColor: 'var(--border-color)' }}
      >
        <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-5 md:px-8 lg:px-12">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#home')}
            className="text-xl font-bold tracking-[0.05em] transition-colors hover:text-[var(--accent-blue)]"
            style={{ color: 'var(--text-primary)' }}
          >
            AKP
          </button>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => handleNavClick(link.target)}
                className={cn(
                  'relative text-sm font-medium transition-colors duration-200',
                  activeSection === link.target
                    ? 'text-[var(--accent-blue)]'
                    : 'hover:text-[var(--accent-blue)]'
                )}
                style={{
                  color: activeSection === link.target ? undefined : 'var(--text-secondary)',
                }}
              >
                {link.label}
                {activeSection === link.target && (
                  <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--accent-blue)]" />
                )}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
            <button
              onClick={() => handleNavClick('#contact')}
              className="hidden rounded-lg bg-[var(--accent-blue)] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[var(--accent-blue-dark)] hover:scale-[1.02] md:block"
            >
              Contact
            </button>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center md:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X size={24} style={{ color: 'var(--text-primary)' }} />
              ) : (
                <Menu size={24} style={{ color: 'var(--text-primary)' }} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-[60] flex flex-col items-center justify-center transition-all duration-300 md:hidden',
          menuOpen
            ? 'bg-[var(--page-bg)]/95 backdrop-blur-lg opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <button
              key={link.target}
              onClick={() => handleNavClick(link.target)}
              className={cn(
                'text-2xl font-semibold transition-all duration-300',
                activeSection === link.target
                  ? 'text-[var(--accent-blue)]'
                  : 'hover:text-[var(--accent-blue)]'
              )}
              style={{
                color: activeSection === link.target ? undefined : 'var(--text-primary)',
                transitionDelay: menuOpen ? `${i * 80}ms` : '0ms',
                transform: menuOpen ? 'translateY(0)' : 'translateY(30px)',
                opacity: menuOpen ? 1 : 0,
              }}
            >
              {link.label}
            </button>
          ))}
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        </div>
      </div>
    </>
  );
}
