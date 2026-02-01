export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface MoodEntry {
  date: string;
  score: number; // 1-10
  stressLevel: number; // 1-10
  notes: string;
}

export interface JournalEntry {
  id: string;
  content: string;
  mood: number;
  date: Date;
  aiFeedback?: string;
  tags?: string[];
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'Anxiety' | 'Academic' | 'Sleep' | 'Social' | 'General';
  description: string;
  content: string; 
  readTime: string;
  isBookmarked?: boolean;
}

export enum ViewState {
  CHAT = 'CHAT',
  DASHBOARD = 'DASHBOARD',
  RESOURCES = 'RESOURCES',
  JOURNAL = 'JOURNAL',
  FOCUS = 'FOCUS'
}

export interface UserProfile {
  name: string;
  university: string;
  major: string;
  level: number;
  xp: number;
  hydration: number; // glasses
  sleep: number; // hours
  theme: 'light' | 'dark';
  privacyMode: boolean;
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface SoundScape {
  id: string;
  name: string;
  volume: number; // 0-100
  isPlaying: boolean;
}