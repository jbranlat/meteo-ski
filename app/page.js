"use client";

import React, { useState, useEffect } from 'react';
import { STATIONS, WEATHER_CONFIG } from '@/constants/weather';
import StationPicker from '@/components/StationPicker';
import WeatherCard from '@/components/WeatherCard';
import ForecastSlider from '@/components/ForecastSlider';
import SnowDepths from '@/components/SnowDepths';

export default function Home() {
  const [activeStation, setActiveStation] = useState(STATIONS[0]);
  const [data, setData] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    setData(null);
    setError(false);
    
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${activeStation.lat}&longitude=${activeStation.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,snowfall_sum,wind_speed_10m_max,wind_gusts_10m_max&hourly=snow_depth&timezone=auto&forecast_days=16`;
    
    fetch(url)
      .then(res => {
        if(!res.ok) throw new Error();
        return res.json();
      })
      .then(json => setData(json))
      .catch(() => setError(true));
  }, [activeStation]);

  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">Erreur de chargement.</div>;
  if (!data) return <div className="min-h-screen flex items-center justify-center font-black text-slate-400 animate-pulse">CHARGEMENT...</div>;

  const current = {
    date: data.daily.time[selectedIndex],
    code: data.daily.weather_code[selectedIndex],
    tMax: data.daily.temperature_2m_max[selectedIndex],
    tMin: data.daily.temperature_2m_min[selectedIndex],
    wind: data.daily.wind_speed_10m_max[selectedIndex],
    gusts: data.daily.wind_gusts_10m_max?.[selectedIndex] || 0,
    snow: data.daily.snowfall_sum[selectedIndex] || 0,
    SnowHeight : data.hourly.snow_depth[0] || 0,
  };

  const weatherConfig = WEATHER_CONFIG[current.code] || WEATHER_CONFIG[0];

  const snowHeight = Math.round(current.SnowHeight * 100 * (activeStation.coef || 1));

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans text-slate-900">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="max-w-xl mx-auto">
        <StationPicker 
          stations={STATIONS} 
          activeId={activeStation.id} 
          onSelect={(s) => { setActiveStation(s); setSelectedIndex(0); }} 
        />

        <header className="mb-6">
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">
            Météo<span className="text-blue-600 italic"> {activeStation.name}</span>
          </h1>
        </header>

{/* --- BLOC HAUTEURS DE NEIGE --- */}
        <SnowDepths snow={snowHeight} />

        <WeatherCard current={current} config={weatherConfig} realSnow={snowHeight} />
        
        <ForecastSlider 
          dailyData={data.daily} 
          selectedIndex={selectedIndex} 
          onSelect={setSelectedIndex} 
        />
      </div>
    </main>
  );
}