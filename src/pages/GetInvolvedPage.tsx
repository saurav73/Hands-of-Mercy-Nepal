import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, BookOpen, Users, Megaphone, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLang } from '@/contexts/LanguageContext';
import { Volunteer3D } from '@/components/three/Volunteer3D';

const INVOLVEMENT = [
  { icon: Heart, title: 'Donate', desc: 'Every rupee goes directly to books, supplies, and facilities for our students.' },
  { icon: BookOpen, title: 'Volunteer', desc: 'Teach, mentor, or assist with after-school programs in Bungamati.' },
  { icon: Users, title: 'Partner', desc: 'Schools, churches, and organizations can collaborate with our mission.' },
  { icon: Megaphone, title: 'Spread the Word', desc: 'Share our story on social media and help us reach more supporters.' },
];

const FAQS = [
  { q: 'Is my donation tax-deductible?', a: 'We are a registered non-profit operating in Nepal. Please consult your local tax advisor regarding deductibility in your country.' },
  { q: 'Can I visit the programs?', a: 'Yes! We welcome visitors. Please contact us in advance so we can arrange a meaningful visit to our Bungamati center.' },
  { q: 'How are funds used?', a: '100% of donations go toward educational materials, facility maintenance, volunteer support, and direct student assistance.' },
  { q: 'Can I sponsor a specific child?', a: 'While we encourage general support for the program, we can discuss specific child sponsorship arrangements upon request.' },
  { q: 'What qualifications do volunteers need?', a: 'No formal teaching qualifications are required. We provide orientation. The most important qualities are enthusiasm and genuine care.' },
];

export function GetInvolvedPage() {
  const { t } = useLang();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs tracking-widest uppercase text-faint mb-6">{t.getInvolvedEyebrow}</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
                {t.getInvolvedTitle}
              </h1>
              <p className="mt-7 text-lg text-muted leading-relaxed max-w-xl">{t.getInvolvedLead}</p>
            </div>
            <div className="h-[300px] md:h-[400px]">
              <Volunteer3D />
            </div>
          </div>
        </Container>
      </section>

      {/* Ways to Help */}
      <section className="py-24 bg-bg rounded-4xl mx-4 my-8">
        <Container>
          <div className="text-center mb-14">
            <ScrollReveal>
              <p className="text-xs tracking-widest uppercase text-faint mb-4">Get Involved</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">Ways to Help</h2>
            </ScrollReveal>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {INVOLVEMENT.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div className="group bg-white rounded-3xl border border-line p-8 hover:shadow-card transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-bg flex items-center justify-center mb-5 group-hover:bg-ink group-hover:text-white transition-all">
                    <item.icon className="h-5 w-5 text-ink group-hover:text-white transition-all" />
                  </div>
                  <h3 className="text-xl font-semibold text-ink mb-2">{item.title}</h3>
                  <p className="text-[15px] text-muted leading-relaxed mb-5">{item.desc}</p>
                  <Link to="/contact">
                    <button className="text-sm font-medium text-ink hover:gap-2 inline-flex items-center gap-1 transition-all">
                      Contact Us <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-32">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <ScrollReveal>
                <p className="text-xs tracking-widest uppercase text-faint mb-4">FAQ</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">Frequently Asked Questions</h2>
              </ScrollReveal>
            </div>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="rounded-3xl border border-line overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between p-5 text-left bg-bg hover:bg-line/50 transition-colors"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span className="font-medium text-ink text-sm pr-4">{faq.q}</span>
                      <ChevronDown className={`h-5 w-5 text-faint shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <p className="px-5 pb-5 text-[15px] text-muted leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 tracking-tight">Ready to Make a Difference?</h2>
            <p className="text-muted mb-8 max-w-xl mx-auto text-lg">Join us in giving children the education and hope they deserve.</p>
            <Link to="/contact">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-ink text-white text-sm font-medium rounded-full hover:bg-ink/90 transition-all">
                Get in Touch <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
