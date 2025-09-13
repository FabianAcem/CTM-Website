import React, { useEffect, useState } from "react";
import { Truck, ShieldCheck, Globe } from "lucide-react";

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden bg-gray-950 text-white">
      {/* 🔹 Linien & Pfeilspitzen */}
      <style>{`
        .animate-lines .line { animation: shoot-arrow linear infinite; }

        @keyframes shoot-arrow {
          0% { transform: translateX(-120%) scaleX(0.4); opacity: 0; }
          12% { transform: translateX(-10%) scaleX(0.85); opacity: var(--line-opacity); }
          50% { transform: translateX(50%) scaleX(1); opacity: var(--line-opacity); }
          88% { transform: translateX(120%) scaleX(0.85); opacity: var(--line-opacity); }
          100% { transform: translateX(200%) scaleX(0.4); opacity: 0; }
        }

        .line {
          position: absolute;
          height: var(--line-height);
          width: 60vw;                 /* kürzer auf Mobile */
          background-color: var(--line-color);
          opacity: var(--line-opacity);
          border-radius: 9999px;
          transform-origin: left center;
          will-change: transform, opacity;
          transform: translateX(-120%) scaleX(0.4);
        }
        /* ab SM etwas länger, ab LG wie gehabt */
        @media (min-width: 640px) { .line { width: 70vw; } }
        @media (min-width: 1024px) { .line { width: 50vw; } }

        .line::after {
          content: '';
          position: absolute;
          top: 50%;
          right: var(--tip-overlap, 0px);
          width: 0; height: 0;
          border-top: calc(var(--line-height) * 1.5) solid transparent;
          border-bottom: calc(var(--line-height) * 1.5) solid transparent;
          border-left: calc(var(--line-height) * 2.5) solid var(--line-color);
          transform: translateY(-50%);
        }
      `}</style>

      {/* 🔹 Hintergrund-Pfeile */}
      <div className={`absolute inset-0 z-10 overflow-hidden ${animate ? "animate-lines" : ""}`}>
        {[
          { top: "33%", height: "4px", opacity: "0.2", color: "#f4bb00", duration: "30s", delay: "0s" },
          { top: "55%", height: "3px", opacity: "0.15", color: "#f4bb00", duration: "40s", delay: "15s" },
          { top: "85%", height: "7px", opacity: "0.4", color: "#f4bb00", duration: "28s", delay: "25s" },
          { top: "28%", height: "4px", opacity: "0.2", color: "#ffe500", duration: "45s", delay: "30s" },
        ].map((line, i) => (
          <div
            key={i}
            className="line"
            style={{
              top: line.top,
              animationDuration: line.duration,
              animationDelay: line.delay,
              "--line-color": line.color,
              "--line-height": line.height,
              "--line-opacity": line.opacity,
              "--tip-overlap": `calc(${line.height} * -1)`,
            }}
          />
        ))}
      </div>

      {/* 🔹 Vordergrund-Pfeile */}
      <div className={`absolute inset-0 z-30 overflow-hidden ${animate ? "animate-lines" : ""}`}>
        {[
          { top: "91%", height: "16px", opacity: "0.90", color: "#ffe500", duration: "25s", delay: "5s" },
          { top: "63%", height: "5px",  opacity: "0.80", color: "#f0e15ad8", duration: "35s", delay: "10s" },
          { top: "18.5%", height: "8px", opacity: "0.60", color: "#f4bb00", duration: "35s", delay: "10s" },
        ].map((line, i) => (
          <div
            key={i}
            className="line"
            style={{
              top: line.top,
              animationDuration: line.duration,
              animationDelay: line.delay,
              "--line-color": line.color,
              "--line-height": line.height,
              "--line-opacity": line.opacity,
              "--tip-overlap": `calc(${line.height} * -1)`,
            }}
          />
        ))}
      </div>

      {/* Hauptinhalt */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <div className="rounded-3xl border border-yellow-400/40 bg-gray-900/60 p-5 sm:p-8 lg:p-12 backdrop-blur-sm shadow-[0_0_40px_rgba(250,204,21,0.25)]">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Linke Seite */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1.5 sm:px-6 sm:py-2 mb-3 sm:mb-4">
                <span className="inline-block h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-medium text-yellow-200/90">
                  Spedition · Containerlogistik
                </span>
              </div>

              {/* Headline (clamp für XS → LG) */}
              <h1 className="font-extrabold leading-tight text-[clamp(2rem,8vw,3.75rem)] sm:text-6xl lg:text-7xl">
                Container{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
                  Transport
                </span>{" "}
                Mainz
              </h1>

              {/* Subline */}
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-200 leading-relaxed max-w-prose">
                Wir bringen Ihre Container zuverlässig ans Ziel – sicher, effizient und
                transparent. Vertrauen Sie auf über 25 Jahre Erfahrung und ein globales Netzwerk.
              </p>

              {/* CTAs */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => scrollTo("contact")}
                  className="rounded-xl bg-gradient-to-r from-yellow-300 to-yellow-500 px-6 py-3 sm:px-8 sm:py-4 font-semibold text-gray-900 shadow-lg shadow-yellow-500/30 transition-transform hover:scale-105"
                >
                  Kontakt aufnehmen
                </button>
                <button
                  onClick={() => scrollTo("services")}
                  className="rounded-xl border border-yellow-400/40 bg-yellow-400/10 px-6 py-3 sm:px-8 sm:py-4 font-semibold text-yellow-100 transition hover:bg-yellow-400/20"
                >
                  Unsere Leistungen
                </button>
              </div>
            </div>

            {/* Rechte Seite */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-gray-800/60 border border-yellow-400/30 p-4 sm:p-5">
                <Truck className="w-9 h-9 sm:w-10 sm:h-10 text-yellow-400 mb-2" />
                <h3 className="text-sm sm:text-md font-semibold">Effiziente Transporte</h3>
                <p className="mt-1 text-gray-300 text-sm">
                  Pünktlich, transparent und zuverlässig.
                </p>
              </div>
              <div className="rounded-xl bg-gray-800/60 border border-yellow-400/30 p-4 sm:p-5">
                <ShieldCheck className="w-9 h-9 sm:w-10 sm:h-10 text-yellow-400 mb-2" />
                <h3 className="text-sm sm:text-md font-semibold">Maximale Sicherheit</h3>
                <p className="mt-1 text-gray-300 text-sm">
                  Vollversichert und bestens geschützt.
                </p>
              </div>
              <div className="rounded-xl bg-gray-800/60 border border-yellow-400/30 p-4 sm:p-5">
                <Globe className="w-9 h-9 sm:w-10 sm:h-10 text-yellow-400 mb-2" />
                <h3 className="text-sm sm:text-md font-semibold">Weltweit vernetzt</h3>
                <p className="mt-1 text-gray-300 text-sm">
                  International und regional flexibel.
                </p>
              </div>
            </div>
          </div>

          {/* Stats unten quer */}
          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
            <div className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl font-bold">25+</div>
              <div className="text-xs sm:text-sm text-yellow-100/80 mt-1">Jahre Erfahrung</div>
            </div>
            <div className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl font-bold">500+</div>
              <div className="text-xs sm:text-sm text-yellow-100/80 mt-1">Zufriedene Kunden</div>
            </div>
            <div className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl font-bold">24/7</div>
              <div className="text-xs sm:text-sm text-yellow-100/80 mt-1">Service & Tracking</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
