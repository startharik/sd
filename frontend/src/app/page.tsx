'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Leaf, 
  ShieldCheck, 
  BarChart3, 
  ArrowUpRight, 
  Wallet,
  Globe,
  CheckCircle2,
  X
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { InvestModal } from '@/components/InvestModal';

const mockChartData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 4500 },
  { name: 'Mar', value: 4200 },
  { name: 'Apr', value: 4800 },
  { name: 'May', value: 5200 },
  { name: 'Jun', value: 5100 },
  { name: 'Jul', value: 5900 },
];

export default function Dashboard() {
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false);
  const [portfolioValue, setPortfolioValue] = useState(1240500);
  const [showToast, setShowToast] = useState(false);
  const [lastInvestment, setLastInvestment] = useState(0);

  const handleInvestSuccess = (amount: number) => {
    setLastInvestment(amount);
    // Add small delay to match modal closing animation
    setTimeout(() => {
      setPortfolioValue(prev => prev + amount);
      setShowToast(true);
      // Auto hide toast
      setTimeout(() => setShowToast(false), 5000);
    }, 500);
  };

  return (
    <div className="space-y-10">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[110] w-full max-w-sm"
          >
            <div className="mx-4 p-4 rounded-2xl bg-emerald-500 text-black shadow-2xl shadow-emerald-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} className="shrink-0" />
                <div className="flex flex-col">
                  <span className="font-bold text-sm">Transaction Successful</span>
                  <span className="text-[10px] font-medium opacity-80 uppercase tracking-widest font-mono">Polygon L2 Testnet Verified</span>
                </div>
              </div>
              <button onClick={() => setShowToast(false)} className="p-1 hover:bg-black/10 rounded-lg transition-colors">
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero / Portfolio Summary */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 p-8 rounded-2xl bg-slate-950/40 border border-emerald-950/30 backdrop-blur-md relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 text-emerald-500/5 group-hover:text-emerald-500/10 transition-colors">
            <Globe size={120} />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-slate-400 text-sm font-medium mb-1 uppercase tracking-wider">Total Portfolio Value</h2>
            <div className="flex items-baseline gap-3 mb-6">
              <motion.span 
                key={portfolioValue}
                initial={{ opacity: 0.5, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-4xl font-bold text-white"
              >
                ${portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </motion.span>
              <span className="text-emerald-500 text-sm font-bold flex items-center gap-1">
                <TrendingUp size={16} /> +12.5%
              </span>
            </div>
            
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid #064e3b', borderRadius: '12px' }}
                    itemStyle={{ color: '#10b981' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-8 rounded-2xl bg-slate-950/40 border border-emerald-950/30 backdrop-blur-md flex flex-col justify-between"
        >
          <div>
            <h2 className="text-slate-400 text-sm font-medium mb-6 uppercase tracking-wider">Asset Allocation</h2>
            <div className="space-y-4">
              {[
                { label: 'SD Covenant', value: '45%', color: 'bg-emerald-500' },
                { label: 'Carbon Credits', value: '25%', color: 'bg-emerald-400' },
                { label: 'Real Estate', value: '20%', color: 'bg-emerald-600' },
                { label: 'Treasury', value: '10%', color: 'bg-slate-800' },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="text-white font-medium">{item.value}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full`} style={{ width: item.value }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => setIsInvestModalOpen(true)}
            className="w-full mt-8 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
          >
            Invest Now <ArrowUpRight size={18} />
          </button>
        </motion.div>
      </section>

      {/* Key Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Current APY', value: '8.4%', icon: TrendingUp, detail: 'Fixed + Performance' },
          { label: 'ESG Score', value: '94/100', icon: Leaf, detail: 'Top 5% of Sector' },
          { label: 'Compliance', value: 'KYC Verified', icon: ShieldCheck, detail: 'Tier 2 Institutional' },
          { label: 'Total Yield', value: '$84,200', icon: Wallet, detail: 'Claimable: $2,400' },
        ].map((metric, i) => (
          <motion.div 
            key={metric.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl bg-slate-950/30 border border-emerald-950/20 hover:border-emerald-500/30 transition-colors group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                <metric.icon size={20} />
              </div>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">Live</span>
            </div>
            <h3 className="text-slate-400 text-xs mb-1 uppercase tracking-wider">{metric.label}</h3>
            <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
            <p className="text-slate-600 text-[10px]">{metric.detail}</p>
          </motion.div>
        ))}
      </section>

      {/* Project Highlights */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="text-emerald-500" size={24} />
            Active RWA Projects
          </h2>
          <button className="text-sm text-emerald-500 hover:text-emerald-400 transition-colors font-medium">View All</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden bg-slate-950/40 border border-emerald-950/30 group cursor-pointer backdrop-blur-md">
            <div className="h-48 bg-[url('/rwa1.jpg')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500" />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">SD Covenant</h3>
                  <p className="text-sm text-slate-400">Sharjah Development • Clean Energy</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold border border-emerald-500/20">Active</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-xl bg-slate-900/40">
                  <p className="text-[10px] text-slate-500 uppercase mb-1">Yield</p>
                  <p className="text-sm font-bold text-emerald-500">9.2%</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/40">
                  <p className="text-[10px] text-slate-500 uppercase mb-1">Target</p>
                  <p className="text-sm font-bold text-white">$25M</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/40">
                  <p className="text-[10px] text-slate-500 uppercase mb-1">Carbon</p>
                  <p className="text-sm font-bold text-white">12k Ton</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden bg-slate-950/40 border border-emerald-950/30 group cursor-pointer backdrop-blur-md opacity-80 hover:opacity-100 transition-opacity">
            <div className="h-48 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500" />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">Amazon Reforest V</h3>
                  <p className="text-sm text-slate-400">Brazil • Conservation</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold border border-blue-500/20">Upcoming</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-xl bg-slate-900/40">
                  <p className="text-[10px] text-slate-500 uppercase mb-1">Yield</p>
                  <p className="text-sm font-bold text-emerald-500">7.5%</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/40">
                  <p className="text-[10px] text-slate-500 uppercase mb-1">Target</p>
                  <p className="text-sm font-bold text-white">$12M</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/40">
                  <p className="text-[10px] text-slate-500 uppercase mb-1">Carbon</p>
                  <p className="text-sm font-bold text-white">45k Ton</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Invest Modal */}
      <InvestModal 
        isOpen={isInvestModalOpen} 
        onClose={() => setIsInvestModalOpen(false)} 
        onSuccess={handleInvestSuccess}
      />
    </div>
  );
}
