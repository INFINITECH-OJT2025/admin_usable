'use client';

import React, { useEffect } from 'react';
import Head from 'next/head';


import "react-toastify/dist/ReactToastify.css";


import "@/app/assets/vendor/fonts/boxicons.css";
import "@/app/assets/vendor/css/core.css";
import "@/app/assets/vendor/css/theme-default.css";
import "@/app/assets/css/demo.css";
import "@/app/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "@/app/assets/vendor/libs/apex-charts/apex-charts.css";
import Sidebar from '@/app/Components/Admin/Sidebar';
import Navbar from '@/app/Components/Admin/Navbar';
import Script from 'next/script';
import FormTemplate from './FormTemplate';
import { ToastContainer } from 'react-toastify';

export default function Manager() {


    
    
    
  useEffect(() => {
    // Reinitialize or load any JS libraries after navigation
    if (typeof window !== 'undefined') {
      // Example: Reinitialize Bootstrap or other JS libraries
    }
  }, []);

  return (
    <>
    <ToastContainer />
      <Script
        src="/assets/vendor/js/helpers.js"
        strategy="afterInteractive" // Choose strategy: 'afterInteractive', 'afterInteractive', or 'lazyOnload'
      />
      <Script src="/assets/js/config.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/vendor/libs/jquery/jquery.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/vendor/libs/popper/popper.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/vendor/js/bootstrap.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/vendor/js/menu.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/vendor/libs/apex-charts/apexcharts.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/js/main.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/js/dashboards-analytics.js"
        strategy="afterInteractive"
      />
      {/* Include External Fonts & Scripts */}
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <script
          src="https://buttons.github.io/buttons.js"
          async
          defer
        ></script>
      </Head>
      <div className="layout-wrapper layout-content-navbar light-style layout-menu-fixed layout-navbar-fixed">
      <div className="layout-container">
        {/* Menu */}
        <Sidebar />
        {/* / Menu */}

        {/* Layout container */}
        <div className="layout-page">
          {/* Navbar */}

          <Navbar />
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <FormTemplate />
            </div>
        </div>
      </div>
    </div>
    <div className="layout-overlay layout-menu-toggle"></div>
    </div>

    </>
  );
}
