'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
// import { useEffect } from "react";
import axios from "axios";

import "../assets/vendor/fonts/boxicons.css";
import "../assets/vendor/css/core.css";
import "../assets/vendor/css/theme-default.css";
import "../assets/css/demo.css";
import "../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "../assets/vendor/libs/apex-charts/apex-charts.css";
import Sidebar from '../Components/Admin/Sidebar';
import Navbar from '../Components/Admin/Navbar';

import Script from 'next/script';
import UserRegistrationChart from './UserRegistrationChart';
import FormUsedChart from './FormUsedChat';
import NotificationCard from './NotificationCard';
import AuditlogsCard from './AuditlogsCard';

export default function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [user, setUser] = useState({ username: "", email: "", profile_image: "", fullname: "" });
  const [animatedUserCount, setAnimatedUserCount] = useState(0);
  const [animatedAdminCount, setAnimatedAdminCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserCounts = async () => {
      try {
        const authToken = sessionStorage.getItem("authToken");
        if (authToken) {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}countUsers`, {
            headers: { Authorization: `Bearer ${authToken}` }
          });
  
          // Ensure you're using the correct response property names
          setUserCount(response.data.user_count);  // ✅ Corrected key
          setAdminCount(response.data.admin_count); // ✅ Corrected key
        }
      } catch (error) {
        console.error("Error fetching user counts:", error);
      }
    };
  
    fetchUserCounts();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
         try {
            const authToken = sessionStorage.getItem("authToken");
             if (authToken) {
                 const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/user`, {
                     headers: { Authorization: `Bearer ${authToken}` }
                 });
                 setUser({
                     username: response.data.username,
                     email: response.data.email,
                     profile_image: response.data.profile_image,
                     fullname: response.data.fullname
                 });
             }
         } catch (error) {
             console.error("Failed to fetch user data:", error);
         } finally {
             setLoading(false);
         }
     };
   fetchUserData();
}, []);

useEffect(() => {
  let userInterval: NodeJS.Timeout;
  let adminInterval: NodeJS.Timeout;

  if (userCount > 0) {
    let current = 0;
    userInterval = setInterval(() => {
      current += Math.ceil(userCount / 50); // Adjust speed by changing divisor
      if (current >= userCount) {
        setAnimatedUserCount(userCount);
        clearInterval(userInterval);
      } else {
        setAnimatedUserCount(current);
      }
    }, 20);
  }

  if (adminCount > 0) {
    let current = 0;
    adminInterval = setInterval(() => {
      current += Math.ceil(adminCount / 50);
      if (current >= adminCount) {
        setAnimatedAdminCount(adminCount);
        clearInterval(adminInterval);
      } else {
        setAnimatedAdminCount(current);
      }
    }, 20);
  }

  return () => {
    clearInterval(userInterval);
    clearInterval(adminInterval);
  };
}, [userCount, adminCount]);
  
  
  useEffect(() => {
    // Reinitialize or load any JS libraries after navigation
    if (typeof window !== 'undefined') {
      // Example: Reinitialize Bootstrap or other JS libraries
    }
  }, []);

  return (
    <>
      <Script
        src="/assets/vendor/js/helpers.js"
        strategy="afterInteractive"
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
      <div className="layout-wrapper layout-content-navbar light-style layout-menu-fixed layout-navbar-fixed">
      <div className="layout-container">
        {/* Menu */}
        <Sidebar />
        {/* / Menu */}

        {/* Layout container */}
        <div className="layout-page">
          {/* Navbar */}

          <Navbar />

          {/* / Navbar */}

          {/* Content wrapper */}
          <div className="content-wrapper">
            {/* Content */}

            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row">
                <div className="col-lg-8 mb-4 order-0">
                  <div className="card">
                    <div className="d-flex align-items-end row">
                      <div className="col-sm-7">
                      <div className="card-body">
                          
                          {loading ? (
                              <span className="fw-semibold d-block card-title text-primary">Loading...</span>
                          ) : (
                              <>
                                  <span className="fw-semibold d-block"> <h5 className="card-title text-primary">Welcome! {user.fullname} Pogi! 🎉</h5></span>
                              </>
                          )}
                          <p className="mb-4">
                            I always tell others to back up their code… turns out, I should’ve listened to myself.
                          </p>

                          <a href="/Profile" className="btn btn-sm btn-outline-primary">View Profile</a>
                        </div>
                      </div>
                      <div className="col-5 text-center text-sm-left">
                      <div className="card-body pb-1 px-1 px-md-0 d-flex justify-content-center align-items-center"> {/* Added flex classes */}
                        <Image
                          src="/gifs/Main Scene Robot.gif" // Ensure the path is correct
                          width={140} // Use curly braces for numbers
                          height={140} // Use curly braces for numbers
                          alt="View Badge User"
                          className="img-fluid" // Use Bootstrap's class for responsive images
                          priority // Optional: Use this if you want to load the image eagerly
                        />
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 order-1">
                  <div className="row">
                    {/* Users Card */}
                    <div className="col-lg-6 col-md-12 col-6 mb-4">
                      <div className="card" style={{ height: "170px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div className="card-body text-center">
                          <span className="fw-semibold d-block mb-2">Users</span>
                          <div className="d-flex align-items-center justify-content-center">
                            <div className="avatar flex-shrink-0" style={{ height: "55px", width: "55px" }}>
                              <img src="../assets/img/icons/unicons/admin-icon.png" alt="Users" className="rounded" />
                            </div>
                            <h2 className="mb-0 ms-3">{animatedUserCount}</h2>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Admin Card */}
                    <div className="col-lg-6 col-md-12 col-6 mb-4">
                      <div className="card" style={{ height: "170px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div className="card-body text-center">
                          <span className="fw-semibold d-block mb-2">Admin</span>
                          <div className="d-flex align-items-center justify-content-center">
                            <div className="avatar flex-shrink-0" style={{ height: "55px", width: "55px" }}>
                              <img src="../assets/img/icons/unicons/user-icon.png" alt="Admin" className="rounded" />
                            </div>
                            <h2 className="mb-0 ms-3">{animatedAdminCount}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                
                {/* Total Revenue */}
                <div className="col-12 col-lg-8 order-2 order-md-3 order-lg-2 mb-2">
                  <UserRegistrationChart />
                </div>







                {/*/ Real-time Notification */}
                <div className="col-12 col-md-8 col-lg-4 order-3 order-md-4">
                  <div className="row">
                    <div className="col-12 mb-2">
                      <div className="card">
                        <AuditlogsCard />
                      </div>
                    </div>
                  </div>
                </div>

                
              </div>
              <div className="row">
                {/* Order Statistics */}
                <div className="col-12 col-lg-8 order-2 order-md-3 order-lg-3 mb-2">
                  <FormUsedChart />
                </div>
                {/*/ Order Statistics */}


                {/* Transactions */}
                <div className="col-md-6 col-lg-4 order-5 mb-4">
                  <div className="row">
                    <div className="col-12 mb-4">
                      <div className="card">
                        <NotificationCard />
                      </div>
                    </div>
                  </div>
                </div>
                {/*/ Transactions */}
              </div>
            </div>
            {/* / Content */}

            <div className="content-backdrop fade"></div>
          </div>
          {/* Content wrapper */}
        </div>
        {/* / Layout page */}
      </div>

      {/* Overlay */}
      <div className="layout-overlay layout-menu-toggle"></div>
    </div>
    </>
  );
}