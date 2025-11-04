import React, { useState, useEffect } from "react";
import { Shield, Clock, Globe, Package, ArrowRight } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation, slideInClasses, scrollToElement } from "../utils/animations.js";
import { useSection } from "../hooks/useWordPressData.js";
import { getIcon } from "../utils/icon-manager.js";

// WordPress-kompatible Bildpfade
const getImagePath = (imageName) => {
  // Prüfe ob WordPress-Umgebung
  if (typeof window !== 'undefined' && window.__CTM__?.templateDir) {
    // WordPress-Pfade verwenden
    if (imageName.includes('Schiffcontainer_open')) {
      return `${window.__CTM__.templateDir}/assets/assets/Schiffcontainer_open.C396tv5Y.png`;
    } else {
      return `${window.__CTM__.templateDir}/assets/assets/Schiffcontainer.-5H-Np4Z.png`;
    }
  }
  
  // Fallback für lokale Entwicklung
  try {
    if (imageName.includes('Schiffcontainer_open')) {
      return require("../assets/Schiffcontainer_open.png");
    } else {
      return require("../assets/Schiffcontainer.png");
    }
  } catch {
    // Backup für Vite
    return imageName.includes('Schiffcontainer_open') 
      ? "/src/assets/Schiffcontainer_open.png"
      : "/src/assets/Schiffcontainer.png";
  }
};

export default function Leistungen() {
  const servicesData = useSection('services');
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.2 });
  const [cardsRef, visibleCards] = useStaggeredAnimation(4, 200);
  
  // Vereinfachte Animation States
  const [showContainer, setShowContainer] = useState(false);
  const [containerOpen, setContainerOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Forward animation sequence - schneller
      setShowContainer(true);
      const timer1 = setTimeout(() => setContainerOpen(true), 400);
      const timer2 = setTimeout(() => setShowContent(true), 700);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      // Reset when not visible - schneller
      setShowContent(false);
      setContainerOpen(false);
      setShowContainer(false);
    }
  }, [isVisible]);

  // WordPress-editierbare Features
  const features = servicesData.items || [];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden min-h-screen flex items-center text-white pb-20 lg:pb-32"
    >
      <div className="mx-auto max-w-7xl px-6 relative z-10 w-full">
        {/* Header mit durchsichtiger Kachel */}
        <div className={`text-center mb-12 ${slideInClasses.fromLeft.transition} ${
          isVisible ? slideInClasses.fromLeft.visible : slideInClasses.fromLeft.hidden
        }`}>
          <div className="mb-8 hover-tilt transform-3d border border-white/12 rounded-2xl backdrop-blur-md bg-white/5 shadow-lg shadow-black/10 py-6 card-padding-x">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3">
              {(() => {
                const title = servicesData.title || "Unsere Leistungen";
                const match = title.match(/(Unsere) (Leistungen)/i);
                if (match) {
                  return <><span>{match[1]} </span><span className="text-yellow-ctm">{match[2]}</span></>;
                }
                return title;
              })()}
            </h2>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              {servicesData.subtitle || "Professionelle Containertransporte für alle Ihre Anforderungen"}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Service-Karten auf großer durchsichtiger Kachel */}
          <div ref={cardsRef} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl shadow-black/20">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
              {features.filter(feature => feature.visible !== false).map((feature, i) => {
                const IconComponent = getIcon(feature.icon);
                
                return (
                  <div
                    key={feature.title}
                    className={`group card-modern card-hover hover-lift transform-3d py-5 card-padding-x transition-all duration-700 ${
                      showContent 
                        ? "opacity-100 translate-x-0" 
                        : "opacity-0 translate-x-8"
                    }`}
                    style={{ transitionDelay: `${i * 120}ms` }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="icon-3d icon-glow p-2 rounded-lg group-hover:scale-110 transition-transform bg-black/40">
                        <IconComponent className="w-6 h-6 text-yellow-ctm" />
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {feature.title}
                      </h3>
                    </div>
                    
                    <p className="text-white/80 text-base leading-relaxed mb-3">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="glass-weak text-gradient text-xs font-medium px-2 py-1 rounded-full">
                        {feature.highlight}
                      </span>
                      <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 text-white/50 group-hover:text-gradient transition-colors" />
                    </div>

                    {/* Gradient accent corner */}
                    <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-yellow-400/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                );
              })}
            </div>

            {/* CTA mit 3D button - innerhalb der großen Kachel */}
            {servicesData.cta && (
              <div className={`mt-6 text-center transition-all duration-700 delay-500 ${
                showContent ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}>
                <button
                  onClick={() => scrollToElement(servicesData.cta.href?.replace('#', '') || "contact")}
                  className="ctm-btn--primary btn-3d inline-flex items-center gap-2 px-5 py-2.5 lg:px-6 lg:py-3 font-semibold rounded-xl glow-yellow"
                >
                  <span className="relative z-10">{servicesData.cta.text || "Jetzt Angebot anfordern"}</span>
                  <ArrowRight className="w-4 h-4 relative z-10" />
                </button>
              </div>
            )}
          </div>

          {/* Container Animation - vereinfacht und stabil */}
          <div className="flex items-center justify-center">
            <div className="relative max-w-md">
              <div className="glass-weak rounded-3xl py-6 card-padding-x hover-tilt transform-3d">
                <img
                  src={containerOpen ? getImagePath('Schiffcontainer_open') : getImagePath('Schiffcontainer')}
                  alt="Container Transport"
                  className={`w-full h-auto rounded-2xl transition-all duration-600 ${
                    showContainer 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 -translate-y-12"
                  }`}
                  onError={(e) => {
                    console.log('Image load error:', e.target.src);
                    // Fallback für fehlende Bilder
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              
              {/* Floating Info mit glasmorphism */}
              <div className={`absolute -top-3 -right-3 glass-strong text-white p-2 lg:p-3 rounded-xl font-semibold text-sm transition-all duration-400 hover-lift ${
                containerOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}>
                <div className="text-xs text-white/80">Bis zu</div>
                <div className="text-lg font-bold text-gradient">28t</div>
                <div className="text-xs text-white/80">Nutzlast</div>
              </div>

              {/* Service-Highlights mit glasmorphism */}
              <div className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 glass-strong rounded-xl p-3 transition-all duration-400 hover-lift ${
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}>
                <div className="flex items-center gap-4 text-xs lg:text-sm">
                  <div className="text-center">
                    <Package className="w-3 h-3 text-gradient mx-auto mb-1" />
                    <div className="text-gradient font-bold">24/7</div>
                    <div className="text-white/80">Tracking</div>
                  </div>
                  <div className="text-center">
                    <Clock className="w-3 h-3 text-gradient mx-auto mb-1" />
                    <div className="text-gradient font-bold">99.2%</div>
                    <div className="text-white/80">Pünktlich</div>
                  </div>
                  <div className="text-center">
                    <Shield className="w-3 h-3 text-gradient mx-auto mb-1" />
                    <div className="text-gradient font-bold">5 Mio</div>
                    <div className="text-white/80">EUR Vers.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}