import { ExternalLink, GraduationCap, BookOpen, CalendarDays } from "lucide-react";

const links = [
  {
    title: "울산대학교",
    description: "학교 홈페이지 바로가기",
    href: "https://www.ulsan.ac.kr",
    icon: GraduationCap,
  },
  {
    title: "UCLASS",
    description: "강의 자료와 과제 확인",
    href: "https://ulms.ulsan.ac.kr",
    icon: BookOpen,
  },
  {
    title: "학사일정",
    description: "중요 일정 확인",
    href: "https://ai.ulsan.ac.kr/ai/1091",
    icon: CalendarDays,
  },
];

export function QuickLinks() {
  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">빠른 링크</h2>
          <p className="text-sm text-gray-500">학교 생활에 필요한 사이트를 바로 열 수 있어요.</p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-xl border p-4 transition hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-purple-50 p-2 text-purple-600">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="font-semibold">{link.title}</p>
                  <p className="text-xs text-gray-500">{link.description}</p>
                </div>
              </div>
              <ExternalLink size={16} className="text-gray-400" />
            </a>
          );
        })}
      </div>
    </section>
  );
}
