'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { useEffect } from "react";
import axios from "axios";

import "@/app/assets/vendor/fonts/boxicons.css";
import "@/app/assets/vendor/css/core.css";
import "@/app/assets/vendor/css/theme-default.css";
import "@/app/assets/css/demo.css";
import "@/app/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "@/app/assets/vendor/libs/apex-charts/apex-charts.css";
import Sidebar from '@/app/Components/Userface/Sidebar';
import Navbar from '@/app/Components/Userface/Navbar';
import withAuth from '@/app/utils/withAuth';

import Script from 'next/script';






const Dashboard = () => {
  const [user, setUser] = useState({ username: "", email: "", profile_image: "", fullname: "" });
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
      const fetchUserData = async () => {
           try {
              const authToken = sessionStorage.getItem("authToken");
               if (authToken) {
                   const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}user`, {
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
    const savedTheme = sessionStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    sessionStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    applyDarkModeStyles(isDarkMode); // Call the function to apply dark mode styles
  }, [isDarkMode]);

  const applyDarkModeStyles = (isDarkMode: boolean) => {
    const elementsToDarken = [
      'body',
      '.layout-wrapper',
      '.layout-container',
      '.navbar',
      '.sidebar',
      '.card',
      '.content-wrapper',
      '.btn',
    ];

    elementsToDarken.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.classList.toggle('dark-mode', isDarkMode);
      });
    });
  };


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
      <div className="layout-wrapper layout-content-navbar light-style layout-menu-fixed">
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
                            You have done <span className="fw-bold">72%</span> more sales today. Check your new badge in
                            your profile.
                          </p>

                          <a href="javascript:;" className="btn btn-sm btn-outline-primary">View Badges</a>
                        </div>
                      </div>
                      <div className="col-sm-5 text-center text-sm-left">
                        <div className="card-body pb-0 px-0 px-md-4">
                          <img
                            src="../assets/img/illustrations/man-with-laptop-light.png"
                            width="170"
                            height="160"
                            alt="View Badge User"
                            data-app-dark-img="illustrations/man-with-laptop-dark.png"
                            data-app-light-img="illustrations/man-with-laptop-light.png"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 order-1">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                              <img
                                src="../assets/img/icons/unicons/chart-success.png"
                                alt="chart success"
                                className="rounded"
                              />
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt3"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded"></i>
                              </button>
                              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt3">
                                <a className="dropdown-item" href="javascript:void(0);">View More</a>
                                <a className="dropdown-item" href="javascript:void(0);">Delete</a>
                              </div>
                            </div>
                          </div>
                          <span className="fw-semibold d-block mb-1">Profit</span>
                          <h3 className="card-title mb-2">$12,628</h3>
                          <small className="text-success fw-semibold"><i className="bx bx-up-arrow-alt"></i> +72.80%</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                              <img
                                src="../assets/img/icons/unicons/wallet-info.png"
                                alt="Credit Card"
                                className="rounded"
                              />
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt6"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded"></i>
                              </button>
                              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt6">
                                <a className="dropdown-item" href="javascript:void(0);">View More</a>
                                <a className="dropdown-item" href="javascript:void(0);">Delete</a>
                              </div>
                            </div>
                          </div>
                          <span>Sales</span>
                          <h3 className="card-title text-nowrap mb-1">$4,679</h3>
                          <small className="text-success fw-semibold"><i className="bx bx-up-arrow-alt"></i> +28.42%</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Total Revenue */}
                <div className="col-12 col-lg-8 order-2 order-md-3 order-lg-2 mb-4">
                  <div className="card">
                    <div className="row row-bordered g-0">
                      <div className="col-md-8">
                        <h5 className="card-header m-0 me-2 pb-3">Total Revenue</h5>
                        <div id="totalRevenueChart" className="px-2"></div>
                      </div>
                      <div className="col-md-4">
                        <div className="card-body">
                          <div className="text-center">
                            <div className="dropdown">
                              <button
                                className="btn btn-sm btn-outline-primary dropdown-toggle"
                                type="button"
                                id="growthReportId"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                2022
                              </button>
                              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="growthReportId">
                                <a className="dropdown-item" href="javascript:void(0);">2021</a>
                                <a className="dropdown-item" href="javascript:void(0);">2020</a>
                                <a className="dropdown-item" href="javascript:void(0);">2019</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="growthChart"></div>
                        <div className="text-center fw-semibold pt-3 mb-2">62% Company Growth</div>

                        <div className="d-flex px-xxl-4 px-lg-2 p-4 gap-xxl-3 gap-lg-1 gap-3 justify-content-between">
                          <div className="d-flex">
                            <div className="me-2">
                              <span className="badge bg-label-primary p-2"><i className="bx bx-dollar text-primary"></i></span>
                            </div>
                            <div className="d-flex flex-column">
                              <small>2022</small>
                              <h6 className="mb-0">$32.5k</h6>
                            </div>
                          </div>
                          <div className="d-flex">
                            <div className="me-2">
                              <span className="badge bg-label-info p-2"><i className="bx bx-wallet text-info"></i></span>
                            </div>
                            <div className="d-flex flex-column">
                              <small>2021</small>
                              <h6 className="mb-0">$41.2k</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*/ Total Revenue */}
                <div className="col-12 col-md-8 col-lg-4 order-3 order-md-2">
                  <div className="row">
                    <div className="col-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                              <img src="../assets/img/icons/unicons/paypal.png" alt="Credit Card" className="rounded" />
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt4"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded"></i>
                              </button>
                              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt4">
                                <a className="dropdown-item" href="javascript:void(0);">View More</a>
                                <a className="dropdown-item" href="javascript:void(0);">Delete</a>
                              </div>
                            </div>
                          </div>
                          <span className="d-block mb-1">Payments</span>
                          <h3 className="card-title text-nowrap mb-2">$2,456</h3>
                          <small className="text-danger fw-semibold"><i className="bx bx-down-arrow-alt"></i> -14.82%</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                              <img src="../assets/img/icons/unicons/cc-primary.png" alt="Credit Card" className="rounded" />
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt1"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded"></i>
                              </button>
                              <div className="dropdown-menu" aria-labelledby="cardOpt1">
                                <a className="dropdown-item" href="javascript:void(0);">View More</a>
                                <a className="dropdown-item" href="javascript:void(0);">Delete</a>
                              </div>
                            </div>
                          </div>
                          <span className="fw-semibold d-block mb-1">Transactions</span>
                          <h3 className="card-title mb-2">$14,857</h3>
                          <small className="text-success fw-semibold"><i className="bx bx-up-arrow-alt"></i> +28.14%</small>
                        </div>
                      </div>
                    </div>
                    {/* </div>
    <div className="row"> */}
                    <div className="col-12 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between flex-sm-row flex-column gap-3">
                            <div className="d-flex flex-sm-column flex-row align-items-start justify-content-between">
                              <div className="card-title">
                                <h5 className="text-nowrap mb-2">Profile Report</h5>
                                <span className="badge bg-label-warning rounded-pill">Year 2021</span>
                              </div>
                              <div className="mt-sm-auto">
                                <small className="text-success text-nowrap fw-semibold"
                                  ><i className="bx bx-chevron-up"></i> 68.2%</small
                                >
                                <h3 className="mb-0">$84,686k</h3>
                              </div>
                            </div>
                            <div id="profileReportChart"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {/* Order Statistics */}
                <div className="col-md-6 col-lg-4 col-xl-4 order-0 mb-4">
                  <div className="card h-100">
                    <div className="card-header d-flex align-items-center justify-content-between pb-0">
                      <div className="card-title mb-0">
                        <h5 className="m-0 me-2">Order Statistics</h5>
                        <small className="text-muted">42.82k Total Sales</small>
                      </div>
                      <div className="dropdown">
                        <button
                          className="btn p-0"
                          type="button"
                          id="orederStatistics"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="orederStatistics">
                          <a className="dropdown-item" href="javascript:void(0);">Select All</a>
                          <a className="dropdown-item" href="javascript:void(0);">Refresh</a>
                          <a className="dropdown-item" href="javascript:void(0);">Share</a>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex flex-column align-items-center gap-1">
                          <h2 className="mb-2">8,258</h2>
                          <span>Total Orders</span>
                        </div>
                        <div id="orderStatisticsChart"></div>
                      </div>
                      <ul className="p-0 m-0">
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <span className="avatar-initial rounded bg-label-primary"
                              ><i className="bx bx-mobile-alt"></i
                            ></span>
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <h6 className="mb-0">Electronic</h6>
                              <small className="text-muted">Mobile, Earbuds, TV</small>
                            </div>
                            <div className="user-progress">
                              <small className="fw-semibold">82.5k</small>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <span className="avatar-initial rounded bg-label-success"><i className="bx bx-closet"></i></span>
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <h6 className="mb-0">Fashion</h6>
                              <small className="text-muted">T-shirt, Jeans, Shoes</small>
                            </div>
                            <div className="user-progress">
                              <small className="fw-semibold">23.8k</small>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <span className="avatar-initial rounded bg-label-info"><i className="bx bx-home-alt"></i></span>
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <h6 className="mb-0">Decor</h6>
                              <small className="text-muted">Fine Art, Dining</small>
                            </div>
                            <div className="user-progress">
                              <small className="fw-semibold">849k</small>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex">
                          <div className="avatar flex-shrink-0 me-3">
                            <span className="avatar-initial rounded bg-label-secondary"
                              ><i className="bx bx-football"></i
                            ></span>
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <h6 className="mb-0">Sports</h6>
                              <small className="text-muted">Football, Cricket Kit</small>
                            </div>
                            <div className="user-progress">
                              <small className="fw-semibold">99</small>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/*/ Order Statistics */}

                {/* Expense Overview */}
                <div className="col-md-6 col-lg-4 order-1 mb-4">
                  <div className="card h-100">
                    <div className="card-header">
                      <ul className="nav nav-pills" role="tablist">
                        <li className="nav-item">
                          <button
                            type="button"
                            className="nav-link active"
                            role="tab"
                            data-bs-toggle="tab"
                            data-bs-target="#navs-tabs-line-card-income"
                            aria-controls="navs-tabs-line-card-income"
                            aria-selected="true"
                          >
                            Income
                          </button>
                        </li>
                        <li className="nav-item">
                          <button type="button" className="nav-link" role="tab">Expenses</button>
                        </li>
                        <li className="nav-item">
                          <button type="button" className="nav-link" role="tab">Profit</button>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body px-0">
                      <div className="tab-content p-0">
                        <div className="tab-pane fade show active" id="navs-tabs-line-card-income" role="tabpanel">
                          <div className="d-flex p-4 pt-3">
                            <div className="avatar flex-shrink-0 me-3">
                              <img src="../assets/img/icons/unicons/wallet.png" alt="User" />
                            </div>
                            <div>
                              <small className="text-muted d-block">Total Balance</small>
                              <div className="d-flex align-items-center">
                                <h6 className="mb-0 me-1">$459.10</h6>
                                <small className="text-success fw-semibold">
                                  <i className="bx bx-chevron-up"></i>
                                  42.9%
                                </small>
                              </div>
                            </div>
                          </div>
                          <div id="incomeChart"></div>
                          <div className="d-flex justify-content-center pt-4 gap-2">
                            <div className="flex-shrink-0">
                              <div id="expensesOfWeek"></div>
                            </div>
                            <div>
                              <p className="mb-n1 mt-1">Expenses This Week</p>
                              <small className="text-muted">$39 less than last week</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*/ Expense Overview */}

                {/* Transactions */}
                <div className="col-md-6 col-lg-4 order-2 mb-4">
                  <div className="card h-100">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h5 className="card-title m-0 me-2">Transactions</h5>
                      <div className="dropdown">
                        <button
                          className="btn p-0"
                          type="button"
                          id="transactionID"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="transactionID">
                          <a className="dropdown-item" href="javascript:void(0);">Last 28 Days</a>
                          <a className="dropdown-item" href="javascript:void(0);">Last Month</a>
                          <a className="dropdown-item" href="javascript:void(0);">Last Year</a>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <ul className="p-0 m-0">
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <img src="../assets/img/icons/unicons/paypal.png" alt="User" className="rounded" />
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <small className="text-muted d-block mb-1">Paypal</small>
                              <h6 className="mb-0">Send money</h6>
                            </div>
                            <div className="user-progress d-flex align-items-center gap-1">
                              <h6 className="mb-0">+82.6</h6>
                              <span className="text-muted">USD</span>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <img src="../assets/img/icons/unicons/wallet.png" alt="User" className="rounded" />
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <small className="text-muted d-block mb-1">Wallet</small>
                              <h6 className="mb-0">Mac'D</h6>
                            </div>
                            <div className="user-progress d-flex align-items-center gap-1">
                              <h6 className="mb-0">+270.69</h6>
                              <span className="text-muted">USD</span>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <img src="../assets/img/icons/unicons/chart.png" alt="User" className="rounded" />
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <small className="text-muted d-block mb-1">Transfer</small>
                              <h6 className="mb-0">Refund</h6>
                            </div>
                            <div className="user-progress d-flex align-items-center gap-1">
                              <h6 className="mb-0">+637.91</h6>
                              <span className="text-muted">USD</span>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <img src="../assets/img/icons/unicons/cc-success.png" alt="User" className="rounded" />
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <small className="text-muted d-block mb-1">Credit Card</small>
                              <h6 className="mb-0">Ordered Food</h6>
                            </div>
                            <div className="user-progress d-flex align-items-center gap-1">
                              <h6 className="mb-0">-838.71</h6>
                              <span className="text-muted">USD</span>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <img src="../assets/img/icons/unicons/wallet.png" alt="User" className="rounded" />
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <small className="text-muted d-block mb-1">Wallet</small>
                              <h6 className="mb-0">Starbucks</h6>
                            </div>
                            <div className="user-progress d-flex align-items-center gap-1">
                              <h6 className="mb-0">+203.33</h6>
                              <span className="text-muted">USD</span>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex">
                          <div className="avatar flex-shrink-0 me-3">
                            <img src="../assets/img/icons/unicons/cc-warning.png" alt="User" className="rounded" />
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <small className="text-muted d-block mb-1">Mastercard</small>
                              <h6 className="mb-0">Ordered Food</h6>
                            </div>
                            <div className="user-progress d-flex align-items-center gap-1">
                              <h6 className="mb-0">-92.45</h6>
                              <span className="text-muted">USD</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/*/ Transactions */}
              </div>
            </div>
            {/* / Content */}

            {/* Footer */}
            <footer className="content-footer footer bg-footer-theme">
              <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                <div className="mb-2 mb-md-0">
                  ©
                  <script>

                  </script>
                  , made with ❤️ by
                  <a href="https://themeselection.com" target="_blank" className="footer-link fw-bolder">ThemeSelection</a>
                </div>
                <div>
                  <a href="https://themeselection.com/license/" className="footer-link me-4" target="_blank">License</a>
                  <a href="https://themeselection.com/" target="_blank" className="footer-link me-4">More Themes</a>

                  <a
                    href="https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/"
                    target="_blank"
                    className="footer-link me-4"
                    >Documentation</a
                  >

                  <a
                    href="https://github.com/themeselection/sneat-html-admin-template-free/issues"
                    target="_blank"
                    className="footer-link me-4"
                    >Support</a
                  >
                </div>
              </div>
            </footer>
            {/* / Footer */}

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


export default withAuth(Dashboard);