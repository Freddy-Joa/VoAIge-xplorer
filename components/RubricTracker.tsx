import React, { useState } from 'react';
import { translateText } from '../services/gemini';
import { SAMPLE_PHRASES } from '../constants';
import { Languages, Volume2, ArrowRight, Sparkles } from 'lucide-react';

const Translator: React.FC = () => {
  const [phrase, setPhrase] = useState('');
  const [destination, setDestination] = useState('');
  const [result, setResult] = useState<{ original: string; translated: string; pronunciation: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTranslate = async (textToTranslate: string = phrase) => {
    if (!textToTranslate || !destination) return;
    setLoading(true);
    try {
      const jsonStr = await translateText(textToTranslate, destination);
      const data = JSON.parse(jsonStr);
      setResult(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
        <div className="p-8 bg-gradient-to-r from-indigo-900 to-blue-900 text-white">
           <h2 className="text-2xl font-bold flex items-center gap-3">
             <Languages />
             Universal Translator
           </h2>
           <p className="text-indigo-200 mt-2">Instantly translate phrases and get pronunciation guides for your destination.</p>
        </div>

        <div className="p-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">I want to say...</label>
              <input 
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
                placeholder="Type a phrase here"
                className="w-full text-lg p-4 bg-slate-800 border border-slate-700 text-white placeholder-slate-600 rounded-xl focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            <div className="md:w-1/3">
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">In...</label>
              <input 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Country/City"
                className="w-full text-lg p-4 bg-slate-800 border border-slate-700 text-white placeholder-slate-600 rounded-xl focus:border-blue-500 outline-none transition-colors"
              />
            </div>
          </div>
          
          <button 
            onClick={() => handleTranslate()}
            disabled={loading || !phrase || !destination}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20"
          >
             {loading ? <Sparkles className="animate-spin" /> : <ArrowRight />}
             Translate
          </button>
          
          {/* Result Area */}
          {result && (
            <div className="bg-indigo-950/50 rounded-xl p-6 mt-6 border border-indigo-900/50 animate-in fade-in slide-in-from-top-2">
              <div className="text-center space-y-4">
                <div className="text-sm text-indigo-300 uppercase font-semibold tracking-wider">Translation</div>
                <div className="text-3xl md:text-4xl font-bold text-white">{result.translated}</div>
                
                <div className="flex items-center justify-center gap-2 text-indigo-200 font-medium bg-slate-800/50 py-2 px-4 rounded-full inline-flex mx-auto shadow-sm border border-slate-700">
                  <Volume2 size={18} />
                  <span>{result.pronunciation}</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Quick Suggestions */}
          <div className="pt-6 border-t border-slate-800">
            <h3 className="text-sm font-semibold text-slate-500 mb-3">Quick Phrases</h3>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_PHRASES.map((p, i) => (
                <button 
                  key={i}
                  onClick={() => { setPhrase(p); handleTranslate(p); }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-sm rounded-lg transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translator;