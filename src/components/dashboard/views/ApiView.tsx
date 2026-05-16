import { useState } from 'react';
import { Key, Copy, Check, Eye, EyeOff, Plus } from 'lucide-react';

export default function ApiView() {
  const [apiKey, setApiKey] = useState('sk_prod_4f8a92bc10d3ebd751a024fe');
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateNewKey = () => {
    const hex = Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setApiKey(`sk_prod_${hex}`);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-[var(--color-space-card)] border border-[var(--color-border-gray)] rounded-xl p-5 shadow-xl flex flex-col justify-between gap-6">
        <div>
          <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-1 flex items-center gap-2">
            <Key size={14} className="text-[var(--color-accent-blue)]" /> Infrastructure Authentication Tokens
          </h3>
          <p className="text-xs text-slate-500">Use this secret key to authenticate your architecture telemetry collection daemon agent pipelines.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 flex items-center justify-between gap-4 font-mono text-xs">
          <span className="text-slate-300 tracking-wider overflow-x-auto whitespace-nowrap custom-scrollbar pr-2">
            {showKey ? apiKey : '••••••••••••••••••••••••••••••••••••••••'}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            <button 
              onClick={() => setShowKey(!showKey)} 
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
              title={showKey ? "Hide Key" : "Show Key"}
            >
              {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
            <button 
              onClick={copyToClipboard} 
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
              title="Copy Key"
            >
              {copied ? <Check size={14} className="text-[var(--color-accent-green)]" /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800/60 flex justify-between items-center">
          <span className="text-[11px] text-slate-500">Permissions: Read/Write Metrics Stream</span>
          <button 
            onClick={generateNewKey}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-[var(--color-accent-blue)]/10 text-[var(--color-accent-blue)] border border-[var(--color-accent-blue)]/30 hover:bg-[var(--color-accent-blue)]/20 rounded-md transition-colors"
          >
            <Plus size={14} /> Rotate API Token
          </button>
        </div>
      </div>

      <div className="bg-[var(--color-space-card)] border border-[var(--color-border-gray)] rounded-xl p-5 shadow-xl text-xs flex flex-col justify-between">
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-400 uppercase tracking-wide">Quick Integration</h4>
          <p className="text-slate-500 leading-relaxed">Pass the configuration header when piping logs from external environments:</p>
          <pre className="p-3 bg-slate-900 border border-slate-800 rounded-lg font-mono text-[10px] text-slate-400 overflow-x-auto">
{`curl -X POST \\
  https://api.architecta.com/v1/stream \\
  -H "X-API-Key: YOUR_TOKEN"`}
          </pre>
        </div>
      </div>
    </div>
  );
}