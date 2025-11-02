"use client";
import { useState, useEffect } from "react";
import { Mail, Code, Palette, Zap, Users, ChevronDown, Menu, X, Github, Linkedin } from "lucide-react";
import LoadingScreen from "./components/LoadingScreen";
import BackgroundAnimation from "./components/BackgroundAnimation";
import SkillCard from "./components/SkillCard";
import ProjectCard from "./components/ProjectCard";

export default function Home() {
  const [showLoading, setShowLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const skills = [
    { name: 'React', level: 95, color: 'from-blue-500 to-cyan-500' },
    { name: 'Next.js', level: 90, color: 'from-purple-500 to-pink-500' },
    { name: 'TypeScript', level: 85, color: 'from-blue-600 to-blue-400' },
    { name: 'Node.js', level: 88, color: 'from-green-500 to-emerald-500' },
    { name: 'Python', level: 82, color: 'from-yellow-500 to-orange-500' },
    { name: 'UI/UX Design', level: 78, color: 'from-pink-500 to-rose-500' },
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and Stripe integration',
      image: '/api/placeholder/400/250',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: '#',
      live: '#'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates and team features',
      image: '/api/placeholder/400/250',
      tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io'],
      github: '#',
      live: '#'
    },
    {
      title: 'Portfolio Website',
      description: 'Modern portfolio website with beautiful animations and responsive design',
      image: '/api/placeholder/400/250',
      tech: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
      github: '#',
      live: '#'
    }
  ];

  if (showLoading) {
    return <LoadingScreen showLoading={showLoading} setShowLoading={setShowLoading} />;
  }

  return (
    <div className="relative min-h-screen">
      <BackgroundAnimation showLoading={showLoading} />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass-effect">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gradient">Shayan</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-colors duration-300 hover:text-blue-400 ${
                    activeSection === item.id ? 'text-blue-400' : 'text-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left py-2 transition-colors duration-300 hover:text-blue-400 ${
                    activeSection === item.id ? 'text-blue-400' : 'text-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-6 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="heading-xl text-gradient animate-float-up">
                Shayan
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 animate-slide-in-left" style={{animationDelay: '0.2s'}}>
                Full Stack Developer & UI/UX Enthusiast
              </p>
            </div>
            
            <p className="text-lg-enhanced max-w-2xl mx-auto leading-relaxed animate-slide-in-right" style={{animationDelay: '0.4s'}}>
              Crafting digital experiences with modern technologies. 
              I specialize in creating scalable web applications and beautiful user interfaces.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{animationDelay: '0.6s'}}>
              <button
                onClick={() => scrollToSection('projects')}
                className="btn-primary hover-lift"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-secondary"
              >
                Get In Touch
              </button>
            </div>

            <div className="flex justify-center space-x-6 mt-8">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-300">
                <Github size={24} />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-300">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-300">
                <Mail size={24} />
              </a>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="text-slate-400" size={32} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-lg text-center mb-16 text-gradient">
              About Me
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg-enhanced leading-relaxed">
                  I'm a passionate full-stack developer with over 5 years of experience 
                  creating digital solutions that combine functionality with beautiful design. 
                  My journey in tech started with curiosity and has evolved into a love for 
                  building applications that make a difference.
                </p>
                
                <p className="text-lg-enhanced leading-relaxed">
                  When I'm not coding, you'll find me exploring new technologies, 
                  contributing to open source projects, or sharing knowledge with the 
                  developer community. I believe in continuous learning and staying 
                  updated with the latest industry trends.
                </p>

                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full">
                    <Code className="text-blue-400" size={20} />
                    <span className="text-slate-300">Clean Code</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full">
                    <Palette className="text-purple-400" size={20} />
                    <span className="text-slate-300">UI/UX Design</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full">
                    <Zap className="text-yellow-400" size={20} />
                    <span className="text-slate-300">Performance</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full">
                    <Users className="text-green-400" size={20} />
                    <span className="text-slate-300">Collaboration</span>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center hover-glow transition-all duration-500 group-hover:from-blue-500/30 group-hover:to-purple-600/30">
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-300">👨‍💻</div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-lg text-center mb-16 text-gradient">
              Skills & Expertise
            </h2>
            
            <div className="grid gap-6">
              {skills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="heading-lg text-center mb-16 text-gradient">
              Featured Projects
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-lg text-center mb-16 text-gradient">
              Let's Work Together
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="heading-md text-white mb-4">Get in touch</h3>
                <p className="text-lg-enhanced leading-relaxed">
                  I'm always interested in new opportunities and exciting projects. 
                  Whether you're a company looking to hire, or you're a fellow developer 
                  looking to collaborate, I'd love to hear from you.
                </p>
                
                <div className="space-y-4">
                  <a href="mailto:hello@shayan.dev" className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition-colors">
                    <Mail size={20} />
                    hello@shayan.dev
                  </a>
                  <a href="#" className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition-colors">
                    <Github size={20} />
                    /shayan
                  </a>
                  <a href="#" className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition-colors">
                    <Linkedin size={20} />
                    /in/shayan
                  </a>
                </div>
              </div>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-primary hover-lift animate-pulse-glow"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 mb-4 md:mb-0">
              © 2024 Shayan. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
