import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <header className="top-6 z-40 px-4 sm:px-6 lg:px-8">
      <div
        className={[
          "mx-auto max-w-7xl",
          "rounded-3xl",
          "border border-yellow-400/40 border-t-0", // obere Linie entfernt
          "bg-gray-950/70 backdrop-blur-sm",
          scrolled ? "bg-gray-950/80" : "",
        ].join(" ")}
      >
        <nav className="flex items-center justify-between px-4 sm:px-6 py-2">
          {/* Left: CTM Square */}
          <button
            onClick={() => scrollTo("hero")}
            aria-label="Zur Startsektion (Hero) scrollen"
          >
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-sm bg-yellow-400 text-gray-900 flex items-center justify-center font-bold tracking-tight transition-transform select-none">
              CTM
            </div>
          </button>

          {/* Desktop Tabs */}
          <div className="hidden md:flex items-center gap-1">
            <NavButton label="Über uns" onClick={() => handleNav("about")} />
            <NavButton label="Kontakt" onClick={() => handleNav("contact")} />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md border border-yellow-400/30 bg-yellow-400/5 p-1.5 text-yellow-100 hover:bg-yellow-400/10 focus:outline-none focus:ring-1 focus:ring-yellow-400/40"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile Drawer */}
        {open && (
          <div className="md:hidden border-t border-yellow-400/20 px-4 sm:px-6 pb-3">
            <MobileItem label="Über uns" onClick={() => handleNav("about")} />
            <MobileItem label="Kontakt" onClick={() => handleNav("contact")} />
          </div>
        )}
      </div>
    </header>
  );
}

function NavButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-lg border border-yellow-400/30 bg-yellow-400/5 text-yellow-100 text-sm font-medium hover:bg-yellow-400/10 transition-colors"
    >
      {label}
    </button>
  );
}

function MobileItem({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left mt-2 px-3 py-2 rounded-lg border border-yellow-400/20 bg-gray-800/40 text-yellow-100 text-sm font-medium hover:bg-yellow-400/5 transition-colors"
    >
      {label}
    </button>
  );
}
