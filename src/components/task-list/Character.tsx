/* SVG character illustrations for each evolution stage */

export function SeedCharacter() {
  return (
    <svg viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Ground shadow */}
      <ellipse cx="60" cy="120" rx="28" ry="6" fill="#D4C9B8" opacity="0.5"/>
      {/* Seed body */}
      <ellipse cx="60" cy="85" rx="26" ry="30" fill="#C8A96E"/>
      <ellipse cx="60" cy="85" rx="23" ry="27" fill="#DFC08A"/>
      {/* Seed stripe */}
      <path d="M60 58 C60 58 55 72 55 85 C55 98 60 112 60 112" stroke="#C8A96E" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Sleepy eyes */}
      <path d="M50 80 Q53 77 56 80" stroke="#7A5C30" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M64 80 Q67 77 70 80" stroke="#7A5C30" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Small smile */}
      <path d="M56 88 Q60 91 64 88" stroke="#7A5C30" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* ZZZ */}
      <text x="72" y="68" fontSize="9" fill="#C8A96E" fontWeight="bold">z</text>
      <text x="76" y="62" fontSize="7" fill="#C8A96E" fontWeight="bold">z</text>
    </svg>
  );
}

export function SproutCharacter() {
  return (
    <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="60" cy="130" rx="28" ry="6" fill="#D4C9B8" opacity="0.5"/>
      {/* Stem */}
      <path d="M60 105 L60 75" stroke="#6BBF59" strokeWidth="4" strokeLinecap="round"/>
      {/* Left leaf */}
      <path d="M60 90 C50 82 36 84 34 94 C34 94 46 96 60 90Z" fill="#5DB54A"/>
      {/* Right leaf */}
      <path d="M60 82 C70 74 84 76 86 86 C86 86 74 88 60 82Z" fill="#6BBF59"/>
      {/* Seed body */}
      <ellipse cx="60" cy="112" rx="22" ry="20" fill="#DFC08A"/>
      <ellipse cx="60" cy="112" rx="19" ry="17" fill="#EDD09A"/>
      {/* Eyes - awake now */}
      <circle cx="53" cy="110" r="3" fill="#7A5C30"/>
      <circle cx="67" cy="110" r="3" fill="#7A5C30"/>
      <circle cx="54.5" cy="108.5" r="1" fill="white"/>
      <circle cx="68.5" cy="108.5" r="1" fill="white"/>
      {/* Smile */}
      <path d="M54 116 Q60 120 66 116" stroke="#7A5C30" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* Tiny book */}
      <rect x="68" y="118" width="10" height="8" rx="1.5" fill="#E84F4F"/>
      <rect x="68.5" y="118.5" width="4" height="7" rx="0.5" fill="#F07070"/>
      <line x1="72.5" y1="119" x2="72.5" y2="125.5" stroke="#C04040" strokeWidth="0.5"/>
    </svg>
  );
}

export function StudentCharacter() {
  return (
    <svg viewBox="0 0 130 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="65" cy="142" rx="32" ry="7" fill="#D4C9B8" opacity="0.5"/>
      {/* Body */}
      <rect x="38" y="90" width="54" height="45" rx="16" fill="#5B4FE8"/>
      {/* Collar details */}
      <path d="M53 90 L65 100 L77 90" stroke="#EEF0FF" strokeWidth="2" fill="none"/>
      {/* Arms */}
      <rect x="20" y="92" width="22" height="14" rx="7" fill="#5B4FE8" transform="rotate(-15 20 92)"/>
      <rect x="88" y="92" width="22" height="14" rx="7" fill="#5B4FE8" transform="rotate(15 88 92)"/>
      {/* Hands */}
      <circle cx="18" cy="108" r="7" fill="#F5C5A3"/>
      <circle cx="112" cy="108" r="7" fill="#F5C5A3"/>
      {/* Book in right hand */}
      <rect x="99" y="100" width="20" height="16" rx="2" fill="#FFB800"/>
      <rect x="99.5" y="100.5" width="9" height="15" rx="1" fill="#FFC833"/>
      <line x1="108.5" y1="101" x2="108.5" y2="115.5" stroke="#E8A500" strokeWidth="0.8"/>
      <line x1="101" y1="105" x2="107.5" y2="105" stroke="#E8A500" strokeWidth="0.5"/>
      <line x1="101" y1="108" x2="107.5" y2="108" stroke="#E8A500" strokeWidth="0.5"/>
      {/* Head */}
      <circle cx="65" cy="72" r="30" fill="#F5C5A3"/>
      {/* Hair */}
      <path d="M37 65 Q40 42 65 40 Q90 42 93 65 L90 60 Q80 46 65 45 Q50 46 40 60Z" fill="#3D2E1E"/>
      {/* Eyes */}
      <circle cx="55" cy="70" r="5" fill="#3D2E1E"/>
      <circle cx="75" cy="70" r="5" fill="#3D2E1E"/>
      <circle cx="57" cy="68" r="1.5" fill="white"/>
      <circle cx="77" cy="68" r="1.5" fill="white"/>
      {/* Eyebrows */}
      <path d="M50 63 Q55 60 60 63" stroke="#3D2E1E" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M70 63 Q75 60 80 63" stroke="#3D2E1E" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Nose */}
      <circle cx="65" cy="76" r="1.5" fill="#E8A87C"/>
      {/* Smile */}
      <path d="M57 83 Q65 89 73 83" stroke="#C47A5A" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Blush */}
      <ellipse cx="47" cy="79" rx="5" ry="3" fill="#F9A8A8" opacity="0.5"/>
      <ellipse cx="83" cy="79" rx="5" ry="3" fill="#F9A8A8" opacity="0.5"/>
      {/* Pencil in left hand */}
      <rect x="8" y="102" width="5" height="18" rx="2" fill="#FFD93D" transform="rotate(20 8 102)"/>
      <polygon points="6,119 11,119 8.5,124" fill="#F5C5A3" transform="rotate(20 8 102)"/>
      <rect x="8" y="102" width="5" height="3" rx="1" fill="#E8C030" transform="rotate(20 8 102)"/>
      {/* Legs */}
      <rect x="48" y="130" width="16" height="14" rx="8" fill="#3D2E1E"/>
      <rect x="66" y="130" width="16" height="14" rx="8" fill="#3D2E1E"/>
      {/* Shoes */}
      <ellipse cx="56" cy="143" rx="10" ry="5" fill="#1E1A2E"/>
      <ellipse cx="74" cy="143" rx="10" ry="5" fill="#1E1A2E"/>
    </svg>
  );
}

export function HonorStudentCharacter() {
  return (
    <svg viewBox="0 0 140 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="70" cy="152" rx="34" ry="7" fill="#D4C9B8" opacity="0.5"/>
      {/* Body - blazer */}
      <rect x="40" y="96" width="60" height="48" rx="16" fill="#2D2B8A"/>
      {/* Lapels */}
      <path d="M57 96 L70 108 L83 96 L78 96 L70 104 L62 96Z" fill="#EEF0FF"/>
      {/* Tie */}
      <path d="M70 105 L66 118 L70 122 L74 118Z" fill="#E84F4F"/>
      <rect x="67.5" y="104" width="5" height="5" rx="1" fill="#C04040"/>
      {/* Stack of books - left arm */}
      <rect x="14" y="105" width="28" height="7" rx="2" fill="#E84F4F"/>
      <rect x="14" y="98" width="28" height="7" rx="2" fill="#5B4FE8"/>
      <rect x="14" y="91" width="28" height="7" rx="2" fill="#FFB800"/>
      {/* Arms */}
      <rect x="16" y="96" width="28" height="14" rx="7" fill="#2D2B8A" transform="rotate(-5 16 96)"/>
      <rect x="96" y="96" width="24" height="14" rx="7" fill="#2D2B8A" transform="rotate(20 96 96)"/>
      {/* Right hand raised */}
      <circle cx="124" cy="104" r="8" fill="#F5C5A3"/>
      {/* Pointing finger detail */}
      <rect x="121" y="96" width="6" height="10" rx="3" fill="#F5C5A3"/>
      {/* Head */}
      <circle cx="70" cy="76" r="31" fill="#F5C5A3"/>
      {/* Hair */}
      <path d="M41 70 Q44 46 70 44 Q96 46 99 70 L96 64 Q86 48 70 47 Q54 48 44 64Z" fill="#1E1A2E"/>
      {/* Glasses */}
      <circle cx="59" cy="72" r="9" fill="none" stroke="#3D2E1E" strokeWidth="2"/>
      <circle cx="81" cy="72" r="9" fill="none" stroke="#3D2E1E" strokeWidth="2"/>
      <line x1="68" y1="72" x2="72" y2="72" stroke="#3D2E1E" strokeWidth="2"/>
      <line x1="40" y1="70" x2="50" y2="71" stroke="#3D2E1E" strokeWidth="2"/>
      <line x1="90" y1="71" x2="100" y2="70" stroke="#3D2E1E" strokeWidth="2"/>
      {/* Eyes behind glasses */}
      <circle cx="59" cy="72" r="4" fill="#3D2E1E"/>
      <circle cx="81" cy="72" r="4" fill="#3D2E1E"/>
      <circle cx="60.5" cy="70.5" r="1.2" fill="white"/>
      <circle cx="82.5" cy="70.5" r="1.2" fill="white"/>
      {/* Confident smile */}
      <path d="M61 83 Q70 91 79 83" stroke="#C47A5A" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Blush */}
      <ellipse cx="49" cy="81" rx="6" ry="3.5" fill="#F9A8A8" opacity="0.45"/>
      <ellipse cx="91" cy="81" rx="6" ry="3.5" fill="#F9A8A8" opacity="0.45"/>
      {/* Legs */}
      <rect x="50" y="138" width="18" height="16" rx="9" fill="#1E1A2E"/>
      <rect x="72" y="138" width="18" height="16" rx="9" fill="#1E1A2E"/>
      <ellipse cx="59" cy="153" rx="11" ry="5" fill="#111"/>
      <ellipse cx="81" cy="153" rx="11" ry="5" fill="#111"/>
      {/* Star badge */}
      <text x="88" y="118" fontSize="16">⭐</text>
    </svg>
  );
}

export function ScholarCharacter() {
  return (
    <svg viewBox="0 0 150 170" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Aura glow */}
      <ellipse cx="75" cy="90" rx="55" ry="60" fill="#FFB800" opacity="0.08"/>
      <ellipse cx="75" cy="90" rx="45" ry="50" fill="#FFB800" opacity="0.1"/>
      <ellipse cx="75" cy="160" rx="36" ry="8" fill="#D4C9B8" opacity="0.5"/>
      {/* Robe */}
      <path d="M40 100 L38 152 Q75 156 112 152 L110 100 Q95 110 75 110 Q55 110 40 100Z" fill="#5B4FE8"/>
      {/* Robe details */}
      <path d="M75 108 L69 140 L75 148 L81 140Z" fill="#EEF0FF" opacity="0.6"/>
      <path d="M40 100 L52 148" stroke="#4A3FD6" strokeWidth="1" opacity="0.5"/>
      <path d="M110 100 L98 148" stroke="#4A3FD6" strokeWidth="1" opacity="0.5"/>
      {/* Scroll in right hand */}
      <rect x="100" y="106" width="26" height="20" rx="4" fill="#F5E6C8"/>
      <rect x="100" y="106" width="26" height="4" rx="2" fill="#D4B896"/>
      <rect x="100" y="122" width="26" height="4" rx="2" fill="#D4B896"/>
      <line x1="106" y1="112" x2="120" y2="112" stroke="#C4A070" strokeWidth="0.8"/>
      <line x1="106" y1="115" x2="120" y2="115" stroke="#C4A070" strokeWidth="0.8"/>
      <line x1="106" y1="118" x2="116" y2="118" stroke="#C4A070" strokeWidth="0.8"/>
      {/* Arms */}
      <rect x="16" y="100" width="30" height="14" rx="7" fill="#5B4FE8" transform="rotate(-10 16 100)"/>
      <rect x="100" y="100" width="30" height="14" rx="7" fill="#5B4FE8" transform="rotate(10 100 100)"/>
      <circle cx="22" cy="116" r="8" fill="#F5C5A3"/>
      {/* Head */}
      <circle cx="75" cy="76" r="32" fill="#F5C5A3"/>
      {/* Graduation cap */}
      <rect x="52" y="48" width="46" height="10" rx="3" fill="#1E1A2E"/>
      <path d="M52 48 L75 38 L98 48Z" fill="#1E1A2E"/>
      <rect x="72" y="38" width="6" height="4" rx="2" fill="#1E1A2E"/>
      {/* Tassel */}
      <line x1="98" y1="48" x2="106" y2="60" stroke="#FFB800" strokeWidth="2"/>
      <circle cx="106" cy="62" r="3" fill="#FFB800"/>
      <line x1="104" y1="62" x2="102" y2="72" stroke="#FFB800" strokeWidth="1.5"/>
      <line x1="106" y1="62" x2="106" y2="73" stroke="#FFB800" strokeWidth="1.5"/>
      <line x1="108" y1="62" x2="110" y2="72" stroke="#FFB800" strokeWidth="1.5"/>
      {/* Wise eyes */}
      <circle cx="64" cy="76" r="5" fill="#3D2E1E"/>
      <circle cx="86" cy="76" r="5" fill="#3D2E1E"/>
      <circle cx="65.5" cy="74.5" r="1.5" fill="white"/>
      <circle cx="87.5" cy="74.5" r="1.5" fill="white"/>
      {/* Eyebrows - arched wisely */}
      <path d="M58 68 Q64 64 70 67" stroke="#3D2E1E" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M80 67 Q86 64 92 68" stroke="#3D2E1E" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Warm smile */}
      <path d="M64 87 Q75 95 86 87" stroke="#C47A5A" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Floating stars */}
      <text x="18" y="66" fontSize="14">✨</text>
      <text x="120" y="60" fontSize="12">⭐</text>
      <text x="30" y="88" fontSize="10">✦</text>
      {/* Legs */}
      <rect x="56" y="145" width="18" height="18" rx="9" fill="#2D2B8A"/>
      <rect x="76" y="145" width="18" height="18" rx="9" fill="#2D2B8A"/>
    </svg>
  );
}

export function LegendCharacter() {
  return (
    <svg viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Outer glow rings */}
      <ellipse cx="80" cy="95" rx="70" ry="75" fill="#FFB800" opacity="0.05"/>
      <ellipse cx="80" cy="95" rx="58" ry="62" fill="#FFB800" opacity="0.08"/>
      <ellipse cx="80" cy="95" rx="46" ry="50" fill="#FFB800" opacity="0.12"/>
      <ellipse cx="80" cy="170" rx="38" ry="9" fill="#D4C9B8" opacity="0.5"/>
      {/* Golden robe */}
      <path d="M42 104 L40 158 Q80 164 120 158 L118 104 Q100 118 80 118 Q60 118 42 104Z" fill="#2D2B8A"/>
      {/* Golden trim */}
      <path d="M42 104 L40 158" stroke="#FFB800" strokeWidth="3"/>
      <path d="M118 104 L120 158" stroke="#FFB800" strokeWidth="3"/>
      <path d="M40 158 Q80 164 120 158" stroke="#FFB800" strokeWidth="3"/>
      {/* Robe center line */}
      <path d="M80 116 L74 152 L80 158 L86 152Z" fill="#FFB800" opacity="0.4"/>
      {/* Open book - both hands */}
      <rect x="16" y="116" width="26" height="18" rx="3" fill="#F5E6C8"/>
      <rect x="42" y="116" width="26" height="18" rx="3" fill="#FFFBF0"/>
      <rect x="40" y="114" width="4" height="22" rx="2" fill="#3D2E1E"/>
      <line x1="20" y1="121" x2="38" y2="121" stroke="#C4A070" strokeWidth="0.8"/>
      <line x1="20" y1="124" x2="38" y2="124" stroke="#C4A070" strokeWidth="0.8"/>
      <line x1="20" y1="127" x2="38" y2="127" stroke="#C4A070" strokeWidth="0.8"/>
      <line x1="46" y1="121" x2="64" y2="121" stroke="#C4A070" strokeWidth="0.8"/>
      <line x1="46" y1="124" x2="64" y2="124" stroke="#C4A070" strokeWidth="0.8"/>
      <line x1="46" y1="127" x2="64" y2="127" stroke="#C4A070" strokeWidth="0.8"/>
      {/* Right arm with glowing orb */}
      <rect x="106" y="104" width="30" height="14" rx="7" fill="#2D2B8A" transform="rotate(15 106 104)"/>
      <circle cx="140" cy="114" r="10" fill="#FFB800" opacity="0.3"/>
      <circle cx="140" cy="114" r="7" fill="#FFB800" opacity="0.6"/>
      <circle cx="140" cy="114" r="4" fill="#FFFFFF"/>
      {/* Arms */}
      <rect x="14" y="108" width="32" height="14" rx="7" fill="#2D2B8A" transform="rotate(-8 14 108)"/>
      {/* Head */}
      <circle cx="80" cy="80" r="33" fill="#F5C5A3"/>
      {/* Crown */}
      <path d="M52 54 L58 40 L68 50 L80 36 L92 50 L102 40 L108 54Z" fill="#FFB800"/>
      <path d="M52 54 L108 54 L106 62 L54 62Z" fill="#E8A500"/>
      <circle cx="80" cy="36" r="5" fill="#E84F4F"/>
      <circle cx="58" cy="40" r="4" fill="#5B4FE8"/>
      <circle cx="102" cy="40" r="4" fill="#5B4FE8"/>
      <circle cx="80" cy="54" r="3" fill="#FFFFFF"/>
      <circle cx="65" cy="54" r="2" fill="#FFFFFF"/>
      <circle cx="95" cy="54" r="2" fill="#FFFFFF"/>
      {/* Eyes - glowing */}
      <circle cx="68" cy="80" r="6" fill="#3D2E1E"/>
      <circle cx="92" cy="80" r="6" fill="#3D2E1E"/>
      <circle cx="68" cy="80" r="5" fill="#5B4FE8" opacity="0.4"/>
      <circle cx="92" cy="80" r="5" fill="#5B4FE8" opacity="0.4"/>
      <circle cx="70" cy="78" r="2" fill="white"/>
      <circle cx="94" cy="78" r="2" fill="white"/>
      {/* Powerful brows */}
      <path d="M60 71 Q68 66 76 70" stroke="#3D2E1E" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M84 70 Q92 66 100 71" stroke="#3D2E1E" strokeWidth="3" strokeLinecap="round" fill="none"/>
      {/* Radiant smile */}
      <path d="M68 92 Q80 102 92 92" stroke="#C47A5A" strokeWidth="3" strokeLinecap="round" fill="none"/>
      {/* Floating stars orbiting */}
      <text x="12" y="50" fontSize="16">✨</text>
      <text x="136" y="46" fontSize="14">⭐</text>
      <text x="8" y="90" fontSize="12">✦</text>
      <text x="144" y="90" fontSize="14">✨</text>
      <text x="56" y="178" fontSize="12">⭐</text>
      <text x="90" y="180" fontSize="10">✦</text>
      {/* Legs */}
      <rect x="60" y="150" width="18" height="20" rx="9" fill="#1E1A2E"/>
      <rect x="82" y="150" width="18" height="20" rx="9" fill="#1E1A2E"/>
      <ellipse cx="69" cy="169" rx="12" ry="5" fill="#FFB800" opacity="0.5"/>
      <ellipse cx="91" cy="169" rx="12" ry="5" fill="#FFB800" opacity="0.5"/>
    </svg>
  );
}
