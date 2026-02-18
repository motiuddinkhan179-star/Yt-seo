
import React from 'react';
import { useApp } from '../store';
import { AdConfiguration } from '../types';

interface AdSlotProps {
  type: AdConfiguration['slotType'];
}

const AdSlot: React.FC<AdSlotProps> = ({ type }) => {
  const { ads } = useApp();
  const ad = ads.find(a => a.slotType === type && a.isActive);

  if (!ad) return null;

  return (
    <div className="w-full my-4 p-2 bg-gray-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center min-h-[100px] border border-dashed border-gray-300 dark:border-zinc-700">
      <div className="text-center">
        <span className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-zinc-500 block mb-1">Sponsored - {ad.provider}</span>
        <div className="text-xs text-gray-500 italic">
          {ad.adCode ? 'Ad Active' : 'Placeholder Ad Slot'}
        </div>
      </div>
    </div>
  );
};

export default AdSlot;
