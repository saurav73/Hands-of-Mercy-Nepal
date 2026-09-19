import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, BookOpen, Users, GraduationCap, Heart, ArrowRight, CheckCircle, Target } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { IMPACT_STATS } from '@/data/organizationData';
import { useCountUp } from '@/hooks/useCountUp';
import { useLang } from '@/contexts/LanguageContext';
import { Globe3D } from '@/components/three/Globe3D';

function StatCard({ stat, label, desc, icon: Icon }: { stat: typeof IMPACT_STATS[number]; label: string; desc: string; icon: React.ComponentType<{ className?: string }> }) {
  const { count, ref } = useCountUp({ end: stat.numericTarget || 0, duration: 2000 });
  return (
    <div ref={ref} className="rounded-3xl bg-white border border-line p-7 hover:shadow-card transition-all duration-300">
      <div className="w-10 h-10 rounded-2xl bg-bg flex items-center justify-center mb-4">
        <Icon className="h-5 w-5 text-ink" />
      </div>
      <div className="text-4xl md:text-5xl font-semibold text-ink mb-2">
        {stat.numericTarget ? <>{count}<span className="text-faint">{stat.suffix || ''}</span></> : stat.value}
      </div>
      <h3 className="font-medium text-ink mb-1">{label}</h3>
      <p className="text-sm text-muted">{desc}</p>
    </div>
  );
}

const IMPACT_AREAS = [
  { title: 'Academic Improvement', desc: 'Students show measurable grade improvements within 3 months.', icon: TrendingUp, pct: 85 },
  { title: 'Regular Attendance', desc: 'Consistent daily attendance across all enrolled students.', icon: CheckCircle, pct: 92 },
  { title: 'Family Engagement', desc: 'Parents actively participate in check-ins and coordination.', icon: Users, pct: 78 },
  { title: 'SEE Preparation', desc: 'Secondary students receive dedicated exam preparation.', icon: GraduationCap, pct: 100 },
];

export function ImpactPage() {
  const { t } = useLang();
  const statLabels = [t.impactStat1Label, t.impactStat2Label, t.impactStat3Label, t.impactStat4Label];
  const statDescs = [t.impactStat1Desc, t.impactStat2Desc, t.impactStat3Desc, t.impactStat4Desc];
  const statIcons = [Heart, BookOpen, Users, Target];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs tracking-widest uppercase text-faint mb-6">{t.impactEyebrow}</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
                {t.impactTitle}
              </h1>
              <p className="mt-7 text-lg text-muted leading-relaxed max-w-xl">{t.impactLead}</p>
            </div>
            <div className="h-[300px] md:h-[400px]">
              <Globe3D />
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-24 bg-bg rounded-4xl mx-4 my-8">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {IMPACT_STATS.map((stat, i) => (
              <ScrollReveal key={stat.id} delay={i * 0.08}>
                <StatCard stat={stat} label={statLabels[i]} desc={statDescs[i]} icon={statIcons[i]} />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Progress Bars */}
      <section className="py-32">
        <Container>
          <div className="text-center mb-14">
            <ScrollReveal>
              <p className="text-xs tracking-widest uppercase text-faint mb-4">Progress</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">Where We're Making Headway</h2>
            </ScrollReveal>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {IMPACT_AREAS.map((area, i) => (
              <ScrollReveal key={area.title} delay={i * 0.08}>
                <div className="bg-bg rounded-3xl border border-line p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shrink-0">
                      <area.icon className="h-5 w-5 text-ink" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-ink text-sm">{area.title}</h3>
                        <span className="text-sm font-bold text-ink">{area.pct}%</span>
                      </div>
                      <p className="text-sm text-muted">{area.desc}</p>
                    </div>
                  </div>
                  <div className="h-2 bg-line rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${area.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                      className="h-full bg-ink rounded-full"
                    />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 tracking-tight">Every Number Tells a Story</h2>
            <p className="text-muted mb-8 max-w-xl mx-auto text-lg">Behind each statistic is a child whose life is being transformed.</p>
            <Link to="/stories">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-ink text-white text-sm font-medium rounded-full hover:bg-ink/90 transition-all">
                {t.storiesReadMore} <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
