import React, { useState } from 'react';
import { TripRequest, Itinerary } from '../types';
import { generateItinerary } from '../services/gemini';
import { Loader2, Plane, Map, BedDouble, BusFront, UtensilsCrossed, Sparkles } from 'lucide-react';
import DayItineraryCard from './TrackCard';

const TripPlanner: React.FC = () => {
  const [request, setRequest] = useState<TripRequest>({
    destination: '',
    origin: '',
    dates: '',
    budget: 'Moderate',
    travelers: 'Solo',
    interests: ''
  });
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePlan = async () => {
    if (!request.destination || !request.origin) return;
    setLoading(true);
    setItinerary(null);
    const result = await generateItinerary(request);
    setItinerary(result);
    setLoading(false);
  };

  const getHeroImage = (prompt: string) => `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + ' travel cinematic photorealistic 4k')}`;
  const getCardImage = (prompt: string) => `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + ' high quality')}`;

  return (
    <div className="space-y-8 pb-12">
      {/* Input Section */}
      <div className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Plane className="text-blue-500" />
          Plan Your Journey
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Destination</label>
            <input 
              type="text" 
              placeholder="e.g., Kyoto, Japan"
              className="w-full p-3 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
              value={request.destination}
              onChange={(e) => setRequest({...request, destination: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Origin</label>
            <input 
              type="text" 
              placeholder="e.g., London, UK"
              className="w-full p-3 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
              value={request.origin}
              onChange={(e) => setRequest({...request, origin: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Dates / Duration</label>
            <input 
              type="text" 
              placeholder="e.g., 7 days in October"
              className="w-full p-3 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
              value={request.dates}
              onChange={(e) => setRequest({...request, dates: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Budget</label>
            <select 
              className="w-full p-3 bg-slate-800 border border-slate-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
              value={request.budget}
              onChange={(e) => setRequest({...request, budget: e.target.value as any})}
            >
              <option>Budget</option>
              <option>Moderate</option>
              <option>Luxury</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Travelers</label>
            <input 
              type="text" 
              placeholder="e.g., 2 Adults"
              className="w-full p-3 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
              value={request.travelers}
              onChange={(e) => setRequest({...request, travelers: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Interests</label>
            <input 
              type="text" 
              placeholder="e.g., Temples, Sushi, Anime"
              className="w-full p-3 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
              value={request.interests}
              onChange={(e) => setRequest({...request, interests: e.target.value})}
            />
          </div>
        </div>
        
        <button 
          onClick={handlePlan}
          disabled={loading || !request.destination}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20 group"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} className="group-hover:scale-110 transition-transform" />}
          Generate Visual Itinerary
        </button>
      </div>

      {/* Results Section */}
      {itinerary && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Hero Header */}
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl group">
            <img 
                src={getHeroImage(itinerary.destination)} 
                alt={itinerary.destination}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-10 max-w-3xl">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 shadow-black drop-shadow-lg">{itinerary.destination}</h3>
                <p className="text-lg text-slate-200 leading-relaxed drop-shadow-md">{itinerary.summary}</p>
            </div>
          </div>

          {/* Top Suggestions Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Accommodation */}
            <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden hover:border-slate-700 transition-colors shadow-lg">
                <div className="h-40 overflow-hidden relative">
                     <img src={getCardImage(itinerary.accommodation.imagePrompt || itinerary.accommodation.name)} className="w-full h-full object-cover" alt="Hotel" />
                     <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-emerald-400 border border-emerald-500/30">
                        {itinerary.accommodation.priceRange}
                     </div>
                </div>
                <div className="p-5">
                    <div className="flex items-center gap-2 mb-2 text-emerald-400">
                        <BedDouble size={18} />
                        <span className="text-xs font-bold uppercase tracking-wider">Where to Stay</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1">{itinerary.accommodation.name}</h4>
                    <p className="text-sm text-slate-400">{itinerary.accommodation.description}</p>
                </div>
            </div>

            {/* Transport */}
            <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden hover:border-slate-700 transition-colors shadow-lg">
                <div className="h-40 overflow-hidden relative">
                     <img src={getCardImage(itinerary.transport.imagePrompt || itinerary.transport.name)} className="w-full h-full object-cover" alt="Transport" />
                </div>
                <div className="p-5">
                    <div className="flex items-center gap-2 mb-2 text-blue-400">
                        <BusFront size={18} />
                        <span className="text-xs font-bold uppercase tracking-wider">How to Move</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1">{itinerary.transport.name}</h4>
                    <p className="text-sm text-slate-400">{itinerary.transport.description}</p>
                </div>
            </div>

             {/* Local Dish */}
             <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden hover:border-slate-700 transition-colors shadow-lg">
                <div className="h-40 overflow-hidden relative">
                     <img src={getCardImage(itinerary.localDish.imagePrompt || itinerary.localDish.name)} className="w-full h-full object-cover" alt="Food" />
                     <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-orange-400 border border-orange-500/30">
                        Must Try
                     </div>
                </div>
                <div className="p-5">
                    <div className="flex items-center gap-2 mb-2 text-orange-400">
                        <UtensilsCrossed size={18} />
                        <span className="text-xs font-bold uppercase tracking-wider">What to Eat</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1">{itinerary.localDish.name}</h4>
                    <p className="text-sm text-slate-400">{itinerary.localDish.description}</p>
                </div>
            </div>
          </div>

          <div className="h-px bg-slate-800 my-8" />

          {/* Timeline */}
          <h3 className="text-2xl font-bold text-white mb-6 pl-2 border-l-4 border-blue-500">Daily Itinerary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itinerary.days.map((day) => (
              <DayItineraryCard key={day.day} dayPlan={day} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TripPlanner;