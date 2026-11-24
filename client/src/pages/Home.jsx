import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import Ticker from '../components/Ticker'
import TrustBar from '../components/TrustBar'
import Services from '../components/Services'
import DomesticTours from '../components/DomesticTours'
import InternationalTours from '../components/InternationalTours'
import WhyChooseUs from '../components/WhyChooseUs'
import Testimonials from '../components/Testimonials'
import CtaBanner from '../components/CtaBanner'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Discover Travel & Tours | Hajj, Umrah & Tour Packages</title>
        <meta name="description" content="Your trusted travel partner in Peshawar for Hajj, Umrah, domestic tours, international tours, and expert visa consultancy." />
        
        {/* Open Graph tags for WhatsApp/Facebook previews */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Discover Travel & Tours" />
        <meta property="og:description" content="Book your next journey with Peshawar's most trusted travel agency." />
        <meta property="og:image" content="https://discover-travel.vercel.app/logo.webp" />
      </Helmet>

      <Hero />
      <Ticker />
      <TrustBar />
      <Services />
      <DomesticTours />
      <InternationalTours />
      <WhyChooseUs />
      <Testimonials />
      <CtaBanner />
    </>
  )
}