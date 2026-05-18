import { useEffect, useMemo, useState } from 'react'
import {
  bootLines,
  certifications,
  diagnostics,
  education,
  experience,
  projects,
  skills,
} from './data/portfolio'

const dumpRows = [
  '0028:C0011E36  8B 45 F8 50 FF 75 0C FF 15 00 B0 0D C0 85 C0 75',
  '0028:C0011E46  0A 68 00 80 00 00 E8 38 10 00 00 83 C4 10 EB 17',
  '0167:BFF9A3C0  4F 4D 5F 42 41 4B 48 53 48 49 2E 45 58 45 00 00',
  '0137:DEADBEEF  52 45 4D 4F 54 45 5F 53 45 4E 53 49 4E 47 2E 53',
  '0137:0000AA55  4F 41 55 54 48 5F 4C 49 42 2E 50 59 00 52 41 47',
]

const contactLinks = {
  email: 'mailto:ombakh28@gmail.com',
  github: 'https://github.com/ombakh',
  linkedin: 'https://www.linkedin.com/in/ombakh',
}

function TerminalLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = href.startsWith('http')

  return (
    <a
      className="terminal-link"
      href={href}
      rel={isExternal ? 'noreferrer' : undefined}
      target={isExternal ? '_blank' : undefined}
    >
      {children}
    </a>
  )
}

function SectionTitle({ code, title }: { code: string; title: string }) {
  return (
    <div className="section-title" aria-label={title}>
      <span>{code}</span>
      <span>{title}</span>
    </div>
  )
}

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setVisibleLines((current) => {
        if (current >= bootLines.length) {
          window.clearInterval(interval)
          window.setTimeout(onComplete, 420)
          return current
        }
        return current + 1
      })
    }, 360)

    return () => window.clearInterval(interval)
  }, [onComplete])

  return (
    <div className="boot-screen" aria-label="Boot sequence">
      <div className="boot-copy">
        {bootLines.slice(0, visibleLines).map((line) => (
          <p key={line}>{line}</p>
        ))}
        <span className="block-cursor" />
      </div>
    </div>
  )
}

function HeaderBlock() {
  return (
    <header className="bsod-block hero-block">
      <p>A fatal exception 0E has occurred at 0028:C0011E36 in OM_BAKHSHI.EXE.</p>
      <p>The current application will be terminated.</p>

      <p>
        * Press TAB to continue viewing system diagnostics.
        <br />
        * Press CTRL+ALT+DEL to restart your computer. You will lose any unsaved
        <br />
        &nbsp;&nbsp;information in all applications.
      </p>

      <p>
        System halted while loading portfolio data from ombak.dev. The following
        <br />
        diagnostic information was recovered from physical memory:
      </p>

      <p className="panic-title">OM_BAKHSHI.EXE</p>
      <div className="profile-recovery">
        <div className="profile-copy">
          <p>
            Software Developer / Computer Engineering Technology / Full Stack
            <br />
            Kent State University
          </p>
          <p>
            Builds web systems, internal tools, robotics controls, and applied AI workflows.
            <br />
            Current focus: practical software with embedded systems and automation.
            <span className="block-cursor inline-cursor" />
          </p>
        </div>
        <figure className="headshot-frame">
          <img src="./headshot.jpeg?v=profile-2" alt="Om Bakhshi headshot" />
          <figcaption>PROFILE_IMG.BMP recovered</figcaption>
        </figure>
      </div>
    </header>
  )
}

function DiagnosticReport() {
  return (
    <section className="bsod-block" id="diagnostics">
      <SectionTitle code="00" title="PROFILE / RECOVERY DATA" />
      {diagnostics.map((line) => (
        <p className="field-row" key={line}>
          {line}
        </p>
      ))}
      <p className="field-row">
        Public recovery address:{' '}
        <TerminalLink href={contactLinks.email}>ombakh28@gmail.com</TerminalLink>
        <br />
        Linked module path:{' '}
        <TerminalLink href={contactLinks.linkedin}>linkedin.com/in/ombakh</TerminalLink>
        <br />
        Source repository: <TerminalLink href={contactLinks.github}>github.com/ombakh</TerminalLink>
      </p>
    </section>
  )
}

function ExperienceLogs() {
  return (
    <section className="bsod-block" id="experience">
      <SectionTitle code="01" title="EXPERIENCE LOGS" />
      {experience.map((item, index) => (
        <div className="log-entry" key={`${item.role}-${item.organization}`}>
          <p className="entry-heading">
            [{String(index).padStart(2, '0')}] PROCESS: {item.role.toUpperCase()}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;OWNER: {item.organization}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;TIME: {item.date}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;NOTE: {item.summary}
          </p>
          {item.highlights.map((highlight) => (
            <p className="entry-line" key={highlight}>
              - {highlight}
            </p>
          ))}
        </div>
      ))}
    </section>
  )
}

function ProjectModules() {
  return (
    <section className="bsod-block" id="projects">
      <SectionTitle code="02" title="PROJECT MODULES" />
      <p className="section-note">Recovered project modules:</p>
      {projects.map((project) => (
        <article className="module-entry" key={project.file}>
          <p className="entry-heading">
            *** {project.file}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;NAME: {project.title}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;STATUS: {project.status}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;STACK: {project.stack.join(', ')}
          </p>
          <p className="entry-line">{project.summary}</p>
          <p className="entry-line">
            Detail: {project.details}
            {project.links.length > 0 && (
              <>
                <br />
                Link:{' '}
                {project.links.map((link, linkIndex) => (
                  <span key={`${project.file}-${link.href}`}>
                    {linkIndex > 0 && ' | '}
                    <TerminalLink href={link.href}>{link.label}</TerminalLink>
                  </span>
                ))}
              </>
            )}
          </p>
        </article>
      ))}
    </section>
  )
}

function SkillsAndEducation() {
  const componentRows = useMemo(
    () =>
      skills.map((skill, index) => ({
        address: `VXD_${String(index + 1).padStart(2, '0')}`,
        irq: `IRQ ${index % 8}`,
        skill,
      })),
    [],
  )

  return (
    <>
      <section className="bsod-block" id="skills">
        <SectionTitle code="03" title="TECHNICAL SKILLS" />
        <div className="component-grid">
          {componentRows.map((row) => (
            <p key={row.skill}>
              {row.address} &nbsp; {row.irq.padEnd(5, ' ')} &nbsp; {row.skill}
            </p>
          ))}
        </div>
      </section>

      <section className="bsod-block" id="education">
        <SectionTitle code="04" title="EDUCATION / CERTIFICATIONS" />
        <p className="section-note">Education records found in system registry:</p>
        {education.map((item) => (
          <p className="field-row" key={item}>
            HKLM\\EDUCATION\\{item}
          </p>
        ))}

        <p className="section-note spaced">Installed certification drivers:</p>
        {certifications.map((item) => (
          <p className="field-row" key={item}>
            {item}
          </p>
        ))}
      </section>
    </>
  )
}

function MemoryDump() {
  return (
    <section className="bsod-block memory-block" id="memory">
      <SectionTitle code="05" title="PHYSICAL MEMORY DUMP" />
      <p>Beginning dump of physical memory...</p>
      <div className="dump-lines">
        {dumpRows.map((row) => (
          <p key={row}>{row}</p>
        ))}
      </div>
      <p>Physical memory dump complete.</p>
      <p>
        Contact recovery data:
        <br />
        <TerminalLink href={contactLinks.email}>ombakh28@gmail.com</TerminalLink> |{' '}
        <TerminalLink href={contactLinks.github}>github.com/ombakh</TerminalLink> |{' '}
        <TerminalLink href={contactLinks.linkedin}>linkedin.com/in/ombakh</TerminalLink>
      </p>
    </section>
  )
}

function App() {
  const [booted, setBooted] = useState(false)
  const [distort, setDistort] = useState(false)

  useEffect(() => {
    const handleKey = () => {
      setDistort(true)
      window.setTimeout(() => setDistort(false), 110)
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setDistort(true)
      window.setTimeout(() => setDistort(false), 80)
    }, 7200)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className={distort ? 'screen-shell is-distorting' : 'screen-shell'}>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      <div className="crt-noise" />
      <div className="crt-scanlines" />

      <main className="bsod-screen" aria-label="Windows 98 style portfolio crash screen">
        <HeaderBlock />
        <DiagnosticReport />
        <ExperienceLogs />
        <ProjectModules />
        <SkillsAndEducation />
        <MemoryDump />
        <footer className="bsod-block footer-block">
          <p>Press any key to continue _</p>
        </footer>
      </main>
    </div>
  )
}

export default App
