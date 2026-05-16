import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Search, Bell, Menu } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function MainLayout({ children, activeTab, setActiveTab }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-[var(--color-space-dark)] text-slate-200 overflow-hidden font-sans antialiased">
      {/* Responsive Shell Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Responsive Header Navbar */}
        <header className="h-16 border-b border-[var(--color-border-gray)] bg-[var(--color-space-card)]/30 backdrop-blur-md flex items-center justify-between px-4 sm:px-8 z-10">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Hamburger Button trigger icon visible only on smaller screen targets */}
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800/50 lg:hidden"
            >
              <Menu size={20} />
            </button>
            
            <h1 className="text-base sm:text-xl font-semibold tracking-tight text-slate-100 truncate">
              {activeTab}
            </h1>
            
            <div className="hidden sm:flex items-center gap-2 bg-slate-800/80 border border-[var(--color-border-gray)] px-3 py-1 rounded-md text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent-green)] animate-pulse" />
              Production-US-East
            </div>
          </div>

          {/* Interactive Header Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={() => alert('Search initiated...')} className="p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800/50 transition-colors">
              <Search size={18} />
            </button>
            <button onClick={() => alert('No new alerts.')} className="p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800/50 transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full" />
            </button>
            
            <div className="h-6 w-px bg-[var(--color-border-gray)] mx-1" />

            <div className="flex items-center gap-3 pl-1">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-slate-700 flex items-center justify-center text-xs font-semibold text-white shrink-0">
                AT
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-medium text-slate-200">Alex Thompson</p>
                <p className="text-[10px] text-slate-400">Senior Architect</p>
              </div>
            </div>
          </div>
        </header>

        {/* Responsive Content Container Panel */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}