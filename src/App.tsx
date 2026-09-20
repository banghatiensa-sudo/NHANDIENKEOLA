import React, { useState, useEffect } from 'react';
import { GameState, DiscoveryItem } from './types';
import { DISCOVERY_ITEMS, INTRO_SPEECH } from './data/items';
import { HeaderBanner } from './components/HeaderBanner';
import { TeacherGuide } from './components/TeacherGuide';
import { DiscoveryTable } from './components/DiscoveryTable';
import { MicroscopeScanningView } from './components/MicroscopeScanningView';
import { ResultModal } from './components/ResultModal';
import { SummaryScreen } from './components/SummaryScreen';
import { QuizScreen } from './components/QuizScreen';
import { FinalShieldScreen } from './components/FinalShieldScreen';
import {
  soundFx,
  speakVietnamese,
  stopSpeech,
  subscribeSpeechState,
} from './utils/audio';
import bgImg from './assets/images/fantasy_classroom_bg_1789879295106.jpg';
import { Award, Sparkles, ArrowRight } from 'lucide-react';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('INITIAL');
  const [selectedItem, setSelectedItem] = useState<DiscoveryItem | null>(null);
  const [inspectedIds, setInspectedIds] = useState<string[]>([]);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [activeSpeechText, setActiveSpeechText] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = subscribeSpeechState((speaking) => {
      setIsSpeaking(speaking);
    });

    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'f' || e.key === 'F') {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      unsubscribe();
      stopSpeech();
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.warn('Fullscreen request failed:', err);
        });
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((err) => {
          console.warn('Exit fullscreen failed:', err);
        });
      }
    }
  };

  // Play introduction narration
  const handlePlayIntro = () => {
    setActiveSpeechText(INTRO_SPEECH);
    speakVietnamese(INTRO_SPEECH, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
    });
  };

  // Teacher selects an item from the table
  const handleSelectItem = (item: DiscoveryItem) => {
    stopSpeech();
    setSelectedItem(item);
    setGameState('SCANNING');
  };

  // 1.5s scan finishes -> proceed to result view
  const handleScanComplete = () => {
    if (selectedItem) {
      setInspectedIds((prev) => {
        if (!prev.includes(selectedItem.id)) {
          return [...prev, selectedItem.id];
        }
        return prev;
      });
      setGameState('RESULT');
    }
  };

  // Teacher clicks to return to the discovery table
  const handleBackToTable = () => {
    setGameState('INITIAL');
  };

  // Teacher opens the summary view once all 5 items are inspected
  const handleOpenSummary = () => {
    soundFx.click();
    stopSpeech();
    setGameState('SUMMARY');
  };

  // Teacher moves to the quiz section
  const handleProceedToQuiz = () => {
    setGameState('QUIZ');
  };

  // Teacher moves to the final safety shield
  const handleProceedToFinal = () => {
    setGameState('FINAL');
  };

  // Restart game - completely reset state
  const handleRestart = () => {
    stopSpeech();
    setSelectedItem(null);
    setInspectedIds([]);
    setActiveSpeechText('');
    setGameState('INITIAL');
  };

  const allInspected = inspectedIds.length === DISCOVERY_ITEMS.length;

  return (
    <main className="relative w-screen h-screen h-[100dvh] max-h-screen overflow-hidden flex flex-col justify-between select-none bg-slate-950 font-['Nunito',sans-serif]">
      {/* 16:9 Fantasy Landscape Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImg}
          alt="Thung lũng kỳ ảo"
          className="w-full h-full object-cover object-center filter brightness-95"
          referrerPolicy="no-referrer"
        />
        {/* Soft Vignette & Atmospheric Lighting */}
        <div className="absolute inset-0 bg-radial from-transparent via-slate-950/20 to-slate-950/60 pointer-events-none" />
      </div>

      {/* Top Header Banner */}
      <HeaderBanner
        onPlayIntro={handlePlayIntro}
        isSpeaking={isSpeaking}
        inspectedCount={inspectedIds.length}
        totalCount={DISCOVERY_ITEMS.length}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />

      {/* Central Interactive Playground (Table + Teacher) */}
      <div className="relative z-10 flex-1 flex flex-col justify-end w-full max-w-7xl mx-auto px-4 pb-2">
        {/* Prompt banner when all 5 items are inspected */}
        {allInspected && gameState === 'INITIAL' && (
          <div className="w-full max-w-2xl mx-auto mb-2 z-30 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 p-3 rounded-2xl shadow-2xl border-2 border-yellow-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-950 shrink-0 animate-bounce" />
                <span className="font-black text-sm sm:text-base md:text-lg">
                  🎉 ĐÃ KIỂM TRA ĐỦ 5 VẬT PHẨM!
                </span>
              </div>

              <button
                id="btn-trigger-summary"
                onClick={handleOpenSummary}
                className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-lg border border-sky-300 transition-transform transform hover:scale-105 active:scale-95 shrink-0"
              >
                <span>XEM TỔNG KẾT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Main stage row: Teacher Character on left + Wooden Discovery Table */}
        <div className="w-full flex items-end justify-between gap-2 sm:gap-4">
          {/* Cartoon Teacher Character on the left */}
          <div className="hidden sm:flex shrink-0 mb-4 md:mb-6">
            <TeacherGuide
              isSpeaking={isSpeaking}
              activeSpeechText={activeSpeechText}
              onReplay={handlePlayIntro}
            />
          </div>

          {/* Discovery Table with 5 Items and Microscope */}
          <div className="flex-1 w-full">
            <DiscoveryTable
              items={DISCOVERY_ITEMS}
              inspectedIds={inspectedIds}
              onSelectItem={handleSelectItem}
              disabled={gameState === 'SCANNING'}
            />
          </div>
        </div>
      </div>

      {/* Floating Teacher for Small Screens */}
      <div className="sm:hidden absolute top-24 left-2 z-20">
        <TeacherGuide
          isSpeaking={isSpeaking}
          activeSpeechText={activeSpeechText}
          onReplay={handlePlayIntro}
        />
      </div>

      {/* Active Phase Modals & Overlays */}
      {gameState === 'SCANNING' && selectedItem && (
        <MicroscopeScanningView
          item={selectedItem}
          onScanComplete={handleScanComplete}
        />
      )}

      {gameState === 'RESULT' && selectedItem && (
        <ResultModal
          item={selectedItem}
          onBackToTable={handleBackToTable}
        />
      )}

      {gameState === 'SUMMARY' && (
        <SummaryScreen
          onProceedToQuiz={handleProceedToQuiz}
        />
      )}

      {gameState === 'QUIZ' && (
        <QuizScreen
          onProceedToFinal={handleProceedToFinal}
        />
      )}

      {gameState === 'FINAL' && (
        <FinalShieldScreen
          onRestart={handleRestart}
        />
      )}
    </main>
  );
}
