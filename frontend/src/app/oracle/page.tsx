'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Leaf, 
  DollarSign, 
  Clock, 
  RefreshCcw,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const mockData = [
  { time: '12:00', kwh: 450, carbon: 120, revenue: 1200 },
  { time: '12:15', kwh: 480, carbon: 125, revenue: 1250 },
  { time: '12:30', kwh: 520, carbon: 130, revenue: 1300 },
  { time: '12:45', kwh: 510, carbon: 128, revenue: 1280 },
  { time: '13:00', kwh: 550, carbon: 135, revenue: 1350 },
  { time: '13:15', kwh: 580, carbon: 140, revenue: 1400 },
  { time: '13:30', kwh: 610, carbon: 145, revenue: 1450 },
];

export default function OraclePage() {
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString());
  const [isUpdating, setIsUpdating] = useState(false);

  const handleManualUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setLastUpdate(new Date().toLocaleTimeString());
      setIsUpdating(false);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Zap className="text-emerald-500 fill-emerald-500/20" />
            RWA Oracle Layer
          </h1>
          <p className="text-zinc-400">Live data feeds from physical assets, verified on-chain via SD Covenant Oracles.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-950/50 border border-emerald-950/30 rounded-2xl p-4 backdrop-blur-md">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Last Oracle Sync</span>
            <span className="text-white font-mono text-sm">{lastUpdate}</span>
          </div>
          <button 
            onClick={handleManualUpdate}
            disabled={isUpdating}
            className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-black transition-all group"
          >
            <RefreshCcw className={isUpdating ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"} size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          { label: 'Real Estate Portfolio', value: '584.2', unit: 'kWh', icon: Zap, color: 'text-emerald-500', trend: '+5.2%' },
          { label: 'Carbon Offset', value: '142.8', unit: 'Tonnes', icon: Leaf, color: 'text-emerald-400', trend: '+2.1%' },
          { label: 'Real-Time Revenue', value: '1,420.50', unit: 'USD', icon: DollarSign, color: 'text-white', trend: '+4.8%' },
        ].map((metric, i) => (
          <motion.div 
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-2xl bg-slate-950/40 border border-emerald-950/30 backdrop-blur-md group hover:border-emerald-500/30 transition-all"
          >
            <div className="flex items-start justify-between mb-6">
              <div className={`p-3 rounded-xl bg-emerald-500/10 ${metric.color}`}>
                <metric.icon size={24} />
              </div>
              <span className="text-emerald-500 text-xs font-bold flex items-center gap-1 bg-emerald-500/5 px-2 py-1 rounded border border-emerald-500/10">
                {metric.trend}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">{metric.label}</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">{metric.value}</span>
              <span className="text-slate-500 font-medium text-sm uppercase">{metric.unit}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Real-time Graph */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-2xl bg-slate-950/40 border border-emerald-950/30 backdrop-blur-md lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="text-emerald-500" size={20} />
              Live Performance Feed
            </h2>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-400">Real Estate (sqft)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-slate-400">Carbon (t)</span>
              </div>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="#64748b" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', border: '1px solid #064e3b', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="kwh" stroke="#10b981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="carbon" stroke="#34d399" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Oracle Verification */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 rounded-2xl bg-slate-950/40 border border-emerald-950/30 backdrop-blur-md"
        >
          <h2 className="text-xl font-bold text-white mb-6">Oracle Verification</h2>
          <div className="space-y-6">
            {[
              { label: 'Data Source', value: 'IoT Sensor Network (SD Covenant)', status: 'Verified', icon: CheckCircle2 },
              { label: 'Oracle Node', value: 'Chainlink DON (SD Covenant Adaptor)', status: 'Verified', icon: CheckCircle2 },
              { label: 'Asset ID', value: 'RWA-SOL-SHJ-002', status: 'On-Chain', icon: CheckCircle2 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-900/30 border border-slate-800">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{item.label}</span>
                  <span className="text-sm text-white font-medium">{item.value}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-500 bg-emerald-500/5 px-2 py-1 rounded-lg border border-emerald-500/10">
                  <item.icon size={14} />
                  <span className="text-[10px] font-bold uppercase">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Technical Summary */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 rounded-2xl bg-slate-950/40 border border-emerald-950/30 backdrop-blur-md flex flex-col justify-between"
        >
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Technical Summary</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              SD Covenant uses a hybrid oracle architecture. Asset data is aggregated off-chain, signed by verified nodes, and pushed to the Treasury contract every 15 minutes. This ensures NOI distributions are backed by real-world performance data.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/10 flex items-start gap-3">
            <AlertTriangle className="text-yellow-500 shrink-0" size={18} />
            <p className="text-[11px] text-yellow-500/80 leading-relaxed font-medium">
              Data latency is currently 120ms. If deviation exceeds 5% from historical mean, automated circuit breakers will trigger manual audit.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
