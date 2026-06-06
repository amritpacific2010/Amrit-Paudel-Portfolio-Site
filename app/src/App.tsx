import { ThemeProvider, useTheme } from '@/hooks/useTheme';
import { useScrollState } from '@/hooks/useScrollState';
import { Navbar } from '@/components/Navbar';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Experience } from '@/sections/Experience';
import { Skills } from '@/sections/Skills';
import { Projects } from '@/sections/Projects';
import { International } from '@/sections/International';
import { Education } from '@/sections/Education';
import { Languages } from '@/sections/Languages';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const { scrollY, scrollDirection, isScrolled, showScrollTop } = useScrollState();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--page-bg)' }}>
      <Navbar
        theme={theme}
        isScrolled={isScrolled}
        scrollDirection={scrollDirection}
        scrollY={scrollY}
        onThemeToggle={toggleTheme}
      />

      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <International />
        <Education />
        <Languages />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop visible={showScrollTop} onClick={handleScrollToTop} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
