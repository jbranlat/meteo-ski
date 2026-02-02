import { Sun, CloudSun, Cloud, CloudRain, CloudRainWind, Snowflake, CloudSnow, CloudLightning, CloudFog, HelpCircle } from 'lucide-react';

export const STATIONS = [
  { id: "sl", name: "Saint-Lary", lat: 42.8330, lon: 0.2576, coef: 1.7 },
  { id: "py", name: "Peyragudes", lat: 42.79, lon: 0.44, coef: 1.4 },
  { id: "pe", name: "Piau Engaly", lat: 42.78, lon: 0.15, coef: 2.2 },
/*  { id: "tg", name: "Tourmalet", lat: 42.91, lon: 0.14, coef: 2.0 }, */
  { id: "ca", name: "Cauterets", lat: 42.88, lon: -0.11, coef: 2.3 },
  { id: "go", name: "Gourette", lat: 42.95, lon: -0.33, coef: 2.2 },
  { id: "lm", name: "La Mongie", lat: 42.91, lon: 0.18, coef: 2.1 },
  { id: "ax", name: "Ax 3 Domaines", lat: 42.70, lon: 1.81, coef: 2.0 },
  { id: "fr", name: "Font Romeu", lat: 42.52, lon: 2.04, coef: 1.8 },
  { id: "la", name: "Les Angles", lat: 42.57, lon: 2.07, coef: 1.9 }
];

export const WEATHER_CONFIG = {
  0:  { label: "Ciel dégagé", icon: Sun, color: "text-yellow-500", bg: "bg-yellow-50" },
  1:  { label: "Principalement clair", icon: CloudSun, color: "text-yellow-400", bg: "bg-yellow-50" },
  2:  { label: "Partiellement nuageux", icon: CloudSun, color: "text-slate-400", bg: "bg-slate-50" },
  3:  { label: "Couvert", icon: Cloud, color: "text-slate-500", bg: "bg-slate-50" },
  45: { label: "Brouillard", icon: CloudFog, color: "text-slate-400", bg: "bg-slate-100" },
  48: { label: "Brouillard givrant", icon: CloudFog, color: "text-blue-300", bg: "bg-blue-50" },
  51: { label: "Bruine légère", icon: CloudRain, color: "text-blue-300", bg: "bg-blue-50" },
  53: { label: "Bruine modérée", icon: CloudRain, color: "text-blue-400", bg: "bg-blue-50" },
  55: { label: "Bruine dense", icon: CloudRain, color: "text-blue-500", bg: "bg-blue-50" },
  56: { label: "Bruine verglaçante", icon: Snowflake, color: "text-blue-400", bg: "bg-blue-50" },
  61: { label: "Pluie faible", icon: CloudRain, color: "text-blue-400", bg: "bg-blue-50" },
  63: { label: "Pluie modérée", icon: CloudRain, color: "text-blue-500", bg: "bg-blue-100" },
  65: { label: "Forte pluie", icon: CloudRainWind, color: "text-blue-700", bg: "bg-blue-100", animate: "animate-bounce" },
  66: { label: "Pluie verglaçante", icon: Snowflake, color: "text-cyan-500", bg: "bg-cyan-50" },
  71: { label: "Neige légère", icon: Snowflake, color: "text-blue-200", bg: "bg-blue-50" },
  73: { label: "Neige modérée", icon: Snowflake, color: "text-blue-400", bg: "bg-blue-50", animate: "animate-pulse" },
  75: { label: "Grosses chutes", icon: Snowflake, color: "text-blue-600", bg: "bg-blue-100", animate: "animate-bounce" },
  77: { label: "Grains de neige", icon: Snowflake, color: "text-slate-400", bg: "bg-slate-50" },
  80: { label: "Averses de pluie", icon: CloudRain, color: "text-blue-500", bg: "bg-blue-50" },
  81: { label: "Fortes averses", icon: CloudRainWind, color: "text-blue-600", bg: "bg-blue-100" },
  82: { label: "Averses violentes", icon: CloudRainWind, color: "text-blue-800", bg: "bg-blue-200" },
  85: { label: "Averses de neige", icon: CloudSnow, color: "text-blue-300", bg: "bg-blue-50" },
  86: { label: "Fortes chutes", icon: CloudSnow, color: "text-blue-500", bg: "bg-blue-100", animate: "animate-bounce" },
  95: { label: "Orage", icon: CloudLightning, color: "text-purple-600", bg: "bg-purple-50", animate: "animate-pulse" },
  96: { label: "Orage & Grêle", icon: CloudLightning, color: "text-purple-800", bg: "bg-purple-100" },
};
