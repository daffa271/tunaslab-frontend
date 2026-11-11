import Navbar from '../../../components/layout/Navbar.jsx'
import Footer from '../../../components/layout/Footer.jsx'
import HeroSection from '../sections/HeroSection.jsx'
import IntroductionSection from '../sections/IntroductionSection.jsx'
import ProblemSolutionSection from '../sections/ProblemSolutionSection.jsx'
import FeaturesSection from '../sections/FeaturesSection.jsx'
import HowItWorksSection from '../sections/HowItWorksSection.jsx'
import ProductSection from '../sections/ProductSection.jsx'
import MicrogreensSection from '../sections/MicrogreensSection.jsx'
import JourneySection from '../sections/JourneySection.jsx'
import TeamSection from '../sections/TeamSection.jsx'
import FAQSection from '../sections/FAQSection.jsx'
import ContactSection from '../sections/ContactSection.jsx'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <HeroSection />
        <IntroductionSection />
        <ProblemSolutionSection />
        <FeaturesSection />
        <HowItWorksSection />
        <ProductSection />
        <MicrogreensSection />
        <JourneySection />
        <TeamSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
