// Audio & Speech Synthesis Utility for Classroom Projection

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Sound effects using Web Audio API
export const soundFx = {
  click: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Ignore audio errors if blocked
    }
  },

  scan: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.7);
      osc.frequency.linearRampToValueAtTime(440, ctx.currentTime + 1.4);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.7);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.45);
    } catch {
      // Ignore
    }
  },

  tingTing: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      // First chime
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1046.5, now); // C6
      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.35);

      // Second chime (higher)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1567.98, now + 0.18); // G6
      gain2.gain.setValueAtTime(0.25, now + 0.18);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.18);
      osc2.stop(now + 0.7);
    } catch {
      // Ignore
    }
  },

  warning: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      [0, 0.22].forEach((delay) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(420, now + delay);
        osc.frequency.exponentialRampToValueAtTime(320, now + delay + 0.18);
        gain.gain.setValueAtTime(0.12, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + 0.18);
      });
    } catch {
      // Ignore
    }
  },

  fanfare: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const start = now + idx * 0.12;
        const dur = idx === notes.length - 1 ? 0.6 : 0.2;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.18, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + dur);
      });
    } catch {
      // Ignore
    }
  },

  wrongAnswer: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.3);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // Ignore
    }
  }
};

// Web Speech API manager for Vietnamese TTS
let currentUtterance: SpeechSynthesisUtterance | null = null;
let speechListeners: ((speaking: boolean) => void)[] = [];

export function subscribeSpeechState(listener: (speaking: boolean) => void) {
  speechListeners.push(listener);
  return () => {
    speechListeners = speechListeners.filter(l => l !== listener);
  };
}

function notifySpeechState(speaking: boolean) {
  speechListeners.forEach(l => l(speaking));
}

let cachedVietnameseVoice: SpeechSynthesisVoice | null = null;

function findVietnameseVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  if (cachedVietnameseVoice) return cachedVietnameseVoice;

  const voices = window.speechSynthesis.getVoices();
  // 1. Look for explicit vi-VN voice
  const vnVoice = voices.find(v => v.lang === 'vi-VN' || v.lang === 'vi_VN');
  if (vnVoice) {
    cachedVietnameseVoice = vnVoice;
    return vnVoice;
  }
  // 2. Look for any voice starting with vi
  const partialVn = voices.find(v => v.lang.toLowerCase().startsWith('vi'));
  if (partialVn) {
    cachedVietnameseVoice = partialVn;
    return partialVn;
  }
  // 3. Look for voice with 'Vietnamese' in name
  const nameVn = voices.find(v => v.name.toLowerCase().includes('vietnam'));
  if (nameVn) {
    cachedVietnameseVoice = nameVn;
    return nameVn;
  }
  return null;
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVietnameseVoice = null;
    findVietnameseVoice();
  };
}

export function stopSpeech() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
  notifySpeechState(false);
}

export function speakVietnamese(
  text: string,
  options?: {
    onStart?: () => void;
    onEnd?: () => void;
  }
) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    options?.onEnd?.();
    return;
  }

  // Ensure previous speech stopped
  stopSpeech();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'vi-VN';
  utterance.rate = 0.92; // Slightly slower, friendly elementary teacher pacing
  utterance.pitch = 1.05; // Friendly and clear

  const vnVoice = findVietnameseVoice();
  if (vnVoice) {
    utterance.voice = vnVoice;
  }

  utterance.onstart = () => {
    notifySpeechState(true);
    options?.onStart?.();
  };

  utterance.onend = () => {
    currentUtterance = null;
    notifySpeechState(false);
    options?.onEnd?.();
  };

  utterance.onerror = (e) => {
    // If interrupted (e.g. cancelled by user click), ignore
    if (e.error !== 'interrupted') {
      console.warn('SpeechSynthesis error:', e.error);
    }
    currentUtterance = null;
    notifySpeechState(false);
    options?.onEnd?.();
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}
