import { assetUrl } from '../utils/assetUrl';

const projectImages = {
  'ai-assistant': [
    { src: assetUrl('assets/images/projects/ai-assistant/a.webp'), alt: 'AI Code Review Assistant — tampilan utama' },
    { src: assetUrl('assets/images/projects/ai-assistant/b.webp'), alt: 'AI Code Review Assistant — fitur interaksi' },
    { src: assetUrl('assets/images/projects/ai-assistant/c.webp'), alt: 'AI Code Review Assistant — output analisis' },
    { src: assetUrl('assets/images/projects/ai-assistant/d.webp'), alt: 'AI Code Review Assistant — dashboard' },
  ],
  'intelligent-search': [
    { src: assetUrl('assets/images/projects/intelligent-search/a.webp'), alt: 'Intelligent Search & Recommendation Engine — tampilan utama' },
    { src: assetUrl('assets/images/projects/intelligent-search/b.webp'), alt: 'Intelligent Search & Recommendation Engine — visualisasi hasil' },
    { src: assetUrl('assets/images/projects/intelligent-search/c.webp'), alt: 'Intelligent Search & Recommendation Engine — panel metrik' },
    { src: assetUrl('assets/images/projects/intelligent-search/d.webp'), alt: 'Intelligent Search & Recommendation Engine — konfigurasi' },
    { src: assetUrl('assets/images/projects/intelligent-search/e.webp'), alt: 'Intelligent Search & Recommendation Engine — laporan' },
    { src: assetUrl('assets/images/projects/intelligent-search/f.webp'), alt: 'Intelligent Search & Recommendation Engine — detail metrik' },
    { src: assetUrl('assets/images/projects/intelligent-search/g.webp'), alt: 'Intelligent Search & Recommendation Engine — ringkasan' },
  ],
};

const projects = [
  {
    id: 'ai-assistant',
    tags: ['Python', 'FastAPI', 'AI/LLM'],
    title: 'AI Code Review Assistant (v1.5)',
    desc: 'AI-powered code review dan automation dashboard yang mengintegrasikan Gemini 2.5 Flash dengan backend FastAPI untuk diagnosis kode secara otonom.',
    details: [
      'Diagnosis otomatis: security review, performance, code style, complexity',
      'AST Python untuk validasi sintaks lokal sebelum analisis AI',
      'Pipeline API & CORS aman untuk .py, .js, .jsx',
    ],
    metric: { value: '4', label: 'jenis review otomatis' },
    github: 'https://github.com/Bule2365/AI-code-review-assistant',
  },
  {
    id: 'intelligent-search',
    tags: ['Python', 'FastAPI', 'Machine Learning'],
    title: 'Intelligent Search & Recommendation Engine',
    desc: 'Search engine dan recommendation system e-commerce hybrid yang menggabungkan BM25, semantic search, dan collaborative filtering.',
    details: [
      'BM25 search latency rata-rata 4,6ms per query pada 2.000 produk',
      'Hybrid search atasi vocabulary mismatch',
      'Cold start fallback tanpa error atau hasil kosong',
    ],
    metric: { value: '4,6ms', label: 'rata-rata per query pada 2.000 produk' },
    github: 'https://github.com/Bule2365/intelligent-search-recommendation-engine',
  },
];

const certificates = [
  {
    id: 1,
    title: 'Build an AI Agent',
    issuer: 'IBM SkillsBuild',
    date: '2026-07-15',
    category: 'ai',
    file: assetUrl('assets/certificates/BuildanAIAgent_Badge20260715-20-m898ux.pdf'),
  },
  {
    id: 2,
    title: 'Claude 101',
    issuer: 'Anthropic Courses',
    date: '2026-07',
    category: 'ai',
    file: assetUrl('assets/certificates/Certificate-of-completion-Claude-101.pdf'),
  },
  {
    id: 3,
    title: 'Intelligent by Design: Build an AI Agent',
    issuer: 'IBM SkillsBuild',
    date: '2026-07-15',
    category: 'ai',
    file: assetUrl('assets/certificates/Intelligent_by_Design_build_and_AI_agent.pdf'),
  },
  {
    id: 4,
    title: 'Introduction to Large Language Models',
    issuer: 'IBM SkillsBuild',
    date: '2026-07-14',
    category: 'ai',
    file: assetUrl('assets/certificates/Introduction_to_Large_Language_Models.pdf'),
  },
  {
    id: 5,
    title: 'Troubleshoot Your Code Using IBM Bob',
    issuer: 'IBM SkillsBuild',
    date: '2026-07-14',
    category: 'ai',
    file: assetUrl('assets/certificates/Lab_Troubleshoot_your_code_using_ibm_bob.pdf'),
  },
  {
    id: 6,
    title: 'AI for Work Productivity',
    issuer: 'MySkill',
    date: '2026-06-12',
    category: 'productivity',
    file: assetUrl('assets/certificates/Muhammad Daffa Aria Firmansyah E-Certificate SC AI for Work Productivity Juni 2026.pdf'),
  },
  {
    id: 7,
    title: 'Introduction to Information Security',
    issuer: 'IBM SkillsBuild',
    date: '2026-06-17',
    category: 'security',
    file: assetUrl('assets/certificates/Certificate-of-Completion-Introduction-to-Information-Security.pdf'),
  },
  {
    id: 8,
    title: 'Microsoft Excel Basic',
    issuer: 'Microsoft',
    date: '2026-06-03',
    category: 'microsoft',
    file: assetUrl('assets/certificates/muhammad-daffa-aria-firmansyah_microsoft-excel-basic.pdf'),
  },
  {
    id: 9,
    title: 'Microsoft Word',
    issuer: 'Microsoft',
    date: '2026-06-17',
    category: 'microsoft',
    file: assetUrl('assets/certificates/muhammad-daffa-aria-firmansyah_microsoft-word.pdf'),
  },
];

const skills = {
  languages: ['Python', 'PHP', 'JavaScript'],
  databases: ['MySQL', 'SQLite', 'PostgreSQL'],
  frameworks: ['FastAPI', 'Laravel', 'Node.js', 'Next.js'],
  tools: ['Git', 'GitHub', 'Docker', 'WSL', 'AI-Assisted Development'],
  focus: ['Backend Development', 'AI & Automation', 'System Design', 'Problem Solving'],
};

const contactInfo = {
  email: 'ariadaffa127@gmail.com',
  phone: '+62 815-2365-1797',
  whatsapp: 'https://wa.me/6281523651797',
  location: 'Cinere, Depok',
  linkedin: 'https://linkedin.com/in/leaddaf',
  github: 'https://github.com/Bule2365',
};

const education = [
  {
    institution: 'Institut Bisnis dan Informatika Kosgoro 1957',
    degree: 'S1 Teknik Informatika',
    period: '2025 – Sekarang',
    note: 'Penerima Beasiswa Prestasi',
  },
  {
    institution: 'Sekolah Menengah Kejuruan Informatika Utama',
    degree: 'Pengembangan Perangkat Lunak dan Gim',
    period: '2022 – 2025',
    note: null,
  },
];

const experience = [
  {
    company: 'PT Prima Gemilang Futuristik',
    role: 'Full Stack Developer (Magang — Flexible Remote)',
    period: 'September 2026 – Sekarang',
    points: [
      'Merancang dan mengembangkan fitur backend serta frontend untuk ekosistem web Indonesian Tennis Society menggunakan Node.js, Next.js, dan PostgreSQL.',
      'Mengidentifikasi, melakukan debugging, dan menyelesaikan bug pada logika bisnis sistem untuk menjaga stabilitas dan performa aplikasi.',
      'Berkolaborasi aktif dengan Project Manager dalam perencanaan sprint untuk memastikan penyelesaian fitur tepat waktu.',
    ],
  },
  {
    company: "Sanggar Seni Saung Dji'ih",
    role: 'Software Engineer & Pengembang Sistem (Proyek Internal)',
    period: 'Agustus 2026 – Sekarang',
    points: [
      'Merancang arsitektur sistem backend dan menentukan tech stack utama untuk digitalisasi ekosistem operasional sanggar.',
      'Membangun fitur manajemen kegiatan dan keanggotaan guna meningkatkan efisiensi operasional dan administrasi organisasi.',
    ],
  },
];

export { projectImages, projects, certificates, skills, contactInfo, education, experience };
