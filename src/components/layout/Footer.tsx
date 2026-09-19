import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from '@/components/branding/Logo';
import { Container } from '@/components/ui/Container';
import { useLang } from '@/contexts/LanguageContext';
import { ORG_INFO } from '@/data/organizationData';

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Education', to: '/education' },
  { label: 'Impact', to: '/impact' },
  { label: 'Stories', to: '/stories' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Get Involved', to: '/get-involved' },
  { label: 'Contact', to: '/contact' },
];

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-line">
      <Container>
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Logo size="sm" />
            <p className="mt-4 text-sm text-muted leading-relaxed max-w-xs">{t.footerMission}</p>
            <div className="flex flex-col gap-3 mt-6">
              <a href={`mailto:${ORG_INFO.contact.email}`} className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors">
                <Mail className="h-4 w-4" /> {ORG_INFO.contact.email}
              </a>
              <a href={`tel:${ORG_INFO.contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors">
                <Phone className="h-4 w-4" /> {ORG_INFO.contact.phone}
              </a>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(ORG_INFO.location.fullAddress)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors">
                <MapPin className="h-4 w-4" /> {ORG_INFO.location.town}
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase text-faint mb-4">Navigate</h4>
            <ul className="space-y-2.5">
              {LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-muted hover:text-ink transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase text-faint mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li><Link to="/privacy" className="text-sm text-muted hover:text-ink transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-muted hover:text-ink transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase text-faint mb-4">About</h4>
            <p className="text-sm text-muted leading-relaxed">
              A non-profit initiative in partnership with {ORG_INFO.fellowship}, providing free education to children in Bungamati.
            </p>
          </div>
        </div>

        <div className="border-t border-line py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-faint">&copy; {new Date().getFullYear()} {ORG_INFO.name}</p>
          <p className="flex items-center gap-1.5 text-xs text-faint">
            Made with <Heart className="h-3 w-3 text-red-400 fill-current" /> for Nepal
          </p>
        </div>
      </Container>
    </footer>
  );
}
