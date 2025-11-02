"use client";
import { useState, useEffect } from "react";
import { Mail, Code, Palette, Zap, Users, ChevronDown, Menu, X, Github, Linkedin, ArrowRight, Play, Coffee, MapPin, Star, Award, Shield, Terminal, ExternalLink, Clock, CheckCircle } from "lucide-react";
import LoadingScreen from "./components/LoadingScreen";
import BackgroundAnimation from "./components/BackgroundAnimation";
import SkillCard from "./components/SkillCard";
import ProjectCard from "./components/ProjectCard";

export default function Home() {
  const [showLoading, setShowLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  const roles = [
    'Full-Stack Developer',
    'UI/UX Designer', 
    'Cloud Architect',
    'Tech Innovator'
  ];

  // Typewriter effect for roles
  useEffect(() => {
    let timeout;
    const currentRole = roles[currentRoleIndex];

    if (typedText.length < currentRole.length) {
      timeout = setTimeout(() => {
        setTypedText(currentRole.slice(0, typedText.length + 1));
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setTypedText('');
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [typedText, currentRoleIndex]);

  // Page loaded effect
  useEffect(() => {
    const loadedTimeout = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(loadedTimeout);
  }, []);

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
    { 
      category: 'Frontend Development',
      icon: Code,
      level: 95, 
      color: 'from-blue-500 to-indigo-600',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js']
    },
    { 
      category: 'Backend & Database',
      icon: Terminal,
      level: 90, 
      color: 'from-green-500 to-emerald-600',
      technologies: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis']
    },
    { 
      category: 'Cloud & DevOps',
      icon: Shield,
      level: 85, 
      color: 'from-purple-500 to-violet-600',
      technologies: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform']
    },
    { 
      category: 'UI/UX Design',
      icon: Palette,
      level: 88, 
      color: 'from-pink-500 to-rose-600',
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research']
    },
  ];

  const projects = [
    {
      title: 'Enterprise E-Commerce Platform',
      description: 'Scalable multi-vendor marketplace with advanced analytics, real-time inventory management, and AI-powered recommendations serving 10M+ users.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'AWS', 'Docker', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      metrics: { users: '10M+', performance: '99.9%', revenue: '$2M+' }
    },
    {
      title: 'AI-Powered Task Management',
      description: 'Intelligent project management platform with ML-based time estimation, automated workflow optimization, and predictive analytics.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
      technologies: ['Next.js', 'TypeScript', 'Python', 'TensorFlow', 'PostgreSQL', 'Socket.io'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      metrics: { accuracy: '94%', efficiency: '+45%', teams: '500+' }
    },
    {
      title: 'Modern Portfolio Showcase',
      description: 'Professional portfolio website with stunning animations, responsive design, and optimized performance built with modern web technologies.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
      technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript', 'GSAP'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      metrics: { performance: '100%', accessibility: '98%', seo: '95%' }
    }
  ];

  if (showLoading) {
    return <LoadingScreen showLoading={showLoading} setShowLoading={setShowLoading} />;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden">
      <BackgroundAnimation showLoading={showLoading} />
      
      {/* Enhanced Professional Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 transition-opacity duration-500 ${showLoading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 animate-float-left">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center animate-pulse-glow">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">Shayan Ali</div>
                <div className="text-xs text-slate-400">Full-Stack Developer</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 animate-float-right">
              {['hero', 'about', 'skills', 'projects', 'contact'].map((section, index) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`px-4 py-2 rounded-lg capitalize transition-all duration-300 text-sm font-medium ${
                    activeSection === section
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {section === 'hero' ? 'Home' : section}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-slate-700/50 transition-colors animate-float-right"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className={`h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
                <div className={`h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <div className={`h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-slate-700/50 animate-slide-down">
              <div className="flex flex-col space-y-2 pt-4">
                {['hero', 'about', 'skills', 'projects', 'contact'].map((section, index) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="capitalize text-left px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {section === 'hero' ? 'Home' : section}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Modern Hero Section with Advanced Animations */}
      <div className={`transition-opacity duration-500 ${showLoading ? 'opacity-0' : 'opacity-100'}`}>
        <section id="hero" className="min-h-screen flex items-center justify-center relative z-10 px-4 sm:px-6">
          <div className={`max-w-7xl mx-auto text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6 animate-float-gentle">
                <span className="animate-pulse-glow">✨ Available for exciting projects</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight">
                <span className="block text-white animate-float-up">Hi, I'm</span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-float-up-delayed">
                  Shayan Ali
                </span>
              </h1>

              <div className="text-xl sm:text-2xl md:text-3xl text-slate-300 mb-8 h-12 animate-float-gentle">
                <span className="text-slate-400">I'm a </span>
                <span className="text-blue-400 font-semibold">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </span>
              </div>

              <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed animate-float-in-delayed">
                Crafting exceptional digital experiences with cutting-edge technology.
                Specialized in building scalable applications, intuitive user interfaces,
                and modern web solutions that drive business growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16 animate-float-buttons">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  <span className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    View My Work
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-6 sm:px-8 py-3 sm:py-4 border border-slate-600 text-white font-semibold rounded-xl hover:bg-slate-700/50 hover:border-slate-500 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  <span className="flex items-center gap-2">
                    <Coffee className="w-5 h-5" />
                    Let's Talk
                  </span>
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-md mx-auto mb-8 sm:mb-12 animate-float-stats">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-blue-400 mb-1 animate-pulse-glow">50+</div>
                  <div className="text-slate-500 text-xs sm:text-sm">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-purple-400 mb-1 animate-pulse-glow">3+</div>
                  <div className="text-slate-500 text-xs sm:text-sm">Years Exp</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-pink-400 mb-1 animate-pulse-glow">100%</div>
                  <div className="text-slate-500 text-xs sm:text-sm">Satisfaction</div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-6 mb-8">
                <a href="https://github.com/shayan4ii" className="p-3 rounded-full bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-blue-400 transition-all duration-300 hover:scale-110">
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com/in/shayan4ii" className="p-3 rounded-full bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-blue-400 transition-all duration-300 hover:scale-110">
                  <Linkedin size={20} />
                </a>
                <a href="mailto:shayanalibusiness@gmail.com" className="p-3 rounded-full bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-blue-400 transition-all duration-300 hover:scale-110">
                  <Mail size={20} />
                </a>
              </div>

              <div className="animate-bounce-enhanced">
                <ChevronDown className="w-6 h-6 mx-auto text-slate-500" />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Enhanced About Section */}
      <section id="about" className="py-20 sm:py-32 px-4 sm:px-6 relative z-10 bg-slate-800/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-20 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  About Me
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 sm:mb-8"></div>
              </div>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                I'm a passionate full-stack developer with over 3 years of experience building
                innovative digital solutions. My expertise spans modern web technologies,
                cloud architecture, and user experience design.
              </p>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                I believe in writing clean, maintainable code and creating systems that scale.
                Whether it's architecting microservices, implementing security protocols, or
                crafting intuitive user interfaces, I bring a holistic approach to every project.
              </p>

              {/* Professional Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  'Certified Developer',
                  'Problem Solver',
                  'Agile Methodology',
                  'Team Collaboration'
                ].map((highlight, index) => (
                  <div
                    key={highlight}
                    className="flex items-center space-x-3 p-3 sm:p-4 bg-slate-800/50 rounded-xl border border-slate-700/50"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Location & Contact */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base text-slate-400">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>Punjab, Pakistan</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400">Available for remote work</span>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL'].map((tech, index) => (
                  <div
                    key={tech}
                    className="px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 text-xs sm:text-sm text-blue-300 hover:border-blue-400/40 transition-all duration-300 hover:scale-105"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl backdrop-blur-sm border border-slate-700/50 overflow-hidden group">
                <img
                  src="https://www.electrocomit.com/shayan.jpeg"
                  alt="Shayan Ali - Professional Developer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                {/* Professional Badge */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                  <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl p-3 sm:p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-semibold text-sm sm:text-base">Shayan Ali</div>
                        <div className="text-blue-400 text-xs sm:text-sm">Senior Full-Stack Developer</div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-slate-400">Online</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Achievement Badges */}
              <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 bg-gradient-to-r from-green-500 to-emerald-500 p-3 sm:p-4 rounded-2xl shadow-2xl shadow-green-500/25">
                <Award className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
              </div>
              <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-gradient-to-r from-purple-500 to-pink-500 p-3 sm:p-4 rounded-2xl shadow-2xl shadow-purple-500/25">
                <Shield className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section id="skills" className="py-20 sm:py-32 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6"></div>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
              Comprehensive skill set developed through years of professional experience and continuous learning
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={index}
                  className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-r ${skill.color}`}>
                      <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold">{skill.category}</h3>
                  </div>

                  <div className="mb-4 sm:mb-6">
                    <div className="flex justify-between items-center mb-1 sm:mb-2">
                      <span className="text-slate-400 text-xs sm:text-sm">Proficiency</span>
                      <span className="text-white font-semibold text-sm sm:text-base">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2 sm:h-3 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {skill.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 sm:px-3 py-1 rounded-full bg-slate-700/50 text-xs sm:text-sm text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-20 sm:py-32 px-4 sm:px-6 relative z-10 bg-slate-800/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6"></div>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
              Showcasing my best work across various industries and technologies
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`group cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/30 transition-all duration-500 hover:transform hover:scale-[1.01] ${
                  project.featured ? 'lg:grid lg:grid-cols-2' : ''
                }`}
              >
                <div className="relative overflow-hidden aspect-video lg:aspect-auto">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Project Links Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={project.liveUrl}
                      className="p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                    >
                      <ExternalLink className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                    >
                      <Github className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                    </a>
                  </div>

                  {project.featured && (
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-semibold">
                      Featured
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-6 md:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 sm:px-3 py-1 rounded-full bg-slate-700/50 text-xs sm:text-sm text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.metrics && (
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                      {Object.entries(project.metrics).map(([key, value], metricIndex) => (
                        <div
                          key={metricIndex}
                          className="bg-slate-700/50 rounded-lg p-2 sm:p-3"
                        >
                          <div className="text-blue-400 font-semibold text-sm sm:text-base">{value}</div>
                          <div className="text-slate-400 text-xs sm:text-sm capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3 sm:gap-4">
                    <a
                      href={project.liveUrl}
                      className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                    >
                      Live Demo <ExternalLink className="w-3 sm:w-4 h-3 sm:h-4" />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="text-slate-400 hover:text-slate-300 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                    >
                      GitHub <Github className="w-3 sm:w-4 h-3 sm:h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-20 sm:py-32 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Let's Build Something Amazing
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6"></div>
            <p className="text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Ready to turn your vision into reality? I'm always excited to collaborate on
              innovative projects and help bring your ideas to life with cutting-edge technology.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-start">
            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Get In Touch</h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                  I'm always open to discussing new opportunities, interesting projects,
                  or just having a conversation about technology and innovation.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-4 sm:space-y-6">
                {[
                  {
                    href: "mailto:shayanalibusiness@gmail.com",
                    icon: Mail,
                    title: "Email",
                    subtitle: "shayanalibusiness@gmail.com",
                    color: "from-blue-500 to-blue-600"
                  },
                  {
                    href: "https://linkedin.com/in/shayan4Ii",
                    icon: Linkedin,
                    title: "LinkedIn",
                    subtitle: "Connect with me",
                    color: "from-blue-600 to-blue-700"
                  },
                  {
                    href: "https://github.com/shayan4Ii",
                    icon: Github,
                    title: "GitHub",
                    subtitle: "View my code",
                    color: "from-gray-700 to-gray-800"
                  }
                ].map((contact, index) => (
                  <a
                    key={contact.title}
                    href={contact.href}
                    className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm border border-slate-600/50 rounded-xl sm:rounded-2xl hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <div className={`p-2 sm:p-3 bg-gradient-to-r ${contact.color} rounded-lg sm:rounded-xl group-hover:shadow-lg transition-all duration-300`}>
                      <contact.icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm sm:text-base">{contact.title}</div>
                      <div className="text-blue-400 group-hover:text-blue-300 transition-colors text-xs sm:text-sm">{contact.subtitle}</div>
                    </div>
                    <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300 ml-auto" />
                  </a>
                ))}
              </div>

              {/* Availability Status */}
              <div className="p-4 sm:p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl sm:rounded-2xl">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-semibold text-sm sm:text-base">Currently Available</span>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Open for freelance projects, full-time opportunities, and consulting work.
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Quick Actions</h3>
                <div className="grid gap-3 sm:gap-4">
                  {[
                    {
                      onClick: () => window.open('mailto:shayanalibusiness@gmail.com?subject=Project%20Inquiry'),
                      icon: Mail,
                      text: "Start a Project",
                      className: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-blue-500/25"
                    },
                    {
                      onClick: () => window.open('mailto:shayanalibusiness@gmail.com?subject=Consultation%20Request'),
                      icon: Clock,
                      text: "Schedule Consultation",
                      className: "border border-slate-600 text-white hover:bg-slate-700/50 hover:border-slate-500"
                    },
                    {
                      onClick: () => window.open('/resume.pdf'),
                      icon: ExternalLink,
                      text: "Download Resume",
                      className: "border border-slate-600 text-white hover:bg-slate-700/50 hover:border-slate-500"
                    }
                  ].map((action, index) => (
                    <button
                      key={action.text}
                      onClick={action.onClick}
                      className={`group w-full p-4 sm:p-6 font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 ${action.className}`}
                    >
                      <div className="flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base">
                        <action.icon className="w-5 sm:w-6 h-5 sm:h-6" />
                        <span>{action.text}</span>
                        <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Response Time */}
              <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm border border-slate-600/50 rounded-xl sm:rounded-2xl">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-blue-400" />
                  <span className="text-white font-semibold text-sm sm:text-base">Response Time</span>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm mb-1 sm:mb-2">
                  I typically respond to messages within 24 hours.
                </p>
                <p className="text-slate-400 text-xs">
                  For urgent matters, please mention "URGENT" in the subject line.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-12 sm:py-16 px-4 sm:px-6 border-t border-slate-700/50 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Terminal className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">Shayan Ali</div>
                  <div className="text-slate-400 text-xs sm:text-sm">Full-Stack Developer & Tech Innovator</div>
                </div>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
                Passionate about creating innovative digital solutions that make a difference.
                Always learning, always building, always improving.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold text-sm sm:text-base mb-3 sm:mb-4">Quick Links</h3>
              <div className="space-y-2 sm:space-y-3">
                {['About', 'Skills', 'Projects', 'Contact'].map((link, index) => (
                  <button
                    key={link}
                    onClick={() => scrollToSection(link.toLowerCase())}
                    className="block text-slate-400 hover:text-blue-400 transition-colors text-xs sm:text-sm"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-white font-semibold text-sm sm:text-base mb-3 sm:mb-4">Connect</h3>
              <div className="flex gap-3 sm:gap-4">
                {[
                  { href: "https://github.com/shayan4Ii", icon: Github, hoverColor: "group-hover:text-white" },
                  { href: "https://linkedin.com/in/shayan4ii", icon: Linkedin, hoverColor: "group-hover:text-blue-400" },
                  { href: "mailto:shayanalibusiness@gmail.com", icon: Mail, hoverColor: "group-hover:text-blue-400" }
                ].map((social, index) => (
                  <a
                    key={social.href}
                    href={social.href}
                    className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-slate-800/50 hover:bg-slate-700/50 transition-colors group"
                  >
                    <social.icon className={`w-4 sm:w-5 h-4 sm:h-5 text-slate-400 transition-colors ${social.hoverColor}`} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 sm:pt-8 border-t border-slate-700/50">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
              <div className="text-slate-400 text-xs sm:text-sm">
                © 2025 Shayan Ali. Crafted with ❤️ and lots of ☕
              </div>
              <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
                <span className="text-slate-500">Built with React & Tailwind CSS</span>
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400">All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
