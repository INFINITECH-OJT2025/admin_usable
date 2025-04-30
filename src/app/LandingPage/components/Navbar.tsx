"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="logo-container">
          <img
            src="/img/NEXT_dark_logo.png"
            alt="Project ИEXT Logo"
            width={60}
            height={25}
            className="logo light-logo"
          />
          <img
            src="/img/NEXT_light_logo.png"
            alt="Project ИEXT Logo"
            width={60}
            height={25}
            className="logo dark-logo"
          />
        </div>

        <div className={`menu-container ${isMenuOpen ? "active" : ""}`}>
          <ul className="nav-links">
            <li>
              <Link href="#home" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="#about" onClick={() => setIsMenuOpen(false)}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="#contact" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </li>
            <li>
              <Link href="#faqs" onClick={() => setIsMenuOpen(false)}>
                FAQs
              </Link>
            </li>
            <li>
              <Link href="#testimonials" onClick={() => setIsMenuOpen(false)}>
                Testimonials
              </Link>
            </li>
          </ul>
          <div className="nav-buttons">
            <Link href="/Login" className="btn btn-outline">
              Login / Sign Up
            </Link>
            <Link href="/Signup" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>

        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  )
}
