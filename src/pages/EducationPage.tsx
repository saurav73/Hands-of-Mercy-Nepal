import { useState } from 'react';
import { BookOpen, PenTool, HeartHandshake, Users, ArrowRight, CheckCircle, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Modal } from '@/components/ui/Modal';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { PROGRAMS_DATA } from '@/data/organizationData';
import { useLang } from '@/contexts/LanguageContext';
import { Classroom3D } from '@/components/three/Classroom3D';
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
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs tracking-widest uppercase text-faint mb-6">{t.eduEyebrow}</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
                {t.eduTitle}
              </h1>
              <p className="mt-7 text-lg text-muted leading-relaxed max-w-xl">{t.eduLead}</p>
              <div className="mt-8 flex gap-4">
                <Link to="/get-involved">
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-white text-sm font-medium rounded-full hover:bg-ink/90 transition-all">
                    {t.eduModalExplore} <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full border border-line hover:bg-bg transition-all">Contact Us</button>
                </Link>
              </div>
            </div>
            <div className="h-[300px] md:h-[400px]">
              <Classroom3D />
            </div>
          </div>
        </Container>
      </section>

      {/* Programs */}
      <section className="py-24 bg-bg rounded-4xl mx-4 my-8">
        <Container>
          <div className="text-center mb-14">
            <ScrollReveal>
              <p className="text-xs tracking-widest uppercase text-faint mb-4">Programs</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">Our Programs</h2>
            </ScrollReveal>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {programs.map((program, i) => {
              const Icon = ICON_MAP[program.iconName] || BookOpen;
              return (
                <ScrollReveal key={program.id} delay={i * 0.08}>
                  <div className="group bg-white rounded-3xl border border-line p-7 hover:shadow-card transition-all duration-300 h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-11 h-11 rounded-2xl bg-bg flex items-center justify-center shrink-0 group-hover:bg-ink group-hover:text-white transition-all">
                        <Icon className="h-5 w-5 text-ink group-hover:text-white transition-all" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="text-lg font-semibold text-ink">{program.title}</h3>
                          <span className="text-[10px] font-bold text-faint bg-bg px-2 py-0.5 rounded-full">{program.badgeText}</span>
                        </div>
                        <p className="text-sm text-muted">{program.audience}</p>
                      </div>
                    </div>
                    <p className="text-[15px] text-muted leading-relaxed mb-4">{program.shortDesc}</p>
                    <ul className="space-y-2 mb-5">
                      {program.highlights.slice(0, 3).map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-muted">
                          <CheckCircle className="h-4 w-4 text-faint shrink-0 mt-0.5" />{h}
                        </li>
                      ))}
                    </ul>
                    <button className="text-sm font-medium text-ink hover:gap-2 inline-flex items-center gap-1 transition-all" onClick={() => setSelectedProgram(program)}>
                      {t.eduModalExplore} <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Subjects */}
      <section className="py-32">
        <Container>
          <div className="text-center mb-14">
            <ScrollReveal>
              <p className="text-xs tracking-widest uppercase text-faint mb-4">Curriculum</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">Subjects We Cover</h2>
            </ScrollReveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SUBJECTS.map((subj, i) => (
              <ScrollReveal key={subj.name} delay={i * 0.08}>
                <div className="bg-bg rounded-3xl border border-line p-7 text-center hover:shadow-card transition-all duration-300 h-full">
                  <div className="text-4xl mb-4">{subj.icon}</div>
                  <h3 className="text-lg font-semibold text-ink mb-2">{subj.name}</h3>
                  <p className="text-[15px] text-muted leading-relaxed">{subj.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Schedule */}
      <section className="py-24 bg-bg rounded-4xl mx-4 my-8">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <ScrollReveal>
                <p className="text-xs tracking-widest uppercase text-faint mb-4">Schedule</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">When We Meet</h2>
              </ScrollReveal>
            </div>
            <div className="space-y-3">
              {SCHEDULE.map((s, i) => (
                <ScrollReveal key={s.day} delay={i * 0.1}>
                  <div className="flex items-start gap-4 p-6 rounded-3xl bg-white border border-line hover:shadow-card transition-all duration-300">
                    <Clock className="h-5 w-5 text-faint shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-ink">{s.day}</p>
                      <p className="text-sm text-ink font-medium mt-0.5">{s.time}</p>
                      <p className="text-sm text-muted mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal>
              <div className="mt-4 p-5 rounded-3xl bg-white border border-line">
                <p className="text-sm text-muted flex items-center gap-2">
                  <Star className="h-4 w-4 text-faint" />
                  <strong>Note:</strong> All sessions are completely free. No registration fees or material charges.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 tracking-tight">Ready to Support Education?</h2>
            <p className="text-muted mb-8 max-w-xl mx-auto text-lg">Every child deserves the tools to learn. Help us provide books, stationery, and mentorship.</p>
            <Link to="/get-involved">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-ink text-white text-sm font-medium rounded-full hover:bg-ink/90 transition-all">
                {t.heroCta1} <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </Container>
      </section>

      <Modal isOpen={!!selectedProgram} onClose={() => setSelectedProgram(null)} title={selectedProgram?.title}>
        {selectedProgram && (
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-faint bg-bg px-2 py-0.5 rounded-full">{selectedProgram.badgeText}</span>
              <span className="text-sm text-muted">{selectedProgram.audience}</span>
            </div>
            <p className="text-muted leading-relaxed">{selectedProgram.fullDesc}</p>
            <div>
              <h4 className="font-semibold text-ink mb-3">{t.eduModalWhatsIncluded}</h4>
              <ul className="space-y-2">
                {selectedProgram.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-muted">
                    <CheckCircle className="h-4 w-4 text-faint shrink-0" />{h}
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
