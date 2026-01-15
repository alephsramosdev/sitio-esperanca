import Hero from "@/sections/home/hero";
import Template from "./_template";
import QualitysSection from "@/sections/home/qualitys";
import MomentsSection from "@/sections/home/moments";
import CitySection from "@/sections/home/city";
import SuitesSection from "@/sections/home/suites";
import AssessmentSection from "@/sections/home/assessment";
import EventSection from "@/sections/home/event";
import Seo from "@/components/seo";

export default function Home() {
  return (
    <Template>
      <Seo
        title="Sítio Esperança | Hospedagem em Miguel Pereira"
        description="Hospedagem confortável em Miguel Pereira (RJ). Conheça nossas suítes, atrações e faça sua reserva online."
        path="/"
        image="/logo-black.png"
        type="website"
      />
      <Hero />
      <QualitysSection />
      <MomentsSection />
      <CitySection />
      <SuitesSection />
      <AssessmentSection />
      <EventSection />
    </Template>
  );
}
