import React, { useEffect, useState } from 'react';
import { DiscoveryItem } from '../types';
import microscopeImg from '../assets/images/magical_microscope_1789879330372.jpg';
import { soundFx } from '../utils/audio';

interface MicroscopeScanningViewProps {
  item: DiscoveryItem;
  onScanComplete: () => void;
}

export const MicroscopeScanningView: React.FC<MicroscopeScanningViewProps> = ({
  item,
  onScanComplete,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Play sci-fi scanning sound
    soundFx.scan();

    // Progress bar animation to 100% over 1.5 seconds
    const interval = 25; // 25ms ticks
    const step = 100 / (1500 / interval);
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    // Complete scan after 1.5s
    const timeout = setTimeout(() => {
      onScanComplete();
    }, 1500);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [onScanComplete]);

  return (
    <div 
      id="microscope-scan-screen"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-in fade-in duration-300"
    >
      {/* Background radial glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center max-w-2xl w-full">
        {/* Title Indicator */}
        <div className="mb-4 bg-gradient-to-r from-blue-900/90 via-indigo-900/90 to-blue-900/90 border-2 border-cyan-400 px-6 py-2 rounded-full shadow-2xl flex items-center gap-3">
          <span className="flex h-4 w-4 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500"></span>
          </span>
          <span className="text-xl sm:text-2xl font-black text-cyan-300 tracking-wider uppercase">
            KÍNH HIỂN VI THẦN KỲ ĐANG HOẠT ĐỘNG
          </span>
        </div>

        {/* The Microscope & Item Inspection Chamber */}
        <div className="relative w-full flex flex-col items-center">
          {/* Circular Hologram Chamber */}
          <div className="relative w-72 sm:w-88 md:w-96 h-72 sm:h-88 md:h-96 rounded-full border-4 border-cyan-400 bg-gradient-to-b from-slate-900/90 via-blue-950/95 to-slate-900/90 shadow-[0_0_50px_rgba(6,182,212,0.6)] flex items-center justify-center overflow-hidden">
            {/* Holographic grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d415_1px,transparent_1px),linear-gradient(to_bottom,#06b6d415_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Cyan Scanning Laser Beam running top to bottom */}
            <div className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-80 animate-scan-line z-30 pointer-events-none flex items-center justify-center">
              <div className="w-full h-1 bg-white shadow-[0_0_15px_#fff]" />
            </div>

            {/* Target Reticle circle */}
            <div className="absolute inset-6 rounded-full border border-cyan-400/40 border-dashed animate-spin" style={{ animationDuration: '20s' }} />
            <div className="absolute inset-16 rounded-full border border-cyan-400/30" />

            {/* Item being scanned */}
            <div className="relative z-20 w-48 sm:w-56 h-48 sm:h-56 flex items-center justify-center transition-transform transform scale-110">
              <img
                src={item.imageSrc}
                alt={item.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Floating particles inside chamber */}
            <div className="absolute inset-0 bg-radial from-cyan-400/10 to-transparent pointer-events-none" />
          </div>

          {/* Item Name Tag */}
          <div className="mt-4 bg-slate-900/90 border-2 border-amber-400 text-amber-300 px-6 py-1.5 rounded-full font-black text-lg sm:text-xl tracking-wide shadow-lg uppercase">
            {item.name}
          </div>

          {/* Scanning Status & Progress */}
          <div className="mt-4 w-full max-w-md flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl sm:text-3xl font-black text-cyan-300 tracking-widest animate-pulse">
                ĐANG QUÉT...
              </span>
              <span className="text-cyan-400 font-mono font-bold text-lg">
                {Math.round(progress)}%
              </span>
            </div>

            {/* Progress bar container */}
            <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden border-2 border-cyan-500/50 p-0.5 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-teal-300 rounded-full transition-all duration-75 shadow-[0_0_12px_#38bdf8]"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <p className="mt-2 text-xs text-cyan-200/80 font-semibold tracking-wide">
              Đang phân tích cấu trúc vật phẩm qua Kính Hiển Vi Thần Kỳ...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
