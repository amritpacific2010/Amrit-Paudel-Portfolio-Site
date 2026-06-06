import { useRef, useEffect } from 'react';
import {
  Radio,
  Network,
  Camera,
  Cpu,
  CircuitBoard,
  Code2,
  Settings,
} from 'lucide-react';
import { Container } from '@/components/Container';
import { SectionLabel } from '@/components/SectionLabel';
import { skillCategories } from '@/data/portfolio';
import { gsap, prefersReducedMotion } from '@/lib/gsap-setup';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Radio,
  Network,
  Camera,
  Cpu,
  CircuitBoard,
  Code2,
  Settings,
};

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Cards entrance
      gsap.from('.skill-card', {
        y: 40,
        scale: 0.95,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      // Tags entrance
      gsap.from('.skill-tag', {
        scale: 0.8,
        opacity: 0,
        duration: 0.2,
        stagger: 0.03,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-16 md:py-24 lg:py-32"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      <Container>
        <SectionLabel label="TECHNICAL EXPERTISE" />
        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl" style={{ color: 'var(--text-primary)' }}>
          Skills & Technologies
        </h2>
        <p className="mt-3 max-w-2xl text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
          A comprehensive toolkit built over 10+ years of hands-on engineering experience
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => {
            const Icon = iconMap[category.icon] || Settings;
            return (
              <div
                key={category.title}
                className="skill-card group rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_var(--accent-blue-glow)]"
                style={{
                  borderColor: 'var(--border-color)',
                  backgroundColor: 'var(--page-bg)',
                }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: 'var(--accent-blue-glow)', color: 'var(--accent-blue)' }}
                >
                  <Icon size={22} />
                </div>

                <h3 className="mt-4 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {category.title}
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-tag rounded-full px-3 py-1 text-xs font-medium transition-opacity hover:opacity-80"
                      style={{
                        backgroundColor: 'var(--accent-blue-glow)',
                        color: 'var(--accent-blue)',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
