"use client";
import React from 'react';

interface SkillCardProps {
  skill: {
    name: string;
    level: number;
    color: string;
  };
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
  return (
    <div 
      className="group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-lg font-semibold text-slate-200 group-hover:text-white transition-colors duration-300">
          {skill.name}
        </span>
        <span className="text-sm text-slate-400 font-mono">
          {skill.level}%
        </span>
      </div>
      <div className="skill-bar h-4 group-hover:h-5 transition-all duration-300">
        <div 
          className={`skill-progress bg-gradient-to-r ${skill.color} group-hover:shadow-lg`}
          style={{ 
            width: `${skill.level}%`,
            transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease'
          }}
        />
      </div>
    </div>
  );
};

export default SkillCard;