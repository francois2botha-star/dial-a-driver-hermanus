import { useState, useEffect, memo } from 'react'
import './TestimonialsCarousel.css'
import { testimonials } from '../data/testimonials'

const TestimonialCard = memo(({ testimonial, onPrev, onNext }) => (
  <div className="carousel-wrapper">
    <button className="carousel-btn prev-btn" onClick={onPrev} aria-label="Previous testimonial">
      ‹
    </button>

    <div className="testimonial-card">
      <div className="quote-icon">"</div>
      
      <div className="testimonial-content">
        <div className="stars">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <span key={i} className="star">⭐</span>
          ))}
        </div>
        
        <p className="testimonial-text">{testimonial.text}</p>
        
        <div className="testimonial-meta">
          <div className="customer-info">
            <div className="customer-avatar">
              {testimonial.name.charAt(0)}
            </div>
            <div className="customer-details">
              <h4 className="customer-name">{testimonial.name}</h4>
              <p className="customer-location">{testimonial.location}</p>
            </div>
          </div>
          
          <div className="service-tag">
            <span className="service-icon">🚗</span>
            <span>{testimonial.service}</span>
          </div>
        </div>
        
        <div className="testimonial-date">{testimonial.date}</div>
      </div>
    </div>

    <button className="carousel-btn next-btn" onClick={onNext} aria-label="Next testimonial">
      ›
    </button>
  </div>
))

TestimonialCard.displayName = 'TestimonialCard'

function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const goToNext = () => {
    setIsAutoPlay(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const goToPrev = () => {
    setIsAutoPlay(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index) => {
    setIsAutoPlay(false)
    setCurrentIndex(index)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="testimonials-carousel">
      <div className="container">
        <div className="testimonials-header">
          <h2>What Our Customers Say</h2>
          <p>Real experiences from travelers who chose Dial a Driver Hermanus</p>
        </div>

        <TestimonialCard 
          testimonial={currentTestimonial} 
          onNext={goToNext} 
          onPrev={goToPrev} 
        />

        <div className="carousel-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <div className="testimonials-cta">
          <p>Join hundreds of satisfied customers</p>
          <a href="#booking" className="cta-button">Book Your Ride Today</a>
        </div>
      </div>
    </section>
  )
}

export default memo(TestimonialsCarousel)
