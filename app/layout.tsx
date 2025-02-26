import type React from "react";
import "./globals.css";
import { Raleway, Lato, Roboto_Slab } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/InquiryForm";
import Script from "next/script";
import InquiryModal from "@/components/InquiryModal";

const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" });
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});
const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
});

export const metadata = {
  title: "CREATORS Automation and Engineering Services",
  description:
    "Industrial machinery manufacturing and automation services based in the Philippines",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${raleway.variable} ${lato.variable} ${robotoSlab.variable}`}
    >
      <head>
        <Script
          src="https://kit.fontawesome.com/d3bd7ea696.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${raleway.className} bg-[#2f313d] text-[#feffdb]`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <InquiryForm />
        <InquiryModal />
      </body>
    </html>
  );
}
