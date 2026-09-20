import React from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import teacherImg from '../assets/images/teacher_character_1789879314232.jpg';

interface TeacherGuideProps {
  isSpeaking: boolean;
  activeSpeechText?: string;
  onReplay?: () => void;
}

export const TeacherGuide: React.FC<TeacherGuideProps> = ({
  isSpeaking,
  activeSpeechText,
  onReplay,
}) => {
  return (
    <div className="relative flex flex-col items-center select-none pointer-events-auto z-10">
      {/* Speech bubble */}
      <div className="relative mb-2 max-w-[260px] sm:max-w-[280px] bg-white/95 backdrop-blur border-3 border-blue-500 rounded-2xl p-3 shadow-xl text-slate-800 text-xs sm:text-sm font-semibold transition-all">
        {/* Pointer triangle */}
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-blue-500" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white" />

        <div className="flex items-start gap-2">
          <div className="shrink-0 mt-0.5">
            {isSpeaking ? (
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            )}
          </div>
          <div className="flex-1">
            <p className="line-clamp-4 leading-snug font-medium text-slate-800">
              {activeSpeechText ||
                'Chào các em! Cô sẽ dùng Kính Hiển Vi Thần Kỳ để kiểm tra từng vật phẩm trên bàn nhé!'}
            </p>
          </div>
        </div>

        {isSpeaking && (
          <div className="mt-1.5 flex items-center justify-between pt-1 border-t border-slate-200">
            <span className="text-[11px] font-bold text-blue-600 flex items-center gap-1">
              <Volume2 className="w-3 h-3 animate-pulse" /> Đang phát lời đọc...
            </span>
            <div className="flex items-center gap-0.5">
              <span className="w-1 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
              <span className="w-1 h-4 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
              <span className="w-1 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* Teacher character container */}
      <div 
        id="teacher-character"
        className="relative group cursor-pointer"
        onClick={onReplay}
        title="Nhân vật giáo viên hướng dẫn (bấm để nghe lại lời dặn)"
      >
        <div className="relative w-36 sm:w-44 md:w-52 h-52 sm:h-64 md:h-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 transition-transform duration-300 hover:scale-105">
          <img
            src={teacherImg}
            alt="Giáo viên hướng dẫn hoạt hình"
            className="w-full h-full object-cover object-top"
            referrerPolicy="no-referrer"
          />
          {/* Subtle gradient vignette at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
          
          <div className="absolute bottom-1.5 inset-x-0 flex justify-center">
            <span className="bg-blue-600/90 text-white font-extrabold text-[10px] md:text-xs px-2.5 py-0.5 rounded-full shadow border border-sky-300">
              Cô Giáo Hướng Dẫn
            </span>
          </div>
        </div>

        {/* Glow on floor */}
        <div className="absolute -bottom-3 inset-x-4 h-6 bg-sky-400/40 blur-md rounded-full -z-10" />
      </div>
    </div>
  );
};
