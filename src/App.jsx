import Header from "./components/Header.jsx";
import Hero from "./sections/Hero.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Leistungen from "./sections/Leistungen.jsx";
import Geschichte from "./sections/Geschichte.jsx";
import Flotte from "./sections/Flotte.jsx";
import { STANDALONE_DATA } from "./utils/constants.js";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 relative">
      {/* Globaler, nahtloser Hintergrund über die gesamte Seite */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Hellerer Hauptgradient mit mehr Intensität */}
        <div className="absolute inset-0 bg-gradient-to-tr from-sky-1200 via-sky-1000 to-sky-1100" />
        
        {/* Zusätzlicher Overlay-Gradient für mehr Tiefe */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-sky-800 to-blue-1000" />
        
        {/* Prominente gelbe Blur-Punkte für Dynamik */}
        <div className="absolute -right-16 top-1/4 h-72 w-72 rounded-full bg-yellow-400/40 blur-[120px]" />
        <div className="absolute top-16 left-20 h-56 w-56 rounded-full bg-yellow-300/35 blur-[100px]" />
        <div className="absolute bottom-1/3 left-12 h-64 w-64 rounded-full bg-yellow-500/35 blur-[110px]" />
        <div className="absolute bottom-16 right-1/3 h-80 w-80 rounded-full bg-yellow-400/30 blur-[130px]" />
        
        {/* Zusätzliche blaue Akzente für Balance */}
        <div className="absolute top-1/2 right-20 h-48 w-48 rounded-full bg-sky-400/25 blur-[90px]" />
        <div className="absolute top-3/4 left-1/2 h-40 w-40 rounded-full bg-blue-300/22 blur-[80px]" />
        <div className="absolute top-1/3 left-2/3 h-44 w-44 rounded-full bg-sky-300/20 blur-[85px]" />
      </div>
      
      <Header />
      
      {/* Hero Section - Full viewport */}
      <Hero data={STANDALONE_DATA.hero} />
      
      {/* Services Section */}
      <Leistungen data={STANDALONE_DATA.services} />
      
      {/* About Section */}
      <Geschichte data={STANDALONE_DATA.history} />
      
      {/* Fleet Section */}
      <Flotte data={STANDALONE_DATA.fleet} />
      
      {/* Contact Section */}
      <Contact data={STANDALONE_DATA.contact} />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
