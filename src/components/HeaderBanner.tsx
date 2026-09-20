import React from 'react';
import { Volume2, Hand, Sparkles, Maximize, Minimize } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface HeaderBannerProps {
  onPlayIntro: () => void;
  isSpeaking: boolean;
  inspectedCount: number;
  totalCount: number;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
  onPlayIntro,
  isSpeaking,
  inspectedCount,
  totalCount,
  isFullscreen,
  onToggleFullscreen,
}) => {
  return (
    <div className="relative w-full z-20 flex flex-col items-center pt-1.5 sm:pt-2 px-2 sm:px-4 pointer-events-auto">
      {/* Top action bar: Intro audio + Fullscreen button on left, Inspection progress counter on right */}
      <div className="w-full flex items-center justify-between max-w-7xl mb-1 gap-2 flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-2">
          {/* Intro Speech Button */}
          <button
            id="btn-intro-speech"
            onClick={() => {
              soundFx.click();
              onPlayIntro();
            }}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-white shadow-lg transition-all transform hover:scale-105 active:scale-95 border-2 ${
              isSpeaking
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 border-yellow-200 ring-4 ring-yellow-400/50 animate-pulse'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 border-cyan-300 hover:from-blue-500 hover:to-indigo-500'
            }`}
            title="Bấm để nghe cô giáo giới thiệu nhiệm vụ"
          >
            <Volume2 className={`w-4 h-4 sm:w-5 sm:h-5 ${isSpeaking ? 'animate-bounce' : ''}`} />
            <span className="text-xs sm:text-sm md:text-base font-extrabold tracking-wide uppercase">
              {isSpeaking ? '🔊 ĐANG PHÁT LỜI GIỚI THIỆU...' : '🔊 LỜI GIỚI THIỆU'}
            </span>
          </button>

          {/* Fullscreen Toggle Button */}
          <button
            id="btn-toggle-fullscreen"
            onClick={() => {
              soundFx.click();
              onToggleFullscreen();
            }}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-black text-xs sm:text-sm bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white shadow-lg border-2 border-emerald-300 transition-all transform hover:scale-105 active:scale-95"
            title="Bấm để phóng to toàn màn hình máy chiếu hoặc thoát"
          >
            {isFullscreen ? (
              <>
                <Minimize className="w-4 h-4 text-emerald-200" />
                <span className="hidden xs:inline">THU NHỎ</span>
              </>
            ) : (
              <>
                <Maximize className="w-4 h-4 text-yellow-300" />
                <span className="hidden xs:inline">TOÀN MÀN HÌNH</span>
              </>
            )}
          </button>
        </div>

        {/* Progress badge */}
        <div 
          id="progress-badge"
          className="flex items-center gap-1.5 sm:gap-2 bg-amber-950/85 backdrop-blur border-2 border-amber-400 text-amber-100 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-md font-bold text-xs sm:text-sm md:text-base"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Khám phá:</span>
          <span className="text-amber-300 text-base sm:text-lg font-black">{inspectedCount}/{totalCount}</span>
          <span className="hidden sm:inline">vật phẩm</span>
        </div>
      </div>

      {/* Main Fantasy Wooden Banner */}
      <div className="relative flex flex-col items-center max-w-4xl w-full">
        {/* Decorative Top Blue Ribbon */}
        <div className="relative -mb-2.5 z-10">
          <div className="bg-gradient-to-r from-blue-700 via-sky-500 to-blue-700 text-white font-black text-[11px] sm:text-xs md:text-sm px-5 py-1 rounded-t-lg shadow-md uppercase tracking-wider border border-sky-300">
            CHẶNG 1
          </div>
        </div>

        {/* Wood Board */}
        <div className="relative w-full bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950 border-3 sm:border-4 border-amber-500 rounded-2xl sm:rounded-3xl py-2 px-3 sm:py-3 sm:px-4 md:px-6 shadow-2xl flex flex-col items-center text-center">
          {/* Wood Grain Texture accents */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-15 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          {/* Gold Star Shield on Top Right */}
          <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-3 md:-top-5 md:-right-4 w-9 h-9 sm:w-11 sm:h-11 md:w-13 md:h-13 bg-gradient-to-tr from-blue-700 to-sky-400 border-2 border-yellow-300 rounded-2xl shadow-xl flex items-center justify-center transform rotate-6 hover:rotate-12 transition-transform">
            <span className="text-xl sm:text-2xl md:text-3xl filter drop-shadow">⭐</span>
          </div>

          {/* Main Title */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-amber-300 text-shadow-gold tracking-wide leading-tight uppercase">
            NHẬN DIỆN &ldquo;KẸO LẠ&rdquo; BIẾN HÌNH
          </h1>

          {/* Subtitle Pill */}
          <div className="mt-1 sm:mt-1.5 inline-flex items-center gap-1.5 bg-blue-900/90 border border-sky-400/80 px-3 py-0.5 sm:py-1 rounded-full shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
            <p className="text-sky-100 font-bold text-[11px] sm:text-xs md:text-sm tracking-wide">
              Cùng Kính Hiển Vi Thần Kỳ khám phá những vật phẩm bất thường!
            </p>
          </div>
        </div>

        {/* Teacher Instruction Yellow Ribbon */}
        <div className="mt-1 sm:mt-1.5 inline-flex items-center gap-2 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 text-amber-950 font-extrabold text-[11px] sm:text-xs md:text-sm px-4 py-1 rounded-full shadow-lg border-2 border-amber-400 transform -translate-y-0.5">
          <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow">
            <Hand className="w-3 h-3 animate-bounce" />
          </div>
          <span>Giáo viên hãy lần lượt chọn từng vật phẩm để bắt đầu khám phá.</span>
        </div>
      </div>
    </div>
  );
};
