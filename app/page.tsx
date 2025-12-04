'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
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
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.15 }
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
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-30 dark:opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* Professional Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
              Tanvi
            </div>
            <div className="hidden md:flex items-center gap-8">
              {['Home', 'About', 'Skills', 'Portfolio', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`relative text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.toLowerCase()
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400"></span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className={`space-y-8 ${isVisible.home ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium border border-blue-200 dark:border-blue-800">
                Professional Portfolio
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                Hi, I'm <span className="text-blue-600 dark:text-blue-400">Tanvi</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-600 dark:text-slate-400">
                Software Developer & Technical Consultant
              </h2>
              <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                I specialize in building scalable web applications and delivering innovative 
                technology solutions. With expertise in modern frameworks and best practices, 
                I transform complex requirements into elegant, maintainable code.
              </p>
            </div>
            <div className="flex gap-4 justify-center flex-wrap pt-4">
              <button
                onClick={() => scrollToSection('portfolio')}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                View Portfolio
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-medium border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-24 px-6 bg-slate-50 dark:bg-slate-800/50 relative z-10 transition-all duration-700 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              About Me
            </h2>
            <div className="w-16 h-1 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              <p className="text-lg">
                I am a dedicated software developer with a passion for creating high-quality 
                digital solutions. My approach combines technical excellence with strategic 
                thinking to deliver products that exceed expectations.
              </p>
              <p>
                Throughout my career, I have worked on diverse projects ranging from enterprise 
                applications to innovative startups. I am committed to staying current with 
                industry trends and continuously expanding my technical expertise.
              </p>
              <p>
                My work philosophy centers on writing clean, maintainable code, following 
                best practices, and collaborating effectively with cross-functional teams to 
                achieve shared objectives.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                Core Competencies
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Full-Stack Development', level: 90 },
                  { label: 'System Architecture', level: 85 },
                  { label: 'Problem Solving', level: 88 },
                  { label: 'Team Leadership', level: 82 },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">{item.level}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="h-2 bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-1000"
                        style={{ width: isVisible.about ? `${item.level}%` : '0%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-24 px-6 relative z-10 transition-all duration-700 ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Technical Skills
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
              Technologies and tools I work with
            </p>
            <div className="w-16 h-1 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'React', level: 90, category: 'Frontend' },
              { name: 'Next.js', level: 85, category: 'Framework' },
              { name: 'TypeScript', level: 88, category: 'Language' },
              { name: 'JavaScript', level: 92, category: 'Language' },
              { name: 'Node.js', level: 80, category: 'Backend' },
              { name: 'Python', level: 85, category: 'Language' },
              { name: 'HTML/CSS', level: 95, category: 'Frontend' },
              { name: 'Tailwind CSS', level: 90, category: 'Styling' },
            ].map((skill, index) => (
              <div
                key={skill.name}
                className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow duration-200"
              >
                <div className="text-center">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{skill.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{skill.category}</p>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-2">
                    <div
                      className="h-2 bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-1000"
                      style={{ width: isVisible.skills ? `${skill.level}%` : '0%' }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className={`py-24 px-6 bg-slate-50 dark:bg-slate-800/50 relative z-10 transition-all duration-700 ${isVisible.portfolio ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
              A selection of my recent work
            </p>
            <div className="w-16 h-1 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'E-Commerce Platform',
                description: 'Full-stack e-commerce solution with secure payment processing, inventory management, and comprehensive admin dashboard.',
                tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                category: 'Web Application',
              },
              {
                title: 'Task Management System',
                description: 'Enterprise-grade task management application with real-time collaboration, advanced filtering, and analytics.',
                tech: ['Next.js', 'TypeScript', 'Firebase'],
                category: 'SaaS Platform',
              },
              {
                title: 'Analytics Dashboard',
                description: 'Data visualization platform with interactive charts, real-time updates, and comprehensive reporting capabilities.',
                tech: ['React', 'Python', 'PostgreSQL', 'Chart.js'],
                category: 'Data Platform',
              },
              {
                title: 'API Integration Service',
                description: 'RESTful API service with authentication, rate limiting, and comprehensive documentation.',
                tech: ['Node.js', 'Express', 'MongoDB'],
                category: 'Backend Service',
              },
              {
                title: 'Responsive Web Application',
                description: 'Modern, responsive web application with optimized performance and accessibility compliance.',
                tech: ['Next.js', 'Tailwind CSS', 'TypeScript'],
                category: 'Frontend',
              },
              {
                title: 'Real-time Communication',
                description: 'WebSocket-based communication platform with multi-room support and user authentication.',
                tech: ['React', 'Socket.io', 'Express', 'Redis'],
                category: 'Real-time System',
              },
            ].map((project, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center border-b border-slate-200 dark:border-slate-700">
                  <div className="text-5xl font-bold text-blue-600/20 dark:text-blue-400/20 group-hover:text-blue-600/30 dark:group-hover:text-blue-400/30 transition-colors">
                    {project.title.charAt(0)}
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-24 px-6 relative z-10 transition-all duration-700 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
              I'm available for new projects and opportunities
            </p>
            <div className="w-16 h-1 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 md:p-12">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                Send Message
              </button>
            </form>

            <div className="mt-12 pt-12 border-t border-slate-200 dark:border-slate-700">
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                  { name: 'GitHub', href: 'https://github.com', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
                  { name: 'Email', href: 'mailto:your.email@example.com', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', isStroke: true },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.name !== 'Email' ? '_blank' : undefined}
                    rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    <svg className={`w-5 h-5 ${social.isStroke ? 'stroke-current' : 'fill-current'}`} viewBox="0 0 24 24">
                      {social.isStroke ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.icon} />
                      ) : (
                        <path d={social.icon} />
                      )}
                    </svg>
                    <span className="text-sm font-medium">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Tanvi. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
