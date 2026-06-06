import { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, Mail, Linkedin, Send, CheckCircle } from 'lucide-react';
import { Container } from '@/components/Container';
import { SectionLabel } from '@/components/SectionLabel';
import { personalInfo } from '@/data/portfolio';
import { gsap, prefersReducedMotion } from '@/lib/gsap-setup';

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from('.contact-animate', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) newErrors.name = 'Name is required (min 2 characters)';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim() || formData.message.trim().length < 10) newErrors.message = 'Message is required (min 10 characters)';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-16 md:py-24 lg:py-32">
      <Container>
        <div className="contact-animate">
          <SectionLabel label="CONTACT" />
        </div>
        <h2 className="contact-animate mt-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl" style={{ color: 'var(--text-primary)' }}>
          Get In Touch
        </h2>
        <p className="contact-animate mt-3 max-w-2xl text-base" style={{ color: 'var(--text-secondary)' }}>
          Have a project in mind or want to discuss opportunities? I'd love to hear from you.
        </p>

        <div className="mt-10 grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <div className="contact-animate lg:col-span-3">
            {status === 'success' ? (
              <div
                className="flex flex-col items-center justify-center rounded-xl border p-12 text-center"
                style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--surface)' }}
              >
                <CheckCircle size={48} style={{ color: 'var(--success)' }} />
                <h3 className="mt-4 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Message Sent Successfully
                </h3>
                <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Thank you for reaching out. I'll get back to you soon.
                </p>
                <button
                  onClick={() => { setStatus('idle'); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                  className="mt-6 rounded-lg bg-[var(--accent-blue)] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[var(--accent-blue-dark)]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className={`space-y-5 rounded-xl border p-6 md:p-8 ${shake ? 'animate-shake' : ''}`}
                style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--surface)' }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-all focus:border-[var(--accent-blue)] focus:ring-2"
                      style={{
                        borderColor: errors.name ? 'var(--error)' : 'var(--border-color)',
                        backgroundColor: 'var(--page-bg)',
                        color: 'var(--text-primary)',
                        '--tw-ring-color': 'var(--accent-blue-glow)',
                      } as React.CSSProperties}
                      placeholder="Your name"
                    />
                    {errors.name && <p className="mt-1 text-xs" style={{ color: 'var(--error)' }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-all focus:border-[var(--accent-blue)] focus:ring-2"
                      style={{
                        borderColor: errors.email ? 'var(--error)' : 'var(--border-color)',
                        backgroundColor: 'var(--page-bg)',
                        color: 'var(--text-primary)',
                        '--tw-ring-color': 'var(--accent-blue-glow)',
                      } as React.CSSProperties}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="mt-1 text-xs" style={{ color: 'var(--error)' }}>{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-all focus:border-[var(--accent-blue)] focus:ring-2"
                    style={{
                      borderColor: errors.subject ? 'var(--error)' : 'var(--border-color)',
                      backgroundColor: 'var(--page-bg)',
                      color: 'var(--text-primary)',
                      '--tw-ring-color': 'var(--accent-blue-glow)',
                    } as React.CSSProperties}
                    placeholder="What's this about?"
                  />
                  {errors.subject && <p className="mt-1 text-xs" style={{ color: 'var(--error)' }}>{errors.subject}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows={5}
                    className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-all focus:border-[var(--accent-blue)] focus:ring-2"
                    style={{
                      borderColor: errors.message ? 'var(--error)' : 'var(--border-color)',
                      backgroundColor: 'var(--page-bg)',
                      color: 'var(--text-primary)',
                      '--tw-ring-color': 'var(--accent-blue-glow)',
                    } as React.CSSProperties}
                    placeholder="Your message..."
                  />
                  {errors.message && <p className="mt-1 text-xs" style={{ color: 'var(--error)' }}>{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent-blue)] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[var(--accent-blue-dark)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 sm:w-auto"
                >
                  {status === 'submitting' ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <Send size={16} />
                  )}
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="contact-animate space-y-6 lg:col-span-2">
            <div
              className="rounded-xl border p-6"
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--surface)' }}
            >
              <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                Contact Information
              </h3>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: 'var(--accent-blue-glow)', color: 'var(--accent-blue)' }}
                  >
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Location</p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{personalInfo.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: 'var(--accent-blue-glow)', color: 'var(--accent-blue)' }}
                  >
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Phone</p>
                    <a href={`tel:${personalInfo.phone.replace(/\s/g, '')}`} className="text-sm hover:text-[var(--accent-blue)] transition-colors" style={{ color: 'var(--text-secondary)' }}>
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: 'var(--accent-blue-glow)', color: 'var(--accent-blue)' }}
                  >
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Email</p>
                    <a href={`mailto:${personalInfo.email}`} className="text-sm hover:text-[var(--accent-blue)] transition-colors" style={{ color: 'var(--text-secondary)' }}>
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: 'var(--accent-blue-glow)', color: 'var(--accent-blue)' }}
                  >
                    <Linkedin size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>LinkedIn</p>
                    <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-[var(--accent-blue)] transition-colors" style={{ color: 'var(--text-secondary)' }}>
                      {personalInfo.linkedin}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
