import { DownloadSection } from "./components/DownloadSection";
import { Faq } from "./components/Faq";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { OpenSource } from "./components/OpenSource";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-[14px] focus:font-medium focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Features />
        <OpenSource />
        <Faq />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
