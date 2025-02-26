"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add animation when component mounts
    setIsVisible(true);

    // Optional: Add intersection observer for better animation control
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const footer = document.querySelector("footer");
    if (footer) {
      observer.observe(footer);
    }

    return () => {
      if (footer) {
        observer.unobserve(footer);
      }
    };
  }, []);

  return (
    <footer className="bg-[rgb(25,25,35)] text-[#feffdb] relative overflow-hidden">
      {/* Background animation element */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(21,21,35,0.05)] to-[rgba(94,177,223,0.05)] opacity-20 w-full h-full">
        <div
          className="absolute rounded-full w-64 h-64 bg-[#5eb1df]/5 -top-32 -left-32 animate-pulse"
          style={{ animationDuration: "8s" }}
        ></div>
        <div
          className="absolute rounded-full w-96 h-96 bg-[rgb(255,229,138)]/5 -bottom-48 -right-48 animate-pulse"
          style={{ animationDuration: "12s" }}
        ></div>
      </div>

      <div className="container mx-auto py-12 relative z-10">
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="transition-all duration-700 delay-100 transform hover:translate-y-[-5px]">
            <h3 className="text-xl font-bold mb-4 text-[rgb(255,229,138)]">
              CREATORS
            </h3>
            <p className="mb-4">
              Your one-stop shop for all your industrial application needs.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61563074175606"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#5eb1df]/20 hover:bg-[#5eb1df]/40 transition-all duration-300 p-3 rounded-full group"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook text-[rgb(255,229,138)] text-xl group-hover:scale-125 transition-transform duration-300"></i>
              </a>
            </div>
          </div>

          <div className="transition-all duration-700 delay-200 transform hover:translate-y-[-5px]">
            <h3 className="text-xl font-bold mb-4 text-[rgb(255,229,138)]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Home", "About Us", "Products", "Contact Us"].map(
                (item, index) => (
                  <li
                    key={item}
                    className="transform transition-all duration-300 hover:translate-x-2"
                  >
                    <Link
                      href={`/${
                        item === "Home"
                          ? ""
                          : item.toLowerCase().replace(" ", "")
                      }`}
                      className="hover:text-[rgb(255,229,138)] transition-colors flex items-center group"
                    >
                      <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300">
                        <i className="fa-solid fa-angle-right opacity-0 group-hover:opacity-100 transition-opacity mr-1 text-[rgb(255,229,138)]"></i>
                      </span>
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="transition-all duration-700 delay-300 transform hover:translate-y-[-5px]">
            <h3 className="text-xl font-bold mb-4 text-[rgb(255,229,138)]">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start group transition-all duration-300 hover:translate-x-2">
                <i
                  className="fa-solid fa-location-dot text-[rgb(255,229,138)] mt-1 mr-3 group-hover:scale-125 transition-transform duration-300"
                  aria-hidden="true"
                ></i>
                <span>
                  #58 Marilaque Highway Sitio, Cabading Brgy San Jose, Antipolo
                  City, Rizal 1870, Philippines
                </span>
              </li>
              <li className="flex items-center group transition-all duration-300 hover:translate-x-2">
                <i
                  className="fa-solid fa-phone text-[rgb(255,229,138)] mr-3 group-hover:scale-125 transition-transform duration-300"
                  aria-hidden="true"
                ></i>
                <span>09958494580 / 09778053754</span>
              </li>
              <li className="flex items-center group transition-all duration-300 hover:translate-x-2">
                <i
                  className="fa-solid fa-envelope text-[rgb(255,229,138)] mr-3 group-hover:scale-125 transition-transform duration-300"
                  aria-hidden="true"
                ></i>
                <span>placeholder@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-8 text-center text-sm relative border-t border-[#5eb1df]/20 pt-8 transition-all duration-1000 transform"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "500ms",
          }}
        >
          <div className="animate-pulse" style={{ animationDuration: "5s" }}>
            &copy; {new Date().getFullYear()} CREATORS Automation and
            Engineering Services. All rights reserved.
          </div>

          {/* Wave animation at the bottom */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
