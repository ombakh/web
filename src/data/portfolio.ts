export type Project = {
  file: string
  title: string
  status: string
  summary: string
  details: string
  stack: string[]
  links: { label: string; href: string }[]
}

export const bootLines = [
  'Initializing ombak.dev...',
  'Checking display adapter: COBALT_CRT_OK',
  'Loading portfolio kernel modules...',
  'Mounting /projects as corrupted system volume...',
  'Starting developer environment...',
  'OMBAK.DEV loaded successfully',
]

export const projects: Project[] = [
  {
    file: 'NOIR_ROBOT.SYS',
    title: 'Autonomous Robotics Module',
    status: 'DRIVER_LOADED',
    summary: 'Embedded robotics experiments with sensor input, control loops, and resilient hardware-software behavior.',
    details:
      'A cinematic robotics slot for low-level device work: Raspberry Pi workflows, live telemetry, practical control logic, and hardware-minded debugging.',
    stack: ['Python', 'Raspberry Pi', 'GPIO', 'Robotics', 'WebSockets'],
    links: [{ label: 'GitHub', href: 'https://github.com/ombakh' }],
  },
  {
    file: 'TOPSTEREO.EXE',
    title: 'TopStereo',
    status: 'USERSPACE_ACTIVE',
    summary: 'Full-stack audio and community tooling with a clean product surface over a technical backend.',
    details:
      'Built as a real application layer: API design, database state, authentication surfaces, and front-end flows that feel fast under repeated use.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript'],
    links: [{ label: 'GitHub', href: 'https://github.com/ombakh' }],
  },
  {
    file: 'RAG_CHATBOT.DLL',
    title: 'Retrieval Chat System',
    status: 'MEMORY_RESIDENT',
    summary: 'AI-assisted retrieval workflow for turning source material into grounded conversational software.',
    details:
      'A practical exploration of embeddings, retrieval, prompt boundaries, and interfaces that keep AI output useful, inspectable, and grounded.',
    stack: ['Python', 'PyTorch', 'RAG', 'Vector Search', 'AI'],
    links: [{ label: 'GitHub', href: 'https://github.com/ombakh' }],
  },
  {
    file: 'OAUTH_LIB.PY',
    title: 'Authentication Utility',
    status: 'PATCH_VERIFIED',
    summary: 'Reusable OAuth-oriented backend code shaped for secure flows and maintainable integration points.',
    details:
      'A security-conscious module concept covering token exchange, route protection, error states, and predictable developer ergonomics.',
    stack: ['Python', 'OAuth', 'APIs', 'Security', 'Backend'],
    links: [{ label: 'GitHub', href: 'https://github.com/ombakh' }],
  },
]

export const skills = [
  'Python',
  'Java',
  'C#',
  'TypeScript',
  'Node.js',
  'React',
  'MongoDB',
  'Raspberry Pi',
  'WebSockets',
  'PyTorch',
  'Express',
  'Embedded Systems',
  'Robotics',
  'AI-assisted Development',
]

export const diagnostics = [
  '*** STOP: 0x00000050 (0x0MBAKDEV,0x00000001,0xC0DEBEEF,0x00000000)',
  '*** OM_BAKHSHI_PORTFOLIO.EXE - Address 0MBAK517 base at 0000DEV0',
  'Beginning dump of portfolio memory',
  'Physical memory dump complete.',
]
