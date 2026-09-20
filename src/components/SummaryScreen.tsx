import React, { useEffect, useState } from 'react';
import { DISCOVERY_ITEMS, SUMMARY_SPEECH } from '../data/items';
import { soundFx, speakVietnamese, stopSpeech } from '../utils/audio';
import teacherImg from '../assets/images/teacher_character_1789879314232.jpg';
import { CheckCircle2, AlertTriangle, Volume2, ArrowRight, Sparkles, Award } from 'lucide-react';

interface SummaryScreenProps {
  onProceedToQuiz: () => void;
}

export const SummaryScreen: React.FC<SummaryScreenProps> = ({
  onProceedToQuiz,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    setIsSpeaking(true);
    speakVietnamese(SUMMARY_SPEECH, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
    });
  };

  useEffect(() => {
    // Play celebratory fanfare
    soundFx.fanfare();
    // Auto-read summary speech
    handleSpeak();

    return () => {
      stopSpeech();
    };
  }, []);

  return (
    <div
      id="summary-screen"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-500"
    >
      {/* Golden celebratory aura */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,179,8,0.2),transparent_70%)] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 border-4 border-amber-400 rounded-3xl p-4 sm:p-6 md:p-8 shadow-[0_0_60px_rgba(251,191,36,0.35)] flex flex-col items-center text-center">
        {/* Header Ribbon & Title */}
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-amber-950 px-6 sm:px-8 py-2 sm:py-2.5 rounded-full shadow-2xl border-2 border-yellow-200 mb-3 sm:mb-4 transform hover:scale-105 transition-transform">
          <Award className="w-6 h-6 sm:w-8 sm:h-8 text-amber-900 animate-bounce" />
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-wider uppercase">
            🎉 HOÀN THÀNH NHIỆM VỤ!
          </h2>
        </div>

        <p className="text-amber-200 text-sm sm:text-base md:text-lg font-bold mb-4">
          Bảng tổng kết kết quả kiểm tra 5 vật phẩm qua Kính Hiển Vi Thần Kỳ
        </p>

        {/* 5 Items Summary Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
          {DISCOVERY_ITEMS.map((item) => {
            const isWarning = item.status === 'warning';

            return (
              <div
                key={item.id}
                id={`summary-item-${item.id}`}
                className={`flex flex-col items-center justify-between p-3 rounded-2xl border-2 shadow-lg transition-transform hover:scale-105 ${
                  isWarning
                    ? 'bg-rose-950/70 border-rose-500 shadow-rose-950/50'
                    : 'bg-emerald-950/70 border-emerald-500 shadow-emerald-950/50'
                }`}
              >
                {/* Item Thumbnail */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center p-1">
                  <img
                    src={item.imageSrc}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Name */}
                <div className="my-1 text-sm sm:text-base font-extrabold text-white">
                  {item.emoji} {item.shortName}
                </div>

                {/* Status Badge */}
                <div
                  className={`mt-1 px-2.5 py-1 rounded-full font-black text-xs sm:text-sm flex items-center gap-1 shadow ${
                    isWarning
                      ? 'bg-red-600 text-white border border-red-300'
                      : 'bg-emerald-600 text-white border border-emerald-300'
                  }`}
                >
                  {isWarning ? (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5 text-yellow-300" />
                      <span>⚠ Cảnh báo</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
                      <span>✓ An toàn (mô phỏng)</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Teacher Character & Summary Advice */}
        <div className="w-full flex flex-col md:flex-row items-center gap-4 bg-slate-900/80 border-2 border-sky-400/60 rounded-2xl p-4 md:p-5 shadow-xl text-left">
          {/* Teacher Avatar */}
          <div className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-3 border-amber-300 shadow-lg">
            <img
              src={teacherImg}
              alt="Giáo viên tổng kết"
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Teacher Speech Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-amber-300 font-black text-sm md:text-base flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> LỜI KHUYÊN TỔNG KẾT TỪ CÔ GIÁO:
              </span>
              {isSpeaking && (
                <span className="text-sky-300 text-xs font-bold animate-pulse">
                  🔊 Đang phát lời đọc...
                </span>
              )}
            </div>
            <p className="text-sm sm:text-base md:text-lg text-slate-100 font-semibold leading-relaxed">
              &ldquo;{SUMMARY_SPEECH}&rdquo;
            </p>
          </div>
        </div>

        {/* Teacher Controls */}
        <div className="w-full flex flex-wrap items-center justify-center gap-4 mt-6">
          <button
            id="btn-replay-summary-speech"
            onClick={() => {
              soundFx.click();
              handleSpeak();
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 border-2 border-sky-400 text-sky-200 font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <Volume2 className="w-5 h-5 text-sky-400" />
            <span>🔊 NGHE LẠI TỔNG KẾT</span>
          </button>

          <button
            id="btn-go-to-quiz"
            onClick={() => {
              soundFx.click();
              stopSpeech();
              onProceedToQuiz();
            }}
            className="flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm sm:text-base shadow-xl border-2 border-yellow-200 transition-all transform hover:scale-105 active:scale-95 ring-4 ring-amber-400/30"
          >
            <span>TIẾP TỤC: 5 CÂU HỎI TƯƠNG TÁC</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
