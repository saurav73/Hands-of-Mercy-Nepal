import { createContext, useContext, useState, type ReactNode } from 'react';
import { translations, type Lang } from '@/data/translations';

type Translations = typeof translations.en;

interface LanguageContextType {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const toggleLang = () => setLang((prev) => (prev === 'en' ? 'ne' : 'en'));

  const value: LanguageContextType = {
    lang,
    t: translations[lang] as Translations,
    toggleLang,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
