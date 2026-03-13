"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Agent, AgentStatus } from '@/types';
import { INITIAL_AGENTS } from '@/data/mock-data';
import { Monitor, Terminal, Cpu, Zap, Activity, Info } from 'lucide-react';

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

const PixelAgent = ({ agent, onClick }: { agent: Agent, onClick: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        left: `${agent.position.x}%`,
        top: `${agent.position.y}%`
      }}
      whileHover={{ scale: 1.1, zIndex: 10 }}
      className="absolute cursor-pointer group"
      onClick={onClick}
    >
      {/* Desk/Environment */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Computer Screen Glow */}
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            boxShadow: agent.status !== 'Idle' ? [
              "0 0 10px rgba(59, 130, 246, 0.5)",
              "0 0 20px rgba(59, 130, 246, 0.8)",
              "0 0 10px rgba(59, 130, 246, 0.5)"
            ] : "none"
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute w-12 h-8 bg-slate-800 border-2 border-slate-700 rounded-sm -mt-4"
        />
        
        {/* The Fox Character (Simplified Pixel-ish) */}
        <div className="relative z-10 w-10 h-10 bg-orange-600 rounded-sm border-2 border-orange-800">
           <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-black rounded-full" />
           </div>
           <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-black rounded-full" />
           </div>
           <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-3 bg-orange-200 rounded-sm" />
           
           {/* Typing Animation */}
           {agent.status !== 'Idle' && (
             <motion.div
               animate={{ y: [-1, 1, -1] }}
               transition={{ duration: 0.2, repeat: Infinity }}
               className="absolute -bottom-2 w-full h-1 bg-orange-800 opacity-50"
             />
           )}
        </div>

        {/* Status Indicator */}
        <div className={`absolute top-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ${STATUS_COLORS[agent.status]}`} />
        
        {/* Label */}
        <div className="absolute -bottom-6 whitespace-nowrap px-2 py-0.5 bg-black/80 rounded border border-slate-700 text-[10px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
          {agent.name}
        </div>
      </div>
    </motion.div>
  );
};

export default function OfficeView() {
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  return (
    <div className="relative w-full h-[600px] bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Background Grid/Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      
      {/* Floor Decoration */}
      <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-slate-900/50 to-transparent" />

      {/* Agents */}
      {agents.map((agent) => (
        <PixelAgent 
          key={agent.id} 
          agent={agent} 
          onClick={() => setSelectedAgent(agent)} 
        />
      ))}

      {/* Agent Detail Panel (Side) */}
      <AnimatePresence>
        {selectedAgent && (
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            className="absolute right-0 top-0 w-80 h-full bg-slate-900/95 border-l border-slate-800 p-6 backdrop-blur shadow-xl z-50"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-orange-500">🦊</span> {selectedAgent.name}
                </h3>
                <p className="text-xs text-slate-400 font-mono">{selectedAgent.role}</p>
              </div>
              <button 
                onClick={() => setSelectedAgent(null)}
                className="text-slate-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <section>
                <label className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 block">Current Status</label>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[selectedAgent.status]}`} />
                  <span className="text-sm font-medium text-slate-200">{selectedAgent.status}</span>
                </div>
              </section>

              <section>
                <label className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 block">Specialty</label>
                <div className="bg-slate-800/50 p-3 rounded border border-slate-700 text-xs text-slate-300">
                  {selectedAgent.specialty}
                </div>
              </section>

              <section>
                <label className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 block">Efficiency & Output</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
                    <div className="text-[10px] text-slate-500">TASKS</div>
                    <div className="text-lg font-mono text-emerald-400">{selectedAgent.tasksCompleted}</div>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
                    <div className="text-[10px] text-slate-500">EFFICIENCY</div>
                    <div className="text-lg font-mono text-blue-400">{selectedAgent.efficiency}%</div>
                  </div>
                </div>
              </section>

              {selectedAgent.currentTask && (
                <section>
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 block">Live Task</label>
                  <div className="font-mono text-[11px] p-3 bg-black/50 border border-slate-800 rounded text-blue-300">
                    <span className="text-blue-500">$</span> {selectedAgent.currentTask}
                    <motion.span 
                      animate={{ opacity: [0, 1, 0] }} 
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-1.5 h-3 bg-blue-500 ml-1 translate-y-0.5"
                    />
                  </div>
                </section>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend / Info */}
      <div className="absolute bottom-4 left-4 flex gap-4 text-[10px] text-slate-500 uppercase tracking-widest">
        <div className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-orange-500" /> Operational</div>
        <div className="flex items-center gap-1.5"><Activity className="w-3 h-3 text-emerald-500" /> Active Handoffs</div>
        <div className="flex items-center gap-1.5"><Terminal className="w-3 h-3 text-blue-500" /> Auto-sync enabled</div>
      </div>
    </div>
  );
}
