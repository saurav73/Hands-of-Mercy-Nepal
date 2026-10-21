/**
 * 404 catch-all page: friendly not-found message with a link back home.
 */
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { useLang } from '@/contexts/LanguageContext';

/** Rendered by the catch-all route for any URL with no matching page. */
export function NotFoundPage() {
  const { t } = useLang();
  return (
    <section className="pt-40 pb-28 md:pt-52 md:pb-36">
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <p className="text-7xl md:text-8xl font-semibold tracking-tight text-ink/10">404</p>
          <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-ink">
            {t.notFoundTitle}
          </h1>
          <p className="mt-4 text-muted leading-relaxed">{t.notFoundDesc}</p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-white text-sm font-semibold hover:bg-ink/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> {t.notFoundCta}
          </Link>
        </div>
      </Container>
    </section>
  );
}
