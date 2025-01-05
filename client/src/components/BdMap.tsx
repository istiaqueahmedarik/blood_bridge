"use client";
import { motion } from "framer-motion";
import dotsData from "@/data/dots.json";
import dynamic from "next/dynamic";

function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
export default function BdMap() {
    const WorldMap = dynamic(() => import('@/components/ui/world-map'), { ssr: false });
    const shuffledDots = shuffleArray([...dotsData.dots]);

    return (
        <div className=" bg-background w-full">
            <div className="max-w-7xl mx-auto text-center">
                <p className="font-bold text-xl md:text-4xl  text-foreground">
                    Remote{" "}
                    <span className="text-ring">
                        {"Connectivity".split("").map((word, idx) => (
                            <motion.span
                                key={idx}
                                className="inline-block"
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: idx * 0.04 }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </span>
                </p>
                <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto py-4">
                    We&apos;re available around Bangladesh, connecting the remote areas
                    with the urban.
                </p>
            </div>
            <WorldMap dots={shuffledDots} />
        </div>
    );
}
