"use client";

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface StepContentProps {
    step: number;
    title: string;
    description: string;
}

export function StepContent({ step, title, description }: StepContentProps) {
    return (
        <div className="space-y-6 px-4 max-w-xl">
            <div className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Step {step}
            </div>
            <h3 className="text-4xl font-bold leading-tight">
                {title}
            </h3>
            <p className="text-lg text-gray-600">
                {description}
            </p>
        </div>
    );
}