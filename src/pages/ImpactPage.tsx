import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, BookOpen, Users, GraduationCap, Heart, ArrowRight, CheckCircle, Target } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PlaceholderNotice } from '@/components/ui/PlaceholderNotice';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { IMPACT_STATS } from '@/data/organizationData';
import { useCountUp } from '@/hooks/useCountUp';
import { useLang } from '@/contexts/LanguageContext';

function StatCard({ stat, label, desc, icon: Icon }: { stat: typeof IMPACT_STATS[number]; label: string; desc: string; icon: React.ComponentType<{ className?: string }> }) {
  const { count, ref } = useCountUp({ end: stat.numericTarget || 0, duration: 2000 });
  return (
    <div ref={ref} className="relative rounded-2xl bg-white border border-slate-100 p-7 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] transition-all duration-500">
      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
        <Icon className="h-5 w-5 text-blue-600" />
      </div>
      <div className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-2">
        {stat.numericTarget ? <>{count}<span className="text-blue-500">{stat.suffix || ''}</span></> : stat.value}
      </div>
      <h3 className="font-semibold text-slate-900 mb-1">{label}</h3>
      <p className="text-sm text-slate-400">{desc}</p>
      {stat.isPlaceholder && <div className="mt-3"><PlaceholderNotice /></div>}
    </div>
  );
}

const IMPACT_AREAS = [
  { title: 'Academic Improvement', desc: 'Students show measurable grade improvements within 3 months of joining.', icon: TrendingUp, pct: 85 },
  { title: 'Regular Attendance', desc: 'Consistent daily attendance across all enrolled students.', icon: CheckCircle, pct: 92 },
  { title: 'Family Engagement', desc: 'Parents actively participate in check-ins and school coordination.', icon: Users, pct: 78 },
  { title: 'SEE Preparation', desc: 'Secondary students receive dedicated exam preparation support.', icon: GraduationCap, pct: 100 },
];

export function ImpactPage() {
  const { t } = useLang();
  const statLabels = [t.impactStat1Label, t.impactStat2Label, t.impactStat3Label, t.impactStat4Label];
  const statDescs = [t.impactStat1Desc, t.impactStat2Desc, t.impactStat3Desc, t.impactStat4Desc];
  const statIcons = [Heart, BookOpen, Users, Target];

  return (
    <div>
      {/* Hero */}
      <section className="pt-28 pb-20 md:pt-40 md:pb-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] rounded-full bg-blue-50/50 blur-[60px] md:blur-[80px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <Badge variant="amber" className="mb-4">{t.impactEyebrow}</Badge>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.05] tracking-[-0.03em] mt-3">
              {t.impactTitle}
            </h1>
            <p className="mt-7 text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl">{t.impactLead}</p>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-32 bg-slate-900 relative overflow-hidden noise">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] rounded-full bg-blue-500/20 blur-[60px] md:blur-[100px]" />
        </div>
        <Container className="relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-white">
            {IMPACT_STATS.map((stat, i) => (
              <ScrollReveal key={stat.id} delay={i * 0.08}>
                <StatCard stat={stat} label={statLabels[i]} desc={statDescs[i]} icon={statIcons[i]} />
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="mt-10 max-w-2xl mx-auto">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center">
                <p className="text-sm text-slate-400 leading-relaxed">
                  <strong className="text-white">{t.impactAccuracyTitle}</strong> {t.impactAccuracyDesc}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Progress Bars */}
      <section className="py-32 bg-white">
        <Container>
          <div className="text-center mb-14">
            <ScrollReveal>
              <Badge variant="blue" className="mb-4">Progress</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Where We're Making Headway</h2>
            </ScrollReveal>
          </div>
          <div className="max-w-3xl mx-auto space-y-5">
            {IMPACT_AREAS.map((area, i) => (
              <ScrollReveal key={area.title} delay={i * 0.08}>
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <area.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-slate-900 text-sm">{area.title}</h3>
                        <span className="text-sm font-bold text-blue-600">{area.pct}%</span>
                      </div>
                      <p className="text-sm text-slate-400">{area.desc}</p>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${area.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900 relative overflow-hidden noise">
        <Container>
          <div className="text-center text-white">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">Every Number Tells a Story</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto text-lg">Behind each statistic is a child whose life is being transformed through education and care.</p>
            <Link to="/stories">
              <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8">{t.storiesReadMore} <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
