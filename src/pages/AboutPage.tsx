import { Heart, BookOpen, Users, Sparkles, ArrowRight, Quote, Calendar, MapPin, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLang } from '@/contexts/LanguageContext';

const VALUE_ICONS = [Heart, BookOpen, Users, Sparkles];

const TIMELINE = [
  { year: 'Beginning', title: 'Vision Born', desc: 'A group of passionate individuals from Jyoti Great Commission Fellowship recognized the educational struggles of children in Bungamati.' },
  { year: 'Foundation', title: 'Program Launched', desc: 'Free after-school tuition sessions began with a small group of volunteer tutors and a handful of eager students.' },
  { year: 'Growth', title: 'Community Impact', desc: 'Word spread through Bungamati. More children enrolled, more volunteers joined, and local schools began partnering with us.' },
  { year: 'Today', title: 'Growing Mission', desc: '65+ children receive daily tuition, mentorship, and educational supplies — all 100% free of charge.' },
];

export function AboutPage() {
  const { t } = useLang();
  const values = [
    { title: t.aboutValue1Title, desc: t.aboutValue1Desc },
    { title: t.aboutValue2Title, desc: t.aboutValue2Desc },
    { title: t.aboutValue3Title, desc: t.aboutValue3Desc },
    { title: t.aboutValue4Title, desc: t.aboutValue4Desc },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="pt-28 pb-20 md:pt-40 md:pb-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] rounded-full bg-blue-50/50 blur-[60px] md:blur-[80px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <Badge variant="indigo" className="mb-4">{t.aboutEyebrow}</Badge>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.05] tracking-[-0.03em] mt-3">
              {t.aboutTitle}
            </h1>
            <p className="mt-7 text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl">{t.aboutLead}</p>
            <p className="mt-4 text-slate-500 leading-relaxed max-w-2xl">{t.aboutP1}</p>
            <p className="mt-3 text-slate-500 leading-relaxed max-w-2xl">{t.aboutP2}</p>
            <div className="mt-8 flex gap-4">
              <Link to="/education"><Button className="rounded-full px-6">{t.eduModalExplore} <ArrowRight className="h-4 w-4" /></Button></Link>
              <Link to="/contact"><Button variant="secondary" className="rounded-full px-6">Contact Us</Button></Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-32 bg-slate-50">
        <Container>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Target, title: 'Our Mission', desc: 'To provide free, high-quality tuition and holistic educational encouragement to children in Nepal who lack access to adequate learning assistance, fostering confidence, character, and lifelong hope.', color: 'blue' },
              { icon: Sparkles, title: 'Our Vision', desc: 'A community where every child, regardless of economic background, has the guidance, books, and loving mentorship needed to learn and thrive.', color: 'indigo' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="rounded-2xl bg-white border border-slate-100 p-8 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] transition-all duration-500 h-full">
                  <div className={`w-12 h-12 rounded-2xl bg-${item.color}-50 flex items-center justify-center mb-5`}>
                    <item.icon className={`h-6 w-6 text-${item.color}-600`} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-[15px] text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-32 bg-white">
        <Container>
          <div className="text-center mb-16">
            <ScrollReveal>
              <Badge variant="blue" className="mb-4">Our Journey</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">From Vision to Impact</h2>
            </ScrollReveal>
          </div>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 via-indigo-200 to-transparent" />
            {TIMELINE.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className={`relative flex items-start gap-6 mb-14 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-sm z-10" />
                  <div className="ml-14 md:ml-0 md:w-1/2 bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">{item.year}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-[15px] text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-32 bg-slate-50">
        <Container>
          <div className="text-center mb-14">
            <ScrollReveal>
              <Badge variant="indigo" className="mb-4">Our Values</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">What We Stand For</h2>
            </ScrollReveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="group rounded-2xl bg-white border border-slate-100 p-7 hover:shadow-[0_20px_60px_-15px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-500 h-full">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-blue-600 transition-colors duration-500">
                      <Icon className="h-5 w-5 text-blue-600 group-hover:text-white transition-colors duration-500" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">{value.title}</h3>
                    <p className="text-[15px] text-slate-400 leading-relaxed">{value.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Partnership */}
      <section className="py-32 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <Badge variant="blue" className="mb-6">Partnership</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">Rooted in Fellowship</h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-4">
                Hands of Mercy Nepal operates in deep partnership with <strong className="text-slate-700">Jyoti Great Commission Fellowship, Bungamati Church</strong>. Our volunteer team, facilities, and community outreach are supported by church members committed to serving the neighborhood.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed mb-6">
                Bungamati — a town celebrated for its Newari terracotta heritage and vibrant community spirit — is home to our programs. Here, ancient streets meet modern hope as children discover the joy of learning.
              </p>
              <div className="flex items-center justify-center gap-3 text-sm text-slate-400">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span>Bungamati, Lalitpur, Bagmati Province, Nepal</span>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Quote */}
      <section className="py-24 bg-slate-900 relative overflow-hidden noise">
        <Container>
          <div className="text-center text-white max-w-2xl mx-auto">
            <Quote className="h-8 w-8 text-blue-400/40 mx-auto mb-6" />
            <p className="font-serif text-xl md:text-2xl italic leading-relaxed">
              "Compassion is not just a feeling — it is action. Every book we give, every lesson we teach, every child we encourage is mercy in motion."
            </p>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900 relative overflow-hidden noise">
        <Container>
          <div className="text-center text-white">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">Join Our Mission</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto text-lg">Whether through volunteering, donations, or simply spreading the word — you can help a child learn.</p>
            <Link to="/get-involved">
              <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8">Get Involved <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
