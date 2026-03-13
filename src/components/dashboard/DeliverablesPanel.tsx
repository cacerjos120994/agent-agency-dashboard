"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { INITIAL_DELIVERABLES } from '@/data/mock-data';
import { Package, FileText, Lightbulb, PenTool, LayoutTemplate, BarChart3, Bell, Palette } from 'lucide-react';
import { Deliverable } from '@/types';

const TYPE_ICONS: Record<Deliverable['type'], React.ElementType> = {
  Insight: Lightbulb,
  Hypothesis: PenTool,
  Copy: FileText,
  Design: Palette,
  Plan: LayoutTemplate,
  Report: BarChart3,
  Alert: Bell,
};

const TYPE_COLORS: Record<Deliverable['type'], string> = {
  Insight: 'text-amber-400 border-amber-500/20 bg-amber-500/10',
  Hypothesis: 'text-purple-400 border-purple-500/20 bg-purple-500/10',
  Copy: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
  Design: 'text-pink-400 border-pink-500/20 bg-pink-500/10',
  Plan: 'text-blue-400 border-blue-500/20 bg-blue-500/10',
  Report: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/10',
  Alert: 'text-red-400 border-red-500/20 bg-red-500/10',
};

export default function DeliverablesPanel() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col h-full">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/80 backdrop-blur-md">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2">
           <Package className="w-4 h-4 text-orange-500" /> Executive Deliverables
        </h3>
        <span className="text-[10px] text-slate-500 font-mono">LATEST 3</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50 scrollbar-hide">
        {INITIAL_DELIVERABLES.map((del) => {
          const Icon = TYPE_ICONS[del.type];
          return (
            <motion.div 
              key={del.id}
              whileHover={{ scale: 1.01 }}
              className="bg-slate-950 border border-slate-800 rounded-lg p-4 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800/10 rounded-full blur-2xl group-hover:bg-slate-800/20 transition-colors" />
              
              <div className="flex justify-between items-start mb-3 relative z-10">
                <div className="flex items-center gap-2">
                   <div className={`p-1.5 rounded-md border ${TYPE_COLORS[del.type]}`}>
                     <Icon className="w-3.5 h-3.5" />
                   </div>
                   <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{del.type}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {del.timestamp}
                </span>
              </div>
              
              <h4 className="text-sm font-bold text-slate-200 mb-2 leading-tight relative z-10">{del.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4 relative z-10">{del.content}</p>
              
              <div className="flex items-center justify-between border-t border-slate-800/50 pt-3 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-orange-600 border border-orange-400 flex items-center justify-center text-[8px]">🦊</div>
                  <span className="text-[10px] font-mono text-slate-500">{del.authorName}</span>
                </div>
                
                {del.metrics && (
                  <div className="flex gap-3">
                    {Object.entries(del.metrics).map(([k, v]) => (
                      <div key={k} className="flex gap-1 items-baseline">
                        <span className="text-[9px] uppercase tracking-wider text-slate-600">{k}:</span>
                        <span className="text-[10px] font-bold text-slate-300 font-mono">{v}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
