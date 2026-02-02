"use client";

import React, { useState, useEffect, useMemo } from 'react';
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
    
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${activeStation.lat}&longitude=${activeStation.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,snowfall_sum,wind_speed_10m_max,wind_gusts_10m_max&hourly=snow_depth&models=arome_france,ecmwf_ifs&timezone=auto&forecast_days=15`;
      
    fetch(url)
      .then(res => {
        if(!res.ok) throw new Error();
        return res.json();
      })
      .then(json => setData(json))
      .catch(() => setError(true));
  }, [activeStation]);

  // Génération des données traitées (mélange AROME / IFS)
  const processedDaily = useMemo(() => {
    if (!data) return [];

    return data.daily.time.map((time, i) => {
      // On vérifie si AROME a des données pour ce jour là (généralement J et J+1)
      const aromeCode = data.daily[`weather_code_arome_france`]?.[i];
      const isArome = aromeCode !== null && aromeCode !== undefined;
      const suffix = isArome ? '_arome_france' : '_ecmwf_ifs';

      return {
        time,
        weather_code: data.daily[`weather_code${suffix}`][i],
        temperature_2m_max: data.daily[`temperature_2m_max${suffix}`][i],
        temperature_2m_min: data.daily[`temperature_2m_min${suffix}`][i],
        wind_speed_10m_max: data.daily[`wind_speed_10m_max${suffix}`][i],
        wind_gusts_10m_max: data.daily[`wind_gusts_10m_max${suffix}`][i],
        snowfall_sum: data.daily[`snowfall_sum${suffix}`][i],
        modelLabel: isArome ? "AROME" : "IFS"
      };
    });
  }, [data]);

  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">Erreur de chargement.</div>;
  if (!data || processedDaily.length === 0) return <div className="min-h-screen flex items-center justify-center font-black text-slate-400 animate-pulse">CHARGEMENT...</div>;

  // Données du jour sélectionné
  const selectedDay = processedDaily[selectedIndex];

  // Pour la hauteur de neige (Hourly), on garde la même logique de priorité
  const aromeSnowHeight = data.hourly[`snow_depth_arome_france`]?.[0];
  const rawSnowHeight = (aromeSnowHeight !== null && aromeSnowHeight !== undefined) 
    ? aromeSnowHeight 
    : data.hourly[`snow_depth_ecmwf_ifs`][0];
  
  const current = {
    date: selectedDay.time,
    code: selectedDay.weather_code,
    tMax: selectedDay.temperature_2m_max,
    tMin: selectedDay.temperature_2m_min,
    wind: selectedDay.wind_speed_10m_max,
    gusts: selectedDay.wind_gusts_10m_max || 0,
    snow: selectedDay.snowfall_sum || 0,
    model: selectedDay.modelLabel,
    isArome: selectedDay.modelLabel === "AROME"
  };

  const weatherConfig = WEATHER_CONFIG[current.code] || WEATHER_CONFIG[0];
  const snowHeight = Math.round(rawSnowHeight * 100 * (activeStation.coef || 1));

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
          <p className="text-[9px] font-bold text-slate-400">SOURCE : {current.model} {current.isArome && " 1.3km"}</p>
        </header>

        <SnowDepths snow={snowHeight} />

        <WeatherCard current={current} config={weatherConfig} realSnow={snowHeight} modelLabel={current.model} />
        
        <ForecastSlider 
          dailyData={processedDaily} 
          selectedIndex={selectedIndex} 
          onSelect={setSelectedIndex} 
        />
      </div>
    </main>
  );
}