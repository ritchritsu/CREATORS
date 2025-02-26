"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const InquiryModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Make the modal accessible globally
    window.openInquiryModal = () => setIsOpen(true);

    return () => {
      // @ts-ignore - Clean up global function
      window.openInquiryModal = undefined;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit the form using FormSubmit
      await fetch(e.currentTarget.action, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: {
          Accept: "application/json",
        },
      });

      setIsSubmitted(true);
      // Reset form after successful submission
      e.currentTarget.reset();

      // Close modal after 3 seconds
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        // Close when clicking outside the modal
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
    >
      <div className="bg-[rgba(25,25,35,0.85)] p-8 rounded-lg shadow-2xl w-full max-w-md relative border border-[rgb(255,229,138)]/20 backdrop-blur-md">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-[rgb(255,229,138)]">
          Product Inquiry
        </h2>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="mb-4 mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Thank You!
            </h3>
            <p className="text-gray-300">
              Your inquiry has been sent successfully. We'll get back to you
              soon!
            </p>
          </div>
        ) : (
          <form
            action="https://formsubmit.co/ritchtopia@gmail.com"
            method="POST"
            className="space-y-4"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 bg-[rgba(30,30,40,0.7)] text-white rounded-md focus:outline-none focus:ring-1 focus:ring-[rgb(255,229,138)]/50 border border-gray-700"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 bg-[rgba(30,30,40,0.7)] text-white rounded-md focus:outline-none focus:ring-1 focus:ring-[rgb(255,229,138)]/50 border border-gray-700"
                required
              />
            </div>

            <div>
              <label
                htmlFor="product"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Product of Interest
              </label>
              <input
                type="text"
                id="product"
                name="product"
                className="w-full px-3 py-2 bg-[rgba(30,30,40,0.7)] text-white rounded-md focus:outline-none focus:ring-1 focus:ring-[rgb(255,229,138)]/50 border border-gray-700"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-3 py-2 bg-[rgba(30,30,40,0.7)] text-white rounded-md focus:outline-none focus:ring-1 focus:ring-[rgb(255,229,138)]/50 border border-gray-700"
                required
              ></textarea>
            </div>

            {/* Hidden fields for formsubmit.co */}
            <input type="hidden" name="_subject" value="New Product Inquiry" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value={window?.location?.href} />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 rounded font-medium text-[rgb(15,15,25)] bg-gradient-to-r from-[rgb(215,189,128)] to-[rgb(255,229,138)] hover:from-[rgb(255,229,138)] hover:to-[rgb(255,239,178)] transition-colors ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Inquiry"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default InquiryModal;

// Add this type declaration for the global window object
declare global {
  interface Window {
    openInquiryModal: () => void;
  }
}
