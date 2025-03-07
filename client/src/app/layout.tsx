import type { Metadata } from "next";
import { Geist, Geist_Mono, Lexend_Deca, Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { cookies } from "next/headers";
import { ViewTransitions } from 'next-view-transitions'

import { check_type } from "./actions/general";
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
  title: "Blood Bridge",
  description: "A new way to donate blood",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies();
  const type = await check_type();

  return (
    <ViewTransitions>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${lexen_dec.variable} font-[family-name:var(--font-poppins)] antialiased`}
        >

          {/* <NavBar /> */}
          {children}
          <NavBar token={cookieStore.get('token')} type={type} />
          {/* <SearchBar /> */}
        </body>
      </html>
    </ViewTransitions>
  );
}