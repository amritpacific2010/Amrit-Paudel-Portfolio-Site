import { useRef, useEffect } from 'react';
import { Download, Mail, MapPin, Phone, ChevronDown } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';
import { gsap, prefersReducedMotion } from '@/lib/gsap-setup';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Background
      tl.from(bgRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 1.2,
        ease: 'power2.out',
      }, 0);

      // Overlay
      tl.from(overlayRef.current, {
        opacity: 0,
        duration: 0.8,
      }, 0.2);

      // Content elements
      const elements = contentRef.current?.querySelectorAll('.hero-animate');
      if (elements) {
        tl.from(elements, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          stagger: 0.18,
          ease: 'power3.out',
        }, 0.4);
      }

      // Scroll indicator
      tl.from('.scroll-indicator', {
        opacity: 0,
        duration: 0.5,
      }, 1.8);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Parallax on scroll
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-[10%] -bottom-[10%] scale-110"
        style={{
          backgroundImage: 'url(/assets/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-[var(--hero-overlay)] via-[var(--hero-overlay)] to-[var(--page-bg)]"
      />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-[10%] h-2 w-2 rounded-full bg-[var(--accent-blue)] opacity-20 animate-float" />
        <div className="absolute top-1/3 right-[15%] h-3 w-3 rounded-full bg-[var(--accent-blue-light)] opacity-15 animate-float-delayed" />
        <div className="absolute bottom-1/3 left-[20%] h-1.5 w-1.5 rounded-full bg-[var(--accent-blue)] opacity-25 animate-float-slow" />
        <div className="absolute top-[60%] right-[25%] h-2 w-2 rounded-full bg-[var(--accent-blue-light)] opacity-20 animate-float" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto max-w-[1200px] px-5 py-32 text-center md:px-8 lg:px-12"
      >
        <div className="hero-animate mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
          <MapPin size={14} />
          {personalInfo.location}
        </div>

        <h1 className="hero-animate text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          {personalInfo.name}
        </h1>

        <p className="hero-animate mt-4 text-base font-normal uppercase tracking-[0.05em] text-white/80 sm:text-lg md:text-xl">
          {personalInfo.title}
        </p>

        <p className="hero-animate mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
          {personalInfo.heroStatement}
        </p>

        <div className="hero-animate mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-blue)] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[var(--accent-blue-dark)] hover:scale-[1.02]"
          >
            <Download size={18} />
            Download Resume
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/60 hover:bg-white/10"
          >
            <Mail size={18} />
            Contact Me
          </a>
        </div>

        <div className="hero-animate mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
          <a href={`tel:${personalInfo.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-white/90 transition-colors">
            <Phone size={14} />
            {personalInfo.phone}
          </a>
          <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:text-white/90 transition-colors">
            <Mail size={14} />
            {personalInfo.email}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-arrow">
        <ChevronDown size={28} className="text-white/50" />
      </div>
    </section>
  );
}
