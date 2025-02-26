"use client";

import { useState } from "react";

export default function InquiryForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Use FormSubmit or similar service to send the email
      const formElement = e.target as HTMLFormElement;
      const formDataToSend = new FormData(formElement);

      await fetch("https://formsubmit.co/creatorsengr.services@myyahoo.com", {
        method: "POST",
        body: formDataToSend,
      });

      // Reset form and show success message
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setIsVisible(false);
      alert("Thank you for your inquiry. We'll get back to you soon!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error sending your inquiry. Please try again later.");
    }
  };

  return (
    <div
      id="inquiry-form"
      className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 ${
        isVisible ? "" : "hidden"
      }`}
    >
      <div className="bg-[rgb(15,15,25)] p-8 rounded-lg shadow-xl max-w-md w-full border border-[rgb(255,229,138)]/20">
        <h3 className="text-2xl font-bold mb-4 text-[rgb(255,229,138)]">
          Request a Custom Quote
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-1 text-[#feffdb]">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 bg-[rgb(25,25,35)] border border-[#5eb1df]/20 rounded text-[#feffdb]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1 text-[#feffdb]">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 bg-[rgb(25,25,35)] border border-[#5eb1df]/20 rounded text-[#feffdb]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1 text-[#feffdb]">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 bg-[rgb(25,25,35)] border border-[#5eb1df]/20 rounded text-[#feffdb]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1 text-[#feffdb]">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 bg-[rgb(25,25,35)] border border-[#5eb1df]/20 rounded text-[#feffdb]"
              rows={4}
              required
            />
          </div>

          {/* Hidden fields for FormSubmit */}
          <input type="hidden" name="_subject" value="Custom Quote Request" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className="bg-[rgb(15,15,25)] text-[#feffdb] border border-[#5eb1df] px-4 py-2 rounded hover:bg-[rgb(25,25,35)] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#5eb1df] text-[rgb(15,15,25)] px-4 py-2 rounded font-medium hover:bg-[#4a9dcb] transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
