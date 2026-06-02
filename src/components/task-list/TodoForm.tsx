import { useState, useEffect } from "react";
import { X, Plus, Calendar, Flag, Tag, AlignLeft } from "lucide-react";
import type { Todo, Priority, Category, Status } from "./types";

interface TodoFormProps {
  onSave: (todo: Omit<Todo, "id" | "createdAt">) => void;
  onCancel: () => void;
  initialData?: Todo | null;
}

const PRIORITIES: Priority[] = ["낮음", "보통", "높음"];
const CATEGORIES: Category[] = ["학업", "개인", "팀플", "업무"];
const STATUSES: Status[] = ["진행 전", "진행 중", "완료"];

const priorityColors: Record<Priority, string> = {
  낮음: "bg-blue-100 text-blue-700 border-blue-200",
  보통: "bg-yellow-100 text-yellow-700 border-yellow-200",
  높음: "bg-red-100 text-red-700 border-red-200",
};

const categoryColors: Record<Category, string> = {
  학업: "bg-purple-100 text-purple-700 border-purple-200",
  개인: "bg-green-100 text-green-700 border-green-200",
  팀플: "bg-orange-100 text-orange-700 border-orange-200",
  업무: "bg-cyan-100 text-cyan-700 border-cyan-200",
};

export function TodoForm({ onSave, onCancel, initialData }: TodoFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [dueDate, setDueDate] = useState(initialData?.dueDate ?? "");
  const [priority, setPriority] = useState<Priority>(initialData?.priority ?? "보통");
  const [category, setCategory] = useState<Category>(initialData?.category ?? "개인");
  const [status, setStatus] = useState<Status>(initialData?.status ?? "진행 전");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setDueDate(initialData.dueDate);
      setPriority(initialData.priority);
      setCategory(initialData.category);
      setStatus(initialData.status);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      description,
      dueDate,
      priority,
      category,
      status,
      focusTime: initialData?.focusTime ?? 0,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-foreground">{initialData ? "할 일 수정" : "새 할 일 추가"}</h2>
          <button
            onClick={onCancel}
            className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* 제목 */}
          <div>
            <label className="block text-sm text-muted-foreground mb-1.5">제목 *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="할 일을 입력하세요"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
              required
              autoFocus
            />
          </div>

          {/* 설명 */}
          <div>
            <label className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1.5">
              <AlignLeft size={14} />
              설명
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="상세 내용을 입력하세요 (선택)"
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground resize-none"
            />
          </div>

          {/* 마감일 */}
          <div>
            <label className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1.5">
              <Calendar size={14} />
              마감일
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
            />
          </div>

          {/* 중요도 */}
          <div>
            <label className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1.5">
              <Flag size={14} />
              중요도
            </label>
            <div className="flex gap-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-2 rounded-xl border text-sm transition-all ${
                    priority === p
                      ? priorityColors[p] + " border-current"
                      : "border-border text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* 카테고리 */}
          <div>
            <label className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1.5">
              <Tag size={14} />
              카테고리
            </label>
            <div className="flex gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`flex-1 py-2 rounded-xl border text-sm transition-all ${
                    category === c
                      ? categoryColors[c] + " border-current"
                      : "border-border text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* 상태 */}
          {initialData && (
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">진행 상태</label>
              <div className="flex gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    className={`flex-1 py-2 rounded-xl border text-sm transition-all ${
                      status === s
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 버튼 */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl border border-border text-muted-foreground hover:bg-accent transition-all"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              {initialData ? "수정 완료" : "추가하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
