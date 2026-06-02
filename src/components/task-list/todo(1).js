export type Priority = "낮음" | "보통" | "높음";
export type Category = "학업" | "개인" | "팀플" | "업무";
export type Status = "진행 전" | "진행 중" | "완료";

export interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  category: Category;
  status: Status;
  createdAt: string;
  focusTime: number; // 집중 시간 (분 단위)
}

