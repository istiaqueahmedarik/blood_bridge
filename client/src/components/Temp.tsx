import Image from 'next/image'
import { Input } from './ui/input'

const images = [
    '/donor.svg',
    '/hero_image.svg',
    '/logo.svg',
    '/logo.svg',
    '/logo.svg',
    '/logo.svg',
]

export default function Temp() {
    return (
        <div>

            <div className='grid place-content-center'>
                <Image src={"/logo.svg"} alt="Blood donation" width={60} height={60} />
            </div>
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background font-poppins">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10"></div>
                    <div className="absolute inset-0 flex items-center">
                        <div className="scrolling-images-container">
                            {images.concat(images).map((src, index) => (
                                <Image
                                    key={index}
                                    src={src}
                                    alt="Blood donation"
                                    width={300}
                                    height={300}
                                    className="scrolling-image"
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="relative z-20 text-center px-4 max-w-5xl">
                    <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-6 leading-tight">
                        Unite{' '}<span className="text-destructive">Live</span>
                        Share{' '}<span className="text-destructive">Blood</span>
                        <br />
                    </h1>
                    <form className="rounded-full bg-foreground">
                        <Input placeholder="Enter your location" className='border-none outline-none focus:outline-none focus:outline-0  px-2 py-5 ' />
                    </form>
                </div>
            </div>
        </div>
    )
}

