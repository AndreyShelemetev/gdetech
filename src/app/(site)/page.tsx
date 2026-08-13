import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Team } from "@/components/sections/Team";
import { Path } from "@/components/sections/Path";
import { Services } from "@/components/sections/Services";
import { VibeCoding } from "@/components/sections/VibeCoding";
import { OwnProjects } from "@/components/sections/OwnProjects";
import { Residents } from "@/components/sections/Residents";
import { WhyUs } from "@/components/sections/WhyUs";
import { Faq } from "@/components/sections/Faq";
import { TelegramCommunity } from "@/components/sections/TelegramCommunity";
import { JoinForms } from "@/components/sections/JoinForms";
import { Contacts } from "@/components/sections/Contacts";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Team />
      <Path />
      <Services />
      <VibeCoding />
      <OwnProjects />
      <Residents />
      <WhyUs />
      <Faq />
      <TelegramCommunity />
      <JoinForms />
      <Contacts />
    </>
  );
}
