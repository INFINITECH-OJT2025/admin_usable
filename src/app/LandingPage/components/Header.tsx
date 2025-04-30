"use client"
import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      },
      { threshold: 0.1 },
    )

    if (headerRef.current) {
      observer.observe(headerRef.current)
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current)
      }
    }
  }, [])

  return (
    <header id="home" className="header" ref={headerRef}>
      <div className="header-content">
        <h1 className="header-title">
          Welcome to <br />Project <span className="highlight">ИEXT</span>
        </h1>
        <p className="header-subtitle">The future of digital innovation starts here</p>
        <div className="header-buttons">
          <Link href="/get-started" className="btn btn-primary btn-lg">
            Get Started
          </Link>
          <Link href="#about" className="btn btn-outline btn-lg" style={{ color: 'white'}}>
            Learn More
          </Link>
        </div>
      </div>
      <div className="header-image">
        <div className="floating-elements">
          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
          <div className="floating-element element-3"></div>
        </div>
      </div>
    </header>
  )
}
