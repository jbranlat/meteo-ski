import { motion, AnimatePresence } from 'framer-motion';
import { Star, Wind, Mountain, Sparkles } from 'lucide-react';
import { calculateSkiScore } from '@/constants/weather';

export default function WeatherCard({ current, config }) {
  const skiScore = calculateSkiScore(current);
  const isPowderDay = current.snow > 10;
  
  // Calcul dynamique de la hauteur de neige (logique de ton code initial)
  const baseHeight = 80 + (current.snow * 1.5);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${current.date}-${config.label}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
       className={`rounded-[3rem] p-8 shadow-2xl border transition-colors duration-500 relative overflow-hidden mb-8 ${
          isPowderDay 
            ? 'bg-cyan-50 border-cyan-200' 
            : 'bg-white border-white'
        }`}
      >
        {/* Icône de fond décorative */}
        <div className={`absolute top-0 right-0 p-8 opacity-10 ${config.color}`}>
          <config.icon size={140} />
        </div>

        <div className="relative z-10">
          <p className="text-blue-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-2 italic">
            {new Date(current.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
          
          <div className="flex items-center gap-6 mb-8">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`p-5 rounded-[2rem] shadow-inner ${config.bg} ${config.color}`}
            >
              <config.icon size={48} className={config.animate} />
            </motion.div>
            <div>
              <h2 className="text-4xl font-black leading-none uppercase italic tracking-tighter">{config.label}</h2>
              <div className="flex items-center gap-2 mt-2">
                <div className={`flex items-center gap-1 ${Number(skiScore) > 7 ? 'bg-green-500' : Number(skiScore) > 4 ? 'bg-yellow-400' : 'bg-red-500'} text-white px-2 py-0.5 rounded-full text-[10px] font-black shadow-sm italic`}>
                  <Star size={10} className="fill-white" /> {skiScore}/10
                </div>  
{/* --- NOUVEAU : BADGE POUDREUSE --- */}
                {isPowderDay && (
                  <motion.div 
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="flex items-center gap-1 bg-cyan-500 text-white px-2 py-0.5 rounded-full text-[10px] font-black shadow-md italic border border-cyan-400"
                  >
                    <Sparkles size={10} className="fill-white" /> ALERTE POUDREUSE
                  </motion.div>
                )}

                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                  {Number(skiScore) > 8 ? "Condition optimale" : Number(skiScore) > 5 ? "Bonnes conditions" : "conditions moyennes"}
                </span>
              </div>
            </div>
          </div>

          {/* GRILLE DES DONNÉES : Température | Vent | Neige */}
          <div className={`grid ${current.snow > 0 ? 'grid-cols-3' : 'grid-cols-2'} gap-4 border-t border-slate-50 pt-8`}>
            
            {/* Colonne 1 : Températures */}
            <div className="text-left">
              <p className="text-[9px] font-black text-slate-300 uppercase mb-2">Températures</p>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-blue-400/70">{Math.round(current.tMin)}°</span>
                <span className="text-2xl font-black text-red-500">{Math.round(current.tMax)}°</span>
              </div>
            </div>

            {/* Colonne 2 : Vent et Rafales */}
            <div className="text-left border-l border-inherit pl-4">
              <p className="text-[9px] font-black text-slate-300 uppercase mb-2 flex items-center gap-1">
                <Wind size={10}/> Vent moyen (Rafales)
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-700">
                  {Math.round(current.wind)} <small className="text-[10px] uppercase text-slate-400 font-bold">km/h</small>
                </span>
                <span className="text-lg font-bold text-red-400">({Math.round(current.gusts)})</span>
              </div>
            </div>

            {/* Colonne 3 : Neige Fraîche (Conditionnelle) */}
            {current.snow > 0 && (
              <div className="text-right border-l pl-4 border-inherit">
                <p className="text-[9px] font-black text-slate-300 uppercase mb-2">Neige Fraîche</p>
                <p className="text-2xl font-black text-cyan-500 animate-pulse">
                  +{current.snow.toFixed(0)}cm
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}