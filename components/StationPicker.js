export default function StationPicker({ stations, activeId, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-2">
      {stations.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
            activeId === s.id 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'bg-white text-slate-400 hover:bg-slate-50 shadow-sm border border-white'
          }`}
        >
          {s.name}
        </button>
      ))}
    </div>
  );
}