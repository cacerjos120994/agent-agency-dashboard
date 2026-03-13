"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Agent, AgentStatus, Handoff } from '@/types';
import { INITIAL_AGENTS, INITIAL_HANDOFFS } from '@/data/mock-data';
import { Network, AlertCircle, CheckCircle2, Zap, Info, Fingerprint, BookOpen, Wrench, ShieldCheck, HardDrive, Cpu } from 'lucide-react';

import { useLiveAgents } from '@/hooks/useOpenClaw';

const STATUS_COLORS: Record<AgentStatus, string> = {
  Idle: 'bg-slate-500',
  Researching: 'bg-blue-500',
  Analyzing: 'bg-purple-500',
  Writing: 'bg-emerald-500',
  Designing: 'bg-pink-500',
  Planning: 'bg-amber-500',
  Reporting: 'bg-cyan-500',
  Blocked: 'bg-red-500',
  Delivering: 'bg-indigo-500',
  Active: 'bg-orange-500',
  Offline: 'bg-slate-800'
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
        zIndex: isSelected ? 40 : 10,
        x: agent.status === 'Idle' ? [0, 40, -20, 10, -5, 0] : [0, 1, -1, 0],
        y: agent.status === 'Idle' ? [0, -20, 15, -5, 5, 0] : [0, -1, 1, 0]
      }}
      transition={{
         x: { duration: agent.status === 'Idle' ? 25 : 3, repeat: Infinity, ease: "easeInOut" },
         y: { duration: agent.status === 'Idle' ? 30 : 4, repeat: Infinity, ease: "easeInOut" },
         scale: { duration: 0.2 },
         left: { duration: 1 },
         top: { duration: 1 }
      }}
      className="absolute cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative w-16 h-16 flex flex-col items-center justify-center transform scale-75 origin-bottom">
        <motion.div 
          animate={{ 
            opacity: agent.status !== 'Idle' ? [0.4, 0.8, 0.4] : 0.2,
            boxShadow: agent.status !== 'Idle' ? [
              "0 0 10px rgba(59, 130, 246, 0.6)",
              "0 0 20px rgba(59, 130, 246, 0.9)",
              "0 0 10px rgba(59, 130, 246, 0.6)"
            ] : "none"
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-10 h-7 bg-slate-900 border-2 border-slate-700 rounded-sm -mt-4 z-10 shadow-[inset_0_0_8px_rgba(0,0,0,0.8)]"
        />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-3 w-14 h-6 bg-slate-800 border-t border-slate-600 rounded-sm shadow-xl z-0 transform perspective-[200px] rotateX-12" />
        
        <motion.div 
           whileHover={{ y: -2 }}
           className="relative z-20 w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-700 rounded-sm border border-orange-900 shadow-lg mt-1"
        >
           <div className="absolute top-1.5 left-1 w-1.5 h-1.5 bg-white rounded-full flex items-center justify-center">
              <motion.div 
                 animate={agent.status === 'Idle' ? { scaleY: [1, 0.1, 1] } : {}}
                 transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1] }}
                 className="w-1 h-1 bg-black rounded-full" 
              />
           </div>
           <div className="absolute top-1.5 right-1 w-1.5 h-1.5 bg-white rounded-full flex items-center justify-center">
              <motion.div 
                 animate={agent.status === 'Idle' ? { scaleY: [1, 0.1, 1] } : {}}
                 transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1] }}
                 className="w-1 h-1 bg-black rounded-full" 
              />
           </div>
           
           <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-2.5 bg-orange-100 rounded-sm shadow-inner border border-orange-300">
             <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1 h-0.5 bg-slate-900 rounded-full" />
           </div>
           
           <div className="absolute -top-2 left-0 w-2 h-3 bg-orange-600 border border-orange-900 skew-y-12 rounded-t-sm z-[-1]" />
           <div className="absolute -top-2 right-0 w-2 h-3 bg-orange-600 border border-orange-900 -skew-y-12 rounded-t-sm z-[-1]" />
           
           {agent.status !== 'Idle' && (
             <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
               <motion.div
                 animate={{ y: [0, -3, 0] }}
                 transition={{ duration: 0.15, repeat: Infinity, delay: 0 }}
                 className="w-1.5 h-2 bg-orange-800 rounded-sm"
               />
               <motion.div
                 animate={{ y: [0, -3, 0] }}
                 transition={{ duration: 0.15, repeat: Infinity, delay: 0.07 }}
                 className="w-1.5 h-2 bg-orange-800 rounded-sm"
               />
             </div>
           )}
        </motion.div>

        <div className="absolute -right-1 top-1 group-hover:scale-125 transition-transform z-30">
           <div className={`w-2.5 h-2.5 rounded-full border border-slate-950 shadow-md ${STATUS_COLORS[agent.status]}`}>
             {agent.status !== 'Idle' && <div className="absolute inset-0 rounded-full animate-ping opacity-50 bg-inherit" />}
           </div>
        </div>
        
        <div className={`absolute -bottom-6 px-1.5 py-0.5 rounded border shadow-lg whitespace-nowrap z-30 transition-all ${isSelected ? 'bg-orange-500/20 border-orange-500 text-orange-100' : 'bg-slate-900/80 border-slate-700/80 text-slate-300 group-hover:bg-slate-800 group-hover:border-slate-500'}`}>
          <div className="text-[8px] font-bold tracking-wider uppercase flex items-center gap-1">
             {agent.displayName}
             <span className={`w-1 h-1 rounded-full ${STATUS_COLORS[agent.status]}`} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const HandoffLines = ({ agents, handoffs }: { agents: Agent[], handoffs: Handoff[] }) => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <defs>
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
          <stop offset="50%" stopColor="rgba(59, 130, 246, 0.8)" />
          <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
        </linearGradient>
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
  const { agents, connectionStatus } = useLiveAgents(INITIAL_AGENTS);
  const [handoffs] = useState<Handoff[]>(INITIAL_HANDOFFS);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'identity' | 'sops' | 'tools'>('overview');

  useEffect(() => {
    if (selectedAgent) setActiveTab('overview');
  }, [selectedAgent]);

  return (
    <div className="relative w-full h-full min-h-[650px] bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      <div className="absolute inset-0 bg-slate-900 z-0 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen z-0" 
           style={{ 
             backgroundImage: "url('/agent-agency-dashboard/office-bg.png')", 
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             backgroundRepeat: 'no-repeat'
           }} 
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.9)_100%)] pointer-events-none" />

      {/* Gateway Connection Status Banner */}
      {connectionStatus !== 'connected' && (
        <div className="absolute top-0 left-0 w-full bg-red-500/20 border-b border-red-500/50 p-2 z-50 flex items-center justify-center gap-2 backdrop-blur-md">
           <AlertCircle className="w-4 h-4 text-red-400" />
           <span className="text-xs font-bold text-red-200 uppercase tracking-widest">
             {connectionStatus === 'connecting' ? 'Connecting to OpenClaw Gateway...' : 'OpenClaw Gateway Offline - Showing Mock Data'}
           </span>
        </div>
      )}

      {/* Decorative Zones for Agents */}
      <div className="absolute top-[15%] left-[5%] w-[40%] h-[35%] border border-blue-500/10 bg-blue-500/5 rounded-lg pointer-events-none flex items-start p-2"><span className="text-[10px] uppercase text-blue-500/30 font-mono">Intel & Strategy Dept</span></div>
      <div className="absolute top-[15%] right-[5%] w-[40%] h-[35%] border border-emerald-500/10 bg-emerald-500/5 rounded-lg pointer-events-none flex items-start p-2"><span className="text-[10px] uppercase text-emerald-500/30 font-mono">Creative Dept</span></div>
      <div className="absolute bottom-[15%] left-[20%] w-[60%] h-[35%] border border-purple-500/10 bg-purple-500/5 rounded-lg pointer-events-none flex items-start p-2"><span className="text-[10px] uppercase text-purple-500/30 font-mono">Operations & Media Dept</span></div>

      <HandoffLines agents={agents} handoffs={handoffs} />

      {agents.map((agent) => (
        <PixelAgent 
          key={agent.id} 
          agent={agent} 
          onClick={() => setSelectedAgent(agent)} 
          isSelected={selectedAgent?.id === agent.id}
        />
      ))}

      <AnimatePresence>
        {selectedAgent && (
          <motion.div
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 500, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 w-[450px] h-full bg-slate-900/95 border-l border-slate-700 backdrop-blur-xl shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 pb-0 shrink-0">
               <div className="flex justify-between items-start mb-4">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg flex items-center justify-center border-2 border-orange-400/30 shadow-lg">
                     <span className="text-2xl">🦊</span>
                   </div>
                   <div>
                     <h3 className="text-xl font-bold text-white tracking-tight">{selectedAgent.displayName}</h3>
                     <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] uppercase font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">{selectedAgent.department}</span>
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${STATUS_COLORS[selectedAgent.status]}`} />
                          <span className="text-xs text-slate-400 font-medium">{selectedAgent.status}</span>
                        </div>
                     </div>
                   </div>
                 </div>
                 <button onClick={() => setSelectedAgent(null)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">✕</button>
               </div>

               {/* Tabs */}
               <div className="flex gap-1 border-b border-slate-800 mt-6 overflow-x-auto scrollbar-hide">
                 {[
                   { id: 'overview', icon: Zap, label: 'Task Queue' },
                   { id: 'identity', icon: Fingerprint, label: 'Identity' },
                   { id: 'sops', icon: BookOpen, label: 'SOPs' },
                   { id: 'tools', icon: Wrench, label: 'Sys/Memory' }
                 ].map(tab => (
                   <button 
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id as any)}
                     className={`flex items-center gap-1.5 px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${activeTab === tab.id ? 'text-blue-400 border-blue-500 bg-blue-500/5' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
                   >
                     <tab.icon className="w-3.5 h-3.5" /> {tab.label}
                   </button>
                 ))}
               </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              
              {/* --- OVERVIEW TAB --- */}
              {activeTab === 'overview' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  {/* Task Summary Metrics */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800/50">
                      <div className="text-[10px] text-slate-500 font-mono mb-1 uppercase">Active</div>
                      <div className="text-xl font-bold text-blue-400">{selectedAgent.taskQueue.filter(t => t.status === 'in_progress').length || (selectedAgent.currentTask ? 1 : 0)}</div>
                    </div>
                    <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800/50">
                      <div className="text-[10px] text-slate-500 font-mono mb-1 uppercase">Done</div>
                      <div className="text-xl font-bold text-emerald-400">{selectedAgent.tasksCompleted}</div>
                    </div>
                    <div className="bg-slate-950/50 p-3 rounded-lg border border-red-900/30">
                      <div className="text-[10px] text-red-500/70 font-mono mb-1 uppercase">Blocked</div>
                      <div className="text-xl font-bold text-red-400">{selectedAgent.taskQueue.filter(t => t.status === 'blocked').length}</div>
                    </div>
                  </div>

                  {selectedAgent.currentTask && (
                    <section className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-4 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                      <div className="flex items-center gap-2 mb-2 text-blue-400">
                        <Zap className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Live Task</span>
                      </div>
                      <div className="font-mono text-xs text-slate-200">
                        {selectedAgent.currentTask}
                        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="inline-block w-1.5 h-3 bg-blue-500 ml-2 translate-y-0.5" />
                      </div>
                    </section>
                  )}

                  {/* Task Queue Rendering */}
                  <section>
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 mb-3 block font-bold flex items-center gap-2">
                      <BookOpen className="w-3 h-3" /> Task Queue Status
                    </label>
                    <div className="space-y-2">
                      {selectedAgent.taskQueue.map(task => (
                        <div key={task.id} className="bg-slate-900/50 border border-slate-800 p-3 rounded-lg flex items-start justify-between">
                           <div>
                              <div className="flex items-center gap-2 mb-1">
                                 <span className={`text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded ${
                                    task.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                    task.status === 'in_progress' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                    task.status === 'blocked' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                    'bg-slate-800 text-slate-400 border border-slate-700'
                                 }`}>
                                   {task.status.replace('_', ' ')}
                                 </span>
                                 <span className={`text-[9px] uppercase tracking-widest ${task.priority === 'Critical' ? 'text-orange-400' : 'text-slate-500'}`}>
                                   P: {task.priority}
                                 </span>
                              </div>
                              <div className="text-xs text-slate-300 font-sans">{task.title}</div>
                           </div>
                        </div>
                      ))}
                    </div>
                  </section>
                  <section>
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 mb-3 block font-bold flex items-center gap-2">
                      <Network className="w-3 h-3" /> Data Pipeline & Handoffs
                    </label>
                    <div className="relative border-l border-slate-800 ml-2 pl-4 py-2 space-y-4">
                       <div className="relative">
                         <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-slate-600 border border-slate-900" />
                         <div className="text-[10px] text-slate-500 uppercase">Input Recibido</div>
                         <div className="text-xs text-slate-300 mt-0.5">{selectedAgent.lastInput || 'Awaiting initial prompt'}</div>
                       </div>
                       <div className="relative">
                         <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-blue-500 border border-slate-900 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                         <div className="text-[10px] text-blue-400 uppercase">Output Entregado a: {selectedAgent.handoffRules.primaryReceiver}</div>
                         <div className="text-xs text-slate-300 mt-0.5">{selectedAgent.lastOutput || 'Processing...'}</div>
                       </div>
                    </div>
                  </section>
                </motion.div>
              )}

              {/* --- IDENTITY TAB --- */}
              {activeTab === 'identity' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <section>
                     <h4 className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 font-bold">Misión</h4>
                     <p className="text-sm text-slate-200 bg-slate-800/30 p-3 rounded border border-slate-700/50">{selectedAgent.mission}</p>
                  </section>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                       <h4 className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 font-bold">Reporta a</h4>
                       <div className="text-xs text-slate-300 font-mono">{selectedAgent.reportsTo}</div>
                     </div>
                     <div>
                       <h4 className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 font-bold">Work Style</h4>
                       <div className="flex flex-wrap gap-1">
                         {selectedAgent.workStyle.map(style => <span key={style} className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">{style}</span>)}
                       </div>
                     </div>
                  </div>
                  <section>
                     <h4 className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 font-bold">Principios de Conducta</h4>
                     <ul className="space-y-2">
                       {selectedAgent.corePrinciples.map((p, i) => (
                         <li key={i} className="text-xs text-emerald-400 flex gap-2 items-start"><CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" /> <span>{p}</span></li>
                       ))}
                     </ul>
                  </section>
                  <section>
                     <h4 className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 font-bold">Anti-Patrones (Never Do)</h4>
                     <ul className="space-y-2">
                       {selectedAgent.neverDo.map((p, i) => (
                         <li key={i} className="text-xs text-red-400 flex gap-2 items-start"><AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" /> <span>{p}</span></li>
                       ))}
                     </ul>
                  </section>
                </motion.div>
              )}

              {/* --- SOPs & WORKFLOW TAB --- */}
              {activeTab === 'sops' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <section>
                     <h4 className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 font-bold flex items-center gap-2"><BookOpen className="w-3 h-3" /> Mandatory Workflow</h4>
                     <div className="bg-slate-800/20 border border-slate-700/50 rounded-lg p-4">
                       <div className="space-y-3 relative border-l border-slate-700 ml-1.5 pl-4">
                         {selectedAgent.mandatoryWorkflow.map((step, idx) => (
                           <div key={idx} className="relative text-xs text-slate-300">
                             <div className="absolute -left-[21px] top-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.8)]" />
                             {step}
                           </div>
                         ))}
                       </div>
                     </div>
                  </section>
                  <section>
                     <h4 className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 font-bold">Validation Checklist</h4>
                     <ul className="space-y-2">
                       {selectedAgent.validationChecklist.map((c, i) => (
                         <li key={i} className="text-xs text-slate-300 flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-slate-500 shrink-0" /> {c}</li>
                       ))}
                     </ul>
                  </section>
                  <section>
                     <h4 className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 font-bold">Escalation Rules</h4>
                     <ul className="space-y-2">
                       {selectedAgent.escalationRules.map((rule, i) => (
                         <li key={i} className="text-xs text-amber-400 bg-amber-500/10 p-2 rounded border border-amber-500/20">{rule}</li>
                       ))}
                     </ul>
                  </section>
                </motion.div>
              )}

              {/* --- TOOLS & SYS TAB --- */}
              {activeTab === 'tools' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <section>
                     <h4 className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 font-bold flex items-center gap-2"><BookOpen className="w-3 h-3" /> Agent Insights Store</h4>
                     <ul className="space-y-2 bg-slate-800/20 p-3 rounded-lg border border-slate-700/50">
                       {selectedAgent.recentInsights?.map((ins, i) => (
                         <li key={i} className="text-xs text-slate-300 flex items-start gap-2 border-b border-slate-700/50 pb-2 last:border-0 last:pb-0">
                           <span className="text-blue-500 mt-0.5">•</span>
                           <span>{ins}</span>
                         </li>
                       ))}
                     </ul>
                  </section>
                  <section>
                     <h4 className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 font-bold flex items-center gap-2"><Wrench className="w-3 h-3" /> Private Tools</h4>
                     <div className="flex flex-wrap gap-2">
                       {selectedAgent.privateTools.map((t, i) => (
                         <span key={i} className="px-2 py-1 text-[10px] font-mono bg-slate-800 border border-slate-700 rounded text-slate-300 flex items-center gap-1"><Cpu className="w-3 h-3 text-blue-400" /> {t}</span>
                       ))}
                     </div>
                  </section>
                  <section>
                     <h4 className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 font-bold flex items-center gap-2"><HardDrive className="w-3 h-3" /> Memory Usage Layers</h4>
                     <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden divide-y divide-slate-800 text-xs">
                       <div className="p-3">
                         <span className="text-slate-500 uppercase tracking-widest text-[9px] block mb-1">Local Memory</span>
                         <div className="text-slate-300">{selectedAgent.localMemory.join(' • ')}</div>
                       </div>
                       <div className="p-3">
                         <span className="text-slate-500 uppercase tracking-widest text-[9px] block mb-1">Shared Memory</span>
                         <div className="text-slate-300">{selectedAgent.sharedMemoryUsage.join(' • ')}</div>
                       </div>
                     </div>
                  </section>
                  <section>
                     <h4 className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 font-bold flex items-center gap-2"><ShieldCheck className="w-3 h-3" /> Quality Control Protocol</h4>
                     <ul className="space-y-2">
                       {selectedAgent.maintenance.qualityControl.map((qc, i) => (
                         <li key={i} className="text-xs text-emerald-400 bg-emerald-500/10 p-2 rounded border border-emerald-500/20 flex gap-2"><CheckCircle2 className="w-3 h-3 shrink-0" /> {qc}</li>
                       ))}
                     </ul>
                  </section>
                </motion.div>
              )}

            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-slate-800 shrink-0 flex items-center justify-between bg-slate-950">
               <div className="flex items-center gap-2">
                 {selectedAgent.health === 'Optimal' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-amber-500" />}
                 <span className="text-[10px] font-mono text-slate-400 uppercase">Sys. Health: {selectedAgent.health}</span>
               </div>
               <div className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded">Visual Zone: <span className="text-slate-300">{selectedAgent.dashboardVisualization.zone}</span></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
