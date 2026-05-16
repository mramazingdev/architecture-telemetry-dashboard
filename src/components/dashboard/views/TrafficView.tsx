import TrafficOverview from '../TrafficOverview';
import { Globe, ArrowUpRight } from 'lucide-react';

export default function TrafficView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      <div className="lg:col-span-2">
        <TrafficOverview />
      </div>
      
      <div className="bg-[var(--color-space-card)] border border-[var(--color-border-gray)] rounded-xl p-5 shadow-lg flex flex-col justify-between">
        <div>
          <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-4 flex items-center gap-2">
            <Globe size={14} className="text-[var(--color-accent-blue)]" /> Regional Ingress Distribution
          </h3>
          <div className="space-y-3 text-xs">
            {[{ geo: 'North America (US-East)', load: '52%' }, { geo: 'Europe (EU-West)', load: '31%' }, { geo: 'Asia Pacific (AP-South)', load: '17%' }].map((region, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-slate-300 font-medium">
                  <span>{region.geo}</span>
                  <span className="font-mono text-slate-400">{region.load}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--color-accent-blue)] rounded-full" style={{ width: region.load }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="w-full mt-4 text-center py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800/60 rounded-lg text-xs text-slate-400 transition-colors flex items-center justify-center gap-1.5">
          View Raw CDN Access Logs <ArrowUpRight size={12} />
        </button>
      </div>
    </div>
  );
}