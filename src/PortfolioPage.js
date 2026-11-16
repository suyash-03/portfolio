import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Copy, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { experiences, skillCategories } from './data/portfolioData';
import profilePhoto from './profile.png';

const resumeUrl = 'https://drive.google.com/file/d/1k3hBRM9GzNaaKSWFixiYYKq5Ft4h1ITu/view?usp=sharing';
const emailAddress = 'suyash.singh9450@gmail.com';
const nav = [['Experience', 'experience'], ['Projects', 'work'], ['Lab', 'summit'], ['About', 'about'], ['Contact', 'contact']];

const projects = {
  work: [
    { type: 'Distributed platform', title: 'Summit', summary: 'High-concurrency orchestration for firmware validation across physical hardware.', detail: 'Led development of the FastAPI, React and PostgreSQL engine for job execution, live logging and reporting. Scaled it for 2× the workload while reducing P95 API latency by 30%.', stack: ['FastAPI', 'React', 'PostgreSQL', 'Kafka', 'AWS MSK'], href: '#summit', action: 'Explore the simulation' },
    { type: 'Developer tooling', title: 'AST driven PR analysis', summary: 'Code intelligence that analyzes pull requests and generates and validates unit tests.', detail: 'Built the platform with Python and AWS Bedrock to monitor repositories, generate test suites and validate changes in CI, increasing coverage and reducing manual review overhead.', stack: ['Python', 'AWS Bedrock', 'AST parsing', 'CI'], href: '#experience', action: 'See the experience' }
  ],
  personal: [
    { type: 'macOS application', title: 'FmCUI', summary: 'On device language model inference with streaming responses and fast Markdown rendering.', detail: 'Built with Electron, React, TypeScript and Apple Foundation Models, with automated packaging and release workflows.', stack: ['Electron', 'React', 'TypeScript', 'Apple Foundation Models'], href: 'https://suyash-03.github.io/fmcui-product-portfolio/', action: 'View project' },
    { type: 'Campus product', title: 'BITS SU App', summary: 'Campus payment and events platform serving 8,000+ users and processing ₹6M+ monthly.', detail: 'Built Django REST APIs with Google OAuth 2.0 and cryptographic QR payment verification. Integrated FCM, live Google Maps tracking and Provider state management for real-time updates.', stack: ['Flutter', 'Django', 'Firebase', 'Google Maps'], href: 'https://play.google.com/store/apps/details?id=org.subitspilani.bits_su_app&hl=en_IN', action: 'View on Play Store' },
    { type: 'Academic product', title: 'StudyDeck', summary: 'A semester scheduler with live timetable generation and conflict resolution for BITS Pilani students.', detail: 'Developed the Flutter app with interactive schedules, Provider state management and local response caching.', stack: ['Flutter', 'Dart', 'Provider', 'sqflite'], href: 'https://studydeck.bits-sutechteam.org/', action: 'Open StudyDeck' }
  ]
};

function Reveal({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion();
  return <motion.div className={className} initial={reduceMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.75, delay, ease: [0.19, 1, 0.22, 1] }}>{children}</motion.div>;
}

function Header({ onOpenLab }) {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="page-width header-inner">
    <a className="wordmark" href="#home" aria-label="Suyash Singh, home">Suyash<span>Singh</span><i>.</i></a>
    <nav className={'main-nav' + (open ? ' is-open' : '')} aria-label="Main navigation">{nav.map(([label, id]) => <a key={id} href={'#' + id} onClick={() => { if (id === 'summit') onOpenLab(); setOpen(false); }}>{label}</a>)}<a className="nav-resume" href={resumeUrl} target="_blank" rel="noopener noreferrer">Résumé <ArrowUpRight size={15} /></a></nav>
    <button className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={23} /> : <Menu size={23} />}</button>
  </div></header>;
}

function Heading({ children, aside }) { return <div className="section-heading"><h2>{children}</h2><p>{aside}</p></div>; }

function Hero() {
  const reduceMotion = useReducedMotion();
  return <section className="hero" id="home"><div className="page-width hero-inner">
    <div className="hero-topline"><span>Software engineer · Bengaluru, India</span><span>Portfolio / 2026</span></div>
    <motion.h1 initial={reduceMotion ? false : { opacity: 0.65, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}>Suyash <span>Singh.</span></motion.h1>
    <motion.div className="hero-bottom" initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}><p className="hero-thesis">I build <em>distributed orchestration systems</em> that make firmware validation faster and easier to debug.</p><div className="hero-intro"><p>At Micron, I lead development of a FastAPI/PostgreSQL platform for hardware validation jobs. I also built Kafka/MSK telemetry ingestion and a FastMCP server for production debugging.</p><div className="hero-actions"><a className="button button-dark" href="#experience">See my experience <ArrowUpRight size={17} /></a><a className="text-link" href="#contact">Get in touch <ArrowRight size={17} /></a></div></div></motion.div>
    <a className="scroll-cue" href="#experience"><ArrowDown size={17} /> Scroll to explore</a>
  </div></section>;
}

function SystemDiagram() {
  const nodes = [['01', 'API + state', 'FastAPI · PostgreSQL'], ['02', 'Job scheduler', 'High-concurrency orchestration'], ['03', 'Hardware execution', 'Firmware validation runners'], ['04', 'Event pipeline', 'Kafka · AWS MSK · S3']];
  const reduceMotion = useReducedMotion();
  return <div className="system-diagram" aria-label="Summit execution path: FastAPI and PostgreSQL to a job scheduler, hardware validation runners, then a Kafka, AWS MSK and S3 event pipeline"><div className="system-diagram-label"><span>Job lifecycle / Summit</span><span>API → runners → events</span></div>{nodes.map(([number, title, detail], index) => <motion.div className="system-step" key={title} initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.6, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}><div className="system-step-top"><span>{number}</span><i /></div><div className="system-step-content"><strong>{title}</strong><small>{detail}</small></div>{index < nodes.length - 1 && <ArrowDown className="system-step-arrow" size={16} aria-hidden="true" />}</motion.div>)}</div>;
}

function Projects({ onOpenLab }) {
  const [category, setCategory] = useState('work');
  return <div className="projects-block">
    <div className="projects-header"><h3>More selected projects</h3><div className="project-tabs" role="tablist" aria-label="Project category"><button type="button" role="tab" aria-selected={category === 'work'} onClick={() => setCategory('work')}>At work</button><button type="button" role="tab" aria-selected={category === 'personal'} onClick={() => setCategory('personal')}>Independent</button></div></div>
    <div className="project-list" role="tabpanel">{projects[category].map((project, index) => <Reveal key={project.title} className="project-row" delay={index * 0.05}>
      <div className="project-kind">{project.type}</div>
      <div className="project-copy"><h4>{project.title}</h4><p className="project-summary">{project.summary}</p><p className="project-detail">{project.detail}</p><div className="tag-list">{project.stack.map(tech => <span key={tech}>{tech}</span>)}</div></div>
      <a className="project-link" href={project.href} onClick={project.href === '#summit' ? onOpenLab : undefined} target={project.href.startsWith('http') ? '_blank' : undefined} rel={project.href.startsWith('http') ? 'noopener noreferrer' : undefined} aria-label={project.action + ': ' + project.title}><ArrowUpRight size={21} /><span>{project.action}</span></a>
    </Reveal>)}</div>
  </div>;
}

function Work({ labOpen, onOpenLab, onCloseLab }) {
  return <section className="section work-section" id="work"><div className="page-width">
    <Reveal><Heading aside="Platform work and independent projects">Selected systems and projects.</Heading></Reveal>
    <Reveal className="featured-case">
      <div className="featured-case-head"><span>Distributed orchestration platform / Summit</span><span>2024 — present</span></div>
      <div className="featured-case-grid">
        <div><h3>Making hardware validation easier to run, scale and understand.</h3><p>Summit coordinates high-concurrency firmware jobs across physical hardware. I led platform development and built the event ingestion path that handles 100K+ telemetry events each day, supporting real-time services and AI driven root cause analysis.</p><button className="light-link simulation-trigger" type="button" aria-expanded={labOpen} aria-controls="summit" onClick={labOpen ? onCloseLab : onOpenLab}>{labOpen ? 'View the execution path' : 'Try the interactive simulation'} <ArrowUpRight size={18} /></button></div>
        <div className="featured-visual" id="summit">{labOpen ? <SummitLab onClose={onCloseLab} /> : <SystemDiagram />}</div>
      </div>
      <div className="featured-outcomes"><Reveal delay={0.05}><strong>2×</strong><span>workload supported</span></Reveal><Reveal delay={0.15}><strong>30%</strong><span>lower P95 API latency</span></Reveal><Reveal delay={0.25}><strong>100K+</strong><span>telemetry events / day</span></Reveal></div>
    </Reveal>
    <Projects onOpenLab={onOpenLab} />
  </div></section>;
}

function Experience() {
  return <section className="section experience-section" id="experience"><div className="page-width"><Reveal><Heading aside="Where I have worked">Experience shaped by building.</Heading></Reveal><div className="experience-list">{experiences.map(item => <Reveal className="experience-item" key={item.company + item.period}><div className="experience-date">{item.period}<span>{item.location}</span></div><div className="experience-body"><div className="experience-title"><h3>{item.role}</h3><span>{item.company}</span></div><ul>{item.points.map(point => <li key={point}>{point}</li>)}</ul><div className="tag-list">{item.tech.slice(0, 6).map(tech => <span key={tech}>{tech}</span>)}</div></div></Reveal>)}</div></div></section>;
}

const simulationSteps = ['Checking scheduler capacity and reserving a hardware runner', 'Fetching firmware image and preparing the test environment', 'Running CI checks and nightly validation suite', 'Collecting telemetry and storing execution logs'];

function SummitLab({ onClose }) {
  const [hardware, setHardware] = useState('SSD Gen5 NVMe');
  const [branch, setBranch] = useState('feature/rca-agent');
  const [suite, setSuite] = useState('Nightly Validation Suite');
  const [injectError, setInjectError] = useState(true);
  const [view, setView] = useState('configure');
  const [status, setStatus] = useState('idle');
  const [logs, setLogs] = useState([]);
  const [diagnosing, setDiagnosing] = useState(false);
  const [diagnosed, setDiagnosed] = useState(false);
  const timer = useRef(null);
  const diagnosisTimer = useRef(null);

  useEffect(() => () => {
    window.clearInterval(timer.current);
    window.clearTimeout(diagnosisTimer.current);
  }, []);

  const reset = () => {
    window.clearInterval(timer.current);
    window.clearTimeout(diagnosisTimer.current);
    setView('configure');
    setStatus('idle');
    setLogs([]);
    setDiagnosing(false);
    setDiagnosed(false);
  };

  const run = () => {
    window.clearInterval(timer.current);
    window.clearTimeout(diagnosisTimer.current);
    setView('output');
    setStatus('running');
    setLogs([]);
    setDiagnosed(false);
    setDiagnosing(false);
    let step = 0;
    timer.current = window.setInterval(() => {
      if (step < simulationSteps.length) {
        setLogs(current => [...current, simulationSteps[step]]);
        step += 1;
      } else {
        window.clearInterval(timer.current);
        setLogs(current => [...current, injectError ? 'Validation stopped: readback mismatch on hardware runner' : 'Validation complete: all checks passed']);
        setStatus(injectError ? 'failed' : 'success');
      }
    }, 650);
  };

  const diagnose = () => {
    setDiagnosing(true);
    diagnosisTimer.current = window.setTimeout(() => {
      setDiagnosing(false);
      setDiagnosed(true);
    }, 1200);
  };
  const diagnosis = hardware === 'SSD Gen5 NVMe'
    ? 'The NVMe write path may cross a DMA page boundary, causing a readback mismatch. Check buffer alignment in the validation stage.'
    : hardware === 'Micron NAND LPDDR5'
      ? 'The validation driver may read refresh registers before the LPDDR5 training cycle settles. Check the harness timing.'
      : 'The executor may have lost its heartbeat while buffering logs. Check runner connectivity and socket limits.';

  return <div className="inline-lab" role="region" aria-label="Interactive firmware validation simulation">
    <div className="inline-lab-head"><div><span>Interactive / simulated</span><h4 tabIndex={-1}>Run firmware validation</h4></div><button type="button" onClick={onClose} aria-label="Close simulation"><X size={18} /></button></div>
    <p className="inline-lab-note">An illustrative workflow with simulated data. No connection to Micron systems.</p>
    {view === 'configure' ? <div className="inline-lab-controls">
      <div className="inline-lab-field-row">
        <label>Hardware platform<select value={hardware} onChange={event => setHardware(event.target.value)}><option>SSD Gen5 NVMe</option><option>Micron NAND LPDDR5</option><option>NorFlash Edge Device</option></select></label>
        <label>Repository branch<select value={branch} onChange={event => setBranch(event.target.value)}><option>feature/rca-agent</option><option>main</option><option>release/v4.2</option><option>hotfix/bootloader</option></select></label>
      </div>
      <label>Test suite<select value={suite} onChange={event => setSuite(event.target.value)}><option>Nightly Validation Suite</option><option>CI/CD PR Unit Checks</option><option>Weekly Release Validation</option></select></label>
      <label className="checkbox-row"><input type="checkbox" checked={injectError} onChange={event => setInjectError(event.target.checked)} /> Simulate a validation fault</label>
      <button className="button button-dark inline-lab-run" type="button" onClick={run}>Run validation <ArrowRight size={17} /></button>
    </div> : <div className="inline-lab-output">
      <div className="inline-lab-output-head"><strong>Execution log</strong><span className={'run-status status-' + status}>{status === 'running' ? 'Running' : status === 'success' ? 'Passed' : 'Needs review'}</span></div>
      <div className="log-list" role="log" aria-live="polite"><p className="log-command">$ summit run --target "{hardware}" --branch {branch} --suite "{suite}"</p>{logs.map((log, index) => <p key={index + log}><span>{String(index + 1).padStart(2, '0')}</span>{log}</p>)}</div>
      {status === 'failed' && <div className="diagnosis"><div><strong>Investigate the failure</strong><p>Inspect a sample root cause summary.</p></div><button type="button" onClick={diagnose} disabled={diagnosing || diagnosed}>{diagnosing ? 'Analyzing…' : diagnosed ? 'Analysis ready' : 'Analyze fault'} <ArrowUpRight size={16} /></button></div>}
      {diagnosed && <div className="diagnosis-result" role="status"><strong>Likely cause · simulated</strong><p>{diagnosis}</p></div>}
      <button className="inline-lab-reset" type="button" onClick={reset}>Configure another run <ArrowRight size={15} /></button>
    </div>}
  </div>;
}

function About() {
  return <section className="section about-section" id="about"><div className="page-width"><Reveal><Heading aside="A little more context">The person behind the systems.</Heading></Reveal><div className="about-grid"><Reveal className="portrait-wrap"><img src={profilePhoto} alt="Suyash Singh at BITS Pilani" loading="lazy" /></Reveal><div className="about-copy"><Reveal><p className="about-lead">I’m Suyash, a software engineer who enjoys turning complex operational problems into reliable tools people can use every day.</p><p>At Micron, I work on distributed orchestration for firmware and validation teams, automation and AI-assisted engineering workflows. I graduated from BITS Pilani with a B.E. in Electrical and Electronics Engineering.</p><p>Outside work, I enjoy competitive programming, badminton, the gym and gaming.</p></Reveal><Reveal className="about-facts"><div><span>Currently</span><strong>Software Engineer 2, Micron</strong></div><div><span>Education</span><strong>B.E., BITS Pilani · 2020–2024</strong></div><div><span>Also interested in</span><strong>Distributed systems · developer experience</strong></div></Reveal></div></div><Reveal className="skills-block"><h3>Tools I work with</h3><div className="skills-grid">{skillCategories.map(category => <div key={category.title}><h4>{category.title}</h4><p>{category.skills.join(' · ')}</p></div>)}</div></Reveal></div></section>;
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const copyEmail = async () => { try { await navigator.clipboard.writeText(emailAddress); setCopied(true); window.setTimeout(() => setCopied(false), 2000); } catch (_) { window.location.href = 'mailto:' + emailAddress; } };
  const submit = event => { event.preventDefault(); const subject = encodeURIComponent('Portfolio inquiry from ' + name); const body = encodeURIComponent(message + '\n\nReply to: ' + email); window.location.href = 'mailto:' + emailAddress + '?subject=' + subject + '&body=' + body; };
  return <section className="section contact-section" id="contact"><div className="page-width"><Reveal><h2>Let’s build something<br /><em>that lasts.</em></h2><p className="contact-intro">Have an engineering opportunity or a problem worth solving together? I’d be glad to hear about it.</p></Reveal><Reveal className="contact-grid"><div className="contact-details"><a className="contact-email" href={'mailto:' + emailAddress}>{emailAddress} <ArrowUpRight size={22} /></a><button className="copy-button" type="button" onClick={copyEmail}>{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? 'Copied' : 'Copy email'}</button><div className="social-links"><a href="https://github.com/suyash-03" target="_blank" rel="noopener noreferrer"><Github size={18} /> GitHub <ArrowUpRight size={15} /></a><a href="https://www.linkedin.com/in/suyash-singh-bb9477203/" target="_blank" rel="noopener noreferrer"><Linkedin size={18} /> LinkedIn <ArrowUpRight size={15} /></a><a href={resumeUrl} target="_blank" rel="noopener noreferrer">Résumé <ArrowUpRight size={15} /></a></div></div><form className="contact-form" onSubmit={submit}><h3>Send a note</h3><div className="form-pair"><label>Your name<input required value={name} onChange={event => setName(event.target.value)} placeholder="Your name" /></label><label>Email address<input required type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" /></label></div><label>Message<textarea required rows="4" value={message} onChange={event => setMessage(event.target.value)} placeholder="Tell me what you have in mind" /></label><button className="button button-light" type="submit">Open email draft <Mail size={17} /></button><p className="form-note">This opens your email app with your message ready to send.</p></form></Reveal></div></section>;
}

function Recognition() {
  return <section className="section recognition-section"><div className="page-width"><Reveal><Heading aside="From the 2026 résumé">A few markers along the way.</Heading></Reveal><div className="recognition-grid"><Reveal delay={0.05}><strong>1800+</strong><span>LeetCode rating · top 7%</span></Reveal><Reveal delay={0.15}><strong>99.20</strong><span>JEE Main percentile · top 0.8% nationwide</span></Reveal><Reveal delay={0.25}><strong>336</strong><span>BITSAT 2020 score · top ~1%</span></Reveal></div></div></section>;
}

function Footer() { return <footer className="site-footer"><div className="page-width footer-inner"><a className="wordmark" href="#home">Suyash<span>Singh</span><i>.</i></a><span>Designed and engineered by Suyash Singh · © {new Date().getFullYear()}</span><a href="#home">Back to top ↑</a></div></footer>; }

export default function PortfolioPage() {
  const [labOpen, setLabOpen] = useState(false);
  const openLab = () => {
    setLabOpen(true);
    window.requestAnimationFrame(() => {
      const panel = document.getElementById('summit');
      const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      panel?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
      panel?.querySelector('.inline-lab-head h4')?.focus({ preventScroll: true });
    });
  };
  const closeLab = () => {
    setLabOpen(false);
    window.requestAnimationFrame(() => document.querySelector('.simulation-trigger')?.focus({ preventScroll: true }));
  };
  return <><a className="skip-link" href="#experience">Skip to experience</a><Header onOpenLab={openLab} /><main><Hero /><Experience /><Work labOpen={labOpen} onOpenLab={openLab} onCloseLab={closeLab} /><About /><Recognition /><Contact /></main><Footer /></>;
}
