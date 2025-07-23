import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { Features } from "@/components/Features"
import { WhyNookat } from "@/components/WhyNookat"
import { DownloadSection } from "@/components/Download"
import { Footer } from "@/components/Footer"

export default function NookatLanding() {
  return (
    <div className="min-h-screen text-slate-900 dark:text-white">
      <Header />
      <Hero />
      <Features />
      <WhyNookat />
      <DownloadSection />
      <Footer />
    </div>
  )
}
