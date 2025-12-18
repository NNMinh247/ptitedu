import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Slider from "../Slider/Slider";
import History from "../History/History";
import Achievements from "../Achievements/Achievements";
import Partners from "../Partners/Partners";
import CampusShowcase from "../Campus3D/CampusShowcase";
import Footer from "../Footer/Footer";
import AdmissionForm from "../Admission/AdmissionForm";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const sectionId = location.state.scrollTo;
      const element = document.getElementById(sectionId);
      
      if (element) {
        setTimeout(() => {
          const offsetTop = element.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }, 100); 
      }
    }
  }, [location]);

  return (
    <div className="home-container">
      <Navbar />

      <section id="home">
        <Slider />
      </section>

      <section id="history">
        <History />
      </section>

      <section id="achievements" className="achievements-section">
        <Achievements />
      </section>

      <section id="partners">
        <Partners />
      </section>

      <section id="campus">
        <CampusShowcase />
      </section>

      <section id="admission">
        <AdmissionForm />
      </section>

      <Footer />
    </div>
  );
}