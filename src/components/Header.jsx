import React, { useEffect, useState } from "react";
import { Menu, X, Heart, Briefcase, Clock, Mail } from "lucide-react";
import { scrollToElement } from "../utils/animations.js";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (target) => {
    setOpen(false);
    scrollToElement(target);
  };

  // Navigation Items für unsere Sektionen
  const navigationItems = [
    { label: "Das sind wir", target: "werte", icon: Heart, isPrimary: false },
    { label: "Unsere Leistungen", target: "leistungen", icon: Briefcase, isPrimary: false },
    { label: "Geschichte", target: "geschichte", icon: Clock, isPrimary: false },
    { label: "Kontakt", target: "kontakt", icon: Mail, isPrimary: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-6 px-6">
      <div className="w-full max-w-7xl mx-auto">
        <nav className={`backdrop-blur-xl bg-white/[0.02] border border-yellow-400/10 hover:border-yellow-400/20 rounded-2xl px-6 py-4 flex items-center justify-between transition-all duration-300 shadow-xl shadow-black/20 ${
          scrolled ? "bg-white/[0.05] border-yellow-400/15" : ""
        }`}>
          
          {/* CTM Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToElement("hero")}
              aria-label="Zur Startsektion scrollen"
              className="group transition-all duration-300 hover:scale-105"
            >
              <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center font-bold text-lg tracking-tight shadow-lg shadow-yellow-900/30 group-hover:shadow-xl group-hover:shadow-yellow-900/40 transition-all duration-300">
                <span className="relative z-10 text-black">CTM</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-3">
            {navigationItems.map((item, index) => (
              <NavButton 
                key={index}
                label={item.label} 
                icon={item.icon}
                onClick={() => handleNav(item.target)} 
                isPrimary={item.isPrimary}
              />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden backdrop-blur-sm bg-white/[0.02] border border-white/10 hover:border-yellow-400/30 rounded-xl p-3 transition-all duration-300 hover:bg-white/[0.05]"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
          >
            <div className="relative">
              {open ? (
                <X className="h-5 w-5 text-yellow-100 transition-transform duration-300 rotate-90" />
              ) : (
                <Menu className="h-5 w-5 text-yellow-100 transition-transform duration-300" />
              )}
            </div>
          </button>
        </nav>

        {/* Mobile Navigation */}
        {open && (
          <div className="lg:hidden mt-4 backdrop-blur-xl bg-white/[0.02] border border-yellow-400/10 rounded-2xl p-4 shadow-xl shadow-black/20 animate-in slide-in-from-top-2 duration-300">
            {navigationItems.map((item, index) => (
              <MobileItem 
                key={index}
                label={item.label} 
                icon={item.icon}
                onClick={() => handleNav(item.target)} 
                isPrimary={item.isPrimary}
              />
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

function NavButton({ label, icon: IconComponent, onClick, isPrimary = false }) {
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105 ${
        isPrimary
          ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg shadow-yellow-900/30 hover:shadow-xl hover:shadow-yellow-900/40 hover:from-yellow-300 hover:to-yellow-400"
          : "backdrop-blur-sm bg-white/[0.02] border border-white/10 hover:border-yellow-400/30 text-yellow-100 hover:text-white hover:bg-white/[0.05]"
      }`}
    >
      {IconComponent && <IconComponent className="h-4 w-4" />}
      <span className="relative z-10 whitespace-nowrap">{label}</span>
      {isPrimary && (
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      )}
    </button>
  );
}

function MobileItem({ label, icon: IconComponent, onClick, isPrimary = false }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 text-left mb-2 last:mb-0 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-[1.02] ${
        isPrimary
          ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg shadow-yellow-900/30"
          : "backdrop-blur-sm bg-white/[0.02] border border-white/10 hover:border-yellow-400/30 text-yellow-100 hover:text-white hover:bg-white/[0.05]"
      }`}
    >
      {IconComponent && <IconComponent className="h-4 w-4" />}
      <span className="relative z-10">{label}</span>
    </button>
  );
}
