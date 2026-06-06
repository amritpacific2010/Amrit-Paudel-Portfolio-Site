import { useRef, useEffect } from 'react';
import { GraduationCap, ScrollText } from 'lucide-react';
import { Container } from '@/components/Container';
import { SectionLabel } from '@/components/SectionLabel';
import { educationList, certifications } from '@/data/portfolio';
import { gsap, prefersReducedMotion } from '@/lib/gsap-setup';

const eduIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  GraduationCap,
  ScrollText,
};

export function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from('.edu-card', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.edu-cards',
          start: 'top 80%',
        },
      });

      gsap.from('.cert-card', {
        x: -20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.cert-cards',
          start: 'top 80%',
        },
      });

      // Progress bar animation
      const bars = gsap.utils.toArray<HTMLElement>('.cert-progress');
      bars.forEach((bar) => {
        const target = bar.dataset.progress || '0';
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: target + '%',
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="py-16 md:py-24 lg:py-32"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      <Container>
        {/* Education */}
        <SectionLabel label="EDUCATION" />
        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl" style={{ color: 'var(--text-primary)' }}>
          Academic Background
        </h2>

        <div className="edu-cards mt-10 grid gap-6 md:grid-cols-2">
          {educationList.map((edu) => {
            const Icon = eduIcons[edu.icon] || GraduationCap;
            return (
              <div
                key={edu.degree}
                className="edu-card relative rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_var(--accent-blue-glow)]"
                style={{
                  borderColor: 'var(--border-color)',
                  backgroundColor: 'var(--page-bg)',
                }}
              >
                <span
                  className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: 'var(--accent-blue-glow)',
                    color: 'var(--accent-blue)',
                  }}
                >
                  {edu.badge}
                </span>

                <div
                  className="flex h-12 w-12 items-center justify-center rounded-lg"
                  style={{ backgroundColor: 'var(--accent-blue-glow)', color: 'var(--accent-blue)' }}
                >
                  <Icon size={24} />
                </div>

                <h3 className="mt-4 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {edu.degree}
                </h3>
                <h4 className="mt-1 text-base font-medium" style={{ color: 'var(--accent-blue)' }}>
                  {edu.institution}
                </h4>
                <div className="mt-2 flex items-center gap-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span>{edu.location}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{edu.year}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="mt-16">
          <SectionLabel label="CERTIFICATIONS" />
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl" style={{ color: 'var(--text-primary)' }}>
            Professional Development
          </h2>

          <div className="cert-cards mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="cert-card rounded-xl border p-5"
                style={{
                  borderColor: 'var(--border-color)',
                  backgroundColor: 'var(--page-bg)',
                }}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {cert.name}
                  </h4>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{
                      backgroundColor: cert.status === 'Completed' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                      color: cert.status === 'Completed' ? 'var(--success)' : 'var(--gold-accent)',
                    }}
                  >
                    {cert.status}
                  </span>
                </div>

                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: 'var(--border-color)' }}>
                  <div
                    className="cert-progress h-full rounded-full"
                    data-progress={cert.progress}
                    style={{ backgroundColor: 'var(--accent-blue)', width: '0%' }}
                  />
                </div>
                <span className="mt-1 block text-right text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                  {cert.progress}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
