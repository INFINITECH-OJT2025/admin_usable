// import LandingPage from "./LandingPage/page";
  
// export default function Home() {
//   return (
//     <LandingPage></LandingPage>
//   );
// }

"use client"

import Navbar from "./LandingPage/components/Navbar"
import Header from "./LandingPage/components/Header"
import About from "./LandingPage/components/About"
import Features from "./LandingPage/components/Features"
import Testimonials from "./LandingPage/components/Testimonials"
import Faq from "./LandingPage/components/Faq"
import Contact from "./LandingPage/components/Contact"
import Footer from "./LandingPage/components/Footer"
import "./LandingPage/landingpage.css"

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
