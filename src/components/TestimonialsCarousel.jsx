import { useState, useEffect } from 'react'
import './TestimonialsCarousel.css'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    location: 'Cape Town',
    rating: 5,
    text: 'Absolutely fantastic service! Our driver was punctual, professional, and made our wine tour experience unforgettable. The vehicle was immaculate and comfortable.',
    service: 'Wine Tour',
    date: 'December 2024'
  },
  {
    id: 2,
    name: 'James Robertson',
    location: 'London, UK',
    rating: 5,
    text: 'Used Dial a Driver for airport transfers and whale watching. Best decision we made for our Hermanus trip! Excellent communication and knowledge of the area.',
    service: 'Airport Transfer & Tours',
    date: 'November 2024'
  },
  {
    id: 3,
    name: 'Amanda de Villiers',
    location: 'Johannesburg',
    rating: 5,
    text: 'Professional, reliable, and affordable. Our family trip was stress-free thanks to their excellent service. The driver went above and beyond!',
    service: 'Family Trip',
    date: 'October 2024'
  },
  {
    id: 4,
    name: 'Michael Chen',
    location: 'Singapore',
    rating: 5,
    text: 'Exceptional service from booking to drop-off. The driver was friendly, knowledgeable about local attractions, and made great recommendations.',
    service: 'Private Chauffeur',
    date: 'September 2024'
  },
  {
    id: 5,
    name: 'Emma Thompson',
    location: 'Sydney, Australia',
    rating: 5,
    text: 'Perfect for our whale watching adventure! Driver knew the best spots and times. Made our Hermanus visit truly memorable.',
    service: 'Whale Watching Tour',
    date: 'August 2024'
  },
  {
    id: 6,
    name: 'David Kruger',
    location: 'Pretoria',
    rating: 5,
    text: 'Highly recommend for corporate travel. Always on time, professional drivers, and competitive rates. We use them exclusively now.',
    service: 'Corporate Transfer',
    date: 'July 2024'
  },
  {
    id: 7,
    name: 'Lisa Williams',
    location: 'New York, USA',
    rating: 5,
    text: 'Incredible experience! The driver was patient with our schedule changes and provided fascinating insights about Hermanus. Top-notch service!',
    service: 'Custom Tour',
    date: 'June 2024'
  },
  {
    id: 8,
    name: 'Pierre Dubois',
    location: 'Paris, France',
    rating: 5,
    text: 'Très professionnel! Best shuttle service in South Africa. Comfortable rides, fair prices, and excellent local knowledge.',
    service: 'Multi-Day Tour',
    date: 'May 2024'
  }
]

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

        <div className="carousel-wrapper">
          <button className="carousel-btn prev-btn" onClick={goToPrev} aria-label="Previous testimonial">
            ‹
          </button>

          <div className="testimonial-card">
            <div className="quote-icon">"</div>
            
            <div className="testimonial-content">
              <div className="stars">
                {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                  <span key={i} className="star">⭐</span>
                ))}
              </div>
              
              <p className="testimonial-text">{currentTestimonial.text}</p>
              
              <div className="testimonial-meta">
                <div className="customer-info">
                  <div className="customer-avatar">
                    {currentTestimonial.name.charAt(0)}
                  </div>
                  <div className="customer-details">
                    <h4 className="customer-name">{currentTestimonial.name}</h4>
                    <p className="customer-location">{currentTestimonial.location}</p>
                  </div>
                </div>
                
                <div className="service-tag">
                  <span className="service-icon">🚗</span>
                  <span>{currentTestimonial.service}</span>
                </div>
              </div>
              
              <div className="testimonial-date">{currentTestimonial.date}</div>
            </div>
          </div>

          <button className="carousel-btn next-btn" onClick={goToNext} aria-label="Next testimonial">
            ›
          </button>
        </div>

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

export default TestimonialsCarousel
