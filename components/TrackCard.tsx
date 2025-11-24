import React from 'react';
import { DayPlan, Activity } from '../types';
import { Clock, MapPin, Utensils, Bus, Camera, Coffee } from 'lucide-react';

interface DayItineraryCardProps {
  dayPlan: DayPlan;
}

const ActivityIcon = ({ type }: { type: Activity['type'] }) => {
  switch (type) {
    case 'food': return <Utensils size={16} className="text-orange-400" />;
    case 'transport': return <Bus size={16} className="text-blue-400" />;
    case 'sightseeing': return <Camera size={16} className="text-purple-400" />;
    case 'relax': return <Coffee size={16} className="text-emerald-400" />;
    default: return <MapPin size={16} className="text-slate-400" />;
  }
};

const DayItineraryCard: React.FC<DayItineraryCardProps> = ({ dayPlan }) => {
  const getImageUrl = (prompt: string) => `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + ' minimalist')}`;

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-lg overflow-hidden h-full flex flex-col">
      <div className="bg-slate-800/50 p-4 border-b border-slate-700">
        <h3 className="font-bold text-lg text-white">Day {dayPlan.day}</h3>
        <p className="text-sm text-blue-300 font-medium">{dayPlan.theme}</p>
      </div>
      <div className="divide-y divide-slate-800 flex-grow">
        {dayPlan.activities.map((activity, idx) => (
          <div key={idx} className="p-4 hover:bg-slate-800/30 transition-colors group">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wide">
              <Clock size={12} />
              {activity.time}
            </div>
            <div className="flex gap-4">
              <div className="mt-1 flex-shrink-0 relative">
                 <div className="bg-slate-800 p-2 rounded-full h-8 w-8 flex items-center justify-center border border-slate-700 z-10 relative">
                    <ActivityIcon type={activity.type} />
                 </div>
                 {/* Timeline line */}
                 {idx !== dayPlan.activities.length - 1 && (
                     <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-full bg-slate-800" />
                 )}
              </div>
              
              <div className="flex-grow">
                <h4 className="font-semibold text-slate-200">{activity.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed mb-2">{activity.description}</p>
                
                <div className="flex items-center justify-between mt-2">
                    {activity.location && (
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                        <MapPin size={10} />
                        {activity.location}
                    </div>
                    )}
                </div>
                
                {/* Contextual Image */}
                <div className="mt-3 rounded-lg overflow-hidden h-24 w-full relative opacity-80 group-hover:opacity-100 transition-opacity">
                     <img 
                       src={getImageUrl(activity.imagePrompt || activity.title)}
                       alt={activity.title}
                       className="w-full h-full object-cover"
                       loading="lazy"
                     />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayItineraryCard;