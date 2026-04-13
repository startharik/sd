'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCcw, 
  ShieldCheck, 
  Info,
  ArrowUpRight
} from 'lucide-react';

interface InvestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (amount: number) => void;
}

export function InvestModal({ isOpen, onClose, onSuccess }: InvestModalProps) {
  const [step, setStep] = useState<'input' | 'processing' | 'success'>('input');
  const [amount, setAmount] = useState('5000');
  const pricePerUat = 1.00;

  useEffect(() => {
    if (!isOpen) {
      // Reset state when closed
      setTimeout(() => {
        setStep('input');
        setAmount('5000');
      }, 300);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      onSuccess(parseFloat(amount));
    }, 2000);
  };

  const uatReceived = parseFloat(amount) / pricePerUat;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#020617]/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-slate-950 border border-emerald-950/50 rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/10"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-900/50 text-slate-400 hover:text-white transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="p-8">
              {step === 'input' && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-white">Invest in SD Covenant – Buy UAT</h2>
                    <p className="text-emerald-500 text-xs font-bold uppercase tracking-widest">
                      Regulated RWA + ESG + Revenue-Distribution Protocol
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Current Price</span>
                    <span className="text-white font-bold">${pricePerUat.toFixed(2)} <span className="text-slate-500 text-xs font-medium">per UAT</span></span>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-400">Investment Amount (USD)</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</div>
                      <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-slate-900/50 border border-emerald-950/30 rounded-2xl pl-8 pr-4 py-4 text-white text-xl font-bold focus:outline-none focus:border-emerald-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">You will receive</span>
                      <span className="text-emerald-500 text-xl font-bold">{uatReceived.toLocaleString()} UAT</span>
                    </div>
                    
                    <div className="h-px bg-slate-800" />
                    
                    <div className="flex items-start gap-3">
                      <Info className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                      <p className="text-xs text-slate-400 leading-relaxed">
                        25–30% NOI yield from physical assets (solar + community revenue) distributed monthly in USDC.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-emerald-500 bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/10">
                      <ShieldCheck size={16} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">KYC/AML Verified – Whitelisted Investor</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleConfirm}
                    className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg transition-all flex items-center justify-center gap-2 group shadow-lg shadow-emerald-500/20"
                  >
                    Confirm Purchase <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}

              {step === 'processing' && (
                <div className="py-12 flex flex-col items-center justify-center space-y-6 text-center">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-emerald-500/20" />
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">Processing Transaction</h3>
                    <p className="text-slate-400 text-sm">Deploying to Polygon L2 Network...</p>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">TX: 0x8f2...a321</span>
                  </div>
                </div>
              )}

              {step === 'success' && (
                <div className="py-6 flex flex-col items-center justify-center space-y-8 text-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/40"
                  >
                    <CheckCircle2 size={40} className="text-black" />
                  </motion.div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Investment Confirmed!</h3>
                    <p className="text-slate-400 text-sm">
                      <span className="text-emerald-500 font-bold">{parseFloat(amount).toLocaleString()} UAT</span> added to your wallet
                    </p>
                  </div>

                  <div className="w-full p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center gap-2">
                    <RefreshCcw className="text-emerald-500" size={16} />
                    <span className="text-sm text-emerald-200 font-medium">Expected next yield: USDC in 12 days</span>
                  </div>

                  <div className="w-full flex flex-col gap-3">
                    <button 
                      onClick={onClose}
                      className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold transition-all flex items-center justify-center gap-2 group"
                    >
                      View Portfolio <ArrowUpRight size={18} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                    <button 
                      onClick={onClose}
                      className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
