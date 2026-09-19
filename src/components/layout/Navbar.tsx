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

  const isHome = location.pathname === '/';

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      scrolled
        ? isHome
          ? 'bg-white/80 backdrop-blur-2xl border-b border-white/20 shadow-soft-lg'
          : 'bg-white/80 backdrop-blur-2xl border-b border-slate-100/80 shadow-soft-lg'
        : 'bg-transparent'
    )}>
      <Container>
        <nav className="flex items-center justify-between h-16 md:h-[72px]">
          <Link to="/" className="relative z-10">
            <Logo size="sm" />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'px-3.5 py-2 text-[13px] font-medium rounded-xl transition-all duration-200',
                  location.pathname === link.to
                    ? isHome && !scrolled
                      ? 'text-white bg-white/15'
                      : 'text-blue-600 bg-blue-50/80'
                    : isHome && !scrolled
                      ? 'text-white/70 hover:text-white hover:bg-white/10'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={toggleLang}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium rounded-xl transition-all',
                isHome && !scrolled
                  ? 'text-white/70 hover:text-white hover:bg-white/10'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              )}
            >
              <Globe className="h-3.5 w-3.5" />
              {lang === 'en' ? 'NE' : 'EN'}
            </button>
            <Link
              to="/get-involved"
              className={cn(
                'flex items-center gap-1.5 px-5 py-2.5 text-[13px] font-semibold rounded-full transition-all duration-300',
                isHome && !scrolled
                  ? 'text-slate-900 bg-white hover:bg-white/90 shadow-lg shadow-white/20'
                  : 'text-white bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/30 hover:-translate-y-0.5'
              )}
            >
              {t.navCta}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-1 relative z-10">
            <button onClick={toggleLang} aria-label="Toggle language" className={cn(
              'p-2.5 rounded-xl transition-all',
              isHome && !scrolled ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            )}>
              <Globe className="h-5 w-5" />
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className={cn(
              'p-2.5 rounded-xl transition-all',
              isHome && !scrolled ? 'text-white hover:bg-white/10' : 'text-slate-600 hover:bg-slate-50'
            )} aria-label="Toggle menu">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm lg:hidden z-40" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[320px] max-w-[85vw] bg-white/95 backdrop-blur-2xl shadow-2xl z-50 lg:hidden overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <Logo size="sm" />
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="p-2.5 rounded-xl hover:bg-slate-100 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col p-5 gap-1">
                {navLinks.map((link) => (
                  <Link key={link.to} to={link.to}
                    className={cn(
                      'px-4 py-3.5 text-[15px] font-medium rounded-xl transition-all',
                      location.pathname === link.to ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    )}>
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <Link to="/get-involved" className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
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
