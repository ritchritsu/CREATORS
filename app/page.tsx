"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandshake,
  faAward,
  faCubes,
  faWallet,
  faClock,
  faTools,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const benefits = [
  {
    icon: faHandshake,
    title: "Customer-Centric Approach",
    description: "We prioritize your needs and provide tailored solutions.",
    image: "/IMAGES/customer-centric.jpg",
  },
  {
    icon: faAward,
    title: "Quality Assurance",
    description: "Our products meet the highest industry standards.",
    image: "/IMAGES/quality.jpg",
  },
  {
    icon: faCubes,
    title: "Diverse Product Range",
    description:
      "We offer a wide variety of industrial machinery and services.",
    image: "/IMAGES/diverse.jpg",
  },
  {
    icon: faWallet,
    title: "Competitive Pricing",
    description: "High-quality solutions at affordable prices.",
    image: "/IMAGES/pricing.jpg",
  },
  {
    icon: faClock,
    title: "Timely Delivery",
    description: "We respect your time and adhere to project timelines.",
    image: "/IMAGES/delivery.jpg",
  },
  {
    icon: faTools,
    title: "Expert Support",
    description: "24/7 technical support and maintenance services.",
    image: "/IMAGES/support.jpg",
  },
];

// Array of product images
const productImages = Array.from(
  { length: 24 },
  (_, i) => `/IMAGES/${i + 1}.jpg`
);

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Function to handle next slide in benefits carousel
  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveSlide((prev) => (prev === benefits.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  // Function to handle previous slide in benefits carousel
  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveSlide((prev) => (prev === 0 ? benefits.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  // Auto-rotate benefits carousel
  useEffect(() => {
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Auto-scroll product carousel
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationId: number;
    let position = 0;
    let direction = 1; // 1 for forward, -1 for backward

    const animate = () => {
      position += 0.5 * direction;

      // Change direction when reaching end or start
      if (position >= carousel.scrollWidth - carousel.clientWidth) {
        direction = -1;
      } else if (position <= 0) {
        direction = 1;
      }

      carousel.scrollLeft = position;
      setScrollPosition(position);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Calculate the correct transform to center the active slide
  const calculateTransform = () => {
    // Each slide is 60% width with 1% margin on each side (62% total)
    const slideWidth = 62;
    return `translateX(calc(${(100 - slideWidth) / 2}% - ${
      activeSlide * slideWidth
    }%))`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax Effect */}
      <section
        className="hero relative h-[80vh] flex items-center justify-center bg-fixed bg-cover bg-center"
        style={{ backgroundImage: 'url("/IMAGES/factory.jpg")' }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container relative z-10 text-center mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#feffdb]">
            BUILT TO LAST, BACKED BY US
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-[#feffdb]">
            Your one-stop shop for all your industrial application needs
          </p>
          <Link
            href="/products"
            className="bg-[rgb(15,15,25)] text-[rgb(255,229,138)] hover:bg-[rgb(25,25,35)] font-bold py-3 px-6 rounded-lg transition duration-300 border border-[rgb(255,229,138)]"
          >
            Explore Our Products
          </Link>
        </div>
      </section>

      {/* Product Carousel Section - Moved directly below hero */}
      <section className="py-12 overflow-hidden bg-gradient-to-b from-[rgb(15,15,25)] to-[rgb(25,25,35)] relative">
        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[rgb(15,15,25)] to-transparent z-10"></div>

        {/* Curved product carousel */}
        <div className="perspective-1000 mx-auto max-w-full py-8">
          <div className="relative overflow-hidden">
            <div
              ref={carouselRef}
              className="flex items-center gap-6 py-16 overflow-x-auto hide-scrollbar px-10"
              style={{
                transformStyle: "preserve-3d",
                transform: "rotateX(3deg)",
              }}
            >
              {productImages.map((image, index) => {
                const position = index * 280 - scrollPosition;
                const normalizedPosition = position / 1200;
                const yPosition = Math.sin(normalizedPosition * 0.5) * 20;
                const zPosition = Math.cos(normalizedPosition * 0.5) * 30;
                const opacity = Math.max(
                  0.7,
                  1 - Math.abs(normalizedPosition * 0.6)
                );

                return (
                  <div
                    key={index}
                    className="flex-shrink-0 transform transition-transform duration-300 hover:scale-110"
                    style={{
                      transform: `translateY(${yPosition}px) translateZ(${zPosition}px)`,
                      opacity,
                      zIndex: Math.round(
                        50 - Math.abs(normalizedPosition * 20)
                      ),
                    }}
                  >
                    <div className="w-72 h-48 overflow-hidden rounded-lg shadow-xl border border-[rgba(255,229,138,0.4)] bg-[rgba(25,25,35,0.8)]">
                      <Image
                        src={image}
                        alt={`Product ${index + 1}`}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover transition-transform hover:scale-110"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Subtler gradient highlights */}
            
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Fancy Peek Carousel */}
      <section className="py-16 bg-[rgb(15,15,25)] overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[rgb(255,229,138)]">
            Why Choose Us
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
                {benefits.map((benefit, index) => {
                  const isActive = index === activeSlide;
                  const isPrev =
                    index === activeSlide - 1 ||
                    (activeSlide === 0 && index === benefits.length - 1);
                  const isNext =
                    index === activeSlide + 1 ||
                    (activeSlide === benefits.length - 1 && index === 0);

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
                              src={benefit.image}
                              alt={benefit.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className={`object-cover object-center transition-all duration-700 ${
                                isActive ? "scale-105" : "scale-100"
                              }`}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                              <FontAwesomeIcon
                                icon={benefit.icon}
                                className={`text-4xl md:text-5xl text-[rgb(255,229,138)] transition-transform duration-500 ${
                                  isActive ? "scale-110" : "scale-100"
                                }`}
                              />
                            </div>
                          </div>
                          <div className="md:w-1/2 py-3">
                            <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-[rgb(255,229,138)]">
                              {benefit.title}
                            </h3>
                            <p className="text-[#feffdb] text-base md:text-lg">
                              {benefit.description}
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
              {benefits.map((_, index) => (
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

      {/* Our Clients Section */}
      <section className="py-16 bg-[rgb(25,25,35)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 opacity-0 animate-fade-in-up text-[rgb(255,229,138)]">
              Our Clients
            </h2>
            <div
              className="h-1 w-24 bg-[#5eb1df] mx-auto opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <p
              className="text-xl text-[#feffdb] mt-6 max-w-2xl mx-auto opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              Trusted by industry leaders across the Philippines
            </p>
          </div>

          {/* Client Logo Banner with Loading Animation */}
          <div
            className="flex justify-center"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="relative">
              {/* Loading Animation Overlay */}
              <div
                className="absolute inset-0 bg-[rgb(25,25,35)] z-10 opacity-0 animate-fade-in-up flex items-center justify-center overflow-hidden"
                style={{
                  animationDelay: "0.4s",
                  animationDuration: "0.5s",
                  animationFillMode: "forwards",
                  animationDirection: "reverse",
                }}
              >
                <div className="relative flex items-center justify-center">
                  <div className="w-20 h-20 border-4 border-[#5eb1df]/20 rounded-full"></div>
                  <div className="absolute w-20 h-20 border-t-4 border-[rgb(255,229,138)] rounded-full animate-spin"></div>
                  <Image
                    src="/IMAGES/creators.png"
                    alt="CREATORS logo"
                    width={40}
                    height={40}
                    className="absolute animate-pulse"
                  />
                </div>
              </div>

              {/* The actual image that loads under the animation */}
              <Image
                src="/IMAGES/clients.png"
                alt="Our Clients"
                width={1900}
                height={400}
                className="max-w-full h-auto mx-auto opacity-0 animate-fade-in-up z-20 relative"
                style={{ animationDelay: "0.9s" }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Additional CSS for carousel effects */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .curved-carousel {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}
