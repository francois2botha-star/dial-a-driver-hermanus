import './SocialFloatingButtons.css'

function SocialFloatingButtons() {
  return (
    <div className="social-floating-buttons">
      <a
        href="https://wa.me/27647997924"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp"
        aria-label="Contact us on WhatsApp"
        title="WhatsApp"
      >
        <svg viewBox="0 0 175.216 175.552" fill="none">
          <defs>
            <linearGradient id="b" x1="85.915" x2="86.535" y1="32.567" y2="137.092" gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#57d163"/>
              <stop offset="1" stop-color="#23b33a"/>
            </linearGradient>
          </defs>
          <circle cx="87.608" cy="87.776" r="87.608" fill="url(#b)"/>
          <path fill="#fff" fill-rule="evenodd" d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"/>
        </svg>
      </a>

      <a
        href="https://www.facebook.com/dialadriverhermanus"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn facebook"
        aria-label="Visit us on Facebook"
        title="Facebook"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a>
    </div>
  )
}

export default SocialFloatingButtons
