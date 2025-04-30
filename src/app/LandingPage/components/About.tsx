"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import axios from "axios"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import './carousel.css'
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

interface Gallery {
  id: number;
  gallery_name: string;
  images: string[];
  status?: number;
}

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null)
  const [gallery, setGallery] = useState<Gallery | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      },
      { threshold: 0.1 },
    )

    if (aboutRef.current) {
      observer.observe(aboutRef.current)
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const fetchEnabledGallery = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}galleries/enabled`)
        setGallery(response.data)
      } catch (error) {
        console.error("Error fetching enabled gallery:", error)
      }
    }

    fetchEnabledGallery()
  }, [])

  return (
    <section id="about" className="about-section" ref={aboutRef}>
      <div className="section-container">
        <div className="section-header">
          <h2>
            About <span className="highlight">Us</span>
          </h2>
          <div className="section-divider"></div>
        </div>

        <div className="about-content">
          <div className="about-image">
            {gallery?.images?.length ? (
              <PhotoProvider>
                <Swiper
                  modules={[Autoplay, Pagination]}
                  spaceBetween={20}
                  slidesPerView={1}
                  loop={true}
                  autoplay={{ delay: 1000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  className="about-image-swiper"
                >
                  {gallery.images.map((image, idx) => (
                    <SwiperSlide key={idx} style={{ display: 'flex', justifyContent: 'center' }}>
                      <div style={{ width: '500px', height: '400px', position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
                        <PhotoView src={`http://127.0.0.1:8000${image}`}>
                          <img
                            src={`http://127.0.0.1:8000${image}`}
                            alt={`Gallery image ${idx + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'zoom-in' }}
                          />
                        </PhotoView>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </PhotoProvider>
            ) : (
              <p>Loading gallery...</p>
            )}
          </div>

          <div className="about-text">
            <h3>Our Story</h3>
            <p>
              Project ИEXT was founded with a vision to revolutionize the digital landscape. We believe in creating
              innovative solutions that empower businesses and individuals to achieve their full potential in the
              digital world.
            </p>

            <h3>Our Mission</h3>
            <p>
              Our mission is to provide cutting-edge technology that simplifies complex processes, enhances user
              experiences, and drives meaningful results for our clients.
            </p>

            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Happy Clients</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}