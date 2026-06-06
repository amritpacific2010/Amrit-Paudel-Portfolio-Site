import { useEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';
import { Container } from '@/components/Container';
import { SectionLabel } from '@/components/SectionLabel';
import { personalInfo } from '@/data/portfolio';
import { useInView } from '@/hooks/useInView';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { gsap, prefersReducedMotion } from '@/lib/gsap-setup';

function StatBlock({ value, suffix, label, inView }: { value: number; suffix: string; label: string; inView: boolean }) {
  const display = useAnimatedCounter(value, inView, suffix, 2);
  return (
    <div className="text-center">
      <div className="text-4xl font-bold tracking-tight md:text-5xl" style={{ color: 'var(--accent-blue)' }}>
        {display}
      </div>
      <div className="mt-1 text-xs font-medium uppercase tracking-[0.05em]" style={{ color: 'var(--text-muted)' }}>
        {label}
      </div>
    </div>
  );
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [statsRef, statsInView] = useInView<HTMLDivElement>();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-animate', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-16 md:py-24 lg:py-32">
      <Container>
        <div className="about-animate">
          <SectionLabel label="ABOUT ME" />
        </div>
        <h2 className="about-animate mt-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl" style={{ color: 'var(--text-primary)' }}>
          Who I Am
        </h2>

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Photo */}
          <div className="about-animate flex justify-center lg:justify-start">
            <div className="relative">
              <div
                className="h-72 w-72 overflow-hidden rounded-2xl border-2 md:h-80 md:w-80 lg:h-96 lg:w-96"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}assets/about-photo.jpg`}
                  alt={personalInfo.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                />
              </div>
              <div
                className="absolute -bottom-4 -right-4 h-24 w-24 rounded-xl border-2 bg-[var(--surface)] p-3"
                style={{ borderColor: 'var(--accent-blue)' }}
              >
                <div className="text-center">
                  <div className="text-xl font-bold" style={{ color: 'var(--accent-blue)' }}>10+</div>
                  <div className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Years Exp.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <p className="about-animate text-base leading-relaxed md:text-lg" style={{ color: 'var(--text-secondary)' }}>
              {personalInfo.aboutSummary}
            </p>

            <div className="about-animate mt-8 grid gap-3 sm:grid-cols-2">
              {personalInfo.highlights.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={18} style={{ color: 'var(--accent-blue)' }} />
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="about-animate mt-16 grid grid-cols-3 gap-8 rounded-2xl border p-8 md:p-12"
          style={{
            borderColor: 'var(--border-color)',
            backgroundColor: 'var(--surface)',
          }}
        >
          {personalInfo.stats.map((stat) => (
            <StatBlock
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              inView={statsInView}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
