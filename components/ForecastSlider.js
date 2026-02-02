import { WEATHER_CONFIG } from '@/constants/weather';

export default function ForecastSlider({ dailyData, selectedIndex, onSelect }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar py-2 px-2">
      {dailyData.map((day, i) => {
        const code = day.weather_code;
        const active = selectedIndex === i;
        const config = WEATHER_CONFIG[code] || WEATHER_CONFIG[0];
        const MiniIcon = config.icon;

        return (
          <button
            key={day.time}
            onClick={() => onSelect(i)}
            className={`flex-shrink-0 w-28 p-5 rounded-[2.5rem] transition-all duration-300 flex flex-col items-center gap-3 border shadow-sm ${
              active 
                ? 'bg-slate-900 border-slate-900 text-white shadow-xl scale-110' 
                : 'bg-white border-white text-slate-400'
            }`}
          >
            <p className="text-[10px] font-bold uppercase">
              {new Date(day.time).toLocaleDateString('fr-FR', { weekday: 'short' })}
            </p>

            {/* Gestion dynamique de la couleur de l'icône */}
            {(() => {
              let iconColor = "text-slate-300"; // Couleur par défaut inactif

              if (active) {
                if (code <= 1) iconColor = "text-yellow-400"; // Soleil
                else if ([71, 73, 75, 85, 86].includes(code)) iconColor = "text-blue-400"; // Neige
                else iconColor = "text-slate-400"; // Gris
              }

              return (
                <MiniIcon 
                  size={24} 
                  className={`${iconColor} transition-colors duration-300`} 
                />
              );
            })()}

            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-bold ${active ? 'text-blue-300' : 'text-slate-300'}`}>
                {Math.round(day.temperature_2m_min)}°
              </span>
              <span className="text-sm font-black italic">
                {Math.round(day.temperature_2m_max)}°
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}