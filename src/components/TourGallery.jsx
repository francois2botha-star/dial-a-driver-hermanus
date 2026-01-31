import './TourGallery.css'

function TourGallery() {
  const galleryImages = import.meta.glob('../assets/activities gallery/*.{jpg,jpeg,jfif}', { eager: true, import: 'default' })
  
  const images = Object.entries(galleryImages).map(([path, src], index) => ({
    id: index + 1,
    src: src,
    alt: `Tour photo ${index + 1}`
  }))

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
