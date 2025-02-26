"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="bg-[rgb(15,15,25)] text-[#feffdb] relative">
      {/* Top Info Bar - Fixed at the top */}
      <div className="bg-[rgb(25,25,35)] py-2 w-full">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Image
                src="/IMAGES/email-removebg-preview.png"
                alt="Email"
                width={20}
                height={20}
                className="mr-2"
              />
              <span className="text-sm">creatorsengr.services@myyahoo.com / jondaxroyal@gmail.com</span>
            </div>
            <div className="flex items-center">
              <Image
                src="/IMAGES/phone.png"
                alt="Phone"
                width={20}
                height={20}
                className="mr-2"
              />
              <span className="text-sm">09958494580</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - Fixed at the top below info bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-[rgb(15,15,25)] shadow-lg" : "bg-[rgb(15,15,25)]"
        }`}
      >
        <nav className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/IMAGES/creators.png"
                alt="CREATORS"
                width={70}
                height={70}
                className="mr-2"
                onError={(e) => {
                  // Fall back if logo doesn't exist
                  e.currentTarget.src = "/IMAGES/creators.png";
                }}
              />
              <span className="text-1xl font-bold text-[rgb(255,229,138)]">
                CREATORS AUTOMATED AND ENGINEERING SERVICES
              </span>
            </Link>

            {/* Desktop Navigation - Horizontal Alignment */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <Link
                href="/"
                className="hover:text-[rgb(255,229,138)] transition-colors text-shadow"
              >
                HOME
              </Link>
              <Link
                href="/about"
                className="hover:text-[rgb(255,229,138)] transition-colors text-shadow"
              >
                ABOUT US
              </Link>
              <Link
                href="/products"
                className="hover:text-[rgb(255,229,138)] transition-colors text-shadow"
              >
                PRODUCTS
              </Link>
              <Link
                href="/contact"
                className="hover:text-[rgb(255,229,138)] transition-colors text-shadow"
              >
                CONTACT US
              </Link>
              <button
                className="bg-[rgb(15,15,25)] text-[rgb(255,229,138)] hover:bg-[rgb(25,25,35)] font-bold py-2 px-4 rounded transition duration-300 border border-[rgb(255,229,138)] no-text-shadow"
                onClick={() => {
                  if (
                    typeof window !== "undefined" &&
                    window.openInquiryModal
                  ) {
                    window.openInquiryModal();
                  }
                }}
              >
                INQUIRE
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="mt-4 md:hidden border-t border-[rgb(255,229,138)]/20 pt-4">
              <div className="flex flex-col space-y-3">
                <Link
                  href="/"
                  className="block py-2 hover:text-[rgb(255,229,138)] transition-colors text-shadow"
                  onClick={() => setIsMenuOpen(false)}
                >
                  HOME
                </Link>
                <Link
                  href="/about"
                  className="block py-2 hover:text-[rgb(255,229,138)] transition-colors text-shadow"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ABOUT US
                </Link>
                <Link
                  href="/products"
                  className="block py-2 hover:text-[rgb(255,229,138)] transition-colors text-shadow"
                  onClick={() => setIsMenuOpen(false)}
                >
                  PRODUCTS
                </Link>
                <Link
                  href="/contact"
                  className="block py-2 hover:text-[rgb(255,229,138)] transition-colors text-shadow"
                  onClick={() => setIsMenuOpen(false)}
                >
                  CONTACT US
                </Link>
                <button
                  className="bg-[rgb(15,15,25)] text-[rgb(255,229,138)] hover:bg-[rgb(25,25,35)] font-bold py-2 px-4 rounded w-full transition duration-300 mt-2 border border-[rgb(255,229,138)] no-text-shadow"
                  onClick={() => {
                    if (
                      typeof window !== "undefined" &&
                      window.openInquiryModal
                    ) {
                      window.openInquiryModal();
                      setIsMenuOpen(false);
                    }
                  }}
                >
                  INQUIRE
                </button>
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Spacer to push content below the fixed header */}
      <div className="h-[80px]"></div>
    </header>
  );
};

export default Header;
