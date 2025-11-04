import React from "react";
import { ArrowRight, CalendarClock, ShieldCheck, Truck } from "lucide-react";
import { scrollToElement } from "../utils/animations.js";

const highlightCards = [
  {
    icon: Truck,
    title: "Eigener Fuhrpark",
    description: "Moderne Sattelzüge für Container bis 45 ft und europaweite Relationen.",
  },
  {
    icon: ShieldCheck,
    title: "Versichert & geprüft",
    description: "ISO-zertifizierte Prozesse, feste Ansprechpartner und 5 Mio. EUR Absicherung.",
  },
  {
    icon: CalendarClock,
    title: "Live Timing",
    description: "Track & Trace Meldungen in Echtzeit für Disposition und Kundenportal.",
  },
];

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden top-8 text-white pt-28 pb-16">
      <style>{`
        .hero-lines .hero-line {
          animation: hero-shoot 9s linear infinite;
        }
        @keyframes hero-shoot {
          0% { transform: translateX(-120%) scaleX(0.4); opacity: 0; }
          12% { transform: translateX(-10%) scaleX(0.85); opacity: var(--line-opacity); }
          55% { transform: translateX(55%) scaleX(1); opacity: var(--line-opacity); }
          90% { transform: translateX(120%) scaleX(0.85); opacity: var(--line-opacity); }
          100% { transform: translateX(200%) scaleX(0.4); opacity: 0; }
        }
        .hero-line {
          position: absolute;
          top: var(--line-top);
          height: var(--line-height);
          width: var(--line-width);
          background: var(--line-color);
          opacity: var(--line-opacity);
          border-radius: 9999px;
          transform-origin: left center;
          will-change: transform, opacity;
        }
        .hero-line::after {
          content: "";
          position: absolute;
          right: -8px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-left: 12px solid var(--line-color);
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
        }
        @media (min-width: 768px) {
          .hero-line { width: calc(var(--line-width) * 1.2); }
        }
        @media (min-width: 1280px) {
          .hero-line { width: calc(var(--line-width) * 1.6); }
        }
        .tilt-card {
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          transform: translateZ(0);
        }
        .tilt-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 22px 45px rgba(0, 0, 0, 0.35);
        }
      `}</style>

      <div className="absolute inset-0 hero-lines pointer-events-none">
        {[...Array(6)].map((_, index) => (
          <span
            key={index}
            className="hero-line"
            style={{
              "--line-top": `${16 + index * 12}%`,
              "--line-height": `${Math.max(1.5, Math.random() * 2.2)}px`,
              "--line-color": index % 2 === 0 ? "#FFD700" : "#374151",
              "--line-opacity": 0.25 + Math.random() * 0.4,
              "--line-width": "48vw",
              animationDelay: `${index * 1.3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="hero-shell relative w-full overflow-hidden rounded-[28px] border border-white/10 bg-white/2 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 opacity-60" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/40 bg-yellow-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-200 sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.8)]" />
                Container Transport Mainz
              </div>

              <h1 className="text-[1.9rem] font-extrabold leading-tight text-white sm:text-[2.3rem] lg:text-[2.6rem]">
                Containerlogistik mit Fokus auf Tempo, Transparenz und feste Ansprechpartner
              </h1>

              <p className="max-w-xl text-sm text-white/70 sm:text-base">
                Wir sichern Ihren Containerlauf – von der Disposition bis zur Ankunft. Europaweit, digital begleitet und mit direkter Dispo-Hotline.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => scrollToElement("kontakt")}
                  className="tilt-card inline-flex items-center justify-center gap-3 rounded-2xl border border-yellow-400/40 bg-yellow-400 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-yellow-900/40 transition hover:bg-yellow-300 sm:text-base"
                >
                  Angebot anfordern
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToElement("services")}
                  className="tilt-card inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/30 transition hover:border-yellow-400/40 hover:text-yellow-100 sm:text-base"
                >
                  Leistungen entdecken
                </button>
              </div>

              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                <span className="h-1.5 w-12 rounded-full bg-yellow-400/60" />
                24/7 Dispo erreichbar · Live Tracking inklusive
              </span>
            </div>

            <div className="flex w-full flex-col gap-4 lg:max-w-sm">
              {highlightCards.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="tilt-card rounded-3xl border border-white/12 py-6 card-padding-x shadow-xl shadow-black/35"
                  style={{
                    background: "linear-gradient(145deg, rgba(255,215,0,0.18), rgba(22,28,43,0.85))",
                    backdropFilter: "blur(18px)",
                  }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black/60 text-yellow-300 shadow-inner shadow-yellow-500/30">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-white">{title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-white/70">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}