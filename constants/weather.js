import { Sun, CloudSun, Cloud, CloudRain, CloudRainWind, Snowflake, CloudSnow, CloudLightning, CloudFog, HelpCircle } from 'lucide-react';

export const STATIONS = [
  { id: "sl", name: "Saint-Lary", lat: 42.81381462046377 , lon: 0.265887911099143 , coef: 1.3 },
  { id: "py", name: "Peyragudes", lat: 42.785, lon: 0.4430, coef: 1.2 },
  { id: "pe", name: "Piau Engaly", lat: 42.7750, lon: 0.145, coef: 1.15 },
  { id: "ca", name: "Cauterets", lat: 42.8715, lon: -0.1585, coef: 3.3 },
  { id: "go", name: "Gourette", lat: 42.9465, lon: -0.3340, coef: 1.0 },
  { id: "lm", name: "La Mongie", lat: 42.9030, lon: 0.1555, coef: 1.3 },
  { id: "p2", name: "Pyrénées 2000", lat: 42.5185, lon: 2.0545, coef: 1.7 },
  { id: "la", name: "Les Angles", lat: 42.5645, lon: 2.0455, coef: 1.5 }
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
