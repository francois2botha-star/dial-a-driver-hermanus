import { Helmet } from "react-helmet"

const SEO = ({
  title = "Dial-a-Driver Hermanus | Shuttle & Private Driver Services",
  description = "Reliable shuttle, airport transfers and private drivers in Hermanus and the Western Cape. 24/7 professional chauffeur services.",
  image = "https://francois2botha-star.github.io/dial-a-driver-hermanus/og-image.jpg",
  url = "https://francois2botha-star.github.io/dial-a-driver-hermanus"
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
  </Helmet>
)

export default SEO
