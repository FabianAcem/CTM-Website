import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { scrollToElement } from "../utils/animations.js";
import { getIcon } from "../utils/icon-manager.js";
import { useSection } from "../hooks/useWordPressData.js";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // WordPress CMS-Daten laden
  const { sectionData: headerData, loading } = useSection('header');

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

  // Loading state
  if (loading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 pt-12 px-6">
        <div className="w-full max-w-6xl mx-auto">
          <nav className="glass rounded-2xl px-6 py-3 flex items-center justify-center">
            <div className="animate-spin h-5 w-5 border-2 border-yellow-400 border-t-transparent rounded-full"></div>
          </nav>
        </div>
      </header>
    );
  }

  // WordPress-editierbares Logo Icon
  const LogoIcon = getIcon(headerData.logo_icon);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-6 px-6">
      <div className="w-full max-w-7xl mx-auto">
        <nav className="glass hover-lift rounded-2xl px-6 py-3 flex items-center justify-between transform-3d">
          {/* WordPress-editierbares CTM Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToElement("hero")}
              aria-label="Zur Startsektion (Hero) scrollen"
              className="btn-3d"
            >
              <div 
                className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br flex items-center justify-center font-bold tracking-tight shadow-lg transform-3d"
                style={{ 
                  backgroundColor: headerData.logo_bg_color || '#FFD700',
                  color: headerData.logo_text_color || '#000000'
                }}
              >
                <span className="relative z-10">{headerData.logo_text || 'CTM'}</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent"></div>
              </div>
            </button>
          </div>

          {/* WordPress-editierbare Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {headerData.navigation?.map((item, index) => (
              <NavButton 
                key={index}
                label={item.text} 
                icon={item.icon}
                onClick={() => handleNav(item.href?.replace('#', ''))} 
                isPrimary={item.isPrimary}
                primaryColor={headerData.colors?.primary}
              />
            ))}
          </div>

          {/* Mobile Menu Button with 3D effect */}
          <button
            className="md:hidden glass hover-tilt rounded-xl p-3 transition-all duration-300"
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

        {/* WordPress-editierbare Mobile Navigation */}
        {open && (
          <div className="md:hidden mt-4 glass rounded-2xl p-4 transform-3d animate-in slide-in-from-top-2 duration-300">
            {headerData.nav_items?.map((item, index) => (
              <MobileItem 
                key={index}
                label={item.text} 
                icon={item.icon}
                onClick={() => handleNav(item.target)} 
                isPrimary={item.isPrimary}
                primaryColor={headerData.primary_color}
              />
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

function NavButton({ label, icon, onClick, isPrimary = false, primaryColor = "#FFD700" }) {
  const IconComponent = icon ? getIcon(icon) : null;
  
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 transform-3d ${
        isPrimary
          ? "btn-3d text-black shadow-lg hover:shadow-xl"
          : "glass hover:bg-white/15 text-yellow-100 hover:text-white border border-white/10 hover:border-yellow-400/30"
      }`}
      style={isPrimary ? { backgroundColor: primaryColor } : {}}
    >
      {IconComponent && <IconComponent className="h-4 w-4" />}
      <span className="relative z-10">{label}</span>
      {isPrimary && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      )}
    </button>
  );
}

function MobileItem({ label, icon, onClick, isPrimary = false, primaryColor = "#FFD700" }) {
  const IconComponent = icon ? getIcon(icon) : null;
  
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 text-left mt-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 hover-lift ${
        isPrimary
          ? "text-black"
          : "glass border border-white/10 text-yellow-100 hover:bg-white/15 hover:border-yellow-400/30"
      }`}
      style={isPrimary ? { backgroundColor: primaryColor } : {}}
    >
      {IconComponent && <IconComponent className="h-4 w-4" />}
      <span className="relative z-10">{label}</span>
    </button>
  );
}
