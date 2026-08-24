import Header from "@/components/layout/Header";
import ContactCta from "@/components/layout/ContactCta";
import Hero from "@/components/iris/Hero";
import OurPlans from "@/components/iris/OurPlans";
import Packages from "@/components/iris/Packages";
import FaqAccordion from "@/components/iris/FaqAccordion";

export const metadata = {
  title: "Investment and Research Intelligence Services (IRIS) | Tradeswift",
  description:
    "IRIS by Tradeswift delivers timely, data-driven research across Fundamental, Technical and Option Strategy tracks — with entry, target and stop-loss on every call.",
};

export default function IrisPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <OurPlans />
        <Packages />
        <FaqAccordion />
      </main>
      <ContactCta />
    </>
  );
}
