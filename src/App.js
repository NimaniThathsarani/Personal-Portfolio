import React, { useEffect, useRef, useState } from "react";
import "./App.css";

// ─── Icons ───
import {
  FaReact, FaNodeJs, FaPython, FaGitAlt, FaGithub,
  FaLinkedinIn, FaEnvelope, FaExternalLinkAlt, FaStar,
  FaRocket, FaCode, FaCss3Alt, FaBrain
} from "react-icons/fa";
import {
  SiMongodb, SiExpress, SiPandas, SiScikitlearn, SiJavascript
} from "react-icons/si";
import {
  HiOutlineArrowDown, HiOutlinePaperAirplane,
  HiOutlineSparkles, HiOutlineBriefcase, HiOutlineAcademicCap,
  HiOutlineChartBar, HiOutlineGlobeAlt, HiOutlineCpuChip
} from "react-icons/hi2";
import { BsPersonWorkspace } from "react-icons/bs";

/* ─── Particle Canvas ─── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124, 58, 237, ${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas id="particles-canvas" ref={canvasRef} />;
}

/* ─── Scroll Reveal Hook ─── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="logo">NT.</div>
      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
        <a href="/NIMANI_THATHSARANI.pdf" download="NIMANI_THATHSARANI_CV.pdf" className="nav-cta">
           Download CV
        </a>
      </div>
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg-glow" />
      <div className="hero-content">
        <div className="hero-badge">
          <HiOutlineSparkles className="badge-icon" />
          Available for opportunities
        </div>
        <h1 className="hero-title">
          Hi, I'm <span className="highlight">Nimani</span>
          <br />
          Thathsarani
        </h1>
        <p className="hero-subtitle">&lt; Data Science Undergraduate &gt;</p>
        <p className="hero-description">
          Passionate about turning raw data into meaningful insights. I build
          intelligent applications and elegant web experiences with modern
          technologies.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn-primary">
            <FaRocket /> View My Work
          </a>
          <a href="#contact" className="btn-secondary">
            <FaEnvelope /> Get In Touch
          </a>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-line" />
        <HiOutlineArrowDown />
        scroll
      </div>
    </section>
  );
}

/* ─── About ─── */
function About() {
  return (
    <section id="about" className="section">
      <div className="section-header reveal">
        <h2 className="section-title">
          About <span>Me</span>
        </h2>
        <div className="section-divider" />
      </div>

      <div className="about-wrapper">
        <div className="about-avatar reveal">
          <div className="avatar-ring">
            <div className="avatar-inner">
              <BsPersonWorkspace />
            </div>
          </div>
        </div>

        <div className="about-text reveal">
          <h3>Data Science Undergraduate</h3>
          <p>
            I’m a Data Science undergraduate passionate about building intelligent, data-driven solutions and modern web applications. I enjoy transforming raw data into meaningful insights through machine learning, analytics and visualization.
          </p>
          <p>
            Alongside data science, I love creating full-stack applications using React, Node.js, Python and cloud technologies. I’m especially interested in projects that combine AI with user-centered design to create impactful digital experiences.
          </p>
          <p>
            I enjoy learning new technologies, solving real-world problems and building software that is both functional and visually engaging. Currently, I’m focused on improving my skills in machine learning engineering, data analytics and scalable web development.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Skills ─── */
const SKILLS = [
  { icon: <FaReact />,        name: "React",         },
  { icon: <SiJavascript />,   name: "JavaScript",    },
  { icon: <FaPython />,       name: "Python",        },
  { icon: <FaNodeJs />,       name: "Node.js",       },
  { icon: <SiMongodb />,      name: "MongoDB",       },
  { icon: <SiPandas />,       name: "Pandas",        },
  { icon: <SiScikitlearn />,  name: "Sci-kit Learn", },
  { icon: <FaGitAlt />,       name: "Git",           },
  { icon: <SiExpress />,      name: "Express",       },
  { icon: <FaCss3Alt />,      name: "CSS",           },
];

function Skills() {
  return (
    <div className="section-bg section-full" id="skills">
      <div className="section-inner">
        <div className="section-header reveal">
          <h2 className="section-title">
            My <span>Skills</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="skills-wrapper">
          {SKILLS.map((skill, i) => (
            <div
              className="skill-card reveal"
              key={skill.name}
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <span className="skill-icon">{skill.icon}</span>
              <div className="skill-name">{skill.name}</div>
              <div className="skill-level">{skill.level}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Projects ─── */
const PROJECTS = [
  {
    id: 1,
    icon: <HiOutlineChartBar />,
    previewClass: "project-preview-1",
    tags: ["Python", "Pandas", "ML", "React", "Node.js", "Express", "FastAPI", "scikit-learn", "MongoDB" ],
    title: "AI Powered Printing Management System",
    desc: "A full stack AI-powered printing management system for real world business operations. The system includes order management, scheduling, inventory, billing, and notifications, enhanced with an ML-based delay prediction model using Python and Scikit-learn to identify high-risk orders based on operational data.",
    github: "https://github.com/NimaniThathsarani/ShanArts.git",
  },
  {
    id: 2,
    icon: <HiOutlineGlobeAlt />,
    previewClass: "project-preview-2",
    tags: ["Python", "Pandas", "ML", "Uvicorn", "Docker", "Streamlit", "FastAPI", "scikit-learn", "MongoDB"],
    title: "House Price Prediction System",
    desc: "The Real-Time House Price Prediction System is an AI-powered web application that predicts house prices in real time using machine learning. The project demonstrates end-to-end MLOps concepts including data preprocessing, model training, FastAPI deployment, Docker containerization and cloud deployment in a production-style workflow.",
    github: "https://github.com/NimaniThathsarani/Real-Time-House-Price-Prediction-System.git",
  },
  {
    id: 3,
    icon: <FaBrain />,
    previewClass: "project-preview-3",
    tags: ["React", "Node.js", "Railway", "MongoDB"],
    title: "Pet Care Management System",
    desc: "A mobile application designed to simplify and manage pet care services such as boarding, daycare, grooming and veterinary appointments. The system supports multiple user roles including customers and service managers, allowing users to easily register pets, book services, manage schedules, and track service updates in real time.",
    github: "https://github.com/NimaniThathsarani/petcare-system.git",
  },
];

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-header reveal">
        <h2 className="section-title">
          Featured <span>Projects</span>
        </h2>
        <div className="section-divider" />
      </div>

      <div className="projects-grid">
        {PROJECTS.map((p, i) => (
          <div
            className="project-card reveal"
            key={p.id}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className={`project-preview ${p.previewClass}`}>
              <span className="project-preview-icon">{p.icon}</span>
              <div className="project-overlay">
              </div>
            </div>
            <div className="project-body">
              <div className="project-tags">
                {p.tags.map((t) => (
                  <span className="project-tag" key={t}>{t}</span>
                ))}
              </div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-links">
                <a href={p.github} className="project-link secondary">
                  <FaStar /> GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Contact ─── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="section-bg section-full" id="contact">
      <div className="section-inner">
        <div className="section-header reveal">
          <h2 className="section-title">
            Get In <span>Touch</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="contact-wrapper">
          <div className="contact-info reveal">
            <p>
              I enjoy learning new technologies, solving real-world problems and building software that is both functional and visually engaging. Currently, I’m focused on improving my skills in machine learning engineering, data analytics and scalable web development.
            </p>

            <div className="contact-items">
              <a href="mailto:nimani2thathsarani@gmail.com" className="contact-item">
                <div className="contact-icon"><FaEnvelope /></div>
                <div className="contact-item-text">
                  <strong>Email</strong>
                  <span>nimani2thathsarani@gmail.com</span>
                </div>
              </a>
              <a href="https://github.com/NimaniThathsarani" className="contact-item" target="_blank" rel="noreferrer">
                <div className="contact-icon"><FaGithub /></div>
                <div className="contact-item-text">
                  <strong>GitHub</strong>
                  <span>github.com/NimaniThathsarani</span>
                </div>
              </a>
              <a href="https://linkedin.com/in/nimani-thathsarani" className="contact-item" target="_blank" rel="noreferrer">
                <div className="contact-icon"><HiOutlineBriefcase /></div>
                <div className="contact-item-text">
                  <strong>LinkedIn</strong>
                  <span>linkedin.com/in/nimani-thathsarani</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">NT.</div>
      <p className="footer-copy">
        © 2026 Nimani Thathsarani
      </p>
      <div className="footer-socials">
        <a href="https://github.com/NimaniThathsarani" className="social-link" target="_blank" rel="noreferrer" aria-label="GitHub">
          <FaGithub />
        </a>
        <a href="https://linkedin.com/in/nimani-thathsarani" className="social-link" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <FaLinkedinIn />
        </a>
        <a href="mailto:nimani2thathsarani@gmail.com" className="social-link" aria-label="Email">
          <FaEnvelope />
        </a>
      </div>
    </footer>
  );
}

/* ─── App ─── */
export default function App() {
  useScrollReveal();

  return (
    <>
      <ParticleCanvas />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}