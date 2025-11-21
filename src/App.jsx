import React from 'react';
import Header from "./components/Header.jsx";
import Hero from "./sections/Hero.jsx";
import Contact from "./sections/Contact.jsx";
import Leistungen from "./sections/Leistungen.jsx";
import Geschichte from "./sections/Geschichte.jsx";
import Werte from "./sections/Werte.jsx";
import { useWordPressData } from "./hooks/useWordPressData.js";

const pickByPrefixes = (source, prefixes, exact = []) => {
  if (!source) return {};
  return Object.entries(source).reduce((acc, [key, value]) => {
    if (prefixes.some((prefix) => key.startsWith(prefix)) || exact.includes(key)) {
      acc[key] = value;
    }
    return acc;
  }, {});
};

export default function App() {
  const { data, loading } = useWordPressData();
  
  if (loading) {
      return (
          <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
              <div className="text-xl font-semibold text-yellow-400 animate-pulse">Lade Inhalte von WordPress...</div>
          </div>
      );
  }

  const wpData = data || {};

  const heroData = pickByPrefixes(wpData, ["hero_"], ["footer_text"]);
  const valuesData = pickByPrefixes(
    wpData,
    ["values_", "val_item_"],
    ["footer_text"]
  );
  const servicesData = pickByPrefixes(wpData, ["services_"]);
  const historyData = pickByPrefixes(wpData, ["history_"]);
  const contactData = pickByPrefixes(wpData, ["contact_"]);

  return (
    <div className="bg-gray-950 relative">
      {/* --- Styles und Hintergrundeffekte bleiben unverändert --- */}
      <style>{`
        .global-floating-lines { position: fixed; inset: 0; pointer-events: none; overflow: hidden; z-index: 5; }
        .global-floating-line { position: absolute; background: linear-gradient(90deg, transparent, #C8AA69, #FFD700, #C8AA69, transparent); height: 1px; width: 300px; opacity: 0.25; animation: global-float-line 25s ease-in-out infinite; }
        .global-floating-line:nth-child(2) { animation-delay: -3s; top: 8%; width: 200px; animation-duration: 22s; }
        .global-floating-line:nth-child(3) { animation-delay: -6s; top: 16%; width: 250px; animation-duration: 28s; }
        .global-floating-line:nth-child(4) { animation-delay: -9s; top: 24%; width: 180px; animation-duration: 24s; }
        .global-floating-line:nth-child(5) { animation-delay: -12s; top: 32%; width: 220px; animation-duration: 26s; }
        .global-floating-line:nth-child(6) { animation-delay: -15s; top: 40%; width: 190px; animation-duration: 23s; }
        .global-floating-line:nth-child(7) { animation-delay: -18s; top: 48%; width: 240px; animation-duration: 27s; }
        .global-floating-line:nth-child(8) { animation-delay: -21s; top: 56%; width: 170px; animation-duration: 21s; }
        .global-floating-line:nth-child(9) { animation-delay: -24s; top: 64%; width: 210px; animation-duration: 25s; }
        .global-floating-line:nth-child(10) { animation-delay: -27s; top: 72%; width: 260px; animation-duration: 29s; }
        .global-floating-line:nth-child(11) { animation-delay: -30s; top: 80%; width: 200px; animation-duration: 22s; }
        .global-floating-line:nth-child(12) { animation-delay: -33s; top: 88%; width: 230px; animation-duration: 26s; }
        @keyframes global-float-line {
          0%, 100% { transform: translateX(-150px) translateY(0px); opacity: 0; }
          8% { opacity: 0.25; }
          15% { transform: translateX(10vw) translateY(-10px); opacity: 0.3; }
          50% { transform: translateX(50vw) translateY(-20px); opacity: 0.28; }
          85% { transform: translateX(90vw) translateY(-10px); opacity: 0.25; }
          92% { opacity: 0; }
        }
      `}</style>

      <div className="global-floating-lines">
        {[...Array(12)].map((_, index) => (<div key={index} className="global-floating-line" />))}
      </div>

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-1800/50 via-sky-1800/80 to-sky-1500" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-sky-1000/30 to-sky-800/20" />
        <div className="absolute -right-16 top-1/4 h-72 w-72 rounded-full bg-yellow-400/40 blur-[120px]" />
        <div className="absolute top-16 left-20 h-56 w-56 rounded-full bg-yellow-300/35 blur-[100px]" />
        <div className="absolute bottom-1/3 left-12 h-64 w-64 rounded-full bg-yellow-500/35 blur-[110px]" />
        <div className="absolute bottom-16 right-1/3 h-80 w-80 rounded-full bg-yellow-400/30 blur-[130px]" />
        <div className="absolute top-1/2 right-20 h-48 w-48 rounded-full bg-sky-400/25 blur-[90px]" />
        <div className="absolute top-3/4 left-1/2 h-40 w-40 rounded-full bg-sky-300/20 blur-[80px]" />
        <div className="absolute top-1/3 left-2/3 h-44 w-44 rounded-full bg-sky-300/20 blur-[85px]" />
      </div>
      
      <Header />
      
      {/* Wir übergeben immer das gesamte globalData Objekt */}
      <Hero data={Object.keys(heroData).length ? heroData : null} />
      <Werte data={Object.keys(valuesData).length ? valuesData : null} />
      <Leistungen data={Object.keys(servicesData).length ? servicesData : null} />
      <Geschichte data={Object.keys(historyData).length ? historyData : null} />
      <Contact data={Object.keys(contactData).length ? contactData : null} />
    </div>
  );
}