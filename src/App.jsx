import React, { useEffect, useMemo, useRef, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import logo from "./images/rec_trans_ultim.png";
import { DiReact } from "react-icons/di";
import { DiHtml5 } from "react-icons/di";
import { DiCss3 } from "react-icons/di";
import { DiJavascript1 } from "react-icons/di";
import { DiNpm } from "react-icons/di";
import { DiNodejs } from "react-icons/di";
import { DiGit } from "react-icons/di";
import { DiGithubBadge } from "react-icons/di";
import { DiMysql } from "react-icons/di";
import { DiDatabase } from "react-icons/di";
import { SiNextdotjs } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { SiTailwindcss } from "react-icons/si";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [full, setFull] = useState(false);
  const drawerRef = useRef(null);
  const closeBtnRef = useRef(null);

  const reduceMotion = useReducedMotion();

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
      delay: 0,
    });
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => {
      const size = Math.random() * 4 + 2;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const hue = Math.random() * 60 + 200;
      const duration = 3 + Math.random() * 2;
      const delay = Math.random() * 2;
      const x1 = Math.random() * 100 - 50;
      const x2 = Math.random() * 200 - 100;

      return {
        id: i,
        size,
        left,
        top,
        hue,
        duration,
        delay,
        x1,
        x2,
      };
    });
  }, []);

  const openMenu = (b) => {
    setMenuOpen(b);
  };

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const total = Math.max(1, scrollHeight - clientHeight);
      setScrollProgress(Math.min(100, Math.max(0, (scrollTop / total) * 100)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let raf = 0;
    let lastMoveTime = 0;
    const onMove = (e) => {
      const now = Date.now();
      if (now - lastMoveTime < 16) return; // Throttle to ~60fps
      lastMoveTime = now;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        document.documentElement.style.setProperty(
          "--cursor-x",
          `${e.clientX}px`,
        );
        document.documentElement.style.setProperty(
          "--cursor-y",
          `${e.clientY}px`,
        );
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const sectionIds = ["home", "about", "tools", "works", "contact"];
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0),
          );

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.5, 0.65, 0.8],
      },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      closeBtnRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }

    const onKeyDown = (e) => {
      if (!menuOpen) return;

      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (e.key !== "Tab") return;
      const root = drawerRef.current;
      if (!root) return;

      const focusable = Array.from(
        root.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey) {
        if (active === first || active === root) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const worksList = [
    {
      title: "I.",
      elem: "App to track purchases (2020) 'ALGAL'.",
      details: [
        "App to track daily purchases and expenses",
        "Focus on simple UI and data organization",
        "Early project that introduced me to real-world app logic",
      ],
    },
    {
      title: "II.",
      elem: "Covid Tracker App (2020) 'ESI'.",
      details: [
        "Real-time Covid statistics tracking",
        "Data visualization and updates",
        "Built during the pandemic as a practical use-case project",
      ],
    },
    {
      title: "III.",
      elem: "Car allowance App AutoLibDZ (2021) 'ESI'.",
      details: [
        "Application to manage car allowance and usage",
        "Business-oriented logic and form handling",
        "First exposure to structured application workflows",
      ],
    },
    {
      title: "IV.",
      elem: "Arabic E-learning App (2022) 'UAMOB'.",
      details: [
        "Arabic-focused e-learning application",
        "Courses, structured content, and user interaction",
        "Emphasis on accessibility and language-first UX",
      ],
    },
    {
      title: "V.",
      elem: "Web Developer/ IT Manger (2023- 2025) 'SONATRES'.",
      details: [
        "Full-stack developer on production-grade applications",
        "Built marketplaces, dashboards, stock & order systems",
        "Web and mobile apps with real users and real data",
      ],
    },
    {
      title: "VI.",
      elem: "Freelance Full-Stack Developer (2022 – Present).",
      details: [
        "E-commerce applications (web & mobile): Product catalogs, variants, cart, checkout, orders, admin dashboards",
        "Inventory & stock management systems: Real-time stock, entries & sales tracking, reporting, export tools",
        "Business websites & internal tools: Company websites, admin panels, dashboards, automation tools",
        "Mobile applications: Cross-platform apps with React Native, connected to real backends",
      ],
    },
  ];

  const descList = [
    {
      title: "Software Engineer",
      elem: "Graduated from the Higher School of Computer Science, 'ESI' (Algeria).",
    },
    {
      title: "Web",
      elem: "developper and passionate about Data Dcience, ML and AI.",
    },
    { title: "Full", elem: "stack developer with good experience in:" },
    { title: "React JS", elem: "Animation and UI tools libraries." },
    {
      title: "Next.js",
      elem: "framework for building server-side rendered and static web applications.",
    },
    { title: "React Native", elem: "application development." },
    { title: "Node Js", elem: "APIs." },
    { title: "MySQL", elem: "database." },
    { title: "Git/ GitHub", elem: "" },
  ];
  useEffect(() => {
    if (menuOpen) {
      document.querySelector("body").style.overflow = "hidden";
    }
    return () => {
      document.querySelector("body").style.overflow = "scroll";
    };
  }, [menuOpen]);

  return (
    <div className="App">
      <div className="scrollProgressBar" aria-hidden="true">
        <motion.div
          className="scrollProgressBarFill"
          animate={{ width: `${scrollProgress}%` }}
          transition={{ type: "spring", stiffness: 220, damping: 30 }}
        />
      </div>
      <div className="cursorGlow" aria-hidden="true" />
      <img
        id="logoFull"
        style={{
          pointerEvents: full && "all",
          height: full && "100vh",
          width: full && "100%",
          borderColor: full && "red",
          background: full && "white",
        }}
        src={logo}
        alt=""
        onClick={() => {
          setFull(false);
        }}
      />
      {!menuOpen && (
        <>
          <span className="twin"></span>
        </>
      )}
      <div className="starsone">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div>
      <div className="starstwo">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div>
      <div className="starsthree">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div>
      <div className="starsfour">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div>
      <div className="enhancedBackground">
        <div className="gradientOverlay"></div>
        <div className="nebulaLayer" aria-hidden="true" />
        <div className="starfieldParallax layer1" aria-hidden="true" />
        <div className="starfieldParallax layer2" aria-hidden="true" />
        <div className="shootingStar" aria-hidden="true" />
        <div className="particlesContainer">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="particle"
              initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
              animate={
                reduceMotion
                  ? { opacity: 0.35 }
                  : {
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      y: [0, -100, -200],
                      x: [0, p.x1, p.x2],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: p.duration,
                      repeat: Infinity,
                      delay: p.delay,
                    }
              }
              style={{
                position: "absolute",
                width: p.size + "px",
                height: p.size + "px",
                background: `hsl(${p.hue}, 70%, 70%)`,
                borderRadius: "50%",
                left: p.left + "%",
                top: p.top + "%",
              }}
            />
          ))}
        </div>
        <div className="geometricShapes">
          <motion.div
            className="floatingShape shape1"
            animate={{ rotate: 360, y: [0, -20, 0] }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
          />
          <motion.div
            className="floatingShape shape2"
            animate={{ rotate: -360, x: [0, 30, 0] }}
            transition={{
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              x: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
          />
          <motion.div
            className="floatingShape shape3"
            animate={{ scale: [1, 1.2, 1], rotate: 180 }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
      <motion.div
        initial={{
          position: "fixed",
          top: 0,
          height: "100vh",
          width: "100%",
          zIndex: 10,
          background: "white",
        }}
        animate={{ width: 0 }}
        transition={{ delay: 1, duration: 1 }}
      ></motion.div>
      <motion.div
        initial={{
          position: "fixed",
          top: 0,
          height: "100vh",
          width: "100%",
          zIndex: 10,
          background: "black",
        }}
        animate={{ height: 0 }}
        transition={{ duration: 1 }}
      ></motion.div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menuOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMenuOpen(false)}
            role="presentation"
          >
            <motion.div
              className="menuDrawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="menu-title"
              tabIndex={-1}
              ref={drawerRef}
            >
              <div className="menuDrawerHeader">
                <div className="menuDrawerTitle" id="menu-title">
                  Menu
                </div>
                <button
                  className="menuCloseBtn"
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  ref={closeBtnRef}
                >
                  ×
                </button>
              </div>
              <ul className="menuDrawerLinks">
                <li>
                  <a
                    href="#home"
                    onClick={() => setMenuOpen(false)}
                    className={activeSection === "home" ? "active" : ""}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={() => setMenuOpen(false)}
                    className={activeSection === "about" ? "active" : ""}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#tools"
                    onClick={() => setMenuOpen(false)}
                    className={activeSection === "tools" ? "active" : ""}
                  >
                    Tools
                  </a>
                </li>
                <li>
                  <a
                    href="#works"
                    onClick={() => setMenuOpen(false)}
                    className={activeSection === "works" ? "active" : ""}
                  >
                    Works
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={() => setMenuOpen(false)}
                    className={activeSection === "contact" ? "active" : ""}
                  >
                    Contact
                  </a>
                </li>
              </ul>
              <div className="menuDrawerHint">Press Esc to close</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="home">
        <nav
          style={{
            height: !show && 0,
            opacity: !show && 0,
            pointerEvents: !show && "none",
          }}
        >
          <div className="logo_container">
            <img
              id="logo"
              alt=""
              src={logo}
              onClick={() => {
                setFull(true);
              }}
            />
          </div>
          {/*<h1 style= {{fontSize: "4vw"}}>MUSTAPHA HMK</h1>*/}
          <Hamburger
            toggled={menuOpen}
            onToggle={() => openMenu(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          />
        </nav>
        <div className="homeMain">
          {/*
          <div
            className="moon"
            style={{
              position: "absolute",
              zIndex: "-3",
              borderRadius: "50%",
              background: "white",
              width: "40vw",
              height: "0",
              paddingTop: "40vw",
            }}
          >
            <motion.div
              className="moonGlow"
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{
                position: "absolute",
                top: "-10%",
                left: "-10%",
                right: "-10%",
                bottom: "-10%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
                borderRadius: "50%",
                filter: "blur(20px)",
              }}
            />
            <div
              className="moonJr"
              style={{
                borderRadius: "50%",
                background: "rgb(245, 245, 245)",
                position: "absolute",
                height: "auto",
                width: "25%",
                paddingTop: "25%",
                left: "10%",
                top: "20%",
              }}
            ></div>
            <div
              className="moonJr"
              style={{
                borderRadius: "50%",
                background: "rgb(245, 245, 245)",
                position: "absolute",
                height: "auto",
                width: "15%",
                paddingTop: "15%",
                right: "15%",
                top: "35%",
              }}
            ></div>
            <div
              className="moonJr"
              style={{
                borderRadius: "50%",
                background: "rgb(245, 245, 245)",
                position: "absolute",
                height: "auto",
                width: "10%",
                paddingTop: "10%",
                right: "5%",
                top: "60%",
              }}
            ></div>
          </div>
          */}
          <div className="heroContent">
            <div className="textContainer">
              <motion.div className="nameContainer">
                <motion.h1
                  id="title"
                  style={{ zIndex: "3" }}
                  animate={{ x: 0 }}
                  initial={{ x: -1000 }}
                  transition={{ delay: 2, duration: 1 }}
                >
                  KACIMI ELHASSANI Mustapha
                </motion.h1>
                <motion.div
                  className="underline"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 3, duration: 0.8 }}
                />
              </motion.div>
              <motion.div className="roleContainer">
                <motion.p
                  className="role"
                  style={{
                    color: "#FA58B6",
                    zIndex: "3",
                    fontStyle: "italic",
                    fontWeight: "bolder",
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 3, duration: 1 }}
                >
                  Software Engineer
                </motion.p>
                <motion.p
                  className="specialty"
                  style={{ color: "#61DBFB", zIndex: "3", fontWeight: "bold" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.5, duration: 1 }}
                >
                  Web Developer
                </motion.p>
              </motion.div>
            </div>
            <motion.div
              className="ctaContainer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4, duration: 1 }}
            >
              <motion.button
                className="ctaButton"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(250, 88, 182, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .getElementById("about")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Discover Who I Am
              </motion.button>
            </motion.div>
          </div>
          <motion.div
            className="portfolioTitle"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 4.5, duration: 1 }}
          >
            <motion.h1
              id="title"
              className="portfolioText"
              style={{
                color: "#FA58B6",
                fontSize: "3vw",
                letterSpacing: "1px",
              }}
              animate={{ x: 0 }}
              initial={{ x: 1000 }}
              transition={{ delay: 4, duration: 1 }}
            >
              PORTOFOLIO
            </motion.h1>
            <motion.div
              className="titleGlow"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>

      <>
        <div id="about">
          <div className="aboutMain" data-aos="fade-up" data-aos-duration="800">
            {
              <>
                <motion.div className="aboutHeader">
                  <motion.h1 id="title" className="aboutTitle">
                    About ME
                  </motion.h1>
                  <motion.div
                    className="titleDecoration"
                    initial={{ width: 0 }}
                    animate={{ width: "200px" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </motion.div>

                <div className="aboutContent">
                  <motion.div className="profileCard">
                    <div className="profileImage">
                      <motion.div
                        className="avatarPlaceholder"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <span className="avatarText">HMK</span>
                      </motion.div>
                      <motion.div
                        className="avatarGlow"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </div>
                    <div className="profileInfo">
                      <h3>KACIMI ELHASSANI Mustapha</h3>
                      <p className="profileRole">Software Engineer</p>
                      <div className="profileStats">
                        <motion.div
                          className="statItem"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <span className="statNumber">5+</span>
                          <span className="statLabel">Years Experience</span>
                        </motion.div>
                        <motion.div
                          className="statItem"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <span className="statNumber">50+</span>
                          <span className="statLabel">Projects Completed</span>
                        </motion.div>
                        <motion.div
                          className="statItem"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <span className="statNumber">10+</span>
                          <span className="statLabel">Technologies</span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div className="detailsSection">
                    <div className="descriptionCard">
                      <h4>Who Am I?</h4>
                      <div className="descriptionContent">
                        {descList.map((e, i) => (
                          <motion.div
                            key={i}
                            className="descItem"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.2, duration: 0.6 }}
                          >
                            <span className="descTitle">{e.title}</span>
                            <span className="descText">{e.elem}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="skillsProgress">
                      <h4>Core Competencies</h4>
                      <div className="skillBars">
                        <motion.div
                          className="skillItem"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ delay: 0.5, duration: 1 }}
                        >
                          <span className="skillName">
                            Frontend Development
                          </span>
                          <div className="skillBar">
                            <motion.div
                              className="skillProgress"
                              initial={{ width: 0 }}
                              animate={{ width: "90%" }}
                              transition={{ delay: 1, duration: 1.5 }}
                              style={{
                                background:
                                  "linear-gradient(90deg, #FA58B6, #61DBFB)",
                              }}
                            />
                          </div>
                          <span className="skillPercent">90%</span>
                        </motion.div>

                        <motion.div
                          className="skillItem"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ delay: 0.7, duration: 1 }}
                        >
                          <span className="skillName">Backend Development</span>
                          <div className="skillBar">
                            <motion.div
                              className="skillProgress"
                              initial={{ width: 0 }}
                              animate={{ width: "75%" }}
                              transition={{ delay: 1.2, duration: 1.5 }}
                              style={{
                                background:
                                  "linear-gradient(90deg, #61DBFB, #FA58B6)",
                              }}
                            />
                          </div>
                          <span className="skillPercent">75%</span>
                        </motion.div>

                        <motion.div
                          className="skillItem"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ delay: 0.9, duration: 1 }}
                        >
                          <span className="skillName">Database Design</span>
                          <div className="skillBar">
                            <motion.div
                              className="skillProgress"
                              initial={{ width: 0 }}
                              animate={{ width: "75%" }}
                              transition={{ delay: 1.4, duration: 1.5 }}
                              style={{
                                background:
                                  "linear-gradient(90deg, #FA58B6, #61DBFB)",
                              }}
                            />
                          </div>
                          <span className="skillPercent">75%</span>
                        </motion.div>

                        <motion.div
                          className="skillItem"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ delay: 1.1, duration: 1 }}
                        >
                          <span className="skillName">UI/UX Design</span>
                          <div className="skillBar">
                            <motion.div
                              className="skillProgress"
                              initial={{ width: 0 }}
                              animate={{ width: "70%" }}
                              transition={{ delay: 1.6, duration: 1.5 }}
                              style={{
                                background:
                                  "linear-gradient(90deg, #61DBFB, #FA58B6)",
                              }}
                            />
                          </div>
                          <span className="skillPercent">70%</span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.div className="timelineSection">
                  <h4>Career Journey</h4>
                  <div className="timeline">
                    <motion.div
                      className="timelineItem"
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    >
                      <div className="timelineDot"></div>
                      <div className="timelineContent">
                        <h5>Now</h5>
                        <ul>
                          <li>Full-stack developer</li>
                          <li>
                            Focus on clean UI, solid backend and real business
                            logic
                          </li>
                        </ul>
                      </div>
                    </motion.div>
                    <motion.div
                      className="timelineItem"
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    >
                      <div className="timelineDot"></div>
                      <div className="timelineContent">
                        <h5>2023 – Real products</h5>
                        <ul>
                          <li>E-commerce apps</li>
                          <li>Marketplaces</li>
                          <li>Mobile apps (React Native)</li>
                          <li>Deployment & hosting</li>
                        </ul>
                      </div>
                    </motion.div>

                    <motion.div
                      className="timelineItem"
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                    >
                      <div className="timelineDot"></div>
                      <div className="timelineContent">
                        <h5>2022 – Full-stack</h5>
                        <ul>
                          <li>Node.js + Express</li>
                          <li>MySQL databases</li>
                          <li>Auth, dashboards, admin panels</li>
                        </ul>
                      </div>
                    </motion.div>

                    <motion.div
                      className="timelineItem"
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1, duration: 0.8 }}
                    >
                      <div className="timelineDot"></div>
                      <div className="timelineContent">
                        <h5>2021 – Level up</h5>
                        <ul>
                          <li>React basics</li>
                          <li>Built real CRUD apps</li>
                          <li>Learned REST APIs</li>
                        </ul>
                      </div>
                    </motion.div>

                    <motion.div
                      className="timelineItem"
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4, duration: 0.8 }}
                    >
                      <div className="timelineDot"></div>
                      <div className="timelineContent">
                        <h5>2020 – Started</h5>
                        <ul>
                          <li>Discovered web development</li>
                          <li>HTML, CSS, basic JS</li>
                          <li>First small sites</li>
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  className="ctaSection"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 1 }}
                >
                  <motion.button
                    className="ctaButton secondary"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 30px rgba(97, 219, 251, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      document
                        .getElementById("works")
                        .scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    View My Work
                  </motion.button>
                  <motion.button
                    className="ctaButton primary"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 30px rgba(250, 88, 182, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      document
                        .getElementById("contact")
                        .scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Get In Touch
                  </motion.button>
                </motion.div>
              </>
            }
          </div>
        </div>

        <div id="tools">
          <div className="toolsMain" data-aos="fade-up" data-aos-duration="800">
            {
              <>
                <div className="toolsHeader">
                  <h1 id="title" className="toolsTitle">
                    Mastered Tools
                  </h1>
                  <div className="toolsTitleDecoration" />
                  <p className="toolsSubtitle">
                    A curated stack I use to ship clean, performant products.
                  </p>
                </div>
                <div className="toolsList toolsGrid">
                  <div className="toolsCat">
                    <h4>FrontEnd</h4>
                    <motion.div
                      className="tool"
                      transition={{ duration: 0.5 }}
                      initial={{ x: -1000, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -1000, opacity: 0 }}
                    >
                      <DiHtml5 style={{ color: "orange" }} id="toolIcon" />
                      <span className="toolName" style={{ color: "#E34C26" }}>
                        HTML5
                      </span>
                    </motion.div>
                    <motion.div
                      className="tool"
                      transition={{ duration: 0.5 }}
                      initial={{ x: -1000, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -1000, opacity: 0 }}
                    >
                      <DiCss3 style={{ color: "blue" }} id="toolIcon" />
                      <span className="toolName" style={{ color: "#0F5298" }}>
                        CSS3
                      </span>
                    </motion.div>
                    <motion.div
                      className="tool"
                      transition={{ duration: 0.5 }}
                      initial={{ x: -1000, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -1000, opacity: 0 }}
                    >
                      <SiTailwindcss
                        style={{ color: "skyblue" }}
                        id="toolIcon"
                      />
                      <span className="toolName" style={{ color: "blue" }}>
                        Tailwind
                      </span>
                    </motion.div>
                  </div>
                  <div className="toolsCat">
                    <h4>JavaScript</h4>
                    <motion.div
                      className="tool"
                      transition={{ duration: 0.5, delay: 0.5 }}
                      initial={{ y: -1000, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -1000, opacity: 0 }}
                    >
                      <DiJavascript1
                        style={{ color: "yellow" }}
                        id="toolIcon"
                      />
                      <span className="toolName" style={{ color: "#F0DB4F" }}>
                        JavaScript
                      </span>
                    </motion.div>
                    <motion.div
                      className="tool"
                      transition={{ duration: 0.5, delay: 0.5 }}
                      initial={{ y: -1000, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -1000, opacity: 0 }}
                    >
                      <DiReact style={{ color: "skyblue" }} id="toolIcon" />
                      <span className="toolName" style={{ color: "#61DBFB" }}>
                        ReactJS
                      </span>
                    </motion.div>
                    <motion.div
                      className="tool"
                      transition={{ duration: 0.5, delay: 0.5 }}
                      initial={{ y: -1000, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -1000, opacity: 0 }}
                    >
                      <SiNextdotjs style={{ color: "black" }} id="toolIcon" />
                      <span className="toolName" style={{ color: "black" }}>
                        Next.js
                      </span>
                    </motion.div>
                    <motion.div
                      className="tool"
                      transition={{ duration: 0.5, delay: 0.5 }}
                      initial={{ y: -1000, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -1000, opacity: 0 }}
                    >
                      <TbBrandReactNative
                        style={{ color: "skyblue" }}
                        id="toolIcon"
                      />
                      <span className="toolName" style={{ color: "#61DBFB" }}>
                        React Native
                      </span>
                    </motion.div>
                  </div>
                  <div className="toolsCat">
                    <h4>BackEnd</h4>
                    <motion.div
                      className="tool"
                      transition={{ duration: 0.5, delay: 1 }}
                      initial={{ x: 1000, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 1000, opacity: 0 }}
                    >
                      <DiNodejs style={{ color: "green" }} id="toolIcon" />
                      <span className="toolName" style={{ color: "#3C873A" }}>
                        NodeJS
                      </span>
                    </motion.div>
                    <motion.div
                      className="tool"
                      transition={{ duration: 0.5, delay: 1 }}
                      initial={{ x: 1000, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 1000, opacity: 0 }}
                    >
                      <DiNpm style={{ color: "red" }} id="toolIcon" />
                      <span className="toolName" style={{ color: "#CC3534" }}>
                        NPM
                      </span>
                    </motion.div>
                  </div>
                  <div className="toolsCat">
                    <h4>DataBase</h4>
                    <motion.div
                      className="tool"
                      transition={{ duration: 0.5, delay: 1.5 }}
                      initial={{ y: 1000, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 1000, opacity: 0 }}
                    >
                      <DiDatabase style={{ color: "gray" }} id="toolIcon" />
                      <span className="toolName" style={{ color: "gray" }}>
                        DateBase
                      </span>
                    </motion.div>
                    <motion.div
                      className="tool"
                      transition={{ duration: 0.5, delay: 1.5 }}
                      initial={{ y: 1000, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 1000, opacity: 0 }}
                    >
                      <DiMysql style={{ color: "orange" }} id="toolIcon" />
                      <span className="toolName" style={{ color: "#F29111" }}>
                        MySQL
                      </span>
                    </motion.div>
                  </div>
                  <div className="toolsCat">
                    <h4>Git</h4>
                    <motion.div
                      className="tool"
                      transition={{ duration: 0.5, delay: 2 }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                    >
                      <DiGit style={{ color: "red" }} id="toolIcon" />
                      <span className="toolName" style={{ color: "#F1502F" }}>
                        Git
                      </span>
                    </motion.div>
                    <motion.div
                      className="tool"
                      transition={{ duration: 0.5, delay: 2 }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                    >
                      <DiGithubBadge style={{ color: "black" }} id="toolIcon" />
                      <span className="toolName" style={{ color: "#333333" }}>
                        GitHub
                      </span>
                    </motion.div>
                  </div>
                </div>
              </>
            }
          </div>
        </div>

        <motion.div id="works">
          <motion.div
            className="worksMain"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            {
              <>
                <div className="worksHeader">
                  <h1 id="title" className="worksTitle">
                    My WorkS
                  </h1>
                  <div className="worksTitleDecoration" />
                  <p className="worksSubtitle">
                    Products I’ve built across academia and industry.
                  </p>
                </div>
                <div className="myworks worksGrid">
                  {worksList.map((e, i) => {
                    return (
                      <motion.div
                        key={i}
                        className="workCard"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.12 }}
                        whileHover={{ y: -6 }}
                      >
                        <div className="timelineContent">
                          <h5 style={{ color: "#61dbfb" }}>{e.elem}</h5>
                          <ul>
                            {e.details.map((d, idx) => {
                              return <li key={idx}>{d}</li>;
                            })}
                          </ul>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </>
            }
          </motion.div>
        </motion.div>

        <div id="contact" style={{ position: "relative" }}>
          <div
            className="contactMain"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div className="contactHeader">
              <h1 id="title" className="contactTitle">
                Contact ME
              </h1>
              <div className="contactTitleDecoration" />
              <p className="contactSubtitle">
                Let’s build something great together. Fast replies, clear
                communication.
              </p>
            </div>

            <motion.div
              className="contactCard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="contactCardTop">
                <div className="contactEmailBlock">
                  <span className="contactLabel">Email</span>
                  <a
                    className="contactEmail"
                    href="mailto: mustaphadx1999@gmail.com"
                  >
                    mustaphadx1999@gmail.com
                  </a>
                </div>

                <div className="contactActions">
                  <motion.button
                    className={`contactActionBtn ${copied ? "copied" : ""}`}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(
                          "mustaphadx1999@gmail.com",
                        );
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      } catch (e) {
                        window.location.href =
                          "mailto: mustaphade1999@gmail.com";
                      }
                    }}
                  >
                    {copied ? "Copied!" : "Copy Email"}
                  </motion.button>
                  <motion.a
                    className="contactActionBtn secondary"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    href="tel:+213558933443"
                  >
                    Call
                  </motion.a>
                </div>
              </div>

              <div className="contactDivider" />

              <div className="contactSocials">
                <a
                  href="https://github.com/hmk99"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon id="icon" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mustapha-kacimielhassani-81b8161a6/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon id="icon" />
                </a>
                <a
                  href="https://web.facebook.com/mustapha.ko.7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon id="icon" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
        <footer className="">
          <div className="footerInner">
            <div className="footerBrand">
              <span className="footerLogo">HMK</span>
              <span className="footerTagline">
                Software Engineer • Full Stack
              </span>
            </div>
            <div className="footerMeta">
              <span className="footerCopy">
                Copyright <span id="cc">©️</span> 2024
              </span>
            </div>
            <div className="footerLinks">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#tools">Tools</a>
              <a href="#works">Works</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </footer>
      </>
    </div>
  );
}

export default App;
