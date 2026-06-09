import { TimelineItem, SkillItem, ProjectItem, QnAItem } from "./types";

export const personalInfo = {
  name: "김지온",
  englishName: "Jion Kim",
  title: "풀스택 엔지니어 & 크리에이티브 디자이너",
  shortBio: "기술과 디자인의 경계에서 직관적이고 매끄러운 디지털 경험을 만드는 주니어 개발자입니다.",
  detailedBio: 
    "안녕하세요! 저는 코드 한 줄로 세상을 조밀하게 채워나가는 김지온입니다. " +
    "사람들이 사용하는 화면의 사소한 움직임부터 안정적이고 효율적인 백엔드 아키텍처까지, " +
    "기술과 눈으로 보이는 디자인의 조화를 깊이 있게 탐구합니다. " +
    "새로운 문제와 마주했을 때 끝까지 디버깅하고, 확장 가능한 코드로 최적의 솔루션을 구현해 낼 때 가장 깊은 몰입과 행복을 느낍니다.",
  email: "jion50959807@gmail.com",
  phone: "+82 10-1234-5678",
  github: "https://github.com",
  blog: "https://velog.io",
  location: "Seoul, South Korea",
  mbti: "ENFJ (정의로운 사회운동가)",
  interests: ["웹 애니메이션", "UI/UX 디테일", "생산성 도구", "에스프레소 브루잉", "인디 뮤직"],
  values: [
    {
      title: "장인정신 (Craftsmanship)",
      description: "한 픽셀의 오차, 1프레임의 레이턴시도 사용자 경험을 훼손할 수 있다는 믿음으로 디테일에 집착합니다.",
      emoji: "💫"
    },
    {
      title: "확장 가능성 (Scalability)",
      description: "오늘 빠르게 짜는 꼼수 코드보다, 내일의 동료와 미래의 내가 웃을 수 있는 모듈식 클린 코드를 추구합니다.",
      emoji: "📐"
    },
    {
      title: "공감형 협업 (Empathy)",
      description: "팀원의 고충을 귀담아듣고 유저 입장에서 한 번 더 시뮬레이션하며, 기술로 갈등과 불편함을 조율합니다.",
      emoji: "🤝"
    }
  ]
};

export const skillsData: SkillItem[] = [
  // Frontend
  {
    name: "React / React Native",
    category: "Frontend",
    level: 88,
    description: "컴포넌트 생명주기와 렌더링 최적화, 상태 관리 프레임워크를 능숙히 다룹니다.",
    iconName: "React"
  },
  {
    name: "TypeScript",
    category: "Frontend",
    level: 85,
    description: "엄격한 타입을 유연하게 정의하여 런타임 오류가 타이트하게 예방된 코드베이스를 구축합니다.",
    iconName: "TypeScript"
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    level: 90,
    description: "유틸리티 우선 스타일링으로 빠른 프로토타이핑 및 완전히 반응형인 오버레이를 디자인합니다.",
    iconName: "Tailwind"
  },
  {
    name: "Next.js",
    category: "Frontend",
    level: 80,
    description: "SSR/SSG 렌더링 전략과 App Router 최신 패턴을 통해 뛰어난 SEO와 빠른 초기 진입 속도를 확보합니다.",
    iconName: "Next"
  },
  
  // Backend
  {
    name: "Node.js (Express)",
    category: "Backend",
    level: 82,
    description: "RESTful API 서버 구축, 인가/인증 미들웨어 레이어 설계 및 최적화가 가능합니다.",
    iconName: "Node"
  },
  {
    name: "NestJS",
    category: "Backend",
    level: 75,
    description: "의존성 주입과 모듈 구조 중심의 견고하고 완성도 높은 아키텍처 서버를 구축합니다.",
    iconName: "Nest"
  },
  {
    name: "PostgreSQL & Prisma / Drizzle",
    category: "Backend",
    level: 78,
    description: "관계형 데이터베이스 인덱싱 설계 및 ORM 기반의 타입 안정적인 쿼리 조율에 친숙합니다.",
    iconName: "DB"
  },

  // DevOps & Tools
  {
    name: "Git & GitHub Action",
    category: "DevOps & Tools",
    level: 85,
    description: "브랜치 전략(Git Flow)과 함께 CI/CD 파이프라인 자동화를 통해 안정적인 릴리즈를 수행합니다.",
    iconName: "Git"
  },
  {
    name: "Docker / Cloud Run",
    category: "DevOps & Tools",
    level: 70,
    description: "애플리케이션을 컨테이너화하고 GCP/AWS 인프라에 간편하게 가용성 높은 서버를 배포합니다.",
    iconName: "Docker"
  },

  // Design
  {
    name: "Figma (UI/UX Design)",
    category: "Design & UX",
    level: 88,
    description: "컴포넌트 베리언트 사양 설계, 반응형 오토 레이아웃 및 완벽한 프로토타이핑을 가공합니다.",
    iconName: "Figma"
  },
  {
    name: "Interaction & Motion Design",
    category: "Design & UX",
    level: 85,
    description: "화면 전환 감각과 자연스러운 사용자 제스처 반응을 고려한 세련된 모션을 가미합니다.",
    iconName: "Motion"
  }
];

export const timelineData: TimelineItem[] = [
  {
    id: "time-1",
    year: "2024",
    period: "2024.03 ~ 현재",
    title: "프리랜서 및 독립 풀스택 개발자",
    role: "Full-Stack Development & UX/UI Consultant",
    description: "수많은 테크 스타트업과 소상공인들의 실전 디지털 전환을 지원하며 4개 이상의 비즈니스 플랫폼 초기 MVP 모델을 기획부터 배포까지 풀 사이클로 성공적으로 완성했습니다. 특히 웹 성능을 최대 40% 단축하고, 직관적인 사용성을 제공했습니다.",
    tags: ["React", "TypeScript", "Node.js", "Tailwind", "Docker", "GCP"]
  },
  {
    id: "time-2",
    year: "2023",
    period: "2023.01 ~ 2024.02",
    title: "디지털 크리에이티브 솔루션 연구 조직 '픽셀플로우' 공동 창설",
    role: "Lead Front-end Developer & Designer",
    description: "시각 디자인 연출 전문가들과 뜻을 모아 풍부한 컴퓨터 그래픽스 기반의 몰입형 교육용 웹 위젯을 개발했습니다. 사용자 감각 및 반응형 인터랙션 디자인에 집중하며 전년 대비 프로젝트 문의 가입 전환율 180%를 전격 돌파하는 성과를 이끌었습니다.",
    tags: ["TypeScript", "Next.js", "Framer Motion", "Figma Design", "REST API"]
  },
  {
    id: "time-3",
    year: "2021",
    period: "2021.05 ~ 2022.12",
    title: "컴퓨터 소프트웨어 전공 및 융합 디자인 아카데미 수강",
    role: "Dedicated Student & Open-Source Contributor",
    description: "컴퓨터 과학의 펀더멘털(OS, 자료구조, 네트워크)을 단단하게 체득하는 한편, 디자인 팝업 부트캠프를 수석 수료했습니다. 오픈소스 프론트엔드 패키지의 타이핑 버그 수정을 도우며 깃허브 오픈소스 기여의 즐거움을 처음으로 깨달았습니다.",
    tags: ["Data Structure", "JavaScript Basics", "Algorithms", "Git Flow", "HTML5/CSS3"]
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: "proj-1",
    title: "ModuMarket (모두마켓)",
    description: "근거리 주민 간 구매 경쟁력을 증대시켜 불합리한 오프라인 중간 도매 마진을 제거하는 지역 밀착 기반 공동구매 및 중고나눔 커뮤니티 플랫폼입니다.",
    period: "2024.06 ~ 2024.11 (6개월)",
    role: "1인 풀스택 개발 & 제품 기획",
    techStack: ["Next.js (App Router)", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com",
    highlights: [
      "Geolocation API 및 Kakao Map SDK 결합으로 반경 500m 이내 실제 인증된 이웃을 매칭시키는 동적 위치 필터링 기능 탑재",
      "복잡한 실시간 공동구매 펀딩 게이지를 최적화된 컴포넌트 재렌더링 제어를 통해 기존 대비 모바일 사양 속도 35% 가상 개선",
      "Prisma ORM과 선언적 데이터 패칭 구조 설계를 고수하여 타입 충돌률 0% 및 데이터 스키마 유연성 강화"
    ]
  },
  {
    id: "proj-2",
    title: "SpaceMind (스페이스마인드)",
    description: "소음과 복잡한 할 일에 둘러싸인 현대인들을 위해 설계된 싱그러운 앰비언트 사운드 재생 및 인터랙티브 호흡 가이드 웰니스 매니저 웹 애플리케이션입니다.",
    period: "2023.09 ~ 2023.12 (3개월)",
    role: "UI/UX & 인터랙티브 프론트엔드 리드",
    techStack: ["React", "TypeScript", "Framer Motion", "Web Audio API", "Tailwind CSS"],
    highlights: [
      "Web Audio API로 자체 오시레이터 음파를 생성, 유저의 호흡 리듬과 결합하여 실시간 명상 지연 완화 사운드 시너지 연출",
      "Motion을 통한 정속 들이마시기 / 참기 / 내쉬기 3단 원형 확장 파도 애니메이션을 완벽히 하드웨어 가속 처리",
      "사용자가 커스텀 환경음을 저장하고 일일 연속 명상 스트릭을 누적할 수 있도록 브라우저 LocalStorage 지능형 자동 백업 엔진 장착"
    ]
  },
  {
    id: "proj-3",
    title: "Creative Storytelling Portfolio",
    description: "자신의 가치관, 강점, 프로젝트와 여정을 아름답고 입체적으로 전달하기 위한 인터랙티브 자기소개 및 아카이빙 솔루션입니다. (본 웹사이트)",
    period: "2026.06 (진행중)",
    role: "기획, 디자인 & 풀스택 개발",
    techStack: ["React 19", "Vite 6", "Tailwind CSS v4", "Motion", "TypeScript"],
    highlights: [
      "디테일이 돋보이는 모던 미니멀 UI 디자인과 테크니컬한 가독성에 최적화된 Noto Sans + Inter 서체 조합 도입",
      "localStorage 기반의 실시간 가상 롤링 페이퍼(방명록) 게시판 모듈을 수치화된 메모 컴포넌트로 시각 최적화",
      "완벽한 반응형 브레이크포인트 설계 및 모바일 한 손 레이아웃 터치 영역 44px 이상 준수로 모바일부터 데스크톱까지 매끄러운 사용성 충족"
    ]
  }
];

export const qnaData: QnAItem[] = [
  {
    question: "디자이너 출신 개발자로서 가지는 강점은 무엇인가요?",
    answer: "단순히 '화면을 예쁘게 그리는 것'을 넘어, 사용자 인터랙션의 인지적 마찰을 코드 단계에서 파악하고 최소화할 수 있습니다. 개발 공수를 고려해 현실성 있는 시안을 피그마에 즉각 수정하고, 디자인 시스템의 컴포넌트 변수를 코드의 프롭스 구조와 완벽히 1대1 일치시키는 등 협업에서의 커뮤니케이션 비용을 압도적으로 감소시킵니다.",
    category: "역량"
  },
  {
    question: "자신만의 기술 학습 노하우가 있다면?",
    answer: "단순한 튜토리얼 시청에 그치지 않고, 반드시 '내 삶의 사소한 불편을 극복하는 실전 미니 토이 프로젝트'를 구상해 배웁니다. 예를 들어, 크롬 익스텐션이나 나만의 숏컷 키패드를 정적 페이지 환경에 빌드해 보면서 새로운 기술 스택의 특성을 깊게 파고들고, 공식 문서를 끝까지 파헤쳐 예외 케이스까지 직접 다뤄봅니다.",
    category: "학습 스타일"
  },
  {
    question: "일하거나 협업할 때 어떤 동료인가요?",
    answer: "질문하기를 주저하지 않고 소통을 명확하게 돕는 징검다리 같은 존재입니다. 내가 잘 모르는 영역은 솔직히 피드백을 구하고, 동료의 병목 지점을 발견하면 내 업무 범위를 기꺼이 넘겨받아 '팀의 완주'를 최우선으로 생각합니다. 항상 '이해하기 쉬운 커밋 메시지'와 '친절한 문서화'를 습관화하고 있습니다.",
    category: "가치관"
  }
];
