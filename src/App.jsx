import Header from "./components/Header.jsx";
import Hero from "./sections/Hero.jsx";
import Contact from "./sections/Contact.jsx";   // <-- dein Kontaktbereich
import Footer from "./components/Footer.jsx";   // <-- schmaler Seitenabschluss
import Leistungen from "./sections/Leistungen.jsx";
import Geschichte from "./sections/Geschichte.jsx";
import Flotte from "./sections/Flotte.jsx"
export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Leistungen />
      <Geschichte/>
      <Flotte/>
      {/* ...weitere Sektionen wie Features/History/Fleet/Testimonials... */}
      <Contact />
      <Footer />
    </div>
  );
}
