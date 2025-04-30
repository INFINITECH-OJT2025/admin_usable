"use client"
import { useEffect, useRef, useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "What is Project ИEXT?",
    answer:
      "Project ИEXT is a cutting-edge digital platform designed to help businesses and individuals streamline their operations, enhance productivity, and drive growth through innovative technology solutions.",
  },
  {
    id: 2,
    question: "How can I get started with Project ИEXT?",
    answer:
      'Getting started is easy! Simply click on the "Get Started" button at the top of the page, create an account, and follow the guided setup process. Our onboarding team is also available to help you every step of the way.',
  },
  {
    id: 3,
    question: "Is Project ИEXT suitable for small businesses?",
    answer:
      "Project ИEXT is designed to scale with your business. We offer plans tailored to businesses of all sizes, from startups to enterprise-level organizations.",
  },
  {
    id: 4,
    question: "What kind of support does Project ИEXT offer?",
    answer:
      "We provide 24/7 customer support through multiple channels including live chat, email, and phone. Our dedicated support team is always ready to assist you with any questions or issues you may encounter.",
  },
  {
    id: 5,
    question: "Can I integrate Project ИEXT with my existing tools?",
    answer:
      "Yes, Project ИEXT offers seamless integration with a wide range of popular business tools and platforms. Our API also allows for custom integrations to fit your specific needs.",
  },
]

export default function Faq() {
  const [openItem, setOpenItem] = useState<number | null>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")

          const items = entry.target.querySelectorAll(".faq-item")
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add("animate-in")
            }, 100 * index)
          })
        }
      },
      { threshold: 0.1 },
    )

    if (faqRef.current) {
      observer.observe(faqRef.current)
    }

    return () => {
      if (faqRef.current) {
        observer.unobserve(faqRef.current)
      }
    }
  }, [])

  return (
    <section id="faqs" className="faq-section" ref={faqRef}>
      <div className="section-container">
        <div className="section-header">
          <h2>
            Frequently Asked <span className="highlight">Questions</span>
          </h2>
          <p className="section-subtitle">Find answers to common questions about Project ИEXT</p>
          <div className="section-divider"></div>
        </div>

        <div className="faq-container">
          {faqs.map((faq) => (
            <div key={faq.id} className="faq-item">
              <button
                className={`faq-question ${openItem === faq.id ? "active" : ""}`}
                onClick={() => toggleItem(faq.id)}
              >
                <span>{faq.question}</span>
                {openItem === faq.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              <div className={`faq-answer ${openItem === faq.id ? "active" : ""}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
