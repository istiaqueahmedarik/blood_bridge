import type { Metadata } from "next";
import { Geist, Geist_Mono, Lexend_Deca, Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: "400",
  subsets: ["latin"],
});

const lexen_dec = Lexend_Deca({
  variable: "--font-lexend-deca",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${lexen_dec.variable} antialiased`}
      >

        {/* <NavBar /> */}
        {children}
        <NavBar />

      </body>
    </html>
  );
}
