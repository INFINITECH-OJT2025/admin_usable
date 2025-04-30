"use client"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <Image src="/img/NEXT_dark_logo.png" alt="Project ИEXT Logo" width={250} height={100} />
            <p>Empowering digital innovation for a better tomorrow.</p>
          </div>

          <div className="footer-links">
            <div className="footer-links-column">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <Link href="#home">Home</Link>
                </li>
                <li>
                  <Link href="#about">About Us</Link>
                </li>
                <li>
                  <Link href="#features">Features</Link>
                </li>
                <li>
                  <Link href="#testimonials">Testimonials</Link>
                </li>
                <li>
                  <Link href="#faqs">FAQs</Link>
                </li>
                <li>
                  <Link href="#contact">Contact</Link>
                </li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h4>Resources</h4>
              <ul>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li>
                  <Link href="/documentation">Documentation</Link>
                </li>
                <li>
                  <Link href="/tutorials">Tutorials</Link>
                </li>
                <li>
                  <Link href="/case-studies">Case Studies</Link>
                </li>
                <li>
                  <Link href="/support">Support</Link>
                </li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h4>Legal</h4>
              <ul>
                <li>
                  <Link href="/terms">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/cookies">Cookie Policy</Link>
                </li>
                <li>
                  <Link href="/security">Security</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-newsletter">
            <h4>Subscribe to Our Newsletter</h4>
            <p>Stay updated with the latest news and updates from Project ИEXT.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" required />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="copyright">&copy; {currentYear} Project ИEXT. All rights reserved.</p>

          <div className="social-links">
            <Link href="https://facebook.com" className="social-link">
              <Facebook size={20} />
            </Link>
            <Link href="https://twitter.com" className="social-link">
              <Twitter size={20} />
            </Link>
            <Link href="https://instagram.com" className="social-link">
              <Instagram size={20} />
            </Link>
            <Link href="https://linkedin.com" className="social-link">
              <Linkedin size={20} />
            </Link>
            <Link href="https://github.com" className="social-link">
              <Github size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
