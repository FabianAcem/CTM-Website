import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation, slideInClasses, scrollToElement } from "../utils/animations.js";
import { resolveFontSize } from "../utils/fontSize.js";

const GRADIENT_MAP = {
  'default': "linear-gradient(145deg, rgba(255,215,0,0.15), rgba(22,28,43,0.85))",
  'gold-only': "linear-gradient(145deg, rgba(255,215,0,0.3), rgba(22,28,43,0.9))",
  'dark-only': "rgba(22,28,43,0.95)",
  'none': "transparent"
};

export default function Hero({ data }) {
  // Fallback-Daten (werden nur genutzt, wenn data null/undefined ist oder Felder leer sind)
  const fallbackData = {
    hero_badge_white_text: "Container Transport Mainz",
    hero_badge_yellow_text: "Inhabergeführt & Persönlich", 
    hero_badge_bg_color: "rgba(255,215,0,0.12)",
    hero_badge_dot_color: "#FFD700",
    hero_badge_border_color: "rgba(255,215,0,0.25)",
    hero_headline: "Ihr Transport. Persönlich in besten Händen.",
    hero_headline_color: "#FFD700",
    hero_headline_size: "l",
    hero_headline_shadow: "0 0 20px rgba(255, 215, 0, 0.3)",
    hero_subtext: "Als Inhaber sind wir Ihre festen Ansprechpartner für alle Transport-Herausforderungen.",
    hero_subtext_color: "rgba(255,255,255,0.8)",
    hero_subtext_size: "m",
    hero_btn1_text: "Anfrage starten",
    hero_btn1_link: "kontakt",
    hero_btn1_bg: "#FFD700",
    hero_btn1_text_color: "#000000",
    hero_btn2_text: "Unsere Story",
    hero_btn2_link: "werte",
    hero_btn2_bg: "rgba(255, 255, 255, 0.1)",
    hero_btn2_text_color: "#FFFFFF",
    hero_card_image: null,
    hero_card_gradient_bg: "default",
    hero_card_container_border: "rgba(255,215,0,0.2)",
    hero_card_border_color: "rgba(255,255,255,0.12)",
    hero_card_icon_color: "rgba(255,215,0,0.7)",
    hero_btn1_shadow: "shadow-lg shadow-yellow-900/30",
    hero_btn2_border: "border border-white/20",
    footer_text: "HIER PACKEN WIR AN...",
    hero_footer_color: "rgba(255,255,255,0.6)",
    hero_footer_size: "s",
    hero_footer_line_color: "rgba(255,215,0,0.6)"
  };

  // Wir mergen die Fallback Daten mit den echten Daten aus App.jsx
  const heroData = { ...fallbackData, ...(data || {}) };

  const normalizeTarget = (value, fallback, mappings = {}) => {
    const fallbackValue = fallback || "";
    if (!value) {
      return fallbackValue;
    }
    const sanitized = String(value).trim().replace(/^#/, "").toLowerCase();
    if (!sanitized) {
      return fallbackValue;
    }
    const mapped = mappings[sanitized] || sanitized;
    return mapped || fallbackValue;
  };

  const heroPrimaryTarget = normalizeTarget(heroData.hero_btn1_link, "kontakt", {
    contact: "kontakt",
    kontakte: "kontakt"
  });

  const heroSecondaryTarget = normalizeTarget(heroData.hero_btn2_link, "werte", {
    services: "leistungen",
    service: "leistungen",
    values: "werte",
    value: "werte"
  });
  
  const getStyleValue = (key, map, fallback) => {
    const value = heroData[key];
    if (map && value && map[value]) { return map[value]; }
    return value || fallback;
  };
  
  const headlineSize = resolveFontSize(heroData.hero_headline_size, "display", "2.5rem");
  const subtextSize = resolveFontSize(heroData.hero_subtext_size, "body", "1rem");
  const footerSize = resolveFontSize(heroData.hero_footer_size, "detail", "0.75rem");
  const cardGradient = getStyleValue('hero_card_gradient_bg', GRADIENT_MAP, GRADIENT_MAP.default);

  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.2 });
  const [showContainer, setShowContainer] = useState(false);
  const [containerOpen, setContainerOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowContainer(true);
      const timer1 = setTimeout(() => setContainerOpen(true), 400);
      const timer2 = setTimeout(() => setShowContent(true), 700);
      return () => { clearTimeout(timer1); clearTimeout(timer2); };
    } else {
      setShowContent(false); setContainerOpen(false); setShowContainer(false);
    }
  }, [isVisible]);

  return (
    <section id="hero" ref={sectionRef} className="viewport-section hero-section relative overflow-hidden text-white -mt-20">
      <div className="container mx-auto max-w-10xl w-full h-full flex flex-col justify-center pt-10">
        <div className={`hero-container transition-all duration-1000 mt-8 ${showContainer ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <div className={`backdrop-blur-xl bg-white/[0.02] rounded-2xl transition-all duration-700 flex flex-col justify-center ${containerOpen ? "" : ""}`}
            style={{ border: `1px solid ${heroData.hero_card_container_border}` }}>
            <div className="flex flex-col lg:flex-row items-stretch justify-between py-16 px-8 lg:px-12 min-h-[520px]">
              
              {/* Linker Contentbereich */}
              <div className={`flex-1 flex flex-col justify-between pr-0 lg:pr-12 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}>
                <div className="space-y-6">
                  {/* Badge */}
                  <div className={`inline-flex items-center gap-2 rounded-full backdrop-blur-sm px-3 py-1.5 text-xs font-medium shadow-lg ${isVisible ? slideInClasses.fromLeft.visible : slideInClasses.fromLeft.hidden}`}
                    style={{ backgroundColor: heroData.hero_badge_bg_color, border: `1px solid ${heroData.hero_badge_border_color}` }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: heroData.hero_badge_dot_color }} />
                    <div className="flex flex-col leading-tight">
                      <div className="font-bold text-xs text-white">{heroData.hero_badge_white_text}</div>
                      <div className="font-medium text-xs text-yellow-400">{heroData.hero_badge_yellow_text}</div>
                    </div>
                  </div>

                  {/* Titel & Text */}
                  <div className="space-y-4">
                    <h1 className={`font-bold leading-tight ${isVisible ? slideInClasses.fromLeft.visible : slideInClasses.fromLeft.hidden}`}
                      style={{ fontSize: headlineSize, color: heroData.hero_headline_color, textShadow: heroData.hero_headline_shadow }}>
                      {heroData.hero_headline}
                    </h1>
                    <p className={`leading-relaxed max-w-lg ${isVisible ? slideInClasses.fromLeft.visible : slideInClasses.fromLeft.hidden}`}
                      style={{ fontSize: subtextSize, color: heroData.hero_subtext_color }}>
                      {heroData.hero_subtext}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className={`flex flex-col sm:flex-row gap-2.5 mb-4 ${isVisible ? slideInClasses.fromLeft.visible : slideInClasses.fromLeft.hidden}`}>
                  <button 
                    onClick={() => scrollToElement(heroPrimaryTarget)} 
                    className={`ctm-btn--primary btn-3d inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-transform whitespace-nowrap text-sm ${heroData.hero_btn1_shadow}`}
                    style={{ backgroundColor: heroData.hero_btn1_bg, color: heroData.hero_btn1_text_color }}>
                    {heroData.hero_btn1_text} <ArrowRight className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => scrollToElement(heroSecondaryTarget)} 
                    className={`btn-secondary inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold shadow-lg hover:border-yellow-400/40 hover:text-yellow-100 transition-all whitespace-nowrap text-sm ${heroData.hero_btn2_border}`}
                    style={{ backgroundColor: heroData.hero_btn2_bg, color: heroData.hero_btn2_text_color }}>
                    {heroData.hero_btn2_text}
                  </button>
                </div>

                {/* Footer */}
                <div className={`inline-flex items-center gap-2 font-semibold uppercase tracking-wider ${isVisible ? slideInClasses.fromLeft.visible : slideInClasses.fromLeft.hidden}`}
                  style={{ color: heroData.hero_footer_color, fontSize: footerSize }}>
                  <span className="h-0.5 w-8 rounded-full" style={{ backgroundColor: heroData.hero_footer_line_color }} />
                  {heroData.footer_text}
                </div>
              </div>

              {/* Rechte Kachel */}
              <div className={`flex justify-center ${isVisible ? slideInClasses.fromRight.visible : slideInClasses.fromRight.hidden}`} style={{ animationDelay: "400ms" }}>
                <div className="hero-card-shell w-full max-w-md lg:max-w-lg">
                  <div
                    className="hero-card-visual relative overflow-hidden flex items-center justify-center"
                    style={{
                      border: `1px solid ${heroData.hero_card_border_color}`,
                      background: cardGradient,
                      backdropFilter: "blur(18px)"
                    }}
                  >
                    {heroData.hero_card_image ? (
                      <img
                        src={heroData.hero_card_image}
                        alt="Hero"
                        className="hero-card-image"
                      />
                    ) : (
                      <div className="text-center space-y-2">
                        <div className="w-12 h-12 mx-auto rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: heroData.hero_card_icon_color }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    )}

                    <div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-px"
                      style={{ background: `linear-gradient(to right, transparent, ${heroData.hero_footer_line_color} 50%, transparent)` }}
                    ></div>
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