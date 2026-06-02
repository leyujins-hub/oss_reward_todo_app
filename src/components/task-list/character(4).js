interface GiraffeProps {
  level: number;
  dailyStage: number; // 1-5
}

export function GiraffeCharacter({ level, dailyStage }: GiraffeProps) {
  const isHappy = dailyStage >= 3;
  const isExcited = dailyStage >= 4;

  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-md"
    >
      {/* Ground shadow */}
      <ellipse cx="100" cy="234" rx="52" ry="8" fill="#C9B89A" opacity="0.35" />

      {/* Back legs */}
      <rect x="52" y="192" width="22" height="44" rx="11" fill="#E8B835" />
      <rect x="126" y="192" width="22" height="44" rx="11" fill="#E8B835" />
      <ellipse cx="63" cy="236" rx="12" ry="5" fill="#2A1A08" />
      <ellipse cx="137" cy="236" rx="12" ry="5" fill="#2A1A08" />

      {/* Body */}
      <ellipse cx="100" cy="176" rx="56" ry="43" fill="#F9CF47" />

      {/* Body giraffe spots */}
      <path d="M62 160 Q71 151 82 157 Q79 169 68 171Z" fill="#C07828" opacity="0.62" />
      <path d="M90 179 Q100 170 113 175 Q110 189 97 190Z" fill="#C07828" opacity="0.62" />
      <path d="M118 158 Q128 151 136 157 Q134 168 122 168Z" fill="#C07828" opacity="0.6" />
      <path d="M68 186 Q76 179 85 184 Q83 194 72 194Z" fill="#C07828" opacity="0.58" />
      <path d="M110 188 Q117 183 124 187 Q122 196 112 196Z" fill="#C07828" opacity="0.55" />

      {/* Tail */}
      <path
        d="M152 174 C163 168 170 180 162 187"
        stroke="#E8B835"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse
        cx="160"
        cy="188"
        rx="5"
        ry="8"
        fill="#C07828"
        transform="rotate(-15 160 188)"
      />

      {/* Front legs */}
      <rect x="68" y="203" width="22" height="36" rx="11" fill="#F2C240" />
      <rect x="110" y="203" width="22" height="36" rx="11" fill="#F2C240" />
      <ellipse cx="79" cy="239" rx="12" ry="5" fill="#2A1A08" />
      <ellipse cx="121" cy="239" rx="12" ry="5" fill="#2A1A08" />

      {/* Neck */}
      <path
        d="M82 118 Q79 140 80 158 L120 158 Q121 140 118 118Z"
        fill="#F9CF47"
      />
      {/* Neck spots */}
      <ellipse
        cx="88"
        cy="130"
        rx="6"
        ry="10"
        fill="#C07828"
        opacity="0.48"
        transform="rotate(-8 88 130)"
      />
      <ellipse
        cx="112"
        cy="144"
        rx="5"
        ry="9"
        fill="#C07828"
        opacity="0.48"
        transform="rotate(6 112 144)"
      />

      {/* Head base */}
      <ellipse cx="100" cy="81" rx="48" ry="45" fill="#F9CF47" />

      {/* Head spots */}
      <path d="M66 68 Q76 60 84 67 Q82 78 70 78Z" fill="#C07828" opacity="0.48" />
      <path d="M116 66 Q126 58 134 64 Q132 75 120 75Z" fill="#C07828" opacity="0.48" />

      {/* Ossicones */}
      <rect x="74" y="37" width="12" height="28" rx="6" fill="#F0B830" />
      <circle cx="80" cy="37" r="8" fill="#C07828" />
      <rect x="114" y="37" width="12" height="28" rx="6" fill="#F0B830" />
      <circle cx="120" cy="37" r="8" fill="#C07828" />

      {/* Ears */}
      <ellipse
        cx="53"
        cy="72"
        rx="13"
        ry="18"
        fill="#F9CF47"
        transform="rotate(-28 53 72)"
      />
      <ellipse
        cx="53"
        cy="72"
        rx="8"
        ry="12"
        fill="#FFB0C8"
        opacity="0.85"
        transform="rotate(-28 53 72)"
      />
      <ellipse
        cx="147"
        cy="72"
        rx="13"
        ry="18"
        fill="#F9CF47"
        transform="rotate(28 147 72)"
      />
      <ellipse
        cx="147"
        cy="72"
        rx="8"
        ry="12"
        fill="#FFB0C8"
        opacity="0.85"
        transform="rotate(28 147 72)"
      />

      {/* Eyes — big cute */}
      <ellipse cx="80" cy="82" rx="15" ry="17" fill="#2A1E10" />
      <ellipse cx="120" cy="82" rx="15" ry="17" fill="#2A1E10" />
      <ellipse cx="80" cy="83" rx="11" ry="13" fill="#5A3820" />
      <ellipse cx="120" cy="83" rx="11" ry="13" fill="#5A3820" />
      {/* Highlights */}
      <circle cx="85" cy="75" r="5.5" fill="white" />
      <circle cx="125" cy="75" r="5.5" fill="white" />
      <circle cx="86.5" cy="73.5" r="2.5" fill="white" />
      <circle cx="126.5" cy="73.5" r="2.5" fill="white" />

      {/* Eyelashes */}
      <line x1="67" y1="69" x2="71" y2="63" stroke="#2A1E10" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="74" y1="66" x2="77" y2="60" stroke="#2A1E10" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="82" y1="66" x2="85" y2="60" stroke="#2A1E10" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="107" y1="66" x2="110" y2="60" stroke="#2A1E10" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="115" y1="66" x2="118" y2="60" stroke="#2A1E10" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="122" y1="69" x2="126" y2="63" stroke="#2A1E10" strokeWidth="1.8" strokeLinecap="round" />

      {/* Snout */}
      <ellipse cx="100" cy="100" rx="19" ry="14" fill="#F0B830" />
      <ellipse cx="93" cy="101" rx="3.5" ry="3" fill="#C07828" />
      <ellipse cx="107" cy="101" rx="3.5" ry="3" fill="#C07828" />

      {/* Mouth — changes with dailyStage */}
      {isHappy ? (
        <path
          d="M88 108 Q100 117 112 108"
          stroke="#C07828"
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
        />
      ) : (
        <path
          d="M90 110 Q100 114 110 110"
          stroke="#C07828"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      )}

      {/* Blush — stronger when excited */}
      <ellipse cx="60" cy="92" rx="10" ry="6" fill="#FFB0C0" opacity={isHappy ? 0.65 : 0.38} />
      <ellipse cx="140" cy="92" rx="10" ry="6" fill="#FFB0C0" opacity={isHappy ? 0.65 : 0.38} />

      {/* LEVEL ACCESSORIES */}
      {level >= 2 && (
        /* Lv2: small sparkle near eye */
        <>
          <text x="136" y="58" fontSize="16">✨</text>
        </>
      )}

      {level >= 3 && (
        /* Lv3: cute bow on left ossicone */
        <>
          <path d="M63 34 Q68 28 74 34 Q68 40 63 34Z" fill="#E84F4F" />
          <path d="M74 34 Q80 28 86 34 Q80 40 74 34Z" fill="#E84F4F" />
          <circle cx="74" cy="34" r="4" fill="#FF7070" />
        </>
      )}

      {level >= 4 && (
        /* Lv4: small golden crown */
        <>
          <path
            d="M72 40 L76 26 L84 34 L92 22 L100 34 L108 22 L116 34 L124 26 L128 40Z"
            fill="#FFB800"
          />
          <path d="M72 40 L128 40 L126 46 L74 46Z" fill="#E8A500" />
          <circle cx="92" cy="22" r="4" fill="#E84F4F" />
          <circle cx="108" cy="22" r="4" fill="#5B4FE8" />
          <circle cx="100" cy="34" r="3" fill="white" />
        </>
      )}

      {level >= 5 && (
        /* Lv5: rainbow glow + stars */
        <>
          <text x="14" y="50" fontSize="18">⭐</text>
          <text x="158" y="44" fontSize="16">✨</text>
          <text x="20" y="96" fontSize="12">✦</text>
          <text x="164" y="100" fontSize="14">⭐</text>
        </>
      )}

      {/* Excited stars when stage 5 */}
      {isExcited && (
        <>
          <text x="148" y="116" fontSize="12">✨</text>
          <text x="36" y="110" fontSize="10">✦</text>
        </>
      )}
    </svg>
  );
}
