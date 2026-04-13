'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  Users, 
  ArrowRight,
  BarChart3,
  TrendingUp,
  FileText,
  Gavel,
  RefreshCcw
} from 'lucide-react';

export default function GovernancePage() {
  const [votedId, setVotedId] = useState<number | null>(null);
  const [isVoting, setIsVoting] = useState(false);

  const proposals = [
    {
      id: 1,
      title: 'UAT-2026-004: Expand SD Covenant Assets',
      description: 'Allocate $5M from the Treasury to double the capacity of the SD Covenant project. Expected increase in NOI: +15% per annum.',
      status: 'Active',
      votesFor: 12450000,
      votesAgainst: 1200000,
      endsIn: '2d 14h',
      creator: 'SD Foundation'
    },
    {
      id: 2,
      title: 'UAT-2026-003: Carbon Credit Liquidity Pool',
      description: 'Establish a dedicated liquidity pool for SD Covenant Carbon Credits on Uniswap v3 with initial seed of 100k Tonnes.',
      status: 'Passed',
      votesFor: 25000000,
      votesAgainst: 500000,
      endsIn: 'Closed',
      creator: 'Institutional LP'
    }
  ];

  const handleVote = (id: number) => {
    setIsVoting(true);
    setTimeout(() => {
      setVotedId(id);
      setIsVoting(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Gavel className="text-emerald-500 fill-emerald-500/20" />
            Governance Preview
          </h1>
          <p className="text-slate-400">Institutional DAO for asset allocation and treasury management.</p>
        </div>
        
        <div className="flex items-center gap-8 p-6 rounded-2xl bg-slate-950/50 border border-emerald-950/30 backdrop-blur-md">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Your Voting Power</span>
            <span className="text-white font-bold text-lg">1,240,500 UAT</span>
          </div>
          <div className="h-10 w-px bg-slate-800" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Active Proposals</span>
            <span className="text-emerald-500 font-bold text-lg">1</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Proposal List */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <FileText className="text-emerald-500" size={20} />
            Active & Recent Proposals
          </h2>
          
          {proposals.map((proposal, i) => (
            <motion.div 
              key={proposal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-slate-950/40 border border-emerald-950/30 backdrop-blur-md hover:border-emerald-500/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                    proposal.status === 'Active' 
                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                      : 'bg-slate-500/10 text-slate-500 border-slate-500/20'
                  }`}>
                    {proposal.status}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">
                    {proposal.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Proposed by {proposal.creator}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1 font-medium">
                    <Clock size={14} /> Ends in {proposal.endsIn}
                  </div>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                {proposal.description}
              </p>

              <div className="space-y-4 mb-8">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase">
                    <span className="text-emerald-500">For</span>
                    <span className="text-white">{(proposal.votesFor / 1000000).toFixed(1)}M UAT ({(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst) * 100).toFixed(1)}%)</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst) * 100)}%` }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase">
                    <span className="text-red-500">Against</span>
                    <span className="text-white">{(proposal.votesAgainst / 1000000).toFixed(1)}M UAT ({(proposal.votesAgainst / (proposal.votesFor + proposal.votesAgainst) * 100).toFixed(1)}%)</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500" style={{ width: `${(proposal.votesAgainst / (proposal.votesFor + proposal.votesAgainst) * 100)}%` }} />
                  </div>
                </div>
              </div>

              {proposal.status === 'Active' && (
                <div className="flex gap-4">
                  {votedId === proposal.id ? (
                    <div className="w-full py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-bold flex items-center justify-center gap-2">
                      <CheckCircle2 size={18} /> You voted FOR
                    </div>
                  ) : (
                    <>
                      <button 
                        onClick={() => handleVote(proposal.id)}
                        disabled={isVoting}
                        className="flex-1 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold transition-all flex items-center justify-center gap-2"
                      >
                        {isVoting ? <RefreshCcw className="animate-spin" size={18} /> : 'Vote FOR'}
                      </button>
                      <button 
                        disabled={isVoting}
                        className="flex-1 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all"
                      >
                        Vote AGAINST
                      </button>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Governance Stats */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="text-emerald-500" size={20} />
            Governance Stats
          </h2>
          
          <div className="p-8 rounded-3xl bg-slate-950/40 border border-emerald-950/30 backdrop-blur-md space-y-8">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">DAO Health</h3>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">450</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Active Voters</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">74.2%</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Quorum Participation</p>
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-800" />

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Recent Activity</h3>
              {[
                { action: 'Proposal #004 created', time: '12h ago' },
                { action: 'Treasury payout $42k', time: '2d ago' },
                { action: 'New auditor assigned', time: '5d ago' },
              ].map((activity, i) => (
                <div key={i} className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">{activity.action}</span>
                  <span className="text-slate-600 font-mono">{activity.time}</span>
                </div>
              ))}
            </div>

            <button className="w-full py-3 rounded-xl border border-emerald-500/20 text-emerald-500 font-bold text-sm hover:bg-emerald-500/5 transition-all flex items-center justify-center gap-2">
              Learn More About SD DAO <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
