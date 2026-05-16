import { Cpu, HardDrive, CheckCircle, AlertTriangle } from 'lucide-react';

export default function SystemsView() {
  const clusters = [
    { region: 'US-East Node Cluster', status: 'Healthy', load: '42%', storage: '68%', instances: 12, type: 'healthy' },
    { region: 'EU-Central Edge Node', status: 'Healthy', load: '58%', storage: '44%', instances: 8, type: 'healthy' },
    { region: 'AP-South Database Shard', status: 'Degraded', load: '89%', storage: '91%', instances: 4, type: 'warning' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {clusters.map((cluster, i) => (
          <div key={i} className="bg-[var(--color-space-card)] border border-[var(--color-border-gray)] rounded-xl p-5 shadow-lg flex flex-col justify-between gap-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-semibold text-slate-200">{cluster.region}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{cluster.instances} Active Virtual Instances</p>
              </div>
              <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium border ${
                cluster.type === 'healthy' 
                  ? 'bg-[var(--color-accent-green)]/10 text-[var(--color-accent-green)] border-[var(--color-accent-green)]/20' 
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}>
                {cluster.type === 'healthy' ? <CheckCircle size={10} /> : <AlertTriangle size={10} />}
                {cluster.status}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span className="flex items-center gap-1"><Cpu size={12} /> Compute Load</span>
                  <span className="font-mono">{cluster.load}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${cluster.type === 'healthy' ? 'bg-[var(--color-accent-blue)]' : 'bg-amber-500'}`} 
                    style={{ width: cluster.load }} 
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span className="flex items-center gap-1"><HardDrive size={12} /> NVMe Storage Allocation</span>
                  <span className="font-mono">{cluster.storage}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${cluster.type === 'healthy' ? 'bg-slate-400' : 'bg-rose-500'}`} 
                    style={{ width: cluster.storage }} 
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}