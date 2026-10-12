import { assetUrl } from '../utils/assetUrl';

const projectImages = {
  'ai-assistant': [
    { src: assetUrl('assets/images/projects/ai-assistant/a.webp'), alt: 'AI Code Review Assistant — tampilan utama' },
    { src: assetUrl('assets/images/projects/ai-assistant/b.webp'), alt: 'AI Code Review Assistant — fitur interaksi' },
    { src: assetUrl('assets/images/projects/ai-assistant/c.webp'), alt: 'AI Code Review Assistant — output analisis' },
    { src: assetUrl('assets/images/projects/ai-assistant/d.webp'), alt: 'AI Code Review Assistant — dashboard' },
  ],
  'realtime-analytics': [
    { src: assetUrl('assets/images/projects/realtime-analytics/a.webp'), alt: 'Intelligent Search & Recommendation Engine — tampilan utama' },
    { src: assetUrl('assets/images/projects/realtime-analytics/b.webp'), alt: 'Intelligent Search & Recommendation Engine — visualisasi hasil' },
    { src: assetUrl('assets/images/projects/realtime-analytics/c.webp'), alt: 'Intelligent Search & Recommendation Engine — monitoring panel' },
    { src: assetUrl('assets/images/projects/realtime-analytics/d.webp'), alt: 'Intelligent Search & Recommendation Engine — konfigurasi' },
    { src: assetUrl('assets/images/projects/realtime-analytics/e.webp'), alt: 'Intelligent Search & Recommendation Engine — laporan' },
    { src: assetUrl('assets/images/projects/realtime-analytics/f.webp'), alt: 'Intelligent Search & Recommendation Engine — detail metrik' },
    { src: assetUrl('assets/images/projects/realtime-analytics/g.webp'), alt: 'Intelligent Search & Recommendation Engine — ringkasan' },
  ],
};

const certificates = [
  {
    id: 1,
    title: 'Build an AI Agent',
    issuer: 'IBM SkillsBuild',
    date: 'Juli 2026',
    category: 'ai',
    image: assetUrl('assets/certificates/BuildanAIAgent_Badge20260715-20-m898ux.pdf'),
  },
  {
    id: 2,
    title: 'Claude 101',
    issuer: 'Anthropic Courses',
    date: null,
    category: 'ai',
    image: assetUrl('assets/certificates/Certificate-of-completion-Claude-101.pdf'),
  },
  {
    id: 3,
    title: 'Intelligent by Design: Build an AI Agent',
    issuer: 'IBM SkillsBuild',
    date: null,
    category: 'ai',
    image: assetUrl('assets/certificates/Intelligent_by_Design_build_and_AI_agent.pdf'),
  },
  {
    id: 4,
    title: 'Introduction to Large Language Models',
    issuer: 'IBM SkillsBuild',
    date: null,
    category: 'ai',
    image: assetUrl('assets/certificates/Introduction_to_Large_Language_Models.pdf'),
  },
  {
    id: 5,
    title: 'Troubleshoot Your Code Using IBM Bob',
    issuer: 'IBM SkillsBuild',
    date: null,
    category: 'ai',
    image: assetUrl('assets/certificates/Lab_Troubleshoot_your_code_using_ibm_bob.pdf'),
  },
  {
    id: 6,
    title: 'AI for Work Productivity',
    issuer: 'MySkill',
    date: 'Juni 2026',
    category: 'productivity',
    image: assetUrl('assets/certificates/Muhammad Daffa Aria Firmansyah E-Certificate SC AI for Work Productivity Juni 2026.pdf'),
  },
  {
    id: 7,
    title: 'Introduction to Information Security',
    issuer: 'IBM SkillsBuild',
    date: null,
    category: 'security',
    image: assetUrl('assets/certificates/Certificate-of-Completion-Introduction-to-Information-Security.pdf'),
  },
  {
    id: 8,
    title: 'Microsoft Excel Basic',
    issuer: 'Microsoft',
    date: null,
    category: 'microsoft',
    image: assetUrl('assets/certificates/muhammad-daffa-aria-firmansyah_microsoft-excel-basic.pdf'),
  },
  {
    id: 9,
    title: 'Microsoft Word',
    issuer: 'Microsoft',
    date: null,
    category: 'microsoft',
    image: assetUrl('assets/certificates/muhammad-daffa-aria-firmansyah_microsoft-word.pdf'),
  },
];

const skills = {
  languages: ['Python', 'PHP', 'JavaScript'],
  databases: ['MySQL', 'SQLite'],
  frameworks: ['FastAPI', 'Laravel', 'Django', 'Node.js'],
  tools: ['Git', 'GitHub', 'VS Code', 'WSL'],
  focus: ['Backend Development', 'AI & Automation', 'System Design', 'Problem Solving'],
};

const contactInfo = {
  email: 'ariadaffa127@gmail.com',
  linkedin: 'https://linkedin.com/in/leaddaf',
  github: 'https://github.com/Bule2365',
};

export { projectImages, certificates, skills, contactInfo };