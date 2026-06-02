import { useEffect, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export type FocusState = "idle" | "studying" | "complete" | "goal" | "urgent";

function getDaysUntilDue(dueDate?: string) {
  if (!dueDate) return null;

  const today = new Date();
  const due = new Date(dueDate);

  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  return Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export const focusStateConfig: Record<
  FocusState,
  {
    label: string;
    icon: string;
    className: string;
    bg: string;
    color: string;
    dotColor: string;
  }
> = {
  idle: {
    label: "퀘스트 대기",
    icon: "⏳",
    className: "bg-gray-100 text-gray-700 border-gray-200",
    bg: "#F3F4F6",
    color: "#374151",
    dotColor: "#9CA3AF",
  },
  studying: {
    label: "열공 중",
    icon: "📘",
    className: "bg-blue-100 text-blue-700 border-blue-200",
    bg: "#DBEAFE",
    color: "#1D4ED8",
    dotColor: "#3B82F6",
  },
  complete: {
    label: "퀘스트 완료!",
    icon: "🎉",
    className: "bg-green-100 text-green-700 border-green-200",
    bg: "#DCFCE7",
    color: "#15803D",
    dotColor: "#22C55E",
  },
  goal: {
    label: "목표 달성",
    icon: "🔥",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
    bg: "#FEF3C7",
    color: "#A16207",
    dotColor: "#F59E0B",
  },
  urgent: {
    label: "긴급 퀘스트",
    icon: "🚨",
    className: "bg-red-100 text-red-700 border-red-200",
    bg: "#FEE2E2",
    color: "#B91C1C",
    dotColor: "#EF4444",
  },
};

export function getFocusState(minutes: number, status?: string, dueDate?: string): FocusState {
  if (status === "완료") return "complete";

  const daysUntilDue = getDaysUntilDue(dueDate);

  if (minutes === 0 && daysUntilDue !== null && daysUntilDue >= 0 && daysUntilDue <= 2) {
    return "urgent";
  }

  if (minutes >= 30) return "goal";
  if (minutes >= 1) return "studying";

  return "idle";
}

interface FocusTimerProps {
  todoId: string;
  currentFocusTime: number;
  onTimeUpdate: (todoId: string, minutes: number) => void;
  isComplete?: boolean;
  dueDate?: string;
}

export function FocusTimer({
  todoId,
  currentFocusTime,
  onTimeUpdate,
  isComplete = false,
  dueDate,
}: FocusTimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning || isComplete) return;

    const timer = window.setInterval(() => {
      setSeconds((prev) => {
        const next = prev + 1;

        if (next % 60 === 0) {
          onTimeUpdate(todoId, 1);
        }

        return next;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isRunning, isComplete, onTimeUpdate, todoId]);

  const state = getFocusState(currentFocusTime, isComplete ? "완료" : undefined, dueDate);
  const config = focusStateConfig[state];

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
      <span className={`rounded-full border px-3 py-1 font-bold ${config.className}`}>
        <span className="mr-1">{config.icon}</span>
        {config.label} · {currentFocusTime}분
      </span>

      <button
        type="button"
        disabled={isComplete}
        onClick={() => setIsRunning((prev) => !prev)}
        className="inline-flex items-center gap-1 rounded-lg border px-3 py-1 font-semibold hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isRunning ? <Pause size={14} /> : <Play size={14} />}
        {isRunning ? "일시정지" : "집중 시작"}
      </button>

      <button
        type="button"
        disabled={isComplete}
        onClick={() => {
          setSeconds(0);
          onTimeUpdate(todoId, -currentFocusTime);
        }}
        className="inline-flex items-center gap-1 rounded-lg border px-3 py-1 font-semibold hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <RotateCcw size={14} />
        초기화
      </button>

      {isRunning && !isComplete && (
        <span className="text-xs font-medium text-gray-500">
          현재 세션 {Math.floor(seconds / 60)}분 {seconds % 60}초
        </span>
      )}
    </div>
  );
}
