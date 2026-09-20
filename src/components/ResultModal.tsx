import React, { useEffect, useState } from 'react';
import { DiscoveryItem } from '../types';
import { soundFx, speakVietnamese, stopSpeech } from '../utils/audio';
import monsterImg from '../assets/images/warning_monster_1789879344413.jpg';
import { AlertTriangle, CheckCircle2, Volume2, ArrowLeft, ShieldAlert, Sparkles } from 'lucide-react';

interface ResultModalProps {
  item: DiscoveryItem;
  onBackToTable: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  item,
  onBackToTable,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isWarning = item.status === 'warning';

  const handleSpeak = () => {
    setIsSpeaking(true);
    speakVietnamese(item.narrationText, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
    });
  };

  useEffect(() => {
    // Play appropriate sound effect
    if (isWarning) {
      soundFx.warning();
    } else {
      soundFx.tingTing();
    }

    // Auto-read explanation for the classroom
    handleSpeak();

    return () => {
      stopSpeech();
    };
  }, [item]);

  return (
    <div
      id="result-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in zoom-in-95 duration-300"
    >
      {/* Dynamic Aura background based on status */}
      <div
        className={`absolute inset-0 pointer-events-none transition-colors duration-700 ${
          isWarning
            ? 'bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.25),transparent_70%)]'
            : 'bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.25),transparent_70%)]'
        }`}
      />

      {/* Main Result Card */}
      <div
        className={`relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border-4 flex flex-col items-center text-center transition-all ${
          isWarning
            ? 'bg-gradient-to-b from-slate-900 via-rose-950/90 to-slate-900 border-rose-500 shadow-[0_0_50px_rgba(244,63,94,0.4)]'
            : 'bg-gradient-to-b from-slate-900 via-emerald-950/90 to-slate-900 border-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.4)]'
        }`}
      >
        {/* Top Badges Row */}
        <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-4">
          {/* Simulation Disclaimer Badge (MANDATORY REQUIREMENT) */}
          <div className="bg-amber-400 text-amber-950 font-black text-xs sm:text-sm px-3.5 py-1 rounded-full shadow border-2 border-amber-200 uppercase tracking-wide flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-900" />
            <span>TÌNH HUỐNG MÔ PHỎNG</span>
          </div>

          {/* Educational notice */}
          <div className="text-slate-300 text-xs sm:text-sm font-bold bg-slate-800/80 px-3 py-1 rounded-full border border-slate-600">
            ĐÂY LÀ TÌNH HUỐNG MÔ PHỎNG TRONG TRÒ CHƠI
          </div>
        </div>

        {/* Main Status Header */}
        <div className="mb-4">
          {isWarning ? (
            <div className="inline-flex items-center gap-3 bg-red-600 text-white px-6 sm:px-8 py-2 sm:py-2.5 rounded-full shadow-xl border-2 border-red-300 animate-pulse">
              <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-300" />
              <span className="text-2xl sm:text-3xl md:text-4xl font-black tracking-wider uppercase">
                ⚠ CẢNH BÁO
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-3 bg-emerald-600 text-white px-6 sm:px-8 py-2 sm:py-2.5 rounded-full shadow-xl border-2 border-emerald-300">
              <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-200" />
              <span className="text-2xl sm:text-3xl md:text-4xl font-black tracking-wider uppercase">
                ✓ AN TOÀN
              </span>
            </div>
          )}
        </div>

        {/* Center Display: Item and Microscope Viewfinder */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center my-2 max-w-3xl">
          {/* Left Column: The Inspected Item */}
          <div className="flex flex-col items-center bg-slate-800/60 p-4 rounded-2xl border border-slate-700 shadow-inner">
            <div className="w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
              <img
                src={item.imageSrc}
                alt={item.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-2 text-lg sm:text-xl font-extrabold text-white tracking-wide uppercase">
              {item.name}
            </div>
          </div>

          {/* Right Column: View Inside Microscope */}
          <div className="flex flex-col items-center bg-slate-800/60 p-4 rounded-2xl border border-slate-700 shadow-inner">
            <div className="text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
              HÌNH ẢNH DƯỚI KÍNH HIỂN VI:
            </div>

            {/* Viewfinder Circle */}
            <div
              className={`relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 overflow-hidden flex items-center justify-center ${
                isWarning
                  ? 'border-rose-500 bg-rose-950/60 shadow-[0_0_25px_rgba(244,63,94,0.6)]'
                  : 'border-emerald-400 bg-emerald-950/60 shadow-[0_0_25px_rgba(52,211,153,0.6)]'
              }`}
            >
              {/* Reticle grid */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.5)_90%)]" />

              {isWarning ? (
                /* Cute Tiny Warning Monster (NO real drug imagery!) */
                <div className="relative flex flex-col items-center p-2 animate-gentle-float">
                  <img
                    src={monsterImg}
                    alt="Quái vật cảnh báo tí hon mô phỏng"
                    className="w-24 h-24 sm:w-28 sm:h-28 object-contain filter drop-shadow-md rounded-full"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-1 bg-red-600/90 text-white font-black text-[10px] px-2 py-0.5 rounded-full border border-red-300">
                    BẤT THƯỜNG
                  </div>
                </div>
              ) : (
                /* Safe Sparkling Clean Particle Visual */
                <div className="flex flex-col items-center justify-center text-center p-2">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center animate-pulse">
                    <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-300" />
                  </div>
                  <div className="mt-2 text-emerald-300 font-extrabold text-xs tracking-wider">
                    CẤU TRÚC BÌNH THƯỜNG
                  </div>
                </div>
              )}
            </div>

            <div className="mt-2 text-xs font-semibold text-slate-300">
              {isWarning ? 'Phát hiện dấu hiệu đáng ngờ' : 'Không có dấu hiệu bất thường'}
            </div>
          </div>
        </div>

        {/* Action Slogan Badge */}
        <div
          id="action-badge"
          className={`my-3 px-6 py-2.5 rounded-2xl font-black text-base sm:text-lg md:text-xl tracking-wider shadow-lg border-2 ${
            isWarning
              ? 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white border-yellow-300'
              : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white border-emerald-200'
          }`}
        >
          {item.badgeText}
        </div>

        {/* Narration Spoken Box (Visible Subtitle for Classroom Projection) */}
        <div className="w-full bg-slate-950/70 border border-slate-700 rounded-2xl p-3 sm:p-4 my-2 text-left shadow-inner">
          <div className="flex items-center justify-between text-xs font-bold text-sky-400 mb-1">
            <span className="flex items-center gap-1.5">
              <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce text-yellow-400' : ''}`} />
              LỜI GIẢI THÍCH CỦA CÔ GIÁO (ĐANG ĐỌC QUA LOA):
            </span>
            {isSpeaking && (
              <span className="text-amber-400 font-bold animate-pulse">
                🔊 Đang phát âm thanh...
              </span>
            )}
          </div>
          <p className="text-sm sm:text-base md:text-lg text-slate-100 font-semibold leading-relaxed">
            &ldquo;{item.narrationText}&rdquo;
          </p>
        </div>

        {/* Teacher Action Controls */}
        <div className="w-full flex flex-wrap items-center justify-center gap-4 mt-4 pt-3 border-t border-slate-700">
          {/* Replay speech button */}
          <button
            id="btn-replay-speech"
            onClick={() => {
              soundFx.click();
              handleSpeak();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 border-2 border-sky-400 text-sky-200 font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:scale-105 active:scale-95"
            title="Bấm để phát lại lời đọc cho học sinh nghe"
          >
            <Volume2 className="w-5 h-5 text-sky-400" />
            <span>🔊 NGHE LẠI</span>
          </button>

          {/* Return to table button */}
          <button
            id="btn-back-to-table"
            onClick={() => {
              soundFx.click();
              stopSpeech();
              onBackToTable();
            }}
            className="flex items-center gap-2 px-7 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 border-2 border-cyan-300 text-white font-black text-sm sm:text-base md:text-lg shadow-xl transition-all transform hover:scale-105 active:scale-95 ring-4 ring-blue-500/30"
            title="Quay lại bàn khám phá để chọn vật phẩm tiếp theo"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>↩ QUAY LẠI BÀN KHÁM PHÁ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
