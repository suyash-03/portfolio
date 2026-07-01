import { Code, Cpu, Database, Wrench } from 'lucide-react';

export const navLinks = ['About', 'Experience', 'Projects', 'Skills', 'Education', 'Contact'];

export const experiences = [
  {
    company: 'Micron',
    role: 'Software Engineer 2',
    location: 'Bangalore, India',
    period: 'Jul 2024 - Present',
    points: [
      'Led development of Summit, a distributed test orchestration platform (FastAPI, React, PostgreSQL) for workflow execution with integrated logging and reporting; scaled to handle 2× increase in workload while reducing P95 latency by 30%.',
      'Built an event-driven automation system integrating JFrog Artifactory webhooks with custom schedulers, automating end-to-end firmware validation and eliminating manual workflows, improving validation efficiency by ~3×.',
      'Architected an asynchronous log-processing pipeline using Apache Kafka and AWS S3 to decouple heavy I/O test log uploads and enable downstream AI/ML-based root cause analysis workflows.',
      'Built an AST driven PR analysis system that monitors repositories and auto-generates and validates unit tests, leveraging LLMs via AWS Bedrock, improving code coverage and reducing manual review effort.',
      'Re-architected firmware release pipelines with unified JIRA-PR mapping and Jenkins orchestration, improving reproducibility and cycle time.',
      'Architected an agentic MCP server (FastMCP, Python) to expose Summit APIs to AI Agents, enabling autonomous natural-language debugging and reducing MTTD (Mean Time to Detection) for system failures.'
    ],
    tech: ['FastAPI', 'React.js', 'PostgreSQL', 'Apache Kafka', 'AWS S3', 'AWS Bedrock', 'FastMCP', 'Jenkins', 'Docker']
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
    period: 'Jul 2023 - Aug 2023',
    points: [
      'Developed a scalable backend analytics pipeline using C# and Git CLI to extract, filter, and aggregate engineering commit metadata.',
      'Architected a desktop analytics application using .NET WPF and MVVM integrated with SQLite and dependency injection frameworks.',
      'Built real-time dashboards with LiveCharts2 and WPF data binding for comparative benchmarking across distributed engineering teams.'
    ],
    tech: ['C#', '.NET WPF', 'MVVM', 'SQLite', 'Git CLI', 'LiveCharts2']
  },
  {
    company: 'Indian Army',
    role: 'Machine Learning Intern',
    location: 'Remote',
    period: 'Jun 2022 - Jul 2022',
    points: [
      'Trained YOLOv5-based object detection model for real-time drone detection, achieving 0.67 mAP on custom aerial surveillance dataset.',
      'Optimized model for edge deployment using TensorRT and TensorFlow Lite, achieving 120% improvement in inference speed.',
      'Designed data augmentation pipeline using Albumentations to enhance model robustness against adverse weather conditions.'
    ],
    tech: ['Python', 'YOLOv5', 'TensorRT', 'TensorFlow Lite', 'Albumentations', 'Computer Vision']
  }
];

export const skillCategories = [
  {
    title: 'Languages',
    icon: Code,
    color: '#6366f1',
    skills: ['Python', 'Java', 'C/C++', 'JavaScript', 'Dart', 'C#', 'SQL']
  },
  {
    title: 'Frameworks & Libraries',
    icon: Cpu,
    color: '#06b6d4',
    skills: ['FastAPI', 'React.js', 'Node.js', 'Express.js', 'Redux', '.NET', 'Flutter', 'Pandas', 'REST APIs']
  },
  {
    title: 'Databases & Caching',
    icon: Database,
    color: '#10b981',
    skills: ['PostgreSQL', 'MongoDB', 'DynamoDB', 'MySQL', 'Redis']
  },
  {
    title: 'Cloud & DevOps',
    icon: Wrench,
    color: '#f59e0b',
    skills: ['AWS (S3, Lambda, MSK, EC2)', 'Google Cloud Pub/Sub', 'Azure IAM', 'Docker', 'CI/CD', 'Jenkins']
  }
];

export const TerminalLogs = {
  history: [
    { text: "$ fetch --experience --all", isCommand: true },
    { text: "🔍 Querying internship and work records for Suyash Singh...", isCommand: false },
    { text: "💼 Micron (Jul 2024 - Present) • Software Engineer 2", isCommand: false },
    { text: "   - Led Summit test platform scaling, reducing P95 latency by 30%.", isCommand: false },
    { text: "   - Built event-driven Artifactory automations (~3x efficiency boost).", isCommand: false },
    { text: "💼 Legistify YC W22 (Jan - Jun 2024) • Software Intern", isCommand: false },
    { text: "   - Engineered Gmail webhook Pub/Sub microservice for email processing.", isCommand: false },
    { text: "💼 Société Générale (Jul - Aug 2023) • Software Intern", isCommand: false },
    { text: "   - Built Git metadata commit pipelines & C# WPF analytic screens.", isCommand: false },
    { text: "💼 Indian Army (Jun - Jul 2022) • ML Intern", isCommand: false },
    { text: "   - Trained drone detection YOLOv5 models, improving speed by 120%.", isCommand: false },
    { text: "✅ Professional credentials verified successfully.", isSuccess: true }
  ],
  skills: [
    { text: "$ cat /etc/skills/tech_stack.json", isCommand: true },
    { text: "📦 Languages: Python, Java, C/C++, JavaScript, Dart, C#, SQL", isCommand: false },
    { text: "🛠️ Frameworks: FastAPI, React.js, Node.js, Express.js, .NET, Flutter", isCommand: false },
    { text: "💾 Databases: PostgreSQL, MongoDB, DynamoDB, MySQL, Redis", isCommand: false },
    { text: "☁️ Infrastructure: AWS (S3, MSK, Lambda, EC2), GCP Pub/Sub, Docker, CI/CD", isCommand: false },
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
