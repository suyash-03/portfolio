import { Code, Cpu, Database, Wrench } from 'lucide-react';

export const navLinks = ['About', 'Summit', 'Experience', 'Projects', 'Skills', 'Education', 'Contact'];

export const experiences = [
  {
    company: 'Micron',
    role: 'Software Engineer 2',
    location: 'Bangalore, India',
    period: 'Oct 2025 - Present',
    promoted: true,
    points: [
      'Led development of Summit, a distributed orchestration engine (FastAPI, React, PostgreSQL) for high-concurrency job execution, real-time logging, and reporting; scaled to handle a 2× increase in workload while reducing P95 API latency by 30%.',
      'Engineered an agentic Model Context Protocol (MCP) server (FastMCP, Python) to expose internal platform APIs to LLM agents, enabling autonomous natural-language production debugging and cutting Mean Time to Detection (MTTD) for anomalies by ~40%.',
      'Architected a high-throughput Kafka event ingestion pipeline (Apache Kafka, AWS MSK, S3) processing 100K+ system telemetry events per day, powering real-time downstream microservices and automated AI-driven root cause analysis.'
    ],
    tech: ['FastAPI', 'React.js', 'PostgreSQL', 'FastMCP', 'Apache Kafka', 'AWS MSK', 'AWS S3']
  },
  {
    company: 'Micron',
    role: 'Software Engineer 1',
    location: 'Bangalore, India',
    period: 'Jul 2024 - Oct 2025',
    promoted: false,
    points: [
      'Architected a pre-release integration and Hardware-in-the-Loop (HIL) pipeline (Bitbucket, Jira, Jenkins), automating sequential PR merges, multi-target Make builds, binary bisection fault isolation, and hardware flashing to gate nightly and weekly releases.',
      'Built an event-driven scheduling and automation engine integrating JFrog Artifactory webhooks with custom distributed schedulers, orchestrating continuous and nightly/weekly firmware regression runs to improve execution throughput by ~3×.',
      'Built an AST-driven code intelligence and PR analysis platform using LLMs via AWS Bedrock to monitor repositories, auto-generate unit test suites, and validate code changes in CI, increasing code coverage and reducing manual review overhead.'
    ],
    tech: ['Bitbucket', 'Jira', 'Jenkins', 'JFrog Artifactory', 'AWS Bedrock', 'Python']
  },
  {
    company: 'Legistify (YC W22)',
    role: 'Software Development Intern',
    location: 'Gurgaon, India',
    period: 'Jan 2024 - Jun 2024',
    points: [
      'Built a Node.js microservice with Gmail APIs and Pub/Sub, replacing polling with webhooks for near real-time contract email processing.',
      'Implemented core alerting workflows, including rule-based triggers and event-driven e-signature reminders, improving UX and responsiveness.',
      'Designed metadata extraction pipelines using MongoDB with indexing and caching strategies enabling low-latency search and analytics.'
    ],
    tech: ['Node.js', 'Express.js', 'Gmail API', 'GCP Pub/Sub', 'MongoDB', 'Redis']
  },
  {
    company: 'Société Générale',
    role: 'Software Development Intern',
    location: 'Bangalore, India',
    period: 'Jun 2023 - Aug 2023',
    points: [
      'Developed a scalable backend analytics pipeline using C# and Git CLI to extract, filter, and aggregate engineering commit metadata.',
      'Architected a desktop analytics application using .NET WPF and MVVM integrated with SQLite and dependency injection frameworks.',
      'Built real-time dashboards with LiveCharts2 and WPF data binding for comparative benchmarking across distributed engineering teams.'
    ],
    tech: ['C#', '.NET WPF', 'MVVM', 'SQLite', 'Git CLI', 'LiveCharts2']
  }
];

export const skillCategories = [
  {
    title: 'Languages',
    icon: Code,
    color: '#ED6A24',
    skills: ['Python', 'TypeScript', 'C/C++', 'JavaScript', 'Dart', 'C#', 'SQL']
  },
  {
    title: 'Frameworks & Libraries',
    icon: Cpu,
    color: '#48749E',
    skills: ['FastAPI', 'React.js', 'FastMCP', 'Node.js', 'Django', '.NET', 'Flutter', 'Express.js', 'Redux', 'Pandas', 'REST APIs']
  },
  {
    title: 'Databases & Caching',
    icon: Database,
    color: '#48749E',
    skills: ['PostgreSQL', 'MongoDB', 'DynamoDB', 'MySQL', 'Redis']
  },
  {
    title: 'Cloud & DevOps',
    icon: Wrench,
    color: '#ED6A24',
    skills: ['AWS (S3, Lambda, MSK, EC2, Bedrock)', 'Docker', 'Linux', 'CI/CD', 'Jenkins', 'Git', 'Google Cloud Pub/Sub']
  }
];

export const TerminalLogs = {
  history: [
    { text: "$ fetch --experience --all", isCommand: true },
    { text: "🔍 Querying internship and work records for Suyash Singh...", isCommand: false },
    { text: "💼 Micron (Oct 2025 - Present) • Software Engineer 2", isCommand: false },
    { text: "   - Led Summit scaling; reduced P95 API latency by 30%.", isCommand: false },
    { text: "   - Built FastMCP debugging and 100K+ events/day Kafka ingestion.", isCommand: false },
    { text: "💼 Micron (Jul 2024 - Oct 2025) • Software Engineer 1", isCommand: false },
    { text: "   - Built release pipelines and event-driven scheduling (~3x throughput).", isCommand: false },
    { text: "   - Built AST-driven PR analysis with AWS Bedrock LLMs.", isCommand: false },
    { text: "💼 Legistify YC W22 (Jan - Jun 2024) • Software Intern", isCommand: false },
    { text: "   - Engineered Gmail webhook Pub/Sub microservice for email processing.", isCommand: false },
    { text: "💼 Société Générale (Jun - Aug 2023) • Software Intern", isCommand: false },
    { text: "   - Built Git metadata commit pipelines & C# WPF analytic screens.", isCommand: false },
    { text: "✅ Professional credentials verified successfully.", isSuccess: true }
  ],
  skills: [
    { text: "$ cat /etc/skills/tech_stack.json", isCommand: true },
    { text: "📦 Languages: Python, TypeScript, C/C++, JavaScript, Dart, C#, SQL", isCommand: false },
    { text: "🛠️ Frameworks: FastAPI, React.js, FastMCP, Node.js, Django, .NET, Flutter", isCommand: false },
    { text: "💾 Databases: PostgreSQL, MongoDB, DynamoDB, MySQL, Redis", isCommand: false },
    { text: "☁️ Infrastructure: AWS (S3, MSK, Lambda, EC2, Bedrock), Docker, Linux, Jenkins", isCommand: false },
    { text: "⚡ Focus: Latency-optimized systems, event-driven pipelines, toolings.", isSuccess: true }
  ],
  capabilities: [
    { text: "$ diagnose-capabilities --verbose", isCommand: true },
    { text: "⚙️ Distributed systems & async messaging (Kafka, Pub/Sub)", isCommand: false },
    { text: "⚙️ Performance engineering (decoupling I/O uploads, caching)", isCommand: false },
    { text: "⚙️ Automation (ast-driven PR test generations, Webhook hooks)", isCommand: false },
    { text: "⚙️ Agentic AI integrations (FastMCP Python servers exposure)", isCommand: false },
    { text: "💯 Status: Ready for scalable backend challenges.", isSuccess: true }
  ]
};
