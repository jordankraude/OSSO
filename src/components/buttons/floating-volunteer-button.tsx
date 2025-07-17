// src/components/StickyVolunteerButton.tsx
"use client"; // This allows client-side JavaScript (needed for sticky behavior)
import { useEffect, useRef, useState } from "react";
import VolunteerModalWrapper from "@/components/modals/volunteer-model-wrapper";

export default function FloatingVolunteerButton() {
  const [isSticky, setIsSticky] = useState(true);
  const [isVisible, setIsVisible] = useState(true); // State to control visibility
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsVisible(true); // Show button when the CTA is out of view
          setIsSticky(false); // Make it sticky
        } else {
          setIsVisible(false); // Start fading out
          setTimeout(() => setIsSticky(true), 300); // Allow time for fade-out
        }
      },
      {
        root: null, // Use the viewport
        threshold: .2, // Trigger when 20% of CTA is in view
      }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        className={`z-50 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isSticky ? "fixed right-12 bottom-12" : "fixed right-12 bottom-12"}`}
      >
        <VolunteerModalWrapper />
      </div>

      {/* The following div allows us to capture the Call-to-Action position */}
      <div ref={ctaRef} className="w-full"></div>
    </>
  );
}
