import React, { useState, useEffect } from 'react';
import { Truck, Users, Package, MapPin, ArrowRight } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation, slideInClasses, scrollToElement } from "../utils/animations.js";
import { useSection } from "../hooks/useWordPressData.js";
import { getIcon } from "../utils/icon-manager.js";

const FleetSection = () => {
  const fleetData = useSection('fleet');
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.2 });
  const [statsRef, visibleStats] = useStaggeredAnimation(4, 200);
  const [detailsRef, visibleDetails] = useStaggeredAnimation(3, 300);
  
  const [counters, setCounters] = useState({});

  // WordPress-editierbare Stats
  const stats = fleetData.stats || [];
  
  useEffect(() => {
    if (isVisible && stats.length > 0) {
      // Animate counters for stats with numeric targets
      const duration = 2000;
      
      stats.forEach((stat, index) => {
        if (stat.target && !isNaN(stat.target)) {
          const target = parseInt(stat.target);
          const increment = target / (duration / 50);
          let current = 0;
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            setCounters(prev => ({ ...prev, [index]: Math.floor(current) }));
          }, 50);
        }
      });
    }
  }, [isVisible, stats]);

  // WordPress-editierbare Fleet Details  
  const fleetDetails = fleetData.vehicle_types || [];

  return (
    <section 
      id="fleet" 
      ref={sectionRef}
      className="min-h-screen flex items-center relative overflow-hidden text-white"
    >
      <div className="container mx-auto px-6 max-w-7xl w-full">
        {/* Section Title mit glasmorphism */}
        <div className={`text-center mb-10 lg:mb-12 ${slideInClasses.fromLeft.transition} ${
          isVisible ? slideInClasses.fromLeft.visible : slideInClasses.fromLeft.hidden
        }`}>
          <div className="mb-8 hover-tilt transform-3d border border-white/12 rounded-2xl backdrop-blur-md bg-white/5 shadow-lg shadow-black/10 py-6 card-padding-x">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-ctm mb-3">
              {fleetData.title || "Unsere Flotte"}
            </h2>
            <p className="text-base lg:text-lg text-white/80 max-w-2xl mx-auto">
              {fleetData.subtitle || "Moderne, umweltfreundliche Fahrzeugflotte für alle Transportbedürfnisse"}
            </p>
          </div>
        </div>

        {/* Kompakte Statistics Grid - alle 4 Kacheln durchsichtig */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-8">
          {stats.filter(stat => stat.visible !== false).map((stat, index) => (
            <div 
              key={stat.label}
              className={`card-hover hover-lift transform-3d text-center py-4 card-padding-x border border-white/12 backdrop-blur-md bg-white/5 shadow-lg shadow-black/10 rounded-2xl transition-all duration-700 ${
                visibleStats.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center items-center mb-2">
                <div className="icon-3d icon-glow p-2 rounded-lg bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30">
                  <div className="text-gradient">
                    {React.createElement(getIcon(stat.icon), { className: "w-6 h-6" })}
                  </div>
                </div>
              </div>
              <div className="text-lg lg:text-xl font-bold text-gradient mb-1">
                {stat.target && !isNaN(stat.target) ? (counters[index] || 0).toLocaleString() : stat.value}{stat.suffix || ""}
              </div>
              <div className="text-xs lg:text-sm text-white font-medium mb-1">{stat.label}</div>
              <div className="text-xs text-white/60">{stat.sublabel}</div>
              
              {/* Gradient accent corner */}
              <div className="absolute top-1 right-1 w-4 h-4 bg-gradient-to-br from-yellow-400/30 to-transparent rounded-full"></div>
            </div>
          ))}
        </div>

        {/* Rest des Content in kompakterer Anordnung */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Kompakte Fleet Visualization - durchsichtige Hintergrund-Kachel */}
          <div className={`rounded-xl py-5 card-padding-x hover-tilt transform-3d border border-white/12 backdrop-blur-md bg-white/5 shadow-lg shadow-black/10 transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}>
            <div className="text-center mb-3">
              <div className="inline-flex items-center gap-2 glass-weak px-3 py-1.5 rounded-full hover-lift">
                <Truck className="w-4 h-4 text-gradient" />
                <span className="text-xs lg:text-sm text-gradient font-semibold">
                  {counters.vehicles}+ Fahrzeuge
                </span>
              </div>
            </div>
            
            {/* Kompakte Fleet Kategorien */}
            <div className="space-y-2">
              {/* Standard-Fahrzeuge */}
              <div className="card-modern rounded-lg py-3 card-padding-x">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-semibold text-white">Standard</h4>
                  <span className="text-gradient font-bold text-xs">24</span>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-4 bg-gradient-to-t from-yellow-400/60 to-yellow-400/20 rounded-sm transition-all duration-300 hover:scale-110 ${
                        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
                      }`}
                      style={{ transitionDelay: `${i * 30}ms` }}
                    />
                  ))}
                </div>
                <div className="flex gap-0.5 mt-0.5">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div
                      key={i + 12}
                      className={`w-2.5 h-4 bg-gradient-to-t from-yellow-400/60 to-yellow-400/20 rounded-sm transition-all duration-300 hover:scale-110 ${
                        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
                      }`}
                      style={{ transitionDelay: `${(i + 12) * 30}ms` }}
                    />
                  ))}
                </div>
              </div>

              {/* Spezial-Fahrzeuge */}
              <div className="card-modern rounded-lg py-3 card-padding-x">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-semibold text-white">Spezial</h4>
                  <span className="text-gradient font-bold text-xs">12</span>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-3.5 bg-gradient-to-t from-yellow-500/60 to-yellow-500/20 rounded-sm transition-all duration-300 hover:scale-110 ${
                        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
                      }`}
                      style={{ transitionDelay: `${(i + 24) * 30}ms` }}
                    />
                  ))}
                </div>
              </div>

              {/* Schwerlast-Fahrzeuge */}
              <div className="card-modern rounded-lg py-3 card-padding-x">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-semibold text-white">Schwerlast</h4>
                  <span className="text-gradient font-bold text-xs">9</span>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 9 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-5 bg-gradient-to-t from-amber-600/60 to-amber-600/20 rounded-sm transition-all duration-300 hover:scale-110 ${
                        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
                      }`}
                      style={{ transitionDelay: `${(i + 36) * 30}ms` }}
                    />
                  ))}
                </div>
              </div>

              {/* Fleet Status Indicators */}
              <div className="mt-2 flex justify-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white/70">42</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-white/70">3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fleet Details mit glasmorphism */}
          <div ref={detailsRef} className="space-y-3">
            {fleetDetails.filter(detail => detail.visible !== false).map((detail, index) => (
              <div
                key={detail.title}
                className={`card-modern card-hover hover-lift transform-3d py-4 card-padding-x transition-all duration-700 ${
                  visibleDetails.includes(index) ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <h3 className="text-sm font-semibold text-white mb-2">{detail.title}</h3>
                <ul className="space-y-1">
                  {detail.features?.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-xs text-white/80">
                      <div className="w-1.5 h-1.5 animated-gradient rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Gradient accent corner */}
                <div className="absolute top-1 right-1 w-4 h-4 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA mit 3D button - WordPress-editierbar */}
        {fleetData.cta && (
          <div className={`text-center mt-6 transition-all duration-700 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <button
              onClick={() => scrollToElement(fleetData.cta.href?.replace('#', '') || "contact")}
              className="ctm-btn--primary btn-3d inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl glow-yellow"
            >
              <span className="relative z-10">{fleetData.cta.text || "Jetzt Transport anfragen"}</span>
              <ArrowRight className="w-4 h-4 relative z-10" />
            </button>
          </div>
        )}
      </div>

    </section>
  );
};

export default FleetSection;