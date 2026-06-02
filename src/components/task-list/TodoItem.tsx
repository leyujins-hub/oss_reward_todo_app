import { Pencil, Trash2, Calendar, CheckCircle2, Circle, Clock as ClockIcon } from "lucide-react";
import type { Todo, Status, Priority } from "./types";
import { FocusTimer, getFocusState, focusStateConfig } from "./FocusTimer";

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Status) => void;
  onTimeUpdate: (todoId: string, minutes: number) => void;
}

const priorityBadge: Record<Priority, string> = {
  낮음: "bg-blue-100 text-blue-700",
  보통: "bg-yellow-100 text-yellow-700",
  높음: "bg-red-100 text-red-700",
};

const priorityDot: Record<Priority, string> = {
  낮음: "bg-blue-400",
  보통: "bg-yellow-400",
  높음: "bg-red-500",
};

const categoryBadge: Record<string, string> = {
  학업: "bg-purple-100 text-purple-700",
  개인: "bg-green-100 text-green-700",
  팀플: "bg-orange-100 text-orange-700",
  업무: "bg-cyan-100 text-cyan-700",
};

const statusCycle: Record<Status, Status> = {
  "진행 전": "진행 중",
  "진행 중": "완료",
  완료: "진행 전",
};

const statusIcon = {
  "진행 전": <Circle size={20} className="text-muted-foreground" />,
  "진행 중": <ClockIcon size={20} className="text-yellow-500" />,
  완료: <CheckCircle2 size={20} className="text-green-500" />,
};

function isOverdue(dueDate: string, status: Status): boolean {
  if (!dueDate || status === "완료") return false;
  return new Date(dueDate) < new Date(new Date().toDateString());
}

export function TodoItem({ todo, onEdit, onDelete, onStatusChange, onTimeUpdate }: TodoItemProps) {
  const overdue = isOverdue(todo.dueDate, todo.status);
  const isComplete = todo.status === "완료";
  const isHighPriority = todo.priority === "높음";

  const focusState = getFocusState(todo.focusTime, todo.status, todo.dueDate);
  const focusConfig = focusStateConfig[focusState];

  // High priority = red card styling
  const cardStyle = isHighPriority
    ? "bg-red-50 border-red-200 shadow-red-100"
    : "bg-white border-border";

  return (
    <div
      className={`group rounded-2xl border-2 shadow-sm hover:shadow-md transition-all p-4 ${cardStyle} ${
        isComplete ? "opacity-60" : ""
      }`}
    >
      {isHighPriority && !isComplete && (
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs text-red-600 font-medium tracking-wide">중요 과제</span>
        </div>
      )}

      <div className="flex items-start gap-3">
        {/* Status toggle */}
        <button
          onClick={() => onStatusChange(todo.id, statusCycle[todo.status])}
          className="mt-0.5 shrink-0 hover:scale-110 transition-transform"
          title={`현재: ${todo.status} → 클릭하면 변경`}
        >
          {statusIcon[todo.status]}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`text-foreground leading-snug break-words ${
                isComplete ? "line-through text-muted-foreground" : ""
              } ${isHighPriority && !isComplete ? "text-red-900" : ""}`}
            >
              {todo.title}
            </h3>
            {/* Action buttons */}
            <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(todo)}
                className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                title="수정"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"
                title="삭제"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {todo.description && (
            <p
              className={`text-sm mt-1 break-words leading-relaxed ${
                isHighPriority && !isComplete ? "text-red-800/70" : "text-muted-foreground"
              }`}
            >
              {todo.description}
            </p>
          )}

          {/* Focus Timer */}
          <div className="mt-3 mb-2">
            <FocusTimer
              todoId={todo.id}
              currentFocusTime={todo.focusTime}
              onTimeUpdate={onTimeUpdate}
              isComplete={isComplete}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            {/* Focus state badge */}
            <span
              className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                backgroundColor: focusConfig.bg,
                color: focusConfig.color,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: focusConfig.dotColor }}
              />
              {focusConfig.label}
            </span>

            {/* Priority badge */}
            <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${priorityBadge[todo.priority]}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${priorityDot[todo.priority]}`} />
              {todo.priority}
            </span>

            {/* Category */}
            <span className={`text-xs px-2 py-0.5 rounded-full ${categoryBadge[todo.category]}`}>
              {todo.category}
            </span>

            {/* Status */}
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                todo.status === "완료"
                  ? "bg-green-100 text-green-700"
                  : todo.status === "진행 중"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {todo.status}
            </span>

            {/* Due date */}
            {todo.dueDate && (
              <span
                className={`flex items-center gap-1 text-xs ${
                  overdue ? "text-red-500" : "text-muted-foreground"
                }`}
              >
                <Calendar size={11} />
                {new Date(todo.dueDate).toLocaleDateString("ko-KR", {
                  month: "short",
                  day: "numeric",
                })}
                {overdue && " (기한 초과)"}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
