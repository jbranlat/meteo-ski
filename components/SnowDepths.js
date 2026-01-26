import { Mountain } from 'lucide-react';

export default function SnowDepths({ snow }) {
  // Ta logique initiale : 80cm de base + bonus selon les chutes
  const baseHeight = 80 + (snow * 1.5);

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {/* Pied de pistes */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-white flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-xl text-white">
          <Mountain size={18} />
        </div>
        <div>
          <p className="text-[8px] font-black text-slate-400 uppercase leading-none mb-1">
            Pied de pistes
          </p>
          <p className="text-lg font-black text-slate-700">
            {Math.round(baseHeight)} cm
          </p>
        </div>
      </div>

      {/* Sommet */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-white flex items-center gap-3">
        <div className="bg-slate-800 p-2 rounded-xl text-white">
          <Mountain size={18} />
        </div>
        <div>
          <p className="text-[8px] font-black text-slate-400 uppercase leading-none mb-1">
            Sommet
          </p>
          <p className="text-lg font-black text-slate-700">
            {Math.round(baseHeight * 1.9)} cm
          </p>
        </div>
      </div>
    </div>
  );
}