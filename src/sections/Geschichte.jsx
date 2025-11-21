import React, { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation, slideInClasses, scrollToElement } from "../utils/animations.js";
import { resolveFontSize } from "../utils/fontSize.js";
import AlexKayserImage from '../assets/CTM OPa.png';

const FALLBACK_DATA = {
  history_title: "Unsere Geschichte",
  history_title_color: "#FFD700",
  history_title_size: "l",
  history_title_shadow: "0 0 20px rgba(255, 215, 0, 0.3)",
  history_subtitle: "Über fünf Jahrzehnte Erfahrung – vom Familienunternehmen zum Vorreiter auf dem Rhein.",
  history_subtitle_color: "rgba(255,255,255,0.75)",
  history_subtitle_size: "m",
  history_portrait_image: "",
  history_portrait_name: "Alex Kayser",
  history_portrait_role: "Pionier des kombinierten Transports",
  history_portrait_caption_color: "rgba(255,255,255,0.8)",
  history_portrait_border_color: "rgba(255,215,0,0.3)",
  history_portrait_shadow: "0 0 20px rgba(255, 215, 0, 0.4)",
  history_timeline_card_bg: "rgba(255,255,255,0.04)",
  history_timeline_card_hover_bg: "rgba(255,255,255,0.06)",
  history_timeline_title_color: "#FFD700",
  history_timeline_text_color: "rgba(255,255,255,0.82)",
  history_timeline_title_size: "s",
  history_timeline_text_size: "xs",
  history_timeline_border_color: "rgba(255,215,0,0.12)",
  history_timeline_line_color: "#FFD700",
  history_timeline_glow_shadow: "0 0 20px rgba(255, 215, 0, 0.3)",
  history_timeline_glow_shadow_hover: "0 0 30px rgba(255, 215, 0, 0.5)",
  history_cta_text: "Unsere Werte entdecken",
  history_cta_link: "werte",
  history_cta_bg: "#FFD700",
  history_cta_text_color: "#000000",
  history_cta_size: "s",
  history_cta_border: "",
  history_item_1_year: "1967",
  history_item_1_title: "Die Visionäre Gründung",
  history_item_1_desc: "Alex Kayser gründet Container Terminals Mainz (CTM) und bringt die Idee des modernen Containertransports auf den Rhein.",
  history_item_1_align: "left",
  history_item_2_year: "1970",
  history_item_2_title: "Der Rhein-Pionier",
  history_item_2_desc: "Mit den ersten Großschiffen und der MS CHRITSA KAYSER beginnt CTM den kombinierten LKW-Wasserweg-Transport und etabliert sich als Vorreiter.",
  history_item_2_align: "right",
  history_item_3_year: "1992",
  history_item_3_title: "Wachstum und Etablierung",
  history_item_3_desc: "Die Schifffahrtswerft zieht nach Gustavsburg um. CTM festigt seine Position als zuverlässiger Partner für die Region.",
  history_item_3_align: "left",
  history_item_4_year: "2024",
  history_item_4_title: "Neue Ära: Die Söhne",
  history_item_4_desc: "Jan und Tobias führen das Familienunternehmen mit frischer Energie und Fokus auf nachhaltige Logistik fort.",
  history_item_4_align: "right"
};

const HistorySection = ({ data }) => {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.2 });
  const config = useMemo(() => ({ ...FALLBACK_DATA, ...(data || {}) }), [data]);

  const timelineItems = useMemo(() => {
    const items = [];
    for (let index = 1; index <= 6; index++) {
      const year = config[`history_item_${index}_year`];
      const title = config[`history_item_${index}_title`];
      const description = config[`history_item_${index}_desc`];
      if (![year, title, description].some(Boolean)) {
        continue;
      }
      const align = (config[`history_item_${index}_align`] || (index % 2 === 1 ? "left" : "right")).toLowerCase();
      items.push({
        year: year || "",
        title: title || "",
        description: description || "",
        position: align === "right" ? "right" : "left"
      });
    }
    return items.length ? items : [
      {
        year: config.history_item_1_year,
        title: config.history_item_1_title,
        description: config.history_item_1_desc,
        position: (config.history_item_1_align || "left").toLowerCase() === "right" ? "right" : "left"
      }
    ];
  }, [config]);

  const [timelineRef, visibleTimelineItems] = useStaggeredAnimation(
    Math.max(timelineItems.length, 1),
    160,
    {
      startDelay: 120,
      rootMargin: '-20% 0px',
      threshold: 0.25
    }
  );

  const styles = useMemo(() => ({
    titleSize: resolveFontSize(config.history_title_size, "display", "2.6rem"),
    titleColor: config.history_title_color || "#FFD700",
    titleShadow: config.history_title_shadow || "0 0 20px rgba(255, 215, 0, 0.3)",
    subtitleSize: resolveFontSize(config.history_subtitle_size, "body", "1rem"),
    subtitleColor: config.history_subtitle_color || "rgba(255,255,255,0.75)",
    portraitBorderColor: config.history_portrait_border_color || "rgba(255,215,0,0.3)",
    portraitShadow: config.history_portrait_shadow || "0 0 20px rgba(255, 215, 0, 0.4)",
    portraitCaptionColor: config.history_portrait_caption_color || "rgba(255,255,255,0.8)",
    timelineCardBg: config.history_timeline_card_bg || "rgba(255,255,255,0.04)",
    timelineCardHoverBg: config.history_timeline_card_hover_bg || "rgba(255,255,255,0.06)",
    timelineTitleColor: config.history_timeline_title_color || "#FFD700",
    timelineTextColor: config.history_timeline_text_color || "rgba(255,255,255,0.82)",
    timelineTitleSize: resolveFontSize(config.history_timeline_title_size, "body", "1rem"),
    timelineTextSize: resolveFontSize(config.history_timeline_text_size, "detail", "0.85rem"),
    timelineBorderColor: config.history_timeline_border_color || "rgba(255,215,0,0.12)",
    timelineLineColor: config.history_timeline_line_color || "#FFD700",
    timelineGlowShadow: config.history_timeline_glow_shadow || "0 0 20px rgba(255, 215, 0, 0.3)",
    timelineGlowShadowHover: config.history_timeline_glow_shadow_hover || "0 0 30px rgba(255, 215, 0, 0.5)",
    ctaBg: config.history_cta_bg || "#FFD700",
    ctaTextColor: config.history_cta_text_color || "#000000",
    ctaSize: resolveFontSize(config.history_cta_size, "body", "0.95rem"),
    ctaBorder: config.history_cta_border || ""
  }), [config]);

  const portraitImage = config.history_portrait_image || AlexKayserImage;
  const hasCTA = Boolean(config.history_cta_text);
  const ctaTarget = (config.history_cta_link === "flotte"
    ? "werte"
    : (config.history_cta_link || "werte"));

  return (
    <section 
      id="geschichte" 
      ref={sectionRef}
      className="viewport-section relative overflow-hidden text-white"
    >
      {/* Subtile Hintergrund-Textur */}
      <style>{`
        .paper-texture {
          background-image: 
            radial-gradient(circle at 1px 1px, rgba(139, 115, 85, 0.05) 1px, transparent 0);
          background-size: 20px 20px;
        }
        
        .timeline-line {
          background: linear-gradient(180deg, transparent 0%, ${styles.timelineLineColor} 10%, ${styles.timelineLineColor} 90%, transparent 100%);
        }

        .milestone-glow {
          box-shadow: ${styles.timelineGlowShadow};
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }

        .milestone-glow:hover {
          box-shadow: ${styles.timelineGlowShadowHover};
          transform: scale(1.02);
        }
      `}</style>

      {/* Subtile Papier-Textur */}
      <div className="absolute inset-0 paper-texture opacity-50"></div>

      <div className="container mx-auto px-6 max-w-7xl w-full h-full flex flex-col justify-center">
        
        <div className={`text-center mb-8 ${slideInClasses.fromLeft.transition} ${
          isVisible ? slideInClasses.fromLeft.visible : slideInClasses.fromLeft.hidden
        }`}>
          <h2
            className="font-bold mb-2"
            style={{
              fontSize: styles.titleSize,
              color: styles.titleColor,
              textShadow: styles.titleShadow
            }}
          >
            {config.history_title}
          </h2>
          <p
            className="max-w-3xl mx-auto"
            style={{
              fontSize: styles.subtitleSize,
              color: styles.subtitleColor
            }}
          >
            {config.history_subtitle}
          </p>
        </div>

        <div className={`flex justify-center mb-8 ${slideInClasses.fromLeft.transition} ${
          isVisible ? slideInClasses.fromLeft.visible : slideInClasses.fromLeft.hidden
        }`} style={{ animationDelay: '200ms' }}>
          <div className="text-center">
            <div className="relative inline-block">
              <img 
                src={portraitImage}
                alt={config.history_portrait_name ? `${config.history_portrait_name} - CTM` : "CTM Portrait"}
                className="w-24 h-32 object-cover rounded-xl grayscale border-2 shadow-xl"
                style={{ 
                  filter: 'grayscale(100%) contrast(1.1)',
                  borderColor: styles.portraitBorderColor,
                  boxShadow: styles.portraitShadow
                }}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
            <div className="mt-3">
              {config.history_portrait_name && (
                <div className="font-semibold" style={{ color: styles.timelineTitleColor, fontSize: resolveFontSize('s', 'body', '1rem') }}>
                  {config.history_portrait_name}
                </div>
              )}
              {config.history_portrait_role && (
                <div className="text-xs" style={{ color: styles.portraitCaptionColor }}>
                  {config.history_portrait_role}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="relative" ref={timelineRef}>
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full timeline-line"></div>
          
          <div className="space-y-4">
            {timelineItems.map((milestone, index) => (
              <div 
                key={milestone.year}
                className={`relative transition-all duration-700 ${
                  visibleTimelineItems.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${220 + index * 160}ms` }}
              >
                <div className={`absolute left-1/2 top-3 transform -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full border-3 border-gray-900 z-10 transition-all duration-500 ${
                  visibleTimelineItems.includes(index) 
                    ? 'scale-100' 
                    : 'scale-0'
                }`} style={{ transitionDelay: `${160 + index * 160}ms`, backgroundColor: styles.timelineTitleColor }}></div>

                <div className={`grid grid-cols-2 gap-4 ${milestone.position === 'left' ? '' : ''}`}>
                  {milestone.position === 'left' ? (
                    <>
                      <div className="flex justify-end mt-4">
                        <div
                          className="milestone-glow backdrop-blur-xl rounded-xl p-3 border transition-all duration-300 text-center"
                          style={{
                            background: styles.timelineCardBg,
                            borderColor: styles.timelineBorderColor
                          }}
                        >
                          {(milestone.title || milestone.year) && (
                            <div className="flex items-center gap-3 mb-2">
                              {milestone.title && (
                                <h3
                                  className="font-semibold flex-1 text-center"
                                  style={{ color: styles.timelineTitleColor, fontSize: styles.timelineTitleSize }}
                                >
                                  {milestone.title}
                                </h3>
                              )}
                              {milestone.year && (
                                <div
                                  className="font-bold shrink-0 text-right"
                                  style={{ color: styles.timelineTitleColor, fontSize: styles.timelineTitleSize }}
                                >
                                  {milestone.year}
                                </div>
                              )}
                            </div>
                          )}
                          {milestone.description && (
                            <p className="leading-relaxed" style={{ color: styles.timelineTextColor, fontSize: styles.timelineTextSize }}>
                              {milestone.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div></div>
                    </>
                  ) : (
                    <>
                      <div></div>
                      <div className="flex justify-start mt-4">
                        <div
                          className="milestone-glow backdrop-blur-xl rounded-xl p-3 border transition-all duration-300 text-center"
                          style={{
                            background: styles.timelineCardBg,
                            borderColor: styles.timelineBorderColor
                          }}
                        >
                          {(milestone.title || milestone.year) && (
                            <div className="flex items-center gap-3 mb-2">
                              {milestone.year && (
                                <div
                                  className="font-bold shrink-0 text-left"
                                  style={{ color: styles.timelineTitleColor, fontSize: styles.timelineTitleSize }}
                                >
                                  {milestone.year}
                                </div>
                              )}
                              {milestone.title && (
                                <h3
                                  className="font-semibold flex-1 text-center"
                                  style={{ color: styles.timelineTitleColor, fontSize: styles.timelineTitleSize }}
                                >
                                  {milestone.title}
                                </h3>
                              )}
                            </div>
                          )}
                          {milestone.description && (
                            <p className="leading-relaxed" style={{ color: styles.timelineTextColor, fontSize: styles.timelineTextSize }}>
                              {milestone.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {hasCTA && (
          <div className={`text-center mt-8 transition-all duration-700 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <button
              onClick={() => scrollToElement(ctaTarget)}
              className="ctm-btn--primary btn-3d inline-flex items-center gap-2 rounded-xl"
              style={{
                backgroundColor: styles.ctaBg,
                color: styles.ctaTextColor,
                fontSize: styles.ctaSize,
                border: styles.ctaBorder || undefined,
                padding: "0.65rem 1.4rem"
              }}
            >
              <span className="relative z-10">{config.history_cta_text}</span>
              <ArrowRight className="w-4 h-4 relative z-10" style={{ color: styles.ctaTextColor }} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HistorySection;