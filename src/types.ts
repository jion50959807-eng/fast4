export interface TimelineItem {
  id: string;
  year: string;
  period: string;
  title: string;
  role: string;
  description: string;
  tags: string[];
}

export interface SkillItem {
  name: string;
  category: "Frontend" | "Backend" | "DevOps & Tools" | "Design & UX";
  level: number; // 0 to 100
  description: string;
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  period: string;
  role: string;
  techStack: string[];
  link?: string;
  github?: string;
  highlights: string[];
}

export interface GuestbookMessage {
  id: string;
  name: string;
  relation: string; // e.g., "동료", "친구", "면접관", "방문자"
  content: string;
  createdAt: string;
  color: string; // Tailwind background color class
}

export interface QnAItem {
  question: string;
  answer: string;
  category: string;
}
