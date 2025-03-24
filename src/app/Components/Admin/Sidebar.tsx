<<<<<<< Updated upstream
'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Correct hook for pathname

=======
import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import axios from "axios";
import Pusher from 'pusher-js';
>>>>>>> Stashed changes
import "@/app/assets/vendor/fonts/boxicons.css";
import "@/app/assets/vendor/css/core.css";
import "@/app/assets/vendor/css/theme-default.css";
import "@/app/assets/css/demo.css";
import "@/app/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "@/app/assets/vendor/libs/apex-charts/apex-charts.css";
<<<<<<< Updated upstream

export default function Sidebar() {
    const pathname = usePathname(); // Get the current path

    const isActive = (path) => pathname === path; // Check if path is active

    // Function to force reload
    const handleNavigation = (path) => (event) => {
=======
import Script from 'next/script';

export default function Sidebar() {
    const [notifications, setNotifications] = useState<{ id: number; message: string; status: string; path: string }[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const authToken = sessionStorage.getItem("authToken");
                if (authToken) {
                    const response = await axios.get("http://127.0.0.1:8000/api/notifications", {
                        headers: { Authorization: `Bearer ${authToken}` }
                    });
                    setNotifications(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch notifications:", error);
            }
        };

        fetchNotifications(); // Initial fetch

        // Initialize Pusher
        const pusher = new Pusher('9f53dd48143edd426e9a', {
            cluster: 'ap1',
            encrypted: true,
            logToConsole: true
        });

        const channel = pusher.subscribe('notifications');

        channel.bind('NotificationSent', (data: any) => {
            console.log("New Notification Received:", data);
            setNotifications(prev => [data, ...prev]);
            fetchNotifications();
        });

        pusher.connection.bind('connected', function() {
            console.log('Connected to Pusher');
        });

        pusher.connection.bind('error', function(err: any) {
            console.error('Pusher Error:', err);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);

    const pathname = usePathname(); // Get the current path

    const isActive = (path: string) => pathname === path; // Check if path is active

    // Function to force reload
    const handleNavigation = (path: string) => (event: React.MouseEvent) => {
>>>>>>> Stashed changes
        event.preventDefault(); // Prevent default Next.js behavior
        window.location.href = path; // Force reload
    };

<<<<<<< Updated upstream

    return (
        <>
        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
          <div className="app-brand demo">
            <a href="index.html" className="app-brand-link">
              <span className="app-brand-logo demo">
                <svg
                  width="25"
                  viewBox="0 0 25 42"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <defs>
                    <path
                      d="M13.7918663,0.358365126 L3.39788168,7.44174259 C0.566865006,9.69408886 -0.379795268,12.4788597 0.557900856,15.7960551 C0.68998853,16.2305145 1.09562888,17.7872135 3.12357076,19.2293357 C3.8146334,19.7207684 5.32369333,20.3834223 7.65075054,21.2172976 L7.59773219,21.2525164 L2.63468769,24.5493413 C0.445452254,26.3002124 0.0884951797,28.5083815 1.56381646,31.1738486 C2.83770406,32.8170431 5.20850219,33.2640127 7.09180128,32.5391577 C8.347334,32.0559211 11.4559176,30.0011079 16.4175519,26.3747182 C18.0338572,24.4997857 18.6973423,22.4544883 18.4080071,20.2388261 C17.963753,17.5346866 16.1776345,15.5799961 13.0496516,14.3747546 L10.9194936,13.4715819 L18.6192054,7.984237 L13.7918663,0.358365126 Z"
                      id="path-1"
                    ></path>
                    <path
                      d="M5.47320593,6.00457225 C4.05321814,8.216144 4.36334763,10.0722806 6.40359441,11.5729822 C8.61520715,12.571656 10.0999176,13.2171421 10.8577257,13.5094407 L15.5088241,14.433041 L18.6192054,7.984237 C15.5364148,3.11535317 13.9273018,0.573395879 13.7918663,0.358365126 C13.5790555,0.511491653 10.8061687,2.3935607 5.47320593,6.00457225 Z"
                      id="path-3"
                    ></path>
                    <path
                      d="M7.50063644,21.2294429 L12.3234468,23.3159332 C14.1688022,24.7579751 14.397098,26.4880487 13.008334,28.506154 C11.6195701,30.5242593 10.3099883,31.790241 9.07958868,32.3040991 C5.78142938,33.4346997 4.13234973,34 4.13234973,34 C4.13234973,34 2.75489982,33.0538207 2.37032616e-14,31.1614621 C-0.55822714,27.8186216 -0.55822714,26.0572515 -4.05231404e-15,25.8773518 C0.83734071,25.6075023 2.77988457,22.8248993 3.3049379,22.52991 C3.65497346,22.3332504 5.05353963,21.8997614 7.50063644,21.2294429 Z"
                      id="path-4"
                    ></path>
                    <path
                      d="M20.6,7.13333333 L25.6,13.8 C26.2627417,14.6836556 26.0836556,15.9372583 25.2,16.6 C24.8538077,16.8596443 24.4327404,17 24,17 L14,17 C12.8954305,17 12,16.1045695 12,15 C12,14.5672596 12.1403557,14.1461923 12.4,13.8 L17.4,7.13333333 C18.0627417,6.24967773 19.3163444,6.07059163 20.2,6.73333333 C20.3516113,6.84704183 20.4862915,6.981722 20.6,7.13333333 Z"
                      id="path-5"
                    ></path>
                  </defs>
                  <g id="g-app-brand" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Brand-Logo" transform="translate(-27.000000, -15.000000)">
                      <g id="Icon" transform="translate(27.000000, 15.000000)">
                        <g id="Mask" transform="translate(0.000000, 8.000000)">
                          <mask id="mask-2" fill="white">
                            <use xlinkHref="#path-1"></use>
                          </mask>
                          <use fill="#696cff" xlinkHref="#path-1"></use>
                          <g id="Path-3" mask="url(#mask-2)">
                            <use fill="#696cff" xlinkHref="#path-3"></use>
                            <use fillOpacity="0.2" fill="#FFFFFF" xlinkHref="#path-3"></use>
                          </g>
                          <g id="Path-4" mask="url(#mask-2)">
                            <use fill="#696cff" xlinkHref="#path-4"></use>
                            <use fillOpacity="0.2" fill="#FFFFFF" xlinkHref="#path-4"></use>
                          </g>
                        </g>
                        <g
                          id="Triangle"
                          transform="translate(19.000000, 11.000000) rotate(-300.000000) translate(-19.000000, -11.000000) "
                        >
                          <use fill="#696cff" xlinkHref="#path-5"></use>
                          <use fillOpacity="0.2" fill="#FFFFFF" xlinkHref="#path-5"></use>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
              <span className="app-brand-text demo menu-text fw-bolder ms-2">Admin side</span>
            </a>

            <a href="javascript:void(0);" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
=======
    // Detect page reload (before unload event)
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            updateNotificationStatusToRead(pathname); // Update notifications on reload
            console.log("Page is about to be unloaded, notifications updated.");
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        // Cleanup on unmount
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [pathname]); // Re-run the effect if the pathname changes

    // Function to update notification status to "read"
    const updateNotificationStatusToRead = async (path: string) => {
        try {
            const authToken = sessionStorage.getItem("authToken");
            if (authToken) {
                const response = await axios.put(
                    `http://127.0.0.1:8000/api/notifications/read`, 
                    { path },
                    { headers: { Authorization: `Bearer ${authToken}` } }
                );

                // Check if the backend updated any notifications
                const { updated_count } = response.data;

                if (updated_count > 0) {
                    console.log(`Successfully updated ${updated_count} notifications to "read" for path: ${path}`);
                    
                    // Optionally, update the local state to reflect the change immediately
                    setNotifications((prev) =>
                        prev.map((notification) =>
                            notification.path === path && notification.status === 'unread'
                                ? { ...notification, status: 'read' }
                                : notification
                        )
                    );
                } else {
                    console.log(`No notifications updated for path: ${path}`);
                }
            }
        } catch (error) {
            console.error("Failed to update notification status:", error);
        }
    };

    // Function to count unread notifications for a specific path
    const countUnreadNotifications = (path: string) => {
        const count = notifications.filter(
            (notification) => notification.path === path && notification.status === 'unread'
        ).length;
        console.log(`Total unread notifications for ${path}:`, count); // Log the total for each path
        return count;
    };

    // Function to render notification count
    const renderNotificationCount = (path: string) => {
        const count = countUnreadNotifications(path);
        return count > 0 ? (
            <span className="badge bg-danger position-absolute end-0">{count}</span>
        ) : null;
    };

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
        <aside
          id="layout-menu"
          className="sidebar layout-menu menu-vertical menu bg-menu-theme"
        >
          <div className="app-brand demo">
          <a href="index.html" className="app-brand-link">
              <span className="app-brand-logo demo">
                <img src="./img/logo.png" alt="Logo" width="40" />
              </span>
              <span className="app-brand-text menu-text fw-bolder ms-2" style={{ fontSize: '1.5rem' }}>
                Project NEXT
              </span>
            </a>
            <a
              href="javascript:void(0);"
              className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
            >
>>>>>>> Stashed changes
              <i className="bx bx-chevron-left bx-sm align-middle"></i>
            </a>
          </div>

          <div className="menu-inner-shadow"></div>

          <ul className="menu-inner py-1">
            {/* Dashboard */}
            <li className="menu-header small text-uppercase">
              <span className="menu-header-text">Dashboard</span>
            </li>
<<<<<<< Updated upstream
            <li className={`menu-item ${isActive('/Dashboard') ? 'active' : ''}`}>
                <a href="/Dashboard" className="menu-link" onClick={handleNavigation('/Dashboard')}>
                    <i className="menu-icon tf-icons bx bx-home-circle"></i>
                    <div data-i18n="Analytics">Dashboard</div>
                </a>
=======
            <li className={`menu-item ${isActive("/Dashboard") ? "active" : ""}`}>
              <a
                href="/Dashboard"
                className="menu-link"
                onClick={handleNavigation("/Dashboard")}
              >
                <i className="menu-icon tf-icons bx bx-home-circle"></i>
                <div data-i18n="Analytics">Dashboard</div>
              </a>
            </li>

            <li className="menu-header small text-uppercase">
              <span className="menu-header-text">Management</span>
            </li>

            <li className={`menu-item ${isActive("/Peopleware") ? "active" : ""}`}>
              <a
                href="/Peopleware"
                className="menu-link"
                onClick={handleNavigation("/Peopleware")}
              >
                <i className="menu-icon tf-icons bx bx-table"></i>
                <div data-i18n="Analytics">Peopleware</div>
              </a>
            </li>

            <li className={`menu-item ${isActive("/Manager") ? "active" : ""}`}>
              <a
                href="/Manager"
                className="menu-link"
                onClick={handleNavigation("/Manager")}
              >
                <i className="menu-icon tf-icons bx bxs-folder-open"></i>
                <div data-i18n="Analytics">File Manager</div>
              </a>
            </li>

            <li className={`menu-item ${isActive("/Formbuilder") ? "active" : ""}`}>
              <a
                href="/Formbuilder"
                className="menu-link"
                onClick={handleNavigation("/Formbuilder")}
              >
                <i className="menu-icon tf-icons bx bxs-edit"></i>
                <div data-i18n="Analytics">Form Builder</div>
              </a>
>>>>>>> Stashed changes
            </li>

            <li className="menu-header small text-uppercase">
              <span className="menu-header-text">Settings</span>
            </li>

            {/* Users */}
<<<<<<< Updated upstream
            <li className={`menu-item ${isActive('/User') ? 'active' : ''}`}>
                <a href="/User" className="menu-link" onClick={handleNavigation('/User')}>
                    <i className="menu-icon tf-icons bx bx-user"></i>
                    <div data-i18n="Users">Users</div>
                </a>
            </li>

            <li className={`menu-item ${isActive('/Profile') ? 'active' : ''}`}>
                <a href="/Profile" className="menu-link" onClick={handleNavigation('/Profile')}>
                    <i className="menu-icon tf-icons bx bxs-user-rectangle"></i>
                    <div data-i18n="Users">Profile</div>
                </a>
=======
            <li className={`menu-item ${isActive("/User") ? "active" : ""}`}>
              <a
                href="/User"
                className="menu-link"
                onClick={handleNavigation("/User")}
              >
                <i className="menu-icon tf-icons bx bx-user"></i>
                <div data-i18n="Users">Users</div>
                {renderNotificationCount("/User")}
              </a>
            </li>

            {/* Profile */}
            <li className={`menu-item ${isActive("/Profile") ? "active" : ""}`}>
              <a
                href="/Profile"
                className="menu-link"
                onClick={handleNavigation("/Profile")}
              >
                <i className="menu-icon tf-icons bx bxs-user-rectangle"></i>
                <div data-i18n="Users">Profile</div>
                {renderNotificationCount("/Profile")}
              </a>
>>>>>>> Stashed changes
            </li>
          </ul>
        </aside>
        </>
<<<<<<< Updated upstream
    )
=======
    );
>>>>>>> Stashed changes
}
