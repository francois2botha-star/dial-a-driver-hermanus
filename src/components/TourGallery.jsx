import './TourGallery.css'
import img1 from '../assets/activities gallery/0ba472f7-997b-4c26-98a9-cc652cde2c2a.jfif'
import img2 from '../assets/activities gallery/14f84ca1-2a4a-4e43-b36b-30d48f02aec2.jfif'
import img3 from '../assets/activities gallery/2867c27e-23ae-4a22-96c7-176eb820dfdc.jfif'
import img4 from '../assets/activities gallery/2d799674-49a8-4735-8607-f7793c2786d0.jfif'
import img5 from '../assets/activities gallery/33b6d3e2-ffea-4a95-93dc-1401503c8fe9.jfif'
import img6 from '../assets/activities gallery/a76424d9-8249-477f-aa04-a7ebe2719b4e.jfif'
import img7 from '../assets/activities gallery/add79c67-e606-489d-805e-9b59c2755ee1.jfif'
import img8 from '../assets/activities gallery/d4de1df3-b89b-4fdb-b979-0a1b9b679224.jfif'
import img9 from '../assets/activities gallery/WhatsApp Image 2026-01-31 at 8.31.34 PM.jpeg'

function TourGallery() {
  const images = [
    { id: 1, src: img1, alt: 'Tour photo 1' },
    { id: 2, src: img2, alt: 'Tour photo 2' },
    { id: 3, src: img3, alt: 'Tour photo 3' },
    { id: 4, src: img4, alt: 'Tour photo 4' },
    { id: 5, src: img5, alt: 'Tour photo 5' },
    { id: 6, src: img6, alt: 'Tour photo 6' },
    { id: 7, src: img7, alt: 'Tour photo 7' },
    { id: 8, src: img8, alt: 'Tour photo 8' },
    { id: 9, src: img9, alt: 'Tour photo 9' }
  ]

  return (
    <div className="tour-gallery">
      <div className="gallery-grid">
        {images.map((image) => (
          <div key={image.id} className="gallery-item">
            <img 
              src={image.src} 
              alt={image.alt} 
              loading="lazy"
              className="gallery-image"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TourGallery
