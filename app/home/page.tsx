"use client";
import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code, Palette, Zap, Users, Award, MapPin, Terminal, Database, Cloud, Smartphone, Globe, Shield, ArrowRight, Play, Coffee, Clock, Star, CheckCircle } from 'lucide-react';

export default function EnhancedFloatingPortfolio() {
  const canvasRef = useRef(null);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  const roles = [
    'Full-Stack Developer',
    'UI/UX Designer',
    'Cloud Architect',
    'Cybersecurity Expert'
  ];

  // Typewriter effect for roles
  useEffect(() => {
    setIsLoaded(true);
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

  // Enhanced particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const particles = [];
    const particleCount = 150;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 0.5;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.hue = Math.random() * 60 + 200;
        this.pulse = Math.random() * Math.PI * 2;
        this.floatOffset = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += 0.03;
        this.floatOffset += 0.015;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        this.y += Math.sin(this.pulse) * 0.5;
        this.x += Math.cos(this.floatOffset) * 0.3;
        this.opacity = 0.4 + Math.sin(this.pulse) * 0.3;
        this.size = (Math.random() * 2 + 1) + Math.sin(this.pulse) * 0.5;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.opacity})`;
        ctx.shadowBlur = 20;
        ctx.shadowColor = `hsla(${this.hue}, 80%, 70%, 0.9)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Enhanced connection lines with floating effect
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 140) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            const opacity = 0.2 * (1 - distance / 140);
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Intersection Observer for floating animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-float-in');
          if (entry.target.id) {
            setActiveSection(entry.target.id);
          }
        }
      });
    }, observerOptions);

    // Observe all sections and floating elements
    const sections = document.querySelectorAll('section[id]');
    const floatingElements = document.querySelectorAll('.float-on-scroll');
    
    sections.forEach((section) => observer.observe(section));
    floatingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth'
    });
    setIsMenuOpen(false);
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
      icon: Database,
      level: 92,
      color: 'from-green-500 to-emerald-600',
      technologies: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis']
    },
    {
      category: 'Cloud & DevOps',
      icon: Cloud,
      level: 88,
      color: 'from-purple-500 to-violet-600',
      technologies: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform']
    },
    {
      category: 'Mobile Development',
      icon: Smartphone,
      level: 85,
      color: 'from-orange-500 to-red-500',
      technologies: ['React Native', 'Flutter', 'iOS', 'Android', 'PWA']
    },
    {
      category: 'UI/UX Design',
      icon: Palette,
      level: 90,
      color: 'from-pink-500 to-rose-600',
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research']
    },
    {
      category: 'Cybersecurity',
      icon: Shield,
      level: 87,
      color: 'from-cyan-500 to-teal-600',
      technologies: ['Penetration Testing', 'Security Audits', 'Encryption', 'OWASP', 'Network Security']
    }
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
      title: 'Fintech Security Dashboard',
      description: 'Real-time cybersecurity monitoring system for financial institutions with threat detection, compliance reporting, and incident response.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      technologies: ['Vue.js', 'Python', 'Elasticsearch', 'Kafka', 'Docker', 'Kubernetes'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      metrics: { threats: '99.8%', response: '<30s', compliance: '100%' }
    },
    {
      title: 'Healthcare Mobile App',
      description: 'HIPAA-compliant telemedicine platform with video consultations, prescription management, and patient portal.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'WebRTC', 'AWS', 'HIPAA'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      metrics: { patients: '50K+', satisfaction: '4.9/5', uptime: '99.95%' }
    },
    {
      title: 'Blockchain DeFi Protocol',
      description: 'Decentralized finance protocol with yield farming, liquidity pools, and governance token mechanics.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
      technologies: ['Solidity', 'Web3.js', 'React', 'Node.js', 'Ethereum', 'IPFS'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      metrics: { tvl: '$5M+', apy: '12%', users: '1K+' }
    },
    {
      title: 'Smart IoT Dashboard',
      description: 'Industrial IoT monitoring system with real-time sensor data, predictive maintenance, and automated alerts.',
      image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=600&fit=crop',
      technologies: ['React', 'Python', 'InfluxDB', 'MQTT', 'Docker', 'Grafana'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      metrics: { sensors: '10K+', uptime: '99.9%', savings: '30%' }
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'VP of Engineering at TechCorp',
      company: 'Fortune 500 Company',
      content: 'Exceptional technical expertise and leadership. Delivered our most complex project 2 weeks ahead of schedule while maintaining the highest code quality standards.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'CTO & Co-founder',
      company: 'FinTech Startup',
      content: 'Transformed our security infrastructure and scaled our platform to handle 10x traffic. Their cybersecurity expertise saved us from potential disasters.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      rating: 5
    },
    {
      name: 'Emily Thompson',
      role: 'Product Director',
      company: 'Healthcare Innovation',
      content: 'Incredible attention to user experience and technical implementation. Our mobile app achieved 4.9/5 rating thanks to their development expertise.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      rating: 5
    }
  ];

  const experience = [
    {
      company: 'Senior Full-Stack Developer',
      role: 'Tech Innovations Inc.',
      period: '2023 - Present',
      description: 'Leading development of enterprise-scale applications serving millions of users. Architecting cloud infrastructure and mentoring junior developers.',
      achievements: ['Reduced system response time by 60%', 'Led team of 8 developers', 'Implemented CI/CD pipeline']
    },
    {
      company: 'Frontend Developer',
      role: 'Digital Solutions Ltd.',
      period: '2022 - 2023',
      description: 'Specialized in creating responsive web applications with modern frameworks. Collaborated with UX teams to implement pixel-perfect designs.',
      achievements: ['Improved page load speed by 40%', 'Built component library', 'Achieved 98% lighthouse scores']
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden font-inter">
      {/* Enhanced Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' }}
      />

      {/* Professional Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 animate-float-gentle">
        <div className="max-w-7xl mx-auto px-6 py-4">
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
              {['home', 'about', 'experience', 'skills', 'projects', 'testimonials', 'contact'].map((section, index) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`px-4 py-2 rounded-lg capitalize transition-all duration-300 text-sm font-medium animate-float-nav ${
                    activeSection === section
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-slate-700/50 transition-colors animate-float-right"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className={`h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
                <div className={`h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                <div className={`h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-slate-700/50 animate-slide-down">
              <div className="flex flex-col space-y-2 pt-4">
                {['home', 'about', 'experience', 'skills', 'projects', 'testimonials', 'contact'].map((section, index) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="capitalize text-left px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors animate-float-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative z-10 px-6">
        <div className={`max-w-7xl mx-auto text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6 animate-float-gentle">
              <span className="animate-pulse-glow">✨ Available for exciting projects</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight">
              <span className="block text-white animate-float-up">Hi, I'm</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-float-up-delayed">
                Shayan Ali
              </span>
            </h1>

            <div className="text-2xl md:text-3xl text-slate-300 mb-8 h-12 animate-float-gentle">
              <span className="text-slate-400">I'm a </span>
              <span className="text-blue-400 font-semibold">
                {typedText}
                <span className="animate-pulse">|</span>
              </span>
            </div>

            <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-float-in-delayed">
              Crafting exceptional digital experiences with cutting-edge technology.
              Specialized in building scalable applications, secure systems, and intuitive user interfaces
              that drive business growth and user satisfaction.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-float-buttons">
              <button
                onClick={() => scrollToSection('projects')}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-float-button-1"
              >
                <span className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  View My Work
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border border-slate-600 text-white font-semibold rounded-xl hover:bg-slate-700/50 hover:border-slate-500 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-float-button-2"
              >
                <span className="flex items-center gap-2">
                  <Coffee className="w-5 h-5" />
                  Let's Talk
                </span>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto mb-12 animate-float-stats">
              <div className="text-center animate-float-stat-1">
                <div className="text-2xl font-bold text-blue-400 mb-1 animate-pulse-glow">10+</div>
                <div className="text-slate-500 text-sm">Projects</div>
              </div>
              <div className="text-center animate-float-stat-2">
                <div className="text-2xl font-bold text-purple-400 mb-1 animate-pulse-glow">1+</div>
                <div className="text-slate-500 text-sm">Years Exp</div>
              </div>
              <div className="text-center animate-float-stat-3">
                <div className="text-2xl font-bold text-pink-400 mb-1 animate-pulse-glow">99%</div>
                <div className="text-slate-500 text-sm">Satisfaction</div>
              </div>
            </div>

            <div className="animate-bounce-enhanced">
              <ChevronDown className="w-6 h-6 mx-auto text-slate-500" />
            </div>
          </div>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-10 w-2 h-2 bg-blue-500 rounded-full opacity-60 animate-float-particle-1" />
          <div className="absolute top-1/3 right-20 w-3 h-3 bg-purple-500 rounded-full opacity-40 animate-float-particle-2" />
          <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-pink-500 rounded-full opacity-50 animate-float-particle-3" />
          <div className="absolute top-1/2 right-1/4 w-2.5 h-2.5 bg-cyan-500 rounded-full opacity-30 animate-float-particle-4" />

          {/* Code-like floating elements */}
          <div className="absolute top-20 left-1/4 text-blue-400/20 text-xs font-mono rotate-12 select-none animate-float-code-1">
            const developer = 'passionate'
          </div>
          <div className="absolute bottom-40 right-1/4 text-purple-400/20 text-xs font-mono -rotate-12 select-none animate-float-code-2">
            {'{ innovation: true }'}
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-32 px-6 relative z-10 float-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 animate-float-left">
              <div className="animate-float-heading">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  About Me
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8 animate-expand"></div>
              </div>

              <p className="text-lg text-slate-300 leading-relaxed animate-float-text-1">
                I'm a passionate full-stack developer with over 1 years of experience building
                innovative digital solutions. My expertise spans modern web technologies,
                cybersecurity, cloud architecture, and user experience design.
              </p>

              <p className="text-lg text-slate-300 leading-relaxed animate-float-text-2">
                I believe in writing clean, maintainable code and creating systems that scale.
                Whether it's architecting microservices, implementing security protocols, or
                crafting intuitive user interfaces, I bring a holistic approach to every project.
              </p>

              {/* Professional Highlights */}
              <div className="grid grid-cols-2 gap-6 animate-float-highlights">
                {[
                  'Certified Cloud Architect',
                  'Security Expert',
                  'Agile Methodology',
                  'Team Leadership'
                ].map((highlight, index) => (
                  <div
                    key={highlight}
                    className="flex items-center space-x-3 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 animate-float-highlight"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 animate-pulse-glow" />
                    <span className="text-slate-300 text-sm">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Location & Contact */}
              <div className="flex items-center gap-4 text-slate-400 animate-float-location">
                <MapPin className="w-5 h-5 text-blue-400 animate-bounce-gentle" />
                <span>Punjab, Pakistan</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400">Available for remote work</span>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-3 animate-float-tech">
                {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL', 'CyberSecurity'].map((tech, index) => (
                  <div
                    key={tech}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 text-sm text-blue-300 hover:border-blue-400/40 transition-all duration-300 hover:scale-105 animate-float-pill"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative animate-float-right">
              <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl backdrop-blur-sm border border-slate-700/50 overflow-hidden group animate-float-image">
                <img
                  src="https://www.electrocomit.com/shayan.jpeg"
                  alt="Shayan Ali - Professional Developer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                {/* Professional Badge */}
                <div className="absolute bottom-6 left-6 right-6 animate-float-badge">
                  <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-semibold">Shayan Ali</div>
                        <div className="text-blue-400 text-sm">Senior Full-Stack Developer</div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-slate-400">Online</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Achievement Badges */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-2xl shadow-2xl shadow-green-500/25 animate-float-badge-1">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl shadow-2xl shadow-purple-500/25 animate-float-badge-2">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-6 relative z-10 bg-slate-800/20 float-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-float-section-header">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent animate-float-heading">
              Professional Experience
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 animate-expand"></div>
            <p className="text-slate-400 max-w-2xl mx-auto animate-float-text">
              Building impactful solutions and leading development teams across various industries
            </p>
          </div>
          <div className="space-y-12">
            {experience.map((exp, index) => (
              <div key={index} className="relative animate-float-experience" style={{ animationDelay: `${index * 0.3}s` }}>
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  <div className="lg:w-1/3">
                    <div className="sticky top-32">
                      <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 animate-float-card">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse-glow"></div>
                          <span className="text-blue-400 text-sm font-medium">{exp.period}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{exp.company}</h3>
                        <p className="text-slate-300 font-medium">{exp.role}</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-2/3">
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-slate-600/70 transition-all duration-300 animate-float-card-delayed">
                      <p className="text-slate-300 leading-relaxed mb-6">{exp.description}</p>

                      <div className="space-y-3">
                        <h4 className="text-white font-semibold mb-4">Key Achievements:</h4>
                        {exp.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-start gap-3 animate-float-achievement" style={{ animationDelay: `${i * 0.1}s` }}>
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5 animate-pulse-glow" />
                            <span className="text-slate-300">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {index < experience.length - 1 && (
                  <div className="hidden lg:block absolute left-[16.66%] top-full w-px h-12 bg-gradient-to-b from-blue-500/50 to-transparent animate-expand-vertical"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 relative z-10 float-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-float-section-header">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent animate-float-heading">
              Skills & Expertise
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 animate-expand"></div>
            <p className="text-slate-400 max-w-2xl mx-auto animate-float-text">
              Comprehensive skill set developed through years of professional experience and continuous learning
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={index}
                  className="p-8 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 group animate-float-skill"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-2xl bg-gradient-to-r ${skill.color} animate-pulse-glow`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">{skill.category}</h3>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-400">Proficiency</span>
                      <span className="text-white font-semibold animate-float-number">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out animate-progress-bar`}
                        style={{ width: `${skill.level}%`, animationDelay: `${index * 0.2}s` }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {skill.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 rounded-full bg-slate-700/50 text-sm text-slate-300 animate-float-tech-pill"
                        style={{ animationDelay: `${techIndex * 0.1}s` }}
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

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 relative z-10 float-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-float-section-header">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent animate-float-heading">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 animate-expand"></div>
            <p className="text-slate-400 max-w-2xl mx-auto animate-float-text">
              Showcasing my best work across various industries and technologies
            </p>
          </div>

          <div className="grid gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`group cursor-pointer rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/30 transition-all duration-500 hover:transform hover:scale-[1.01] animate-float-project ${
                  project.featured ? 'lg:grid lg:grid-cols-2' : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative overflow-hidden">
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
                      className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors animate-float-icon"
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors animate-float-icon"
                      style={{ animationDelay: '0.1s' }}
                    >
                      <Github className="w-5 h-5 text-white" />
                    </a>
                  </div>

                  {project.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-semibold animate-pulse-glow">
                      Featured
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors animate-float-title">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 mb-6 leading-relaxed animate-float-text-delayed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6 animate-float-tags">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 rounded-full bg-slate-700/50 text-sm text-slate-300 animate-float-tag"
                        style={{ animationDelay: `${techIndex * 0.05}s` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.metrics && (
                    <div className="grid grid-cols-3 gap-4 mb-6 animate-float-metrics">
                      {Object.entries(project.metrics).map(([key, value], metricIndex) => (
                        <div
                          key={metricIndex}
                          className="bg-slate-700/50 rounded-lg p-3 animate-float-metric"
                          style={{ animationDelay: `${metricIndex * 0.1}s` }}
                        >
                          <div className="text-blue-400 font-semibold animate-pulse-glow">{value}</div>
                          <div className="text-slate-400 text-sm capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-4 animate-float-links">
                    <a
                      href={project.liveUrl}
                      className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 animate-float-link"
                    >
                      Live Demo <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="text-slate-400 hover:text-slate-300 transition-colors flex items-center gap-2 animate-float-link"
                      style={{ animationDelay: '0.1s' }}
                    >
                      GitHub <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 px-6 relative z-10 bg-slate-800/20 float-on-scroll">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20 animate-float-section-header">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent animate-float-heading">
              Client Testimonials
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 animate-expand"></div>
            <p className="text-slate-400 max-w-2xl mx-auto animate-float-text">
              What clients and colleagues say about working with me
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 group animate-float-testimonial"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex gap-1 mb-4 animate-float-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 animate-float-star ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`}
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>

                <p className="text-slate-300 mb-6 leading-relaxed italic animate-float-quote">"{testimonial.content}"</p>

                <div className="flex items-center gap-4 animate-float-author">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover animate-float-avatar"
                  />
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-slate-400 text-sm">{testimonial.role}</div>
                    <div className="text-blue-400 text-sm">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-32 px-6 relative z-10 float-on-scroll">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-float-section-header">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent animate-float-heading">
              Let's Build Something Amazing
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 animate-expand"></div>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed animate-float-text">
              Ready to turn your vision into reality? I'm always excited to collaborate on
              innovative projects and help bring your ideas to life with cutting-edge technology.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Information */}
            <div className="space-y-8 animate-float-left">
              <div className="animate-float-contact-header">
                <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
                <p className="text-slate-300 leading-relaxed mb-8">
                  I'm always open to discussing new opportunities, interesting projects,
                  or just having a conversation about technology and innovation.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
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
                    className="group flex items-center gap-4 p-6 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm border border-slate-600/50 rounded-2xl hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 animate-float-contact"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`p-3 bg-gradient-to-r ${contact.color} rounded-xl group-hover:shadow-lg transition-all duration-300 animate-pulse-glow`}>
                      <contact.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{contact.title}</div>
                      <div className="text-blue-400 group-hover:text-blue-300 transition-colors">{contact.subtitle}</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300 ml-auto" />
                  </a>
                ))}
              </div>

              {/* Availability Status */}
              <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl animate-float-status">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-semibold">Currently Available</span>
                </div>
                <p className="text-slate-300 text-sm">
                  Open for freelance projects, full-time opportunities, and consulting work.
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-8 animate-float-right">
              <div className="animate-float-actions-header">
                <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
                <div className="grid gap-4">
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
                      className={`group w-full p-6 font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 animate-float-action ${action.className}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <action.icon className="w-6 h-6" />
                        <span>{action.text}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Response Time */}
              <div className="p-6 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm border border-slate-600/50 rounded-2xl animate-float-response">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-blue-400 animate-spin-slow" />
                  <span className="text-white font-semibold">Response Time</span>
                </div>
                <p className="text-slate-300 text-sm mb-2">
                  I typically respond to messages within 24 hours.
                </p>
                <p className="text-slate-400 text-xs">
                  For urgent matters, please mention "URGENT" in the subject line.
                </p>
              </div>

              {/* Specialties */}
              <div className="p-6 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm border border-slate-600/50 rounded-2xl animate-float-specialties">
                <h4 className="text-white font-semibold mb-4">Specializing In</h4>
                <div className="space-y-3">
                  {[
                    { text: "Full-Stack Web Applications", color: "bg-blue-400" },
                    { text: "Cloud Architecture & DevOps", color: "bg-purple-400" },
                    { text: "Cybersecurity Solutions", color: "bg-green-400" },
                    { text: "Mobile App Development", color: "bg-pink-400" }
                  ].map((specialty, index) => (
                    <div
                      key={specialty.text}
                      className="flex items-center gap-3 animate-float-specialty"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className={`w-2 h-2 ${specialty.color} rounded-full animate-pulse-glow`}></div>
                      <span className="text-slate-300 text-sm">{specialty.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-16 px-6 border-t border-slate-700/50 relative z-10 animate-float-footer">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2 animate-float-brand">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center animate-pulse-glow">
                  <Terminal className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">Shayan Ali</div>
                  <div className="text-sm text-slate-400">Full-Stack Developer & Cybersecurity Expert</div>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-md">
                Passionate about creating innovative digital solutions that make a difference.
                Always learning, always building, always improving.
              </p>
            </div>

            {/* Quick Links */}
            <div className="animate-float-footer-links">
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <div className="space-y-3">
                {['About', 'Skills', 'Projects', 'Contact'].map((link, index) => (
                  <button
                    key={link}
                    onClick={() => scrollToSection(link.toLowerCase())}
                    className="block text-slate-400 hover:text-blue-400 transition-colors text-sm animate-float-footer-link"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="animate-float-footer-social">
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <div className="flex gap-4">
                {[
                  { href: "https://github.com/shayan4Ii", icon: Github, hoverColor: "group-hover:text-white" },
                  { href: "https://linkedin.com/in/shayan4li", icon: Linkedin, hoverColor: "group-hover:text-blue-400" },
                  { href: "mailto:shayanalibusiness@gmail.com", icon: Mail, hoverColor: "group-hover:text-blue-400" }
                ].map((social, index) => (
                  <a
                    key={social.href}
                    href={social.href}
                    className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 transition-colors group animate-float-social"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <social.icon className={`w-5 h-5 text-slate-400 transition-colors ${social.hoverColor}`} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-700/50 animate-float-footer-bottom">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-slate-400 text-sm animate-float-copyright">
                © 2025 Shayan Ali. Crafted with ❤️ and lots of ☕
              </div>
              <div className="flex items-center gap-6 text-sm animate-float-footer-info">
                <span className="text-slate-500">Built with React & Tailwind CSS</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400">All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced Global Styles with Floating Animations */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        /* Floating Animation Keyframes */
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }

        @keyframes float-up {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes float-up-delayed {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes float-left {
          0% { opacity: 0; transform: translateX(-50px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes float-right {
          0% { opacity: 0; transform: translateX(50px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes float-in {
          0% { opacity: 0; transform: translateY(30px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes float-in-delayed {
          0% { opacity: 0; transform: translateY(30px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
        }

        @keyframes bounce-enhanced {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes slide-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes expand {
          0% { width: 0; }
          100% { width: 5rem; }
        }

        @keyframes expand-vertical {
          0% { height: 0; }
          100% { height: 3rem; }
        }

        @keyframes progress-bar {
          0% { width: 0; }
          100% { width: var(--target-width); }
        }

        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes float-particle-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-5px) translateX(-3px); }
          75% { transform: translateY(-15px) translateX(8px); }
        }

        @keyframes float-particle-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-8px) translateX(-5px); }
          66% { transform: translateY(-12px) translateX(3px); }
        }

        @keyframes float-particle-3 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          20% { transform: translateY(-6px) translateX(4px); }
          40% { transform: translateY(-10px) translateX(-2px); }
          60% { transform: translateY(-4px) translateX(6px); }
          80% { transform: translateY(-12px) translateX(-4px); }
        }

        @keyframes float-particle-4 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(-8px); }
        }

        @keyframes float-code-1 {
          0%, 100% { transform: translateY(0px) rotate(12deg); opacity: 0.2; }
          50% { transform: translateY(-10px) rotate(15deg); opacity: 0.3; }
        }

        @keyframes float-code-2 {
          0%, 100% { transform: translateY(0px) rotate(-12deg); opacity: 0.2; }
          50% { transform: translateY(-8px) rotate(-15deg); opacity: 0.3; }
        }

        /* Animation Classes */
        .animate-float-gentle { animation: float-gentle 4s ease-in-out infinite; }
        .animate-float-up { animation: float-up 0.8s ease-out; }
        .animate-float-up-delayed { animation: float-up-delayed 1s ease-out 0.3s both; }
        .animate-float-left { animation: float-left 0.8s ease-out; }
        .animate-float-right { animation: float-right 0.8s ease-out; }
        .animate-float-in { animation: float-in 0.8s ease-out; }
        .animate-float-in-delayed { animation: float-in-delayed 1s ease-out 0.5s both; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-bounce-enhanced { animation: bounce-enhanced 2s infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 3s ease-in-out infinite; }
        .animate-slide-down { animation: slide-down 0.3s ease-out; }
        .animate-expand { animation: expand 1s ease-out; }
        .animate-expand-vertical { animation: expand-vertical 0.8s ease-out; }
        .animate-progress-bar { animation: progress-bar 1.5s ease-out; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }

        /* Particle Animations */
        .animate-float-particle-1 { animation: float-particle-1 6s ease-in-out infinite; }
        .animate-float-particle-2 { animation: float-particle-2 8s ease-in-out infinite; }
        .animate-float-particle-3 { animation: float-particle-3 7s ease-in-out infinite; }
        .animate-float-particle-4 { animation: float-particle-4 5s ease-in-out infinite; }
        .animate-float-code-1 { animation: float-code-1 8s ease-in-out infinite; }
        .animate-float-code-2 { animation: float-code-2 10s ease-in-out infinite; }

        /* Navigation Animations */
        .animate-float-nav { animation: float-in 0.6s ease-out; }

        /* Button Animations */
        .animate-float-buttons { animation: float-in 1s ease-out 0.8s both; }
        .animate-float-button-1 { animation: float-in 0.8s ease-out 1s both; }
        .animate-float-button-2 { animation: float-in 0.8s ease-out 1.2s both; }

        /* Stats Animations */
        .animate-float-stats { animation: float-in 1s ease-out 1.5s both; }
        .animate-float-stat-1 { animation: float-gentle 4s ease-in-out infinite; }
        .animate-float-stat-2 { animation: float-gentle 4s ease-in-out infinite 1s; }
        .animate-float-stat-3 { animation: float-gentle 4s ease-in-out infinite 2s; }

        /* Section Animations */
        .animate-float-section-header { animation: float-in 0.8s ease-out; }
        .animate-float-heading { animation: float-up 0.8s ease-out; }
        .animate-float-text { animation: float-in 0.8s ease-out 0.2s both; }
        .animate-float-text-1 { animation: float-in 0.8s ease-out 0.3s both; }
        .animate-float-text-2 { animation: float-in 0.8s ease-out 0.5s both; }
        .animate-float-text-delayed { animation: float-in 0.8s ease-out 0.4s both; }

        /* About Section Animations */
        .animate-float-highlights { animation: float-in 0.8s ease-out 0.6s both; }
        .animate-float-highlight { animation: float-in 0.6s ease-out; }
        .animate-float-location { animation: float-in 0.8s ease-out 0.8s both; }
        .animate-float-tech { animation: float-in 0.8s ease-out 1s both; }
        .animate-float-pill { animation: float-in 0.5s ease-out; }
        .animate-float-image { animation: float-right 1s ease-out; }
        .animate-float-badge { animation: float-in 0.8s ease-out 1.2s both; }
        .animate-float-badge-1 { animation: float-gentle 5s ease-in-out infinite; }
        .animate-float-badge-2 { animation: float-gentle 5s ease-in-out infinite 2s; }

        /* Experience Section Animations */
        .animate-float-experience { animation: float-in 0.8s ease-out; }
        .animate-float-card { animation: float-gentle 6s ease-in-out infinite; }
        .animate-float-card-delayed { animation: float-gentle 6s ease-in-out infinite 1s; }
        .animate-float-achievement { animation: float-in 0.6s ease-out; }

        /* Skills Section Animations */
        .animate-float-skill { animation: float-in 0.8s ease-out; }
        .animate-float-number { animation: float-gentle 4s ease-in-out infinite; }
        .animate-float-tech-pill { animation: float-in 0.4s ease-out; }

        /* Projects Section Animations */
        .animate-float-project { animation: float-in 0.8s ease-out; }
        .animate-float-title { animation: float-in 0.6s ease-out 0.2s both; }
        .animate-float-tags { animation: float-in 0.6s ease-out 0.4s both; }
        .animate-float-tag { animation: float-in 0.4s ease-out; }
        .animate-float-metrics { animation: float-in 0.6s ease-out 0.6s both; }
        .animate-float-metric { animation: float-in 0.5s ease-out; }
        .animate-float-links { animation: float-in 0.6s ease-out 0.8s both; }
        .animate-float-link { animation: float-in 0.4s ease-out; }
        .animate-float-icon { animation: float-gentle 3s ease-in-out infinite; }

        /* Testimonials Section Animations */
        .animate-float-testimonial { animation: float-in 0.8s ease-out; }
        .animate-float-stars { animation: float-in 0.6s ease-out 0.2s both; }
        .animate-float-star { animation: float-gentle 4s ease-in-out infinite; }
        .animate-float-quote { animation: float-in 0.6s ease-out 0.4s both; }
        .animate-float-author { animation: float-in 0.6s ease-out 0.6s both; }
        .animate-float-avatar { animation: float-gentle 5s ease-in-out infinite; }

        /* Contact Section Animations */
        .animate-float-contact-header { animation: float-in 0.8s ease-out; }
        .animate-float-contact { animation: float-in 0.6s ease-out; }
        .animate-float-status { animation: float-in 0.8s ease-out 0.8s both; }
        .animate-float-actions-header { animation: float-in 0.8s ease-out; }
        .animate-float-action { animation: float-in 0.6s ease-out; }
        .animate-float-response { animation: float-in 0.8s ease-out 0.4s both; }
        .animate-float-specialties { animation: float-in 0.8s ease-out 0.6s both; }
        .animate-float-specialty { animation: float-in 0.5s ease-out; }

        /* Footer Animations */
        .animate-float-footer { animation: float-in 0.8s ease-out; }
        .animate-float-brand { animation: float-left 0.8s ease-out; }
        .animate-float-footer-links { animation: float-in 0.8s ease-out 0.2s both; }
        .animate-float-footer-link { animation: float-in 0.4s ease-out; }
        .animate-float-footer-social { animation: float-right 0.8s ease-out 0.4s both; }
        .animate-float-social { animation: float-in 0.5s ease-out; }
        .animate-float-footer-bottom { animation: float-in 0.8s ease-out 0.6s both; }
        .animate-float-copyright { animation: float-left 0.6s ease-out 0.8s both; }
        .animate-float-footer-info { animation: float-right 0.6s ease-out 1s both; }

        /* Scroll-triggered floating animations */
        .float-on-scroll {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease-out;
        }

        .float-on-scroll.animate-float-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Hover Floating Effects */
        .hover\:float:hover {
          animation: float-gentle 2s ease-in-out infinite;
        }

        /* Continuous floating for specific elements */
        .float-continuous {
          animation: float-gentle 4s ease-in-out infinite;
        }

        .float-continuous-slow {
          animation: float-gentle 6s ease-in-out infinite;
        }

        .float-continuous-fast {
          animation: float-gentle 2s ease-in-out infinite;
        }

        /* Base animations */
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .font-inter {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          overflow-x: hidden;
          font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
          font-variant-numeric: oldstyle-nums;
        }

        /* Enhanced Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.3);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3b82f6, #8b5cf6);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #2563eb, #7c3aed);
        }

        /* Professional Typography */
        h1, h2, h3, h4, h5, h6 {
          font-weight: 700;
          letter-spacing: -0.025em;
        }

        p {
          line-height: 1.7;
        }

        /* Selection Styling */
        ::selection {
          background: rgba(59, 130, 246, 0.3);
          color: white;
        }

        /* Focus States */
        button:focus,
        a:focus {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        /* Smooth Transitions */
        * {
          transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Performance optimizations for animations */
        .animate-float-gentle,
        .animate-float-particle-1,
        .animate-float-particle-2,
        .animate-float-particle-3,
        .animate-float-particle-4,
        .animate-float-badge-1,
        .animate-float-badge-2 {
          will-change: transform;
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .animate-float-gentle,
          .animate-bounce-enhanced,
          .animate-bounce-gentle,
          .animate-float-particle-1,
          .animate-float-particle-2,
          .animate-float-particle-3,
          .animate-float-particle-4,
          .animate-float-code-1,
          .animate-float-code-2,
          .animate-float-badge-1,
          .animate-float-badge-2,
          .animate-spin-slow {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}