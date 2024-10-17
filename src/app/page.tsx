import AppointmentPlans from "@/components/home/AppointmentPlans";
import Clients from "@/components/home/Clients";
import Hero from "@/components/home/Hero";
import Introduction from "@/components/home/Introduction";
import Services from "@/components/home/Services";
import Team from "@/components/home/Team";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div>
      <Hero />
      <Clients />
      <Introduction />
      <Services />
      <AppointmentPlans />
      <Testimonials />
      <Team />
    </div>
  );
}
