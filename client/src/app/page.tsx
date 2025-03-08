import BdMap from "@/components/BdMap";
import Hero from "@/components/Hero";
import Impact from "@/components/Impact";
import Reason from "@/components/Reason";
import SubHero from "@/components/SubHero";
import Task from "@/components/Task";
import Image from "next/image";
import { Suspense } from "react";

export default function Main() {
  return (
    <div className="space-y-10">
      <Hero />
      <SubHero />
      <Reason />
      <Suspense fallback={<Image src="/logo.svg" alt="loading" width={300} height={300} />}>
        <BdMap />
      </Suspense>
      <Task />
      <Impact />
    </div>
  );
}
