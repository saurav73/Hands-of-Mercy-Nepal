import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLang } from '@/contexts/LanguageContext';
import { ORG_INFO } from '@/data/organizationData';

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
    <div>
      {/* Hero */}
      <section className="pt-28 pb-20 md:pt-40 md:pb-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] rounded-full bg-blue-50/50 blur-[60px] md:blur-[80px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <Badge variant="indigo" className="mb-4">{t.contactEyebrow}</Badge>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.05] tracking-[-0.03em] mt-3">
              {t.contactTitle}
            </h1>
            <p className="mt-7 text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl">{t.contactLead}</p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-32 bg-slate-50">
        <Container>
          <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-4">
              {INFO.map((item, i) => (
                <ScrollReveal key={item.label} delay={i * 0.08}>
                  <div className="rounded-2xl bg-white border border-slate-100 p-5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <item.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-900 hover:text-blue-600 transition-colors">{item.value}</a>
                        ) : (
                          <p className="text-sm font-medium text-slate-900">{item.value}</p>
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
                <div className="rounded-2xl bg-white border border-slate-100 p-8">
                  <h2 className="font-serif text-2xl font-bold text-slate-900 mb-1">Send Us a Message</h2>
                  <p className="text-sm text-slate-400 mb-6">We'll respond within 24 hours.</p>
                  {sent ? (
                    <div className="py-16 text-center">
                      <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-7 w-7 text-blue-600" />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">Message Sent</h3>
                      <p className="text-sm text-slate-400">Thank you for reaching out. We'll be in touch soon.</p>
                      <button onClick={() => setSent(false)} className="mt-5 text-sm font-medium text-blue-600 hover:underline">Send another message</button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1.5">{t.contactName}</label>
                          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${errors.name ? 'border-red-300 bg-red-50/50' : 'border-slate-200 bg-slate-50 focus:border-blue-500 focus:bg-white'}`}
                            placeholder="Your name" />
                          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1.5">{t.contactEmail}</label>
                          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${errors.email ? 'border-red-300 bg-red-50/50' : 'border-slate-200 bg-slate-50 focus:border-blue-500 focus:bg-white'}`}
                            placeholder="you@example.com" />
                          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">Subject</label>
                        <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-blue-500 focus:bg-white transition-colors">
                          <option value="general">General Inquiry</option>
                          <option value="donate">Donation</option>
                          <option value="volunteer">Volunteering</option>
                          <option value="partner">Partnership</option>
                          <option value="visit">Visit Request</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">{t.contactMessage}</label>
                        <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors resize-none ${errors.message ? 'border-red-300 bg-red-50/50' : 'border-slate-200 bg-slate-50 focus:border-blue-500 focus:bg-white'}`}
                          placeholder="How can we help?" />
                        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                      </div>
                      <Button type="submit" className="w-full rounded-xl py-3.5" disabled={sending}>
                        {sending ? 'Sending...' : t.contactSend} <ArrowRight className="h-4 w-4" />
                      </Button>
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
