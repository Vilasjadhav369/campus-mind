import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';
import { Dashboard } from './components/Dashboard';
import { CrisisModal } from './components/CrisisModal';
import { Resources } from './components/Resources';
import { Journal } from './components/Journal';
import { FocusTimer } from './components/FocusTimer';
import { SettingsModal } from './components/SettingsModal';
import { Message, ViewState, UserProfile } from './types';
import { Menu } from 'lucide-react';
import { initializeGemini } from './services/geminiService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // New Global State
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Jane Doe',
    university: 'State University',
    major: 'Psychology',
    level: 5,
    xp: 340,
    hydration: 3,
    sleep: 6.5,
    theme: 'light',
    privacyMode: false
  });

  useEffect(() => {
    initializeGemini();
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.CHAT:
        return (
          <div className="h-full max-w-5xl mx-auto">
             <ChatInterface messages={messages} setMessages={setMessages} />
          </div>
        );
      case ViewState.DASHBOARD:
        return (
          <div className="h-full overflow-y-auto max-w-6xl mx-auto pb-8">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Your Wellness Dashboard</h1>
                <p className="text-slate-500">Here's an overview of your mental wellness journey.</p>
            </header>
            <Dashboard 
                onNavigate={setCurrentView} 
                profile={profile}
                setProfile={setProfile}
            />
          </div>
        );
      case ViewState.RESOURCES:
        return (
          <div className="h-full overflow-y-auto max-w-6xl mx-auto pb-8">
             <Resources />
          </div>
        );
      case ViewState.JOURNAL:
        return (
          <div className="h-full max-w-6xl mx-auto pb-8 overflow-y-auto">
             <header className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Mood Journal</h1>
                <p className="text-slate-500">Track your thoughts and get compassionate AI insights.</p>
             </header>
             <Journal />
          </div>
        );
       case ViewState.FOCUS:
        return (
          <div className="h-full max-w-6xl mx-auto pb-8 overflow-y-auto">
             <header className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Focus Zone</h1>
                <p className="text-slate-500">Boost productivity with the Pomodoro technique and mindfulness.</p>
             </header>
             <FocusTimer />
          </div>
        );
      default:
        return <Dashboard onNavigate={setCurrentView} profile={profile} setProfile={setProfile} />;
    }
  };

  return (
    <div className={`flex h-screen bg-slate-50 ${profile.theme === 'dark' ? 'dark' : ''}`}>
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        onEmergencyClick={() => setIsCrisisModalOpen(true)}
        onSettingsClick={() => setIsSettingsOpen(true)}
        profile={profile}
      />

      <main className="flex-1 flex flex-col min-w-0 h-full relative transition-all">
        {/* Mobile Header */}
        <div className="lg:hidden px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-slate-800">
                <div className="w-6 h-6 rounded bg-teal-500 flex items-center justify-center text-white text-xs">C</div>
                CampusMind
            </div>
            <button 
                onClick={() => setIsMobileOpen(true)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
                <Menu className="w-6 h-6" />
            </button>
        </div>

        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden relative">
          {renderContent()}
        </div>
      </main>

      <CrisisModal 
        isOpen={isCrisisModalOpen} 
        onClose={() => setIsCrisisModalOpen(false)} 
      />

      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        profile={profile}
        setProfile={setProfile}
      />
    </div>
  );
};

export default App;