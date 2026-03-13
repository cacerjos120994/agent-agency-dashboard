"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, TrendingUp, AlertOctagon, CheckCircle2, ChevronRight } from 'lucide-react';

export default function ExecutiveSummary() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl p-6 relative group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors pointer-events-none" />
      
      <div className="flex justify-between items-center mb-6 relative z-10 border-b border-slate-800 pb-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2">
           <Briefcase className="w-5 h-5 text-indigo-400" /> Executive Summary
        </h3>
        <button className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest hover:text-indigo-300 flex items-center gap-1">
          Full Report <ChevronRight className="w-3 h-3" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
         {/* Column 1 */}
         <div className="space-y-4">
            <h4 className="text-[10px] font-mono uppercase text-slate-500 font-bold">Performance</h4>
            <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800/50 hover:border-slate-700 transition-colors">
               <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-white">18%</div>
                    <div className="text-[9px] uppercase tracking-wider text-emerald-400">Yield Increase</div>
                  </div>
               </div>
               <p className="text-xs text-slate-400 leading-relaxed">
                 Campaign Beta scaling phase is outperforming baseline predictions. CPA is down by $1.40.
               </p>
            </div>
         </div>

         {/* Column 2 */}
         <div className="space-y-4">
            <h4 className="text-[10px] font-mono uppercase text-slate-500 font-bold">Bottlenecks & Alerts</h4>
            <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800/50 hover:border-slate-700 transition-colors">
               <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                    <AlertOctagon className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-white">1</div>
                    <div className="text-[9px] uppercase tracking-wider text-amber-400">Active Alert</div>
                  </div>
               </div>
               <p className="text-xs text-slate-400 leading-relaxed">
                 Creative fatigue detected on main hook variant. Copy Fox has been tasked with 5 new variations.
               </p>
            </div>
         </div>

         {/* Column 3 */}
         <div className="space-y-4">
            <h4 className="text-[10px] font-mono uppercase text-slate-500 font-bold">System Status</h4>
            <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800/50 hover:border-slate-700 transition-colors h-full flex flex-col justify-center">
               <div className="space-y-3">
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> API Handoffs</span>
                    <span className="font-mono text-white">100%</span>
                 </div>
                 <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-full" />
                 </div>
                 
                 <div className="flex justify-between items-center text-xs mt-3">
                    <span className="text-slate-400 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Agent Uptime</span>
                    <span className="font-mono text-white">99.8%</span>
                 </div>
                 <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-[99.8%]" />
                 </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
