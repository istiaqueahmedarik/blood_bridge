"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface CameraCaptureProps {
    onCapture: (image: string) => void
    onClose: () => void
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onClose }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isCameraActive, setIsCameraActive] = useState(false)

    useEffect(() => {
        if (isCameraActive) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream
                    }
                })
                .catch((err) => console.error("Error accessing camera:", err))
        }
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
                tracks.forEach((track) => track.stop())
            }
        }
    }, [isCameraActive])

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext("2d")
            if (context) {
                context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
                const imageDataUrl = canvasRef.current.toDataURL("image/jpeg")
                onCapture(imageDataUrl)
                setIsCameraActive(false)
            }
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg">
                {isCameraActive ? (
                    <>
                        <video ref={videoRef} autoPlay className="mb-4" />
                        <canvas ref={canvasRef} style={{ display: "none" }} />
                        <div className="flex justify-between">
                            <Button onClick={captureImage}>Capture</Button>
                            <Button onClick={() => setIsCameraActive(false)} variant="outline">
                                Cancel
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col gap-4">
                        <Button onClick={() => setIsCameraActive(true)}>Open Camera</Button>
                        <Button onClick={onClose} variant="outline">
                            Close
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CameraCapture

