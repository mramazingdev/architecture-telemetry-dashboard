import React from 'react';

interface HealthGaugeProps {
  score: number; // Value from 0 to 100
  title: string;
}

export default function HealthGauge({ score, title }: HealthGaugeProps) {
  // SVG Arc Calculations for a semi-circle gauge
  const radius = 50;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  
  // We only want a 3/4 circle or half circle loop. Let's make it an elegant 240-degree gauge.
  const angleRange = 240; 
  const strokeDasharray = `${circumference} ${circumference}`;
  
  // Calculate offset based on score percentage
  const totalOffset = circumference * ((360 - angleRange) / 360);
  const scoreOffset = circumference * ((100 - score) / 100) * (angleRange / 360);
  const strokeDashoffset = totalOffset + scoreOffset;

  // Determine status text based on rating
  const getStatusText = (val: number) => {
    if (val >= 90) return { label: 'Excellent', color: 'text-[var(--color-accent-green)]' };
    if (val >= 70) return { label: 'Good', color: 'text-amber-400' };
    return { label: 'Critical', color: 'text-rose-500' };
  };

  const status = getStatusText(score);

  return (
    <div className="bg-[var(--color-space-card)] border border-[var(--color-border-gray)] rounded-xl p-5 flex flex-col items-center justify-between h-64 shadow-xl">
      {/* Card Header */}
      <div className="w-full text-left">
        <h3 className="text-sm font-semibold tracking-tight text-slate-400 uppercase">{title}</h3>
      </div>

      {/* Center Circle Gauge Graphical Frame */}
      <div className="relative flex items-center justify-center w-40 h-40 mt-2">
        <svg
          className="transform -rotate-210" // Rotates to center the open gap at the bottom
          height={radius * 2}
          width={radius * 2}
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        >
          {/* Define Gradient for a premium visual display */}
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>

          {/* Background Track Ring */}
          <circle
            className="text-slate-800"
            stroke="currentColor"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            style={{ strokeDashoffset: totalOffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />

          {/* Active Status Progress Ring */}
          <circle
            stroke="url(#gaugeGradient)"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            style={{ 
              strokeDashoffset,
              transition: 'stroke-dashoffset 0.8s ease-in-out'
            }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>

        {/* Floating Metrics Values directly inside the core absolute center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center mt-2">
          <span className="text-3xl font-bold tracking-tight text-slate-100">{score}%</span>
          <span className={`text-xs font-medium mt-0.5 ${status.color}`}>{status.label}</span>
        </div>
      </div>

      {/* Lower Metric Toggles */}
      <div className="w-full grid grid-cols-3 gap-2 border-t border-[var(--color-border-gray)]/60 pt-3 text-center text-[11px] font-medium text-slate-400">
        <div className="hover:text-slate-200 cursor-pointer transition-colors py-0.5 rounded hover:bg-slate-850">CPU</div>
        <div className="hover:text-slate-200 cursor-pointer transition-colors py-0.5 rounded hover:bg-slate-850">Latency</div>
        <div className="hover:text-slate-200 cursor-pointer transition-colors py-0.5 rounded hover:bg-slate-850">Errors</div>
      </div>
    </div>
  );
}