import React, { useState } from 'react';
import { getLogisticsInfo } from '../services/gemini';
import { Search, ShieldCheck, Loader2, Globe2, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { LogisticsData } from '../types';

const LogisticsExplorer: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [data, setData] = useState<LogisticsData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!origin || !destination) return;
    setLoading(true);
    const result = await getLogisticsInfo(origin, destination);
    setData(result);
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      {/* Left Panel: Search */}
      <div className="lg:col-span-1 bg-slate-900/80 backdrop-blur-sm p-6 rounded-xl border border-slate-800 shadow-sm h-fit">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
          <ShieldCheck className="text-blue-500" />
          Travel Logistics
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          Get real-time information about visas, passports, customs, and local laws using Google Search Grounding.
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Citizenship / Origin</label>
            <input
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full p-3 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
              placeholder="e.g., USA"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Destination</label>
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-3 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
              placeholder="e.g., Brazil"
            />
          </div>
          
          <button
            onClick={handleCheck}
            disabled={loading || !origin || !destination}
            className="w-full bg-slate-800 text-white border border-slate-700 py-3 rounded-lg font-bold hover:bg-slate-700 hover:border-slate-600 disabled:opacity-50 flex justify-center items-center gap-2 transition-all"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Search size={18} />}
            Find Requirements
          </button>
        </div>
      </div>

      {/* Right Panel: Results */}
      <div className="lg:col-span-2 bg-slate-900/90 p-8 rounded-xl border border-slate-800 shadow-sm min-h-[500px]">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-slate-800 pb-4 text-white">
          <Globe2 className="text-blue-500" />
          Travel Briefing
        </h2>
        {data ? (
          <div>
            <div className="prose prose-invert prose-blue max-w-none">
              <ReactMarkdown>{data.markdown}</ReactMarkdown>
            </div>
            
            {/* Sources Section */}
            {data.sources.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-800">
                <h4 className="text-sm font-bold text-slate-400 uppercase mb-3">Verified Sources</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {data.sources.map((source, i) => (
                    <a 
                      key={i} 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors truncate bg-slate-950/50 p-2 rounded border border-slate-800"
                    >
                      <ExternalLink size={10} />
                      <span className="truncate">{source.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-slate-600">
            <ShieldCheck size={48} className="mb-4 opacity-20" />
            <p>Enter your details to fetch visa and legal requirements.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogisticsExplorer;