import { TrendingUp, Users } from 'lucide-react';

export default function TrafficOverview() {
  // Mock data representing throughput over the last 24 hours
  const dataPoints = [30, 45, 35, 60, 40, 75, 50, 85, 65, 90, 70, 95];
  
  // SVG ViewBox dimensions
  const width = 500;
  const height = 140;
  const padding = 10;

  // Calculate coordinates for the SVG path
  const points = dataPoints.map((val, index) => {
    const x = padding + (index * (width - padding * 2)) / (dataPoints.length - 1);
    // Invert Y axis because SVG (0,0) starts at top-left
    const y = height - padding - (val * (height - padding * 2)) / 100;
    return { x, y };
  });

  // Convert coordinate objects into an SVG smooth cubic bezier path string
  const pathD = points.reduce((acc, p, i, a) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    // Create subtle control points for smoothing out the data peaks
    const cpX = a[i - 1].x + (p.x - a[i - 1].x) / 2;
    return `${acc} C ${cpX} ${a[i - 1].y}, ${cpX} ${p.y}, ${p.x} ${p.y}`;
  }, '');

  // Complete closed path structure for the under-curve gradient mask
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  return (
    <div className="bg-[var(--color-space-card)] border border-[var(--color-border-gray)] rounded-xl p-5 flex flex-col justify-between h-64 shadow-xl">
      {/* Header Segment */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-slate-400 uppercase">Traffic Overview</h3>
          <p className="text-xs text-slate-500 mt-0.5">Throughput metrics over the last 24 Hrs</p>
        </div>
        <span className="text-[10px] font-medium bg-slate-900 border border-[var(--color-border-gray)] px-2 py-1 rounded text-slate-400 font-mono">
          Live
        </span>
      </div>

      {/* Core SVG Sparkline Diagram */}
      <div className="flex-1 w-full relative mt-4 min-h-[110px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          <defs>
            {/* Smooth linear gradient match for the stroke line fill */}
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Under-curve fading surface mask fill */}
          <path d={areaD} fill="url(#chartGradient)" />

          {/* Core crisp top path stroke vector */}
          <path
            d={pathD}
            fill="none"
            stroke="var(--color-accent-blue)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Dynamic interactive highlight point on final tracking index */}
          <circle
            cx={points[points.length - 1].x}
            cy={points[points.length - 1].y}
            r="4"
            fill="var(--color-accent-blue)"
            className="animate-ping origin-center"
          />
          <circle
            cx={points[points.length - 1].x}
            cy={points[points.length - 1].y}
            r="3"
            fill="var(--color-accent-blue)"
          />
        </svg>
      </div>

      {/* Numerical Metrics Summary Matrix */}
      <div className="grid grid-cols-2 gap-4 border-t border-[var(--color-border-gray)]/60 pt-3 mt-2">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
            <Users size={14} />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block uppercase font-sans">Concurrent Users</span>
            <span className="text-sm font-bold text-slate-200 font-mono">18.5k</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
            <TrendingUp size={14} />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block uppercase font-sans">Requests / Sec</span>
            <span className="text-sm font-bold text-slate-200 font-mono">4.2k</span>
          </div>
        </div>
      </div>
    </div>
  );
}