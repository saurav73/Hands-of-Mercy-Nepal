import { useState } from 'react';
import { BookOpen, PenTool, HeartHandshake, Users, ArrowRight, CheckCircle, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { PROGRAMS_DATA } from '@/data/organizationData';
import { useLang } from '@/contexts/LanguageContext';
import type { ProgramItem } from '@/types';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = { BookOpen, PenTool, HeartHandshake, Users };

const SUBJECTS = [
  { name: 'Mathematics', desc: 'From basic arithmetic to algebra, geometry, and SEE preparation.', icon: '📐' },
  { name: 'Science', desc: 'General science concepts, experiments, and scientific thinking.', icon: '🔬' },
  { name: 'English', desc: 'Grammar, reading comprehension, writing, and conversation skills.', icon: '📝' },
  { name: 'Nepali', desc: 'Language proficiency, literature, and communication in Nepali.', icon: '📖' },
];

const SCHEDULE = [
  { day: 'Sunday - Thursday', time: '4:00 PM - 6:00 PM', desc: 'Daily after-school tuition sessions' },
  { day: 'Saturday', time: '10:00 AM - 12:00 PM', desc: 'Special activities, art, and character building' },
];

export function EducationPage() {
  const { t } = useLang();
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);

  const programs = [
    { ...PROGRAMS_DATA[0], title: t.eduProgram1Title, shortDesc: t.eduProgram1Short, fullDesc: t.eduProgram1Full, audience: t.eduProgram1Audience, badgeText: t.eduProgram1Badge, highlights: [t.eduProgram1H1, t.eduProgram1H2, t.eduProgram1H3, t.eduProgram1H4] },
    { ...PROGRAMS_DATA[1], title: t.eduProgram2Title, shortDesc: t.eduProgram2Short, fullDesc: t.eduProgram2Full, audience: t.eduProgram2Audience, badgeText: t.eduProgram2Badge, highlights: [t.eduProgram2H1, t.eduProgram2H2, t.eduProgram2H3, t.eduProgram2H4] },
    { ...PROGRAMS_DATA[2], title: t.eduProgram3Title, shortDesc: t.eduProgram3Short, fullDesc: t.eduProgram3Full, audience: t.eduProgram3Audience, badgeText: t.eduProgram3Badge, highlights: [t.eduProgram3H1, t.eduProgram3H2, t.eduProgram3H3, t.eduProgram3H4] },
    { ...PROGRAMS_DATA[3], title: t.eduProgram4Title, shortDesc: t.eduProgram4Short, fullDesc: t.eduProgram4Full, audience: t.eduProgram4Audience, badgeText: t.eduProgram4Badge, highlights: [t.eduProgram4H1, t.eduProgram4H2, t.eduProgram4H3, t.eduProgram4H4] },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="pt-28 pb-20 md:pt-40 md:pb-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] rounded-full bg-blue-50/50 blur-[60px] md:blur-[80px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <Badge variant="indigo" className="mb-4">{t.eduEyebrow}</Badge>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.05] tracking-[-0.03em] mt-3">
              {t.eduTitle}
            </h1>
            <p className="mt-7 text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl">{t.eduLead}</p>
            <div className="mt-8 flex gap-4">
              <Link to="/get-involved"><Button className="rounded-full px-6">{t.eduModalExplore} <ArrowRight className="h-4 w-4" /></Button></Link>
              <Link to="/contact"><Button variant="secondary" className="rounded-full px-6">Contact Us</Button></Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Programs */}
      <section className="py-32 bg-slate-50">
        <Container>
          <div className="text-center mb-14">
            <ScrollReveal>
              <Badge variant="blue" className="mb-4">Programs</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Our Programs</h2>
            </ScrollReveal>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {programs.map((program, i) => {
              const Icon = ICON_MAP[program.iconName] || BookOpen;
              return (
                <ScrollReveal key={program.id} delay={i * 0.08}>
                  <div className="group rounded-2xl bg-white border border-slate-100 p-7 hover:shadow-[0_20px_60px_-15px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-500 h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors duration-500">
                        <Icon className="h-5 w-5 text-blue-600 group-hover:text-white transition-colors duration-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-serif text-lg font-bold text-slate-900">{program.title}</h3>
                          <Badge variant="indigo" className="text-[10px]">{program.badgeText}</Badge>
                        </div>
                        <p className="text-sm text-slate-400">{program.audience}</p>
                      </div>
                    </div>
                    <p className="text-[15px] text-slate-400 leading-relaxed mb-4">{program.shortDesc}</p>
                    <ul className="space-y-2 mb-5">
                      {program.highlights.slice(0, 3).map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-slate-400">
                          <CheckCircle className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />{h}
                        </li>
                      ))}
                    </ul>
                    <Button variant="ghost" size="sm" className="group/btn" onClick={() => setSelectedProgram(program)}>
                      {t.eduModalExplore} <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Subjects */}
      <section className="py-32 bg-white">
        <Container>
          <div className="text-center mb-14">
            <ScrollReveal>
              <Badge variant="blue" className="mb-4">Curriculum</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Subjects We Cover</h2>
            </ScrollReveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUBJECTS.map((subj, i) => (
              <ScrollReveal key={subj.name} delay={i * 0.08}>
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-7 text-center hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 h-full">
                  <div className="text-4xl mb-4">{subj.icon}</div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">{subj.name}</h3>
                  <p className="text-[15px] text-slate-400 leading-relaxed">{subj.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Schedule */}
      <section className="py-32 bg-slate-50">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <ScrollReveal>
                <Badge variant="indigo" className="mb-4">Schedule</Badge>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">When We Meet</h2>
              </ScrollReveal>
            </div>
            <div className="space-y-4">
              {SCHEDULE.map((s, i) => (
                <ScrollReveal key={s.day} delay={i * 0.1}>
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-slate-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500">
                    <Clock className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">{s.day}</p>
                      <p className="text-sm text-blue-600 font-medium mt-0.5">{s.time}</p>
                      <p className="text-sm text-slate-400 mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal>
              <div className="mt-6 p-5 rounded-2xl bg-blue-50 border border-blue-100">
                <p className="text-sm text-blue-700 flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <strong>Note:</strong> All sessions are completely free. No registration fees or material charges.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900 relative overflow-hidden noise">
        <Container>
          <div className="text-center text-white">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">Ready to Support Education?</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto text-lg">Every child deserves the tools to learn. Help us provide books, stationery, and mentorship.</p>
            <Link to="/get-involved">
              <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8">{t.heroCta1} <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </div>
        </Container>
      </section>

      <Modal isOpen={!!selectedProgram} onClose={() => setSelectedProgram(null)} title={selectedProgram?.title}>
        {selectedProgram && (
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Badge variant="indigo">{selectedProgram.badgeText}</Badge>
              <span className="text-sm text-slate-400">{selectedProgram.audience}</span>
            </div>
            <p className="text-slate-500 leading-relaxed">{selectedProgram.fullDesc}</p>
            <div>
              <h4 className="font-serif font-bold text-slate-900 mb-3">{t.eduModalWhatsIncluded}</h4>
              <ul className="space-y-2">
                {selectedProgram.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-slate-500">
                    <CheckCircle className="h-4 w-4 text-blue-500 shrink-0" />{h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
