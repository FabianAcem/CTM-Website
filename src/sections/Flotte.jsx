import React, { useEffect, useState } from 'react';
import { Truck, Users, Package, MapPin } from 'lucide-react';

const FleetSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    tonnage: 0,
    customers: 0,
    vehicles: 0,
    routes: 0
  });

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('fleet');
      if (section) {
        const rect = section.getBoundingClientRect();
        const visible = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(visible);
        
        if (visible && counters.tonnage === 0) {
          // Animate counters
          const duration = 2000;
          const targets = { tonnage: 15000, customers: 500, vehicles: 45, routes: 200 };
          
          Object.keys(targets).forEach(key => {
            const target = targets[key];
            const increment = target / (duration / 50);
            let current = 0;
            
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
            }, 50);
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const truckPositions = [
    { x: '10%', y: '20%', delay: '0ms' },
    { x: '70%', y: '15%', delay: '300ms' },
    { x: '30%', y: '60%', delay: '600ms' },
    { x: '80%', y: '70%', delay: '900ms' },
    { x: '50%', y: '40%', delay: '1200ms' }
  ];

  return (
    <section id="fleet" className="min-h-screen py-20 relative overflow-hidden bg-gray-900/30">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Unsere <span className="text-yellow-400">Flotte</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Eine moderne Fahrzeugflotte für alle Ihre Transportbedürfnisse
          </p>
        </div>

        {/* Animated Truck Fleet */}
        <div className="relative h-96 mb-16 bg-gray-900/30 rounded-lg overflow-hidden">
          {truckPositions.map((position, index) => (
            <div
              key={index}
              className={`absolute w-16 h-12 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
              style={{
                left: position.x,
                top: position.y,
                transitionDelay: position.delay
              }}
            >
              <svg viewBox="0 0 80 60" className="w-full h-full">
                <rect x="15" y="15" width="50" height="25" fill="#333" rx="2"/>
                <rect x="0" y="20" width="20" height="20" fill="#444" rx="2"/>
                <circle cx="12" cy="45" r="5" fill="#222"/>
                <circle cx="12" cy="45" r="3" fill="#666"/>
                <circle cx="50" cy="45" r="5" fill="#222"/>
                <circle cx="50" cy="45" r="3" fill="#666"/>
                <circle cx="65" cy="45" r="5" fill="#222"/>
                <circle cx="65" cy="45" r="3" fill="#666"/>
                <text x="40" y="30" textAnchor="middle" fill="#FFD700" fontSize="6" fontWeight="bold">CTM</text>
              </svg>
            </div>
          ))}

          {/* Fleet Stats Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`bg-black/80 backdrop-blur-sm p-8 rounded-lg border border-yellow-400/30 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <div className="text-center">
                <Truck className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-yellow-400 mb-2">{counters.vehicles}+</div>
                <div className="text-white font-semibold">Fahrzeuge im Einsatz</div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className={`text-center p-8 bg-gray-900/50 rounded-lg border border-gray-700 transition-all duration-1000 counter-animation ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
               style={{ transitionDelay: '200ms' }}>
            <Package className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <div className="text-4xl font-bold text-yellow-400 mb-2">{counters.tonnage.toLocaleString()}+</div>
            <div className="text-white font-semibold">Tonnen transportiert</div>
            <div className="text-gray-400 text-sm mt-2">pro Jahr</div>
          </div>

          <div className={`text-center p-8 bg-gray-900/50 rounded-lg border border-gray-700 transition-all duration-1000 counter-animation ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
               style={{ transitionDelay: '400ms' }}>
            <Users className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <div className="text-4xl font-bold text-yellow-400 mb-2">{counters.customers}+</div>
            <div className="text-white font-semibold">Zufriedene Kunden</div>
            <div className="text-gray-400 text-sm mt-2">seit 1998</div>
          </div>

          <div className={`text-center p-8 bg-gray-900/50 rounded-lg border border-gray-700 transition-all duration-1000 counter-animation ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
               style={{ transitionDelay: '600ms' }}>
            <Truck className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <div className="text-4xl font-bold text-yellow-400 mb-2">{counters.vehicles}</div>
            <div className="text-white font-semibold">Moderne Fahrzeuge</div>
            <div className="text-gray-400 text-sm mt-2">Euro 6 Standard</div>
          </div>

          <div className={`text-center p-8 bg-gray-900/50 rounded-lg border border-gray-700 transition-all duration-1000 counter-animation ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
               style={{ transitionDelay: '800ms' }}>
            <MapPin className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <div className="text-4xl font-bold text-yellow-400 mb-2">{counters.routes}+</div>
            <div className="text-white font-semibold">Europäische Routen</div>
            <div className="text-gray-400 text-sm mt-2">täglich bedient</div>
          </div>
        </div>

        {/* Fleet Details */}
        <div className={`mt-16 grid md:grid-cols-3 gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
             style={{ transitionDelay: '1000ms' }}>
          <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-700">
            <h3 className="text-2xl font-semibold text-white mb-4">Standard Container</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• 20ft & 40ft Container</li>
              <li>• Maximale Nutzlast: 28 Tonnen</li>
              <li>• GPS-Tracking</li>
              <li>• Temperaturüberwachung</li>
            </ul>
          </div>

          <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-700">
            <h3 className="text-2xl font-semibold text-white mb-4">Spezialfahrzeuge</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Kühlcontainer</li>
              <li>• Gefahrguttransport</li>
              <li>• Schwerlasttransporte</li>
              <li>• Überbreite Ladungen</li>
            </ul>
          </div>

          <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-700">
            <h3 className="text-2xl font-semibold text-white mb-4">Service</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• 24/7 Verfügbarkeit</li>
              <li>• Live-Tracking</li>
              <li>• Expressdienst</li>
              <li>• Vollversicherung</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FleetSection;