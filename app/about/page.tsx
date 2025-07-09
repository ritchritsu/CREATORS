"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingUser,
  faHandshake,
  faUsers,
  faLightbulb,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const aboutSections = [
  {
    icon: faBuildingUser,
    title: "OUR VISION",
    description:
      "To provide quality and sustainable machines for industrial needs per client requirement.",
    image: "/IMAGES/vision.jpg",
  },
  {
    icon: faHandshake,
    title: "OUR MISSION",
    description: `To collaborate with local and international manufacturers and SME’s by using quality and precision machines. 
  To be able to offer low to medium cost machines for start-up businesses and provide quality products.`,
    image: "/IMAGES/mission.jpg",
  },
  
  {
    icon: faUsers,
    title: "THE CREATORS FAMILY",
    description:
      "Creators values its team as family. We foster a collaborative environment where everyone's skills are valued and continuous learning keeps us at the forefront of metal fabrication. This teamwork and respect empower us to deliver exceptional results.",
    image: "/IMAGES/team.jpg",
  },
  {
    icon: faLightbulb,
    title: "PARTNERSHIP MATTERS",
    description:
      "Creators builds strong partnerships. We work closely with clients to understand their needs and develop customized solutions. Our commitment to quality, innovation, and timely execution ensures a successful partnership experience. We view our clients as valued partners in achieving their goals.",
    image: "/IMAGES/partnership.jpg",
  },
];

const AboutPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Function to handle next slide
  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveSlide((prev) =>
      prev === aboutSections.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  // Function to handle previous slide
  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveSlide((prev) =>
      prev === 0 ? aboutSections.length - 1 : prev - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Calculate the correct transform to center the active slide
  const calculateTransform = () => {
    // Each slide is 60% width with 1% margin on each side (62% total)
    const slideWidth = 62;
    // Center position calculation
    return `translateX(calc(${(100 - slideWidth) / 2}% - ${
      activeSlide * slideWidth
    }%))`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Static Background (like Home page) */}
      <section
        className="hero relative h-[82vh] flex items-center justify-center bg-fixed bg-cover bg-center"
        style={{ backgroundImage: 'url("/IMAGES/rcdp1.png")' }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container relative z-10 text-center mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#feffdb]">
            About Creators
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-[#feffdb]">
            We are Creators.
            <br />
            Your one-stop shop for all your industrial application needs.
          </p>
        </div>
      </section>

      {/* About Sections Carousel */}
      <section className="py-16 bg-[rgb(15,15,25)] overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[rgb(255,229,138)]">
            Our Company
          </h2>

          <div className="relative max-w-5xl mx-auto px-12">
            {/* Carousel navigation */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-[rgb(25,25,35)] text-[rgb(255,229,138)] hover:bg-[rgb(15,15,25)] p-3 rounded-full focus:outline-none shadow-lg hover:shadow-xl transition-all duration-300 border border-[rgb(255,229,138)]/20"
              aria-label="Previous slide"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
            </button>

            {/* Carousel wrapper with overflow to show adjacent slides */}
            <div className="overflow-visible">
              <div
                className="flex transition-all duration-700 ease-in-out"
                style={{ transform: calculateTransform() }}
              >
                {aboutSections.map((section, index) => {
                  const isActive = index === activeSlide;
                  const isPrev =
                    index === activeSlide - 1 ||
                    (activeSlide === 0 && index === aboutSections.length - 1);
                  const isNext =
                    index === activeSlide + 1 ||
                    (activeSlide === aboutSections.length - 1 && index === 0);

                  return (
                    <div
                      key={index}
                      className={`w-[60%] md:w-[60%] flex-shrink-0 transition-all duration-700 mx-[1%] ${
                        isActive
                          ? "scale-100 z-10 opacity-100"
                          : isPrev || isNext
                          ? "scale-95 z-5 opacity-70"
                          : "scale-90 z-0 opacity-50"
                      }`}
                      onClick={() => {
                        if (!isAnimating && !isActive) {
                          setIsAnimating(true);
                          setActiveSlide(index);
                          setTimeout(() => setIsAnimating(false), 500);
                        }
                      }}
                    >
                      <div
                        className={`bg-[rgb(25,25,35)] border border-[rgb(255,229,138)]/20 p-4 md:p-6 rounded-lg ${
                          isActive
                            ? "shadow-[0_0_30px_rgba(255,229,138,0.3)]"
                            : "shadow-lg"
                        } transition-all duration-500 h-full cursor-pointer`}
                      >
                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 h-full">
                          <div className="relative h-52 md:h-64 w-full md:w-1/2 overflow-hidden rounded-lg">
                            <Image
                              src={section.image}
                              alt={section.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className={`object-cover object-center transition-all duration-700 ${
                                isActive ? "scale-105" : "scale-100"
                              }`}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                              <FontAwesomeIcon
                                icon={section.icon}
                                className={`text-4xl md:text-5xl text-[rgb(255,229,138)] transition-transform duration-500 ${
                                  isActive ? "scale-110" : "scale-100"
                                }`}
                              />
                            </div>
                          </div>
                          <div className="md:w-1/2 py-3">
                            <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-[rgb(255,229,138)]">
                              {section.title}
                            </h3>
                            <p className="text-[#feffdb] text-base md:text-lg">
                              {section.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-[rgb(25,25,35)] text-[rgb(255,229,138)] hover:bg-[rgb(15,15,25)] p-3 rounded-full focus:outline-none shadow-lg hover:shadow-xl transition-all duration-300 border border-[rgb(255,229,138)]/20"
              aria-label="Next slide"
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-xl" />
            </button>

            {/* Dots indicators */}
            <div className="flex justify-center mt-10 space-x-3">
              {aboutSections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setActiveSlide(index);
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                  className={`h-3 w-3 rounded-full focus:outline-none transition-all duration-300 ${
                    index === activeSlide
                      ? "bg-[rgb(255,229,138)] scale-125"
                      : "bg-[rgb(255,229,138)]/30 hover:bg-[rgb(255,229,138)]/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-[rgb(25,25,35)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-[rgb(255,229,138)]">
              Our History
            </h2>
            <p className="text-lg mb-6 text-[#feffdb]">
              Founded in 2020, Creators Automated and Engineering Services is a local manufacturer of precision machinery components and machines for industrial set up such as filling machines, mixing machines, mixing tanks, jacketed kettle, conveyor, soap extruders, stamping machines, pipe laying, R.O system, water waste disposal, cosmetic machines, electrical components and programs. Today our workshop is located at Antipolo at 500 square meters. We also offer HHO, our new machine line up for industrial fuel saver for gasoline, diesel, and LPG.
            </p>
            <h2 className="text-3xl font-bold mb-8 text-[rgb(255,229,138)]">
              Factory Facilities
            </h2>
            <p className="text-lg mb-6 text-[#feffdb]">
              Lathe machine, milling machine, machinery equipments, grinders, and surface grinders, welding machines.
            </p>
            <p className="text-lg mb-6 text-[#feffdb]">
              Our customers are mostly from domestic areas in the Philippines.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
