import { Search, SlidersHorizontal } from "lucide-react";
import type { Category, Priority, Status } from "./types";

export interface FilterState {
  search: string;
  status: Status | "전체";
  category: Category | "전체";
  priority: Priority | "전체";
  sortBy: "createdAt" | "dueDate" | "priority";
}

interface FilterBarProps {
  filter: FilterState;
  onChange: (filter: FilterState) => void;
  counts: {
    total: number;
    before: number;
    inProgress: number;
    done: number;
  };
}

const statusOptions: Array<Status | "전체"> = ["전체", "진행 전", "진행 중", "완료"];
const categoryOptions: Array<Category | "전체"> = ["전체", "학업", "개인", "팀플", "업무"];
const priorityOptions: Array<Priority | "전체"> = ["전체", "낮음", "보통", "높음"];

export function FilterBar({ filter, onChange, counts }: FilterBarProps) {
  const update = (partial: Partial<FilterState>) => onChange({ ...filter, ...partial });

  return (
    <div className="space-y-4">
      {/* 통계 카드 */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "전체", value: counts.total, color: "bg-gray-50 border-gray-200", text: "text-gray-700" },
          { label: "진행 전", value: counts.before, color: "bg-slate-50 border-slate-200", text: "text-slate-600" },
          { label: "진행 중", value: counts.inProgress, color: "bg-yellow-50 border-yellow-200", text: "text-yellow-700" },
          { label: "완료", value: counts.done, color: "bg-green-50 border-green-200", text: "text-green-700" },
        ].map((item) => (
          <div
            key={item.label}
            className={`rounded-xl border p-3 text-center ${item.color}`}
          >
            <div className={`text-xl font-semibold ${item.text}`}>{item.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{item.label}</div>
          </div>
        ))}
      </div>

      {/* 검색 */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={filter.search}
          onChange={(e) => update({ search: e.target.value })}
          placeholder="할 일 검색..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* 필터 & 정렬 */}
      <div className="flex flex-wrap gap-2 items-center">
        <SlidersHorizontal size={14} className="text-muted-foreground shrink-0" />

        {/* 상태 필터 */}
        <div className="flex items-center gap-1 bg-accent rounded-xl p-1">
          {statusOptions.map((s) => (
            <button
              key={s}
              onClick={() => update({ status: s })}
              className={`px-3 py-1 rounded-lg text-sm transition-all ${
                filter.status === s
                  ? "bg-white shadow text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* 카테고리 필터 */}
        <select
          value={filter.category}
          onChange={(e) => update({ category: e.target.value as Category | "전체" })}
          className="px-3 py-2 rounded-xl border border-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
        >
          {categoryOptions.map((c) => (
            <option key={c} value={c}>{c === "전체" ? "카테고리 전체" : c}</option>
          ))}
        </select>

        {/* 중요도 필터 */}
        <select
          value={filter.priority}
          onChange={(e) => update({ priority: e.target.value as Priority | "전체" })}
          className="px-3 py-2 rounded-xl border border-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
        >
          {priorityOptions.map((p) => (
            <option key={p} value={p}>{p === "전체" ? "중요도 전체" : p}</option>
          ))}
        </select>

        {/* 정렬 */}
        <select
          value={filter.sortBy}
          onChange={(e) => update({ sortBy: e.target.value as FilterState["sortBy"] })}
          className="px-3 py-2 rounded-xl border border-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer ml-auto"
        >
          <option value="createdAt">생성일순</option>
          <option value="dueDate">마감일순</option>
          <option value="priority">중요도순</option>
        </select>
      </div>
    </div>
  );
}
