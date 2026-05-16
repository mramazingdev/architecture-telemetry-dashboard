import { useState } from 'react';
import { FileText, Download, RefreshCw, CheckCircle } from 'lucide-react';

export default function ReportsView() {
  const [compiling, setCompiling] = useState(false);
  const [ready, setReady] = useState(false);

  const triggerCompilation = () => {
    if (compiling) return;
    setCompiling(true);
    setReady(false);
    setTimeout(() => {
      setCompiling(false);
      setReady(true);
    }, 2500);
  };

  return (
    <div className="bg-[var(--color-space-card)] border border-[var(--color-border-gray)] rounded-xl p-6 shadow-xl max-w-2xl">
      <div className="mb-6">
        <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider flex items-center gap-2">
          <FileText size={14} className="text-[var(--color-accent-blue)]" /> Infrastructure Audit Reports
        </h3>
        <p className="text-xs text-slate-500 mt-1">Compile comprehensive architectural system performance summaries, uptime SLAs, and compliance logs.</p>
      </div>

      <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-semibold text-slate-200">System Topology Summary Snapshot</h4>
          <p className="text-xs text-slate-500 mt-0.5">Format: Portable Document Format (.pdf)</p>
        </div>

        {ready ? (
          <button 
            onClick={() => alert('Downloading system documentation archive...')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs font-medium px-4 py-2 bg-[var(--color-accent-green)]/10 text-[var(--color-accent-green)] border border-[var(--color-accent-green)]/30 hover:bg-[var(--color-accent-green)]/20 rounded-lg transition-colors"
          >
            <Download size={14} /> Download PDF
          </button>
        ) : (
          <button 
            onClick={triggerCompilation}
            disabled={compiling}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 text-xs font-medium px-4 py-2 rounded-lg border transition-all ${
              compiling 
                ? 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed' 
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <RefreshCw size={14} className={compiling ? 'animate-spin' : ''} />
            {compiling ? 'Compiling Registry...' : 'Generate Report'}
          </button>
        )}
      </div>

      {ready && (
        <p className="text-[11px] text-[var(--color-accent-green)] flex items-center gap-1.5 mt-3 font-medium">
          <CheckCircle size={12} /> Audit package compiled successfully. Valid signatures appended.
        </p>
      )}
    </div>
  );
}