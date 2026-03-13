"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CEO_DATA } from '@/data/mock-data';
import { Briefcase, TrendingUp, AlertOctagon, CheckCircle2, ChevronRight, Check, X, Bell, Target } from 'lucide-react';

export default function CeoMode({ onClose }: { onClose: () => void }) {
  const [decisions, setDecisions] = React.useState(CEO_DATA.pendingDecisions);

  const handleDecision = (id: string, action: 'Approved' | 'Rejected') => {
    setDecisions(prev => prev.map(d => d.id === id ? { ...d, status: action } : d));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-3xl overflow-y-auto"
    >
       <div className="max-w-6xl mx-auto p-8 relative">
          <button 
             onClick={onClose}
             className="absolute top-8 right-8 text-slate-500 hover:text-white bg-slate-800 hover:bg-slate-700 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
          >
             ✕
          </button>
          
          <header className="mb-12 border-b border-slate-800 pb-8 pt-4">
             <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-tr from-orange-600 to-amber-500 rounded-2xl flex items-center justify-center border-2 border-orange-400/30 shadow-[0_0_30px_rgba(234,88,12,0.4)] text-3xl">🦊</div>
                <div>
                   <h1 className="text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                     CEO Executive View
                   </h1>
                   <p className="text-slate-400 font-mono text-sm tracking-wider uppercase mt-1">High-Level Strategic Overview</p>
                </div>
             </div>
             
             <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />
                <h3 className="text-[10px] uppercase font-bold text-slate-500 mb-2 flex items-center gap-2"><Briefcase className="w-4 h-4 text-indigo-400" /> Executive Summary</h3>
                <p className="text-slate-300 leading-relaxed text-sm relative z-10 max-w-4xl">
                  {CEO_DATA.executiveSummary}
                </p>
             </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
             {/* Priorities */}
             <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h3 className="text-[10px] uppercase font-bold text-slate-500 mb-4 flex items-center gap-2">
                   <Target className="w-4 h-4 text-emerald-400" /> Agency Top Priorities
                </h3>
                <ul className="space-y-4">
                   {CEO_DATA.topPriorities.map((priority, i) => (
                     <li key={i} className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400 shrink-0">{i + 1}</div>
                        <span className="text-sm text-slate-300 leading-tight pt-1">{priority}</span>
                     </li>
                   ))}
                </ul>
             </div>

             {/* Alerts */}
             <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h3 className="text-[10px] uppercase font-bold text-slate-500 mb-4 flex items-center gap-2">
                   <Bell className="w-4 h-4 text-amber-400" /> System Alerts
                </h3>
                <div className="space-y-3">
                   {CEO_DATA.alerts.map(alert => (
                     <div key={alert.id} className={`p-3 rounded-lg border flex flex-col gap-1 ${
                       alert.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-200' :
                       alert.type === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-200' :
                       'bg-blue-500/10 border-blue-500/20 text-blue-200'
                     }`}>
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-bold">{alert.message}</span>
                        </div>
                        <div className="flex justify-between items-center mt-1 opacity-70">
                          <span className="text-[10px] uppercase">{alert.source}</span>
                          <span className="text-[10px]">{alert.timestamp}</span>
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             {/* System Health Overview (Visual) */}
             <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800/20 via-transparent to-transparent pointer-events-none" />
                <h3 className="text-[10px] uppercase font-bold text-slate-500 mb-6 flex items-center gap-2">
                   <TrendingUp className="w-4 h-4 text-blue-400" /> Agency Throughput
                </h3>
                <div className="space-y-6">
                   <div>
                     <div className="flex justify-between text-xs mb-2">
                        <span className="text-slate-400">Task Completion Rate</span>
                        <span className="text-emerald-400 font-mono font-bold">94%</span>
                     </div>
                     <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[94%]" /></div>
                   </div>
                   <div>
                     <div className="flex justify-between text-xs mb-2">
                        <span className="text-slate-400">Agent Utilization</span>
                        <span className="text-blue-400 font-mono font-bold">88%</span>
                     </div>
                     <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[88%]" /></div>
                   </div>
                   <div>
                     <div className="flex justify-between text-xs mb-2">
                        <span className="text-slate-400">Error Rate (Blocked Tasks)</span>
                        <span className="text-red-400 font-mono font-bold">2.1%</span>
                     </div>
                     <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-red-500 w-[2%]" /></div>
                   </div>
                </div>
             </div>
          </div>

          {/* Pending Decisions Module */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
             <div className="flex items-center justify-between mb-6">
               <h3 className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-400" /> Decisions Requiring CEO Approval
               </h3>
               <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400 font-mono">{decisions.filter(d => d.status === 'Pending').length} Pending</span>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {decisions.map(decision => (
                 <div key={decision.id} className={`border rounded-xl p-5 transition-colors ${
                   decision.status === 'Approved' ? 'bg-emerald-500/5 border-emerald-500/20' : 
                   decision.status === 'Rejected' ? 'bg-red-500/5 border-red-500/20' : 
                   'bg-slate-950 border-slate-700'
                 }`}>
                    <div className="flex justify-between items-start mb-3">
                       <h4 className="text-white font-bold">{decision.title}</h4>
                       {decision.status !== 'Pending' && (
                         <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${decision.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                           {decision.status}
                         </span>
                       )}
                    </div>
                    
                    <p className="text-sm text-slate-400 mb-4">{decision.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                       <div>
                         <span className="block text-slate-500 uppercase text-[9px] mb-1">Impact</span>
                         <span className="text-slate-300">{decision.impact}</span>
                       </div>
                       <div>
                         <span className="block text-slate-500 uppercase text-[9px] mb-1">Requested By</span>
                         <span className="text-blue-400">{decision.suggestedBy}</span>
                       </div>
                    </div>
                    
                    {decision.status === 'Pending' && (
                      <div className="flex gap-3">
                         <button 
                            onClick={() => handleDecision(decision.id, 'Approved')}
                            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex justify-center items-center gap-2"
                         >
                            <Check className="w-4 h-4" /> Approve
                         </button>
                         <button 
                            onClick={() => handleDecision(decision.id, 'Rejected')}
                            className="flex-1 bg-slate-800 hover:bg-red-900/50 hover:text-red-400 border border-slate-700 hover:border-red-500/50 text-slate-300 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex justify-center items-center gap-2"
                         >
                            <X className="w-4 h-4" /> Reject
                         </button>
                      </div>
                    )}
                 </div>
               ))}
             </div>
          </div>
       </div>
    </motion.div>
  );
}
