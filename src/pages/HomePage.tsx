import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Heart, BookOpen, Users, GraduationCap, Quote, Sparkles, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useCountUp } from '@/hooks/useCountUp';
import { useLang } from '@/contexts/LanguageContext';

function Counter({ end, suffix, label, icon: Icon }: { end: number; suffix: string; label: string; icon: React.ComponentType<{ className?: string }> }) {
  const { count, ref } = useCountUp({ end, duration: 2000 });
  return (
    <div ref={ref} className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-5 shadow-lg shadow-blue-500/25">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
          {count}<span className="text-blue-400">{suffix}</span>
        </div>
        <div className="text-sm text-slate-400 mt-3 tracking-wide font-medium">{label}</div>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, delay = 0, color }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string; delay?: number; color: string }) {
  return (
    <ScrollReveal delay={delay}>
      <div className="group relative p-8 rounded-3xl bg-white border border-slate-100 hover:border-transparent transition-all duration-500 hover:shadow-card-hover hover:-translate-y-2 overflow-hidden card-shine">
        <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" style={{ background: `linear-gradient(135deg, ${color}08, ${color}15)` }} />
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3" style={{ background: `linear-gradient(135deg, ${color}15, ${color}25)` }}>
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">{title}</h3>
          <p className="text-[15px] text-slate-500 leading-relaxed">{desc}</p>
          <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0" style={{ color }}>
            Learn more <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export function HomePage() {
  const { t } = useLang();
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.97]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div>
      {/* ═══════════════════════════════════════════
          HERO — Dramatic gradient with floating elements
          ═══════════════════════════════════════════ */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950" />
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[120px] animate-pulse-subtle" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[100px] animate-pulse-subtle" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-indigo-500/15 blur-[80px] animate-pulse-subtle" style={{ animationDelay: '2s' }} />
        </div>
        <div className="absolute inset-0 grid-pattern opacity-20" />

        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-32 right-[15%] w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center"
          >
            <BookOpen className="h-7 w-7 text-blue-400" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-40 left-[10%] w-14 h-14 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center"
          >
            <Heart className="h-6 w-6 text-rose-400" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-1/2 right-[8%] w-12 h-12 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center"
          >
            <GraduationCap className="h-5 w-5 text-emerald-400" />
          </motion.div>
        </div>

        <Container className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
                <Sparkles className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-white/90">{t.heroBadge}</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.03em] text-white leading-[1.05]"
            >
              {t.heroTitle1}{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">{t.heroTitle2}</span>
              <br />
              {t.heroTitle3}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl"
            >
              {t.heroDesc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 flex flex-wrap gap-4"
            >
              <Link to="/get-involved">
                <button className="group inline-flex items-center gap-2.5 px-8 py-4 bg-white text-slate-900 font-semibold rounded-full hover:bg-slate-100 transition-all duration-300 shadow-lg shadow-white/10 hover:shadow-xl hover:shadow-white/20 hover:-translate-y-0.5">
                  {t.heroCta1}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/education">
                <button className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 backdrop-blur-sm">
                  {t.heroCta2}
                </button>
              </Link>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-20 flex flex-wrap items-center gap-6 text-sm text-slate-500"
            >
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
                <span className="text-white/70">100% Free Education</span>
              </div>
              <div className="w-px h-4 bg-white/20" />
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50" />
                <span className="text-white/70">Bungamati, Nepal</span>
              </div>
              <div className="w-px h-4 bg-white/20" />
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50" />
                <span className="text-white/70">Since Day One</span>
              </div>
            </motion.div>
          </div>
        </Container>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-2 text-white/30">
            <span className="text-[10px] tracking-[0.25em] uppercase font-medium">Scroll</span>
            <div className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center pt-1.5">
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1 h-1 rounded-full bg-white/40" />
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ═══════════════════════════════════════════
          STATS — Dark section with glow effects
          ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden noise">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[80px]" />
        </div>
        <Container className="relative z-10">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Counter end={65} suffix="+" label="Children Enrolled" icon={Users} />
              <Counter end={100} suffix="%" label="Free of Charge" icon={Heart} />
              <Counter end={10} suffix="+" label="Volunteer Tutors" icon={GraduationCap} />
              <Counter end={4} suffix="" label="Active Programs" icon={BookOpen} />
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════
          MISSION — Large editorial statement
          ═══════════════════════════════════════════ */}
      <section className="py-32 md:py-44 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-50 to-purple-50 blur-[80px]" />
        </div>
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-8">
                <span className="text-sm font-semibold text-indigo-600">Our Mission</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-bold text-slate-900 leading-[1.08] tracking-[-0.02em]">
                Every child deserves the{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">tools to learn</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-8 text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
                Hands of Mercy Nepal provides free tuition, mentorship, and educational supplies to children
                in Bungamati — because no child should be left behind.
              </p>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════
          HOW IT WORKS — Clean timeline
          ═══════════════════════════════════════════ */}
      <section className="py-32 md:py-40 bg-slate-50 relative">
        <Container>
          <div className="text-center mb-20">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
                <span className="text-sm font-semibold text-blue-600">How It Works</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                From enrollment to impact
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { step: '01', icon: Users, title: 'Enrollment', desc: 'Children from Bungamati are welcomed through community referrals — no fees, no barriers.', color: '#3B82F6' },
              { step: '02', icon: BookOpen, title: 'Daily Tuition', desc: 'Volunteer tutors provide homework help, subject teaching, and personalized attention.', color: '#8B5CF6' },
              { step: '03', icon: Heart, title: 'Character Building', desc: 'Beyond academics — mentoring, values, and life skills that shape confident individuals.', color: '#EC4899' },
              { step: '04', icon: GraduationCap, title: 'A Brighter Future', desc: 'Students grow into capable, hopeful contributors to their community.', color: '#10B981' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="relative p-8 rounded-3xl bg-white border border-slate-100 hover:border-transparent transition-all duration-500 hover:shadow-card-hover hover:-translate-y-2 h-full group overflow-hidden card-shine">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ background: item.color }} />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="text-[11px] font-bold tracking-widest uppercase" style={{ color: item.color }}>Step {item.step}</div>
                      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${item.color}30, transparent)` }} />
                    </div>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110" style={{ background: `${item.color}10` }}>
                      <item.icon className="h-5 w-5" style={{ color: item.color }} />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-[15px] text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════
          QUOTE — Dark editorial with gradient border
          ═══════════════════════════════════════════ */}
      <section className="py-32 md:py-44 bg-slate-900 relative overflow-hidden noise">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-purple-500/20 blur-[100px]" />
        </div>
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-30" />
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl">
                  <Quote className="h-7 w-7 text-white" />
                </div>
              </div>
              <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-[1.15] tracking-tight">
                Compassion is not just a feeling — it is action. Every book we give, every lesson we teach, every child we encourage is mercy in motion.
              </blockquote>
              <div className="mt-12 flex items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold">Hands of Mercy Nepal</p>
                  <p className="text-slate-500 text-sm">Jyoti Great Commission Fellowship</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════
          PROGRAMS — Feature cards
          ═══════════════════════════════════════════ */}
      <section className="py-32 md:py-40 bg-white">
        <Container>
          <div className="flex items-end justify-between mb-16">
            <div>
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
                  <span className="text-sm font-semibold text-blue-600">Programs</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                  What we offer
                </h2>
              </ScrollReveal>
            </div>
            <ScrollReveal>
              <Link to="/education" className="hidden md:flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 font-semibold transition-colors group">
                View all programs <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </ScrollReveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard icon={BookOpen} title="Academic Tutoring" desc="Math, Science, English, and Nepali — personalized for each student." delay={0} color="#3B82F6" />
            <FeatureCard icon={GraduationCap} title="SEE Preparation" desc="Dedicated exam coaching for secondary students aiming for success." delay={0.08} color="#8B5CF6" />
            <FeatureCard icon={Heart} title="Character Building" desc="Values, discipline, and life skills through mentorship activities." delay={0.16} color="#EC4899" />
            <FeatureCard icon={Users} title="Community Outreach" desc="Engaging families and neighborhoods in the educational journey." delay={0.24} color="#10B981" />
          </div>

          <div className="mt-10 md:hidden text-center">
            <Link to="/education">
              <Button variant="secondary" className="rounded-full px-6">View all programs <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════
          COMMUNITY — Split layout with visual
          ═══════════════════════════════════════════ */}
      <section className="py-32 md:py-40 bg-slate-50 relative overflow-hidden">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Visual — abstract community illustration using CSS */}
            <ScrollReveal>
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Background blob */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50 animate-morph" />
                {/* Central circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-glow-lg flex items-center justify-center z-10">
                  <Users className="h-12 w-12 text-white" />
                </div>
                {/* Orbiting circles */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                    className="absolute w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-card flex items-center justify-center z-10"
                    style={{
                      top: `${50 + 35 * Math.sin((i * Math.PI * 2) / 6)}%`,
                      left: `${50 + 35 * Math.cos((i * Math.PI * 2) / 6)}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                      <Heart className="h-5 w-5 text-blue-500" />
                    </div>
                  </motion.div>
                ))}
                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                  {[0, 1, 2, 3, 4, 5].map((i) => {
                    const x1 = 200 + 140 * Math.cos((i * Math.PI * 2) / 6);
                    const y1 = 200 + 140 * Math.sin((i * Math.PI * 2) / 6);
                    return (
                      <line key={i} x1="200" y1="200" x2={x1} y2={y1} stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
                    );
                  })}
                  <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
                <span className="text-sm font-semibold text-indigo-600">Community</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                Built on<br />fellowship
              </h2>
              <p className="mt-6 text-lg text-slate-500 leading-relaxed">
                Our volunteer tutors come from Jyoti Great Commission Fellowship, Bungamati Church.
                Together, we're not just teaching subjects — we're building a community that wraps
                around every child with care.
              </p>
              <div className="mt-8 flex gap-4">
                <Link to="/about">
                  <Button className="rounded-full px-6">Learn more <ArrowRight className="h-4 w-4" /></Button>
                </Link>
                <Link to="/contact">
                  <Button variant="secondary" className="rounded-full px-6">Get in touch</Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════
          STORIES — Testimonial cards
          ═══════════════════════════════════════════ */}
      <section className="py-32 md:py-40 bg-white">
        <Container>
          <div className="text-center mb-16">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
                <span className="text-sm font-semibold text-blue-600">Stories</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Real voices, real impact
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: '"Before joining, I struggled with math. Now I look forward to classes every day."', name: 'Student', role: 'Age 12, Grade 7', gradient: 'from-blue-500 to-blue-600' },
              { quote: '"The tutors don\'t just teach — they care. My daughter has grown so much confidence."', name: 'Parent', role: 'Bungamati Resident', gradient: 'from-indigo-500 to-indigo-600' },
              { quote: '"Volunteering here reminds me why education matters. Every child deserves this chance."', name: 'Tutor', role: 'Volunteer since 2023', gradient: 'from-purple-500 to-purple-600' },
            ].map((story, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="rounded-3xl border border-slate-100 p-8 h-full flex flex-col hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 group overflow-hidden card-shine">
                  <div className="relative mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${story.gradient} flex items-center justify-center shadow-lg`}>
                      <Quote className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed flex-1 text-[15px]">{story.quote}</p>
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${story.gradient} flex items-center justify-center text-white text-sm font-bold shadow-md`}>
                        {story.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{story.name}</p>
                        <p className="text-xs text-slate-400">{story.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-12 text-center">
              <Link to="/stories">
                <Button variant="secondary" className="rounded-full px-6">Read more stories <ArrowRight className="h-4 w-4" /></Button>
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════
          CTA — Bold gradient with animated background
          ═══════════════════════════════════════════ */}
      <section className="py-32 md:py-40 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 relative overflow-hidden noise">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-500/20 to-transparent blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-purple-500/15 blur-[100px]" />
          <div className="absolute top-1/2 right-0 w-[300px] h-[300px] rounded-full bg-pink-500/10 blur-[80px]" />
        </div>
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                Ready to make a{' '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">difference</span>?
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-6 text-lg text-slate-400 leading-relaxed">
                Every donation, every hour of volunteering, every shared story helps a child learn and grow.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link to="/get-involved">
                  <button className="group inline-flex items-center gap-2.5 px-8 py-4 bg-white text-slate-900 font-semibold rounded-full hover:bg-slate-100 transition-all duration-300 shadow-lg shadow-white/10 hover:shadow-xl hover:shadow-white/20 hover:-translate-y-0.5">
                    {t.heroCta1}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 backdrop-blur-sm">
                    Contact us
                  </button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </div>
  );
}
