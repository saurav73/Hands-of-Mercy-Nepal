import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, BookOpen, Users, Megaphone, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLang } from '@/contexts/LanguageContext';

const INVOLVEMENT = [
  { icon: Heart, title: 'Donate', desc: 'Every rupee goes directly to books, supplies, and facilities for our students.', color: 'rose' },
  { icon: BookOpen, title: 'Volunteer', desc: 'Teach, mentor, or assist with after-school programs in Bungamati.', color: 'blue' },
  { icon: Users, title: 'Partner', desc: 'Schools, churches, and organizations can collaborate with our mission.', color: 'indigo' },
  { icon: Megaphone, title: 'Spread the Word', desc: 'Share our story on social media and help us reach more supporters.', color: 'amber' },
];

const FAQS = [
  { q: 'Is my donation tax-deductible?', a: 'We are a registered non-profit operating in Nepal. Please consult your local tax advisor regarding deductibility in your country.' },
  { q: 'Can I visit the programs?', a: 'Yes! We welcome visitors. Please contact us in advance so we can arrange a meaningful visit to our Bungamati center.' },
  { q: 'How are funds used?', a: '100% of donations go toward educational materials, facility maintenance, volunteer support, and direct student assistance. We operate with minimal overhead.' },
  { q: 'Can I sponsor a specific child?', a: 'While we encourage general support for the program, we can discuss specific child sponsorship arrangements upon request.' },
  { q: 'What qualifications do volunteers need?', a: 'No formal teaching qualifications are required. We provide orientation. The most important qualities are enthusiasm, consistency, and genuine care for children.' },
];

export function GetInvolvedPage() {
  const { t } = useLang();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* Hero */}
      <section className="pt-28 pb-20 md:pt-40 md:pb-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] rounded-full bg-blue-50/50 blur-[60px] md:blur-[80px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <Badge variant="amber" className="mb-4">{t.getInvolvedEyebrow}</Badge>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.05] tracking-[-0.03em] mt-3">
              {t.getInvolvedTitle}
            </h1>
            <p className="mt-7 text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl">{t.getInvolvedLead}</p>
          </div>
        </Container>
      </section>

      {/* Ways to Help */}
      <section className="py-32 bg-slate-50">
        <Container>
          <div className="text-center mb-14">
            <ScrollReveal>
              <Badge variant="blue" className="mb-4">Get Involved</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Ways to Help</h2>
            </ScrollReveal>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {INVOLVEMENT.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div className="group rounded-2xl bg-white border border-slate-100 p-8 hover:shadow-[0_20px_60px_-15px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-500 h-full">
                  <div className={`w-12 h-12 rounded-2xl bg-${item.color}-50 flex items-center justify-center mb-5 group-hover:bg-${item.color}-600 transition-colors duration-500`}>
                    <item.icon className={`h-5 w-5 text-${item.color}-600 group-hover:text-white transition-colors duration-500`} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-[15px] text-slate-400 leading-relaxed mb-5">{item.desc}</p>
                  <Link to="/contact">
                    <Button variant="ghost" size="sm" className="group/btn">
                      Contact Us <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <ScrollReveal>
                <Badge variant="indigo" className="mb-4">FAQ</Badge>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
              </ScrollReveal>
            </div>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="rounded-2xl border border-slate-100 overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between p-5 text-left bg-slate-50 hover:bg-slate-100 transition-colors"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span className="font-semibold text-slate-900 text-sm pr-4">{faq.q}</span>
                      <ChevronDown className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-[15px] text-slate-400 leading-relaxed">{faq.a}</p>
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
      <section className="py-24 bg-slate-900 relative overflow-hidden noise">
        <Container>
          <div className="text-center text-white">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">Ready to Make a Difference?</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto text-lg">Join us in giving children the education and hope they deserve.</p>
            <Link to="/contact">
              <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8">Get in Touch <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
