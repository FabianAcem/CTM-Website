import React, { useEffect, useState } from 'react';
import { Calendar, Award, Users } from 'lucide-react';


const HistorySection = ({ scrollY }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('about');
      if (section) {
        const rect = section.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="about" className="min-h-screen py-20 relative overflow-hidden bg-gray-900/30">
      <div className="container mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Unsere <span className="text-yellow-400">Geschichte</span>
              </h2>
              <div className="w-24 h-1 bg-yellow-400 mb-8"></div>
            </div>

            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                Seit über <strong className="text-yellow-400">25 Jahren</strong> steht Container Transport Mainz für 
                zuverlässige und sichere Logistiklösungen. Was als kleines Familienunternehmen begann, 
                hat sich zu einem der führenden Spediteure in der Region entwickelt.
              </p>
              <p>
                Mit unserem Sitz in <strong className="text-white">Mainz</strong> bedienen wir ganz Deutschland 
                und Europa. Unser Erfolg basiert auf Vertrauen, Qualität und der persönlichen 
                Betreuung unserer Kunden.
              </p>
              <p>
                Heute transportieren wir <strong className="text-yellow-400">über 10.000 Tonnen</strong> jährlich 
                und beschäftigen ein Team von erfahrenen Logistikexperten, die täglich dafür sorgen, 
                dass Ihre Güter sicher ans Ziel gelangen.
              </p>
            </div>

            {/* Timeline Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold text-yellow-400">1998</div>
                <div className="text-sm text-gray-400">Gründung</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold text-yellow-400">2010</div>
                <div className="text-sm text-gray-400">ISO Zertifizierung</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold text-yellow-400">50+</div>
                <div className="text-sm text-gray-400">Mitarbeiter</div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className={`relative transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-lg border border-gray-700">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-white mb-6">Unsere Werte</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-300">Zuverlässigkeit und Pünktlichkeit</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-300">Höchste Sicherheitsstandards</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-300">Persönlicher Kundenservice</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-300">Nachhaltige Transportlösungen</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;