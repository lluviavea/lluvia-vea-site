import { About } from "@/components/sections/about";
import { CareerJourney } from "@/components/sections/career-journey";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { PortfolioCta } from "@/components/sections/portfolio-cta";

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <CareerJourney />
      <PortfolioCta />
      <Contact />
    </>
  );
}
