import { ShieldAlert, Terminal, Lock } from 'lucide-react';

export default function SecurityView() {
  const auditLogs = [
    { timestamp: '15:24:02', event: 'API Authentication Request Blocked', origin: '185.220.101.5', risk: 'Medium' },
    { timestamp: '14:11:58', event: 'Rate-Limit Rule Triggered (Global Burst)', origin: '45.133.192.12', risk: 'Low' },
    { timestamp: '09:04:15', event: 'Cross-Origin Resource (CORS) Violation', origin: '102.89.43.201', risk: 'Low' },
  ];

  return (
    <div className="bg-[var(--color-space-card)] border border-[var(--color-border-gray)] rounded-xl p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
        <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider flex items-center gap-2">
          <ShieldAlert size={14} className="text-rose-500" /> Layer 7 Edge Security Firewall Audits
        </h3>
        <span className="text-[10px] text-[var(--color-accent-green)] font-medium bg-[var(--color-accent-green)]/10 px-2 py-0.5 border border-[var(--color-accent-green)]/20 rounded">
          WAF Guard Active
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300 font-sans min-w-[600px]">
          <thead>
            <tr className="text-slate-500 border-b border-slate-800">
              <th className="pb-2.5 font-medium">Timestamp</th>
              <th className="pb-2.5 font-medium">Threat Description Action</th>
              <th className="pb-2.5 font-medium">Source IP</th>
              <th className="pb-2.5 font-medium text-right">Risk Factor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {auditLogs.map((log, i) => (
              <tr key={i} className="hover:bg-slate-900/40 transition-colors">
                <td className="py-3 font-mono text-slate-500">{log.timestamp}</td>
                <td className="py-3 font-medium flex items-center gap-2">
                  <Terminal size={12} className="text-slate-500" /> {log.event}
                </td>
                <td className="py-3 font-mono text-slate-400">{log.origin}</td>
                <td className="py-3 text-right">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    log.risk === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {log.risk}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}