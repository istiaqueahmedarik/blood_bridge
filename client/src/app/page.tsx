import BdMap from "@/components/BdMap";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Impact from "@/components/Impact";
import Reason from "@/components/Reason";
import SubHero from "@/components/SubHero";
import Task from "@/components/Task";
import Image from "next/image";
import { Suspense } from "react";


export default function Main() {

  return (
    <div>
      <Hero />
      <SubHero />
      <Reason />
      <Suspense fallback={<Image src="/logo.svg" alt="loading" />}>
        <BdMap />
      </Suspense>
      <Task />
      <Impact />
      <Footer />

    </div>
  );
}
