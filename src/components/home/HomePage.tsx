import { useState, useEffect, useMemo, useRef } from "react";
import { Plus, ClipboardList, Download, Upload } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Todo, Status, Priority } from "../task-list/types";
import { TodoForm } from "../task-list/TodoForm";
import { TodoItem } from "../task-list/TodoItem";
import { FilterBar } from "../task-list/FilterBar";
import { CharacterHeader } from "../task-list/CharacterHeader";
import { DailyQuoteCard } from "./DailyQuoteCard";
import { QuickLinks } from "./QuickLinks";
import { StudyStatsSummary } from "./StudyStatsSummary";
import { DailyQuestBoard, matchesQuestBoard } from "./DailyQuestBoard";
import type { QuestBoard } from "./DailyQuestBoard";
import type { FilterState } from "../task-list/FilterBar";

const STORAGE_KEY = "todolist-data-v3";
const EXP_KEY = "todolist-exp";
const priorityOrder: Record<Priority, number> = { 높음: 0, 보통: 1, 낮음: 2 };

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? (JSON.parse(raw) as Todo[]) : [];
    // Ensure focusTime exists (migration)
    return data.map((t) => ({ ...t, focusTime: t.focusTime ?? 0 }));
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

export function HomePage() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [exp, setExp] = useState<number>(loadExp);
  const [expGainId, setExpGainId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [questBoard, setQuestBoard] = useState<QuestBoard>("today");
  const [filter, setFilter] = useState<FilterState>({
    search: "",
    status: "전체",
    category: "전체",
    priority: "전체",
    sortBy: "createdAt",
  });

  const expAnimTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem(EXP_KEY, String(exp));
  }, [exp]);

  const triggerExpGain = () => {
    const id = crypto.randomUUID();
    setExpGainId(id);
    if (expAnimTimer.current) clearTimeout(expAnimTimer.current);
    expAnimTimer.current = setTimeout(() => setExpGainId(null), 1200);
    setExp((e) => e + 10);
  };

  const handleStatusChange = (id: string, status: Status) => {
    const task = todos.find((t) => t.id === id);
    if (!task) return;
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
    if (task.status !== "완료" && status === "완료") triggerExpGain();
    if (task.status === "완료" && status !== "완료")
      setExp((e) => Math.max(0, e - 10));
  };

  const handleTimeUpdate = (todoId: string, minutes: number) => {
    setTodos((prev) => prev.map((t) => (t.id === todoId ? { ...t, focusTime: minutes } : t)));
  };

  const handleSave = (data: Omit<Todo, "id" | "createdAt">) => {
    if (editingTodo) {
      const wasComplete = editingTodo.status === "완료";
      const nowComplete = data.status === "완료";
      setTodos((prev) =>
        prev.map((t) => (t.id === editingTodo.id ? { ...t, ...data } : t))
      );
      if (!wasComplete && nowComplete) triggerExpGain();
      if (wasComplete && !nowComplete) setExp((e) => Math.max(0, e - 10));
    } else {
      const newTodo: Todo = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        focusTime: data.focusTime ?? 0,
      };
      setTodos((prev) => [newTodo, ...prev]);
      if (data.status === "완료") triggerExpGain();
    }
    setShowForm(false);
    setEditingTodo(null);
  };

  const handleDelete = (id: string) => {
    const task = todos.find((t) => t.id === id);
    if (!confirm("정말 삭제하시겠습니까?")) return;
    if (task?.status === "완료") setExp((e) => Math.max(0, e - 10));
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(todos, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `todolist-${new Date().toLocaleDateString("ko-KR").replace(/\. /g, "-").replace(".", "")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string) as Todo[];
          if (Array.isArray(data)) {
            const migrated = data.map((t) => ({ ...t, focusTime: t.focusTime ?? 0 }));
            setTodos(migrated);
          }
        } catch {
          alert("올바른 JSON 파일이 아닙니다.");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const filteredTodos = useMemo(() => {
    let result = todos.filter((t) => {
      if (!matchesQuestBoard(t, questBoard)) return false;

      if (
        filter.search &&
        !t.title.toLowerCase().includes(filter.search.toLowerCase()) &&
        !t.description.toLowerCase().includes(filter.search.toLowerCase())
      )
        return false;
      if (filter.status !== "전체" && t.status !== filter.status) return false;
      if (filter.category !== "전체" && t.category !== filter.category) return false;
      if (filter.priority !== "전체" && t.priority !== filter.priority) return false;
      return true;
    });

    return [...result].sort((a, b) => {
      if (filter.sortBy === "dueDate") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      }
      if (filter.sortBy === "priority") {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [todos, filter, questBoard]);

  const counts = useMemo(
    () => ({
      total: todos.length,
      before: todos.filter((t) => t.status === "진행 전").length,
      inProgress: todos.filter((t) => t.status === "진행 중").length,
      done: todos.filter((t) => t.status === "완료").length,
    }),
    [todos]
  );

  return (
    <div className="space-y-6 pb-6">
      {/* Top nav */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl" style={{ backgroundColor: "#5B4FE8" }}>
            <ClipboardList size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-foreground">공부 퀘스트</h1>
            <p className="text-xs text-muted-foreground">
              과제 완료 시 EXP +10 · 집중 시간을 기록하세요!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleImport}
            className="p-2.5 rounded-xl border border-border hover:bg-accent text-muted-foreground transition-all"
            title="불러오기"
          >
            <Upload size={15} />
          </button>
          <button
            onClick={handleExport}
            className="p-2.5 rounded-xl border border-border hover:bg-accent text-muted-foreground transition-all"
            title="내보내기"
          >
            <Download size={15} />
          </button>
          <button
            onClick={() => { setEditingTodo(null); setShowForm(true); }}
            className="flex items-center gap-2 px-4 py-2.5 text-white rounded-xl hover:opacity-90 transition-all"
            style={{ backgroundColor: "#5B4FE8" }}
          >
            <Plus size={15} />
            새 할 일
          </button>
        </div>
      </div>

      {/* Character header */}
      <CharacterHeader
        exp={exp}
        todos={todos}
        expGainId={expGainId}
      />

      {/* Daily Quote Card */}
      <DailyQuoteCard />

      {/* Quick Links */}
      <QuickLinks />

      <StudyStatsSummary todos={todos} />
      
      <DailyQuestBoard
        todos={todos}
        selectedBoard={questBoard}
        onChange={setQuestBoard}
      />

      {/* Filter + list */}
      <div className="space-y-5">
        <FilterBar filter={filter} onChange={setFilter} counts={counts} />

        {filteredTodos.length === 0 ? (
          <div className="text-center py-14 text-muted-foreground">
            <ClipboardList size={36} className="mx-auto mb-3 opacity-25" />
            <p className="whitespace-pre-line text-sm">
              {todos.length === 0
                ? "아직 등록된 할 일이 없어요.\n첫 과제를 추가해서 기린이를 깨워줘요!"
                : "검색 결과가 없습니다."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {filteredTodos.map((todo) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                >
                  <TodoItem
                    todo={todo}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onStatusChange={handleStatusChange}
                    onTimeUpdate={handleTimeUpdate}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {showForm && (
        <TodoForm
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingTodo(null); }}
          initialData={editingTodo}
        />
      )}
    </div>
  );
}
