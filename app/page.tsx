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

// Array of China visit images
const chinaImages = Array.from(
  { length: 8 },
  (_, i) => `/IMAGES/China${i + 1}.jpg`
);

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Product carousel refs and state
  const productCarouselRef = useRef<HTMLDivElement>(null);
  const [productScrollPosition, setProductScrollPosition] = useState(0);
  const [productIsDragging, setProductIsDragging] = useState(false);
  const [productStartX, setProductStartX] = useState(0);
  const [productScrollLeft, setProductScrollLeft] = useState(0);
  
  // China carousel refs and state
  const chinaCarouselRef = useRef<HTMLDivElement>(null);
  const [chinaScrollPosition, setChinaScrollPosition] = useState(0);
  const [chinaIsDragging, setChinaIsDragging] = useState(false);
  const [chinaStartX, setChinaStartX] = useState(0);
  const [chinaScrollLeft, setChinaScrollLeft] = useState(0);

  // Benefits carousel functions
  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveSlide((prev) => (prev === benefits.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

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

  // ======== PRODUCT CAROUSEL HANDLERS ========
  const handleProductMouseDown = (e: React.MouseEvent) => {
    if (!productCarouselRef.current) return;

    setProductIsDragging(true);
    setProductStartX(e.pageX - productCarouselRef.current.offsetLeft);
    setProductScrollLeft(productCarouselRef.current.scrollLeft);
  };

  const handleProductMouseUp = () => {
    setProductIsDragging(false);
  };

  const handleProductMouseMove = (e: React.MouseEvent) => {
    if (!productIsDragging || !productCarouselRef.current) return;

    e.preventDefault();
    const x = e.pageX - productCarouselRef.current.offsetLeft;
    const walk = (x - productStartX) * 1.5; // Scroll speed multiplier
    productCarouselRef.current.scrollLeft = productScrollLeft - walk;
    setProductScrollPosition(productCarouselRef.current.scrollLeft);
  };

  const handleProductTouchStart = (e: React.TouchEvent) => {
    if (!productCarouselRef.current) return;

    setProductIsDragging(true);
    setProductStartX(e.touches[0].pageX - productCarouselRef.current.offsetLeft);
    setProductScrollLeft(productCarouselRef.current.scrollLeft);
  };

  const handleProductTouchMove = (e: React.TouchEvent) => {
    if (!productIsDragging || !productCarouselRef.current) return;

    const x = e.touches[0].pageX - productCarouselRef.current.offsetLeft;
    const walk = (x - productStartX) * 1.5;
    productCarouselRef.current.scrollLeft = productScrollLeft - walk;
    setProductScrollPosition(productCarouselRef.current.scrollLeft);
  };

  const handleProductTouchEnd = () => {
    setProductIsDragging(false);
  };

  const handleProductScroll = () => {
    if (!productCarouselRef.current || productIsDragging) return;
    setProductScrollPosition(productCarouselRef.current.scrollLeft);
  };

  // ======== CHINA CAROUSEL HANDLERS ========
  const handleChinaMouseDown = (e: React.MouseEvent) => {
    if (!chinaCarouselRef.current) return;

    setChinaIsDragging(true);
    setChinaStartX(e.pageX - chinaCarouselRef.current.offsetLeft);
    setChinaScrollLeft(chinaCarouselRef.current.scrollLeft);
  };

  const handleChinaMouseUp = () => {
    setChinaIsDragging(false);
  };

  const handleChinaMouseMove = (e: React.MouseEvent) => {
    if (!chinaIsDragging || !chinaCarouselRef.current) return;

    e.preventDefault();
    const x = e.pageX - chinaCarouselRef.current.offsetLeft;
    const walk = (x - chinaStartX) * 1.5; // Scroll speed multiplier
    chinaCarouselRef.current.scrollLeft = chinaScrollLeft - walk;
    setChinaScrollPosition(chinaCarouselRef.current.scrollLeft);
  };

  const handleChinaTouchStart = (e: React.TouchEvent) => {
    if (!chinaCarouselRef.current) return;

    setChinaIsDragging(true);
    setChinaStartX(e.touches[0].pageX - chinaCarouselRef.current.offsetLeft);
    setChinaScrollLeft(chinaCarouselRef.current.scrollLeft);
  };

  const handleChinaTouchMove = (e: React.TouchEvent) => {
    if (!chinaIsDragging || !chinaCarouselRef.current) return;

    const x = e.touches[0].pageX - chinaCarouselRef.current.offsetLeft;
    const walk = (x - chinaStartX) * 1.5;
    chinaCarouselRef.current.scrollLeft = chinaScrollLeft - walk;
    setChinaScrollPosition(chinaCarouselRef.current.scrollLeft);
  };

  const handleChinaTouchEnd = () => {
    setChinaIsDragging(false);
  };

  const handleChinaScroll = () => {
    if (!chinaCarouselRef.current || chinaIsDragging) return;
    setChinaScrollPosition(chinaCarouselRef.current.scrollLeft);
  };

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

      {/* Product Carousel Section - Updated with product-specific handlers */}
      <section className="py-12 bg-[rgb(15,15,25)] relative outward-curve-section">
        <div className="container mx-auto px-4 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[rgb(255,229,138)] mb-8">
            Our Products
          </h2>
        </div>

        {/* Outward curved carousel with consistent height and equal sizing */}
        <div className="carousel-container">
          <div
            ref={productCarouselRef}
            className="carousel-track hide-scrollbar"
            onMouseDown={handleProductMouseDown}
            onMouseUp={handleProductMouseUp}
            onMouseLeave={handleProductMouseUp}
            onMouseMove={handleProductMouseMove}
            onTouchStart={handleProductTouchStart}
            onTouchMove={handleProductTouchMove}
            onTouchEnd={handleProductTouchEnd}
            onScroll={handleProductScroll}
          >
            {productImages.map((image, index) => {
              // Skip rendering if image doesn't exist or is empty
              if (!image) return null;

              return (
                <div key={`product-${index}`} className="carousel-item">
                  <div className="card-content">
                    <Image
                      src={image}
                      alt={`Product ${index + 1}`}
                      width={500}
                      height={400}
                      className="w-full h-full object-cover"
                      draggable="false"
                      onError={(e) => {
                        // Hide the parent container if image fails to load
                        const target = e.target as HTMLImageElement;
                        const parentItem = target.closest(".carousel-item");
                        if (parentItem) {
                          parentItem.style.display = "none";
                        }
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Visual indicator that carousel is draggable */}
        <div className="flex justify-center drag-indicator">
          <span className="text-[rgb(255,229,138)]/70 text-sm flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1 animate-pulse"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Drag to explore
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1 animate-pulse"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 9H9a5 5 0 00-5 5v2a1 1 0 11-2 0v-2a7 7 0 017-7h5.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </section>

      {/* Why Choose Us Section - Unchanged */}
      <section className="py-16 bg-[rgb(15,15,25)] overflow-hidden">
        {/* Rest of the component remains unchanged */}
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
                src="/IMAGES/clientsTwo.png"
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

      {/* China Visit Section - Updated with china-specific handlers */}
      <section className="py-16 bg-[rgb(15,15,25)] relative outward-curve-section">
        <div className="container mx-auto px-4 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[rgb(255,229,138)] mb-8">
            Our China Visit
          </h2>
          <p className="text-xl text-center mb-8 text-[#feffdb] max-w-4xl mx-auto">
            We visited Zhengzhou Louhe and Xingtai province in China to ensure
            the highest quality of our products and establish strong partnerships
            with manufacturers.
          </p>
        </div>

        {/* China visit carousel with consistent styling */}
        <div className="carousel-container">
          <div
            ref={chinaCarouselRef}
            className="carousel-track hide-scrollbar"
            onMouseDown={handleChinaMouseDown}
            onMouseUp={handleChinaMouseUp}
            onMouseLeave={handleChinaMouseUp}
            onMouseMove={handleChinaMouseMove}
            onTouchStart={handleChinaTouchStart}
            onTouchMove={handleChinaTouchMove}
            onTouchEnd={handleChinaTouchEnd}
            onScroll={handleChinaScroll}
          >
            {chinaImages.map((image, index) => {
              // Skip rendering if image doesn't exist or is empty
              if (!image) return null;

              return (
                <div key={`china-${index}`} className="carousel-item">
                  <div className="card-content">
                    <Image
                      src={image}
                      alt={`China visit image ${index + 1}`}
                      width={500}
                      height={400}
                      className="w-full h-full object-cover"
                      draggable="false"
                      onError={(e) => {
                        // Hide the parent container if image fails to load
                        const target = e.target as HTMLImageElement;
                        const parentItem = target.closest('.carousel-item');
                        if (parentItem) {
                          parentItem.style.display = 'none';
                        }
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Drag indicator */}
        <div className="flex justify-center drag-indicator">
          <span className="text-[rgb(255,229,138)]/70 text-sm flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1 animate-pulse"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Drag to explore
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1 animate-pulse"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 9H9a5 5 0 00-5 5v2a1 1 0 11-2 0v-2a7 7 0 017-7h5.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>

        {/* Quality Assurance Points - Unchanged */}
        <div className="container mx-auto px-4 mt-12">
          <div className="bg-[rgb(25,25,35)] p-6 rounded-lg shadow-xl border border-[rgb(255,229,138)]/10 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-[rgb(255,229,138)] text-center">
              Our Quality Assurance Process
            </h3>

            <ul className="space-y-3 text-[#feffdb]">
              <li className="flex items-start">
                <div className="bg-[rgb(255,229,138)]/10 p-2 rounded-full mr-4 mt-1">
                  <span className="text-[rgb(255,229,138)] font-bold">1</span>
                </div>
                <p>To ensure quality of materials used</p>
              </li>
              <li className="flex items-start">
                <div className="bg-[rgb(255,229,138)]/10 p-2 rounded-full mr-4 mt-1">
                  <span className="text-[rgb(255,229,138)] font-bold">2</span>
                </div>
                <p>To check the consumables, electrical, design and controls</p>
              </li>
              <li className="flex items-start">
                <div className="bg-[rgb(255,229,138)]/10 p-2 rounded-full mr-4 mt-1">
                  <span className="text-[rgb(255,229,138)] font-bold">3</span>
                </div>
                <p>Collaborate designs depending on the client's requirements</p>
              </li>
              <li className="flex items-start">
                <div className="bg-[rgb(255,229,138)]/10 p-2 rounded-full mr-4 mt-1">
                  <span className="text-[rgb(255,229,138)] font-bold">4</span>
                </div>
                <p>
                  Legitimacy and capability of the supplier to provide quality
                  machines
                </p>
              </li>
              <li className="flex items-start">
                <div className="bg-[rgb(255,229,138)]/10 p-2 rounded-full mr-4 mt-1">
                  <span className="text-[rgb(255,229,138)] font-bold">5</span>
                </div>
                <p>Timely updates about the production of the machines</p>
              </li>
              <li className="flex items-start">
                <div className="bg-[rgb(255,229,138)]/10 p-2 rounded-full mr-4 mt-1">
                  <span className="text-[rgb(255,229,138)] font-bold">6</span>
                </div>
                <p>Delivery updates</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Updated CSS for inward-curved carousel */}
      <style jsx global>{`
        /* Hide scrollbar but keep functionality */
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }

        /* Inward curved section */
        .outward-curve-section {
          position: relative;
          background: linear-gradient(
            to bottom,
            rgb(15, 15, 25),
            rgb(25, 25, 35)
          );
          padding: 4rem 0 6rem; /* Increased bottom padding for the highlight */
          overflow: hidden;
          /* Prevent text selection */
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }

        /* Create the inward curved appearance - reverse the border radius */
        .outward-curve-section::before {
          content: "";
          position: absolute;
          top: -80px;
          left: -50%;
          width: 200%;
          height: 120px;
          background: rgb(15, 15, 25);
          border-radius: 50% 50% 0 0 / 100% 100% 0 0;
          z-index: 1;
        }

        .outward-curve-section::after {
          content: "";
          position: absolute;
          bottom: -80px;
          left: -50%;
          width: 200%;
          height: 120px;
          background: rgb(25, 25, 35);
          border-radius: 0 0 50% 50% / 0 0 100% 100%;
          z-index: 1;
        }

        /* Carousel highlight that sits below the carousel */
        .outward-curve-section::before,
        .outward-curve-section::after {
          pointer-events: none; /* Ensure the curves don't interfere with interactions */
        }

        /* Add a highlight underneath the carousel */
        .carousel-container::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -30px; /* Position below the carousel */
          height: 2px;
          background: linear-gradient(
            90deg,
            rgba(255, 229, 138, 0) 0%,
            rgba(255, 229, 138, 0.5) 50%,
            rgba(255, 229, 138, 0) 100%
          );
          width: 80%;
          margin: 0 auto;
          z-index: 4; /* Above the curved section but below the carousel */
          box-shadow: 0 0 20px 5px rgba(255, 229, 138, 0.3);
          border-radius: 100%;
        }

        /* Carousel container */
        .carousel-container {
          position: relative;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
          padding: 30px 10% 20px; /* Reduced bottom padding */
          z-index: 5;
          perspective: 1000px;
          margin-bottom: 40px; /* Add space for the highlight underneath */
        }

        /* Curved carousel track - conveyor belt style */
        .carousel-track {
          display: flex;
          gap: 20px;
          padding: 30px 40px;
          overflow-x: auto;
          cursor: grab;
          transform-style: preserve-3d;
          transform: rotateX(10deg);
          perspective-origin: center bottom;
          will-change: transform, scroll-position;
          scroll-behavior: auto; /* Use auto instead of smooth to prevent snapping */
          -webkit-overflow-scrolling: touch; /* Better touch scrolling on iOS */
        }

        /* Disable any snap points that might cause jumps */
        .carousel-item {
          scroll-snap-align: none;
        }

        /* Make all items same fixed height with consistent 3D positioning */
        .carousel-item {
          flex: 0 0 300px;
          height: 220px;
          border-radius: 8px;
          overflow: hidden;
          background: rgba(25, 25, 35, 0.8);
          transform-style: preserve-3d;
          position: relative;
          transition: transform 0.3s ease;
          user-select: none;
          -webkit-user-select: none;
        }

        /* Items in different positions have different translations to create curved effect */
        .carousel-item:nth-child(3n) {
          transform: translateY(15px) translateZ(-20px);
        }

        .carousel-item:nth-child(3n + 1) {
          transform: translateY(5px) translateZ(-10px);
        }

        .carousel-item:nth-child(3n + 2) {
          transform: translateY(10px) translateZ(-15px);
        }

        /* Hover effect shouldn't change the height */
        .carousel-item:hover {
          transform: scale(1.05) translateZ(10px);
          z-index: 10;
        }

        .card-content {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;
        }

        /* Ensure images maintain aspect ratio while filling container */
        .card-content img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.5s ease;
        }

        .card-content:hover img {
          transform: scale(1.1);
        }

        /* Prevent image dragging */
        img {
          -webkit-user-drag: none;
          -khtml-user-drag: none;
          -moz-user-drag: none;
          -o-user-drag: none;
          user-drag: none;
        }

        /* Move the drag indicator outside and below the carousel */
        .drag-indicator {
          margin-top: 10px; /* Space from carousel */
          position: relative;
          z-index: 4;
        }
      `}</style>
    </div>
  );
}
