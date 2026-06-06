import { useRef, useEffect, useState } from 'react';
import { Container } from '@/components/Container';
import { SectionLabel } from '@/components/SectionLabel';
import { languages } from '@/data/portfolio';
import { gsap, prefersReducedMotion } from '@/lib/gsap-setup';

function LanguageCircle({
  name,
  level,
  percentage,
  index,
}: {
  name: string;
  level: string;
  percentage: number;
  index: number;
}) {
  const [inView, setInView] = useState(false);
  const [displayPercent, setDisplayPercent] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  const size = 100;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayPercent / 100) * circumference;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (svgRef.current) observer.observe(svgRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    if (prefersReducedMotion()) {
      setDisplayPercent(percentage);
      return;
    }

    const obj = { val: 0 };
    const delay = index * 200;

    const timeout = setTimeout(() => {
      gsap.to(obj, {
        val: percentage,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => {
          setDisplayPercent(Math.round(obj.val));
        },
      });
    }, delay);

    return () => clearTimeout(timeout);
  }, [inView, percentage, index]);

  return (
    <div className="flex flex-col items-center">
      <svg
        ref={svgRef}
        width={size}
        height={size}
        className="-rotate-90"
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          style={{ stroke: 'var(--border-color)' }}
        />
        {/* Fill */}
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={inView ? offset : circumference}
          style={{
            stroke: 'var(--accent-blue)',
            transition: prefersReducedMotion() ? 'none' : 'stroke-dashoffset 1.2s ease-out',
          }}
        />
        {/* Text */}
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="central"
          className="rotate-90"
          style={{ fill: 'var(--text-primary)', fontSize: '16px', fontWeight: 700 }}
        >
          {displayPercent}%
        </text>
      </svg>
      <h4 className="mt-3 text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
        {name}
      </h4>
      <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
        {level}
      </span>
    </div>
  );
}

export function Languages() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32">
      <Container>
        <div className="text-center">
          <SectionLabel label="LANGUAGES" />
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl" style={{ color: 'var(--text-primary)' }}>
            Language Proficiency
          </h2>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-12 md:gap-16">
          {languages.map((lang, i) => (
            <LanguageCircle
              key={lang.name}
              name={lang.name}
              level={lang.level}
              percentage={lang.percentage}
              index={i}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
