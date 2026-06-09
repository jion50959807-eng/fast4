import React, { useState, useEffect, useMemo, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Github,
  Compass,
  GraduationCap,
  Code2,
  Palette,
  Wrench,
  Heart,
  MessageSquare,
  Plus,
  Trash2,
  Check,
  ExternalLink,
  Calendar,
  Clock,
  Briefcase,
  Search,
  Filter,
  User,
  ArrowRight,
  Smile
} from "lucide-react";
import { personalInfo, skillsData, timelineData, projectsData, qnaData } from "./data";
import { GuestbookMessage, SkillItem } from "./types";

// Default preset messages for guestbook when empty
const PRESET_MESSAGES: GuestbookMessage[] = [
  {
    id: "preset-1",
    name: "강하람",
    relation: "동료 개발자",
    content: "지온님은 정말 뛰어난 시각적 감각을 가진 개발자이십니다! 컴포넌트 구조도 너무 깔끔하고, 함께 프로젝트 할 때 디자인 가이드를 코드에 반영하시는 능력이 독보적이었습니다. 강추해요! 👍",
    createdAt: "2026-06-08 14:32",
    color: "bg-emerald-50 text-emerald-800 border-emerald-100"
  },
  {
    id: "preset-2",
    name: "이윤식",
    relation: "IT 스타트업 대표",
    content: "풀스택 MVP 프로젝트를 함께 수행했었는데, 짧은 기간 동안 기획 설계부터 서버 배포까지 주도적으로 완성해 주셔서 깜놀했습니다. 피그마 작업을 완벽히 그대로 복사해 온 듯한 디테일에 깊은 감동을 받았네요.",
    createdAt: "2026-06-08 18:45",
    color: "bg-[#E0D7C6]/30 text-[#5A5A40] border-[#E0D7C6]/60 hover:shadow-[#D6D6CF]/30"
  },
  {
    id: "preset-3",
    name: "박서연",
    relation: "테크 리쿠르터",
    content: "훌륭한 상호작용 포트폴리오를 보고 연락을 안 드릴 수가 없었습니다! 디자이너와 엔지니어 사이를 조율하는 역량이 매력적이라 꼭 저희 팀에 모시고 소중한 이야기를 나누어 보고 싶습니다.",
    createdAt: "2026-06-09 03:10",
    color: "bg-[#D6D6CF]/35 text-[#5A5A40] border-[#D6D6CF]/70 hover:shadow-[#D6D6CF]/30"
  }
];

const STICKY_COLORS = [
  { bg: "bg-[#FDFCFA] text-[#2D2D2A] border-[#E6E6E1] hover:shadow-[#D6D6CF]/30", label: "네이처 크림" },
  { bg: "bg-[#E0D7C6]/30 text-[#5A5A40] border-[#E0D7C6]/60 hover:shadow-[#D6D6CF]/30", label: "코지 샌드" },
  { bg: "bg-[#D6D6CF]/35 text-[#5A5A40] border-[#D6D6CF]/70 hover:shadow-[#D6D6CF]/30", label: "가든 세이지" },
  { bg: "bg-[#EAE6DF] text-[#4A4A45] border-[#D1C9BE] hover:shadow-[#D6D6CF]/30", label: "웜 스톤" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"story" | "workspace" | "guestbook">("story");
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>("All");
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [projectSearch, setProjectSearch] = useState<string>("");
  const [projectTagFilter, setProjectTagFilter] = useState<string>("All");
  const [expandedQnA, setExpandedQnA] = useState<number | null>(null);
  
  // Real-time Clock State
  const [timeState, setTimeState] = useState<Date>(new Date());
  
  // Guestbook State
  const [guestMessages, setGuestMessages] = useState<GuestbookMessage[]>([]);
  const [newName, setNewName] = useState("");
  const [newRelation, setNewRelation] = useState("방문자");
  const [newContent, setNewContent] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);
  
  // Contact modal / message sent alert
  const [contactMessageSent, setContactMessageSent] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  // Initialize and load Guestbook from LocalStorage
  useEffect(() => {
    const loaded = localStorage.getItem("jion_portfolio_guestbook");
    if (loaded) {
      try {
        setGuestMessages(JSON.parse(loaded));
      } catch (e) {
        setGuestMessages(PRESET_MESSAGES);
      }
    } else {
      setGuestMessages(PRESET_MESSAGES);
      localStorage.setItem("jion_portfolio_guestbook", JSON.stringify(PRESET_MESSAGES));
    }
  }, []);

  // Update clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeState(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format real-time clock nicely in Korean
  const formattedTime = useMemo(() => {
    return timeState.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });
  }, [timeState]);

  const formattedDate = useMemo(() => {
    return timeState.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long"
    });
  }, [timeState]);

  // Skill Categories list
  const skillCategories = useMemo(() => {
    const cats = new Set(skillsData.map((s) => s.category));
    return ["All", ...Array.from(cats)];
  }, []);

  // Project tags list for filtering
  const projectTags = useMemo(() => {
    const tags = new Set<string>();
    projectsData.forEach((p) => p.techStack.forEach((t) => tags.add(t)));
    return ["All", ...Array.from(tags)];
  }, []);

  // Filtered Skills
  const filteredSkills = useMemo(() => {
    if (selectedSkillCategory === "All") return skillsData;
    return skillsData.filter((s) => s.category === selectedSkillCategory);
  }, [selectedSkillCategory]);

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchSearch =
        project.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
        project.description.toLowerCase().includes(projectSearch.toLowerCase()) ||
        project.techStack.some((t) => t.toLowerCase().includes(projectSearch.toLowerCase()));
      const matchTag = projectTagFilter === "All" || project.techStack.includes(projectTagFilter);
      return matchSearch && matchTag;
    });
  }, [projectSearch, projectTagFilter]);

  // Handle new guestbook submission
  const handleAddMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newContent.trim()) return;

    const newMessage: GuestbookMessage = {
      id: "msg-" + Date.now(),
      name: newName.trim(),
      relation: newRelation,
      content: newContent.trim(),
      createdAt: new Date().toISOString().slice(0, 16).replace("T", " "),
      color: STICKY_COLORS[selectedColor].bg
    };

    const updated = [newMessage, ...guestMessages];
    setGuestMessages(updated);
    localStorage.setItem("jion_portfolio_guestbook", JSON.stringify(updated));

    // Reset input fields
    setNewName("");
    setNewContent("");
    setSelectedColor(0);
  };

  // Handle message deletion
  const handleDeleteMessage = (id: string) => {
    const updated = guestMessages.filter((msg) => msg.id !== id);
    setGuestMessages(updated);
    localStorage.setItem("jion_portfolio_guestbook", JSON.stringify(updated));
  };

  // Handle Contact Form Submit (Simulated with premium response modal)
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactMessageSent(true);
    setContactForm({ name: "", email: "", message: "" });
    setTimeout(() => {
      setContactMessageSent(false);
    }, 5000); // Auto-dismiss contact banner after 5 sec
  };

  return (
    <div className="min-h-screen bg-natural-bg text-natural-text selection:bg-natural-accent selection:text-white relative overflow-x-hidden" id="main-container">
      {/* Top Banner with Clock - Beautiful Warm Glassmorphism */}
      <header className="border-b border-natural-border/60 bg-natural-card/85 backdrop-blur-md sticky top-0 z-40" id="global-header">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-natural-accent animate-pulse" />
            <h1 className="font-serif font-bold tracking-tight text-base text-natural-text flex items-center gap-1" id="header-title">
              Jion<span className="font-sans italic text-natural-accent text-sm">.space</span>
            </h1>
          </div>
          <div className="flex items-center gap-3 text-xs text-natural-muted font-mono" id="header-time-container">
            <Clock size={12} className="text-natural-accent" />
            <span className="hidden sm:inline">{formattedDate}</span>
            <span className="font-semibold bg-natural-sage/20 text-natural-accent px-2.5 py-1 rounded-full border border-natural-border/40" id="header-clock">
              {formattedTime} KST
            </span>
          </div>
        </div>
      </header>

      {/* Subtle Decorative Background Shape from design guideline */}
      <div className="absolute top-24 -right-12 w-80 h-80 bg-natural-sand opacity-30 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-24 -left-12 w-80 h-80 bg-natural-sage opacity-25 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-14 space-y-12 pb-28 text-natural-text" id="main-content">
        {/* Profile Card section - Transformed into 'cream-card' with 'rounded-[40px]' */}
        <section className="bg-natural-card rounded-[40px] border border-natural-border soft-shadow overflow-hidden" id="profile-section">
          <div className="p-6 md:p-11 flex flex-col md:flex-row gap-8 lg:gap-11 items-center">
            {/* Left Column: Sculptured Avatar Shape from design HTML (aspect-[4/5] bg-[#E0D7C6] rounded-[100px] with border-[12px] border-white relative) */}
            <div className="w-full md:w-1/3 flex flex-col items-center text-center space-y-5" id="avatar-container">
              <div className="relative group w-full max-w-[210px] sm:max-w-[230px]">
                <div className="w-full aspect-[4/5] bg-natural-sand rounded-[100px] overflow-hidden soft-shadow border-[12px] border-white relative transition-transform duration-500 group-hover:scale-[1.02]">
                  <img
                    src="/src/assets/images/profile_avatar_1780991323903.png"
                    alt="김지온 프로필 아바타"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    id="profile-avatar-img"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-natural-accent/15 to-transparent mix-blend-multiply pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-[#5A5A40] text-white soft-shadow" id="availability-badge">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  협업 제안 환영
                </span>
                <p className="text-xs text-natural-muted font-mono tracking-wide">{personalInfo.location}</p>
              </div>

              {/* Minimal social links updated to Natural Tones border and circular touch targets */}
              <div className="flex gap-2.5 w-full justify-center" id="social-links">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 text-natural-accent hover:text-white bg-transparent hover:bg-natural-accent border border-natural-border rounded-full flex items-center justify-center transition-all duration-200"
                  title="GitHub 방문"
                  id="link-github"
                >
                  <Github size={16} />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="w-9 h-9 text-natural-accent hover:text-white bg-transparent hover:bg-natural-accent border border-natural-border rounded-full flex items-center justify-center transition-all duration-200"
                  title="이메일 보내기"
                  id="link-email"
                >
                  <Mail size={16} />
                </a>
                <a
                  href={personalInfo.blog}
                  target="_blank"
                  rel="noreferrer"
                  className="h-9 px-4 text-xs text-natural-accent font-medium hover:text-white bg-transparent hover:bg-natural-accent border border-natural-border rounded-full flex items-center gap-1 transition-all duration-200"
                  title="테크 블로그"
                  id="link-blog"
                >
                  <Sparkles size={11} className="text-natural-accent group-hover:text-white" />
                  <span>Velog</span>
                </a>
              </div>
            </div>

            {/* Right Column: Key Details with Georgia Serif Accent */}
            <div className="w-full md:w-2/3 space-y-5" id="bio-details">
              <div className="space-y-2">
                <div className="flex flex-wrap items-baseline gap-2.5">
                  <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-natural-text" id="profile-name">
                    {personalInfo.name} <span className="font-serif italic text-natural-accent font-light">{personalInfo.englishName}</span>
                  </h2>
                </div>
                <div className="h-[2px] w-12 bg-natural-accent" />
                <p className="text-sm uppercase tracking-widest text-natural-muted font-bold font-sans pt-1" id="profile-title">
                  {personalInfo.title}
                </p>
              </div>

              <p className="font-serif text-base md:text-lg text-neutral-700 leading-relaxed italic" id="detailed-bio">
                "{personalInfo.detailedBio}"
              </p>

              {/* Natural Tones custom styled badges of TMI */}
              <div className="pt-2 flex flex-wrap gap-1.5" id="interests-tags">
                <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-natural-sand/40 text-natural-accent font-bold border border-natural-sand">
                  MBTI: {personalInfo.mbti}
                </span>
                {personalInfo.interests.map((interest, i) => (
                  <span key={i} className="text-[11px] px-3 py-1 rounded-lg bg-natural-sage/20 text-natural-text/80 border border-natural-border/65">
                    #{interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick value statements banner with 3 pillars - updated to cream styled divider layout */}
          <div className="bg-natural-sand/15 border-t border-natural-border grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-natural-border text-center" id="value-statements">
            {personalInfo.values.map((v, i) => (
              <div key={i} className="p-6 flex flex-col items-center justify-center space-y-1 text-center" id={`value-card-${i}`}>
                <span className="text-xl mb-1.5">{v.emoji}</span>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#5A5A40] font-sans pt-0.5">{v.title}</h3>
                <p className="text-xs leading-relaxed text-natural-muted font-light max-w-[210px]">{v.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic Section Navigation Bar - Custom Pill-Mask Design */}
        <section className="flex justify-center" id="navigation-tabs-section">
          <div className="bg-natural-sage/20 p-1.5 rounded-full flex w-full max-w-lg border border-natural-border soft-shadow" id="tabs-container">
            <button
              id="tab-story"
              onClick={() => {
                setActiveTab("story");
                setSelectedSkill(null);
              }}
              className={`flex-1 flex py-3 rounded-full text-xs font-medium transition-all duration-300 justify-center items-center gap-2 cursor-pointer ${
                activeTab === "story"
                  ? "bg-[#5A5A40] text-white font-bold soft-shadow"
                  : "text-natural-muted hover:text-natural-text hover:bg-natural-card/50"
              }`}
            >
              <User size={14} />
              <span>내 여정 & Q&A</span>
            </button>
            
            <button
              id="tab-workspace"
              onClick={() => {
                setActiveTab("workspace");
                setSelectedSkill(null);
              }}
              className={`flex-1 flex py-3 rounded-full text-xs font-medium transition-all duration-300 justify-center items-center gap-2 cursor-pointer ${
                activeTab === "workspace"
                  ? "bg-[#5A5A40] text-white font-bold soft-shadow"
                  : "text-natural-muted hover:text-natural-text hover:bg-natural-card/50"
              }`}
            >
              <Code2 size={14} />
              <span>기술 및 프로젝트</span>
            </button>

            <button
              id="tab-guestbook"
              onClick={() => {
                setActiveTab("guestbook");
                setSelectedSkill(null);
              }}
              className={`flex-1 flex py-3 rounded-full text-xs font-medium transition-all duration-300 justify-center items-center gap-2 cursor-pointer ${
                activeTab === "guestbook"
                  ? "bg-[#5A5A40] text-white font-bold soft-shadow"
                  : "text-natural-muted hover:text-natural-text hover:bg-natural-card/50"
              }`}
            >
              <MessageSquare size={14} />
              <span>메시지 방명록</span>
            </button>
          </div>
        </section>

        {/* Tab Contents Component View */}
        <div className="min-h-[440px]" id="tab-viewport">
          <AnimatePresence mode="wait">
            {activeTab === "story" && (
              <motion.div
                key="tab-story-content"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-12"
                id="story-tab-pane"
              >
                {/* Timeline - Styled with beautiful Georgia accent fonts and custom olive lines */}
                <div className="space-y-8" id="timeline-subsection">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-natural-border/75">
                    <Briefcase className="text-natural-accent" size={18} />
                    <h3 className="font-serif text-2xl font-normal text-natural-text">이력 및 성장 곡선 (Timeline)</h3>
                  </div>

                  <div className="relative pl-7 border-l-2 border-natural-sand space-y-10" id="timeline-container">
                    {timelineData.map((item, index) => (
                      <div key={item.id} className="relative group" id={`timeline-item-${index}`}>
                        {/* Dot in Natural Accent Green */}
                        <div className="absolute -left-[36px] top-1.5 w-4.5 h-4.5 rounded-full border-4 border-[#FDFCFA] bg-[#5A5A40] transition-all group-hover:scale-125 group-hover:bg-[#E0D7C6] shadow-md" />
                        
                        <div className="space-y-1.5">
                          <span className="inline-flex text-[11px] font-bold text-natural-accent font-mono tracking-wider">
                            {item.period}
                          </span>
                          <h4 className="font-serif text-lg font-normal text-natural-text group-hover:text-natural-accent transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs font-mono font-semibold text-natural-muted">{item.role}</p>
                          <p className="text-neutral-600 text-xs md:text-sm leading-relaxed pt-1.5 max-w-4xl">
                            {item.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-1.5 pt-3">
                            {item.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-natural-sage/20 text-natural-accent border border-natural-sage/30">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Q&A Accordion - Clean cream structure */}
                <div className="space-y-8 pt-4" id="qna-subsection">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-natural-border/75">
                    <Smile className="text-natural-accent" size={18} />
                    <h3 className="font-serif text-2xl font-normal text-natural-text">자서전적 인터뷰 Q&A</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4" id="qna-list-container">
                    {qnaData.map((item, index) => {
                      const isOpen = expandedQnA === index;
                      return (
                        <div
                          key={index}
                          className="bg-natural-card border border-natural-border rounded-2xl md:rounded-3xl overflow-hidden soft-shadow transition-all duration-300 hover:border-natural-sage"
                          id={`qna-item-${index}`}
                        >
                          <button
                            id={`qna-btn-${index}`}
                            onClick={() => setExpandedQnA(isOpen ? null : index)}
                            className="w-full px-6 py-4.5 text-left flex justify-between items-center bg-natural-card transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-md bg-[#5A5A40]/10 text-natural-accent font-semibold">
                                {item.category}
                              </span>
                              <span className="font-serif text-sm md:text-[15px] font-normal text-natural-text pr-3">
                                {item.question}
                              </span>
                            </div>
                            <span className="text-xs text-natural-accent font-mono transition-transform duration-200 select-none">
                              {isOpen ? "닫기 ▲" : "펼치기 ▼"}
                            </span>
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-neutral-600 leading-relaxed border-t border-natural-border/50 bg-[#F5F5F0]/30 font-light">
                                  {item.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Simulated Contact Form inside gorgeous tactile cream-card */}
                <div className="bg-natural-card border border-natural-border rounded-[32px] md:rounded-[40px] p-6 md:p-10 space-y-7 soft-shadow" id="story-contact-subsection">
                  <div className="space-y-2 text-center md:text-left">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-natural-muted block">Selected Channel</span>
                    <h3 className="font-serif text-2xl font-normal text-natural-text flex items-center justify-center md:justify-start gap-2">
                      <Mail size={18} className="text-natural-accent" />
                      <span>메시지 남기기 (이메일 제안)</span>
                    </h3>
                    <p className="text-xs text-natural-muted leading-relaxed">
                      김지온 개발자와의 협업, 티타임, 기술 면접 제의를 환영합니다. 아래 제안 내용을 안전하게 입력해 주세요.
                    </p>
                  </div>

                  <form onSubmit={handleContactSubmit} className="space-y-4" id="contact-form-widget">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="contact-name" className="text-xs font-semibold text-natural-accent font-serif tracking-wide block">성함 / 제안 파트너명</label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="성함 혹은 기업명을 입력해 주세요"
                          className="w-full px-4 py-3 rounded-xl text-xs md:text-sm border border-natural-border bg-natural-bg/50 focus:border-natural-accent focus:bg-white focus:ring-1 focus:ring-natural-accent transition-all outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="contact-email" className="text-xs font-semibold text-natural-accent font-serif tracking-wide block">회신받으실 이메일</label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="contact@e-mail.com"
                          className="w-full px-4 py-3 rounded-xl text-xs md:text-sm border border-natural-border bg-natural-bg/50 focus:border-natural-accent focus:bg-white focus:ring-1 focus:ring-natural-accent transition-all outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contact-message" className="text-xs font-semibold text-natural-accent font-serif tracking-wide block">프로젝트 협업 안건 및 메시지</label>
                      <textarea
                        id="contact-message"
                        required
                        rows={3.5}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="김지온 개발자에게 전달하고 싶으신 비즈니스 제안 내용 혹은 가치를 간략하게 작성해 주세요."
                        className="w-full px-4 py-3 rounded-xl text-xs md:text-sm border border-natural-border bg-natural-bg/50 focus:border-natural-accent focus:bg-white focus:ring-1 focus:ring-natural-accent transition-all outline-none resize-none"
                      />
                    </div>

                    <button
                      id="btn-contact-submit"
                      type="submit"
                      className="w-full py-3.5 bg-[#5A5A40] hover:bg-natural-accent-hover text-white text-xs font-semibold rounded-full uppercase tracking-widest soft-shadow transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>안전하게 실시간 제안 전달하기</span>
                      <ArrowRight size={14} />
                    </button>
                  </form>

                  <AnimatePresence>
                    {contactMessageSent && (
                      <motion.div
                        id="contact-success-toast"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-natural-card border-2 border-[#5A5A40]/40 text-natural-text p-5 rounded-2xl flex items-start gap-3 text-xs md:text-sm font-medium soft-shadow"
                      >
                        <Check size={18} className="text-[#5A5A40] shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <p className="font-serif font-bold text-natural-accent text-sm">성공적으로 발송되었습니다!</p>
                          <p className="text-xs text-natural-muted leading-relaxed font-light">
                            작성해주신 안건과 연락처 정보가 로컬 스택에 안전하게 보관되었습니다. 확인하는 대로 김지온 개발자가 즉시 피드백을 전달해 드리겠습니다.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {activeTab === "workspace" && (
              <motion.div
                key="tab-workspace-content"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-12"
                id="workspace-tab-pane"
              >
                {/* Embedded Skills Section */}
                <div className="space-y-6" id="skills-catalog-subsection">
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-3 pb-2 border-b border-natural-border/75">
                    <div className="flex items-center gap-2.5">
                      <Wrench className="text-natural-accent" size={18} />
                      <h3 className="font-serif text-2xl font-normal text-natural-text">기술 스택과 장인정신 (Skills)</h3>
                    </div>
                    <span className="text-[11px] text-natural-muted font-sans pb-0.5">⚡ 각 블록을 클릭하여 세부 실무 역량을 조회해 보세요.</span>
                  </div>

                  {/* Skills category filter tags */}
                  <div className="flex flex-wrap gap-2" id="skill-category-filters">
                    {skillCategories.map((cat) => (
                      <button
                        key={cat}
                        id={`btn-skill-cat-${cat}`}
                        onClick={() => {
                          setSelectedSkillCategory(cat);
                          setSelectedSkill(null);
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer border ${
                          selectedSkillCategory === cat
                            ? "bg-[#5A5A40] text-white border-[#5A5A40] soft-shadow"
                            : "bg-natural-card text-natural-muted border-natural-border hover:bg-natural-sans/20 hover:text-natural-text"
                        }`}
                      >
                        {cat === "All" ? "전체 보기" : cat}
                      </button>
                    ))}
                  </div>

                  {/* Grid layout of skills with tactile cream cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5" id="skills-grid">
                    {filteredSkills.map((skill, index) => {
                      const isSelected = selectedSkill?.name === skill.name;
                      return (
                        <button
                          key={index}
                          id={`btn-skill-item-${index}`}
                          onClick={() => setSelectedSkill(isSelected ? null : skill)}
                          className={`p-5 rounded-2xl border text-left flex flex-col justify-between h-34 transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? "bg-[#5A5A40] border-[#5A5A40] text-white shadow-md ring-2 ring-[#5A5A40]/30"
                              : "bg-[#FDFCFA] border-natural-border text-natural-text hover:border-natural-sage hover:shadow-xs"
                          }`}
                        >
                          <div className="space-y-1.5 w-full">
                            <span className={`text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded font-bold ${
                              isSelected ? "bg-white/20 text-white" : "bg-natural-sage/20 text-natural-accent"
                            }`}>
                              {skill.category}
                            </span>
                            <h4 className="font-serif text-sm font-semibold tracking-tight pt-1 truncate">{skill.name}</h4>
                          </div>

                          <div className="w-full space-y-2">
                            {/* Score Bar with beautiful tones */}
                            <div className="h-1.5 w-full rounded-full bg-natural-sage/30 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${isSelected ? "bg-white" : "bg-[#5A5A40]"}`}
                                style={{ width: `${skill.level}%` }}
                              />
                            </div>
                            <span className="text-[10px] font-mono block text-right font-bold opacity-85">{skill.level}%</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Skill focus window */}
                  <AnimatePresence mode="wait">
                    {selectedSkill && (
                      <motion.div
                        id="skill-focus-card"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="bg-natural-sand/25 border-2 border-natural-sage/60 p-6 rounded-2xl flex items-start gap-4"
                      >
                        <div className="p-3 bg-natural-card rounded-xl border border-natural-border text-[#5A5A40] shrink-0 soft-shadow">
                          {selectedSkill.category === "Frontend" ? <Compass size={20} /> :
                           selectedSkill.category === "Backend" ? <Code2 size={20} /> :
                           selectedSkill.category === "Design & UX" ? <Palette size={20} /> : <Wrench size={20} />}
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#5A5A40] font-bold">{selectedSkill.category} 실무 가이드</span>
                          <h3 className="font-serif text-base font-semibold text-natural-text flex items-center gap-2">
                            {selectedSkill.name} <span className="font-mono text-xs text-natural-accent">({selectedSkill.level}%)</span>
                          </h3>
                          <p className="text-xs md:text-sm text-neutral-600 leading-relaxed pt-1.5 font-light">
                            {selectedSkill.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Projects Section */}
                <div className="space-y-6 pt-6 border-t border-natural-border/75" id="projects-subsection">
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <GraduationCap className="text-natural-accent" size={18} />
                      <h3 className="font-serif text-2xl font-normal text-natural-text">대표 프로젝트 포트폴리오 (Works)</h3>
                    </div>

                    {/* Integrated Search Filter styling with Natural theme */}
                    <div className="relative max-w-xs w-full" id="search-input-wrapper">
                      <Search className="absolute left-3 top-3 text-natural-accent" size={14} />
                      <input
                        id="project-search-input"
                        type="text"
                        value={projectSearch}
                        onChange={(e) => setProjectSearch(e.target.value)}
                        placeholder="기술 스택, 프로젝트명 검색..."
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs border border-natural-border bg-natural-card placeholder:text-natural-muted focus:outline-hidden focus:border-natural-accent focus:ring-1 focus:ring-natural-accent transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* Project specialized Tag filters */}
                  <div className="flex flex-wrap gap-1.5 items-center" id="project-tags-navigation">
                    <Filter size={11} className="text-natural-accent mr-1 shrink-0" />
                    {projectTags.map((tag) => (
                      <button
                        key={tag}
                        id={`btn-proj-tag-${tag}`}
                        onClick={() => setProjectTagFilter(tag)}
                        className={`px-3 py-1 text-[10px] font-mono rounded-lg transition-all border cursor-pointer ${
                          projectTagFilter === tag
                            ? "bg-[#5A5A40] text-white border-[#5A5A40] font-bold"
                            : "bg-natural-card text-natural-muted border-natural-border hover:bg-natural-sage/20 hover:text-natural-text"
                        }`}
                      >
                        {tag === "All" ? "전체 기술" : tag}
                      </button>
                    ))}
                  </div>

                  {/* Portfolio Bento Grid/Cards list */}
                  <div className="space-y-8" id="projects-list-container">
                    {filteredProjects.length > 0 ? (
                      filteredProjects.map((project, idx) => (
                        <div
                          key={project.id}
                          id={`project-card-${idx}`}
                          className="bg-natural-card border border-natural-border rounded-[32px] md:rounded-[40px] p-6 md:p-9 space-y-6 shadow-xs hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-natural-border/50 pb-4">
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono text-natural-muted block tracking-widest uppercase">{project.period}</span>
                              <h4 className="font-serif text-xl font-normal text-natural-text flex items-center gap-2">
                                {project.title}
                              </h4>
                            </div>

                            <div className="flex gap-2" id={`project-links-${idx}`}>
                              {project.github && (
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-4 py-2 text-[11px] bg-natural-sage/15 hover:bg-natural-sage/35 border border-natural-border rounded-full text-natural-accent font-bold flex items-center gap-1.5 transition-all"
                                  id={`github-link-${idx}`}
                                >
                                  <Github size={12} />
                                  <span>Repository</span>
                                </a>
                              )}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="inline-flex text-[11px] font-semibold text-natural-accent bg-natural-sand/35 px-2.5 py-0.5 rounded-md border border-natural-sand/50">
                              담당 역할: {project.role}
                            </div>
                            <p className="text-neutral-700 text-xs md:text-sm leading-relaxed" id={`p-desc-${idx}`}>{project.description}</p>
                          </div>

                          {/* List of Highlights inside beautiful warm backdrop area */}
                          <div className="space-y-3 bg-[#E0D7C6]/20 border border-[#E0D7C6]/40 p-5 rounded-2xl" id={`project-highlights-${idx}`}>
                            <p className="text-[10px] leading-none font-bold text-natural-accent font-mono tracking-widest uppercase mb-1">핵심 연출 및 아키텍처 공헌</p>
                            <ul className="space-y-2.5 text-xs text-neutral-600">
                              {project.highlights.map((hlt, hitidx) => (
                                <li key={hitidx} className="leading-relaxed flex items-start gap-2 text-neutral-750">
                                  <span className="text-[#5A5A40] mt-1 shrink-0 font-bold text-sm">✓</span>
                                  <span>{hlt}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Tags used in project */}
                          <div className="flex flex-wrap gap-1.5 pt-1" id={`project-techs-${idx}`}>
                            {project.techStack.map((tech) => (
                              <span key={tech} className="text-[10px] font-mono px-3 py-1 rounded-md bg-natural-sage/20 text-natural-accent border border-natural-sage/30">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-16 bg-natural-card rounded-3xl border border-natural-border" id="empty-projects-state">
                        <p className="text-xs font-mono text-natural-muted">"{projectSearch}" 검색 기준이나 선택하신 세부 태그에 매칭되는 결과가 존재하지 않습니다.</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "guestbook" && (
              <motion.div
                key="tab-guestbook-content"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-10"
                id="guestbook-tab-pane"
              >
                {/* Guestbook input form */}
                <div className="bg-natural-card border border-natural-border rounded-[32px] md:rounded-[40px] p-6 md:p-9 space-y-6 soft-shadow" id="guestbook-writer-card">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#8E8E85] block">Interactive Board</span>
                    <h3 className="font-serif text-2xl font-normal text-natural-text flex items-center gap-2">
                      <Sparkles className="text-natural-accent" size={18} />
                      <span>대화형 방명록 (가상 롤링페이퍼)</span>
                    </h3>
                    <p className="text-xs text-natural-muted leading-relaxed">
                      지온님과의 비즈니스 교류, 응원 인사, 건의 안건을 가상의 스티커로 작성해보세요. 브라우저 localStorage에 실시간 바인딩 처리됩니다.
                    </p>
                  </div>

                  <form onSubmit={handleAddMessage} className="space-y-5" id="guestbook-form">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="guestbook-name" className="text-xs font-semibold text-natural-accent font-serif tracking-wide block">방문인 성명</label>
                        <input
                          id="guestbook-name"
                          type="text"
                          required
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          placeholder="실명 혹은 닉네임 입력"
                          className="w-full px-4 py-3 rounded-xl text-xs md:text-sm border border-natural-border bg-natural-bg/50 focus:border-natural-accent focus:bg-white focus:ring-1 focus:ring-natural-accent transition-all outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="guestbook-relation" className="text-xs font-semibold text-natural-accent font-serif tracking-wide block">관계구분 사양</label>
                        <select
                          id="guestbook-relation"
                          value={newRelation}
                          onChange={(e) => setNewRelation(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl text-xs md:text-sm border border-natural-border bg-natural-bg/50 focus:border-natural-accent focus:bg-white focus:ring-1 focus:ring-natural-accent transition-all outline-none font-sans"
                        >
                          <option value="동료">동료 개발자/디자이너</option>
                          <option value="면접관">테크 리쿠르터/면접관</option>
                          <option value="클라이언트">외주 위뢰 클라이언트</option>
                          <option value="친구">친한 동기 / 지인</option>
                          <option value="방문자">호기심 많은 웹 방문자</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="guestbook-content" className="text-xs font-semibold text-natural-accent font-serif tracking-wide block">스티커 피드백 본문</label>
                      <textarea
                        id="guestbook-content"
                        required
                        rows={3}
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        placeholder="이곳에 지온님에게 전달하는 격려와 이야기를 자유롭게 적어 보세요!"
                        className="w-full px-4 py-3 rounded-xl text-xs md:text-sm border border-natural-border bg-natural-bg/50 focus:border-natural-accent focus:bg-white focus:ring-1 focus:ring-natural-accent transition-all outline-none resize-none"
                      />
                    </div>

                    {/* Color picker selector */}
                    <div className="space-y-2.5" id="color-picker-wrapper">
                      <span className="text-xs font-semibold text-natural-accent font-serif tracking-wide block">감성 스티커 백그라운드</span>
                      <div className="flex flex-wrap gap-2">
                        {STICKY_COLORS.map((col, cIdx) => (
                          <button
                            key={cIdx}
                            id={`btn-color-${cIdx}`}
                            type="button"
                            onClick={() => setSelectedColor(cIdx)}
                            className={`px-4 py-2 text-xs rounded-xl font-medium border transition-all cursor-pointer ${col.bg} ${
                              selectedColor === cIdx ? "ring-2 ring-[#5A5A40] font-bold scale-[1.03] shadow-xs" : "opacity-80"
                            }`}
                          >
                            {col.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      id="btn-guestbook-submit"
                      type="submit"
                      className="w-full py-3.5 bg-[#5A5A40] hover:bg-natural-accent-hover text-white text-xs font-semibold rounded-full uppercase tracking-widest soft-shadow transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>메시지 보드에 스터디 스티커 게시하기</span>
                    </button>
                  </form>
                </div>

                {/* Stored list of posted stickies */}
                <div className="space-y-5" id="guestbook-board-subsection">
                  <div className="flex justify-between items-center pb-2 border-b border-natural-border/60" id="board-header">
                    <p className="font-serif text-sm font-bold text-natural-accent tracking-wide">실시간 스티커 담벼락 ({guestMessages.length}개)</p>
                    <button
                      id="btn-reset-messages"
                      onClick={() => {
                        if (confirm("방명록을 기본 프리셋 구조로 복원하시겠습니까? (새로 등록한 글은 삭제됩니다)")) {
                          setGuestMessages(PRESET_MESSAGES);
                          localStorage.setItem("jion_portfolio_guestbook", JSON.stringify(PRESET_MESSAGES));
                        }
                      }}
                      className="text-[10px] font-mono tracking-wider text-natural-accent font-semibold bg-natural-sage/25 border border-natural-border hover:bg-natural-sage/40 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                    >
                      기본 복원
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5" id="stickies-board">
                    <AnimatePresence>
                      {guestMessages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className={`p-5 rounded-2xl border flex flex-col justify-between h-[175px] shadow-xs relative group transition-all duration-300 hover:shadow-md ${msg.color}`}
                        >
                          <div className="space-y-1.5 overflow-hidden">
                            <div className="flex justify-between items-center">
                              <span className="text-[9px] uppercase font-mono tracking-widest font-extrabold opacity-70">
                                {msg.relation}
                              </span>
                              
                              <button
                                id={`btn-delete-${msg.id}`}
                                onClick={() => handleDeleteMessage(msg.id)}
                                className="opacity-0 group-hover:opacity-100 p-1 text-natural-accent/50 hover:text-red-600 rounded transition-all cursor-pointer"
                                title="방명록 삭제"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                            <p className="text-xs font-sans font-light leading-relaxed whitespace-pre-line line-clamp-4">
                              {msg.content}
                            </p>
                          </div>

                          <div className="flex justify-between items-end border-t border-black/5 pt-2 mt-2" id={`sticky-footer-${msg.id}`}>
                            <span className="font-serif font-bold text-xs">{msg.name}</span>
                            <span className="text-[9px] font-mono opacity-50">{msg.createdAt}</span>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Standard Natural Tones aligned Footer */}
      <footer className="border-t border-natural-border bg-natural-card py-14 text-center text-xs text-natural-muted" id="global-footer">
        <div className="max-w-4xl mx-auto px-6 space-y-4">
          <p className="font-mono">Copyright © 2026 {personalInfo.englishName}. All rights reserved.</p>
          <div className="flex justify-center gap-3 text-[10px] uppercase tracking-wider font-bold text-[#5A5A40]/70">
            <span>Powered by React 19 & Tailwind v4</span>
            <span>•</span>
            <span>Natural Tones Theme Edition</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
