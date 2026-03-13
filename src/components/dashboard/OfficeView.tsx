"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Agent, AgentStatus, Handoff } from '@/types';
import { INITIAL_AGENTS, INITIAL_HANDOFFS } from '@/data/mock-data';
import { Monitor, Terminal, Cpu, Zap, Activity, Info, Network, AlertCircle, CheckCircle2 } from 'lucide-react';

const STATUS_COLORS: Record<AgentStatus, string> = {
  Idle: 'bg-slate-500',
  Researching: 'bg-blue-500',
  Analyzing: 'bg-purple-500',
  Writing: 'bg-emerald-500',
  Planning: 'bg-amber-500',
  Reporting: 'bg-cyan-500',
  Blocked: 'bg-red-500',
  Delivering: 'bg-indigo-500',
};

const PixelAgent = ({ agent, onClick, isSelected }: { agent: Agent, onClick: () => void, isSelected: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: isSelected ? 1.1 : 1,
        left: `${agent.position.x}%`,
        top: `${agent.position.y}%`,
        zIndex: isSelected ? 40 : 10
      }}
      className="absolute cursor-pointer group"
      onClick={onClick}
    >
      {/* Desk/Environment */}
      <div className="relative w-28 h-28 flex flex-col items-center justify-center">
        {/* Computer Screen Glow */}
        <motion.div 
          animate={{ 
            opacity: agent.status !== 'Idle' ? [0.4, 0.8, 0.4] : 0.2,
            boxShadow: agent.status !== 'Idle' ? [
              "0 0 15px rgba(59, 130, 246, 0.6)",
              "0 0 30px rgba(59, 130, 246, 0.9)",
              "0 0 15px rgba(59, 130, 246, 0.6)"
            ] : "none"
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-14 h-10 bg-slate-900 border-[3px] border-slate-700 rounded-sm -mt-6 z-10 shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]"
        />
        
        {/* Desk Table */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-4 w-20 h-8 bg-slate-800 border-t-2 border-slate-600 rounded-sm shadow-xl z-0 transform perspective-[200px] rotateX-12" />
        
        {/* The Fox Character (Pixel-ish) */}
        <motion.div 
           whileHover={{ y: -2 }}
           className="relative z-20 w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-700 rounded-sm border-2 border-orange-900 shadow-lg mt-2"
        >
           {/* Eyes */}
           <div className="absolute top-2 left-1.5 w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center">
              <motion.div 
                 animate={agent.status === 'Idle' ? { scaleY: [1, 0.1, 1] } : {}}
                 transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1] }}
                 className="w-1.5 h-1.5 bg-black rounded-full" 
              />
           </div>
           <div className="absolute top-2 right-1.5 w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center">
              <motion.div 
                 animate={agent.status === 'Idle' ? { scaleY: [1, 0.1, 1] } : {}}
                 transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1] }}
                 className="w-1.5 h-1.5 bg-black rounded-full" 
              />
           </div>
           
           {/* Snout */}
           <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-4 bg-orange-100 rounded-sm shadow-inner border border-orange-300">
             <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1 bg-slate-900 rounded-full" />
           </div>
           
           {/* Ears */}
           <div className="absolute -top-3 left-0 w-3 h-4 bg-orange-600 border-2 border-orange-900 skew-y-12 rounded-t-sm z-[-1]" />
           <div className="absolute -top-3 right-0 w-3 h-4 bg-orange-600 border-2 border-orange-900 -skew-y-12 rounded-t-sm z-[-1]" />
           
           {/* Typing/Activity Animation Hands */}
           {agent.status !== 'Idle' && (
             <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
               <motion.div
                 animate={{ y: [0, -4, 0] }}
                 transition={{ duration: 0.15, repeat: Infinity, delay: 0 }}
                 className="w-2 h-3 bg-orange-800 rounded-sm"
               />
               <motion.div
                 animate={{ y: [0, -4, 0] }}
                 transition={{ duration: 0.15, repeat: Infinity, delay: 0.07 }}
                 className="w-2 h-3 bg-orange-800 rounded-sm"
               />
             </div>
           )}
        </motion.div>

        {/* Status Indicator Pip */}
        <div className="absolute -right-2 top-0 group-hover:scale-125 transition-transform z-30">
           <div className={`w-3.5 h-3.5 rounded-full border-2 border-slate-950 shadow-md ${STATUS_COLORS[agent.status]}`}>
             {agent.status !== 'Idle' && <div className="absolute inset-0 rounded-full animate-ping opacity-50 bg-inherit" />}
           </div>
        </div>
        
        {/* Floating Label (Always visible, more elegant) */}
        <div className={`absolute -bottom-8 px-2.5 py-1 rounded border shadow-lg whitespace-nowrap z-30 transition-all ${isSelected ? 'bg-orange-500/20 border-orange-500 text-orange-100' : 'bg-slate-900/80 border-slate-700/80 text-slate-300 group-hover:bg-slate-800 group-hover:border-slate-500'}`}>
          <div className="text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5">
             {agent.name}
             <span className={`w-1.5 h-1.5 rounded-full ${STATUS_COLORS[agent.status]}`} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Animated SVG lines representing data flow between agents
const HandoffLines = ({ agents, handoffs }: { agents: Agent[], handoffs: Handoff[] }) => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <defs>
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
          <stop offset="50%" stopColor="rgba(59, 130, 246, 0.8)" />
          <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {handoffs.map(handoff => {
        const fromAgent = agents.find(a => a.id === handoff.fromId);
        const toAgent = agents.find(a => a.id === handoff.toId);
        if (!fromAgent || !toAgent) return null;

        return (
          <motion.line
            key={handoff.id}
            x1={`${fromAgent.position.x}%`}
            y1={`${fromAgent.position.y}%`}
            x2={`${toAgent.position.x}%`}
            y2={`${toAgent.position.y}%`}
            stroke={handoff.status === 'in_transit' ? "url(#flowGradient)" : "rgba(59, 130, 246, 0.2)"}
            strokeWidth={handoff.status === 'in_transit' ? "3" : "1"}
            strokeDasharray={handoff.status === 'in_transit' ? "8, 8" : "none"}
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: 1,
              strokeDashoffset: handoff.status === 'in_transit' ? [0, -100] : 0
            }}
            transition={{ 
              pathLength: { duration: 0.5 },
              strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" }
            }}
          />
        );
      })}
    </svg>
  );
};

export default function OfficeView() {
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [handoffs, setHandoffs] = useState<Handoff[]>(INITIAL_HANDOFFS);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  // Auto-rotate selected agent for demo if none selected
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!selectedAgent) {
      interval = setInterval(() => {
        const randomAgent = agents[Math.floor(Math.random() * agents.length)];
        // Optional: auto-select for demo purposes, or just let it be idle
      }, 10000);
    }
    return () => clearInterval(interval);
  }, [agents, selectedAgent]);

  return (
    <div className="relative w-full h-full min-h-[650px] bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      {/* Background Grid & Lighting (Cyber/Mission Control feel) */}
      <div className="absolute inset-0 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(30, 41, 59, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 41, 59, 0.4) 1px, transparent 1px)', 
             backgroundSize: '40px 40px',
             backgroundPosition: 'center center'
           }} 
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.9)_100%)] pointer-events-none" />
      <div className="scanline" />

      {/* Decorative Floor Zones */}
      <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] border border-blue-500/10 bg-blue-500/5 rounded-lg pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] border border-emerald-500/10 bg-emerald-500/5 rounded-lg pointer-events-none" />
      <div className="absolute bottom-[20%] left-[25%] w-[50%] h-[30%] border border-purple-500/10 bg-purple-500/5 rounded-lg pointer-events-none" />

      {/* Connectivity Lines */}
      <HandoffLines agents={agents} handoffs={handoffs} />

      {/* Agents */}
      {agents.map((agent) => (
        <PixelAgent 
          key={agent.id} 
          agent={agent} 
          onClick={() => setSelectedAgent(agent)} 
          isSelected={selectedAgent?.id === agent.id}
        />
      ))}

      {/* Agent Detail Panel (Side) */}
      <AnimatePresence>
        {selectedAgent && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 w-96 h-full bg-slate-900/95 border-l border-slate-700 p-6 backdrop-blur-xl shadow-2xl z-50 flex flex-col"
          >
            <div className="flex justify-between items-start mb-6 shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg flex items-center justify-center border-2 border-orange-400/30 shadow-lg">
                  <span className="text-2xl">🦊</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{selectedAgent.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                     <span className="text-[10px] uppercase font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">{selectedAgent.role}</span>
                     <div className="flex items-center gap-1.5">
                       <span className={`w-2 h-2 rounded-full ${STATUS_COLORS[selectedAgent.status]}`} />
                       <span className="text-xs text-slate-400 font-medium">{selectedAgent.status}</span>
                     </div>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedAgent(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-6 scrollbar-hide">
              <section>
                <p className="text-sm text-slate-400 leading-relaxed border-l-2 border-slate-700 pl-3">
                  {selectedAgent.description}
                </p>
              </section>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800/50">
                  <div className="text-[10px] text-slate-500 font-mono mb-1 uppercase">Efficiency</div>
                  <div className="text-2xl font-bold text-emerald-400">{selectedAgent.efficiency}%</div>
                </div>
                <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800/50">
                  <div className="text-[10px] text-slate-500 font-mono mb-1 uppercase">Tasks Done</div>
                  <div className="text-2xl font-bold text-blue-400">{selectedAgent.tasksCompleted}</div>
                </div>
              </div>

              {selectedAgent.currentTask && (
                <section className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-4 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                  <div className="flex items-center gap-2 mb-2 text-blue-400">
                    <Zap className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Live Operation</span>
                  </div>
                  <div className="font-mono text-xs text-slate-200">
                    {selectedAgent.currentTask}
                    <motion.span 
                      animate={{ opacity: [0, 1, 0] }} 
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-1.5 h-3 bg-blue-500 ml-2 translate-y-0.5"
                    />
                  </div>
                </section>
              )}

              {selectedAgent.recentInsights.length > 0 && (
                <section>
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 mb-3 block font-bold flex items-center gap-2">
                    <Info className="w-3 h-3" /> Latest Intel
                  </label>
                  <div className="space-y-2">
                    {selectedAgent.recentInsights.map((insight, idx) => (
                      <div key={idx} className="bg-slate-800/30 p-3 rounded-md border border-slate-700/50 text-xs text-slate-300">
                        "{insight}"
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section>
                <label className="text-[10px] uppercase tracking-wider text-slate-500 mb-3 block font-bold flex items-center gap-2">
                  <Network className="w-3 h-3" /> Data Pipeline
                </label>
                <div className="relative border-l border-slate-800 ml-2 pl-4 py-2 space-y-4">
                   <div className="relative">
                     <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-slate-600 border border-slate-900" />
                     <div className="text-[10px] text-slate-500 uppercase">Input from: {selectedAgent.previousHandoff || 'System'}</div>
                     <div className="text-xs text-slate-300 truncate mt-0.5">{selectedAgent.lastInput || 'Awaiting initial prompt'}</div>
                   </div>
                   <div className="relative">
                     <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-blue-500 border border-slate-900 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                     <div className="text-[10px] text-blue-400 uppercase">Output to: {selectedAgent.nextRecipient || 'System'}</div>
                     <div className="text-xs text-slate-300 truncate mt-0.5">{selectedAgent.lastOutput || 'Processing...'}</div>
                   </div>
                </div>
              </section>
            </div>
            
            <div className="pt-4 border-t border-slate-800 mt-auto shrink-0 flex items-center justify-between">
               <div className="flex items-center gap-2">
                 {selectedAgent.health === 'Optimal' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-amber-500" />}
                 <span className="text-[10px] font-mono text-slate-400 uppercase">Sys. Health: {selectedAgent.health}</span>
               </div>
               <div className="text-[10px] font-mono text-slate-500">Uptime: {Math.floor(selectedAgent.uptimeMinutes / 60)}h {selectedAgent.uptimeMinutes % 60}m</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend / Info (Bottom Overlay) */}
      <div className="absolute bottom-4 left-4 flex gap-6 px-4 py-2.5 bg-slate-900/80 backdrop-blur-md rounded-lg border border-slate-800/50 text-[10px] text-slate-400 uppercase tracking-widest font-bold shadow-xl">
        <div className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> Processing</div>
        <div className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]" /> Complete</div>
        <div className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-500 rounded-full" /> Idle</div>
        <div className="flex items-center gap-2 ml-4 border-l border-slate-700 pl-4">
           <Network className="w-3.5 h-3.5 text-blue-400" /> Live Data Handoffs
        </div>
      </div>
    </div>
  );
}
