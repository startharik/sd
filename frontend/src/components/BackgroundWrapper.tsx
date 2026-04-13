'use client';

import dynamic from 'next/dynamic';

const Background3D = dynamic(() => import('./Background3D'), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-transparent z-0" />
});

export function BackgroundWrapper() {
  return <Background3D />;
}
