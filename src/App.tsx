import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProductIntroSection } from '@/components/sections/ProductIntroSection'
import { BrandShowcaseSection } from '@/components/sections/BrandShowcaseSection'
import { FeatureHighlightSection } from '@/components/sections/FeatureHighlightSection'
import { ProductShowcaseCarousel } from '@/components/sections/ProductShowcaseCarousel'
import { PromiseSection } from '@/components/sections/PromiseSection'
import { IngredientsSection } from '@/components/sections/IngredientsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { InfluencerGridSection } from '@/components/sections/InfluencerGridSection'
import { HairTypeSection } from '@/components/sections/HairTypeSection'
import { EditorialSection } from '@/components/sections/EditorialSection'
import { NewsletterCtaSection } from '@/components/sections/NewsletterCtaSection'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main>
        <HeroSection />
        <ProductIntroSection />
        <BrandShowcaseSection />
        <FeatureHighlightSection />
        <ProductShowcaseCarousel />
        <PromiseSection />
        <IngredientsSection />
        <TestimonialsSection />
        <InfluencerGridSection />
        <HairTypeSection />
        <EditorialSection />
        <NewsletterCtaSection />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
