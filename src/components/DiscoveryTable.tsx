import React from 'react';
import { DiscoveryItem } from '../types';
import microscopeImg from '../assets/images/magical_microscope_1789879330372.jpg';
import { CheckCircle2, AlertTriangle, Search, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface DiscoveryTableProps {
  items: DiscoveryItem[];
  inspectedIds: string[];
  onSelectItem: (item: DiscoveryItem) => void;
  disabled?: boolean;
}

export const DiscoveryTable: React.FC<DiscoveryTableProps> = ({
  items,
  inspectedIds,
  onSelectItem,
  disabled = false,
}) => {
  return (
    <div className="relative w-full max-w-7xl mx-auto flex items-end justify-center px-2 pb-2 select-none z-10">
      {/* The Big 3D Discovery Table Wrapper */}
      <div className="relative w-full flex flex-col items-center">
        {/* Table Top Surface containing Items & Microscope */}
        <div className="relative w-full bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 border-t-8 border-x-8 border-amber-500 rounded-t-3xl shadow-2xl pt-6 pb-6 px-4 md:px-8">
          {/* Surface shine & wood grain */}
          <div className="absolute inset-0 rounded-t-3xl bg-[linear-gradient(to_bottom,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />

          {/* Row of Items + Microscope */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-3 items-end justify-items-center">
            {/* The 5 Discovery Items */}
            {items.map((item, idx) => {
              const isInspected = inspectedIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  id={`item-card-${item.id}`}
                  onClick={() => {
                    if (disabled) return;
                    soundFx.click();
                    onSelectItem(item);
                  }}
                  className={`group relative flex flex-col items-center cursor-pointer transition-all duration-300 ${
                    disabled ? 'opacity-70 pointer-events-none' : 'hover:-translate-y-3'
                  }`}
                  title={`Bấm để đưa ${item.name} vào Kính Hiển Vi Thần Kỳ`}
                >
                  {/* Floating inspection status badge if inspected */}
                  {isInspected && (
                    <div className="absolute -top-3 z-30 bg-emerald-500 text-white font-black text-[11px] sm:text-xs px-2.5 py-0.5 rounded-full shadow-lg border border-emerald-200 flex items-center gap-1 animate-bounce">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Đã kiểm tra</span>
                    </div>
                  )}

                  {/* 3D Item Pedestal */}
                  <div className="relative flex flex-col items-center justify-end w-28 sm:w-32 md:w-36 h-32 sm:h-36 md:h-40">
                    {/* Item Image with hover pop */}
                    <div className="relative z-20 w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <img
                        src={item.imageSrc}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Glowing Blue Pedestal Disk at Base */}
                    <div className="absolute bottom-0 w-24 sm:w-28 md:w-32 h-6 sm:h-7 bg-gradient-to-r from-sky-400 via-blue-500 to-sky-400 rounded-full border-2 border-cyan-200 pedestal-glow shadow-lg flex items-center justify-center transform -rotate-x-12">
                      <div className="w-full h-full rounded-full bg-cyan-300/30 blur-xs" />
                    </div>
                  </div>

                  {/* Blue Pill Name Label */}
                  <div className="mt-2 w-full flex justify-center">
                    <button
                      id={`btn-select-${item.id}`}
                      className="w-full max-w-[140px] sm:max-w-[150px] bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-extrabold text-xs sm:text-sm py-1.5 px-2 rounded-full shadow-lg border-2 border-sky-300 text-center uppercase tracking-wide transition-all transform group-hover:scale-105 group-hover:ring-4 group-hover:ring-cyan-400/50 flex items-center justify-center gap-1"
                    >
                      <Search className="w-3 h-3 text-sky-200 shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </button>
                  </div>
                </div>
              );
            })}

            {/* 6th Slot: The Magical Microscope Display on Table */}
            <div className="relative flex flex-col items-center col-span-2 sm:col-span-1 lg:col-span-1">
              {/* Mossy Tree Stump Pedestal */}
              <div className="relative flex flex-col items-center w-32 sm:w-36 md:w-40">
                {/* Microscope Image */}
                <div className="relative z-20 w-28 sm:w-32 md:w-36 h-28 sm:h-32 md:h-36 flex items-center justify-center animate-gentle-float">
                  <img
                    src={microscopeImg}
                    alt="Kính Hiển Vi Thần Kỳ"
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_12px_14px_rgba(0,0,0,0.6)]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Holographic Cyan Glow Aura */}
                  <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl -z-10 animate-pulse" />
                </div>

                {/* Base Stump Wood & Flowers */}
                <div className="relative -mt-3 w-28 sm:w-32 h-8 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 rounded-full border-2 border-amber-600 shadow-xl flex items-center justify-center">
                  <div className="absolute -top-1.5 inset-x-2 h-3 bg-emerald-600/70 rounded-full blur-[1px]" />
                </div>

                {/* Microscope Wooden Plaque */}
                <div className="mt-1.5 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 border-2 border-yellow-400 rounded-xl px-2.5 py-1 shadow-lg text-center flex items-center gap-1">
                  <span className="text-yellow-400 text-xs">⭐</span>
                  <span className="text-yellow-300 font-black text-[11px] sm:text-xs uppercase tracking-wider text-shadow-gold">
                    KÍNH HIỂN VI THẦN KỲ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Front Face & Blue Royal Drape with Golden Star */}
        <div className="relative w-full h-16 sm:h-20 bg-gradient-to-b from-amber-900 via-amber-950 to-stone-950 border-b-8 border-x-8 border-amber-800 shadow-2xl flex items-start justify-center">
          {/* Wood Planks Divider Lines */}
          <div className="absolute inset-x-0 top-0 h-2 bg-amber-950/80 border-b border-amber-700/50" />
          
          {/* Blue Decorative Cloth Drape with Gold Star */}
          <div className="relative -mt-1 w-44 sm:w-56 md:w-64 h-14 sm:h-16 bg-gradient-to-b from-blue-700 via-blue-800 to-indigo-950 border-x-4 border-b-4 border-yellow-400 rounded-b-2xl shadow-xl flex items-center justify-center">
            <div className="text-2xl sm:text-3xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] animate-pulse">
              ⭐
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
