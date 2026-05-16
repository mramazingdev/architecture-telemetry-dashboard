import { useState, useEffect } from 'react';
import MainLayout from './components/layout/MainLayout';
import HealthGauge from './components/dashboard/HealthGauge';
import ArchitectureMap from './components/dashboard/ArchitectureMap';
import TrafficOverview from './components/dashboard/TrafficOverview';

// Sub-view import modules
import SystemsView from './components/dashboard/views/SystemsView';
import MonitoringView from './components/dashboard/views/MonitoringView';
import DeploymentsView from './components/dashboard/views/DeploymentsView';
import TrafficView from './components/dashboard/views/TrafficView';
import SecurityView from './components/dashboard/views/SecurityView';

// Append these imports alongside your previous view modules at the top of src/App.tsx:
import ApiView from './components/dashboard/views/ApiView';
import ReportsView from './components/dashboard/views/ReportsView';
import SettingsView from './components/dashboard/views/SettingsView';

import { ShieldCheck, HardDrive, RefreshCw } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [liveScore, setLiveScore] = useState(96);
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveScore((prev) => {
        const drift = Math.floor(Math.random() * 3) - 1;
        const next = prev + drift;
        return next > 100 ? 100 : next < 90 ? 94 : next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleManualDeploy = () => {
    if (isDeploying) return;
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      alert('Deployment complete: Cluster configurations updated successfully.');
    }, 3000);
  };

  // Main Dashboard View layout extractor
  const DashboardMainView = () => (
    <div className="grid grid-cols-12 gap-6 items-stretch">
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
        <HealthGauge score={liveScore} title="System Health Score" />
        
        <div className="bg-[var(--color-space-card)] border border-[var(--color-border-gray)] rounded-xl p-5 shadow-lg flex-1 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-3">Live Component Feed</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-2.5 rounded bg-slate-900/40 border border-slate-800/60">
                <span className="text-slate-300 font-medium">Nginx-WS1</span>
                <span className="text-[var(--color-accent-green)] font-medium bg-[var(--color-accent-green)]/10 px-2 py-0.5 rounded text-[10px]">Online</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded bg-slate-900/40 border border-slate-800/60">
                <span className="text-slate-300 font-medium">App-API Gateway</span>
                <span className="text-[var(--color-accent-green)] font-medium bg-[var(--color-accent-green)]/10 px-2 py-0.5 rounded text-[10px]">Online</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded bg-slate-900/40 border border-slate-800/60">
                <span className="text-slate-300 font-medium">Postgres-Replica</span>
                <span className="text-amber-400 font-medium bg-amber-500/10 px-2 py-0.5 rounded text-[10px]">Syncing</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-8">
        <ArchitectureMap />
      </div>

      <div className="col-span-12 lg:col-span-4">
        <TrafficOverview />
      </div>

      <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-[var(--color-space-card)] border border-[var(--color-border-gray)] rounded-xl p-5 shadow-lg flex flex-col justify-between gap-4">
        <div>
          <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2">Security Status</h4>
          <p className="text-xs text-slate-500">Real-time edge security rules engine.</p>
        </div>
        <div className="py-2 flex items-center justify-between border-b border-slate-800/60">
          <span className="text-xs text-slate-300 font-medium flex items-center gap-2">
            <ShieldCheck size={16} className="text-[var(--color-accent-green)]" /> WAF Firewall
          </span>
          <button onClick={() => setActiveTab('Security')} className="text-xs font-medium text-[var(--color-accent-blue)] hover:underline">
            Audit Logs
          </button>
        </div>
        <div className="text-[11px] text-slate-500 font-medium">
          SSL Certificate status active (Verified Layer 7).
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-[var(--color-space-card)] border border-[var(--color-border-gray)] rounded-xl p-5 shadow-lg flex flex-col justify-between gap-4">
        <div>
          <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2">Recent Deployments</h4>
          <p className="text-xs text-slate-500">Continuous integration build releases.</p>
        </div>
        <div className="py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RefreshCw size={14} className={`text-[var(--color-accent-blue)] ${isDeploying ? 'animate-spin' : ''}`} />
            <div>
              <p className="text-xs font-semibold text-slate-200">v3.1.2 - Stable</p>
              <p className="text-[10px] text-slate-500">GitHub Pipeline</p>
            </div>
          </div>
          <button
            disabled={isDeploying}
            onClick={handleManualDeploy}
            className={`text-xs px-3 py-1.5 rounded-md font-medium border transition-colors ${
              isDeploying 
                ? 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed' 
                : 'bg-[var(--color-accent-blue)]/10 text-[var(--color-accent-blue)] border-[var(--color-accent-blue)]/30 hover:bg-[var(--color-accent-blue)]/20'
                }`}
          >
            {isDeploying ? 'Deploying...' : 'Deploy'}
          </button>
        </div>
        <div className="text-[11px] text-slate-500 font-medium border-t border-slate-800/60 pt-2 flex items-center gap-1.5">
          <HardDrive size={12} /> Instance Hash: <span className="font-mono text-slate-400">aef8490</span>
        </div>
      </div>
    </div>
  );

  // Update this section inside your App.tsx component body shell:
  const renderViewContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <DashboardMainView />;
      case 'Systems':
        return <SystemsView />;
      case 'Monitoring':
        return <MonitoringView />;
      case 'Deployments':
        return <DeploymentsView />;
      case 'Traffic':
        return <TrafficView />;
      case 'Security':
        return <SecurityView />;
      
      // NEW CHANNELS WIRED UP HERE:
      case 'API':
        return <ApiView />;
      case 'Reports':
        return <ReportsView />;
      case 'Settings':
        return <SettingsView />;
        
      default:
        return (
          <div className="p-12 border border-dashed border-[var(--color-border-gray)] rounded-xl bg-[var(--color-space-card)]/40 text-center">
            <h2 className="text-base font-semibold text-slate-300">Management Section: {activeTab}</h2>
            <p className="text-xs text-slate-500 mt-2">Next phase container placeholder shell.</p>
          </div>
        );
    }
  };

  return (
    <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderViewContent()}
    </MainLayout>
  );
}