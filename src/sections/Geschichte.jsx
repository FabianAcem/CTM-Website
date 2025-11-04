import React from 'react';
import { Calendar, Award, Users, ArrowRight } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation, slideInClasses, scrollToElement } from "../utils/animations.js";
import { useSection } from "../hooks/useWordPressData.js";
import { getIcon } from "../utils/icon-manager.js";


const HistorySection = () => {
  const historyData = useSection('history');
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.2 });
  const [timelineRef, visibleTimelineItems] = useStaggeredAnimation(3, 300);

  // WordPress-editierbare Timeline und Values
  const timelineData = historyData.timeline || [];
  const values = historyData.values || [];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="min-h-screen flex items-center relative overflow-hidden text-white py-20 lg:py-32"
    >
      <div className="container mx-auto px-6 max-w-7xl w-full">
        {/* Header mit glasmorphism */}
        <div className={`text-center mb-10 lg:mb-12 ${slideInClasses.fromLeft.transition} ${
          isVisible ? slideInClasses.fromLeft.visible : slideInClasses.fromLeft.hidden
        }`}>
          <div className="mb-8 hover-tilt transform-3d border border-white/12 rounded-2xl backdrop-blur-md bg-white/5 shadow-lg shadow-black/10 py-6 card-padding-x">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-ctm mb-3">
              {historyData.title || "Unsere Geschichte"}
            </h2>
            <div className="w-24 h-1 animated-gradient mx-auto mb-4 rounded-full"></div>
            <p className="text-base lg:text-lg text-white/80 max-w-2xl mx-auto">
              {historyData.subtitle || "Über 25 Jahre Erfahrung – vom Familienunternehmen zum Marktführer"}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content mit glasmorphism */}
          <div className={`space-y-6 ${slideInClasses.fromLeft.transition} ${
            isVisible ? slideInClasses.fromLeft.visible : slideInClasses.fromLeft.hidden
          }`}>
            <div className="card-modern py-6 card-padding-x space-y-4 text-base lg:text-lg text-white/90 leading-relaxed hover-tilt transform-3d">
              <div dangerouslySetInnerHTML={{ __html: historyData.content || `
                <p>Seit über <strong className="text-gradient">25 Jahren</strong> führend im Containertransport. 
                Was als kleines Familienunternehmen begann, ist heute einer der führenden Spediteure in der Region.</p>
                <p>Heute transportieren wir <strong className="text-gradient">über 15.000 Tonnen</strong> jährlich 
                mit einem Team von <strong className="text-white">50+ Experten</strong>, die täglich für 
                sichere Transporte sorgen.</p>
              ` }} />
            </div>

            {/* Timeline mit floating glass panels - durchsichtige Hintergrund-Kachel */}
            <div ref={timelineRef} className="py-5 card-padding-x lg:py-6 hover-tilt transform-3d border border-white/12 rounded-2xl backdrop-blur-md bg-white/5 shadow-lg shadow-black/10">
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-5">Meilensteine</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                {timelineData.filter(item => item.visible !== false).map((item, index) => (
                  <div
                    key={item.year}
                    className={`text-center card-modern card-hover hover-lift transform-3d py-4 card-padding-x transition-all duration-700 ${
                      visibleTimelineItems.includes(index)
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <div className="w-12 h-12 lg:w-14 lg:h-14 icon-3d icon-glow rounded-full flex items-center justify-center mx-auto mb-3">
                      {React.createElement(getIcon(item.icon), { className: "w-6 h-6 lg:w-7 lg:h-7 text-gradient" })}
                    </div>
                    <div className="text-xl lg:text-2xl font-bold text-gradient mb-1">{item.year}</div>
                    <div className="text-sm lg:text-base font-semibold text-white mb-1">{item.title}</div>
                    <div className="text-xs lg:text-sm text-white/70">{item.description}</div>
                    
                    {/* Gradient accent */}
                    <div className="absolute top-2 right-2 w-4 h-4 bg-gradient-to-br from-yellow-400/30 to-transparent rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA mit 3D button */}
            <div className="pt-2">
              <button
                onClick={() => scrollToElement("fleet")}
                className="ctm-btn--primary btn-3d inline-flex items-center gap-2 px-5 py-2.5 lg:px-6 lg:py-3 font-semibold rounded-xl glow-yellow"
              >
                <span className="relative z-10">Unsere Flotte ansehen</span>
                <ArrowRight className="w-4 h-4 relative z-10" />
              </button>
            </div>
          </div>

          {/* Values mit glasmorphism & 3D stats - durchsichtige Hintergrund-Kachel */}
            <div className={`py-6 card-padding-x lg:py-8 hover-tilt transform-3d border border-white/12 rounded-2xl backdrop-blur-md bg-white/5 shadow-lg shadow-black/10 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}>
            <h3 className="text-xl lg:text-2xl font-semibold text-white mb-6">Unsere Werte</h3>
            
            {/* 3D Stats Grid - WordPress-editierbar */}
            {historyData.stats && historyData.stats.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                {historyData.stats.filter(stat => stat.visible !== false).map((stat, index) => (
                  <div key={index} className="card-modern card-hover hover-lift transform-3d text-center py-4 card-padding-x">
                    <div className="text-xl lg:text-2xl font-bold text-gradient">{stat.number}</div>
                    <div className="text-xs lg:text-sm text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Values List mit glasmorphism bullets - WordPress-editierbar */}
            <div className="space-y-3">
              {values.filter(value => value.visible !== false).map((value, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 glass-weak rounded-lg p-2 hover-lift transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                  }`}
                  style={{ transitionDelay: `${800 + index * 100}ms` }}
                >
                  <div className="w-2 h-2 animated-gradient rounded-full flex-shrink-0"></div>
                  <span className="text-sm lg:text-base text-white/90">{value.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HistorySection;