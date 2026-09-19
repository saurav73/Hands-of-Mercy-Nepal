import { useState } from 'react';
import { ArrowRight, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { PlaceholderNotice } from '@/components/ui/PlaceholderNotice';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLang } from '@/contexts/LanguageContext';

const CATEGORY_COLORS: Record<string, string> = {
  'Student Journey': 'blue',
  'Parent Perspective': 'amber',
  'Volunteer Reflection': 'indigo',
};

export function StoriesPage() {
  const { t } = useLang();
  const [sel, setSel] = useState<number | null>(null);
  const stories = [
    { title: t.story1Title, excerpt: t.story1Excerpt, content: t.story1Content, author: t.story1Author, role: t.story1Role, cat: 'Student Journey', gradient: 'from-blue-500 to-blue-600' },
    { title: t.story2Title, excerpt: t.story2Excerpt, content: t.story2Content, author: t.story2Author, role: t.story2Role, cat: 'Parent Perspective', gradient: 'from-indigo-500 to-indigo-600' },
    { title: t.story3Title, excerpt: t.story3Excerpt, content: t.story3Content, author: t.story3Author, role: t.story3Role, cat: 'Volunteer Reflection', gradient: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="pt-28 pb-20 md:pt-40 md:pb-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] rounded-full bg-blue-50/50 blur-[60px] md:blur-[80px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <Badge variant="blue" className="mb-4">{t.storiesEyebrow}</Badge>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.05] tracking-[-0.03em] mt-3">{t.storiesTitle}</h1>
            <p className="mt-7 text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl">{t.storiesLead}</p>
          </div>
        </Container>
      </section>

      {/* Stories */}
      <section className="py-32 bg-slate-50">
        <Container>
          <div className="grid md:grid-cols-3 gap-6">
            {stories.map((story, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <article
                  className="group rounded-2xl bg-white border border-slate-100 p-7 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 cursor-pointer h-full flex flex-col"
                  onClick={() => setSel(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSel(i)}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant={CATEGORY_COLORS[story.cat] as 'blue' | 'amber' | 'indigo'}>{story.cat}</Badge>
                    <PlaceholderNotice />
                  </div>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${story.gradient} flex items-center justify-center mb-4`}>
                    <Quote className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{story.title}</h3>
                  <p className="text-[15px] text-slate-400 leading-relaxed mb-4 flex-1">{story.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${story.gradient} flex items-center justify-center text-white text-xs font-bold`}>
                        {story.author[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{story.author}</p>
                        <p className="text-xs text-slate-400">{story.role}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="group/btn text-xs">
                      {t.storiesReadMore}
                      <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Button>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Every Story Matters */}
      <section className="py-32 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">Every Story Matters</h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                Behind every story is a child who found hope, a parent who found peace, and a volunteer who found purpose.
                These are the moments that drive our mission forward.
              </p>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900 relative overflow-hidden noise">
        <Container>
          <div className="text-center text-white">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">Share Your Story</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto text-lg">Have you been touched by Hands of Mercy? We'd love to hear from you.</p>
            <Link to="/contact">
              <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8">Get in Touch <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </div>
        </Container>
      </section>

      <Modal isOpen={sel !== null} onClose={() => setSel(null)} title={sel !== null ? stories[sel].title : undefined}>
        {sel !== null && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={CATEGORY_COLORS[stories[sel].cat] as 'blue' | 'amber' | 'indigo'}>{stories[sel].cat}</Badge>
              <PlaceholderNotice />
            </div>
            <p className="text-slate-500 leading-relaxed">{stories[sel].content}</p>
            <div className="pt-4 border-t border-slate-100">
              <p className="font-semibold text-slate-900">{stories[sel].author}</p>
              <p className="text-sm text-slate-400">{stories[sel].role}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
