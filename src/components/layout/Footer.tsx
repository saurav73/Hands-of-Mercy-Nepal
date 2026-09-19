import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, ArrowUpRight, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Logo } from '@/components/branding/Logo';
import { Container } from '@/components/ui/Container';
import { useLang } from '@/contexts/LanguageContext';
import { ORG_INFO } from '@/data/organizationData';

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Education', to: '/education' },
  { label: 'Impact', to: '/impact' },
  { label: 'Stories', to: '/stories' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Get Involved', to: '/get-involved' },
  { label: 'Contact', to: '/contact' },
];

const LEGAL = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
];

const SOCIAL = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
];

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-slate-900 text-slate-400 relative overflow-hidden">
      <div className="absolute inset-0 noise" />
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[150px]" />
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[100px]" />
      </div>
      <Container className="relative z-10">
        <div className="py-16 md:py-20">
          {/* Top section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            {/* Brand column */}
            <div className="lg:col-span-4">
              <Logo size="sm" />
              <p className="mt-5 text-sm leading-relaxed text-slate-500 max-w-sm">{t.footerMission}</p>
              <div className="flex gap-3 mt-6">
                {SOCIAL.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-3">
              <h4 className="font-semibold text-white text-sm mb-5">{t.footerQuickLinks}</h4>
              <ul className="space-y-3">
                {LINKS.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="group text-sm text-slate-500 hover:text-white transition-colors flex items-center gap-1.5">
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-3">
              <h4 className="font-semibold text-white text-sm mb-5">Contact</h4>
              <div className="flex flex-col gap-4">
                <a href={`mailto:${ORG_INFO.contact.email}`} className="flex items-center gap-3 text-sm text-slate-500 hover:text-white transition-colors group">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span>{ORG_INFO.contact.email}</span>
                </a>
                <a href={`tel:${ORG_INFO.contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-sm text-slate-500 hover:text-white transition-colors group">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span>{ORG_INFO.contact.phone}</span>
                </a>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(ORG_INFO.location.fullAddress)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-slate-500 hover:text-white transition-colors group">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span>{ORG_INFO.location.town}, {ORG_INFO.location.district}</span>
                </a>
              </div>
            </div>

            {/* Legal & Info */}
            <div className="lg:col-span-2">
              <h4 className="font-semibold text-white text-sm mb-5">Legal</h4>
              <ul className="space-y-3 mb-8">
                {LEGAL.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="group text-sm text-slate-500 hover:text-white transition-colors flex items-center gap-1.5">
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Non-profit initiative in partnership with {ORG_INFO.fellowship}.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600">&copy; {new Date().getFullYear()} {ORG_INFO.name}. All rights reserved.</p>
            <p className="flex items-center gap-1.5 text-xs text-slate-600">
              Made with <Heart className="h-3 w-3 text-red-500 fill-current" /> for the children of Nepal
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
