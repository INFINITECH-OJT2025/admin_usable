'use client';

import Navbar from "./components/Navbar"
import Header from "./components/Header"
import About from "./components/About"
import Features from "./components/Features"
import Testimonials from "./components/Testimonials"
import Faq from "./components/Faq"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import "./landingpage.css"

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="video-background">
        <video autoPlay muted loop playsInline className="background-video" poster="/images/background.png">
          <source src="/img/background-video-hd3.mp4" type="video/mp4" />
        </video>
        <div className="background-overlay"></div>
      </div>
      <Navbar />
      <Header />
      <About />
      <Features />
      <Testimonials />
      <Faq />
      <Contact />
      <Footer />
    </div>
  )
}
