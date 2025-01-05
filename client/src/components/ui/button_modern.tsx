import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import React from 'react'

interface Props
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string
}

const ButtonModern = React.forwardRef<HTMLButtonElement, Props>
    (({ className, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "group relative w-32 cursor-pointer overflow-hidden rounded-md  bg-background p-2 text-center font-semibold",
                    className
                )}
                {...props}
            >
                <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-y-12 group-hover:opacity-0">
                    {children}

                </span>
                <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
                    <span>{children}</span>
                </div>
                <div className="absolute left-[5%] top-[40%] h-2 w-2 scale-[1] rounded-lg bg-primary transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-primary"></div>

            </button>
        )
    })

ButtonModern.displayName = 'ButtonModern'

export { ButtonModern }