import { Activity, Clock, ServerCrash } from 'lucide-react';

export default function MonitoringView() {
  const streams = [
    { service: 'API Gateway Hyper-Bus', metric: '14.2ms avg lat', status: 'nominal' },
    { service: 'GraphQL Resolver Schema Layer', metric: '0.01% error rate', status: 'nominal' },
    { service: 'Redis Cache Memory Pool', metric: '94.2% Hit Rate', status: 'nominal' },
    { service: 'Kafka Messaging Pipeline', metric: '240 msg/sec', status: 'nominal' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-[var(--color-space-card)] border border-[var(--color-border-gray)] rounded-xl p-5 shadow-lg">
        <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-4 flex items-center gap-2">
          <Activity size={14} className="text-[var(--color-accent-blue)]" /> Live Stream Telemetry
        </h3>
        <div className="space-y-3">
          {streams.map((stream, i) => (
            <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-slate-900/40 border border-slate-800/60 text-xs">
              <span className="text-slate-300 font-medium">{stream.service}</span>
              <div className="flex items-center gap-3">
                <span className="font-mono text-slate-400">{stream.metric}</span>
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent-green)] animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[var(--color-space-card)] border border-[var(--color-border-gray)] rounded-xl p-5 shadow-lg flex flex-col justify-between">
        <div>
          <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-4 flex items-center gap-2">
            <Clock size={14} className="text-amber-400" /> Operational SLA Status
          </h3>
          <div className="text-center py-6">
            <p className="text-4xl font-bold tracking-tight text-slate-100 font-mono">99.998%</p>
            <p className="text-xs text-slate-500 mt-1">Uptime maintained across past 30 runtime periods</p>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-3 flex justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1"><ServerCrash size={12} /> Total Downtime: 0m</span>
          <span>Next Scheduled Maintenance: June 1st</span>
        </div>
      </div>
    </div>
  );
}