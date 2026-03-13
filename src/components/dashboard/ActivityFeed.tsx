"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ActivityLog, LogEventType } from '@/types';
import { INITIAL_LOGS } from '@/data/mock-data';
import { Terminal, CheckCircle2, AlertTriangle, Info, Network, Zap, Package } from 'lucide-react';

const LOG_ICONS: Record<LogEventType, React.ElementType> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertTriangle,
  handoff: Network,
  alert: Zap,
  delivery: Package
};

const LOG_COLORS: Record<LogEventType, string> = {
  info: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  success: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  warning: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  error: 'text-red-400 bg-red-500/10 border-red-500/20',
  handoff: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  alert: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  delivery: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
};

export default function ActivityFeed() {
  const [logs, setLogs] = useState<ActivityLog[]>(INITIAL_LOGS);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col h-full overflow-hidden shadow-xl">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/80 backdrop-blur-md">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2">
           <Terminal className="w-4 h-4 text-blue-500" /> System Logs
        </h3>
        <div className="flex items-center gap-2 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-widest">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          Live
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-[11px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        <AnimatePresence>
          {logs.map((log) => {
            const Icon = LOG_ICONS[log.type];
            return (
              <motion.div 
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`flex gap-3 p-2.5 rounded-lg border backdrop-blur-sm group hover:bg-slate-800/50 transition-colors ${LOG_COLORS[log.type]}`}
              >
                <div className="mt-0.5 shrink-0">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                     <span className="font-bold opacity-90">[{log.agentName}]</span>
                     <span className="opacity-50 text-[10px] tabular-nums tracking-tighter">{log.timestamp}</span>
                  </div>
                  <div className="text-slate-300 leading-relaxed font-sans text-xs">
                    {log.message}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        <div className="pt-4 flex items-center gap-2">
           <span className="text-blue-500/50">❯</span>
           <motion.span 
             animate={{ opacity: [0, 1, 0] }} 
             transition={{ duration: 0.8, repeat: Infinity }}
             className="inline-block w-1.5 h-3.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
           />
        </div>
      </div>
    </div>
  );
}
