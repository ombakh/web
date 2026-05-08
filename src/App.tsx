import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Code2,
  Clipboard,
  ExternalLink,
  Mail,
  Pause,
  Power,
  Terminal,
  UserRound,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { bootLines, diagnostics, projects, skills, type Project } from './data/portfolio'

const terminalEase = [0.22, 1, 0.36, 1] as const

function useKeyboardClickSound(enabled: boolean) {
  const audioRef = useRef<AudioContext | null>(null)

  return () => {
    if (!enabled) return

    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return

    const context = audioRef.current ?? new AudioContextClass()
    audioRef.current = context

    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(720 + Math.random() * 160, context.currentTime)
    gain.gain.setValueAtTime(0.025, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.035)
    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.start()
    oscillator.stop(context.currentTime + 0.04)
  }
}

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setVisibleLines((current) => {
        if (current >= bootLines.length) {
          window.clearInterval(interval)
          window.setTimeout(onComplete, 650)
          return current
        }
        return current + 1
      })
    }, 520)

    return () => window.clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0000aa] px-5 font-mono text-white"
      exit={{ opacity: 0, filter: 'blur(12px)' }}
      transition={{ duration: 0.7, ease: terminalEase }}
    >
      <div className="crt-shell w-full max-w-3xl border border-white/60 bg-[#0000aa]/80 p-5 shadow-[0_0_80px_rgba(110,190,255,0.38)] sm:p-8">
        <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-white/70">
          <Power size={15} />
          BIOS_REVISION_0MBAK.05
        </div>
        <div className="space-y-3 text-sm leading-relaxed sm:text-base">
          {bootLines.slice(0, visibleLines).map((line) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              className="boot-line"
            >
              {line}
            </motion.p>
          ))}
          <span className="cursor-block ml-1 inline-block h-5 w-2 bg-white align-middle" />
        </div>
      </div>
    </motion.div>
  )
}

function SystemButton({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode
  href?: string
  onClick?: () => void
}) {
  const className =
    'system-button inline-flex items-center justify-center gap-2 border border-white/80 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-[#0000aa] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0000aa]'

  if (href) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    )
  }

  return (
    <button className={className} type="button" onClick={onClick}>
      {children}
    </button>
  )
}

function SectionFrame({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: React.ReactNode
}) {
  return (
    <motion.section
      id={id}
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-24"
      initial={{ opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.72, ease: terminalEase }}
    >
      <div className="mb-8 flex items-center gap-3 border-b border-white/35 pb-3 font-mono text-xs uppercase tracking-[0.22em] text-white/70">
        <Terminal size={16} />
        {label}
      </div>
      {children}
    </motion.section>
  )
}

function Hero({ soundEnabled, toggleSound }: { soundEnabled: boolean; toggleSound: () => void }) {
  return (
    <section className="relative flex min-h-screen items-center px-4 pb-16 pt-24 sm:px-6 lg:px-10">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: terminalEase }}
          className="max-w-4xl"
        >
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.24em] text-white/70">
            *** STOP: Portfolio kernel recovered ***
          </p>
          <h1 className="glitch-title font-mono text-[clamp(2.45rem,7vw,7.2rem)] font-bold uppercase leading-[0.95] text-white">
            A problem has been detected...
          </h1>
          <motion.p
            className="mt-7 font-mono text-[clamp(1.2rem,3vw,2.5rem)] font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.7 }}
          >
            OM_BAKHSHI_PORTFOLIO.EXE<span className="cursor-block ml-2 inline-block h-7 w-3 bg-white align-middle" />
          </motion.p>
          <p className="mt-5 max-w-2xl font-mono text-base leading-7 text-white/86 sm:text-lg">
            Software Developer / Embedded Systems / Full Stack
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <SystemButton href="#projects">
              View modules <ExternalLink size={16} />
            </SystemButton>
            <SystemButton href="#contact">
              Open terminal <Terminal size={16} />
            </SystemButton>
            <SystemButton onClick={toggleSound}>
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              key clicks
            </SystemButton>
          </div>
        </motion.div>

        <motion.div
          className="diagnostic-panel font-mono"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.8, ease: terminalEase }}
        >
          <div className="mb-4 flex items-center justify-between border-b border-white/40 pb-3 text-xs uppercase tracking-[0.18em] text-white/70">
            <span>Crash Dump</span>
            <Pause size={15} />
          </div>
          <div className="space-y-3 text-sm leading-6 text-white/86">
            {diagnostics.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="memory-dump mt-6 h-32 overflow-hidden border-t border-white/25 pt-4 text-[0.68rem] leading-5 text-white/45">
            {Array.from({ length: 14 }).map((_, index) => (
              <p key={index}>
                {`0x${(4096 + index * 16).toString(16).toUpperCase()}: 4F 4D 42 41 4B 20 44 45 56 20 43 52 54 20 ${String(index).padStart(2, '0')}`}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function About() {
  const facts = [
    ['ROLE', 'Software developer'],
    ['EDUCATION', 'Computer Engineering Technology student'],
    ['SYSTEMS', 'Embedded systems, robotics, hardware-aware software'],
    ['STACK', 'Full stack development, APIs, real-time interfaces'],
    ['CURRENT_SIGNAL', 'Building weird and useful systems with AI-assisted workflows'],
  ]

  return (
    <SectionFrame id="about" label="SYSTEM_INFORMATION">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 className="font-mono text-3xl font-bold uppercase leading-tight text-white sm:text-5xl">
          Crash dump analysis points to a developer who likes the low levels and the whole stack.
        </h2>
        <div className="system-window">
          <div className="window-bar">
            <span>sysinfo.exe</span>
            <span>OK</span>
          </div>
          <div className="space-y-5 p-5 sm:p-6">
            {facts.map(([key, value]) => (
              <div key={key} className="grid gap-2 border-b border-white/15 pb-4 font-mono sm:grid-cols-[170px_1fr]">
                <span className="text-xs uppercase tracking-[0.18em] text-white/50">{key}</span>
                <span className="text-white/88">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionFrame>
  )
}

function ProjectWindow({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(index === 0)

  return (
    <motion.article
      className="system-window project-window"
      whileHover={{ y: -6, filter: 'drop-shadow(0 0 24px rgba(255,255,255,0.18))' }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    >
      <button className="window-bar w-full text-left" type="button" onClick={() => setOpen((value) => !value)}>
        <span>{project.file}</span>
        <span>{open ? 'EXPANDED' : project.status}</span>
      </button>
      <div className="p-5 sm:p-6">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-white/50">{project.status}</p>
        <h3 className="font-mono text-2xl font-bold uppercase text-white">{project.title}</h3>
        <p className="mt-4 leading-7 text-white/76">{project.summary}</p>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <p className="mt-5 border-t border-white/15 pt-5 leading-7 text-white/78">{project.details}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="border border-white/35 px-2.5 py-1 font-mono text-xs uppercase text-white/78">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.14em] text-white underline decoration-white/35 underline-offset-4 hover:decoration-white"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                    <ExternalLink size={14} />
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  )
}

function Projects() {
  return (
    <SectionFrame id="projects" label="CORRUPTED_MODULES">
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectWindow key={project.file} project={project} index={index} />
        ))}
      </div>
    </SectionFrame>
  )
}

function Skills() {
  return (
    <SectionFrame id="skills" label="TERMINAL_OUTPUT">
      <div className="system-window p-5 sm:p-7">
        <p className="font-mono text-sm text-white/62">&gt; enumerate --skills --format=stream</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              className="terminal-line border-l border-white/35 pl-4 font-mono text-white/86"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.035 }}
            >
              <span className="text-white/45">[{String(index + 1).padStart(2, '0')}]</span> {skill}
            </motion.div>
          ))}
        </div>
      </div>
    </SectionFrame>
  )
}

function Contact() {
  const [copied, setCopied] = useState<string | null>(null)
  const contacts = [
    { label: 'github.com/ombakh', value: 'https://github.com/ombakh', href: 'https://github.com/ombakh', icon: Code2 },
    { label: 'linkedin', value: 'https://www.linkedin.com/in/ombakhshi', href: 'https://www.linkedin.com/in/ombakhshi', icon: UserRound },
    { label: 'obakhshi_stu@kent.edu', value: 'obakhshi_stu@kent.edu', href: 'mailto:obakhshi_stu@kent.edu', icon: Mail },
  ]

  async function copy(value: string) {
    await navigator.clipboard.writeText(value)
    setCopied(value)
    window.setTimeout(() => setCopied(null), 1400)
  }

  return (
    <SectionFrame id="contact" label="COMMAND_TERMINAL">
      <div className="system-window p-5 sm:p-7">
        <p className="font-mono text-sm text-white/62">&gt; open contact_channels</p>
        <div className="mt-6 space-y-4">
          {contacts.map(({ label, value, href, icon: Icon }) => (
            <div key={value} className="flex flex-col gap-3 border-b border-white/15 pb-4 font-mono sm:flex-row sm:items-center sm:justify-between">
              <a className="inline-flex items-center gap-3 text-white/90 hover:text-white" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                <Icon size={18} />
                &gt; {label}
              </a>
              <button
                className="inline-flex w-fit items-center gap-2 border border-white/30 px-3 py-2 text-xs uppercase tracking-[0.16em] text-white/70 hover:border-white hover:text-white"
                type="button"
                onClick={() => copy(value)}
              >
                <Clipboard size={14} />
                {copied === value ? 'copied' : 'copy'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  )
}

function EasterEgg() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    let buffer = ''
    const handler = (event: KeyboardEvent) => {
      buffer = `${buffer}${event.key.toLowerCase()}`.slice(-9)
      if (buffer.includes('blue')) {
        setActive(true)
        window.setTimeout(() => setActive(false), 2600)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="pointer-events-none fixed inset-x-4 top-8 z-40 mx-auto max-w-xl border border-white bg-[#0000aa] p-4 text-center font-mono text-sm uppercase tracking-[0.18em] text-white shadow-[0_0_50px_rgba(255,255,255,0.26)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          HIDDEN_INTERRUPT: BLUE_SCREEN_ART_MODE_CONFIRMED
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function App() {
  const [booted, setBooted] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const playClick = useKeyboardClickSound(soundEnabled)
  const bootComplete = useMemo(() => () => setBooted(true), [])

  useEffect(() => {
    const listener = () => playClick()
    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [playClick])

  return (
    <div className={shouldReduceMotion ? 'motion-reduced' : ''}>
      <AnimatePresence>{!booted && <BootSequence onComplete={bootComplete} />}</AnimatePresence>
      <div className="ambient-noise" />
      <div className="scanlines" />
      <main className="relative z-10">
        <Hero soundEnabled={soundEnabled} toggleSound={() => setSoundEnabled((value) => !value)} />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <EasterEgg />
    </div>
  )
}

export default App
