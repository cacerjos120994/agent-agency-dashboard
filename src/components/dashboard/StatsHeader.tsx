"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { INITIAL_AGENTS } from '@/data/mock-data';
import { Users, CheckCircle, Zap, AlertTriangle, TrendingUp } from 'lucide-react';

const MetricCard = ({ title, value, icon: Icon, trend, color }: any) => (
  <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
    <div className="flex justify-between items-start mb-2">
      <div className={`p-2 rounded-lg bg-slate-800 ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      {trend && (
        <span className="text-[10px] font-mono text-emerald-400">+{trend}%</span>
      )}
    </div>
    <div className="text-2xl font-bold text-white mb-0.5">{value}</div>
    <div className="text-[10px] uppercase tracking-wider text-slate-500">{title}</div>
  </div>
);

export default function StatsHeader() {
  const activeAgents = INITIAL_AGENTS.filter(a => a.status !== 'Idle').length;
  const totalEfficiency = Math.round(INITIAL_AGENTS.reduce((acc, a) => acc + a.efficiency, 0) / INITIAL_AGENTS.length);

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <MetricCard 
        title="Total Agents" 
        value={INITIAL_AGENTS.length} 
        icon={Users} 
        color="text-blue-400"
      />
      <MetricCard 
        title="Active Now" 
        value={activeAgents} 
        icon={Zap} 
        trend="12"
        color="text-orange-400"
      />
      <MetricCard 
        title="Tasks Done" 
        value="1,542" 
        icon={CheckCircle} 
        trend="5.4"
        color="text-emerald-400"
      />
      <MetricCard 
        title="Avg. Efficiency" 
        value={`${totalEfficiency}%`} 
        icon={TrendingUp} 
        color="text-purple-400"
      />
      <MetricCard 
        title="System Load" 
        value="Medium" 
        icon={AlertTriangle} 
        color="text-amber-400"
      />
    </div>
  );
}
