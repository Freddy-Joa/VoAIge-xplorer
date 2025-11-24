import React, { useState } from 'react';
import { Compass, Map, ShieldCheck, Languages } from 'lucide-react';
import TripPlanner from './components/IdeaGenerator';
import LogisticsExplorer from './components/PitchRefiner';
import Translator from './components/RubricTracker';

function App() {
  const [activeTab, setActiveTab] = useState<'plan' | 'logistics' | 'translate'>('plan');

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2.5 rounded-xl shadow-lg shadow-blue-900/20">
                <Compass size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">VoAIge xplorer</h1>
                <p className="text-xs text-slate-400 font-medium">Your AI Travel Companion</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-800/50 p-1 rounded-xl border border-slate-700/50">
              <button 
                onClick={() => setActiveTab('plan')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === 'plan' ? 'bg-slate-700 text-blue-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <Map size={18} />
                Trip Planner
              </button>
              <button 
                onClick={() => setActiveTab('logistics')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === 'logistics' ? 'bg-slate-700 text-blue-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <ShieldCheck size={18} />
                Visa & Rules
              </button>
              <button 
                onClick={() => setActiveTab('translate')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === 'translate' ? 'bg-slate-700 text-blue-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <Languages size={18} />
                Translator
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Nav Substitute */}
        <div className="md:hidden mb-6 flex gap-2 overflow-x-auto pb-2">
           <button 
              onClick={() => setActiveTab('plan')}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold border ${activeTab === 'plan' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
            >
              Trip Planner
            </button>
            <button 
              onClick={() => setActiveTab('logistics')}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold border ${activeTab === 'logistics' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
            >
              Visa & Rules
            </button>
            <button 
              onClick={() => setActiveTab('translate')}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold border ${activeTab === 'translate' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
            >
              Translator
            </button>
        </div>

        {/* View Container */}
        <div className="min-h-[600px]">
          {activeTab === 'plan' && (
            <div className="animate-in fade-in duration-500">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Where to next?</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                  Let AI craft your perfect itinerary, complete with local insights, food, and accommodation.
                </p>
              </div>
              <TripPlanner />
            </div>
          )}
          
          {activeTab === 'logistics' && (
            <div className="animate-in fade-in duration-500">
               <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-3">Travel Smart & Safe</h2>
                <p className="text-slate-400">
                  Check visa requirements, local laws, and essential travel advice before you go.
                </p>
              </div>
              <LogisticsExplorer />
            </div>
          )}
          
          {activeTab === 'translate' && (
            <div className="animate-in fade-in duration-500">
               <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-3">Speak Like a Local</h2>
                <p className="text-slate-400">
                  Break down language barriers with instant, context-aware translation.
                </p>
              </div>
              <Translator />
            </div>
          )}
        </div>

      </main>
    </div>
  );
}

export default App;