import { Award, CalendarDays, Flame, Trophy } from "lucide-react";
import type { Todo } from "../task-list/types";

interface StudyStatsSummaryProps {
  todos: Todo[];
}

function isInRange(dateString: string, days: number) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  return diff >= 0 && diff <= days * 24 * 60 * 60 * 1000;
}

function getTopCategory(todos: Todo[]) {
  const counts = todos.reduce<Record<string, number>>((acc, todo) => {
    if (todo.status !== "완료") return acc;
    acc[todo.category] = (acc[todo.category] ?? 0) + 1;
    return acc;
  }, {});

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0] ?? "아직 없음";
}

export function StudyStatsSummary({ todos }: StudyStatsSummaryProps) {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.status === "완료");
  const weekCompleted = completed.filter((todo) => isInRange(todo.createdAt, 7)).length;
  const monthCompleted = completed.filter((todo) => isInRange(todo.createdAt, 30)).length;
  const yearCompleted = completed.filter((todo) => isInRange(todo.createdAt, 365)).length;
  const totalFocusTime = todos.reduce((sum, todo) => sum + (todo.focusTime ?? 0), 0);
  const completionRate = total > 0 ? Math.round((completed.length / total) * 100) : 0;
  const topCategory = getTopCategory(todos);

  const cards = [
    {
      label: "이번 주 완료",
      value: `${weekCompleted}개`,
      icon: CalendarDays,
      bg: "bg-blue-50",
      text: "text-blue-700",
    },
    {
      label: "이번 달 완료",
      value: `${monthCompleted}개`,
      icon: Trophy,
      bg: "bg-green-50",
      text: "text-green-700",
    },
    {
      label: "올해 완료",
      value: `${yearCompleted}개`,
      icon: Award,
      bg: "bg-yellow-50",
      text: "text-yellow-700",
    },
    {
      label: "총 집중 시간",
      value: `${totalFocusTime}분`,
      icon: Flame,
      bg: "bg-red-50",
      text: "text-red-700",
    },
  ];

  return (
    <section className="rounded-2xl border bg-white/90 p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-lg font-extrabold">나의 성장 로그</h2>
          <p className="text-sm font-semibold text-gray-500">
            완료한 퀘스트와 집중 시간을 모아 성장 기록으로 보여줘요.
          </p>
        </div>

        <div className="rounded-full bg-purple-50 px-4 py-2 text-sm font-extrabold text-purple-700">
          전체 완료율 {completionRate}%
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div key={card.label} className={`rounded-2xl border p-4 ${card.bg}`}>
              <div className={`mb-2 inline-flex rounded-xl bg-white p-2 ${card.text}`}>
                <Icon size={20} />
              </div>
              <p className="text-xs font-bold text-gray-500">{card.label}</p>
              <p className={`text-2xl font-black ${card.text}`}>{card.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-xl bg-gradient-to-r from-purple-50 to-yellow-50 p-4 text-sm font-bold text-gray-700">
        지금까지 총 <span className="text-purple-700">{completed.length}개</span>의 퀘스트를 완료했어요.
        가장 많이 완료한 카테고리는 <span className="text-yellow-700">{topCategory}</span>입니다.
      </div>
    </section>
  );
}
