import React, { useEffect, useState } from "react";
import { Shield, Clock, Globe, Package } from "lucide-react";

import Container from "../assets/Schiffcontainer.png";
import Containeroffen from "../assets/Schiffcontainer_open.png";

export default function Leistungen() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);

  useEffect(() => {
    const section = document.getElementById("services");
    if (!section) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            // Beim Einscrollen: Animationen starten
            setIsIntersecting(true);
            setTimeout(() => {
              setIsOpened(true);
            }, 1200);
            setTimeout(() => {
              setIsTextVisible(true);
            }, 1800);
          } else {
            // Beim Wegscrollen: Animationen umkehren
            setIsTextVisible(false);
            setTimeout(() => {
              setIsOpened(false);
            }, 500);
            setTimeout(() => {
                setIsIntersecting(false);
            }, 1000); // Verzögerung, damit das Bild zurückwechseln kann, bevor es verschwindet
          }
        });
      },
      { threshold: 0.2 }
    );

    io.observe(section);

    return () => io.disconnect();
  }, []);

  const features = [
    {
      icon: <Package className="w-6 h-6" />,
      title: "Sichere Verpackung",
      description: "Professionelle Sicherung Ihrer wertvollen Güter",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Pünktliche Lieferung",
      description: "Zuverlässige Termine & klare Kommunikation",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Globale Kapazitäten",
      description: "Weltweites Netzwerk für jeden Auftrag",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Vollversichert",
      description: "Umfassender Schutz für maximale Sicherheit",
    },
  ];

  return (
    <section
      id="services"
      className="relative overflow-hidden py-18 bg-gray-950 text-white"
    >
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 🔹 Kacheln und Überschrift auf der linken Seite */}
          <div className="mx-auto lg:mx-0 max-w-3xl lg:max-w-none">
            {/* 🔹 Überschrift mit Fade-in und Verschiebung */}
            <div
              className={`transition-all duration-700 ease-out 
              ${
                isTextVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              }`}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Unsere <span className="text-yellow-400">Leistungen</span>
              </h2>
              <p className="mt-3 text-gray-300 max-w-prose">
                Vertrauen Sie auf unsere Expertise im Containertransport –
                effizient, sicher und transparent.
              </p>
            </div>

            {/* 🔹 Kacheln mit gestaffeltem Fade-in von rechts */}
            <div className="mt-10 grid sm:grid-cols-2 gap-6" id="services-tiles">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className={`rounded-lg border border-gray-700 bg-gray-900/50 backdrop-blur-sm p-6 
                    transition-all duration-700 ease-out
                    ${
                      isTextVisible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-12"
                    }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="flex items-center gap-3 text-yellow-400">
                    {f.icon}
                    <h3 className="text-base font-semibold text-white">
                      {f.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-300 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 🔹 Containerbilder auf der rechten Seite */}
          <div
            className={`flex items-center justify-center lg:justify-end transition-all duration-1000 ease-out 
              ${isIntersecting ? "translate-y-0" : "-translate-y-full"}`}
          >
            <img
              src={isOpened ? Containeroffen : Container}
              alt="Container"
              className={`w-[500px] h-auto transition-opacity duration-500 ease-in-out ${
                isIntersecting ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,rgba(0,0,0,0)_60%)]" />
    </section>
  );
}