import OfficeView from "@/components/dashboard/OfficeView";
import StatsHeader from "@/components/dashboard/StatsHeader";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import { Cpu, LayoutDashboard, Settings, Box, Terminal } from "lucide-react";

export default function Home() {
  return (
    <div className="flex h-screen bg-black text-slate-200 overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-16 flex flex-col items-center py-6 border-r border-slate-800 bg-slate-950">
        <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center mb-10 shadow-lg shadow-orange-900/20">
          <Cpu className="text-white w-6 h-6" />
        </div>
        
        <nav className="flex flex-col gap-8">
          <button className="text-blue-500 p-2 rounded-lg bg-blue-500/10"><LayoutDashboard className="w-5 h-5" /></button>
          <button className="text-slate-500 hover:text-white transition-colors"><Box className="w-5 h-5" /></button>
          <button className="text-slate-500 hover:text-white transition-colors"><Terminal className="w-5 h-5" /></button>
          <button className="text-slate-500 hover:text-white transition-colors"><Settings className="w-5 h-5" /></button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-950/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold tracking-tight text-white uppercase font-mono">
              Agent Agency Dashboard <span className="text-slate-600 mx-2">/</span> <span className="text-orange-500">Mission Control</span>
            </h1>
            <div className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
              Live Ops
            </div>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="flex flex-col items-end">
               <span className="text-[10px] text-slate-500 uppercase tracking-tighter">System Health</span>
               <span className="text-xs font-mono text-white">99.8% Uptime</span>
             </div>
             <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700" />
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          <StatsHeader />
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <OfficeView />
            </div>
            
            <div className="flex flex-col gap-6">
              <ActivityFeed />
              
              <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-xl p-6 relative overflow-hidden group">
                 <div className="relative z-10">
                    <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">Ready for Deploy</h4>
                    <p className="text-xs text-slate-400 mb-4 leading-relaxed">System architecture optimized for Vercel Hobby. Ready for live client demonstrations.</p>
                    <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow-lg shadow-indigo-900/40">
                      GENERATE REPORT
                    </button>
                 </div>
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                   <Box className="w-16 h-16" />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
