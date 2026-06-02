import { AlertTriangle, CalendarDays, ClipboardList, ListChecks, Sparkles } from "lucide-react";
import type { Todo } from "../task-list/types";

export type QuestBoard = "overdue" | "today" | "tomorrow" | "all";

interface DailyQuestBoardProps {
  todos: Todo[];
  selectedBoard: QuestBoard;
  onChange: (board: QuestBoard) => void;
}

function toDateOnly(date: Date) {
  const copied = new Date(date);
  copied.setHours(0, 0, 0, 0);
  return copied;
}

function getTodayString(offset = 0) {
  const date = toDateOnly(new Date());
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
}

function isOverdue(todo: Todo) {
  if (!todo.dueDate) return false;
  if (todo.status === "완료") return false;

  const today = getTodayString(0);
  return todo.dueDate < today;
}

export function matchesQuestBoard(todo: Todo, board: QuestBoard) {
  const today = getTodayString(0);
  const tomorrow = getTodayString(1);

  if (board === "all") return true;
  if (board === "overdue") return isOverdue(todo);
  if (board === "today") return todo.dueDate === today;
  if (board === "tomorrow") return todo.dueDate === tomorrow;

  return true;
}

function getRecommendedTodo(todos: Todo[]) {
  const activeTodos = todos.filter((todo) => todo.status !== "완료");

  if (activeTodos.length === 0) return null;

  const today = getTodayString(0);
  const twoDaysLater = getTodayString(2);

  const overdue = activeTodos.find((todo) => isOverdue(todo));
  if (overdue) {
    return {
      todo: overdue,
      reason: "이미 마감일이 지난 미룬 퀘스트예요. 먼저 처리하는 게 좋아요.",
      icon: "🕰️",
    };
  }

  const urgent = activeTodos.find(
    (todo) =>
      todo.dueDate &&
      todo.dueDate >= today &&
      todo.dueDate <= twoDaysLater &&
      todo.focusTime === 0
  );
  if (urgent) {
    return {
      todo: urgent,
      reason: "마감이 가까운데 아직 집중 시간이 없어요.",
      icon: "🚨",
    };
  }

  const highPriority = activeTodos.find((todo) => todo.priority === "높음");
  if (highPriority) {
    return {
      todo: highPriority,
      reason: "중요도가 높은 퀘스트예요. 오늘 먼저 잡는 걸 추천해요.",
      icon: "⭐",
    };
  }

  const inProgress = activeTodos.find((todo) => todo.status === "진행 중");
  if (inProgress) {
    return {
      todo: inProgress,
      reason: "이미 시작한 퀘스트예요. 이어서 끝내면 좋아요.",
      icon: "📘",
    };
  }

  return {
    todo: activeTodos[0],
    reason: "아직 완료되지 않은 퀘스트예요. 하나씩 처리해봐요.",
    icon: "⏳",
  };
}

export function DailyQuestBoard({ todos, selectedBoard, onChange }: DailyQuestBoardProps) {
  const today = getTodayString(0);
  const tomorrow = getTodayString(1);

  const counts = {
    overdue: todos.filter((todo) => isOverdue(todo)).length,
    today: todos.filter((todo) => todo.dueDate === today).length,
    tomorrow: todos.filter((todo) => todo.dueDate === tomorrow).length,
    all: todos.length,
  };

  const recommended = getRecommendedTodo(todos);

  const boards = [
    {
      id: "overdue" as const,
      label: "미룬 퀘스트",
      count: counts.overdue,
      icon: AlertTriangle,
      activeClass: "bg-red-100 text-red-700 border-red-200",
    },
    {
      id: "today" as const,
      label: "오늘 퀘스트",
      count: counts.today,
      icon: CalendarDays,
      activeClass: "bg-purple-100 text-purple-700 border-purple-200",
    },
    {
      id: "tomorrow" as const,
      label: "내일 퀘스트",
      count: counts.tomorrow,
      icon: Sparkles,
      activeClass: "bg-blue-100 text-blue-700 border-blue-200",
    },
    {
      id: "all" as const,
      label: "전체 기록",
      count: counts.all,
      icon: ListChecks,
      activeClass: "bg-gray-100 text-gray-700 border-gray-200",
    },
  ];

  return (
    <section className="rounded-2xl border bg-white/90 p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold">일일 퀘스트 보드</h2>
          <p className="text-sm font-semibold text-gray-500">
            날짜에 따라 오늘 할 일, 내일 할 일, 미룬 일을 나눠서 보여줘요.
          </p>
        </div>

        {recommended ? (
          <div className="max-w-xl rounded-2xl border bg-yellow-50 px-4 py-3 text-sm">
            <p className="font-extrabold text-yellow-800">
              {recommended.icon} 오늘의 추천 퀘스트
            </p>
            <p className="mt-1 font-bold text-gray-800">{recommended.todo.title}</p>
            <p className="mt-1 text-xs font-semibold text-gray-600">{recommended.reason}</p>
          </div>
        ) : (
          <div className="rounded-2xl border bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
            🎉 지금은 남은 퀘스트가 없어요!
          </div>
        )}
      </div>

      <div className="grid gap-2 md:grid-cols-4">
        {boards.map((board) => {
          const Icon = board.icon;
          const isActive = selectedBoard === board.id;

          return (
            <button
              key={board.id}
              type="button"
              onClick={() => onChange(board.id)}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition hover:bg-gray-50 ${
                isActive ? board.activeClass : "bg-white text-gray-700"
              }`}
            >
              <span className="flex items-center gap-2">
                <Icon size={18} />
                <span className="font-extrabold">{board.label}</span>
              </span>
              <span className="rounded-full bg-white px-2 py-1 text-xs font-black">
                {board.count}
              </span>
            </button>
          );
        })}
      </div>

      {selectedBoard !== "all" && (
        <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-gray-500">
          <ClipboardList size={14} />
          현재 선택한 보드에 해당하는 퀘스트만 아래 목록에 표시됩니다.
        </div>
      )}
    </section>
  );
}
