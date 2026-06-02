import { useEffect, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export const focusStateConfig = {
  none: {
    label: "집중 전",
    className: "bg-gray-100 text-gray-600",
    bg: "#F3F4F6",
    color: "#4B5563",
    dotColor: "#9CA3AF",
  },
  short: {
    label: "집중 시작",
    className: "bg-blue-100 text-blue-700",
    bg: "#DBEAFE",
    color: "#1D4ED8",
    dotColor: "#3B82F6",
  },
  good: {
    label: "집중 중",
    className: "bg-green-100 text-green-700",
    bg: "#DCFCE7",
    color: "#15803D",
    dotColor: "#22C55E",
  },
  great: {
    label: "몰입 중",
    className: "bg-purple-100 text-purple-700",
    bg: "#F3E8FF",
    color: "#7E22CE",
    dotColor: "#A855F7",
  },
};

export function getFocusState(minutes: number, status?: string) {
  if (status === "완료") return "great";
  if (minutes >= 60) return "great";
  if (minutes >= 30) return "good";
  if (minutes > 0) return "short";
  return "none";
}

interface FocusTimerProps {
  todoId: string;
  currentFocusTime: number;
  onTimeUpdate: (todoId: string, minutes: number) => void;
  isComplete?: boolean;
}

export function FocusTimer({
  todoId,
  currentFocusTime,
  onTimeUpdate,
  isComplete = false,
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

  const state = getFocusState(currentFocusTime, isComplete ? "완료" : undefined);
  const config = focusStateConfig[state];

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
      <span className={`rounded-full px-3 py-1 ${config.className}`}>
        {config.label} · {currentFocusTime}분
      </span>

      <button
        type="button"
        disabled={isComplete}
        onClick={() => setIsRunning((prev) => !prev)}
        className="inline-flex items-center gap-1 rounded-lg border px-3 py-1 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
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
        className="inline-flex items-center gap-1 rounded-lg border px-3 py-1 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <RotateCcw size={14} />
        초기화
      </button>

      {isRunning && !isComplete && (
        <span className="text-xs text-gray-400">
          현재 세션 {Math.floor(seconds / 60)}분 {seconds % 60}초
        </span>
      )}
    </div>
  );
}
