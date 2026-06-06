import { useRef, useEffect } from 'react';
import { MapPin, CheckCircle, Award } from 'lucide-react';
import { Container } from '@/components/Container';
import { SectionLabel } from '@/components/SectionLabel';
import { timelineEntries } from '@/data/portfolio';
import { gsap, prefersReducedMotion } from '@/lib/gsap-setup';

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Timeline line draw
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: 'top',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: true,
        },
      });

      // Card entrances
      const cards = gsap.utils.toArray<HTMLElement>('.timeline-card');
      cards.forEach((card, i) => {
        const isLeft = i % 2 === 0;
        gsap.from(card, {
          x: isLeft ? -50 : 50,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });

      // Dots
      const dots = gsap.utils.toArray<HTMLElement>('.timeline-dot');
      dots.forEach((dot) => {
        gsap.from(dot, {
          scale: 0,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: dot,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-16 md:py-24 lg:py-32">
      <Container>
        <SectionLabel label="PROFESSIONAL EXPERIENCE" />
        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl" style={{ color: 'var(--text-primary)' }}>
          Career Journey
        </h2>
        <p className="mt-3 max-w-2xl text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
          Over a decade of hands-on experience in electronics, telecommunications, and technology infrastructure
        </p>

        {/* Timeline */}
        <div className="relative mt-12 md:mt-16">
          {/* Center line - desktop */}
          <div
            ref={lineRef}
            className="absolute left-6 top-0 hidden h-full w-0.5 md:left-1/2 md:block md:-translate-x-1/2"
            style={{ backgroundColor: 'var(--accent-blue)' }}
          />
          {/* Left line - mobile */}
          <div
            className="absolute left-6 top-0 h-full w-0.5 md:hidden"
            style={{ backgroundColor: 'var(--accent-blue)' }}
          />

          <div className="space-y-8 md:space-y-12">
            {timelineEntries.map((entry, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div key={entry.company} className="relative grid grid-cols-1 items-start md:grid-cols-2 md:gap-8">
                  {/* Dot */}
                  <div
                    className="timeline-dot absolute left-6 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 md:left-1/2"
                    style={{
                      backgroundColor: 'var(--accent-blue)',
                      borderColor: 'var(--page-bg)',
                      top: '24px',
                    }}
                  />

                  {/* Card */}
                  <div
                    className={`timeline-card ml-12 rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_var(--accent-blue-glow)] md:ml-0 ${
                      isLeft ? 'md:mr-auto md:pr-10' : 'md:col-start-2 md:ml-auto md:pl-10'
                    }`}
                    style={{
                      borderColor: 'var(--border-color)',
                      backgroundColor: 'var(--surface)',
                    }}
                  >
                    {/* Duration badge */}
                    <span
                      className="inline-block rounded-full px-3 py-1 text-xs font-medium"
                      style={{
                        backgroundColor: 'var(--page-bg)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      {entry.duration}
                    </span>

                    {/* Company */}
                    <h3 className="mt-3 text-xl font-semibold md:text-2xl" style={{ color: 'var(--text-primary)' }}>
                      {entry.company}
                    </h3>

                    {/* Position */}
                    <h4 className="mt-1 text-base font-medium" style={{ color: 'var(--accent-blue)' }}>
                      {entry.position}
                    </h4>

                    {/* Location */}
                    <div className="mt-2 flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-muted)' }}>
                      <MapPin size={14} />
                      {entry.location}
                    </div>

                    {/* Badge */}
                    {entry.badge && (
                      <div className="mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: 'var(--gold-accent)' }}>
                        <Award size={14} />
                        {entry.badge}
                      </div>
                    )}

                    {/* Items */}
                    <ul className="mt-4 space-y-2">
                      {entry.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <CheckCircle
                            size={16}
                            className="mt-0.5 shrink-0"
                            style={{ color: 'var(--accent-blue)' }}
                          />
                          <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
