import React from "react";
import { 
  Atom, 
  Code2, 
  Hexagon, 
  Boxes, 
  Database, 
  GitBranch 
} from "lucide-react";

const skills = [
  {
    name: "React / Next.js",
    icon: Atom,
    color: "text-cyan-400",
  },
  {
    name: "JavaScript / TS",
    icon: Code2,
    color: "text-amber-400",
  },
  {
    name: "Node.js",
    icon: Hexagon,
    color: "text-emerald-400",
  },
  {
    name: "Tailwind CSS",
    icon: Boxes,
    color: "text-blue-400",
  },
  {
    name: "MongoDB / SQL",
    icon: Database,
    color: "text-emerald-400",
  },
  {
    name: "Git / GitHub",
    icon: GitBranch,
    color: "text-orange-500",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative w-full py-16 px-4 max-w-6xl mx-auto flex flex-col items-center">
      {/* Title Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Skills &amp; Tools
        </h2>
        {/* Decorative teal underline indicator */}
        <div className="flex flex-col items-center mt-3">
          <div className="w-16 h-1 bg-teal-400 rounded-full"></div>
          <div className="w-3 h-3 rounded-full border-2 border-teal-400 mt-3 flex items-center justify-center">
            <div className="w-1 h-1 bg-teal-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <div
              key={index}
              className="bg-[#0b1322]/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-teal-500/50 transition-all duration-300 hover:-translate-y-1 group shadow-lg"
            >
              <div className="p-2 rounded-xl bg-slate-900/50">
                <Icon className={`w-9 h-9 ${skill.color} transition-transform duration-300 group-hover:scale-110`} />
              </div>
              <span className="text-white font-semibold text-sm text-center">
                {skill.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}