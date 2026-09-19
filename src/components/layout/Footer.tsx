import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
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

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-slate-900 text-slate-400 relative overflow-hidden noise">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[120px]" />
      </div>
      <Container className="relative z-10">
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Logo size="sm" />
            <p className="mt-4 text-sm leading-relaxed text-slate-500 max-w-sm">{t.footerMission}</p>
            <div className="flex flex-col gap-2.5 mt-6">
              <a href={`mailto:${ORG_INFO.contact.email}`} className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors">
                <Mail className="h-4 w-4" /> {ORG_INFO.contact.email}
              </a>
              <a href={`tel:${ORG_INFO.contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors">
                <Phone className="h-4 w-4" /> {ORG_INFO.contact.phone}
              </a>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(ORG_INFO.location.fullAddress)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors">
                <MapPin className="h-4 w-4" /> {ORG_INFO.location.town}, {ORG_INFO.location.district}
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4">{t.footerQuickLinks}</h4>
            <ul className="space-y-2.5">
              {LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-slate-500 hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {LEGAL.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-slate-500 hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Connect</h4>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              Follow our journey and see the impact your generosity creates in the lives of children in Bungamati.
            </p>
            <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-4">
              <p className="text-xs text-slate-500 leading-relaxed">
                Registered as a non-profit initiative operating in partnership with {ORG_INFO.fellowship}.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">&copy; {new Date().getFullYear()} {ORG_INFO.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-xs text-slate-600">
            Made with <Heart className="h-3 w-3 text-red-500 fill-current" /> for the children of Nepal
          </p>
        </div>
      </Container>
    </footer>
  );
}
