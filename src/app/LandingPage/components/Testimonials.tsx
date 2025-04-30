import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Star } from "lucide-react"
import axios from "axios"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"
import './modal.css'

interface Testimonial {
  id: number
  name: string
  role: string
  image: string
  message: string
  rating: number
  is_visible: boolean
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedTestimonial(null), 300) // delay to allow animation
  }

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}testimonials`)
        const visibleTestimonials = response.data.filter((t: Testimonial) => t.is_visible)
        setTestimonials(visibleTestimonials)
      } catch (error) {
        console.error("Failed to fetch testimonials", error)
      }
    }

    fetchTestimonials()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      },
      { threshold: 0.1 }
    )

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current)
    }

    return () => {
      if (testimonialsRef.current) {
        observer.unobserve(testimonialsRef.current)
      }
    }
  }, [])

  const truncate = (text: string | undefined | null, limit: number) =>
    text && text.length > limit ? text.slice(0, limit) + '…' : text || ''

  return (
    <section id="testimonials" className="testimonials-section" ref={testimonialsRef}>
      <div className="section-container">
        <div className="section-header">
          <h2>
            What Our <span className="highlight">Clients Say</span>
          </h2>
          <div className="section-divider"></div>
        </div>

        {testimonials.length > 0 ? (
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            loop={true}
            autoplay={{ delay: 0, disableOnInteraction: false }}
            speed={5000}
            modules={[Autoplay]}
            className="testimonials-wrapper"
            breakpoints={{
              430: {
                slidesPerView: 1, // Show 3 items on mobile
              },
              768: {
                slidesPerView: 2, // Show 5 items on tablet
              },
              1024: {
                slidesPerView: 3, // Show 7 items on desktop
              },
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="testimonial-card cursor-pointer" onClick={() => openModal(testimonial)}>
                  <div className="testimonial-content">
                    <div className="quote-mark">"</div>
                    <br />
                    <p>"{truncate(testimonial.message, 150)}"</p>
                    <div className="testimonial-rating">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < testimonial.rating ? "#4285F4" : "none"}
                          stroke={i < testimonial.rating ? "#4285F4" : "#CBD5E0"}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="testimonial-author">
                    <div className="author-image flex items-center justify-center w-[60px] h-[60px] rounded-full bg-gray-100 overflow-hidden">
                      <i className="bx bx-user text-2xl text-gray-500" />
                    </div>
                    <div className="author-info">
                      <h4><span>{testimonial.name}</span></h4>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center mt-6 text-gray-500">No testimonials available.</p>
        )}
      </div>
      {selectedTestimonial && (
        <div className={`modal-overlay ${isModalOpen ? 'fade-in' : 'fade-out'}`} onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>&times;</button>
            <div className="modal-quote-mark">“</div>
            <h3 className="modal-name">{selectedTestimonial.name}</h3>
            <p className="modal-message">{selectedTestimonial.message}</p>
          </div>
        </div>
      )}
    </section>
  )
}
