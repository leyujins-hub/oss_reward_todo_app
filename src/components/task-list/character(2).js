import { useMemo } from "react";
import { motion } from "motion/react";
import { Zap, Trophy, BookOpen, TrendingUp } from "lucide-react";
import type { Todo, Priority } from "./types";
import {
  SeedCharacter,
  SproutCharacter,
  StudentCharacter,
  HonorStudentCharacter,
  ScholarCharacter,
  LegendCharacter,
} from "./CharacterDisplay";

interface CharacterPanelProps {
  todos: Todo[];
}

const XP_MAP: Record<Priority, number> = { 낮음: 1, 보통: 3, 높음: 5 };

interface EvolutionStage {
  level: number;
  name: string;
  title: string;
  requiredXP: number;
  color: string;
  bg: string;
  borderColor: string;
  Character: () => JSX.Element;
  tip: string;
}

const STAGES: EvolutionStage[] = [
  {
    level: 1,
    name: "씨앗",
    title: "잠자는 씨앗",
    requiredXP: 0,
    color: "#A0855E",
    bg: "from-amber-50 to-yellow-50",
    borderColor: "#D4B896",
    Character: SeedCharacter,
    tip: "첫 학업 과제를 완료해 봐요!",
  },
  {
    level: 2,
    name: "새싹",
    title: "호기심 새싹",
    requiredXP: 5,
    color: "#4A9E38",
    bg: "from-green-50 to-emerald-50",
    borderColor: "#7BC96A",
    Character: SproutCharacter,
    tip: "조금만 더 하면 학생으로 진화해요!",
  },
  {
    level: 3,
    name: "학생",
    title: "열정 학생",
    requiredXP: 15,
    color: "#5B4FE8",
    bg: "from-indigo-50 to-purple-50",
    borderColor: "#9D95EF",
    Character: StudentCharacter,
    tip: "꾸준히 공부해서 우등생이 되어봐요!",
  },
  {
    level: 4,
    name: "우등생",
    title: "빛나는 우등생",
    requiredXP: 30,
    color: "#E84F4F",
    bg: "from-red-50 to-orange-50",
    borderColor: "#F09090",
    Character: HonorStudentCharacter,
    tip: "이제 학자까지 얼마 남지 않았어요!",
  },
  {
    level: 5,
    name: "학자",
    title: "지혜로운 학자",
    requiredXP: 55,
    color: "#FF9500",
    bg: "from-amber-50 to-orange-50",
    borderColor: "#FFB84D",
    Character: ScholarCharacter,
    tip: "전설의 경지에 도달해 봐요!",
  },
  {
    level: 6,
    name: "전설",
    title: "전설의 현자",
    requiredXP: 90,
    color: "#5B4FE8",
    bg: "from-purple-50 via-indigo-50 to-yellow-50",
    borderColor: "#FFB800",
    Character: LegendCharacter,
    tip: "당신은 최고의 경지에 올랐습니다!",
  },
];

export function CharacterPanel({ todos }: CharacterPanelProps) {
  const stats = useMemo(() => {
    const academicDone = todos.filter(
      (t) => t.category === "학업" && t.status === "완료"
    );
    const totalXP = academicDone.reduce((sum, t) => sum + XP_MAP[t.priority], 0);
    const totalDone = todos.filter((t) => t.status === "완료").length;
    const totalAcademic = todos.filter((t) => t.category === "학업").length;
    const streak = academicDone.length;

    return { totalXP, totalDone, totalAcademic, streak };
  }, [todos]);

  const currentStage = useMemo(() => {
    for (let i = STAGES.length - 1; i >= 0; i--) {
      if (stats.totalXP >= STAGES[i].requiredXP) return STAGES[i];
    }
    return STAGES[0];
  }, [stats.totalXP]);

  const nextStage = STAGES.find((s) => s.requiredXP > stats.totalXP);
  const progressXP = nextStage
    ? stats.totalXP - currentStage.requiredXP
    : currentStage.requiredXP;
  const neededXP = nextStage
    ? nextStage.requiredXP - currentStage.requiredXP
    : 1;
  const progressPct = Math.min((progressXP / neededXP) * 100, 100);

  const { Character } = currentStage;

  return (
    <div className="flex flex-col gap-4">
      {/* Character card */}
      <div
        className={`relative rounded-3xl overflow-hidden border-2 bg-gradient-to-b ${currentStage.bg} p-6`}
        style={{ borderColor: currentStage.borderColor }}
      >
        {/* Level badge */}
        <div
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm"
          style={{ backgroundColor: currentStage.color }}
        >
          Lv.{currentStage.level}
        </div>

        {/* Stage name */}
        <div className="text-center mt-2 mb-1">
          <p className="text-xs text-muted-foreground tracking-widest uppercase">
            {currentStage.title}
          </p>
          <h2 style={{ color: currentStage.color }} className="mt-0.5">
            {currentStage.name}
          </h2>
        </div>

        {/* Character illustration */}
        <motion.div
          key={currentStage.level}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="flex justify-center my-4"
          style={{ height: 160 }}
        >
          <Character />
        </motion.div>

        {/* Tip */}
        <p className="text-center text-xs text-muted-foreground bg-white/60 rounded-xl px-3 py-2">
          {currentStage.tip}
        </p>

        {/* XP progress */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Zap size={11} style={{ color: currentStage.color }} />
              경험치 (XP)
            </span>
            <span className="text-xs" style={{ color: currentStage.color }}>
              {stats.totalXP}
              {nextStage ? ` / ${nextStage.requiredXP}` : " MAX"}
            </span>
          </div>
          <div className="h-3 bg-white/70 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: currentStage.color }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          {nextStage && (
            <p className="text-xs text-muted-foreground text-center mt-1.5">
              {nextStage.name}까지{" "}
              <span style={{ color: currentStage.color }}>
                {nextStage.requiredXP - stats.totalXP} XP
              </span>{" "}
              남았어요
            </p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        {[
          {
            icon: <Zap size={16} className="text-yellow-500" />,
            label: "총 XP",
            value: stats.totalXP,
            bg: "bg-yellow-50",
            border: "border-yellow-200",
          },
          {
            icon: <Trophy size={16} className="text-purple-500" />,
            label: "전체 완료",
            value: stats.totalDone,
            bg: "bg-purple-50",
            border: "border-purple-200",
          },
          {
            icon: <BookOpen size={16} className="text-blue-500" />,
            label: "학업 과제",
            value: stats.totalAcademic,
            bg: "bg-blue-50",
            border: "border-blue-200",
          },
          {
            icon: <TrendingUp size={16} className="text-green-500" />,
            label: "학업 완료",
            value: stats.streak,
            bg: "bg-green-50",
            border: "border-green-200",
          },
        ].map((item) => (
          <div
            key={item.label}
            className={`${item.bg} border ${item.border} rounded-2xl p-3 text-center`}
          >
            <div className="flex justify-center mb-1">{item.icon}</div>
            <div className="text-xl font-semibold text-foreground">{item.value}</div>
            <div className="text-xs text-muted-foreground">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Evolution tree */}
      <div className="bg-white rounded-2xl border border-border p-4">
        <h4 className="text-sm text-muted-foreground mb-3">진화 경로</h4>
        <div className="space-y-2">
          {STAGES.map((stage, i) => {
            const unlocked = stats.totalXP >= stage.requiredXP;
            const isCurrent = stage.level === currentStage.level;
            return (
              <div key={stage.level} className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 border-2 transition-all ${
                    isCurrent
                      ? "text-white border-transparent scale-110"
                      : unlocked
                      ? "text-white border-transparent"
                      : "bg-muted border-muted text-muted-foreground"
                  }`}
                  style={
                    unlocked
                      ? { backgroundColor: stage.color, borderColor: stage.color }
                      : {}
                  }
                >
                  {isCurrent ? "★" : stage.level}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm ${isCurrent ? "font-semibold" : ""} ${
                        unlocked ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {stage.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {stage.requiredXP} XP
                    </span>
                  </div>
                  {isCurrent && (
                    <div className="h-1 bg-muted rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${progressPct}%`,
                          backgroundColor: stage.color,
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* XP guide */}
      <div className="bg-white rounded-2xl border border-border p-4">
        <h4 className="text-sm text-muted-foreground mb-2">XP 획득 방법</h4>
        <p className="text-xs text-muted-foreground mb-2">학업 카테고리 완료 시:</p>
        <div className="space-y-1.5">
          {[
            { label: "높음 중요도", xp: 5, color: "#E84F4F" },
            { label: "보통 중요도", xp: 3, color: "#FFB800" },
            { label: "낮음 중요도", xp: 1, color: "#5B4FE8" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{item.label}</span>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ color: item.color, backgroundColor: item.color + "18" }}
              >
                +{item.xp} XP
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
