"use client";
import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    image: string;
    tech: string[];
    github: string;
    live: string;
  };
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <div 
      className="group glass-effect-strong rounded-xl overflow-hidden hover-lift hover-glow"
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      {/* Project Image/Preview */}
      <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center relative overflow-hidden">
        <div className="text-4xl group-hover:scale-110 transition-transform duration-300 z-10">
          🚀
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Overlay for hover effect */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex gap-4">
            <a 
              href={project.github}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
            >
              <Github size={20} className="text-white" />
            </a>
            <a 
              href={project.live}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
            >
              <ExternalLink size={20} className="text-white" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-slate-400 mb-4 text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, techIndex) => (
            <span 
              key={tech} 
              className="px-3 py-1 bg-slate-800/50 text-slate-300 rounded-full text-xs font-medium border border-slate-700/50 hover:border-blue-500/30 hover:text-blue-300 transition-all duration-200"
              style={{ animationDelay: `${techIndex * 0.1}s` }}
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Links */}
        <div className="flex gap-3 pt-2 border-t border-slate-700/30">
          <a 
            href={project.github}
            className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-sm font-medium"
          >
            <Github size={16} />
            Code
          </a>
          <a 
            href={project.live}
            className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-sm font-medium"
          >
            <ExternalLink size={16} />
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;