import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Copy, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { experiences, skillCategories } from './data/portfolioData';
import profilePhoto from './profile.png';

const resumeUrl = 'https://drive.google.com/file/d/1k3hBRM9GzNaaKSWFixiYYKq5Ft4h1ITu/view?usp=sharing';
const emailAddress = 'suyash.singh9450@gmail.com';
const nav = [['Work', 'work'], ['Experience', 'experience'], ['Lab', 'summit'], ['About', 'about'], ['Contact', 'contact']];

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
  return <motion.div className={className} initial={reduceMotion ? false : { opacity: 0.72, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, delay, ease: [0.19, 1, 0.22, 1] }}>{children}</motion.div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="page-width header-inner">
    <a className="wordmark" href="#home" aria-label="Suyash Singh, home">Suyash<span>Singh</span><i>.</i></a>
    <nav className={'main-nav' + (open ? ' is-open' : '')} aria-label="Main navigation">{nav.map(([label, id]) => <a key={id} href={'#' + id} onClick={() => setOpen(false)}>{label}</a>)}<a className="nav-resume" href={resumeUrl} target="_blank" rel="noopener noreferrer">Résumé <ArrowUpRight size={15} /></a></nav>
    <button className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={23} /> : <Menu size={23} />}</button>
  </div></header>;
}

function Heading({ children, aside }) { return <div className="section-heading"><h2>{children}</h2><p>{aside}</p></div>; }

function Hero() {
  const reduceMotion = useReducedMotion();
  return <section className="hero" id="home"><div className="page-width hero-inner">
    <div className="hero-topline"><span>Software engineer · Bengaluru, India</span><span>Portfolio / 2026</span></div>
    <motion.h1 initial={reduceMotion ? false : { opacity: 0.65, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}>Suyash <span>Singh.</span></motion.h1>
    <div className="hero-bottom"><p className="hero-thesis">I build a <em>distributed orchestration platform</em> for firmware and validation teams.</p><div className="hero-intro"><p>Software Engineer 2 at Micron, leading high-concurrency job execution, telemetry ingestion and AI-assisted production debugging.</p><div className="hero-actions"><a className="button button-dark" href="#work">Explore my work <ArrowUpRight size={17} /></a><a className="text-link" href="#contact">Get in touch <ArrowRight size={17} /></a></div></div></div>
    <a className="scroll-cue" href="#work"><ArrowDown size={17} /> Scroll to explore</a>
  </div></section>;
}

function SystemDiagram() {
  const nodes = [['01', 'Event', 'Artifactory webhook'], ['02', 'Orchestration', 'Summit scheduler'], ['03', 'Execution', 'Hardware runners'], ['04', 'Insight', 'Telemetry + RCA']];
  return <div className="system-diagram" aria-label="Summit flow: Artifactory webhook to scheduler to hardware runners to logs and root cause analysis">{nodes.map(([number, title, detail]) => <div className="system-step" key={title}><div className="system-step-top"><span>{number}</span><i /></div><strong>{title}</strong><small>{detail}</small></div>)}</div>;
}

function Projects() {
  const [category, setCategory] = useState('work');
  return <div className="projects-block"><div className="projects-header"><h3>More selected projects</h3><div className="project-tabs" role="tablist" aria-label="Project category"><button type="button" role="tab" aria-selected={category === 'work'} onClick={() => setCategory('work')}>At work</button><button type="button" role="tab" aria-selected={category === 'personal'} onClick={() => setCategory('personal')}>Independent</button></div></div><div className="project-list" role="tabpanel">{projects[category].map((project, index) => <Reveal key={project.title} className="project-row" delay={index * 0.05}><div className="project-kind">{project.type}</div><div className="project-copy"><h4>{project.title}</h4><p className="project-summary">{project.summary}</p><p className="project-detail">{project.detail}</p><div className="tag-list">{project.stack.map(tech => <span key={tech}>{tech}</span>)}</div></div><a className="project-link" href={project.href} target={project.href.startsWith('http') ? '_blank' : undefined} rel={project.href.startsWith('http') ? 'noopener noreferrer' : undefined} aria-label={project.action + ': ' + project.title}><ArrowUpRight size={21} /><span>{project.action}</span></a></Reveal>)}</div></div>;
}

function Work() {
  return <section className="section work-section" id="work"><div className="page-width"><Reveal><Heading aside="Selected work at Micron">Engineering work, in context.</Heading></Reveal><Reveal className="featured-case"><div className="featured-case-head"><span>Distributed orchestration platform / Summit</span><span>2024 — present</span></div><div className="featured-case-grid"><div><h3>Making hardware validation easier to run, scale and understand.</h3><p>Summit coordinates high-concurrency firmware jobs across physical hardware. I led platform development and built the event ingestion path that handles 100K+ telemetry events each day, supporting real-time services and AI driven root cause analysis.</p><a className="light-link" href="#summit">Try the interactive simulation <ArrowUpRight size={18} /></a></div><SystemDiagram /></div><div className="featured-outcomes"><div><strong>2×</strong><span>workload supported</span></div><div><strong>30%</strong><span>lower P95 API latency</span></div><div><strong>100K+</strong><span>telemetry events / day</span></div></div></Reveal><Projects /></div></section>;
}

function Experience() {
  return <section className="section experience-section" id="experience"><div className="page-width"><Reveal><Heading aside="Where I have worked">Experience shaped by building.</Heading></Reveal><div className="experience-list">{experiences.map(item => <Reveal className="experience-item" key={item.company + item.period}><div className="experience-date">{item.period}<span>{item.location}</span></div><div className="experience-body"><div className="experience-title"><h3>{item.role}</h3><span>{item.company}</span></div><ul>{item.points.map(point => <li key={point}>{point}</li>)}</ul><div className="tag-list">{item.tech.slice(0, 6).map(tech => <span key={tech}>{tech}</span>)}</div></div></Reveal>)}</div></div></section>;
}

const simulationSteps = ['Checking scheduler capacity and reserving a hardware runner', 'Fetching firmware image and preparing the test environment', 'Running CI checks and nightly validation suite', 'Collecting telemetry and storing execution logs'];

function SummitLab() {
  const [hardware, setHardware] = useState('SSD Gen5 NVMe');
  const [branch, setBranch] = useState('feature/rca-agent');
  const [suite, setSuite] = useState('Nightly Validation Suite');
  const [injectError, setInjectError] = useState(true);
  const [status, setStatus] = useState('idle');
  const [logs, setLogs] = useState([]);
  const [diagnosing, setDiagnosing] = useState(false);
  const [diagnosed, setDiagnosed] = useState(false);
  const timer = useRef(null);
  const diagnosisTimer = useRef(null);
  useEffect(() => () => { window.clearInterval(timer.current); window.clearTimeout(diagnosisTimer.current); }, []);
  const run = () => { window.clearInterval(timer.current); setStatus('running'); setLogs([]); setDiagnosed(false); setDiagnosing(false); let step = 0; timer.current = window.setInterval(() => { if (step < simulationSteps.length) { const line = simulationSteps[step]; setLogs(current => [...current, line]); step += 1; } else { window.clearInterval(timer.current); setLogs(current => [...current, injectError ? 'Validation stopped: readback mismatch on hardware runner' : 'Validation complete: all checks passed']); setStatus(injectError ? 'failed' : 'success'); } }, 650); };
  const diagnose = () => { setDiagnosing(true); diagnosisTimer.current = window.setTimeout(() => { setDiagnosing(false); setDiagnosed(true); }, 1200); };
  const diagnosis = hardware === 'SSD Gen5 NVMe' ? 'The NVMe write path may cross a DMA page boundary, causing a readback mismatch. Check buffer alignment in the validation stage.' : hardware === 'Micron NAND LPDDR5' ? 'The validation driver may read refresh registers before the LPDDR5 training cycle settles. Check the harness timing.' : 'The executor may have lost its heartbeat while buffering logs. Check runner connectivity and socket limits.';
  return <section className="section lab-section" id="summit"><div className="page-width"><Reveal><Heading aside="An illustrative simulation based on Summit workflows">Take the system for a spin.</Heading></Reveal><p className="lab-intro">Configure a firmware validation run and see how orchestration, execution and root cause analysis fit together. This demo uses simulated data and does not connect to Micron systems.</p><div className="lab-grid"><div className="lab-controls"><h3>Configure a run</h3><label>Hardware platform<select value={hardware} disabled={status === 'running'} onChange={event => setHardware(event.target.value)}><option>SSD Gen5 NVMe</option><option>Micron NAND LPDDR5</option><option>NorFlash Edge Device</option></select></label><label>Repository branch<select value={branch} disabled={status === 'running'} onChange={event => setBranch(event.target.value)}><option>feature/rca-agent</option><option>main</option><option>release/v4.2</option><option>hotfix/bootloader</option></select></label><label>Test suite<select value={suite} disabled={status === 'running'} onChange={event => setSuite(event.target.value)}><option>Nightly Validation Suite</option><option>CI/CD PR Unit Checks</option><option>Weekly Release Validation</option></select></label><label className="checkbox-row"><input type="checkbox" checked={injectError} disabled={status === 'running'} onChange={event => setInjectError(event.target.checked)} /> Simulate a validation fault</label><button className="button button-dark lab-run" type="button" disabled={status === 'running'} onClick={run}>{status === 'running' ? 'Running validation…' : 'Run validation'} <ArrowRight size={17} /></button></div><div className="lab-output"><div className="lab-output-head"><h3>Execution log</h3><span className={'run-status status-' + status}>{status === 'idle' ? 'Ready' : status === 'running' ? 'Running' : status === 'success' ? 'Passed' : 'Needs review'}</span></div><div className="log-list" role="log" aria-live="polite"><p className="log-command">$ summit run --target "{hardware}" --branch {branch} --suite "{suite}"</p>{logs.length === 0 && <p className="log-empty">Your run output will appear here.</p>}{logs.map((log, index) => <p key={index + log}><span>{String(index + 1).padStart(2, '0')}</span>{log}</p>)}</div>{status === 'failed' && <div className="diagnosis"><div><strong>Investigate the failure</strong><p>Inspect a sample root cause summary for this simulated fault.</p></div><button type="button" onClick={diagnose} disabled={diagnosing || diagnosed}>{diagnosing ? 'Analyzing…' : diagnosed ? 'Analysis ready' : 'Analyze fault'} <ArrowUpRight size={16} /></button></div>}{diagnosed && <div className="diagnosis-result" role="status"><strong>Likely cause · simulated</strong><p>{diagnosis}</p></div>}</div></div></div></section>;
}

function About() {
  return <section className="section about-section" id="about"><div className="page-width"><Reveal><Heading aside="A little more context">The person behind the systems.</Heading></Reveal><div className="about-grid"><Reveal className="portrait-wrap"><img src={profilePhoto} alt="Suyash Singh at BITS Pilani" loading="lazy" /></Reveal><div className="about-copy"><Reveal><p className="about-lead">I’m Suyash, a software engineer who enjoys turning complex operational problems into reliable tools people can use every day.</p><p>At Micron, I work on distributed orchestration for firmware and validation teams, automation and AI-assisted engineering workflows. I graduated from BITS Pilani with a B.E. in Electrical and Electronics Engineering.</p><p>Outside work, I enjoy competitive programming, badminton, the gym and gaming.</p></Reveal><Reveal className="about-facts"><div><span>Currently</span><strong>Software Engineer 2, Micron</strong></div><div><span>Education</span><strong>B.E., BITS Pilani · 2020–2024</strong></div><div><span>Also interested in</span><strong>Distributed systems · developer experience</strong></div></Reveal></div></div><div className="skills-block"><h3>Tools I work with</h3><div className="skills-grid">{skillCategories.map(category => <div key={category.title}><h4>{category.title}</h4><p>{category.skills.join(' · ')}</p></div>)}</div></div></div></section>;
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const copyEmail = async () => { try { await navigator.clipboard.writeText(emailAddress); setCopied(true); window.setTimeout(() => setCopied(false), 2000); } catch (_) { window.location.href = 'mailto:' + emailAddress; } };
  const submit = event => { event.preventDefault(); const subject = encodeURIComponent('Portfolio inquiry from ' + name); const body = encodeURIComponent(message + '\n\nReply to: ' + email); window.location.href = 'mailto:' + emailAddress + '?subject=' + subject + '&body=' + body; };
  return <section className="section contact-section" id="contact"><div className="page-width"><Reveal><h2>Let’s build something<br /><em>that lasts.</em></h2><p className="contact-intro">Have an engineering opportunity or a problem worth solving together? I’d be glad to hear about it.</p></Reveal><div className="contact-grid"><div className="contact-details"><a className="contact-email" href={'mailto:' + emailAddress}>{emailAddress} <ArrowUpRight size={22} /></a><button className="copy-button" type="button" onClick={copyEmail}>{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? 'Copied' : 'Copy email'}</button><div className="social-links"><a href="https://github.com/suyash-03" target="_blank" rel="noopener noreferrer"><Github size={18} /> GitHub <ArrowUpRight size={15} /></a><a href="https://www.linkedin.com/in/suyash-singh-bb9477203/" target="_blank" rel="noopener noreferrer"><Linkedin size={18} /> LinkedIn <ArrowUpRight size={15} /></a><a href={resumeUrl} target="_blank" rel="noopener noreferrer">Résumé <ArrowUpRight size={15} /></a></div></div><form className="contact-form" onSubmit={submit}><h3>Send a note</h3><div className="form-pair"><label>Your name<input required value={name} onChange={event => setName(event.target.value)} placeholder="Your name" /></label><label>Email address<input required type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" /></label></div><label>Message<textarea required rows="4" value={message} onChange={event => setMessage(event.target.value)} placeholder="Tell me what you have in mind" /></label><button className="button button-light" type="submit">Open email draft <Mail size={17} /></button><p className="form-note">This opens your email app with your message ready to send.</p></form></div></div></section>;
}

function Recognition() {
  return <section className="section recognition-section"><div className="page-width"><Reveal><Heading aside="From the 2026 résumé">A few markers along the way.</Heading></Reveal><div className="recognition-grid"><div><strong>1800+</strong><span>LeetCode rating · top 7%</span></div><div><strong>99.20</strong><span>JEE Main percentile · top 0.8% nationwide</span></div><div><strong>336</strong><span>BITSAT 2020 score · top ~1%</span></div></div></div></section>;
}

function Footer() { return <footer className="site-footer"><div className="page-width footer-inner"><a className="wordmark" href="#home">Suyash<span>Singh</span><i>.</i></a><span>Designed and engineered by Suyash Singh · © {new Date().getFullYear()}</span><a href="#home">Back to top ↑</a></div></footer>; }

export default function PortfolioPage() { return <><a className="skip-link" href="#work">Skip to work</a><Header /><main><Hero /><Work /><Experience /><SummitLab /><About /><Recognition /><Contact /></main><Footer /></>; }
