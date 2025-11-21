import React, { useState, useEffect, useMemo } from "react";
import { Shield, Clock, Globe, Package, ArrowRight, Phone, MapPin, Wrench, Zap } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation, slideInClasses, scrollToElement } from "../utils/animations.js";
import { resolveFontSize } from "../utils/fontSize.js";

const ICON_MAP = { Shield, Clock, Globe, Package, Phone, MapPin, Wrench, Zap };

const LOCAL_IMAGES = {
  open: new URL("../assets/Schiffcontainer_open.png", import.meta.url).href,
  closed: new URL("../assets/Schiffcontainer.png", import.meta.url).href,
};

// WordPress-kompatible Bildpfade
const getImagePath = (imageName) => {
  if (typeof window !== "undefined" && window.__CTM__?.templateDir) {
    if (imageName.includes("Schiffcontainer_open")) {
      return `${window.__CTM__.templateDir}/assets/assets/Schiffcontainer_open.C396tv5Y.png`;
    }
    return `${window.__CTM__.templateDir}/assets/assets/Schiffcontainer.-5H-Np4Z.png`;
  }
  return imageName.includes("Schiffcontainer_open") ? LOCAL_IMAGES.open : LOCAL_IMAGES.closed;
};

const FALLBACK_DATA = {
  services_title: "Unsere Leistungen und persönlicher Service",
  services_title_color: "#FFD700",
  services_title_size: "l",
  services_title_shadow: "0 0 20px rgba(255, 215, 0, 0.3)",
  services_subtitle: "Maßgeschneiderte Transportlösungen, die sich flexibel Ihren Anforderungen anpassen.",
  services_subtitle_color: "rgba(255,255,255,0.75)",
  services_subtitle_size: "m",
  services_card_background: "rgba(255,255,255,0.05)",
  services_card_border_color: "rgba(255,255,255,0.1)",
  services_feat_icon_color: "#FFD700",
  services_feat_icon_bg: "linear-gradient(145deg, rgba(255,215,0,0.22), rgba(255,215,0,0.1))",
  services_feat_title_color: "#FFD700",
  services_feat_text_color: "rgba(255,255,255,0.88)",
  services_feat_badge_bg: "rgba(255,215,0,0.08)",
  services_feat_badge_text_color: "#FFD700",
  services_feat_title_size: "s",
  services_feat_text_size: "xs",
  services_feat_badge_size: "xs",
  services_cta_text: "Persönlichen Service anfragen",
  services_cta_link: "kontakt",
  services_cta_bg: "#FFD700",
  services_cta_text_color: "#000000",
  services_cta_border: "",
  services_cta_size: "s",
  services_image_mode: "animate",
  services_image_custom: "",
  services_image_border_color: "rgba(255,215,0,0.2)",
  services_image_badge_border_color: "rgba(255,215,0,0.2)",
  services_image_alt: "Container Transport CTM",
  services_badge_label_top: "Bis zu",
  services_badge_value: "28t",
  services_badge_value_size: "l",
  services_badge_label_bottom: "Nutzlast",
  services_badge_bg: "rgba(255,255,255,0.08)",
  services_badge_text_color: "#FFFFFF",
  services_badge_size: "xs",
  services_bottom_badge_bg: "rgba(255,255,255,0.08)",
  services_bottom_badge_icon_color: "#FFD700",
  services_bottom_badge_text_color: "#FFD700",
  services_bottom_badge_subtext_color: "rgba(255,255,255,0.85)",
  services_bottom_badge_size: "xs",
  services_bottom_badge_sub_size: "xs",
  services_feat_1_icon: "Phone",
  services_feat_1_title: "Persönliche Betreuung",
  services_feat_1_desc: "Keine Warteschleife, sondern direkter Kontakt zu Jan & Tobias. Wir kennen unsere Kunden und deren Anforderungen persönlich.",
  services_feat_1_badge: "Direkter Draht",
  services_feat_2_icon: "MapPin",
  services_feat_2_title: "Regionaler Fokus & Expertise",
  services_feat_2_desc: "Tiefes Wissen über Routen und Hafenlogistik in der Region. Wir finden immer den effizientesten Weg für Ihre Fracht.",
  services_feat_2_badge: "Lokale Expertise",
  services_feat_3_icon: "Wrench",
  services_feat_3_title: "Zuverlässige Flotte",
  services_feat_3_desc: "Unsere 20 LKW sind permanent einsatzbereit und werden durch unser Team zuverlässig gewartet, um Pünktlichkeit zu garantieren.",
  services_feat_3_badge: "20 LKW bereit",
  services_feat_4_icon: "Zap",
  services_feat_4_title: "Flexible Disposition",
  services_feat_4_desc: "Anpassung an kurzfristige Änderungen. Wir reagieren schneller als Großkonzerne auf Ihre individuellen Transportbedürfnisse.",
  services_feat_4_badge: "Schnelle Reaktion",
  services_bottom_left_icon: "Phone",
  services_bottom_left_title: "Direkter Draht",
  services_bottom_left_subtitle: "Persönliche Betreuung",
  services_bottom_right_icon: "Zap",
  services_bottom_right_title: "Flexible Touren",
  services_bottom_right_subtitle: "Schnelle Reaktion"
};

const FEATURE_INDEXES = [1, 2, 3, 4];

export default function Leistungen({ data }) {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.2 });
  const [cardsRef] = useStaggeredAnimation(4, 200);
  
  const [showContainer, setShowContainer] = useState(false);
  const [containerOpen, setContainerOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const config = useMemo(() => ({ ...FALLBACK_DATA, ...(data || {}) }), [data]);

  const styles = useMemo(() => ({
    titleSize: resolveFontSize(config.services_title_size, "display", "2.6rem"),
    titleColor: config.services_title_color || "#FFD700",
    titleShadow: config.services_title_shadow || "0 0 18px rgba(255, 215, 0, 0.3)",
    subtitleSize: resolveFontSize(config.services_subtitle_size, "body", "1rem"),
    subtitleColor: config.services_subtitle_color || "rgba(255,255,255,0.75)",
    cardBackground: config.services_card_background || "rgba(255,255,255,0.05)",
    cardBorderColor: config.services_card_border_color || "rgba(255,255,255,0.1)",
    cardIconColor: config.services_feat_icon_color || "#FFD700",
    cardIconBg: config.services_feat_icon_bg || "rgba(255,215,0,0.18)",
    cardTitleColor: config.services_feat_title_color || "#FFD700",
    cardTextColor: config.services_feat_text_color || "rgba(255,255,255,0.88)",
    cardTitleSize: resolveFontSize(config.services_feat_title_size, "body", "1.05rem"),
    cardTextSize: resolveFontSize(config.services_feat_text_size, "detail", "0.85rem"),
    cardBadgeBg: config.services_feat_badge_bg || "rgba(255,215,0,0.08)",
    cardBadgeColor: config.services_feat_badge_text_color || "#FFD700",
    cardBadgeSize: resolveFontSize(config.services_feat_badge_size, "detail", "0.75rem"),
    ctaBg: config.services_cta_bg || "#FFD700",
    ctaTextColor: config.services_cta_text_color || "#000000",
    ctaSize: resolveFontSize(config.services_cta_size, "body", "0.95rem"),
    ctaBorder: config.services_cta_border || "", 
    imageBorderColor: config.services_image_border_color || "rgba(255,215,0,0.2)",
    badgeBg: config.services_badge_bg || "rgba(255,255,255,0.08)",
    badgeTextColor: config.services_badge_text_color || "#FFFFFF",
    badgeSize: resolveFontSize(config.services_badge_size, "detail", "0.7rem"),
    badgeValueSize: resolveFontSize(config.services_badge_value_size, "display", "1.4rem"),
    badgeBorderColor: config.services_image_badge_border_color || "rgba(255,215,0,0.2)",
    bottomBadgeBg: config.services_bottom_badge_bg || "rgba(255,255,255,0.08)",
    bottomBadgeIconColor: config.services_bottom_badge_icon_color || "#FFD700",
    bottomBadgeTitleColor: config.services_bottom_badge_text_color || "#FFD700",
    bottomBadgeSubtitleColor: config.services_bottom_badge_subtext_color || "rgba(255,255,255,0.85)",
    bottomBadgeTitleSize: resolveFontSize(config.services_bottom_badge_size, "detail", "0.75rem"),
    bottomBadgeSubtitleSize: resolveFontSize(config.services_bottom_badge_sub_size, "detail", "0.7rem"),
  }), [config]);

  const features = useMemo(() => {
    return FEATURE_INDEXES.map((index) => {
      const iconName = config[`services_feat_${index}_icon`] || FALLBACK_DATA[`services_feat_${index}_icon`];
      const title = config[`services_feat_${index}_title`] || "";
      const description = config[`services_feat_${index}_desc`] || "";
      const badge = config[`services_feat_${index}_badge`] || "";
      if (![title, description, badge].some(Boolean)) {
        return null;
      }
      return {
        icon: ICON_MAP[iconName] || Phone,
        title,
        description,
        badge,
      };
    }).filter(Boolean);
  }, [config]);

  const bottomBadges = useMemo(() => {
    const left = {
      icon: ICON_MAP[config.services_bottom_left_icon] || Phone,
      title: config.services_bottom_left_title || "",
      subtitle: config.services_bottom_left_subtitle || "",
    };
    const right = {
      icon: ICON_MAP[config.services_bottom_right_icon] || Zap,
      title: config.services_bottom_right_title || "",
      subtitle: config.services_bottom_right_subtitle || "",
    };
    return [left, right].filter(({ title, subtitle }) => title || subtitle);
  }, [config]);

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

  const imageVariant = (config.services_image_mode || "animate").toLowerCase();
  const resolvedImageSrc = useMemo(() => {
    if (imageVariant === "custom" && config.services_image_custom) {
      return config.services_image_custom;
    }
    if (imageVariant === "open") {
      return getImagePath("Schiffcontainer_open");
    }
    if (imageVariant === "closed") {
      return getImagePath("Schiffcontainer");
    }
    const shouldOpen = imageVariant === "animate" ? containerOpen : true;
    return shouldOpen ? getImagePath("Schiffcontainer_open") : getImagePath("Schiffcontainer");
  }, [config.services_image_custom, containerOpen, imageVariant]);

  const showHeroBadge = [
    config.services_badge_label_top,
    config.services_badge_value,
    config.services_badge_label_bottom
  ].some(Boolean);

  const ctaTarget = config.services_cta_link === "contact"
    ? "kontakt"
    : (config.services_cta_link || "kontakt");
  const shouldRenderCTA = Boolean(config.services_cta_text);

  return (
    <section
      id="leistungen"
      ref={sectionRef}
      className="viewport-section relative overflow-hidden text-white"
    >
      <div className="mx-auto max-w-7xl px-6 relative z-10 w-full h-full flex flex-col justify-center">
        <div className={`text-center mb-6 ${slideInClasses.fromLeft.transition} ${
          isVisible ? slideInClasses.fromLeft.visible : slideInClasses.fromLeft.hidden
        }`}>
          <h2 className="font-bold mb-2"
            style={{
              fontSize: styles.titleSize,
              color: styles.titleColor,
              textShadow: styles.titleShadow
            }}>
            {config.services_title}
          </h2>
          <p className="max-w-3xl mx-auto"
            style={{
              fontSize: styles.subtitleSize,
              color: styles.subtitleColor
            }}>
            {config.services_subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 items-center">
          <div
            ref={cardsRef}
            className="backdrop-blur-xl rounded-2xl p-4 lg:p-5 shadow-2xl shadow-black/20"
            style={{
              background: styles.cardBackground,
              border: `1px solid ${styles.cardBorderColor}`
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              {features.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={`${item.title}-${index}`}
                    className={`group backdrop-blur-md rounded-xl p-3 border transition-all duration-700 ${
                      showContent ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                    }`}
                    style={{
                      transitionDelay: `${index * 120}ms`,
                      borderColor: styles.cardBorderColor,
                      background: "rgba(255,255,255,0.02)"
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-8 h-8 rounded-lg border flex items-center justify-center group-hover:scale-110 transition-transform"
                        style={{
                          background: styles.cardIconBg,
                          borderColor: `${styles.cardIconColor}40`
                        }}
                      >
                        <IconComponent className="w-4 h-4" style={{ color: styles.cardIconColor }} />
                      </div>
                      <h3 className="font-bold"
                        style={{
                          fontSize: styles.cardTitleSize,
                          color: styles.cardTitleColor
                        }}>
                        {item.title}
                      </h3>
                    </div>

                    {item.description && (
                      <p
                        className="leading-relaxed mb-2"
                        style={{
                          fontSize: styles.cardTextSize,
                          color: styles.cardTextColor
                        }}
                      >
                        {item.description}
                      </p>
                    )}

                    {item.badge && (
                      <div className="flex items-center justify-between">
                        <span
                          className="font-medium px-2 py-1 rounded-full border"
                          style={{
                            fontSize: styles.cardBadgeSize,
                            background: styles.cardBadgeBg,
                            color: styles.cardBadgeColor,
                            borderColor: `${styles.cardBadgeColor}30`
                          }}
                        >
                          {item.badge}
                        </span>
                        <ArrowRight
                          className="w-3 h-3 transition-colors"
                          style={{ color: styles.cardIconColor }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {shouldRenderCTA && (
              <div className={`mt-4 text-center transition-all duration-700 delay-500 ${
                showContent ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}>
                <button
                  onClick={() => scrollToElement(ctaTarget)}
                  className="ctm-btn--primary btn-3d inline-flex items-center gap-2 rounded-xl glow-yellow"
                  style={{
                    backgroundColor: styles.ctaBg,
                    color: styles.ctaTextColor,
                    fontSize: styles.ctaSize,
                    border: styles.ctaBorder || undefined,
                    padding: "0.75rem 1.5rem"
                  }}
                >
                  <span className="relative z-10">{config.services_cta_text}</span>
                  <ArrowRight className="w-4 h-4 relative z-10" style={{ color: styles.ctaTextColor }} />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center">
            <div className="relative max-w-sm">
              <div
                className="backdrop-blur-md bg-white/[0.02] rounded-2xl p-1"
                style={{ border: `1px solid ${styles.imageBorderColor}` }}
              >
                <img
                  src={resolvedImageSrc}
                  alt={config.services_image_alt || "Container Transport"}
                  className={`w-full h-auto rounded-xl transition-all duration-600 ${
                    showContainer ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"
                  }`}
                  onError={(e) => {
                    console.log("Image load error:", e.target.src);
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              {showHeroBadge && (
                <div
                  className={`absolute -top-2 -right-2 backdrop-blur-md rounded-lg font-semibold transition-all duration-400 hover-lift animate-bounce ${
                    containerOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"
                  }`}
                  style={{
                    background: styles.badgeBg,
                    border: `1px solid ${styles.badgeBorderColor}`,
                    padding: "0.5rem 0.75rem",
                    animationDelay: "0.5s",
                    animationDuration: "3s"
                  }}
                >
                  {config.services_badge_label_top && (
                    <div style={{ color: styles.badgeTextColor, fontSize: styles.badgeSize }}>
                      {config.services_badge_label_top}
                    </div>
                  )}
                  {config.services_badge_value && (
                    <div
                      style={{
                        color: styles.badgeTextColor,
                        fontSize: styles.badgeValueSize,
                        fontWeight: 700
                      }}
                    >
                      {config.services_badge_value}
                    </div>
                  )}
                  {config.services_badge_label_bottom && (
                    <div style={{ color: styles.badgeTextColor, fontSize: styles.badgeSize }}>
                      {config.services_badge_label_bottom}
                    </div>
                  )}
                </div>
              )}

              {bottomBadges.length > 0 && (
                <div
                  className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 backdrop-blur-md rounded-lg transition-all duration-400 hover-lift animate-bounce ${
                    showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    background: styles.bottomBadgeBg,
                    border: `1px solid ${styles.badgeBorderColor}`,
                    padding: "0.6rem 0.9rem",
                    animationDelay: "0.5s",
                    animationDuration: "3s"
                  }}
                >
                  <div className="flex items-center gap-4">
                    {bottomBadges.map((badge, index) => {
                      const IconComponent = badge.icon;
                      return (
                        <div key={`${badge.title}-${index}`} className="text-center">
                          <IconComponent
                            className="mx-auto mb-1"
                            style={{
                              width: "0.8rem",
                              height: "0.8rem",
                              color: styles.bottomBadgeIconColor
                            }}
                          />
                          {badge.title && (
                            <div
                              className="font-bold"
                              style={{
                                color: styles.bottomBadgeTitleColor,
                                fontSize: styles.bottomBadgeTitleSize
                              }}
                            >
                              {badge.title}
                            </div>
                          )}
                          {badge.subtitle && (
                            <div
                              style={{
                                color: styles.bottomBadgeSubtitleColor,
                                fontSize: styles.bottomBadgeSubtitleSize
                              }}
                            >
                              {badge.subtitle}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}