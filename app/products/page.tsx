"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import QuoteButton from "@/components/ui/QuoteButton";
import { X } from "lucide-react";

// Create image objects
const imageList = Array.from({ length: 58 }, (_, i) => i + 1);

const ProductsPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openImageModal = (imageSrc, index) => {
    setSelectedImage(imageSrc);
    setSelectedIndex(index);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      setIsModalOpen(true);
    }, 10);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedImage(null);
      setSelectedIndex(null);
      // Restore scrolling
      document.body.style.overflow = "auto";
    }, 300); // Match this with the transition duration
  };

  const showPreviousImage = () => {
    if (selectedIndex === null) return;

    // Find the previous visible image (not hidden)
    let prevIndex = selectedIndex - 1;
    while (prevIndex >= 0) {
      const imgNumber = prevIndex + 1;
      const imgSrc = `/IMAGES/${imgNumber}.jpg`;
      setSelectedImage(imgSrc);
      setSelectedIndex(prevIndex);
      break;
    }

    // If we've gone below 0, loop back to the end
    if (prevIndex < 0) {
      const lastIndex = imageList.length - 1;
      setSelectedImage(`/IMAGES/${lastIndex + 1}.jpg`);
      setSelectedIndex(lastIndex);
    }
  };

  const showNextImage = () => {
    if (selectedIndex === null) return;

    // Find the next visible image (not hidden)
    let nextIndex = selectedIndex + 1;
    while (nextIndex < imageList.length) {
      const imgNumber = nextIndex + 1;
      const imgSrc = `/IMAGES/${imgNumber}.jpg`;
      setSelectedImage(imgSrc);
      setSelectedIndex(nextIndex);
      break;
    }

    // If we've gone past the end, loop back to the beginning
    if (nextIndex >= imageList.length) {
      setSelectedImage(`/IMAGES/1.jpg`);
      setSelectedIndex(0);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;

      if (e.key === "Escape") {
        closeImageModal();
      } else if (e.key === "ArrowLeft") {
        showPreviousImage();
      } else if (e.key === "ArrowRight") {
        showNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, selectedIndex]);

  return (
    <div className="min-h-screen">
      {/* Image Modal with styling consistent with the header inquire popup */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-all duration-300 ease-in-out"
          onClick={closeImageModal}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 z-[60] text-white p-3 rounded-full hover:text-[rgb(255,229,138)] transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              closeImageModal();
            }}
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {/* Main image container */}
          <div
            className={`relative transition-all duration-300 ${
              isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="max-h-[60vh] max-w-[80vw] md:max-w-[70vw] object-contain rounded border border-[rgb(255,229,138)]/10"
            />
          </div>
        </div>
      )}

      <section className="section bg-gray-900">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            Our Products & Services
          </h1>
          <p className="text-xl text-center mb-12 text-gray-300">
            Discover our range of high-quality industrial machinery and custom
            fabrication services.
          </p>

          {/* Simple grid of all images without categories */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {imageList.map((num, index) => (
              <ProductImage
                key={num}
                imageNumber={num}
                index={index}
                onImageClick={openImageModal}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#0f0f19]">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Additional Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-[#b7922c]">
                HVAC & Plumbing
              </h3>
              <p className="text-gray-300">
                We offer comprehensive HVAC and plumbing solutions for
                industrial and commercial applications.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-[#b7922c]">
                Construction & Fabrication
              </h3>
              <p className="text-gray-300">
                Our team provides custom fabrication and construction services
                tailored to your specific needs.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-[#b7922c]">
                Networking & Demolition
              </h3>
              <p className="text-gray-300">
                We offer networking solutions and professional demolition
                services for industrial projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-900">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Custom Solutions
          </h2>
          <p className="text-xl text-center mb-12 text-gray-300">
            Can't find exactly what you need? We specialize in custom
            fabrication to meet your unique requirements.
          </p>
          <div className="text-center">
            <QuoteButton />
          </div>
        </div>
      </section>
    </div>
  );
};

// Client component to handle image loading with fallbacks
const ProductImage = ({ imageNumber, index, onImageClick }) => {
  const [imgSrc, setImgSrc] = useState(`/IMAGES/${imageNumber}.jpg`);
  const [hidden, setHidden] = useState(false);

  const handleError = useCallback(() => {
    if (imgSrc.includes(".jpg")) {
      // Try PNG if JPG fails
      setImgSrc(`/IMAGES/${imageNumber}.png`);
    } else if (imgSrc.includes(".png")) {
      // If both JPG and PNG fail, hide the component entirely
      setHidden(true);
    }
  }, [imgSrc, imageNumber]);

  // If both image formats failed to load, don't render anything
  if (hidden) {
    return null;
  }

  return (
    <div
      className="bg-[#0f0f19] rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer"
      onClick={() => onImageClick(imgSrc, index)}
    >
      <div className="relative w-full h-40 sm:h-48">
        <Image
          src={imgSrc}
          alt={`Project image ${imageNumber}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          className="object-cover"
          onError={handleError}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
