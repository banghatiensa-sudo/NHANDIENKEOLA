export type GameState = 
  | 'INITIAL'      // Table overview, ready for teacher to pick an item
  | 'SCANNING'     // Item placed under microscope, scanning in progress (1.5s)
  | 'RESULT'       // Displaying warning or safe result with teacher explanation
  | 'SUMMARY'      // All 5 items completed, summary list and recap
  | 'QUIZ'         // Interactive questions (5 questions covering inspected items & safe rules)
  | 'FINAL';       // Golden Safety Shield & reset button

export type ItemStatus = 'warning' | 'safe';

export interface DiscoveryItem {
  id: string;
  name: string;
  shortName: string;
  emoji: string;
  imageSrc: string;
  status: ItemStatus;
  statusLabel: string;
  badgeText: string;
  narrationText: string;
  monsterInside?: boolean;
}

export interface QuizOption {
  id: string; // 'A' | 'B' | 'C'
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: number;
  badge: string;
  topic: string;
  question: string;
  options: QuizOption[];
  correctSpeech: string;
  wrongSpeech: string;
}
