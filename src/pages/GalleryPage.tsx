import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { GALLERY_DATA } from '@/data/organizationData';
import { useLang } from '@/contexts/LanguageContext';
import { cn } from '@/utils/cn';
import { Gallery3D } from '@/components/three/Gallery3D';

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
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs tracking-widest uppercase text-faint mb-6">{t.galleryEyebrow}</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">{t.galleryTitle}</h1>
              <p className="mt-7 text-lg text-muted leading-relaxed max-w-xl">{t.galleryLead}</p>
            </div>
            <div className="h-[300px] md:h-[400px]">
              <Gallery3D />
            </div>
          </div>
        </Container>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 bg-bg rounded-4xl mx-4 my-8">
        <Container>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {cats.map((cat) => (
              <button key={cat.key} onClick={() => setActive(cat.key)}
                className={cn('px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200',
                  active === cat.key ? 'bg-ink text-white' : 'bg-white text-muted border border-line hover:border-ink hover:text-ink')}>
                {cat.label}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }} className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-line cursor-pointer"
                  onClick={() => setLightbox(i)}>
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
      <section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 tracking-tight">See Our Work in Person</h2>
            <p className="text-muted mb-8 max-w-xl mx-auto text-lg">Visit Bungamati and experience the impact of free education.</p>
            <Link to="/contact">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-ink text-white text-sm font-medium rounded-full hover:bg-ink/90 transition-all">
                Plan a Visit <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 backdrop-blur-sm" onClick={() => setLightbox(null)}>
            <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 p-3 text-white/60 hover:text-white rounded-full hover:bg-white/10 z-10"><X className="h-6 w-6" /></button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 p-3 text-white/60 hover:text-white rounded-full hover:bg-white/10 z-10"><ChevronLeft className="h-8 w-8" /></button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 p-3 text-white/60 hover:text-white rounded-full hover:bg-white/10 z-10"><ChevronRight className="h-8 w-8" /></button>
            <motion.div key={lightbox} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl max-h-[85vh] w-full mx-8" onClick={(e) => e.stopPropagation()}>
              <img src={filtered[lightbox].imageUrl} alt={filtered[lightbox].title} className="w-full h-full object-contain rounded-3xl" />
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
