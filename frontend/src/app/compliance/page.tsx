'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  UserCheck, 
  Globe, 
  Lock, 
  RefreshCcw,
  CheckCircle2,
  XCircle,
  FileText
} from 'lucide-react';

export default function CompliancePage() {
  const [kycStatus, setKycStatus] = useState('pending');
  const [isProcessing, setIsProcessing] = useState(false);
  const fromAddress = '0x1234...5678';
  const toAddress = '0xabcd...efgh';
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [simulationResult, setSimulationResult] = useState<null | 'success' | 'error'>(null);

  const handleKyc = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setKycStatus('verified');
      setIsProcessing(false);
    }, 2000);
  };

  const simulateTransfer = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setSimulationResult(isWhitelisted ? 'success' : 'error');
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <ShieldCheck className="text-emerald-500 fill-emerald-500/20" />
          Compliance Layer
        </h1>
        <p className="text-slate-400">Institutional-grade KYC/AML and ERC-3643 transfer restriction simulation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* KYC/AML Status */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-10 rounded-3xl bg-slate-950/40 border border-emerald-950/30 backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <UserCheck className="text-emerald-500" />
              Identity Verification
            </h2>
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
              kycStatus === 'verified' 
                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
            }`}>
              {kycStatus}
            </span>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Tier Level</span>
                <span className="text-white font-medium">Tier 2 Institutional</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Jurisdiction</span>
                <span className="text-white font-medium">European Union (DE)</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Expiry Date</span>
                <span className="text-white font-medium">Oct 12, 2027</span>
              </div>
            </div>

            <p className="text-sm text-slate-500 leading-relaxed">
              Your identity is verified via SD Covenant Compliance Engine. This status is required for holding and transferring UAT tokens.
            </p>

            {kycStatus === 'pending' ? (
              <button 
                onClick={handleKyc}
                disabled={isProcessing}
                className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? <RefreshCcw className="animate-spin" size={18} /> : 'Complete KYC Verification'}
              </button>
            ) : (
              <div className="flex gap-3">
                <button className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2">
                  <FileText size={18} /> Update Data
                </button>
                <button className="flex-1 py-3 rounded-xl border border-emerald-500/20 text-emerald-500 font-bold text-sm transition-all">
                  Export Passport
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Transfer Simulation */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-10 rounded-3xl bg-slate-950/40 border border-emerald-950/30 backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <Lock className="text-emerald-500" />
              Transfer Restrictions
            </h2>
            <div className="flex items-center gap-2 bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/20">
              <span className="text-[10px] font-bold text-emerald-500 uppercase">ERC-3643</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase">From</label>
                <input 
                  type="text" 
                  value={fromAddress}
                  disabled
                  className="w-full bg-slate-900/40 border border-slate-800 rounded-xl px-4 py-3 text-slate-500 text-xs font-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase">To</label>
                <input 
                  type="text" 
                  value={toAddress}
                  disabled
                  className="w-full bg-slate-900/40 border border-slate-800 rounded-xl px-4 py-3 text-slate-500 text-xs font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/30 border border-slate-800">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-white font-medium">Whitelist Recipient?</span>
                <span className="text-[10px] text-slate-500 uppercase">Simulation Toggle</span>
              </div>
              <button 
                onClick={() => setIsWhitelisted(!isWhitelisted)}
                className={`w-12 h-6 rounded-full transition-all relative ${isWhitelisted ? 'bg-emerald-500' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isWhitelisted ? 'left-7' : 'left-1'}`} />
              </button>
            </div>

            <button 
              onClick={simulateTransfer}
              disabled={isProcessing}
              className="w-full py-4 rounded-xl bg-white hover:bg-slate-200 text-black font-bold transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? <RefreshCcw className="animate-spin" size={18} /> : 'Simulate Transfer Request'}
            </button>

            {simulationResult && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-2xl flex flex-col items-center text-center gap-3 border ${
                  simulationResult === 'success' 
                    ? 'bg-emerald-500/10 border-emerald-500/20' 
                    : 'bg-red-500/10 border-red-500/20'
                }`}
              >
                {simulationResult === 'success' ? (
                  <>
                    <CheckCircle2 className="text-emerald-500" size={32} />
                    <div>
                      <h4 className="text-emerald-500 font-bold">Transfer Permitted</h4>
                      <p className="text-[11px] text-emerald-500/70 leading-relaxed mt-1">
                        Both sender and recipient are whitelisted. On-chain identity claim (ERC-734/735) is valid.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="text-red-500" size={32} />
                    <div>
                      <h4 className="text-red-500 font-bold">Transfer Blocked</h4>
                      <p className="text-[11px] text-red-500/70 leading-relaxed mt-1">
                        Recipient is not in the authorized whitelist. Transfer rejected by Identity Registry.
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Institutional Architecture */}
      <section className="p-10 rounded-3xl bg-slate-950/40 border border-emerald-950/30 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 text-emerald-500/5">
          <Globe size={160} />
        </div>
        <div className="relative z-10 max-w-2xl space-y-4">
          <h3 className="text-xl font-bold text-white">ERC-3643 Standard Integration</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            SD Covenant implements the ERC-3643 standard (formerly T-REX) for decentralized compliance. This ensures that only authorized participants can hold or trade UAT tokens, maintaining full regulatory compliance across multiple jurisdictions while operating on a public blockchain.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Identity Registry
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Claim Topics
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Trusted Issuers
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
