'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  History, 
  Calculator, 
  ArrowRight,
  RefreshCcw,
  CheckCircle2
} from 'lucide-react';

export default function RevenuePage() {
  const [noiInput, setNoiInput] = useState('1000000');
  const [isSimulating, setIsSimulating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setShowResult(true);
    }, 1500);
  };

  const payoutRatio = 0.30; // 30%
  const estimatedPayout = parseFloat(noiInput) * payoutRatio;

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white">Revenue Distribution</h1>
        <p className="text-zinc-400">Monitor and simulate Net Operating Income (NOI) distributions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payout Simulator */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 rounded-2xl bg-slate-950/40 border border-emerald-950/30 backdrop-blur-md"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <Calculator size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">Payout Simulator</h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Total Project NOI ($)</label>
              <input 
                type="number" 
                value={noiInput}
                onChange={(e) => setNoiInput(e.target.value)}
                className="w-full bg-slate-900/50 border border-emerald-950/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Enter NOI amount..."
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-900/30 border border-emerald-950/10 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Distribution Policy</span>
                <span className="text-emerald-500 font-bold">30.00%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Treasury Reserve</span>
                <span className="text-white font-medium">70.00%</span>
              </div>
              <div className="h-px bg-slate-800" />
              <div className="flex justify-between items-baseline">
                <span className="text-slate-400 font-medium">Estimated Holder Payout</span>
                <span className="text-2xl font-bold text-white">${estimatedPayout.toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={handleSimulate}
              disabled={isSimulating}
              className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-900 disabled:text-slate-400 text-black font-bold transition-all flex items-center justify-center gap-2"
            >
              {isSimulating ? (
                <>
                  <RefreshCcw className="animate-spin" size={18} /> Simulating...
                </>
              ) : (
                <>
                  Run Distribution Simulation <ArrowRight size={18} />
                </>
              )}
            </button>

            {showResult && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3"
              >
                <CheckCircle2 className="text-emerald-500" size={20} />
                <p className="text-sm text-emerald-200">Simulation successful. Yield would be distributed in USDC.</p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Distribution History */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 rounded-2xl bg-slate-950/40 border border-emerald-950/30 backdrop-blur-md"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <History size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">Distribution History</h2>
          </div>

          <div className="space-y-4">
            {[
              { date: 'Oct 15, 2026', amount: '$42,500', status: 'Completed', tx: '0x8f...3a21' },
              { date: 'Sep 15, 2026', amount: '$38,200', status: 'Completed', tx: '0x4c...9d10' },
              { date: 'Aug 15, 2026', amount: '$45,000', status: 'Completed', tx: '0x1a...ef45' },
              { date: 'Jul 15, 2026', amount: '$41,800', status: 'Completed', tx: '0x9d...7b82' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-900/20 border border-slate-800 hover:border-emerald-950/30 transition-colors">
                <div className="flex flex-col">
                  <span className="text-white font-medium">{item.amount}</span>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">{item.date}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold border border-emerald-500/20 uppercase">
                    {item.status}
                  </span>
                  <p className="text-[10px] text-slate-600 font-mono mt-1">{item.tx}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-3 text-sm text-slate-400 hover:text-emerald-400 transition-colors font-medium border border-slate-800 rounded-xl">
            Download Full Report (PDF)
          </button>
        </motion.div>
      </div>

      {/* Yield Info Card */}
      <section className="p-8 rounded-2xl bg-emerald-950/20 border border-emerald-500/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 text-emerald-500/5">
          <DollarSign size={160} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-xl font-bold text-white mb-2">Automated Yield Engine</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Distributions are triggered monthly based on certified NOI reports. Token holders receive their share in USDC directly to their registered wallets. All calculations are transparently recorded on the blockchain via the SD Covenant Revenue Engine.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Payout Asset</span>
              <span className="text-white font-bold flex items-center gap-1">
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-[8px]">S</div> USDC
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Frequency</span>
              <span className="text-white font-bold">Monthly</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Next Distribution</span>
              <span className="text-emerald-500 font-bold">Nov 15, 2026</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
