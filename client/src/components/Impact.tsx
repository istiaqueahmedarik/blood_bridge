"use client";

import React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from "motion/react"
import { StepContent } from './StepContent';
import { steps } from './steps-data';
import { cn } from '@/lib/utils';

export default function Impact() {
    const [emblaRef, emblaApi] = useEmblaCarousel();
    const [currentStep, setCurrentStep] = React.useState(0);
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(true);

    const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const onSelect = React.useCallback(() => {
        if (!emblaApi) return;
        setCurrentStep(emblaApi.selectedScrollSnap());
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    React.useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 py-4 px-4 rounded-3xl mx-4 lg:mx-8">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold text-center mb-2"
            >
                How BloodBridge Works
            </motion.h2>

            <div className="relative">
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="flex flex-col lg:flex-row items-center justify-between gap-12 min-w-full"
                            >
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="lg:w-1/2"
                                >
                                    <Image
                                        src={step.image}
                                        alt={step.title}
                                        width={300}
                                        height={300}
                                        className="m-auto drop-shadow-xl rounded-2xl"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="lg:w-1/2"
                                >
                                    <StepContent
                                        step={index + 1}
                                        title={step.title}
                                        description={step.description}
                                    />
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-8">
                    <button
                        onClick={scrollPrev}
                        className={cn(
                            "p-3 rounded-full bg-white shadow-md transition-opacity",
                            !canScrollPrev && "opacity-50 cursor-not-allowed"
                        )}
                        disabled={!canScrollPrev}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className={cn(
                            "p-3 rounded-full bg-white shadow-md transition-opacity",
                            !canScrollNext && "opacity-50 cursor-not-allowed"
                        )}
                        disabled={!canScrollNext}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex justify-center gap-2 mt-4">
                    {steps.map((_, index) => (
                        <div
                            key={index}
                            className={cn(
                                "w-2 h-2 rounded-full transition-colors",
                                currentStep === index ? "bg-blue-600" : "bg-blue-200"
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}