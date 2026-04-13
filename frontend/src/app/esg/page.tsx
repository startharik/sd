'use client';

import { motion } from 'framer-motion';
import { 
  Leaf, 
  Wind, 
  Droplets, 
  Sun, 
  Globe, 
  BarChart3, 
  CheckCircle2,
  Trophy,
  ArrowUpRight
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip 
} from 'recharts';

const pieData = [
  { name: 'Renewable Energy', value: 45, color: '#10b981' },
  { name: 'Carbon Removal', value: 25, color: '#34d399' },
  { name: 'Clean Water', value: 20, color: '#059669' },
  { name: 'Social Housing', value: 10, color: '#064e3b' },
];

export default function ESGPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Leaf className="text-emerald-500 fill-emerald-500/20" />
          ESG Impact Dashboard
        </h1>
        <p className="text-slate-400">Track the environmental and social impact of your institutional portfolio.</p>
      </div>

      {/* Personalized Impact Summary */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 p-10 rounded-3xl bg-emerald-950/10 border border-emerald-500/10 backdrop-blur-md relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-10 text-emerald-500/5 group-hover:text-emerald-500/10 transition-colors">
            <Trophy size={200} />
          </div>
          
          <div className="relative z-10 max-w-xl">
            <h2 className="text-emerald-500 text-sm font-bold uppercase tracking-widest mb-6">Personalized Impact</h2>
            <p className="text-3xl font-bold text-white mb-4 leading-tight">
              Your investments have offset <span className="text-emerald-500">12,450 tonnes</span> of CO2 this year.
            </p>
            <p className="text-slate-400 mb-8 leading-relaxed">
              That's equivalent to planting <span className="text-white font-medium">56,200 trees</span> or taking <span className="text-white font-medium">2,700 cars</span> off the road. Your ESG score has increased by <span className="text-emerald-500 font-bold">+12 pts</span> since last month.
            </p>
            
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: 'CO2 Offset', value: '12.4k', unit: 't' },
                { label: 'Clean Energy', value: '840', unit: 'MWh' },
                { label: 'Jobs Created', value: '154', unit: 'FTE' },
              ].map((item) => (
                <div key={item.label} className="p-4 rounded-2xl bg-slate-900/40 border border-emerald-950/10">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">{item.label}</p>
                  <p className="text-lg font-bold text-white">{item.value}<span className="text-xs text-slate-500 font-normal ml-0.5">{item.unit}</span></p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-10 rounded-3xl bg-slate-950/40 border border-emerald-950/30 backdrop-blur-md flex flex-col items-center justify-center text-center"
        >
          <div className="w-full h-[220px] mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', border: '1px solid #064e3b', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-center gap-2">
            <BarChart3 size={20} className="text-emerald-500" />
            Portfolio SDGs
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {[7, 11, 13, 15].map((sdg) => (
              <div key={sdg} className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase">
                SDG {sdg}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Impact Indicators */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Real Estate Portfolio', value: '45.2', unit: 'GWh', icon: Sun, color: 'text-yellow-500' },
          { label: 'Wind Power', value: '28.4', unit: 'GWh', icon: Wind, color: 'text-blue-400' },
          { label: 'Water Saved', value: '1.2', unit: 'ML', icon: Droplets, color: 'text-cyan-500' },
          { label: 'Land Restored', value: '420', unit: 'Ha', icon: Globe, color: 'text-emerald-500' },
        ].map((item, i) => (
          <motion.div 
            key={item.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-2xl bg-slate-950/30 border border-emerald-950/20 hover:border-emerald-500/30 transition-all group"
          >
            <div className={`p-3 rounded-xl bg-slate-900/40 mb-6 ${item.color} group-hover:bg-emerald-500 group-hover:text-black transition-all inline-block`}>
              <item.icon size={24} />
            </div>
            <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">{item.label}</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{item.value}</span>
              <span className="text-slate-500 text-xs uppercase">{item.unit}</span>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ESG Certification */}
      <section className="p-10 rounded-3xl bg-slate-950/40 border border-emerald-950/30 backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl font-bold text-white">Verified Impact Certificates</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every megawatt generated and every tonne offset is certified by third-party auditors and recorded as an immutable NFT proof on the SD Covenant Impact Registry. You can export these certificates for your institutional reporting.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm transition-all flex items-center gap-2">
                Download ESG Report <ArrowUpRight size={18} />
              </button>
              <button className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-all">
                View On-Chain Registry
              </button>
            </div>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-4 w-full">
            {[
              { name: 'ISO 14001', org: 'SGS Global', date: '2026' },
              { name: 'VCS Carbon', org: 'Verra', date: '2026' },
              { name: 'Gold Standard', org: 'GS Foundation', date: '2025' },
              { name: 'B Corp', org: 'B Lab', date: '2026' },
            ].map((cert) => (
              <div key={cert.name} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
                <div>
                  <p className="text-white text-xs font-bold">{cert.name}</p>
                  <p className="text-[10px] text-slate-500 uppercase">{cert.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
