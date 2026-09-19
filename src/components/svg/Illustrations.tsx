export function MercyHandSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Open palm reaching up */}
      <defs>
        <linearGradient id="handGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="glowGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Glow behind hand */}
      <circle cx="100" cy="110" r="60" fill="url(#glowGrad)" />
      {/* Palm */}
      <path d="M80 140 C60 140 50 120 55 100 C58 88 65 82 75 80 L75 60 C75 55 80 52 85 55 L85 80 L90 50 C90 45 95 42 100 45 L100 80 L105 48 C105 43 110 40 115 43 L115 80 L120 55 C120 50 125 47 130 50 L125 80 C135 85 140 100 135 120 C130 138 115 145 100 145 C85 145 80 140 80 140Z" fill="url(#handGrad)" />
      {/* Light rays from palm */}
      <line x1="100" y1="95" x2="100" y2="60" stroke="#93C5FD" strokeWidth="1.5" opacity="0.5" />
      <line x1="100" y1="95" x2="75" y2="65" stroke="#93C5FD" strokeWidth="1.5" opacity="0.4" />
      <line x1="100" y1="95" x2="125" y2="65" stroke="#93C5FD" strokeWidth="1.5" opacity="0.4" />
      <line x1="100" y1="95" x2="85" y2="55" stroke="#93C5FD" strokeWidth="1" opacity="0.3" />
      <line x1="100" y1="95" x2="115" y2="55" stroke="#93C5FD" strokeWidth="1" opacity="0.3" />
      {/* Small heart */}
      <path d="M95 70 C95 67 92 65 90 67 C88 65 85 67 85 70 C85 74 90 77 90 77 C90 77 95 74 95 70Z" fill="#818CF8" opacity="0.8" />
      {/* Sparkles */}
      <circle cx="70" cy="70" r="2" fill="#60A5FA" opacity="0.6" />
      <circle cx="130" cy="70" r="2" fill="#60A5FA" opacity="0.6" />
      <circle cx="100" cy="50" r="1.5" fill="#818CF8" opacity="0.5" />
    </svg>
  );
}

export function BookSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="bookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      {/* Open book */}
      <path d="M30 50 L100 60 L170 50 L170 150 L100 140 L30 150Z" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" />
      <line x1="100" y1="60" x2="100" y2="140" stroke="#CBD5E1" strokeWidth="1.5" />
      {/* Left page lines */}
      <line x1="45" y1="75" x2="90" y2="80" stroke="#CBD5E1" strokeWidth="1" />
      <line x1="45" y1="90" x2="90" y2="95" stroke="#CBD5E1" strokeWidth="1" />
      <line x1="45" y1="105" x2="90" y2="110" stroke="#CBD5E1" strokeWidth="1" />
      <line x1="45" y1="120" x2="75" y2="123" stroke="#CBD5E1" strokeWidth="1" />
      {/* Right page lines */}
      <line x1="110" y1="80" x2="155" y2="75" stroke="#CBD5E1" strokeWidth="1" />
      <line x1="110" y1="95" x2="155" y2="90" stroke="#CBD5E1" strokeWidth="1" />
      <line x1="110" y1="110" x2="155" y2="105" stroke="#CBD5E1" strokeWidth="1" />
      <line x1="110" y1="125" x2="140" y2="122" stroke="#CBD5E1" strokeWidth="1" />
      {/* Sparkle */}
      <circle cx="100" cy="35" r="3" fill="url(#bookGrad)" opacity="0.6" />
      <path d="M100 25 L102 32 L109 32 L103 36 L105 43 L100 38 L95 43 L97 36 L91 32 L98 32Z" fill="#60A5FA" opacity="0.4" />
    </svg>
  );
}

export function ChildrenSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="childGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      {/* Child 1 - left */}
      <circle cx="70" cy="80" r="18" fill="url(#childGrad)" />
      <circle cx="70" cy="80" r="16" fill="#EFF6FF" />
      <circle cx="65" cy="78" r="2" fill="#3B82F6" />
      <circle cx="75" cy="78" r="2" fill="#3B82F6" />
      <path d="M65 85 Q70 90 75 85" stroke="#3B82F6" strokeWidth="1.5" fill="none" />
      <rect x="58" y="100" width="24" height="35" rx="8" fill="url(#childGrad)" />

      {/* Child 2 - right */}
      <circle cx="130" cy="80" r="18" fill="#6366F1" />
      <circle cx="130" cy="80" r="16" fill="#EEF2FF" />
      <circle cx="125" cy="78" r="2" fill="#6366F1" />
      <circle cx="135" cy="78" r="2" fill="#6366F1" />
      <path d="M125 85 Q130 90 135 85" stroke="#6366F1" strokeWidth="1.5" fill="none" />
      <rect x="118" y="100" width="24" height="35" rx="8" fill="#6366F1" />

      {/* Hand holding hands in between */}
      <path d="M82 118 Q100 112 118 118" stroke="#93C5FD" strokeWidth="2" fill="none" />

      {/* Hearts above */}
      <path d="M95 50 C95 46 90 43 87 46 C84 43 79 46 79 50 C79 55 87 60 87 60 C87 60 95 55 95 50Z" fill="#F472B6" opacity="0.6" />
      <path d="M115 45 C115 42 111 40 109 42 C107 40 103 42 103 45 C103 49 109 52 109 52 C109 52 115 49 115 45Z" fill="#F472B6" opacity="0.4" />
    </svg>
  );
}

export function CommunitySvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="commGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>
      </defs>
      {/* Church/community building */}
      <rect x="70" y="90" width="60" height="70" rx="4" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" />
      <polygon points="100,50 60,90 140,90" fill="url(#commGrad)" />
      {/* Cross */}
      <rect x="97" y="55" width="6" height="20" rx="2" fill="white" />
      <rect x="92" y="62" width="16" height="6" rx="2" fill="white" />
      {/* Door */}
      <rect x="90" y="120" width="20" height="40" rx="10" fill="#3B82F6" />
      {/* Windows */}
      <rect x="75" y="100" width="12" height="12" rx="2" fill="#60A5FA" opacity="0.6" />
      <rect x="113" y="100" width="12" height="12" rx="2" fill="#60A5FA" opacity="0.6" />
      {/* People around */}
      <circle cx="45" cy="140" r="8" fill="#60A5FA" />
      <circle cx="45" cy="140" r="7" fill="#EFF6FF" />
      <rect x="38" y="150" width="14" height="18" rx="5" fill="#60A5FA" />
      <circle cx="155" cy="140" r="8" fill="#818CF8" />
      <circle cx="155" cy="140" r="7" fill="#EEF2FF" />
      <rect x="148" y="150" width="14" height="18" rx="5" fill="#818CF8" />
      <circle cx="55" cy="165" r="6" fill="#60A5FA" opacity="0.5" />
      <circle cx="145" cy="165" r="6" fill="#818CF8" opacity="0.5" />
    </svg>
  );
}

export function HeartHandSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="heartGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      {/* Two hands cupping a heart */}
      <path d="M50 110 C40 100 35 85 45 75 C55 65 65 70 70 80" stroke="#60A5FA" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M150 110 C160 100 165 85 155 75 C145 65 135 70 130 80" stroke="#60A5FA" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* Heart in center */}
      <path d="M100 140 C100 140 70 115 70 90 C70 75 80 70 90 75 C95 78 100 85 100 85 C100 85 105 78 110 75 C120 70 130 75 130 90 C130 115 100 140 100 140Z" fill="url(#heartGrad)" />
      {/* Glow */}
      <circle cx="100" cy="100" r="50" fill="#F472B6" opacity="0.1" />
      {/* Sparkles */}
      <circle cx="80" cy="70" r="2" fill="#F472B6" opacity="0.5" />
      <circle cx="120" cy="70" r="2" fill="#F472B6" opacity="0.5" />
      <circle cx="100" cy="55" r="1.5" fill="#EC4899" opacity="0.4" />
    </svg>
  );
}

export function GraduationSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="gradCap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      {/* Graduation cap */}
      <polygon points="100,40 30,75 100,110 170,75" fill="url(#gradCap)" />
      <rect x="90" y="75" width="20" height="30" fill="#1E40AF" />
      {/* Tassel */}
      <line x1="155" y1="75" x2="165" y2="100" stroke="#F59E0B" strokeWidth="2" />
      <circle cx="165" cy="105" r="4" fill="#F59E0B" />
      <line x1="165" y1="109" x2="162" y2="125" stroke="#F59E0B" strokeWidth="1.5" />
      <line x1="165" y1="109" x2="168" y2="125" stroke="#F59E0B" strokeWidth="1.5" />
      <line x1="165" y1="109" x2="165" y2="125" stroke="#F59E0B" strokeWidth="1.5" />
      {/* Book below */}
      <rect x="75" y="130" width="50" height="35" rx="3" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" />
      <line x1="100" y1="130" x2="100" y2="165" stroke="#CBD5E1" strokeWidth="1" />
      <line x1="82" y1="140" x2="96" y2="140" stroke="#CBD5E1" strokeWidth="0.8" />
      <line x1="82" y1="148" x2="96" y2="148" stroke="#CBD5E1" strokeWidth="0.8" />
      <line x1="104" y1="140" x2="118" y2="140" stroke="#CBD5E1" strokeWidth="0.8" />
      <line x1="104" y1="148" x2="118" y2="148" stroke="#CBD5E1" strokeWidth="0.8" />
    </svg>
  );
}
