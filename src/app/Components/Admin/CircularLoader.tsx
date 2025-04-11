// components/CircularLoader.tsx

import React from 'react';
import "@/app/assets/css/dark-mode.css";
import "./CircularLoader.css"; // Import the CSS styles
import "@/app/assets/css/demo.css";

const CircularLoader = () => {
  return (
    <>
    <div className="next-loader-container">
      <div className="next-loader-content">
        <div className="next-logo">
          <h1 className="next-logo-text">
            Project <span className="next-logo-highlight">ИEXT</span>
          </h1>
          <div className="next-logo-underline"></div>
        </div>

        <div className="next-circular-loader">
          <div className="next-circular-track"></div>
          <div className="next-circular-progress">
            <div className="next-circular-progress-inner"></div>
          </div>
          <div className="next-circular-center"></div>
          <div className="next-orbiting-dots">
            <div className="next-dot"></div>
            <div className="next-dot"></div>
            <div className="next-dot"></div>
            <div className="next-dot"></div>
          </div>
        </div>

        <div className="next-loader-text">Loading the future of development...</div>
      </div>
    </div>
    </>
  );
};

export default CircularLoader;