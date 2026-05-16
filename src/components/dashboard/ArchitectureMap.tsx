import React from 'react';
import { Server, Database, Shield, Radio, Cpu } from 'lucide-react';

interface NodeItemProps {
  name: string;
  type: string;
  status: 'online' | 'offline' | 'active';
  metrics?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const InfrastructureNode = ({ name, type, status, metrics, icon: Icon }: NodeItemProps) => {
  return (
    <div className="bg-slate-900/90 border border-[var(--color-border-gray)] rounded-xl p-4 flex flex-col gap-3 min-w-[180px] shadow-lg relative group hover:border-[var(--color-accent-blue)]/50 transition-all duration-300">
      {/* Node Header Info */}
      <div className="flex items-center justify-between gap-3">
        <div className="p-2 bg-[var(--color-space-dark)] rounded-lg border border-slate-800 text-slate-300 group-hover:text-[var(--color-accent-blue)] transition-colors">
          <Icon size={18} />
        </div>
        <div className="text-right">
          <h4 className="text-xs font-semibold text-slate-200 tracking-tight">{name}</h4>
          <p className="text-[10px] text-slate-500 font-medium">{type}</p>
        </div>
      </div>

      {/* Metrics or Status Indicator Pill */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[11px]">
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${status === 'offline' ? 'bg-rose-500' : 'bg-[var(--color-accent-green)]'} animate-pulse`} />
          <span className="text-slate-400 capitalize text-[10px]">{status}</span>
        </div>
        {metrics && <span className="text-slate-400 font-mono text-[10px]">{metrics}</span>}
      </div>
    </div>
  );
};

export default function ArchitectureMap() {
  return (
    <div className="bg-[var(--color-space-card)] border border-[var(--color-border-gray)] rounded-xl p-6 flex flex-col justify-between min-h-[480px] shadow-xl relative overflow-hidden">
      
      {/* Top Controls Header Bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-slate-400 uppercase">Active Architecture Map</h3>
          <p className="text-xs text-slate-500 mt-0.5">Live routing topology across data center regions</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-900 border border-[var(--color-border-gray)] px-3 py-1.5 rounded-lg text-xs">
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent-green)]" />
          <span className="text-slate-300 font-medium">Online/Green</span>
        </div>
      </div>

      {/* Visual Infrastructure Grid Canvas */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-8 items-center relative py-4">
        
        {/* COLUMN 1: LOAD BALANCER */}
        <div className="flex justify-center z-10">
          <InfrastructureNode 
            name="ELB-Main Cluster" 
            type="AWS Load Balancer" 
            status="active" 
            metrics="4.2k req/s"
            icon={Radio}
          />
        </div>

        {/* COLUMN 2: COMPUTE SERVERS */}
        <div className="flex flex-col gap-6 justify-center z-10">
          <InfrastructureNode 
            name="Web Servers" 
            type="4x Nginx Instances" 
            status="online" 
            metrics="CPU: 24%"
            icon={Server}
          />
          <InfrastructureNode 
            name="Application Tier" 
            type="6x Node.js Nodes" 
            status="online" 
            metrics="RAM: 58%"
            icon={Cpu}
          />
        </div>

        {/* COLUMN 3: STORAGE / DATABASE CLUSTER */}
        <div className="flex justify-center z-10">
          <InfrastructureNode 
            name="Database Cluster" 
            type="PostgreSQL Shards" 
            status="online" 
            metrics="92ms query lat"
            icon={Database}
          />
        </div>

        {/* COLUMN 4: EDGE DISTRIBUTION & FIREWALL */}
        <div className="flex flex-col gap-6 justify-center z-10">
          <InfrastructureNode 
            name="CDN CloudFront" 
            type="Edge Distribution" 
            status="active" 
            metrics="99.9% Hit"
            icon={Radio}
          />
          <InfrastructureNode 
            name="WAF Firewall" 
            type="DDoS Security Rule" 
            status="online" 
            metrics="0 threats"
            icon={Shield}
          />
        </div>

        {/* BACKGROUND CONNECTION LINES VIA SVG PATHS */}
        <div className="absolute inset-0 pointer-events-none hidden md:block opacity-40">
          <svg className="w-full h-full text-slate-700" xmlns="http://www.w3.org/2000/svg">
            {/* Path from Load Balancer to Web Server */}
            <path d="M 180, 180 L 320, 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
            {/* Path from Load Balancer to App Tier */}
            <path d="M 180, 180 L 320, 260" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
            {/* Paths from Compute to Database Cluster */}
            <path d="M 500, 100 L 640, 180" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M 500, 260 L 640, 180" fill="none" stroke="currentColor" strokeWidth="1.5" />
            {/* Paths from Database to CDN & Security */}
            <path d="M 820, 180 L 960, 100" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M 820, 180 L 960, 260" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* Micro Metrics Bottom Bar Footer */}
      <div className="grid grid-cols-3 gap-4 border-t border-[var(--color-border-gray)]/60 pt-4 text-xs font-mono mt-4">
        <div className="flex flex-col">
          <span className="text-slate-500 text-[10px] uppercase font-sans">Global CPU Average</span>
          <span className="text-slate-200 font-semibold text-sm mt-0.5">38.4%</span>
        </div>
        <div className="flex flex-col">
          <span className="text-slate-500 text-[10px] uppercase font-sans">Gateway Latency</span>
          <span className="text-[var(--color-accent-green)] font-semibold text-sm mt-0.5">24ms</span>
        </div>
        <div className="flex flex-col">
          <span className="text-slate-500 text-[10px] uppercase font-sans">Error Threshold Rate</span>
          <span className="text-slate-200 font-semibold text-sm mt-0.5">0.02%</span>
        </div>
      </div>

    </div>
  );
}