import React, { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [driverVisible, setDriverVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sichtbarkeit via IntersectionObserver (performanter als Scroll-Events)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const vis = entry.isIntersecting;
        setIsVisible(vis);
        if (vis) {
          // Fahrer leicht verzögert anzeigen
          const t = setTimeout(() => setDriverVisible(true), 700);
          return () => clearTimeout(t);
        }
      },
      { root: null, threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Formular
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", company: "", phone: "", message: "" });
    }, 3000);
  };
  const handleInputChange = (e) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0a0a0a] text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
    

        {/* Titel */}
        <div
          className={`text-center mb-10 md:mb-14 transition-all duration-700
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
            Jetzt <span className="text-[#FFD700]">Kontakt</span> aufnehmen
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Lassen Sie uns über Ihre Transportbedürfnisse sprechen.
          </p>
        </div>

        {/* Grid: Formular + Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Formular */}
          <div
            className={`transition-all duration-700
            ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
          >
            <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-6 sm:p-7 md:p-8">
              <h3 className="text-xl sm:text-2xl font-semibold mb-5">Angebot anfordern</h3>

              {isSubmitted ? (
                <div className="text-center py-10">
                  <CheckCircle className="w-12 h-12 sm:w-14 sm:h-14 text-[#FFD700] mx-auto mb-3" />
                  <h4 className="text-lg sm:text-xl font-semibold mb-1">Vielen Dank!</h4>
                  <p className="text-white/80">Wir melden uns schnellstmöglich bei Ihnen.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-white/80 text-sm mb-1.5">Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 bg-[#111] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                        placeholder="Ihr Name"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm mb-1.5">Unternehmen</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 bg-[#111] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                        placeholder="Ihr Unternehmen"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-white/80 text-sm mb-1.5">E-Mail *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 bg-[#111] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                        placeholder="ihre@email.de"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm mb-1.5">Telefon</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 bg-[#111] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                        placeholder="06131 123456"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-1.5">Nachricht *</label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-3.5 py-2.5 bg-[#111] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700] resize-none"
                      placeholder="Beschreiben Sie Ihre Transportanforderungen..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-[#FFD700] text-black font-semibold rounded-lg hover:bg-yellow-300 transition-transform duration-200 active:scale-[.98] flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Anfrage senden</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Kontakt-Infos */}
          <div
            className={`space-y-6 md:space-y-8 transition-all duration-700
            ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"}`}
          >
            <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-6 sm:p-7 md:p-8">
              <h3 className="text-xl sm:text-2xl font-semibold mb-5">Kontaktdaten</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFD700] mt-1" />
                  <div className="text-sm sm:text-base">
                    <h4 className="font-semibold text-white mb-1">Adresse</h4>
                    <p className="text-white/80">
                      Container Transport Mainz GmbH<br />Industriestraße 42<br />55116 Mainz
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFD700] mt-1" />
                  <div className="text-sm sm:text-base">
                    <h4 className="font-semibold text-white mb-1">Telefon</h4>
                    <p className="text-white/80">
                      +49 (0) 6131 / 123 456<br />Notfall: +49 (0) 151 / 987 654
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFD700] mt-1" />
                  <div className="text-sm sm:text-base">
                    <h4 className="font-semibold text-white mb-1">E-Mail</h4>
                    <p className="text-white/80">
                      info@ctm-mainz.de<br />service@ctm-mainz.de
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-6 sm:p-7 md:p-8">
              <h3 className="text-xl sm:text-2xl font-semibold mb-5">Öffnungszeiten</h3>
              <div className="space-y-2.5 text-sm sm:text-base">
                <div className="flex justify-between"><span className="text-white/80">Montag - Freitag</span><span className="text-white font-medium">6:00 - 18:00 Uhr</span></div>
                <div className="flex justify-between"><span className="text-white/80">Samstag</span><span className="text-white font-medium">8:00 - 14:00 Uhr</span></div>
                <div className="flex justify-between"><span className="text-white/80">Sonntag</span><span className="text-white/50">Geschlossen</span></div>
                <div className="mt-3 pt-3 border-t border-white/10 flex justify-between">
                  <span className="text-[#FFD700] font-medium">24/7 Notdienst</span>
                  <span className="text-[#FFD700] font-medium">Verfügbar</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-6 sm:p-7 md:p-8">
              <h3 className="text-xl sm:text-2xl font-semibold mb-5">Impressum</h3>
              <div className="space-y-2.5 text-xs sm:text-sm text-white/80">
                <p>
                  <strong className="text-white">Container Transport Mainz GmbH</strong><br />
                  Geschäftsführer: Hans Müller · HRB 12345 · Amtsgericht Mainz
                </p>
                <p>
                  <strong className="text-white">USt-IdNr.:</strong> DE123456789 · <strong className="text-white">Steuer-Nr.:</strong> 12/345/67890
                </p>
                <p className="pt-2 border-t border-white/10">
                  <strong className="text-white">Versicherung:</strong> Allianz Versicherung AG · Transportversicherung bis 5 Mio. EUR
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
