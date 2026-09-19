import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Heart, BookOpen, Users, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useCountUp } from '@/hooks/useCountUp';
import { useLang } from '@/contexts/LanguageContext';
import { HeroScene3D } from '@/components/three/HeroScene3D';
import { MercyHeart3D } from '@/components/three/MercyHeart3D';
import { FloatingBooks3D } from '@/components/three/FloatingBooks3D';

function Counter({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp({ end, duration: 2000 });
  return (
    <div ref={ref} className="text-center p-6 rounded-3xl bg-white border border-line">
      <div className="text-4xl md:text-5xl font-semibold tracking-tight">
        {count}<span className="text-faint">{suffix}</span>
      </div>
      <div className="text-xs text-faint mt-2 tracking-widest uppercase">{label}</div>
    </div>
  );
}

export function HomePage() {
  const { t } = useLang();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div className="bg-white">
      {/* HERO */}
      <motion.section style={{ opacity: heroOpacity }} className="min-h-screen flex items-center">
        <Container className="pt-24 pb-16 md:pt-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <p className="text-xs tracking-widest uppercase text-faint mb-6">{t.heroBadge}</p>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.08]">
                {t.heroTitle1}{' '}
                <span className="text-faint">{t.heroTitle2}</span>
                <br />
                {t.heroTitle3}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-6 text-muted text-lg leading-relaxed max-w-lg">
                {t.heroDesc}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-10 flex flex-wrap gap-4">
                <Link to="/get-involved">
                  <button className="group inline-flex items-center gap-2 px-7 py-3.5 bg-ink text-white text-sm font-medium rounded-full hover:bg-ink/90 transition-all">
                    {t.heroCta1} <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </Link>
                <Link to="/education">
                  <button className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium rounded-full border border-line hover:bg-bg transition-all">
                    {t.heroCta2}
                  </button>
                </Link>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }}
              className="h-[350px] md:h-[450px] lg:h-[500px]">
              <HeroScene3D />
            </motion.div>
          </div>
        </Container>
      </motion.section>

      {/* STATS */}
      <section className="py-20 border-t border-line">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Counter end={65} suffix="+" label="Children" />
            <Counter end={100} suffix="%" label="Free" />
            <Counter end={10} suffix="+" label="Tutors" />
            <Counter end={4} suffix="" label="Programs" />
          </div>
        </Container>
      </section>

      {/* MISSION */}
      <section className="py-32 md:py-44">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal><p className="text-xs tracking-widest uppercase text-faint mb-6">Our Mission</p></ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
                Every child deserves the tools to learn
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-8 text-muted text-lg leading-relaxed max-w-xl mx-auto">
                Hands of Mercy Nepal provides free tuition, mentorship, and educational supplies to children in Bungamati — because no child should be left behind.
              </p>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-bg rounded-4xl mx-4 my-8">
        <Container>
          <div className="text-center mb-16">
            <ScrollReveal>
              <p className="text-xs tracking-widest uppercase text-faint mb-4">Process</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">From enrollment to impact</h2>
            </ScrollReveal>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: '01', icon: Users, title: 'Enroll', desc: 'Community referrals welcome all children.' },
              { step: '02', icon: BookOpen, title: 'Teach', desc: 'Daily tuition from volunteer tutors.' },
              { step: '03', icon: Heart, title: 'Mentor', desc: 'Values and life skills beyond academics.' },
              { step: '04', icon: GraduationCap, title: 'Grow', desc: 'Students become community contributors.' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-white rounded-3xl border border-line p-7 h-full">
                  <span className="text-xs font-medium text-faint">{item.step}</span>
                  <div className="w-11 h-11 rounded-2xl bg-bg flex items-center justify-center mt-4 mb-5">
                    <item.icon className="h-5 w-5 text-ink" />
                  </div>
                  <h3 className="font-medium text-ink mb-2">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 3D BOOKS */}
      <section className="py-32 md:py-44">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="h-[300px] md:h-[400px]">
                <FloatingBooks3D />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="text-xs tracking-widest uppercase text-faint mb-4">Education</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">Learning without limits</h2>
              <p className="mt-6 text-muted text-lg leading-relaxed">
                Our volunteer tutors provide personalized attention in Math, Science, English, and Nepali — helping each child reach their potential.
              </p>
              <Link to="/education" className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-ink hover:gap-3 transition-all">
                Explore programs <ArrowRight className="h-4 w-4" />
              </Link>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* QUOTE */}
      <section className="py-32 md:py-44 bg-ink text-white rounded-4xl mx-4 my-8">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif leading-[1.2] tracking-tight">
                "Compassion is not just a feeling — it is action."
              </blockquote>
              <p className="mt-8 text-sm text-white/40">Hands of Mercy Nepal</p>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* 3D HEART */}
      <section className="py-32 md:py-44">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <p className="text-xs tracking-widest uppercase text-faint mb-4">Community</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">Built on fellowship</h2>
              <p className="mt-6 text-muted text-lg leading-relaxed">
                Our tutors come from Jyoti Great Commission Fellowship — building a community that wraps around every child with care.
              </p>
              <div className="mt-8 flex gap-4">
                <Link to="/about">
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-white text-sm font-medium rounded-full hover:bg-ink/90 transition-all">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full border border-line hover:bg-bg transition-all">
                    Contact
                  </button>
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="h-[300px] md:h-[400px]">
                <MercyHeart3D />
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* PROGRAMS */}
      <section className="py-24 bg-bg rounded-4xl mx-4 my-8">
        <Container>
          <div className="text-center mb-16">
            <ScrollReveal>
              <p className="text-xs tracking-widest uppercase text-faint mb-4">Programs</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">What we offer</h2>
            </ScrollReveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: BookOpen, title: 'Tutoring', desc: 'Math, Science, English, Nepali — personalized.' },
              { icon: GraduationCap, title: 'SEE Prep', desc: 'Exam coaching for secondary students.' },
              { icon: Heart, title: 'Character', desc: 'Values, discipline, and life skills.' },
              { icon: Users, title: 'Outreach', desc: 'Engaging families in the journey.' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="bg-white rounded-3xl border border-line p-7 hover:shadow-card transition-all duration-300 group">
                  <div className="w-11 h-11 rounded-2xl bg-bg flex items-center justify-center mb-4 group-hover:bg-ink group-hover:text-white transition-all">
                    <item.icon className="h-5 w-5 text-ink group-hover:text-white transition-all" />
                  </div>
                  <h3 className="font-medium text-ink mb-2">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-44">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">Ready to make a difference?</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-6 text-muted text-lg leading-relaxed">Every donation, every hour of volunteering, every shared story helps a child learn and grow.</p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link to="/get-involved">
                  <button className="group inline-flex items-center gap-2 px-8 py-4 bg-ink text-white text-sm font-medium rounded-full hover:bg-ink/90 transition-all">
                    {t.heroCta1} <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium rounded-full border border-line hover:bg-bg transition-all">Contact us</button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </div>
  );
}
