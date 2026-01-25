import { useEffect, useState, useRef } from 'react';
import './App.css';
import profilePhoto from './profile.png';

// Custom hook for intersection observer animations
const useIntersectionObserver = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1, ...options });

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isVisible];
};

// Animated Section Component
const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <div 
      ref={ref} 
      className={`animated-section ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Navigation Component
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['About', 'Experience', 'Projects', 'Skills', 'Education', 'Contact'];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#home" className="nav-logo">
          <span className="logo-text">Suyash</span>
          <span className="logo-dot">.</span>
        </a>
        <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`} 
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
        </div>
        <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`hamburger ${menuOpen ? 'active' : ''}`}></span>
        </button>
      </div>
    </nav>
  );
};

// Hero Section
const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Hi, I'm Suyash Singh";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="grid-overlay"></div>
      </div>
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          Software Engineer 2 @ Micron
        </div>
        <h1 className="hero-title">
          <span className="typing-text">{text}</span>
          <span className="cursor">|</span>
        </h1>
        <div className="hero-description">
          <p className="desc-line">
            I'm a software engineer based in <span className="highlight">Bangalore</span>, currently focused on building 
            scalable automation platforms and performance-critical backend systems.
          </p>
          <p className="desc-line">
            A <span className="highlight">BITS Pilani</span> graduate, I work across the stack from system design and APIs 
            to databases and user-facing applications with an emphasis on efficiency, 
            reliability, and clean architecture.
          </p>
          <p className="desc-line">
            I love working on problems where <span className="highlight">scale</span>, <span className="highlight">correctness</span>, and <span className="highlight">developer experience</span> truly matter.
          </p>
        </div>
        <div className="hero-cta">
          <a href="#contact" className="btn btn-primary">
            <span>Get in Touch</span>
            <svg viewBox="0 0 24 24" className="btn-icon">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#experience" className="btn btn-secondary">
            View My Work
          </a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">2+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat">
            <span className="stat-number">15+</span>
            <span className="stat-label">Technologies</span>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

// About Section
const About = () => {
  const interests = [
    { icon: '💪', label: 'Gymming' },
    { icon: '⛸️', label: 'Skating' },
    { icon: '🏸', label: 'Badminton' },
    { icon: '🏊', label: 'Swimming' },
    { icon: '🎮', label: 'Gaming' }
  ];

  return (
    <section id="about" className="section about">
      <div className="container">
        <AnimatedSection>
          <h2 className="section-title">
            <span className="title-number">01.</span>
            About Me
          </h2>
        </AnimatedSection>
        <div className="about-content">
          <AnimatedSection className="about-image" delay={200}>
            <div className="image-wrapper">
              <img src={profilePhoto} alt="Suyash Singh" className="profile-photo" />
              <div className="image-border"></div>
            </div>
          </AnimatedSection>
          <div className="about-text">
            <AnimatedSection delay={300}>
              <p className="about-intro">
                Hey! I'm <span className="text-gradient">Suyash Singh</span>, a Software Engineer 2 at 
                <span className="text-highlight"> Micron</span>, currently based in Bangalore.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={400}>
              <p>
                I graduated from <span className="text-highlight">BITS Pilani</span> with a B.E. in 
                Electrical & Electronics Engineering, and I enjoy building software that's thoughtful, 
                scalable, and a pleasure to work with.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={500}>
              <p>
                I spend most of my time designing backend systems and full-stack applications, working with {' '}
                <span className="tech-mention">FastAPI</span>, <span className="tech-mention">React.js</span>, {' '}
                <span className="tech-mention">Node.js</span>, <span className="tech-mention">Django</span>, {' '}
                <span className="tech-mention">Flutter</span>, <span className="tech-mention">Spring Boot</span>, and {' '}
                <span className="tech-mention">PostgreSQL</span>. I'm especially interested in automation platforms, 
                event-driven systems, and clean system design—the kind that holds up well as complexity and scale grow.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={600}>
              <p>
                I actively practice Competitive Programming and Data Structures & Algorithms, mostly because 
                I enjoy the problem-solving mindset it builds.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={700}>
              <p className="about-personal">
                Outside of code, I like staying active. I did my schooling in <span className="text-highlight">Varanasi</span>, 
                which is where my curiosity for building and breaking things first started. Whether it's software, 
                fitness, or a new challenge, I'm always looking to learn and get better.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={800}>
              <div className="about-interests">
                <span className="interests-label">When I'm not coding:</span>
                <div className="interests-list">
                  {interests.map((interest, index) => (
                    <span key={index} className="interest-tag">
                      <span className="interest-icon">{interest.icon}</span>
                      {interest.label}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

// Experience Section
const Experience = () => {
  const experiences = [
    {
      title: 'Software Engineer 2',
      company: 'Micron',
      location: 'Bangalore, India',
      period: 'Jul 2024 - Present',
      description: [
        'Spearheading development of Summit, a unified automation platform using FastAPI, React.js and PostgreSQL for automated test workflows, execution, and real-time monitoring',
        'Implemented ArtiFlow, an event-driven automation feature integrating JFrog Artifactory webhooks, resulting in 2× improvement in operational efficiency',
        'Engineered scalable Test Case Management solution with async parallel processing, reducing load times by 50%',
        'Achieved 30% reduction in API response times and scaled system to handle 2× traffic with 99.99% uptime'
      ]
    },
    {
      title: 'Software Engineering Intern',
      company: 'Legistify (YC X22)',
      location: 'Gurgaon, India',
      period: 'Jan 2024 - Jun 2024',
      description: [
        'Built SmartCC, a Node.js micro-service using Gmail APIs and Google Cloud Pub/Sub for real-time email processing',
        'Implemented rule-based triggers and event-driven e-signature reminders improving user experience',
        'Integrated backend services to extract and persist email metadata in MongoDB with robust indexing and caching'
      ]
    },
    {
      title: 'Software Engineering Intern',
      company: 'Société Générale',
      location: 'Bangalore, India',
      period: 'Jul 2023 - Aug 2023',
      description: [
        'Developed scalable backend analytics pipeline using C#, Git CLI, and structured data processing',
        'Architected production-grade desktop application using .NET WPF and MVVM architecture with SQLite storage',
        'Implemented real-time data visualization dashboards using LiveCharts2 for performance benchmarking across global teams'
      ]
    },
    {
      title: 'Machine Learning Intern',
      company: 'Indian Army',
      location: 'Remote',
      period: 'Jun 2022 - Jul 2022',
      description: [
        'Trained YOLOv5-based object detection model for real-time drone detection, achieving 0.67 mAP on custom aerial surveillance dataset',
        'Optimized model for edge deployment using TensorRT and TensorFlow Lite, achieving 120% improvement in inference speed on embedded devices',
        'Designed data augmentation pipeline using Albumentations to enhance model robustness against adverse weather conditions'
      ]
    }
  ];

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <AnimatedSection>
          <h2 className="section-title">
            <span className="title-number">02.</span>
            Experience
          </h2>
        </AnimatedSection>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <AnimatedSection key={index} className="timeline-item" delay={index * 200}>
              <div className="timeline-marker">
                <div className="marker-dot"></div>
                <div className="marker-line"></div>
              </div>
              <div className="timeline-content">
                <div className="experience-header">
                  <div>
                    <h3 className="experience-title">{exp.title}</h3>
                    <p className="experience-company">
                      {exp.company} <span className="separator">•</span> {exp.location}
                    </p>
                  </div>
                  <span className="experience-period">{exp.period}</span>
                </div>
                <ul className="experience-list">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Section
const Projects = () => {
  const projects = [
    {
      title: 'BITS SU App',
      description: 'Official mobile application of the Students\' Union, BITS Pilani, used daily by 5000+ students facilitating INR 60L+ in monthly transactions.',
      tech: ['Flutter', 'Dart', 'Firebase', 'Google Maps API'],
      highlights: [
        'Built scalable production features: newsletters, merchandise signups, event registrations, cab bookings, food ordering',
        'Implemented secure QR code-based authentication and Google Sign-In SSO',
        'Integrated Firebase Cloud Messaging for real-time notifications',
        'Google Maps API integration for live cab tracking and booking'
      ],
      link: 'https://play.google.com/store/apps/details?id=org.subitspilani.bits_su_app&hl=en_IN'
    },
    {
      title: 'StudyDeck',
      description: 'Official app of the Academic Department BITS Pilani, facilitating timetable creation and semester planning for students.',
      tech: ['Flutter', 'Dart', 'Provider', 'sqflite'],
      highlights: [
        'Developed cross-platform Flutter app with interactive timetable visualization and automated conflict resolution',
        'Architected using MVC pattern, integrated Provider for efficient state management',
        'Implemented local response caching with sqflite, reducing server load and improving offline UX'
      ],
      link: 'https://studydeck.bits-sutechteam.org/'
    },
    {
      title: 'PingHire',
      description: 'High-performance candidate-job matching engine using weighted scoring algorithms for precise relevance ranking and recommendations.',
      tech: ['Python', 'Git', 'JSON', 'Design Patterns'],
      highlights: [
        'Architected matching engine evaluating candidates across skills, experience, and education',
        'Built scalable JSON-based data ingestion pipeline for high-throughput matching',
        'Engineered pluggable notification adapter with O(1) integration of new channels'
      ],
      link: 'https://github.com/suyash-03/job-recommendation-backend'
    }
  ];

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <AnimatedSection>
          <h2 className="section-title">
            <span className="title-number">03.</span>
            Projects
          </h2>
        </AnimatedSection>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <AnimatedSection key={index} className="project-card" delay={index * 200}>
              <div className="project-header">
                <div className="project-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <div className="project-links">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label="View project">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                </div>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <ul className="project-highlights">
                {project.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
              <div className="project-tech">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// Skills Section
const Skills = () => {
  const skillCategories = [
    {
      title: 'Languages',
      icon: '💻',
      skills: [
        { name: 'Python', level: 95 },
        { name: 'JavaScript', level: 90 },
        { name: 'Java', level: 85 },
        { name: 'C/C++', level: 80 },
        { name: 'Dart', level: 75 }
      ]
    },
    {
      title: 'Frameworks & Tech',
      icon: '⚙️',
      skills: [
        { name: 'FastAPI', level: 95 },
        { name: 'React.js', level: 90 },
        { name: 'Node.js', level: 85 },
        { name: 'Flutter', level: 80 },
        { name: 'Django', level: 75 }
      ]
    },
    {
      title: 'Databases',
      icon: '🗄️',
      skills: [
        { name: 'PostgreSQL', level: 90 },
        { name: 'MongoDB', level: 85 },
        { name: 'MySQL', level: 85 },
        { name: 'DynamoDB', level: 75 },
        { name: 'Redis', level: 80 }
      ]
    },
    {
      title: 'Tools & DevOps',
      icon: '🛠️',
      skills: [
        { name: 'Git', level: 95 },
        { name: 'Docker', level: 85 },
        { name: 'AWS S3', level: 80 },
        { name: 'Linux', level: 85 },
        { name: 'CI/CD', level: 85 }
      ]
    }
  ];

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <AnimatedSection>
          <h2 className="section-title">
            <span className="title-number">04.</span>
            Skills
          </h2>
        </AnimatedSection>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <AnimatedSection key={index} className="skill-card" delay={index * 150}>
              <div className="skill-card-header">
                <span className="skill-icon">{category.icon}</span>
                <h3>{category.title}</h3>
              </div>
              <div className="skill-list">
                {category.skills.map((skill, i) => (
                  <SkillBar key={i} skill={skill} delay={i * 100} />
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// Skill Bar Component
const SkillBar = ({ skill, delay }) => {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <div ref={ref} className="skill-item">
      <div className="skill-header">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-percentage">{skill.level}%</span>
      </div>
      <div className="skill-bar">
        <div 
          className="skill-progress"
          style={{ 
            width: isVisible ? `${skill.level}%` : '0%',
            transitionDelay: `${delay}ms`
          }}
        ></div>
      </div>
    </div>
  );
};

// Education Section
const Education = () => {
  const education = [
    {
      degree: 'B.E. Electrical and Electronics Engineering',
      institution: 'Birla Institute of Technology and Science, Pilani',
      period: '2020 - 2024',
      description: 'Comprehensive coursework in Data Structures & Algorithms, DBMS, OOP, Operating Systems, Computer Programming, Discrete Mathematics, Graph Theory, and Calculus.',
      highlight: 'BITS Pilani is the alma mater of founders of SanDisk, Hotmail, Swiggy, MPL, Groww, Zeta, BigBasket, BlueJeans, Postman, and several other unicorns.',
      achievements: ['BITS Pilani', 'Associate Dean Recognition']
    }
  ];

  return (
    <section id="education" className="section education">
      <div className="container">
        <AnimatedSection>
          <h2 className="section-title">
            <span className="title-number">05.</span>
            Education
          </h2>
        </AnimatedSection>
        <div className="education-grid">
          {education.map((edu, index) => (
            <AnimatedSection key={index} className="education-card" delay={index * 200}>
              <div className="education-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              <div className="education-content">
                <span className="education-period">{edu.period}</span>
                <h3 className="education-degree">{edu.degree}</h3>
                <p className="education-institution">{edu.institution}</p>
                <p className="education-description">{edu.description}</p>
                {edu.highlight && (
                  <p className="education-highlight">{edu.highlight}</p>
                )}
                <div className="education-achievements">
                  {edu.achievements.map((achievement, i) => (
                    <span key={i} className="achievement-tag">{achievement}</span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <AnimatedSection>
          <h2 className="section-title">
            <span className="title-number">06.</span>
            Get in Touch
          </h2>
        </AnimatedSection>
        <AnimatedSection className="contact-content" delay={200}>
          <p className="contact-description">
            I'm always interested in hearing about new opportunities, challenging projects, 
            or just connecting with fellow developers. Feel free to reach out!
          </p>
          <div className="contact-links">
            <a href="mailto:suyash.singh9450@gmail.com" className="contact-link">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="contact-info">
                <span className="contact-label">Email</span>
                <span className="contact-value">suyash.singh9450@gmail.com</span>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/suyash-singh-bb9477203/" target="_blank" rel="noopener noreferrer" className="contact-link">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </div>
              <div className="contact-info">
                <span className="contact-label">LinkedIn</span>
                <span className="contact-value">Connect on LinkedIn</span>
              </div>
            </a>
            <a href="https://github.com/suyash-03" target="_blank" rel="noopener noreferrer" className="contact-link">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              </div>
              <div className="contact-info">
                <span className="contact-label">GitHub</span>
                <span className="contact-value">github.com/suyash-03</span>
              </div>
            </a>
            <a href="tel:+917007038266" className="contact-link">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className="contact-info">
                <span className="contact-label">Phone</span>
                <span className="contact-value">+91 7007038266</span>
              </div>
            </a>
            <a href="https://drive.google.com/file/d/1BfFVKido3JBLXqRoP-2U2lB2pFr0PoN2/view?usp=share_link" target="_blank" rel="noopener noreferrer" className="contact-link resume-link">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <div className="contact-info">
                <span className="contact-label">Resume</span>
                <span className="contact-value">View My Resume</span>
              </div>
            </a>
          </div>
          <div className="contact-buttons">
            <a href="mailto:suyash.singh9450@gmail.com" className="btn btn-primary btn-large">
              <span>Say Hello</span>
              <svg viewBox="0 0 24 24" className="btn-icon">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="https://drive.google.com/file/d/1BfFVKido3JBLXqRoP-2U2lB2pFr0PoN2/view?usp=share_link" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-large">
              <span>Download Resume</span>
              <svg viewBox="0 0 24 24" className="btn-icon">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>Designed & Built with <span className="heart">❤</span> by Suyash Singh</p>
        <p className="copyright">© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
