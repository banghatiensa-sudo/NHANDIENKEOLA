import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS } from '../data/items';
import { soundFx, speakVietnamese, stopSpeech } from '../utils/audio';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Volume2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface QuizScreenProps {
  onProceedToFinal: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  onProceedToFinal,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, { optionId: string; isCorrect: boolean }>>({});
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];
  const currentAnswer = answers[currentIdx] || null;

  // Speak the question text whenever currentIdx changes
  useEffect(() => {
    stopSpeech();
    setIsSpeaking(true);
    const textToRead = `${currentQuestion.badge}. ${currentQuestion.question}`;
    speakVietnamese(textToRead, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
    });

    return () => {
      stopSpeech();
    };
  }, [currentIdx]);

  const handleSelectOption = (option: typeof currentQuestion.options[0]) => {
    const isCorrect = option.isCorrect;
    setAnswers((prev) => ({
      ...prev,
      [currentIdx]: { optionId: option.id, isCorrect },
    }));

    if (isCorrect) {
      soundFx.tingTing();
      setIsSpeaking(true);
      speakVietnamese(currentQuestion.correctSpeech, {
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
      });
    } else {
      soundFx.wrongAnswer();
      setIsSpeaking(true);
      speakVietnamese(currentQuestion.wrongSpeech, {
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
      });
    }
  };

  const handleReplayQuestion = () => {
    soundFx.click();
    setIsSpeaking(true);
    const textToRead = `${currentQuestion.badge}. ${currentQuestion.question}`;
    speakVietnamese(textToRead, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
    });
  };

  const handleReplayExplanation = () => {
    if (!currentAnswer) return;
    soundFx.click();
    setIsSpeaking(true);
    const speech = currentAnswer.isCorrect
      ? currentQuestion.correctSpeech
      : currentQuestion.wrongSpeech;
    speakVietnamese(speech, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
    });
  };

  const handleNext = () => {
    soundFx.click();
    stopSpeech();
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      onProceedToFinal();
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      soundFx.click();
      stopSpeech();
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const isLastQuestion = currentIdx === QUIZ_QUESTIONS.length - 1;

  return (
    <div
      id="quiz-screen"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300"
    >
      <div className="relative z-10 w-full max-w-4xl max-h-[95vh] overflow-y-auto bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 border-4 border-cyan-400 rounded-3xl p-4 sm:p-6 md:p-8 shadow-[0_0_60px_rgba(6,182,212,0.4)] flex flex-col items-center text-center">
        {/* Top Header Badge & Stepper */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-3 border-b border-cyan-500/30 pb-3">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-full shadow-lg border-2 border-cyan-300">
            <HelpCircle className="w-4 h-4 text-yellow-300" />
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">
              CÂU HỎI TƯƠNG TÁC TỔNG KẾT
            </span>
          </div>

          {/* 5-Question Step Indicator */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-950/70 px-3 py-1.5 rounded-full border border-cyan-400/40">
            {QUIZ_QUESTIONS.map((q, index) => {
              const isCurrent = index === currentIdx;
              const ans = answers[index];
              const isAnsweredCorrect = ans?.isCorrect;

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    soundFx.click();
                    stopSpeech();
                    setCurrentIdx(index);
                  }}
                  className={`relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full font-black text-xs transition-all transform hover:scale-110 ${
                    isCurrent
                      ? 'bg-amber-400 text-slate-950 ring-2 ring-yellow-200 scale-110 shadow-lg'
                      : isAnsweredCorrect
                      ? 'bg-emerald-500 text-white border border-emerald-300'
                      : 'bg-slate-800 text-slate-300 border border-slate-600 hover:border-cyan-400'
                  }`}
                  title={`Chuyển đến ${q.badge}`}
                >
                  {isAnsweredCorrect && !isCurrent ? '✓' : index + 1}
                </button>
              );
            })}
            <span className="ml-1 text-xs font-bold text-cyan-200">
              ({currentIdx + 1}/{QUIZ_QUESTIONS.length})
            </span>
          </div>
        </div>

        {/* Topic Tag */}
        <div className="inline-flex items-center gap-2 bg-blue-950/80 border border-cyan-400/60 px-4 py-1 rounded-full text-cyan-200 font-black text-xs sm:text-sm uppercase tracking-wide mb-2">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>{currentQuestion.badge}</span>
        </div>

        {/* Big Question Heading */}
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-amber-300 text-shadow-gold tracking-wide uppercase my-2 max-w-3xl leading-snug">
          {currentQuestion.question}
        </h2>

        {/* Audio control for reading question */}
        <div className="flex items-center gap-2 my-2">
          <button
            id="btn-replay-question-audio"
            onClick={handleReplayQuestion}
            className="flex items-center gap-1.5 text-xs font-extrabold text-cyan-200 hover:text-white bg-slate-800/80 px-3 py-1 rounded-full border border-cyan-400/40 hover:bg-slate-700 transition-colors"
          >
            <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'text-yellow-300 animate-bounce' : 'text-cyan-300'}`} />
            <span>🔊 Nghe cô đọc câu hỏi</span>
          </button>
        </div>

        <p className="text-slate-300 font-semibold text-xs sm:text-sm mb-4">
          Giáo viên lắng nghe ý kiến thảo luận của cả lớp và bấm chọn phương án!
        </p>

        {/* 3 Large Option Buttons */}
        <div className="w-full max-w-2xl flex flex-col gap-2.5 sm:gap-3 mb-4">
          {currentQuestion.options.map((option) => {
            const isSelected = currentAnswer?.optionId === option.id;
            let btnStyle = 'bg-slate-800/90 border-slate-600 hover:border-cyan-400 text-white hover:bg-slate-750';

            if (isSelected) {
              if (option.isCorrect) {
                btnStyle = 'bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-300 text-white ring-4 ring-emerald-400/50 scale-102';
              } else {
                btnStyle = 'bg-gradient-to-r from-rose-700 to-red-600 border-rose-400 text-white ring-4 ring-rose-400/50';
              }
            }

            return (
              <button
                key={option.id}
                id={`quiz-option-${option.id}`}
                onClick={() => handleSelectOption(option)}
                className={`group flex items-center justify-between p-3 sm:p-4 rounded-2xl border-3 shadow-xl transition-all transform hover:scale-101 active:scale-99 text-left ${btnStyle}`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Option Letter Circle */}
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/15 border-2 border-white/30 flex items-center justify-center font-black text-lg sm:text-xl shrink-0">
                    {option.id}
                  </div>
                  {/* Option Text */}
                  <span className="text-sm sm:text-base md:text-lg font-bold tracking-wide leading-snug">
                    {option.text}
                  </span>
                </div>

                {isSelected && (
                  <div className="shrink-0 ml-2">
                    {option.isCorrect ? (
                      <CheckCircle2 className="w-7 h-7 text-emerald-200 animate-bounce" />
                    ) : (
                      <AlertTriangle className="w-7 h-7 text-yellow-300 animate-pulse" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Area */}
        {currentAnswer !== null && (
          <div
            className={`w-full max-w-2xl rounded-2xl p-3.5 sm:p-4 border-2 shadow-xl animate-in fade-in zoom-in-95 duration-200 mb-4 ${
              currentAnswer.isCorrect
                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-100 shadow-emerald-950/60'
                : 'bg-rose-950/80 border-rose-400 text-rose-100 shadow-rose-950/60'
            }`}
          >
            <div className="flex items-center justify-center gap-2 mb-1.5">
              {currentAnswer.isCorrect ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-emerald-300" />
                  <span className="text-xl sm:text-2xl font-black uppercase text-emerald-300 tracking-wider">
                    ✓ CHÍNH XÁC!
                  </span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-6 h-6 text-yellow-400" />
                  <span className="text-xl sm:text-2xl font-black uppercase text-rose-300 tracking-wider">
                    ⚠ HÃY SUY NGHĨ LẠI!
                  </span>
                </>
              )}
            </div>

            <p className="text-xs sm:text-sm md:text-base font-bold text-center leading-relaxed">
              {currentAnswer.isCorrect
                ? currentQuestion.correctSpeech
                : currentQuestion.wrongSpeech}
            </p>

            <div className="mt-2 flex items-center justify-center">
              <button
                id="btn-quiz-replay-feedback-audio"
                onClick={handleReplayExplanation}
                className="flex items-center gap-1.5 text-xs font-extrabold text-sky-300 hover:text-sky-200 bg-slate-900/60 px-3 py-1 rounded-full border border-sky-400/40"
              >
                <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-bounce text-yellow-300' : ''}`} />
                <span>🔊 Nghe lại lời giải thích</span>
              </button>
            </div>
          </div>
        )}

        {/* Navigation Actions Row */}
        <div className="w-full max-w-2xl flex items-center justify-between gap-3 mt-1 pt-2 border-t border-slate-700/60">
          <button
            id="btn-quiz-prev"
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-colors ${
              currentIdx === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500 border-slate-700'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-600'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Câu trước</span>
          </button>

          {/* Continue button: enabled when correctly answered, or teacher can advance */}
          {currentAnswer?.isCorrect ? (
            <button
              id={isLastQuestion ? 'btn-go-to-shield' : 'btn-quiz-next'}
              onClick={handleNext}
              className="flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm sm:text-base shadow-xl border-2 border-yellow-200 transition-all transform hover:scale-105 active:scale-95 ring-4 ring-yellow-400/40 animate-pulse"
            >
              {isLastQuestion ? (
                <>
                  <ShieldCheck className="w-5 h-5 text-slate-950" />
                  <span>XEM LÁ CHẮN AN TOÀN</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  <span>TIẾP TỤC: CÂU HỎI TIẾP THEO ({currentIdx + 2}/5)</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          ) : (
            <button
              id="btn-quiz-skip"
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-600 transition-colors"
            >
              <span>{isLastQuestion ? 'Bỏ qua sang Lá Chắn' : 'Chuyển câu tiếp'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
