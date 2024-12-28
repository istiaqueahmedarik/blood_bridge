import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Impact from "@/components/Impact";
import NavBar from "@/components/NavBar";
import Reason from "@/components/Reason";
import SubHero from "@/components/SubHero";
import Task from "@/components/Task";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <SubHero />
      <Reason />
      <Task />
      <Impact />
      <Footer />

    </div>
  );
}
