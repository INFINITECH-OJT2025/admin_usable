"use client"
import { useEffect, useRef } from "react"
import { Zap, Shield, BarChart, Globe, Clock, Users } from "lucide-react"

export default function Features() {
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")

          const features = entry.target.querySelectorAll(".feature-card")
          features.forEach((feature, index) => {
            setTimeout(() => {
              feature.classList.add("animate-in")
            }, 150 * index)
          })
        }
      },
      { threshold: 0.1 },
    )

    if (featuresRef.current) {
      observer.observe(featuresRef.current)
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current)
      }
    }
  }, [])

  return (
    <section id="features" className="features-section" ref={featuresRef}>
      <div className="section-container">
        <div className="section-header">
          <h2>
            Our <span className="highlight">Features</span>
          </h2>
          <p className="section-subtitle">Discover what makes Project ИEXT the leading choice for digital innovation</p>
          <div className="section-divider"></div>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Zap size={32} />
            </div>
            <h3>Lightning Fast</h3>
            <p>Experience unparalleled speed and performance with our optimized platform.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Shield size={32} />
            </div>
            <h3>Secure & Reliable</h3>
            <p>Your data is protected with enterprise-grade security and 99.9% uptime.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <BarChart size={32} />
            </div>
            <h3>Advanced Analytics</h3>
            <p>Gain valuable insights with our comprehensive analytics dashboard.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Globe size={32} />
            </div>
            <h3>Global Reach</h3>
            <p>Connect with users worldwide through our distributed network.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Clock size={32} />
            </div>
            <h3>Time-Saving</h3>
            <p>Automate repetitive tasks and focus on what matters most to your business.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Users size={32} />
            </div>
            <h3>Collaborative</h3>
            <p>Work seamlessly with your team in real-time, anywhere in the world.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
