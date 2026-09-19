import { useState } from 'react';
import { ArrowRight, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Modal } from '@/components/ui/Modal';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLang } from '@/contexts/LanguageContext';
import { Stories3D } from '@/components/three/Stories3D';

export function StoriesPage() {
  const { t } = useLang();
  const [sel, setSel] = useState<number | null>(null);
  const stories = [
    { title: t.story1Title, excerpt: t.story1Excerpt, content: t.story1Content, author: t.story1Author, role: t.story1Role, cat: 'Student Journey', gradient: 'from-blue-500 to-blue-600' },
    { title: t.story2Title, excerpt: t.story2Excerpt, content: t.story2Content, author: t.story2Author, role: t.story2Role, cat: 'Parent Perspective', gradient: 'from-indigo-500 to-indigo-600' },
    { title: t.story3Title, excerpt: t.story3Excerpt, content: t.story3Content, author: t.story3Author, role: t.story3Role, cat: 'Volunteer Reflection', gradient: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs tracking-widest uppercase text-faint mb-6">{t.storiesEyebrow}</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">{t.storiesTitle}</h1>
              <p className="mt-7 text-lg text-muted leading-relaxed max-w-xl">{t.storiesLead}</p>
            </div>
            <div className="h-[300px] md:h-[400px]">
              <Stories3D />
            </div>
          </div>
        </Container>
      </section>

      {/* Stories */}
      <section className="py-24 bg-bg rounded-4xl mx-4 my-8">
        <Container>
          <div className="grid md:grid-cols-3 gap-4">
            {stories.map((story, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <article
                  className="group bg-white rounded-3xl border border-line p-7 hover:shadow-card transition-all duration-300 cursor-pointer h-full flex flex-col"
                  onClick={() => setSel(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSel(i)}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-bold text-faint bg-bg px-2 py-0.5 rounded-full">{story.cat}</span>
                  </div>
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${story.gradient} flex items-center justify-center mb-4`}>
                    <Quote className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-ink mb-2 group-hover:text-ink/70 transition-colors">{story.title}</h3>
                  <p className="text-[15px] text-muted leading-relaxed mb-4 flex-1">{story.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-line">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${story.gradient} flex items-center justify-center text-white text-xs font-bold`}>
                        {story.author[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-ink">{story.author}</p>
                        <p className="text-xs text-faint">{story.role}</p>
                      </div>
                    </div>
                    <button className="text-xs font-medium text-ink hover:gap-2 inline-flex items-center gap-1 transition-all">
                      {t.storiesReadMore} <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Every Story Matters */}
      <section className="py-32">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-6">Every Story Matters</h2>
              <p className="text-lg text-muted leading-relaxed">
                Behind every story is a child who found hope, a parent who found peace, and a volunteer who found purpose.
              </p>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 tracking-tight">Share Your Story</h2>
            <p className="text-muted mb-8 max-w-xl mx-auto text-lg">Have you been touched by Hands of Mercy? We'd love to hear from you.</p>
            <Link to="/contact">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-ink text-white text-sm font-medium rounded-full hover:bg-ink/90 transition-all">
                Get in Touch <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </Container>
      </section>

      <Modal isOpen={sel !== null} onClose={() => setSel(null)} title={sel !== null ? stories[sel].title : undefined}>
        {sel !== null && (
          <div className="space-y-5">
            <span className="text-[10px] font-bold text-faint bg-bg px-2 py-0.5 rounded-full">{stories[sel].cat}</span>
            <p className="text-muted leading-relaxed">{stories[sel].content}</p>
            <div className="pt-4 border-t border-line">
              <p className="font-medium text-ink">{stories[sel].author}</p>
              <p className="text-sm text-muted">{stories[sel].role}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
