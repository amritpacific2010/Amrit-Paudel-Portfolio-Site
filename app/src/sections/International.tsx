import { useRef, useEffect } from 'react';
import { TowerControl, Radio, Truck, Globe } from 'lucide-react';
import { Container } from '@/components/Container';
import { SectionLabel } from '@/components/SectionLabel';
import { internationalExperience } from '@/data/portfolio';
import { gsap, prefersReducedMotion } from '@/lib/gsap-setup';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  TowerControl,
  Radio,
  Truck,
  Globe,
};

export function International() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from('.intl-heading', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      gsap.from('.intl-desc', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      gsap.from('.intl-card', {
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      });

      gsap.from('.intl-image', {
        x: 30,
        opacity: 0,
        scale: 0.95,
        duration: 0.7,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const { heading, subHeading, description, highlights, stats, image } = internationalExperience;

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32"
      style={{
        background: 'var(--intl-gradient)',
      }}
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text */}
          <div>
            <div className="intl-heading">
              <SectionLabel label="GLOBAL EXPERIENCE" />
            </div>
            <h2 className="intl-heading mt-3 text-3xl font-bold tracking-tight md:text-4xl" style={{ color: 'var(--text-primary)' }}>
              {heading}
            </h2>
            <h3 className="intl-heading mt-2 text-lg font-semibold" style={{ color: 'var(--accent-blue)' }}>
              {subHeading}
            </h3>
            <p className="intl-desc mt-4 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {description}
            </p>

            {/* Highlights */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {highlights.map((h) => {
                const Icon = iconMap[h.icon] || Globe;
                return (
                  <div
                    key={h.title}
                    className="intl-card rounded-xl border-l-[3px] p-4 transition-all duration-200 hover:border-l-4"
                    style={{
                      borderLeftColor: 'var(--accent-blue)',
                      backgroundColor: 'var(--surface)',
                    }}
                  >
                    <Icon size={24} style={{ color: 'var(--accent-blue)' }} />
                    <h4 className="mt-2 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {h.title}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {h.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Stats badge */}
            <div className="intl-card mt-6 flex items-center gap-4 rounded-xl p-4" style={{ backgroundColor: 'var(--surface)' }}>
              <div>
                <div className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  {stats.label}
                </div>
                <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {stats.location}
                </div>
              </div>
              <span
                className="ml-auto rounded-full px-3 py-1 text-xs font-semibold"
                style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: 'var(--gold-accent)' }}
              >
                {stats.badge}
              </span>
            </div>
          </div>

          {/* Right: Image */}
          <div className="intl-image flex items-center">
            <div className="overflow-hidden rounded-2xl border-2" style={{ borderColor: 'var(--border-color)' }}>
              <img
                src={image}
                alt="UN Deployment in Sudan"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
