import { useRef, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { Container } from '@/components/Container';
import { SectionLabel } from '@/components/SectionLabel';
import { projects } from '@/data/portfolio';
import { gsap, prefersReducedMotion } from '@/lib/gsap-setup';

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-16 md:py-24 lg:py-32">
      <Container>
        <SectionLabel label="FEATURED PROJECTS" />
        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl" style={{ color: 'var(--text-primary)' }}>
          Engineering Projects
        </h2>
        <p className="mt-3 max-w-2xl text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
          Key implementations and technical achievements across diverse engineering domains
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group overflow-hidden rounded-xl border transition-all duration-300 hover:border-[var(--accent-blue)]"
              style={{
                borderColor: 'var(--border-color)',
                backgroundColor: 'var(--surface)',
              }}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                  <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Eye size={16} />
                    View Details
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-3 py-1 text-xs font-medium"
                      style={{
                        backgroundColor: 'var(--accent-blue-glow)',
                        color: 'var(--accent-blue)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
