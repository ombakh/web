export type Project = {
  file: string
  title: string
  status: string
  summary: string
  details: string
  stack: string[]
  links: { label: string; href: string }[]
}

export type Experience = {
  role: string
  organization: string
  date: string
  summary: string
  highlights: string[]
}

export const bootLines = [
  'Initializing ombak.dev...',
  'Loading profile data...',
  'Loading projects...',
  'Loading skills...',
  'Starting portfolio interface...',
  'Ready.',
]

export const projects: Project[] = [
  {
    file: 'REMOTE_SENSING.SYS',
    title: 'Autonomous Remote Sensing & Teleoperation System',
    status: 'ACTIVE',
    summary:
      'Real-time teleoperated robotic system for mapping low-visibility and confined environments.',
    details:
      'Integrated 2D LiDAR, dual infrared camera modules, live web controls, camera switching, system monitoring, watchdog timers, and remote command execution across Raspberry Pi and ESP32 hardware.',
    stack: ['Raspberry Pi', 'ESP32', 'LiDAR', 'IR Vision', 'React', 'Embedded Systems'],
    links: [{ label: 'GitHub', href: 'https://github.com/ombakh' }],
  },
  {
    file: 'OAUTH_LIB.PY',
    title: 'OAuth Integration Library',
    status: 'ACTIVE',
    summary:
      'Lightweight Python library for OAuth 2.0 authentication flows in internal enterprise applications.',
    details:
      'Implemented Authorization Code Flow with PKCE and Client Credentials Flow, with secure token handling, modular integration points, Postman-tested flows, and robust error handling.',
    stack: ['Python', 'OAuth 2.0', 'PKCE', 'APIs', 'Postman'],
    links: [{ label: 'GitHub', href: 'https://github.com/ombakh' }],
  },
  {
    file: 'RAG_RISK_BOT.DLL',
    title: 'RAG Risk Prediction Chatbot',
    status: 'ACTIVE',
    summary:
      'Retrieval-augmented chatbot for evaluating project risk using historical project data.',
    details:
      'Led intern collaboration on a chatbot trained around 10,000+ historical project records, with prompt engineering and training-data preparation to reduce hallucinations and improve reliability.',
    stack: ['Python', 'RAG', 'PyTorch', 'Machine Learning', 'Prompt Engineering'],
    links: [{ label: 'GitHub', href: 'https://github.com/ombakh' }],
  },
  {
    file: 'MUSIC_GRID.EXE',
    title: 'Full-Stack Music Visualization App',
    status: 'ACTIVE',
    summary:
      'Interactive album grid builder with external API data, image handling, and custom visual layouts.',
    details:
      'Built a React interface with drag-and-drop albums, a Node.js and Express backend for user data and album metadata, image export, dynamic grid scaling, and custom background styling.',
    stack: ['React', 'Node.js', 'Express', 'APIs', 'JavaScript'],
    links: [{ label: 'GitHub', href: 'https://github.com/ombakh' }],
  },
]

export const skills = [
  'Python',
  'Java',
  'C#',
  'JavaScript',
  'TypeScript',
  'SQL',
  'Node.js',
  'Express',
  'Django',
  '.NET',
  'React',
  'PyTorch',
  'Postman',
  'Git',
  'Active Directory',
  'PowerShell',
  'Raspberry Pi',
  'ESP32',
  'Embedded Systems',
  'Robotics',
  'Machine Learning',
]

export const diagnostics = [
  'Name: Om Bakhshi',
  'Focus: Software development, embedded systems, full stack',
  'Education: B.S. Computer Engineering Technology, Kent State University',
  'Expected graduation: Dec 2026',
  'Location: Kent, OH',
]

export const education = [
  'Kent State University - B.S. Computer Engineering Technology, expected Dec 2026',
  'Cuyahoga Valley Career Center - Certificate of Career Preparation in Programming and Software Development, May 2022',
]

export const experience: Experience[] = [
  {
    role: 'Software Developer Intern',
    organization: 'Progressive Insurance',
    date: 'May 2025 - Aug 2025; May 2026 - Aug 2026',
    summary:
      'Software engineering internship focused on internal tooling, authentication, and applied AI workflows.',
    highlights: [
      'Developed a Python OAuth integration library supporting multiple enterprise auth flows.',
      'Created a retrieval-augmented chatbot for assessing project risk from historical project records.',
      'Integrated secure API token exchange with custom Python modules.',
    ],
  },
  {
    role: 'Desktop Support Technician',
    organization: 'Kent State University',
    date: 'Jan 2024 - May 2026',
    summary:
      'Technology support role for faculty, staff, labs, classrooms, and building launch readiness.',
    highlights: [
      'Provided hardware and software troubleshooting for Crawford College of Business.',
      'Managed setup and maintenance for 300+ lab and classroom devices.',
      'Supported technology preparation for building opening and classroom readiness.',
    ],
  },
]

export const certifications = [
  'Hybrid Server Pro: Core - TestOut',
  'Hybrid Server Pro: Advanced - TestOut',
  'Security Pro - TestOut',
]
