import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Heart, BookOpen, Users, GraduationCap, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useCountUp } from '@/hooks/useCountUp';
import { useLang } from '@/contexts/LanguageContext';

function Counter({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp({ end, duration: 2000 });
  return (
    <div ref={ref}>
      <div className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
        {count}<span className="text-blue-400">{suffix}</span>
      </div>
      <div className="text-sm text-slate-400 mt-2 tracking-wide">{label}</div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, delay = 0 }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string; delay?: number }) {
  return (
    <ScrollReveal delay={delay}>
      <div className="group relative p-7 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(37,99,235,0.12)] hover:-translate-y-1">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-blue-600 transition-colors duration-500">
          <Icon className="h-5 w-5 text-blue-600 group-hover:text-white transition-colors duration-500" />
        </div>
        <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-[15px] text-slate-400 leading-relaxed">{desc}</p>
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
          HERO — Bold, editorial, strong contrast
          ═══════════════════════════════════════════ */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white" />
        <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] rounded-full bg-blue-50/50 blur-[80px] md:blur-[100px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] rounded-full bg-indigo-50/30 blur-[60px] md:blur-[80px] translate-y-1/3 -translate-x-1/4" />
        <div className="absolute inset-0 dot-pattern opacity-40" />

        <Container className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Badge variant="blue">{t.heroBadge}</Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-serif text-[2.25rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.03em] text-slate-900 leading-[1.05]"
            >
              {t.heroTitle1}{' '}
              <span className="text-gradient">{t.heroTitle2}</span>
              <br />
              {t.heroTitle3}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl"
            >
              {t.heroDesc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link to="/get-involved">
                <Button size="lg" className="rounded-full px-8 bg-slate-900 hover:bg-slate-800">
                  {t.heroCta1} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/education">
                <Button variant="secondary" size="lg" className="rounded-full px-8">
                  {t.heroCta2}
                </Button>
              </Link>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-16 flex flex-wrap items-center gap-6 text-xs text-slate-400 tracking-wide"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                100% Free Education
              </div>
              <div className="w-px h-4 bg-slate-200" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                Bungamati, Nepal
              </div>
              <div className="w-px h-4 bg-slate-200" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-400" />
                Since Day One
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
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-2 text-slate-300">
            <span className="text-[10px] tracking-[0.25em] uppercase font-medium">Scroll</span>
            <div className="w-5 h-8 rounded-full border-2 border-slate-200 flex justify-center pt-1.5">
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1 h-1 rounded-full bg-slate-300" />
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ═══════════════════════════════════════════
          STATS — Dark section, bold numbers
          ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-slate-900 relative overflow-hidden noise">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-[250px] sm:w-[350px] md:w-[400px] h-[250px] sm:h-[350px] md:h-[400px] rounded-full bg-blue-500/20 blur-[80px] md:blur-[100px]" />
        </div>
        <Container className="relative z-10">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-8 text-white">
              <Counter end={65} suffix="+" label="Children Enrolled" />
              <Counter end={100} suffix="%" label="Free of Charge" />
              <Counter end={10} suffix="+" label="Volunteer Tutors" />
              <Counter end={4} suffix="" label="Active Programs" />
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════
          MISSION — Large editorial statement
          ═══════════════════════════════════════════ */}
      <section className="py-32 md:py-44 bg-white relative">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <Badge variant="indigo" className="mb-6">Our Mission</Badge>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-bold text-slate-900 leading-[1.08] tracking-[-0.02em]">
                Every child deserves the{' '}
                <span className="text-gradient">tools to learn</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-8 text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
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
              <Badge variant="blue" className="mb-4">How It Works</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                From enrollment to impact
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { step: '01', icon: Users, title: 'Enrollment', desc: 'Children from Bungamati are welcomed through community referrals — no fees, no barriers.' },
              { step: '02', icon: BookOpen, title: 'Daily Tuition', desc: 'Volunteer tutors provide homework help, subject teaching, and personalized attention.' },
              { step: '03', icon: Heart, title: 'Character Building', desc: 'Beyond academics — mentoring, values, and life skills that shape confident individuals.' },
              { step: '04', icon: GraduationCap, title: 'A Brighter Future', desc: 'Students grow into capable, hopeful contributors to their community.' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="relative p-7 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(37,99,235,0.1)] h-full">
                  <div className="text-[11px] font-bold text-blue-500 tracking-widest uppercase mb-4">Step {item.step}</div>
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                    <item.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-[15px] text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════
          QUOTE — Dark editorial
          ═══════════════════════════════════════════ */}
      <section className="py-32 md:py-44 bg-slate-900 relative overflow-hidden noise">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[250px] sm:w-[350px] md:w-[500px] h-[250px] sm:h-[350px] md:h-[500px] rounded-full bg-blue-500/30 blur-[80px] md:blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] rounded-full bg-purple-500/20 blur-[60px] md:blur-[100px]" />
        </div>
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <Quote className="h-10 w-10 text-blue-400/40 mx-auto mb-8" />
              <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-[1.15] tracking-tight">
                Compassion is not just a feeling — it is action. Every book we give, every lesson we teach, every child we encourage is mercy in motion.
              </blockquote>
              <div className="mt-10 flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-medium text-sm">Hands of Mercy Nepal</p>
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
                <Badge variant="blue" className="mb-4">Programs</Badge>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                  What we offer
                </h2>
              </ScrollReveal>
            </div>
            <ScrollReveal>
              <Link to="/education" className="hidden md:flex items-center gap-2 text-sm text-slate-400 hover:text-blue-600 font-medium transition-colors group">
                View all programs <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </ScrollReveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard icon={BookOpen} title="Academic Tutoring" desc="Math, Science, English, and Nepali — personalized for each student." delay={0} />
            <FeatureCard icon={GraduationCap} title="SEE Preparation" desc="Dedicated exam coaching for secondary students aiming for success." delay={0.08} />
            <FeatureCard icon={Heart} title="Character Building" desc="Values, discipline, and life skills through mentorship activities." delay={0.16} />
            <FeatureCard icon={Users} title="Community Outreach" desc="Engaging families and neighborhoods in the educational journey." delay={0.24} />
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
                {/* Central circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-[0_20px_60px_-15px_rgba(37,99,235,0.4)] flex items-center justify-center">
                  <Users className="h-10 w-10 text-white" />
                </div>
                {/* Orbiting circles */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="absolute w-16 h-16 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center"
                    style={{
                      top: `${50 + 35 * Math.sin((i * Math.PI * 2) / 6)}%`,
                      left: `${50 + 35 * Math.cos((i * Math.PI * 2) / 6)}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                      <Heart className="h-4 w-4 text-blue-500" />
                    </div>
                  </div>
                ))}
                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                  {[0, 1, 2, 3, 4, 5].map((i) => {
                    const x1 = 200 + 140 * Math.cos((i * Math.PI * 2) / 6);
                    const y1 = 200 + 140 * Math.sin((i * Math.PI * 2) / 6);
                    return (
                      <line key={i} x1="200" y1="200" x2={x1} y2={y1} stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 4" />
                    );
                  })}
                </svg>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <Badge variant="indigo" className="mb-6">Community</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                Built on<br />fellowship
              </h2>
              <p className="mt-6 text-lg text-slate-400 leading-relaxed">
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
              <Badge variant="blue" className="mb-4">Stories</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Real voices, real impact
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: '"Before joining, I struggled with math. Now I look forward to classes every day."', name: 'Student', role: 'Age 12, Grade 7', color: 'from-blue-500 to-blue-600' },
              { quote: '"The tutors don\'t just teach — they care. My daughter has grown so much confidence."', name: 'Parent', role: 'Bungamati Resident', color: 'from-indigo-500 to-indigo-600' },
              { quote: '"Volunteering here reminds me why education matters. Every child deserves this chance."', name: 'Tutor', role: 'Volunteer since 2023', color: 'from-purple-500 to-purple-600' },
            ].map((story, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="rounded-2xl border border-slate-100 p-8 h-full flex flex-col hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${story.color} flex items-center justify-center mb-5`}>
                    <Quote className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-slate-500 leading-relaxed flex-1 italic text-[15px]">{story.quote}</p>
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${story.color} flex items-center justify-center text-white text-xs font-bold`}>
                        {story.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{story.name}</p>
                        <p className="text-xs text-slate-400">{story.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-10 text-center">
              <Link to="/stories">
                <Button variant="secondary" className="rounded-full px-6">Read more stories <ArrowRight className="h-4 w-4" /></Button>
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════
          CTA — Bold gradient
          ═══════════════════════════════════════════ */}
      <section className="py-32 md:py-40 bg-slate-900 relative overflow-hidden noise">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[200px] sm:h-[300px] md:h-[400px] bg-gradient-to-b from-blue-600/20 to-transparent blur-[60px] md:blur-[80px]" />
        </div>
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                Ready to make a difference?
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
                  <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8">
                    {t.heroCta1} <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button className="bg-white/10 text-white border border-white/20 hover:bg-white/15 rounded-full px-8">
                    Contact us
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </div>
  );
}
