"use client";

import { useState } from "react";

interface QuoteButtonProps {
  className?: string;
}

export default function QuoteButton({ className }: QuoteButtonProps) {
  const handleClick = () => {
    const inquiryForm = document.getElementById("inquiry-form");
    if (inquiryForm) {
      inquiryForm.classList.remove("hidden");
    }
  };

  return (
    <button
      className={`btn btn-primary ${className || ""}`}
      onClick={handleClick}
    >
      Request a Custom Quote
    </button>
  );
}
