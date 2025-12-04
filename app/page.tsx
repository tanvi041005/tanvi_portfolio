'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = ['about', 'skills', 'portfolio', 'contact'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observerRef.current?.observe(element);
    });

    return () => {
      if (observerRef.current) {
        sections.forEach((id) => {
          const element = document.getElementById(id);
          if (element) observerRef.current?.unobserve(element);
        });
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Gradient orbs following mouse */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl transition-all duration-700 ease-out"
          style={{
            left: `${mousePosition.x - 192}px`,
            top: `${mousePosition.y - 192}px`,
            transform: 'translate(-50%, -50%)',
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass dark:glass-dark border-b border-white/20 dark:border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
              Tanvi
            </div>
            <div className="hidden md:flex gap-8">
              {['Home', 'About', 'Skills', 'Portfolio', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`relative text-sm font-medium transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 animate-pulse-glow"></span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`mb-8 ${isVisible.home ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-8 shadow-lg backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 animate-slide-up">
              <span className="inline-block animate-float">✨</span> Welcome to My Portfolio <span className="inline-block animate-float" style={{ animationDelay: '1s' }}>✨</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient leading-tight">
              Hi, I'm Tanvi
            </h1>
            <h2 className="text-3xl md:text-5xl font-semibold text-slate-700 dark:text-slate-300 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Developer & Creative Problem Solver
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.4s' }}>
              I build beautiful, functional, and user-centered digital experiences.
              Passionate about creating innovative solutions that make a difference.
            </p>
            <div className="flex gap-4 justify-center flex-wrap animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold overflow-hidden transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 transform hover:-translate-y-1 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="group px-10 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-blue-600 dark:text-blue-400 rounded-xl font-semibold border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
              >
                Get In Touch
              </button>
            </div>
          </div>
          
          {/* Floating icons */}
          <div className="absolute top-1/2 left-10 hidden lg:block animate-float">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl rotate-45 shadow-xl opacity-20"></div>
          </div>
          <div className="absolute top-1/3 right-10 hidden lg:block animate-float" style={{ animationDelay: '2s' }}>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full shadow-xl opacity-20"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-24 px-6 relative z-10 transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              <p className="text-xl">
                I'm a passionate developer with a keen eye for design and a love for creating
                exceptional digital experiences. My journey in tech has been driven by curiosity
                and a desire to solve complex problems with elegant solutions.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to
                open-source projects, or sharing knowledge with the developer community. I believe
                in continuous learning and staying updated with the latest industry trends.
              </p>
              <p>
                My goal is to create software that not only looks great but also provides
                meaningful value to users. I'm always excited to take on new challenges and
                collaborate on innovative projects.
              </p>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-gradient-to-br from-blue-100/80 to-indigo-100/80 dark:from-blue-900/30 dark:to-indigo-900/30 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-white/20 dark:border-white/10">
                <div className="space-y-6">
                  {[
                    { label: 'Full-Stack Development', color: 'from-blue-500 to-cyan-500' },
                    { label: 'UI/UX Design', color: 'from-indigo-500 to-purple-500' },
                    { label: 'Problem Solving', color: 'from-purple-500 to-pink-500' },
                    { label: 'Team Collaboration', color: 'from-pink-500 to-rose-500' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 group/item">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${item.color} shadow-lg transform group-hover/item:scale-125 transition-transform`}></div>
                      <span className="text-slate-700 dark:text-slate-300 font-semibold text-lg">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-24 px-6 relative z-10 transition-all duration-1000 ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">
              Technologies I work with to bring ideas to life
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'React', level: 90, color: 'from-blue-500 to-cyan-500', icon: '⚛️' },
              { name: 'Next.js', level: 85, color: 'from-slate-600 to-slate-800', icon: '▲' },
              { name: 'TypeScript', level: 88, color: 'from-blue-600 to-blue-800', icon: '📘' },
              { name: 'JavaScript', level: 92, color: 'from-yellow-400 to-yellow-600', icon: '🟨' },
              { name: 'Node.js', level: 80, color: 'from-green-500 to-green-700', icon: '🟢' },
              { name: 'Python', level: 85, color: 'from-blue-400 to-indigo-600', icon: '🐍' },
              { name: 'HTML/CSS', level: 95, color: 'from-orange-500 to-pink-500', icon: '🎨' },
              { name: 'Tailwind CSS', level: 90, color: 'from-cyan-400 to-blue-500', icon: '💨' },
            ].map((skill, index) => (
              <div
                key={skill.name}
                className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20 dark:border-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300" style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}></div>
                <div className="relative text-center">
                  <div className="text-4xl mb-3 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 text-lg">{skill.name}</h3>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden shadow-inner">
                    <div
                      className={`h-3 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out shadow-lg`}
                      style={{ width: isVisible.skills ? `${skill.level}%` : '0%' }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 mt-2 block">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className={`py-24 px-6 relative z-10 transition-all duration-1000 ${isVisible.portfolio ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              My Portfolio
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">
              A selection of projects I've worked on
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'E-Commerce Platform',
                description: 'A full-stack e-commerce solution with payment integration and admin dashboard.',
                tech: ['React', 'Node.js', 'MongoDB'],
                color: 'from-blue-500 to-indigo-600',
                icon: '🛒',
              },
              {
                title: 'Task Management App',
                description: 'A collaborative task management application with real-time updates.',
                tech: ['Next.js', 'TypeScript', 'Firebase'],
                color: 'from-purple-500 to-pink-600',
                icon: '✅',
              },
              {
                title: 'Weather Dashboard',
                description: 'Beautiful weather application with location-based forecasts and charts.',
                tech: ['React', 'API Integration', 'Chart.js'],
                color: 'from-cyan-500 to-blue-600',
                icon: '🌤️',
              },
              {
                title: 'Social Media Analytics',
                description: 'Analytics dashboard for tracking social media performance metrics.',
                tech: ['Next.js', 'Python', 'PostgreSQL'],
                color: 'from-green-500 to-emerald-600',
                icon: '📊',
              },
              {
                title: 'Portfolio Website',
                description: 'A responsive portfolio website showcasing projects and skills.',
                tech: ['Next.js', 'Tailwind CSS', 'TypeScript'],
                color: 'from-orange-500 to-red-600',
                icon: '💼',
              },
              {
                title: 'Chat Application',
                description: 'Real-time chat application with multiple rooms and user authentication.',
                tech: ['React', 'Socket.io', 'Express'],
                color: 'from-indigo-500 to-purple-600',
                icon: '💬',
              },
            ].map((project, index) => (
              <div
                key={index}
                className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 dark:border-white/10"
              >
                <div className={`relative h-48 bg-gradient-to-br ${project.color} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="text-6xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    {project.icon}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6 relative">
                  <h3 className="text-2xl font-bold mb-3 text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full border border-blue-200 dark:border-blue-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/5 group-hover:to-indigo-600/5 transition-all duration-500 rounded-2xl pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-24 px-6 relative z-10 transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">
              I'm always open to discussing new projects, creative ideas, or opportunities.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20 dark:border-white/10">
              <form className="space-y-6">
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-inner"
                    placeholder="Your Name"
                  />
                </div>
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-inner"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="group">
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none shadow-inner"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="group relative w-full px-8 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg overflow-hidden transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 transform hover:-translate-y-1 hover:scale-[1.02]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Send Message
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </form>

              <div className="mt-12 pt-12 border-t border-slate-200 dark:border-slate-700">
                <div className="flex flex-wrap justify-center gap-8">
                  {[
                    { name: 'GitHub', href: 'https://github.com', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
                    { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                    { name: 'Email', href: 'mailto:your.email@example.com', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', isStroke: true },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target={social.name !== 'Email' ? '_blank' : undefined}
                      rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                      className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-600 dark:text-blue-400 rounded-xl font-semibold hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl border border-blue-200 dark:border-blue-800"
                    >
                      <svg className={`w-6 h-6 ${social.isStroke ? 'stroke-current' : 'fill-current'}`} viewBox="0 0 24 24">
                        {social.isStroke ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.icon} />
                        ) : (
                          <path d={social.icon} />
                        )}
                      </svg>
                      <span>{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-slate-200/50 dark:border-slate-700/50 bg-white/30 dark:bg-slate-800/30 backdrop-blur-md relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-600 dark:text-slate-400">
            &copy; {new Date().getFullYear()} Tanvi. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
            Built with ❤️ using Next.js & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
