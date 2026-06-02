import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Trophy, TrendingUp, Award, Flame } from "lucide-react";
import { motion } from "motion/react";
import type { Todo } from "../task-list/types";

const STORAGE_KEY = "todolist-data-v2";
const EXP_KEY = "todolist-exp";

type Period = "week" | "month" | "year";

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Todo[]) : [];
  } catch {
    return [];
  }
}

function loadExp(): number {
  try {
    return parseInt(localStorage.getItem(EXP_KEY) ?? "0", 10) || 0;
  } catch {
    return 0;
  }
}

function getCurrentLevel(exp: number): number {
  if (exp >= 200) return 5;
  if (exp >= 150) return 4;
  if (exp >= 100) return 3;
  if (exp >= 50) return 2;
  return 1;
}

function getExpForNextLevel(exp: number): number {
  const level = getCurrentLevel(exp);
  const thresholds = [0, 50, 100, 150, 200];
  if (level >= 5) return 0;
  return thresholds[level] - exp;
}

export function StatisticsPage() {
  const [period, setPeriod] = useState<Period>("week");
  const todos = useMemo(() => loadTodos(), []);
  const exp = useMemo(() => loadExp(), []);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.status === "완료").length;
    const inProgress = todos.filter((t) => t.status === "진행 중").length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, inProgress, completionRate };
  }, [todos]);

  const chartData = useMemo(() => {
    const now = new Date();
    const data: { name: string; count: number }[] = [];

    if (period === "week") {
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dayName = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
        const count = todos.filter((t) => {
          const todoDate = new Date(t.createdAt);
          return (
            t.status === "완료" &&
            todoDate.toDateString() === date.toDateString()
          );
        }).length;
        data.push({ name: dayName, count });
      }
    } else if (period === "month") {
      for (let i = 3; i >= 0; i--) {
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - (i * 7));
        const count = todos.filter((t) => {
          const todoDate = new Date(t.createdAt);
          return (
            t.status === "완료" &&
            todoDate >= weekStart &&
            todoDate < new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000)
          );
        }).length;
        data.push({ name: `${4 - i}주`, count });
      }
    } else {
      for (let i = 11; i >= 0; i--) {
        const monthDate = new Date(now);
        monthDate.setMonth(monthDate.getMonth() - i);
        const monthName = `${monthDate.getMonth() + 1}월`;
        const count = todos.filter((t) => {
          const todoDate = new Date(t.createdAt);
          return (
            t.status === "완료" &&
            todoDate.getMonth() === monthDate.getMonth() &&
            todoDate.getFullYear() === monthDate.getFullYear()
          );
        }).length;
        data.push({ name: monthName, count });
      }
    }

    return data;
  }, [todos, period]);

  const achievements = useMemo(() => {
    const completed = todos.filter((t) => t.status === "완료").length;

    return [
      { title: "첫 퀘스트 완료", unlocked: completed >= 1, icon: Trophy },
      { title: "10개 퀘스트 완료", unlocked: completed >= 10, icon: Award },
      { title: "50개 퀘스트 완료", unlocked: completed >= 50, icon: TrendingUp },
      { title: "100개 퀘스트 완료", unlocked: completed >= 100, icon: Flame },
    ];
  }, [todos]);

  const analysis = useMemo(() => {
    const categoryCounts: Record<string, number> = {};
    todos.forEach((t) => {
      if (t.status === "완료") {
        categoryCounts[t.category] = (categoryCounts[t.category] || 0) + 1;
      }
    });

    const mostCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0];

    // 연속 수행 기록 계산
    const completedDates = todos
      .filter((t) => t.status === "완료")
      .map((t) => new Date(t.createdAt).toDateString())
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    let streak = 0;
    const today = new Date().toDateString();
    if (completedDates.includes(today)) {
      streak = 1;
      for (let i = 1; i < completedDates.length; i++) {
        const prevDate = new Date(completedDates[i - 1]);
        const currDate = new Date(completedDates[i]);
        const diffDays = Math.round((prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          streak++;
        } else {
          break;
        }
      }
    }

    return {
      mostCategory: mostCategory ? mostCategory[0] : "없음",
      mostCategoryCount: mostCategory ? mostCategory[1] : 0,
      streak,
    };
  }, [todos]);

  const currentLevel = getCurrentLevel(exp);
  const expForNext = getExpForNextLevel(exp);

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground">통계</h1>
          <p className="text-xs text-muted-foreground">
            나의 성장을 확인하세요
          </p>
        </div>
      </div>

      {/* Period Tabs */}
      <div className="flex gap-2 p-1 bg-accent rounded-xl">
        {[
          { key: "week" as Period, label: "1주일" },
          { key: "month" as Period, label: "1개월" },
          { key: "year" as Period, label: "1년" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setPeriod(tab.key)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              period === tab.key
                ? "bg-white text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Quest Status */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {[
          { label: "전체 퀘스트", value: stats.total, color: "#5B4FE8" },
          { label: "완료", value: stats.completed, color: "#10B981" },
          { label: "진행 중", value: stats.inProgress, color: "#F59E0B" },
          { label: "완료율", value: `${stats.completionRate}%`, color: "#EC4899" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-4 bg-background border border-border rounded-xl"
          >
            <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
            <p className="text-2xl font-bold" style={{ color: item.color }}>
              {item.value}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 bg-background border border-border rounded-xl"
      >
        <h2 className="text-foreground mb-4">활동 그래프</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
            <YAxis tick={{ fontSize: 12 }} stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="count" fill="#5B4FE8" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Growth Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 bg-background border border-border rounded-xl"
      >
        <h2 className="text-foreground mb-4">성장 통계</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">현재 레벨</span>
            <span className="text-xl font-bold text-foreground">Lv.{currentLevel}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">누적 EXP</span>
            <span className="text-xl font-bold" style={{ color: "#5B4FE8" }}>{exp}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">다음 레벨까지</span>
            <span className="text-xl font-bold text-foreground">
              {currentLevel >= 5 ? "MAX" : `${expForNext} EXP`}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 bg-background border border-border rounded-xl"
      >
        <h2 className="text-foreground mb-4">업적</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {achievements.map((achievement, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border ${
                achievement.unlocked
                  ? "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200"
                  : "bg-accent border-border"
              }`}
            >
              <achievement.icon
                size={24}
                className={`mb-2 ${
                  achievement.unlocked ? "text-amber-600" : "text-muted-foreground"
                }`}
              />
              <p
                className={`text-xs ${
                  achievement.unlocked ? "text-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                {achievement.title}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Growth Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 bg-background border border-border rounded-xl space-y-4"
      >
        <h2 className="text-foreground mb-4">성장 분석</h2>

        <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-100">
          <p className="text-sm text-muted-foreground mb-1">가장 많이 수행한 카테고리</p>
          <p className="text-lg font-bold text-foreground">
            {analysis.mostCategory} ({analysis.mostCategoryCount}개)
          </p>
        </div>

        <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
          <p className="text-sm text-muted-foreground mb-1">연속 수행 기록</p>
          <div className="flex items-center gap-2">
            <Flame size={20} className="text-orange-500" />
            <p className="text-lg font-bold text-foreground">{analysis.streak}일 연속</p>
          </div>
        </div>

        {/* Mini Giraffe */}
        <div className="flex items-center justify-center pt-4">
          <svg width="60" height="60" viewBox="0 0 40 40" fill="none">
            <ellipse cx="20" cy="28" rx="8" ry="6" fill="#FDB462" />
            <rect x="18" y="15" width="4" height="13" rx="2" fill="#FDB462" />
            <circle cx="20" cy="12" r="5" fill="#FDB462" />
            <ellipse cx="17" cy="9" rx="1.5" ry="2.5" fill="#FDB462" />
            <ellipse cx="23" cy="9" rx="1.5" ry="2.5" fill="#FDB462" />
            <circle cx="17" cy="7.5" r="1" fill="#D4956D" />
            <circle cx="23" cy="7.5" r="1" fill="#D4956D" />
            <circle cx="18" cy="12" r="0.8" fill="#333" />
            <circle cx="22" cy="12" r="0.8" fill="#333" />
            <path d="M 18 14 Q 20 15 22 14" stroke="#333" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            <circle cx="16" cy="20" r="1.2" fill="#D4956D" opacity="0.6" />
            <circle cx="24" cy="22" r="1" fill="#D4956D" opacity="0.6" />
            <circle cx="19" cy="26" r="1.5" fill="#D4956D" opacity="0.6" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
