import { Sun, CloudSun, Cloud, CloudRain, CloudRainWind, Snowflake, CloudSnow, CloudLightning, CloudFog, HelpCircle } from 'lucide-react';

export const STATIONS = [
  { id: "sl", name: "Saint-Lary", lat: 42.82, lon: 0.32 },
  { id: "py", name: "Peyragudes", lat: 42.79, lon: 0.44 },
  { id: "pe", name: "Piau Engaly", lat: 42.78, lon: 0.15 },
  { id: "tg", name: "Tourmalet", lat: 42.91, lon: 0.14 },
  { id: "ca", name: "Cauterets", lat: 42.88, lon: -0.11 },
  { id: "go", name: "Gourette", lat: 42.95, lon: -0.33 },
  { id: "lm", name: "La Mongie", lat: 42.91, lon: 0.18 },
  { id: "ax", name: "Ax 3 Domaines", lat: 42.70, lon: 1.81 },
  { id: "fr", name: "Font Romeu", lat: 42.52, lon: 2.04 },
  { id: "la", name: "Les Angles", lat: 42.57, lon: 2.07 }
];

export const WEATHER_CONFIG = {
  0: { label: "Ciel dégagé", icon: Sun, color: "text-yellow-500", bg: "bg-yellow-50" },
  1: { label: "Principalement clair", icon: CloudSun, color: "text-yellow-400", bg: "bg-yellow-50" },
  2: { label: "Partiellement nuageux", icon: CloudSun, color: "text-slate-400", bg: "bg-slate-50" },
  3: { label: "Couvert", icon: Cloud, color: "text-slate-500", bg: "bg-slate-50" },
  45: { label: "Brouillard", icon: CloudFog, color: "text-slate-400", bg: "bg-slate-100" },
  61: { label: "Pluie faible", icon: CloudRain, color: "text-blue-400", bg: "bg-blue-50" },
  71: { label: "Neige légère", icon: Snowflake, color: "text-blue-200", bg: "bg-blue-50" },
  73: { label: "Neige modérée", icon: Snowflake, color: "text-blue-400", bg: "bg-blue-50", animate: "animate-pulse" },
  75: { label: "Grosses chutes", icon: Snowflake, color: "text-blue-600", bg: "bg-blue-100", animate: "animate-bounce" },
  85: { label: "Averses de neige", icon: CloudSnow, color: "text-blue-300", bg: "bg-blue-50" },
  95: { label: "Orage", icon: CloudLightning, color: "text-purple-600", bg: "bg-purple-50", animate: "animate-pulse" },
};

export const calculateSkiScore = (current) => {
  let score = 10;
  score -= (current.wind / 15);
  if (current.gusts > 44) score -= 1;
  if (current.tMin > 5) score -= (current.tMin - 5) * 0.8;
  if (current.snow > 0) score += 1.5;
  const rainCodes = [51, 53, 55, 61, 63, 65, 80, 81, 82];
  if (rainCodes.includes(current.code)) score -= 4;
  return Math.max(0, Math.min(10, score)).toFixed(0);
};