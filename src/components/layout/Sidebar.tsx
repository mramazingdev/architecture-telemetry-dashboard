import { LayoutDashboard, Server, Activity, Shield, Settings, Terminal, BarChart3, FileText, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ isOpen, onClose, activeTab, setActiveTab }: SidebarProps) {
  const primaryNavigation = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: Server, label: 'Systems' },
    { icon: Activity, label: 'Monitoring' },
    { icon: Server, label: 'Deployments' },
    { icon: BarChart3, label: 'Traffic' },
    { icon: Shield, label: 'Security' },
  ];

  const secondaryNavigation = [
    { icon: Terminal, label: 'API' },
    { icon: FileText, label: 'Reports' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[var(--color-space-card)] border-r border-[var(--color-border-gray)] 
        flex flex-col select-none transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand Logo & Mobile Close Button */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-[var(--color-border-gray)]">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-[var(--color-accent-blue)] flex items-center justify-center font-bold text-xs text-white">
              A
            </div>
            <span className="text-lg font-bold tracking-wider text-slate-100 font-mono">
              ARCHITECTA
            </span>
          </div>
          
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-200 lg:hidden">
            <X size={18} />
          </button>
        </div>

        {/* Navigation Content Matrix */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {primaryNavigation.map((item) => {
            const isActive = activeTab === item.label;
            return (
              <button
                key={item.label}
                onClick={() => { setActiveTab(item.label); onClose(); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group ${
                  isActive 
                    ? 'bg-[var(--color-accent-blue)]/10 text-[var(--color-accent-blue)] font-medium' 
                    : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-[var(--color-accent-blue)]' : 'text-slate-400 group-hover:text-slate-200'} />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
          
          <div className="pt-4 mt-4 border-t border-[var(--color-border-gray)]/60">
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Management</p>
            {secondaryNavigation.map((item) => {
              const isActive = activeTab === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => { setActiveTab(item.label); onClose(); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group ${
                    isActive 
                      ? 'bg-[var(--color-accent-blue)]/10 text-[var(--color-accent-blue)] font-medium' 
                      : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                  }`}
                >
                  <item.icon size={20} className={isActive ? 'text-[var(--color-accent-blue)]' : 'text-slate-400 group-hover:text-slate-200'} />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
}