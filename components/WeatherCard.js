import { motion, AnimatePresence } from 'framer-motion';
import { Star, Wind, Sparkles, Zap } from 'lucide-react';

export default function WeatherCard({ current, config, realSnow }) {
  const getSkiIndex = () => {
    let score = 0;
    const snowHaut = realSnow || 0;
    const wind = current.wind || 0;
    const gusts = current.gusts || 0;
    const code = current.code;

    // 1. BASE NEIGE (Max 5 pts)
    if (snowHaut > 100) score += 5;
    else if (snowHaut > 40) score += 3;
    else if (snowHaut > 10) score += 1;
    else return 0;

    // 2. MÉTÉO & VISIBILITÉ (Max 5 pts)
    if ([0, 1].includes(code)) score += 5;
    else if ([2, 3].includes(code)) score += 4;
    else if ([71, 73, 75, 85, 86].includes(code)) score += 3;
    else if ([51, 61, 80, 45, 48].includes(code)) score -= 2;
    else if (code > 61) score -= 5;

    // 3. LE VENT & RAFALES
    if (gusts > 80 || wind > 60) score = 1;
    else if (gusts > 50) score -= 2;
    return Math.min(Math.max(Math.round(score), 0), 10);
  };

  const skiScore = getSkiIndex();
  const isPowderDay = current.snow > 10;
  const isArome = current.model === "AROME";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${current.date}-${config.label}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className={`rounded-[3rem] p-8 shadow-2xl border transition-colors duration-500 relative overflow-hidden mb-8 ${
          isPowderDay ? 'bg-cyan-50 border-cyan-200' : 'bg-white border-white'
        }`}
      >
        {/* BADGE DE SOURCE MÉTÉO (AROME / IFS) */}
        <div className="absolute top-6 right-8 flex flex-col items-end z-20">
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase shadow-sm transition-all ${
            isArome 
              ? 'bg-blue-600 text-white ring-4 ring-blue-50' 
              : 'bg-slate-100 text-slate-400'
          }`}>
            {isArome && <Zap size={10} className="fill-white animate-pulse" />}
            {current.model}
          </div>
        </div>

        {/* Icône de fond décorative */}
        <div className={`absolute top-0 right-0 p-8 opacity-10 ${config.color} z-0`}>
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
                <div className={`flex items-center gap-1 ${skiScore > 7 ? 'bg-green-500' : skiScore > 4 ? 'bg-yellow-400' : 'bg-red-500'} text-white px-2 py-0.5 rounded-full text-[10px] font-black shadow-sm italic`}>
                  <Star size={10} className="fill-white" /> {skiScore}/10
                </div>

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
                  {skiScore > 8 ? "Condition optimale" : skiScore > 5 ? "Bonnes conditions" : "conditions moyennes"}
                </span>
              </div>
            </div>
          </div>

          <div className={`grid ${current.snow > 0 ? 'grid-cols-3' : 'grid-cols-2'} gap-2 sm:gap-4 border-t border-slate-50 pt-6`}>
            {/* Températures */}
            <div className="text-left">
              <p className="text-[8px] sm:text-[9px] font-black text-slate-300 uppercase mb-1">Températures</p>
              <div className="flex items-baseline gap-1 sm:gap-2">
                <span className="text-md sm:text-lg font-bold text-blue-400/70">{Math.round(current.tMin)}°</span>
                <span className="text-xl sm:text-2xl font-black text-red-500">{Math.round(current.tMax)}°</span>
              </div>
            </div>

            {/* Vent & Rafales */}
            <div className="text-left border-l border-inherit pl-2 sm:pl-4">
              <p className="text-[8px] sm:text-[9px] font-black text-slate-300 uppercase mb-1 flex items-center gap-1 whitespace-nowrap">
                <Wind size={10} /> Vent moyen (Rafales)
              </p>
              <div className="flex items-baseline flex-nowrap gap-0.5 sm:gap-1 whitespace-nowrap">
                <span className="text-xl sm:text-2xl font-black text-slate-700">
                  {Math.round(current.wind)}
                  <span className="text-[8px] sm:text-[10px] font-bold text-slate-400 ml-0.5">Km/h</span>
                </span>
                <span className="text-xs sm:text-sm font-bold text-red-400">
                  ({Math.round(current.gusts)}<span className="text-[7px] sm:text-[9px] ml-0.5">Kmh</span>)
                </span>
              </div>
            </div>

            {/* Neige Fraîche */}
            {current.snow > 0.9 && (
              <div className="text-right border-l border-inherit pl-2 sm:pl-4">
                <p className="text-[8px] sm:text-[9px] font-black text-slate-300 uppercase mb-1">Neige</p>
                <p className="text-xl sm:text-2xl font-black text-cyan-500 animate-pulse whitespace-nowrap">
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