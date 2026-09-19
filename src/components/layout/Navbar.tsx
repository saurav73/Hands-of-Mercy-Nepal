import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/branding/Logo';
import { Container } from '@/components/ui/Container';
import { useLang } from '@/contexts/LanguageContext';
import { cn } from '@/utils/cn';

export function Navbar() {
  const { t, lang, toggleLang } = useLang();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false); };
    if (mobileOpen) document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: t.navAbout },
    { to: '/education', label: t.navEducation },
    { to: '/impact', label: t.navImpact },
    { to: '/stories', label: t.navStories },
    { to: '/gallery', label: t.navGallery },
    { to: '/get-involved', label: t.navGetInvolved },
    { to: '/contact', label: t.navContact },
  ];

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-line' : 'bg-transparent'
    )}>
      <Container>
        <nav className="flex items-center justify-between h-16">
          <Link to="/" className="relative z-10">
            <Logo size="sm" />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'px-3 py-1.5 text-[13px] rounded-lg transition-colors',
                  location.pathname === link.to
                    ? 'text-ink font-medium'
                    : 'text-muted hover:text-ink'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button onClick={toggleLang} className="flex items-center gap-1 px-2.5 py-1.5 text-[13px] text-muted hover:text-ink rounded-lg transition-colors">
              <Globe className="h-3.5 w-3.5" />
              {lang === 'en' ? 'NE' : 'EN'}
            </button>
            <Link to="/get-involved" className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-white bg-ink rounded-full hover:bg-ink/90 transition-colors">
              {t.navCta} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-1 relative z-10">
            <button onClick={toggleLang} className="p-2 text-muted hover:text-ink transition-colors">
              <Globe className="h-5 w-5" />
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-ink" aria-label="Toggle menu">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/10 backdrop-blur-sm lg:hidden z-40" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] max-w-[85vw] bg-white shadow-xl z-50 lg:hidden">
              <div className="flex items-center justify-between p-5 border-b border-line">
                <Logo size="sm" />
                <button onClick={() => setMobileOpen(false)} className="p-2 text-ink">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4">
                {navLinks.map((link) => (
                  <Link key={link.to} to={link.to}
                    className={cn(
                      'block px-3 py-3 text-sm rounded-lg transition-colors',
                      location.pathname === link.to ? 'text-ink font-medium bg-bg' : 'text-muted hover:text-ink'
                    )}>
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t border-line">
                  <Link to="/get-involved" className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-white bg-ink rounded-lg">
                    {t.navCta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
