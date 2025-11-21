import React from 'react';
import { Leaf, Shield, TrendingUp, Zap, Truck, Box, Anchor, Users, Globe } from 'lucide-react';
import { useScrollAnimation, slideInClasses } from '../utils/animations.js';
import { resolveFontSize } from '../utils/fontSize.js';
import TobiImage from '../assets/TobiLanding.png';

// Die Komponente empfängt jetzt 'data' aus App.jsx
const ValuesSection = ({ data }) => {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.2 });

  // Sicherstellen, dass data ein Objekt ist (Fallback auf leeres Objekt)
  const wpData = data || {};
  
  const iconMap = { Leaf, Shield, TrendingUp, Zap, Truck, Box, Anchor, Users, Globe };
  
  // Datenstruktur aufbauen - Greift direkt auf die flachen Keys zu (z.B. wpData.values_headline)
  const valuesData = {
    headline: wpData.values_headline || "Das sind wir bei CTM",
    subtext: wpData.values_subtext || "Tradition trifft auf neue Energie.",
    panelTitle: wpData.values_panel_title || "Die Vision von Jan & Tobias",
    
    items: [
      {
        icon: iconMap[wpData.val_item_1_icon] || Leaf,
        title: wpData.val_item_1_title || "Nachhaltige Innovation",
        description: wpData.val_item_1_desc || "Moderne Technologien für umweltfreundliche Logistik.",
        delay: "200ms"
      },
      {
        icon: iconMap[wpData.val_item_2_icon] || Shield,
        title: wpData.val_item_2_title || "Verlässlichkeit",
        description: wpData.val_item_2_desc || "Über 25 Jahre Erfahrung treffen auf frische Energie.",
        delay: "400ms"
      },
      {
        icon: iconMap[wpData.val_item_3_icon] || TrendingUp,
        title: wpData.val_item_3_title || "Kontinuierliches Wachstum",
        description: wpData.val_item_3_desc || "Mit Mut und Vision in die nächste Generation.",
        delay: "600ms"
      }
    ],
    
    image1: wpData.values_img_1 || null,
    name1: wpData.values_img_1_name || "Tobias",
    role1: wpData.values_img_1_role || "Geschäftsführer",
    image2: wpData.values_img_2 || null,
    name2: wpData.values_img_2_name || "Jan",
    role2: wpData.values_img_2_role || "Geschäftsführer",
    
    quote: wpData.values_quote || "Wir führen das Erbe unserer Familie weiter.",
    quoteAuthor: wpData.values_quote_author || "– Jan & Tobias",
    quoteRole: wpData.values_quote_role || "Geschäftsführung CTM",
    
    styles: {
      headlineSize: resolveFontSize(wpData.values_headline_size, 'display', '2.5rem'),
      subtextSize: resolveFontSize(wpData.values_subtext_size, 'body', '1rem'),
      headlineColor: wpData.values_headline_color || "#FFD700",
      textColor: wpData.values_text_color || "#D1D5DB",
      panelTitleColor: wpData.values_panel_title_color || "#FFD700",
      iconColor: wpData.values_icon_color || "#FFD700",
      itemTitleColor: wpData.values_item_title_color || "#FFD700",
      itemDescColor: wpData.values_item_desc_color || "#FFFFFF",
      imgNameColor: wpData.values_img_name_color || "#FFFFFF",
      imgRoleColor: wpData.values_img_role_color || "#FFD700",
      quoteTextColor: wpData.values_quote_text_color || "#FFFFFF",
      quoteBorderColor: wpData.values_quote_border_color || "rgba(255,215,0,0.2)"
    }
  };

  return (
    <section id="werte" ref={sectionRef} className="viewport-section relative overflow-hidden text-white">
      <style>{`
        .value-icon-3d { filter: drop-shadow(0 4px 8px rgba(255, 215, 0, 0.3)); animation: icon-glow 3s ease-in-out infinite alternate; }
        @keyframes icon-glow { 0% { filter: drop-shadow(0 4px 8px rgba(255, 215, 0, 0.3)); } 100% { filter: drop-shadow(0 6px 12px rgba(255, 215, 0, 0.5)); } }
      `}</style>

      <div className="container mx-auto px-6 max-w-7xl w-full h-full flex flex-col justify-center">
        
        <div className={`text-center mb-8 ${slideInClasses.fromLeft.transition} ${isVisible ? slideInClasses.fromLeft.visible : slideInClasses.fromLeft.hidden}`}>
          <h2 className="font-bold mb-3" 
              style={{ fontSize: valuesData.styles.headlineSize, color: valuesData.styles.headlineColor, textShadow: '0 0 20px rgba(255, 215, 0, 0.3)' }}>
            {valuesData.headline}
          </h2>
          <p className="max-w-2xl mx-auto" style={{ fontSize: valuesData.styles.subtextSize, color: valuesData.styles.textColor }}>
            {valuesData.subtext}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-center">
          {/* Linke Kachel */}
          <div className="lg:col-span-3 flex justify-center">
            <div className={`w-full backdrop-blur-xl bg-white/[0.04] rounded-3xl p-6 border border-yellow-400/10 shadow-2xl shadow-black/40 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="text-center mb-6">
                <h3 className="text-xl lg:text-2xl font-bold mb-2" style={{ color: valuesData.styles.panelTitleColor }}>{valuesData.panelTitle}</h3>
                <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>
              </div>

              <div className="space-y-4">
                {valuesData.items.map((value) => (
                  <div key={value.title} className={`backdrop-blur-md bg-white/[0.02] rounded-2xl p-4 border border-yellow-400/5 hover:border-yellow-400/20 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: value.delay, background: 'linear-gradient(135deg, rgba(255,215,0,0.02), rgba(200,170,105,0.01))' }}>
                    <div className="flex items-start gap-3">
                      <div className="value-icon-3d flex-shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400/20 to-yellow-600/10 border border-yellow-400/30 flex items-center justify-center">
                          <value.icon className="w-5 h-5" style={{ color: valuesData.styles.iconColor }} />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-lg font-semibold mb-1" style={{ color: valuesData.styles.itemTitleColor }}>{value.title}</h4>
                        <p className="leading-relaxed text-sm" style={{ color: valuesData.styles.itemDescColor }}>{value.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rechte Spalte (Bilder) */}
          <div className="lg:col-span-2 flex flex-col h-full">
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="flex-1 flex items-center justify-center mb-6">
                <div className="flex items-center">
                  {/* Person 1 */}
                  <div className="relative w-40 h-56 rounded-2xl overflow-hidden border-2 border-yellow-400/20 shadow-xl shadow-black/30 z-20 -mr-4">
                    {valuesData.image1 ? (
                      <img src={valuesData.image1} alt={valuesData.name1} className="w-full h-full object-cover"/>
                    ) : (
                      <img src={TobiImage} alt="Tobias" className="w-full h-full object-cover"/>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 backdrop-blur-sm bg-white/3 rounded-lg px-4 py-2 border border-white/10">
                      <div className="text-center">
                        <div className="font-semibold text-sm" style={{ color: valuesData.styles.imgNameColor }}>{valuesData.name1}</div>
                        <div className="text-sm" style={{ color: valuesData.styles.imgRoleColor }}>{valuesData.role1}</div>
                      </div>
                    </div>
                  </div>
                  {/* Person 2 */}
                  <div className="relative w-40 h-56 rounded-2xl overflow-hidden border-2 border-yellow-400/20 shadow-xl shadow-black/30 z-20 mt-3">
                    {valuesData.image2 ? (
                      <img src={valuesData.image2} alt={valuesData.name2} className="w-full h-full object-cover"/>
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center"><span className="text-xs">Kein Bild</span></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 backdrop-blur-sm bg-white/3 rounded-lg px-4 py-2 border border-white/10">
                      <div className="text-center">
                        <div className="font-semibold text-sm" style={{ color: valuesData.styles.imgNameColor }}>{valuesData.name2}</div>
                        <div className="text-sm" style={{ color: valuesData.styles.imgRoleColor }}>{valuesData.role2}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Zitat */}
              <div className={`backdrop-blur-md bg-white/[0.04] rounded-2xl p-4 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ borderColor: valuesData.styles.quoteBorderColor }}>
                <div className="text-center">
                  <p className="italic text-base leading-relaxed mb-3" style={{ color: valuesData.styles.quoteTextColor }}>"{valuesData.quote}"</p>
                  <div className="font-semibold text-sm text-yellow-400">{valuesData.quoteAuthor}</div>
                  <div className="text-yellow-400/60 text-xs mt-1">{valuesData.quoteRole}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;