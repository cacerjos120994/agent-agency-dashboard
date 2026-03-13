"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { INITIAL_AGENTS } from '@/data/mock-data';
import { Users, CheckCircle, Zap, AlertTriangle, TrendingUp, Network, Activity, Cpu } from 'lucide-react';

const MetricCard = ({ title, value, icon: Icon, trend, color, subtext }: any) => (
  <motion.div 
    whileHover={{ y: -2, scale: 1.02 }}
    className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-lg relative overflow-hidden group"
  >
    <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-2xl opacity-10 ${color.replace('text-', 'bg-')} group-hover:opacity-20 transition-opacity`} />
    <div className="flex justify-between items-start mb-3">
      <div className={`p-2.5 rounded-lg bg-slate-950 border border-slate-800 shadow-inner ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      {trend && (
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold text-emerald-400">
          +{trend}%
        </span>
      )}
    </div>
    <div className="flex items-baseline gap-2 mb-1">
      <div className="text-3xl font-black tracking-tight text-white drop-shadow-md">{value}</div>
      {subtext && <div className="text-xs font-medium text-slate-500 uppercase">{subtext}</div>}
    </div>
    <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{title}</div>
  </motion.div>
);

export default function StatsHeader() {
  const activeAgents = INITIAL_AGENTS.filter(a => a.status !== 'Idle').length;
  const totalEfficiency = Math.round(INITIAL_AGENTS.reduce((acc, a) => acc + a.efficiency, 0) / INITIAL_AGENTS.length);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <MetricCard 
        title="Mission Ops Score" 
        value={totalEfficiency} 
        subtext="/ 100"
        icon={Activity} 
        trend="2.4"
        color="text-emerald-400"
      />
      <MetricCard 
        title="Active Nodes" 
        value={`${activeAgents}/${INITIAL_AGENTS.length}`} 
        icon={Cpu} 
        color="text-blue-400"
      />
      <MetricCard 
        title="Live Handoffs" 
        value="12" 
        icon={Network} 
        color="text-purple-400"
      />
      <MetricCard 
        title="System Load" 
        value="42%" 
        icon={Zap} 
        color="text-orange-400"
      />
    </div>
  );
}
