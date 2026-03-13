"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { INITIAL_AGENTS } from '@/data/mock-data';

const LOGS = [
  { id: 1, time: '12:05:22', agent: 'Research Fox', msg: 'Competitive analysis for "Smart Desk" completed.', type: 'success' },
  { id: 2, time: '12:05:45', agent: 'Strategy Fox', msg: 'Defining 3 testing hypotheses for Meta Ads.', type: 'info' },
  { id: 3, time: '12:06:01', agent: 'Manager Fox', msg: 'Reviewing creative handoff for Campaign Beta.', type: 'info' },
  { id: 4, time: '12:06:12', agent: 'Auto Fox', msg: 'System integrity check: 100% stable.', type: 'success' },
  { id: 5, time: '12:06:30', agent: 'Copy Fox', msg: 'Drafting variations for hook: "The secret to focus".', type: 'info' },
  { id: 6, time: '12:06:45', agent: 'Planner Fox', msg: 'Optimizing budget distribution (CBO).', type: 'info' },
];

export default function ActivityFeed() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Live Mission Logs</h3>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-emerald-500/80 font-mono">STREAMING</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-[11px]">
        {LOGS.map((log) => (
          <motion.div 
            key={log.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3 text-slate-400 group"
          >
            <span className="text-slate-600 shrink-0">{log.time}</span>
            <span className="text-blue-400 shrink-0">[{log.agent}]</span>
            <span className="group-hover:text-slate-200 transition-colors">{log.msg}</span>
          </motion.div>
        ))}
        <div className="pt-2">
           <span className="text-blue-500 opacity-50">$</span>
           <motion.span 
             animate={{ opacity: [0, 1, 0] }} 
             transition={{ duration: 0.8, repeat: Infinity }}
             className="inline-block w-1.5 h-3 bg-blue-500/50 ml-1 translate-y-0.5"
           />
        </div>
      </div>
    </div>
  );
}
