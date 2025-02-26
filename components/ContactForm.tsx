"use client";

import { useState } from "react";
import { X } from "lucide-react";

const ContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleForm = () => setIsOpen(!isOpen);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <>
      <button
        onClick={toggleForm}
        className="fixed bottom-4 right-4 bg-[#b7922c] text-white px-4 py-2 rounded-md hover:bg-[#9a7a24] transition duration-300 ease-in-out"
      >
        INQUIRE
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#0f0f19] p-8 rounded-lg max-w-md w-full relative">
            <button
              onClick={toggleForm}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            {isSubmitted ? (
              <div className="bg-[#262834] p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-2xl font-bold mb-4 text-[#ffe58a]">
                  Thank You!
                </h3>
                <p className="mb-4 text-[#feffdb]">
                  Your message has been received. We will get back to you
                  shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-[#5eb1df] text-[#2f313d] px-6 py-2 rounded-md hover:bg-[#4a9dcb] transition duration-300"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="bg-[#262834] p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-[#ffe58a]">
                  Get In Touch
                </h3>
                <p className="mb-6 text-[#feffdb]">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[#feffdb] mb-1"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="w-full px-3 py-2 bg-[#2f313d] text-[#feffdb] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffe58a] border border-[#5eb1df]/20"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[#feffdb] mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="w-full px-3 py-2 bg-[#2f313d] text-[#feffdb] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffe58a] border border-[#5eb1df]/20"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-[#feffdb] mb-1"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      className="w-full px-3 py-2 bg-[#2f313d] text-[#feffdb] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffe58a] border border-[#5eb1df]/20"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[#feffdb] mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-3 py-2 bg-[#2f313d] text-[#feffdb] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffe58a] border border-[#5eb1df]/20"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#5eb1df] text-[#2f313d] font-medium px-4 py-2 rounded-md hover:bg-[#4a9dcb] transition duration-300 ease-in-out"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ContactForm;
