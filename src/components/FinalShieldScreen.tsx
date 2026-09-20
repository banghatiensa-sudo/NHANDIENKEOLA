import React, { useEffect, useState } from 'react';
import { FINAL_SPEECH } from '../data/items';
import { soundFx, speakVietnamese, stopSpeech } from '../utils/audio';
import shieldImg from '../assets/images/safety_shield_1789879436499.jpg';
import { RotateCcw, Volume2, Sparkles, ShieldCheck } from 'lucide-react';

interface FinalShieldScreenProps {
  onRestart: () => void;
}

export const FinalShieldScreen: React.FC<FinalShieldScreenProps> = ({
  onRestart,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    setIsSpeaking(true);
    speakVietnamese(FINAL_SPEECH, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
    });
  };

  useEffect(() => {
    soundFx.fanfare();
    handleSpeak();

    return () => {
      stopSpeech();
    };
  }, []);

  return (
    <div
      id="final-shield-screen"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-500"
    >
      {/* Golden divine rays backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.25),transparent_70%)] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 border-4 border-yellow-400 rounded-3xl p-5 sm:p-7 md:p-8 shadow-[0_0_80px_rgba(234,179,8,0.5)] flex flex-col items-center text-center">
        {/* Celebration tag */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-sm sm:text-base px-6 py-1.5 rounded-full shadow-lg border-2 border-yellow-200 uppercase tracking-wider mb-3">
          <Sparkles className="w-5 h-5 text-amber-950" />
          <span>XUẤT SẮC HOÀN THÀNH CHẶNG 1</span>
        </div>

        {/* Big Golden Safety Shield */}
        <div className="relative my-2 flex flex-col items-center">
          <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-68 md:h-68 flex items-center justify-center animate-gentle-float">
            <img
              src={shieldImg}
              alt="Lá Chắn An Toàn"
              className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_25px_rgba(234,179,8,0.6)]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Shield Title Ribbon */}
          <div className="relative -mt-6 z-20 bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-700 border-3 border-yellow-300 px-8 py-2 rounded-2xl shadow-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-yellow-300 text-shadow-gold uppercase tracking-wider">
              LÁ CHẮN AN TOÀN
            </h2>
          </div>
        </div>

        {/* 4 Golden Core Rules */}
        <div className="w-full max-w-md bg-slate-950/80 border-2 border-amber-400/80 rounded-2xl p-5 my-5 shadow-inner">
          <div className="flex flex-col gap-2.5 text-lg sm:text-xl md:text-2xl font-black text-amber-200 tracking-wide">
            <div className="flex items-center justify-center gap-2 text-rose-300">
              <span className="text-rose-400 font-bold">✖</span>
              <span>KHÔNG NHẬN</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-orange-300">
              <span className="text-orange-400 font-bold">✖</span>
              <span>KHÔNG THỬ</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-amber-300">
              <span className="text-amber-400 font-bold">✖</span>
              <span>KHÔNG SỬ DỤNG</span>
            </div>
            <div className="pt-2 border-t border-amber-400/40 flex items-center justify-center gap-2 text-emerald-300 text-xl sm:text-2xl md:text-3xl">
              <ShieldCheck className="w-7 h-7 text-emerald-400 shrink-0" />
              <span className="uppercase text-shadow-green">BÁO NGAY CHO NGƯỜI LỚN</span>
            </div>
          </div>
        </div>

        {/* Audio Box */}
        <div className="flex items-center gap-3 mb-6">
          <button
            id="btn-final-replay-audio"
            onClick={() => {
              soundFx.click();
              handleSpeak();
            }}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-slate-800 hover:bg-slate-700 border border-sky-400 text-sky-200 font-bold text-sm shadow transition-transform hover:scale-105"
          >
            <Volume2 className={`w-4 h-4 text-sky-400 ${isSpeaking ? 'animate-bounce text-yellow-300' : ''}`} />
            <span>🔊 Nghe lại lời chúc mừng</span>
          </button>
        </div>

        {/* Single Reset Button (MANDATORY REQUIREMENT) */}
        <button
          id="btn-restart-stage"
          onClick={() => {
            soundFx.click();
            stopSpeech();
            onRestart();
          }}
          className="flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-xl sm:text-2xl shadow-2xl border-3 border-emerald-200 transition-all transform hover:scale-105 active:scale-95 ring-4 ring-emerald-400/40"
          title="Bấm để đặt lại toàn bộ trạng thái về màn hình ban đầu"
        >
          <RotateCcw className="w-7 h-7" />
          <span>🔄 CHƠI LẠI CHẶNG 1</span>
        </button>
      </div>
    </div>
  );
};
