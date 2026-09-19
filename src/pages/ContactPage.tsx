import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLang } from '@/contexts/LanguageContext';
import { ORG_INFO } from '@/data/organizationData';
import { Contact3D } from '@/components/three/Contact3D';

const INFO = [
  { icon: Mail, label: 'Email', value: ORG_INFO.contact.email, href: `mailto:${ORG_INFO.contact.email}` },
  { icon: Phone, label: 'Phone', value: ORG_INFO.contact.phone, href: `tel:${ORG_INFO.contact.phone.replace(/\s/g, '')}` },
  { icon: MapPin, label: 'Location', value: ORG_INFO.location.fullAddress, href: `https://maps.google.com/?q=${encodeURIComponent(ORG_INFO.location.fullAddress)}` },
  { icon: Clock, label: 'Program Hours', value: 'Sunday - Thursday, 4:00 PM - 6:00 PM', href: null },
];

export function ContactPage() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: '', email: '', subject: 'general', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Min 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); setForm({ name: '', email: '', subject: 'general', message: '' }); }, 1500);
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs tracking-widest uppercase text-faint mb-6">{t.contactEyebrow}</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
                {t.contactTitle}
              </h1>
              <p className="mt-7 text-lg text-muted leading-relaxed max-w-2xl">{t.contactLead}</p>
            </div>
            <div className="h-[300px] md:h-[400px]">
              <Contact3D />
            </div>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-24 bg-bg rounded-4xl mx-4 my-8">
        <Container>
          <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-3">
              {INFO.map((item, i) => (
                <ScrollReveal key={item.label} delay={i * 0.08}>
                  <div className="rounded-3xl bg-white border border-line p-5 hover:shadow-card transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-bg flex items-center justify-center shrink-0">
                        <item.icon className="h-5 w-5 text-ink" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-faint uppercase tracking-wider mb-0.5">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-ink hover:text-muted transition-colors">{item.value}</a>
                        ) : (
                          <p className="text-sm font-medium text-ink">{item.value}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                <div className="rounded-3xl bg-white border border-line p-8">
                  <h2 className="text-2xl font-semibold text-ink mb-1">Send Us a Message</h2>
                  <p className="text-sm text-muted mb-6">We'll respond within 24 hours.</p>
                  {sent ? (
                    <div className="py-16 text-center">
                      <div className="w-14 h-14 rounded-full bg-bg flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-7 w-7 text-ink" />
                      </div>
                      <h3 className="text-xl font-semibold text-ink mb-2">Message Sent</h3>
                      <p className="text-sm text-muted">Thank you for reaching out. We'll be in touch soon.</p>
                      <button onClick={() => setSent(false)} className="mt-5 text-sm font-medium text-ink hover:underline">Send another message</button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-faint mb-1.5">{t.contactName}</label>
                          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className={`w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-colors ${errors.name ? 'border-red-300 bg-red-50/50' : 'border-line bg-bg focus:border-ink focus:bg-white'}`}
                            placeholder="Your name" />
                          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-faint mb-1.5">{t.contactEmail}</label>
                          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className={`w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-colors ${errors.email ? 'border-red-300 bg-red-50/50' : 'border-line bg-bg focus:border-ink focus:bg-white'}`}
                            placeholder="you@example.com" />
                          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-faint mb-1.5">Subject</label>
                        <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl border border-line bg-bg text-sm outline-none focus:border-ink focus:bg-white transition-colors">
                          <option value="general">General Inquiry</option>
                          <option value="donate">Donation</option>
                          <option value="volunteer">Volunteering</option>
                          <option value="partner">Partnership</option>
                          <option value="visit">Visit Request</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-faint mb-1.5">{t.contactMessage}</label>
                        <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className={`w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-colors resize-none ${errors.message ? 'border-red-300 bg-red-50/50' : 'border-line bg-bg focus:border-ink focus:bg-white'}`}
                          placeholder="How can we help?" />
                        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                      </div>
                      <button type="submit" className="w-full rounded-full py-3.5 bg-ink text-white text-sm font-medium hover:bg-ink/90 transition-all inline-flex items-center justify-center gap-2" disabled={sending}>
                        {sending ? 'Sending...' : t.contactSend} <ArrowRight className="h-4 w-4" />
                      </button>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
