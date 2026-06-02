import { ExternalLink, GraduationCap, BookOpen, CalendarDays } from "lucide-react";

const links = [
  {
    title: "울산대",
    description: "학교 홈페이지",
    href: "https://www.ulsan.ac.kr",
    icon: GraduationCap,
  },
  {
    title: "UCLASS",
    description: "강의·과제",
    href: "https://ulms.ulsan.ac.kr",
    icon: BookOpen,
  },
  {
    title: "AI 학사일정",
    description: "학사 일정",
    href: "https://ai.ulsan.ac.kr/ai/1091",
    icon: CalendarDays,
  },
];

export function QuickLinks() {
  return (
    <section className="rounded-2xl border bg-white/90 p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold">빠른 링크</h2>
          <p className="text-xs font-semibold text-gray-500">
            학교 생활 퀘스트에 필요한 바로가기
          </p>
        </div>
      </div>

      <div className="grid gap-2 md:grid-cols-3">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-xl border bg-white px-3 py-3 transition hover:bg-purple-50 hover:text-purple-700"
            >
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
                  <Icon size={17} />
                </div>
                <div>
                  <p className="text-sm font-extrabold">{link.title}</p>
                  <p className="text-[11px] font-semibold text-gray-500">{link.description}</p>
                </div>
              </div>
              <ExternalLink size={14} className="text-gray-400" />
            </a>
          );
        })}
      </div>
    </section>
  );
}
