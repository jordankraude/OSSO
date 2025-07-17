// src/components/LoadingSpinner.tsx
import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="mt-20 z-50 flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div className="loader">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className={`circle circle-${index}`}
            ></div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-lg font-semibold text-blue-600 text-center">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
