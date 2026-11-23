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