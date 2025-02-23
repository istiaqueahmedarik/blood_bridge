/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useActionState } from "react"
import { fadeIn, staggerChildren, scaleIn } from "@/utils/animations"
import { ImageUpload } from "@/components/ImageUpload"
import { UnchangeableInfoCard } from "@/components/SignUpCard"
import { detectObjectsFromBase64, DonorSignUp, FindLatLng, OCRImage } from "../actions/action"
import { ImageScanLoader } from "@/components/ImageScanner"
import { cropBase64Image } from "../client_action"
import { useState } from "react"
import dynamic from "next/dynamic"

function SignUpPage() {
  const [stage, setStage] = useState<"front" | "back" | "form" | "loading">("front")
  const MapModal = dynamic(() => import("@/components/map-modal"), { ssr: false })
  const [location, setLocation] = useState("")
  const [frontNidCardImage, setFrontNidCardImage] = useState<File | null>(null)
  const [backNidCardImage, setBackNidCardImage] = useState<File | null>(null)
  const [frontPreview, setFrontPreview] = useState<string | null>(null)
  const [backPreview, setBackPreview] = useState<string | null>(null)
  const [fullName, setFullName] = useState<string | null>(null)
  const [base64Front, setBase64Front] = useState<string>("")
  const [base64Back, setBase64Back] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [bloodType, setBloodType] = useState<string>("")
  const [dob, setDob] = useState<string>("")
  const [fathersName, setFathersName] = useState<string>("")
  const [mothersName, setMothersName] = useState<string>("")
  const [nid, setNid] = useState<string>("")
  const [croppedFr, setCroppedFr] = useState<string>("")
  const [isMapboxModalOpen, setIsMapboxModalOpen] = useState(false)
  const [manualAddress, setManualAddress] = useState("")
  const [showManualInput, setShowManualInput] = useState(false)

  const [state, formAction, isPending] = useActionState(DonorSignUp, null)

  const imageToBase64 = async (image: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(image)
    })
  }

  const handleNIdCardChange = async (file: File, side: "front" | "back") => {
    if (file) {
      if (side === "front") {
        setFrontNidCardImage(file)
        setFrontPreview(URL.createObjectURL(file))
      } else {
        setBackNidCardImage(file)
        setBackPreview(URL.createObjectURL(file))
      }

      const base64Url = await imageToBase64(file)
      console.log(`${side} NID card:`, base64Url)

      if (side === "front") {
        setBase64Front(base64Url)
        setStage("back")
      } else {
        setBase64Back(base64Url)
        setStage("loading")

        try {
          // const res = await OCRImage(base64Front, base64Url)
          // const res1 = await detectObjectsFromBase64(base64Front)
          const [res, res1] = await Promise.all([
            OCRImage(base64Front, base64Url),
            detectObjectsFromBase64(base64Front),
          ])
          const bbox = JSON.parse(res1.bounding_box)
          const croppedFront = await cropBase64Image(bbox, base64Front)
          console.log(res)
          if (
            res.name === undefined ||
            res.address === undefined ||
            res.blood_type === undefined ||
            res.dob === undefined ||
            res.fatherName === undefined ||
            res.motherName === undefined ||
            res.nid === undefined
          ) {
            setStage("front")
          }
          setFullName(res.name)
          setAddress(res.address || "")
          setBloodType(res.blood_type || "")
          setDob(res.dob || "")
          setFathersName(res.fatherName || "")
          setMothersName(res.mothersName || "")
          setNid(res.nid || "")
          setCroppedFr(croppedFront)
          setStage("form")
        } catch (error) {
          console.error("OCR Error:", error)
          setStage("back")
        }
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        className="bg-background rounded-lg shadow-sm overflow-hidden w-full max-w-6xl"
        initial="hidden"
        animate="visible"
        variants={scaleIn}
      >
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <motion.div variants={staggerChildren}>
            <motion.h1 variants={fadeIn} className="text-3xl font-bold text-muted-foreground mb-2">
              Sign Up
            </motion.h1>
            <motion.p variants={fadeIn} className="text-foreground/80 mb-6">
              Your NID information is encrypted and secure, used only for verification.
            </motion.p>

            {stage === "front" && (
              <motion.div variants={fadeIn}>
                <Label htmlFor="frontNidCard">Upload Front of NID Card</Label>
                <ImageUpload onImageUpload={(file) => handleNIdCardChange(file, "front")} />
                {frontPreview && (
                  <Image
                    src={frontPreview || "/placeholder.svg"}
                    alt="Front NID Preview"
                    width={200}
                    height={200}
                    className="mt-4"
                  />
                )}
              </motion.div>
            )}

            {stage === "back" && (
              <motion.div variants={fadeIn}>
                <Label htmlFor="backNidCard">Upload Back of NID Card</Label>
                <ImageUpload onImageUpload={(file) => handleNIdCardChange(file, "back")} />
                {backPreview && (
                  <Image
                    src={backPreview || "/placeholder.svg"}
                    alt="Back NID Preview"
                    width={200}
                    height={200}
                    className="mt-4"
                  />
                )}
              </motion.div>
            )}

            {stage === "loading" && <ImageScanLoader imageSrc={frontPreview || ""} />}

            {stage === "form" && (
              <form action={formAction} className="space-y-4">
                <motion.div variants={fadeIn}>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={fullName || ""} readOnly className="w-full" />
                </motion.div>

                <motion.div variants={fadeIn}>
                  <Label htmlFor="present_address">Present Address</Label>
                  <div className="flex flex-col space-y-2">
                    {showManualInput ? (
                      <div className="flex items-center space-x-2">
                        <Input
                          id="present_address"
                          name="present_address"
                          className="w-full"
                          placeholder="Enter address manually"
                          required
                          value={manualAddress}
                          onChange={(e) => setManualAddress(e.target.value)}
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            setLocation(manualAddress)
                            setShowManualInput(false)
                          }}
                        >
                          Confirm
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Input
                          id="present_address"
                          name="present_address"
                          className="w-full"
                          placeholder="mirpur 12, dhaka"
                          required
                          value={location}
                          readOnly
                        />
                        <Button type="button" onClick={() => setIsMapboxModalOpen(true)}>
                          Select on Map
                        </Button>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setShowManualInput(!showManualInput)}>
                        {showManualInput ? "Use Map" : "Enter Manually"}
                      </Button>
                      <Button
                        type="button"
                        onClick={async () => {
                          console.log("Finding lat/long for:", location || manualAddress)
                          alert("Finding lat/long for: " + location || manualAddress)
                          const res = await FindLatLng(manualAddress)
                          setLocation(res);
                        }}
                      >
                        Generate Lat/Long
                      </Button>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn}>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="rahim@gmail.com"
                    className="w-full"
                    required
                  />
                </motion.div>

                <motion.div variants={fadeIn}>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="+8801875448172" className="w-full" required />
                </motion.div>

                <motion.div variants={fadeIn}>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" className="w-full" required />
                </motion.div>

                <motion.div variants={fadeIn}>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" name="confirmPassword" type="password" className="w-full" required />
                </motion.div>

                <motion.div variants={fadeIn} className="hidden">
                  <input type="hidden" name="bloodType" value={bloodType} />
                  <input type="hidden" name="dob" value={dob} />
                  <input type="hidden" name="fathersName" value={fathersName} />
                  <input type="hidden" name="mothersName" value={mothersName} />
                  <input type="hidden" name="nid" value={nid} />
                  <input type="hidden" name="permanentAddress" value={address} />
                  <input type="hidden" name="croppedImage" value={croppedFr} />
                  <input type="hidden" name="nidImage" value={base64Front} />
                </motion.div>

                <motion.div variants={fadeIn}>
                  <Button type="submit" className="w-full" variant="default" disabled={isPending}>
                    {isPending ? "Loading..." : "Sign Up"}
                  </Button>
                </motion.div>

                {state && state.error && (
                  <motion.div variants={fadeIn} className="text-red-500 text-center">
                    {state.error}
                  </motion.div>
                )}
              </form>
            )}

            <motion.p variants={fadeIn} className="mt-4 text-center text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Login here
              </Link>
            </motion.p>
          </motion.div>

          <motion.div className="flex flex-col items-center justify-center" variants={fadeIn}>
            {stage === "form" ? (
              <UnchangeableInfoCard
                bloodType={bloodType}
                dob={dob}
                fathersName={fathersName}
                mothersName={mothersName}
                nid={nid}
                address={address}
                image={croppedFr}
              />
            ) : (
              <Image src="/signup.svg" alt="Sign Up Illustration" width={400} height={400} />
            )}
          </motion.div>
        </div>
        <MapModal
          open={isMapboxModalOpen}
          onOpenChange={setIsMapboxModalOpen}
          onLocationSelect={(loc) => setLocation(loc)}
        />
      </motion.div>
    </div>
  )
}

export default SignUpPage

