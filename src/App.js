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
        <a href="#contact" className="nav-cta">Contact Me</a>
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
        <p className="hero-subtitle">&lt; Data Science Undergraduate /&gt;</p>
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
        <span className="section-tag">{'// who i am'}</span>
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
          <h3>Data Scientist & Developer</h3>
          <p>
            I'm an undergraduate in Data Science with a deep passion for
            building intelligent systems and beautiful web applications. I
            enjoy working at the intersection of data, algorithms, and design.
          </p>
          <p>
            When I'm not analyzing datasets or training models, I'm crafting
            full-stack web experiences using React, Node.js, and modern cloud
            technologies. I believe great software is both functional and
            beautiful.
          </p>

          <div className="about-stats">
            <div className="stat-card">
              <div className="stat-icon"><FaCode /></div>
              <div className="stat-number">10+</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><HiOutlineAcademicCap /></div>
              <div className="stat-number">3+</div>
              <div className="stat-label">Years Learning</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><HiOutlineCpuChip /></div>
              <div className="stat-number">5+</div>
              <div className="stat-label">Technologies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Skills ─── */
const SKILLS = [
  { icon: <FaReact />,        name: "React",         level: "Advanced" },
  { icon: <SiJavascript />,   name: "JavaScript",    level: "Advanced" },
  { icon: <FaPython />,       name: "Python",        level: "Advanced" },
  { icon: <FaNodeJs />,       name: "Node.js",       level: "Intermediate" },
  { icon: <SiMongodb />,      name: "MongoDB",       level: "Intermediate" },
  { icon: <SiPandas />,       name: "Pandas",        level: "Advanced" },
  { icon: <SiScikitlearn />,  name: "Sci-kit Learn", level: "Intermediate" },
  { icon: <FaGitAlt />,       name: "Git",           level: "Advanced" },
  { icon: <SiExpress />,      name: "Express",       level: "Intermediate" },
  { icon: <FaCss3Alt />,      name: "CSS",           level: "Advanced" },
];

function Skills() {
  return (
    <div className="section-bg section-full" id="skills">
      <div className="section-inner">
        <div className="section-header reveal">
          <span className="section-tag">{'// what i know'}</span>
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
    tags: ["Python", "Pandas", "ML"],
    title: "Data Analytics Dashboard",
    desc: "An interactive dashboard that visualises large datasets using Python, Pandas and Plotly. Includes predictive analytics powered by scikit-learn models.",
    github: "#",
    live: "#",
  },
  {
    id: 2,
    icon: <HiOutlineGlobeAlt />,
    previewClass: "project-preview-2",
    tags: ["React", "Node.js", "MongoDB"],
    title: "Full-Stack Web App",
    desc: "A feature-rich MERN stack application with JWT authentication, REST API, real-time updates via WebSockets, and a responsive modern UI.",
    github: "#",
    live: "#",
  },
  {
    id: 3,
    icon: <FaBrain />,
    previewClass: "project-preview-3",
    tags: ["Python", "NLP", "Flask"],
    title: "NLP Sentiment Analyser",
    desc: "A natural language processing tool that analyses text sentiment using transformer models, deployed as a REST API with a clean React frontend.",
    github: "#",
    live: "#",
  },
];

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-header reveal">
        <span className="section-tag">{"// what i've built"}</span>
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
                <a href={p.live} className="overlay-btn">
                  <FaExternalLinkAlt /> Live Demo
                </a>
                <a href={p.github} className="overlay-btn ghost">
                  <FaGithub /> GitHub
                </a>
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
                <a href={p.live} className="project-link primary">
                  <FaRocket /> Live Demo
                </a>
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
          <span className="section-tag">{"// let's talk"}</span>
          <h2 className="section-title">
            Get In <span>Touch</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="contact-wrapper">
          <div className="contact-info reveal">
            <h3>Let's build something amazing together</h3>
            <p>
              I'm currently open to internships, freelance projects, and
              full-time opportunities. Whether you have a question or just want
              to say hi — my inbox is always open!
            </p>

            <div className="contact-items">
              <a href="mailto:nimani@email.com" className="contact-item">
                <div className="contact-icon"><FaEnvelope /></div>
                <div className="contact-item-text">
                  <strong>Email</strong>
                  <span>nimani@email.com</span>
                </div>
              </a>
              <a href="https://github.com/nimani" className="contact-item" target="_blank" rel="noreferrer">
                <div className="contact-icon"><FaGithub /></div>
                <div className="contact-item-text">
                  <strong>GitHub</strong>
                  <span>github.com/nimani</span>
                </div>
              </a>
              <a href="https://linkedin.com/in/nimani" className="contact-item" target="_blank" rel="noreferrer">
                <div className="contact-icon"><HiOutlineBriefcase /></div>
                <div className="contact-item-text">
                  <strong>LinkedIn</strong>
                  <span>linkedin.com/in/nimani</span>
                </div>
              </a>
            </div>
          </div>

          <div className="contact-form reveal" style={{ transitionDelay: "0.15s" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div className="success-icon-wrapper">
                  <HiOutlineSparkles />
                </div>
                <h3 style={{ marginBottom: "8px" }}>Message Sent!</h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  Thanks for reaching out. I'll get back to you soon!
                </p>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handle}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handle}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={handle}
                    required
                  />
                </div>
                <button type="submit" className="form-submit">
                  Send Message <HiOutlinePaperAirplane />
                </button>
              </form>
            )}
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
        © 2026 Nimani Thathsarani · Built with React
      </p>
      <div className="footer-socials">
        <a href="https://github.com/nimani" className="social-link" target="_blank" rel="noreferrer" aria-label="GitHub">
          <FaGithub />
        </a>
        <a href="https://linkedin.com/in/nimani" className="social-link" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <FaLinkedinIn />
        </a>
        <a href="mailto:nimani@email.com" className="social-link" aria-label="Email">
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