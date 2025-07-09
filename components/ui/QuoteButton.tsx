"use client";

import { useState } from "react";
import { X } from "lucide-react";

const QuoteButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Restore scrolling
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <button
        onClick={openModal}
        className="bg-[#b7922c] text-white px-8 py-3 rounded hover:bg-[#d6aa32] transition-colors duration-300 font-medium"
      >
        Request a Quote
      </button>

      {/* Quote Modal with transparent background */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-all duration-300 ease-in-out"
          onClick={closeModal}
        >
          <div
            className="bg-[rgb(25,25,35)] p-8 rounded-lg shadow-xl max-w-md w-full border border-[rgb(255,229,138)]/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[rgb(255,229,138)]">
                Request a Quote
              </h3>
              <button
                onClick={closeModal}
                className="text-white hover:text-[rgb(255,229,138)] transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            <form>
              <div className="mb-4">
                <label className="block text-[#feffdb] mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-[rgb(15,15,25)] border border-gray-700 rounded focus:outline-none focus:border-[rgb(255,229,138)]"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#feffdb] mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-[rgb(15,15,25)] border border-gray-700 rounded focus:outline-none focus:border-[rgb(255,229,138)]"
                  placeholder="Your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#feffdb] mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 bg-[rgb(15,15,25)] border border-gray-700 rounded focus:outline-none focus:border-[rgb(255,229,138)]"
                  placeholder="Your phone number"
                />
              </div>
              <div className="mb-6">
                <label className="block text-[#feffdb] mb-2">
                  Project Details
                </label>
                <textarea
                  className="w-full px-4 py-2 bg-[rgb(15,15,25)] border border-gray-700 rounded focus:outline-none focus:border-[rgb(255,229,138)] h-32"
                  placeholder="Describe your project requirements"
                  required
                ></textarea>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 border border-gray-600 rounded text-gray-300 hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#b7922c] text-white rounded hover:bg-[#d6aa32] transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default QuoteButton;
