import { GitBranch, Calendar, CheckCircle2 } from 'lucide-react';

export default function DeploymentsView() {
  const pipelineHistory = [
    { version: 'v3.1.2', commit: 'Merge pull request #482 from feature/auth-oauth', date: '10 mins ago', author: 'Alex T.' },
    { version: 'v3.1.1', commit: 'fix: clear connection memory leak on websocket cluster', date: 'Yesterday', author: 'Alex T.' },
    { version: 'v3.1.0', commit: 'feat: structural updates for architecture monitoring pipeline', date: '3 days ago', author: 'DevOps Engine' },
  ];

  return (
    <div className="bg-[var(--color-space-card)] border border-[var(--color-border-gray)] rounded-xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">CI/CD Production Deployment Pipelines</h3>
          <p className="text-xs text-slate-500 mt-0.5">Continuous branch sync tracking from main repository</p>
        </div>
      </div>

      <div className="space-y-4">
        {pipelineHistory.map((log, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 gap-4 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3.5">
              <div className="p-2 bg-[var(--color-space-dark)] rounded-lg text-[var(--color-accent-green)] border border-slate-800 shrink-0">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-200">{log.version}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--color-accent-green)]/10 text-[var(--color-accent-green)] font-semibold border border-[var(--color-accent-green)]/20 uppercase tracking-wide">Stable</span>
                </div>
                <p className="text-xs text-slate-400 mt-1 line-clamp-1">{log.commit}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-[11px] text-slate-500 sm:text-right sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
              <div className="flex items-center gap-1.5"><GitBranch size={12} /> {log.author}</div>
              <div className="flex items-center gap-1.5"><Calendar size={12} /> {log.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}