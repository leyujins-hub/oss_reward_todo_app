import { motion, AnimatePresence } from "motion/react";
import { Zap, Star } from "lucide-react";
import { GiraffeCharacter } from "./GiraffeCharacter";

interface CharacterHeaderProps {
  exp: number;
  todos: Array<{ status: string }>;
  expGainId: string | null; // triggers +10 animation
}

const LEVELS = [
  { level: 1, name: "꼬마 기린", minExp: 0, maxExp: 50, color: "#6BBF59" },
  { level: 2, name: "장난꾸러기 기린", minExp: 50, maxExp: 100, color: "#5B4FE8" },
  { level: 3, name: "씩씩한 기린", minExp: 100, maxExp: 150, color: "#FF9500" },
  { level: 4, name: "현명한 기린", minExp: 150, maxExp: 200, color: "#E84F4F" },
  { level: 5, name: "전설의 기린", minExp: 200, maxExp: 200, color: "#FFB800" },
] as const;

const STAGE_LABELS = ["시작!", "분발중", "절반!", "거의다!", "완료!"];

export function CharacterHeader({ exp, todos, expGainId }: CharacterHeaderProps) {
  const currentLevel = [...LEVELS].reverse().find((l) => exp >= l.minExp) ?? LEVELS[0];
  const nextLevel = LEVELS.find((l) => l.level === currentLevel.level + 1);

  const expInLevel = exp - currentLevel.minExp;
  const expNeeded = nextLevel ? nextLevel.minExp - currentLevel.minExp : 50;
  const expPct = currentLevel.level === 5 ? 100 : Math.min((expInLevel / expNeeded) * 100, 100);

  const total = todos.length;
  const done = todos.filter((t) => t.status === "완료").length;
  const progressPct = total === 0 ? 0 : Math.round((done / total) * 100);
  const dailyStage = total === 0 ? 0 : Math.min(Math.ceil(progressPct / 20), 5);

  const stageColors = [
    "#E2E0FF",
    "#A5B4FC",
    "#818CF8",
    "#6366F1",
    "#4F46E5",
  ];

  return (
    <div
      className="relative mb-8 overflow-hidden rounded-3xl"
      style={{
        background: `linear-gradient(135deg, #FFFBEC 0%, #FFF3CC 40%, #EEF0FF 100%)`,
        border: `2px solid ${currentLevel.color}30`,
        boxShadow: `0 4px 24px ${currentLevel.color}18`,
      }}
    >
      {/* Decorative background circles */}
      <div
        className="absolute -right-8 -top-8 h-40 w-40 rounded-full opacity-10"
        style={{ backgroundColor: currentLevel.color }}
      />
      <div
        className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full opacity-8"
        style={{ backgroundColor: currentLevel.color }}
      />

      <div className="relative flex flex-col items-center gap-6 p-6 sm:flex-row">
        {/* Giraffe */}
        <div className="relative shrink-0">
          <motion.div
            key={currentLevel.level}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 16 }}
            className="character-safe-area flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden md:h-36 md:w-36"
          >
            <GiraffeCharacter level={currentLevel.level} dailyStage={dailyStage} />
          </motion.div>

          {/* +10 EXP popup */}
          <AnimatePresence>
            {expGainId && (
              <motion.div
                key={expGainId}
                initial={{ opacity: 0, y: 0, scale: 0.7 }}
                animate={{ opacity: 1, y: -40, scale: 1 }}
                exit={{ opacity: 0, y: -70 }}
                transition={{ duration: 0.7 }}
                className="pointer-events-none absolute right-0 top-4 rounded-full px-3 py-1 text-sm font-semibold text-white shadow-lg"
                style={{ backgroundColor: currentLevel.color }}
              >
                ⚡ +10 EXP
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stats */}
        <div className="w-full flex-1 space-y-4">
          {/* Level + name */}
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="rounded-full px-3 py-1 text-sm font-semibold text-white"
              style={{ backgroundColor: currentLevel.color }}
            >
              Lv.{currentLevel.level}
            </span>
            <h2 style={{ color: currentLevel.color }} className="leading-none">
              {currentLevel.name}
            </h2>
            {Array.from({ length: currentLevel.level }).map((_, i) => (
              <Star key={i} size={14} fill={currentLevel.color} stroke="none" />
            ))}
          </div>

          {/* EXP bar */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Zap size={11} style={{ color: currentLevel.color }} />
                EXP
              </span>
              <span className="text-xs font-semibold" style={{ color: currentLevel.color }}>
                {exp}
                {currentLevel.level < 5 && (
                  <span className="font-normal text-muted-foreground">
                    {" "}/ {nextLevel?.minExp} EXP
                  </span>
                )}
                {currentLevel.level === 5 && " · MAX"}
              </span>
            </div>

            <div className="h-4 overflow-hidden rounded-full border border-white bg-white/80">
              <motion.div
                className="relative h-full rounded-full"
                style={{ backgroundColor: currentLevel.color }}
                initial={false}
                animate={{ width: `${expPct}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="absolute inset-0 rounded-full bg-white/20" />
              </motion.div>
            </div>

            {currentLevel.level < 5 && (
              <p className="mt-1 text-xs text-muted-foreground">
                Lv.{currentLevel.level + 1} 까지{" "}
                <span style={{ color: currentLevel.color }} className="font-semibold">
                  {(nextLevel?.minExp ?? 0) - exp} EXP
                </span>{" "}
                남았어요 · 과제 완료 시{" "}
                <span style={{ color: currentLevel.color }}>+10 EXP</span>
              </p>
            )}
          </div>

          {/* Daily progress — 5 stages */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">오늘의 진행도</span>
              <span className="text-xs font-semibold text-foreground">
                {done}/{total} 완료{" "}
                <span className="font-normal text-muted-foreground">({progressPct}%)</span>
              </span>
            </div>

            <div className="flex gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => {
                const filled = i < dailyStage;
                const isCurrentEdge = i === dailyStage - 1;

                return (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1">
                    <motion.div
                      className="h-3 w-full overflow-hidden rounded-full"
                      style={{ backgroundColor: filled ? stageColors[i] : "#E8E4F0" }}
                      animate={{
                        scale: isCurrentEdge ? [1, 1.06, 1] : 1,
                      }}
                      transition={{ duration: 0.4 }}
                    />
                    <span
                      className="text-xs leading-none"
                      style={{
                        color: filled ? stageColors[i] : "#B0A8C8",
                        fontWeight: isCurrentEdge ? 600 : 400,
                      }}
                    >
                      {STAGE_LABELS[i]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}