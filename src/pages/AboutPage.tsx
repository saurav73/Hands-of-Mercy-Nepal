import { Heart, BookOpen, Users, Sparkles, ArrowRight, Quote, Calendar, MapPin, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLang } from '@/contexts/LanguageContext';
import { Community3D } from '@/components/three/Community3D';

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
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs tracking-widest uppercase text-faint mb-6">{t.aboutEyebrow}</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
                {t.aboutTitle}
              </h1>
              <p className="mt-7 text-lg text-muted leading-relaxed max-w-xl">{t.aboutLead}</p>
              <p className="mt-4 text-muted leading-relaxed max-w-xl">{t.aboutP1}</p>
              <p className="mt-3 text-muted leading-relaxed max-w-xl">{t.aboutP2}</p>
              <div className="mt-8 flex gap-4">
                <Link to="/education">
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-white text-sm font-medium rounded-full hover:bg-ink/90 transition-all">
                    {t.eduModalExplore} <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full border border-line hover:bg-bg transition-all">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
            <div className="h-[300px] md:h-[400px]">
              <Community3D />
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-bg rounded-4xl mx-4 my-8">
        <Container>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Target, title: 'Our Mission', desc: 'To provide free, high-quality tuition and holistic educational encouragement to children in Nepal who lack access to adequate learning assistance, fostering confidence, character, and lifelong hope.' },
              { icon: Sparkles, title: 'Our Vision', desc: 'A community where every child, regardless of economic background, has the guidance, books, and loving mentorship needed to learn and thrive.' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="rounded-3xl bg-white border border-line p-8 hover:shadow-card transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-bg flex items-center justify-center mb-5">
                    <item.icon className="h-6 w-6 text-ink" />
                  </div>
                  <h3 className="text-xl font-semibold text-ink mb-3">{item.title}</h3>
                  <p className="text-[15px] text-muted leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-32">
        <Container>
          <div className="text-center mb-16">
            <ScrollReveal>
              <p className="text-xs tracking-widest uppercase text-faint mb-4">Our Journey</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">From Vision to Impact</h2>
            </ScrollReveal>
          </div>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-line" />
            {TIMELINE.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className={`relative flex items-start gap-6 mb-14 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-ink border-4 border-white z-10" />
                  <div className="ml-14 md:ml-0 md:w-1/2 bg-white rounded-3xl border border-line p-6 hover:shadow-card transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-faint" />
                      <span className="text-[11px] font-bold text-faint uppercase tracking-wider">{item.year}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-ink mb-2">{item.title}</h3>
                    <p className="text-[15px] text-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-24 bg-bg rounded-4xl mx-4 my-8">
        <Container>
          <div className="text-center mb-14">
            <ScrollReveal>
              <p className="text-xs tracking-widest uppercase text-faint mb-4">Our Values</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">What We Stand For</h2>
            </ScrollReveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="group bg-white rounded-3xl border border-line p-7 hover:shadow-card transition-all duration-300 h-full">
                    <div className="w-11 h-11 rounded-2xl bg-bg flex items-center justify-center mb-5 group-hover:bg-ink group-hover:text-white transition-all">
                      <Icon className="h-5 w-5 text-ink group-hover:text-white transition-all" />
                    </div>
                    <h3 className="font-semibold text-ink mb-2">{value.title}</h3>
                    <p className="text-[15px] text-muted leading-relaxed">{value.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Partnership */}
      <section className="py-32">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <p className="text-xs tracking-widest uppercase text-faint mb-4">Partnership</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-6">Rooted in Fellowship</h2>
              <p className="text-lg text-muted leading-relaxed mb-4">
                Hands of Mercy Nepal operates in deep partnership with <strong className="text-ink">Jyoti Great Commission Fellowship, Bungamati Church</strong>.
              </p>
              <div className="flex items-center justify-center gap-3 text-sm text-faint">
                <MapPin className="h-4 w-4" />
                <span>Bungamati, Lalitpur, Nepal</span>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Quote */}
      <section className="py-24 bg-ink text-white rounded-4xl mx-4 my-8">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <Quote className="h-8 w-8 text-white/30 mx-auto mb-6" />
            <p className="font-serif text-xl md:text-2xl italic leading-relaxed">
              "Compassion is not just a feeling — it is action."
            </p>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 tracking-tight">Join Our Mission</h2>
            <p className="text-muted mb-8 max-w-xl mx-auto text-lg">Whether through volunteering, donations, or simply spreading the word — you can help a child learn.</p>
            <Link to="/get-involved">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-ink text-white text-sm font-medium rounded-full hover:bg-ink/90 transition-all">
                Get Involved <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
