import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GALLERY_DATA } from '@/data/organizationData';
import { useLang } from '@/contexts/LanguageContext';
import { cn } from '@/utils/cn';

type Cat = 'All' | 'Classes & Learning' | 'Community & Fellowship' | 'Children & Activities';

export function GalleryPage() {
  const { t } = useLang();
  const [active, setActive] = useState<Cat>('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const cats: { key: Cat; label: string }[] = [
    { key: 'All', label: t.galleryCatAll },
    { key: 'Classes & Learning', label: t.galleryCat1 },
    { key: 'Community & Fellowship', label: t.galleryCat2 },
    { key: 'Children & Activities', label: t.galleryCat3 },
  ];

  const filtered = active === 'All' ? GALLERY_DATA : GALLERY_DATA.filter((g) => g.category === active);

  const next = useCallback(() => { if (lightbox !== null) setLightbox((lightbox + 1) % filtered.length); }, [lightbox, filtered.length]);
  const prev = useCallback(() => { if (lightbox !== null) setLightbox((lightbox - 1 + filtered.length) % filtered.length); }, [lightbox, filtered.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [lightbox, next, prev]);

  return (
    <div>
      {/* Hero */}
      <section className="pt-28 pb-20 md:pt-40 md:pb-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] rounded-full bg-blue-50/50 blur-[60px] md:blur-[80px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <Container className="relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <Badge variant="amber" className="mb-4">{t.galleryEyebrow}</Badge>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.05] tracking-[-0.03em] mt-3">{t.galleryTitle}</h1>
            <p className="mt-7 text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">{t.galleryLead}</p>
          </div>
        </Container>
      </section>

      {/* Gallery Grid */}
      <section className="py-32 bg-slate-50">
        <Container>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {cats.map((cat) => (
              <button key={cat.key} onClick={() => setActive(cat.key)}
                className={cn('px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200',
                  active === cat.key ? 'bg-blue-600 text-white shadow-soft-sm' : 'bg-white text-slate-500 border border-slate-200 hover:border-blue-300 hover:text-blue-600')}>
                {cat.label}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }} className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 cursor-pointer"
                  onClick={() => setLightbox(i)}>
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                    <p className="text-white/70 text-xs mt-0.5">{item.caption}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900 relative overflow-hidden noise">
        <Container>
          <div className="text-center text-white">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">See Our Work in Person</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto text-lg">Visit Bungamati and experience the impact of free education on children's lives.</p>
            <Link to="/contact">
              <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8">Plan a Visit <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-sm" onClick={() => setLightbox(null)}>
            <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 p-3 text-white/60 hover:text-white rounded-full hover:bg-white/10 z-10"><X className="h-6 w-6" /></button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 p-3 text-white/60 hover:text-white rounded-full hover:bg-white/10 z-10"><ChevronLeft className="h-8 w-8" /></button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 p-3 text-white/60 hover:text-white rounded-full hover:bg-white/10 z-10"><ChevronRight className="h-8 w-8" /></button>
            <motion.div key={lightbox} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl max-h-[85vh] w-full mx-8" onClick={(e) => e.stopPropagation()}>
              <img src={filtered[lightbox].imageUrl} alt={filtered[lightbox].title} className="w-full h-full object-contain rounded-lg" />
              <div className="mt-4 text-center">
                <h4 className="text-white font-semibold">{filtered[lightbox].title}</h4>
                <p className="text-white/50 text-sm mt-1">{filtered[lightbox].caption}</p>
                <p className="text-white/30 text-xs mt-1">{lightbox + 1} / {filtered.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
