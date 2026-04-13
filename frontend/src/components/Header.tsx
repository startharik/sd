'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Portfolio', href: '/' },
    { name: 'Revenue', href: '/revenue' },
    { name: 'RWA Oracle', href: '/oracle' },
    { name: 'ESG Impact', href: '/esg' },
    { name: 'Compliance', href: '/compliance' },
    { name: 'Governance', href: '/governance' },
  ];

  return (
    <header className="border-b border-emerald-950/50 bg-[#020617]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-black group-hover:bg-emerald-400 transition-colors">
              SD
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              SD Covenant <span className="text-emerald-500">Community Center</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-emerald-400",
                  pathname === item.href ? "text-emerald-400" : "text-slate-400"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-500 border border-emerald-500/30 rounded bg-emerald-500/5">
              Demo Mode
            </span>
          </div>
          <ConnectButton 
            accountStatus="address"
            showBalance={false}
            chainStatus="icon"
          />
        </div>
      </div>
    </header>
  );
}
