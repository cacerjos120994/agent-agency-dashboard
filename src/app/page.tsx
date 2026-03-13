"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OfficeView from "@/components/dashboard/OfficeView";
import StatsHeader from "@/components/dashboard/StatsHeader";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import DeliverablesPanel from "@/components/dashboard/DeliverablesPanel";
import CeoMode from "@/components/dashboard/CeoMode";
import { Cpu, LayoutDashboard, Settings, Box, Terminal, Activity, Eye, Zap } from "lucide-react";

export default function Home() {
  const [isCeoMode, setIsCeoMode] = useState(false);

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-orange-500/30 selection:text-orange-200 relative">
      <AnimatePresence>
        {isCeoMode && <CeoMode onClose={() => setIsCeoMode(false)} />}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside className="w-20 flex flex-col items-center py-6 border-r border-slate-800 bg-slate-950/80 backdrop-blur-xl z-50 shrink-0">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center mb-10 shadow-[0_0_20px_rgba(234,88,12,0.4)] border border-orange-400/30 cursor-pointer hover:scale-105 transition-transform">
          <Cpu className="text-white w-6 h-6" />
        </div>
        
        <nav className="flex flex-col gap-6 w-full px-4">
          <button className="flex items-center justify-center p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-inner group">
            <LayoutDashboard className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          <button className="flex items-center justify-center p-3 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-all group">
            <Box className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          <button className="flex items-center justify-center p-3 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-all group">
            <Terminal className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          <div className="h-px w-8 bg-slate-800 mx-auto my-2" />
          <button className="flex items-center justify-center p-3 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-all group mt-auto mb-4">
            <Settings className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-950/80 backdrop-blur-xl z-40 shrink-0">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <h1 className="text-lg font-black tracking-tight text-white uppercase flex items-center gap-2">
                Agent Agency <span className="text-orange-500">Ops</span>
              </h1>
              <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Mission Control Center</span>
            </div>
            <div className="h-6 w-px bg-slate-800 mx-2" />
            <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Ops Mode
            </div>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="flex gap-4 mr-4">
                <button 
                  onClick={() => setIsCeoMode(true)}
                  className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-slate-400 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700"
                >
                  <Eye className="w-3.5 h-3.5" /> CEO View
                </button>
             </div>
             <div className="flex flex-col items-end">
               <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Uptime</span>
               <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                 <Zap className="w-3 h-3" /> 99.9%
               </span>
             </div>
             <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 p-[2px] cursor-pointer hover:scale-105 transition-transform shadow-lg">
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center border border-slate-800">
                  <span className="text-sm">🦊</span>
                </div>
             </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-[#020617] scrollbar-hide">
          <StatsHeader />
          
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-6">
            <div className="xl:col-span-8 relative rounded-xl shadow-2xl overflow-hidden ring-1 ring-white/5">
              <div className="absolute top-4 left-4 z-40 bg-slate-950/80 backdrop-blur border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg">
                 <Activity className="w-4 h-4 text-blue-500" />
                 <span className="text-[10px] uppercase tracking-widest font-bold text-slate-300">Live Floor Plan</span>
              </div>
              <OfficeView />
            </div>
            
            <div className="xl:col-span-4 flex flex-col gap-6 h-[650px]">
              <div className="flex-1 min-h-0">
                <ActivityFeed />
              </div>
              <div className="flex-1 min-h-0">
                <DeliverablesPanel />
              </div>
            </div>
          </div>

          <div className="mt-8">
             <button 
                onClick={() => setIsCeoMode(true)}
                className="w-full bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all p-6 rounded-xl flex items-center justify-between group cursor-pointer shadow-lg hover:shadow-indigo-500/10"
             >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                    <Eye className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                     <h3 className="text-base font-bold uppercase tracking-[0.2em] text-white group-hover:text-indigo-400 transition-colors">Strategic CEO Terminal</h3>
                     <p className="text-xs text-slate-500 mt-1 font-medium">Access executive intelligence, approve multi-agent handoffs, and monitor system-wide throughput.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-600 group-hover:text-indigo-400 transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-widest hidden md:block">Initialize Mode</span>
                  <Zap className="w-5 h-5 animate-pulse" />
                </div>
             </button>
          </div>
        </div>
      </main>
    </div>
  );
}
