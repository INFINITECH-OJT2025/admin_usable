import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import axios from "axios";
import Pusher from 'pusher-js';
import "@/app/assets/vendor/fonts/boxicons.css";
import "@/app/assets/vendor/css/core.css";
import "@/app/assets/vendor/css/theme-default.css";
import "@/app/assets/css/demo.css";
import "@/app/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "@/app/assets/vendor/libs/apex-charts/apex-charts.css";
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
        event.preventDefault(); // Prevent default Next.js behavior
        window.location.href = path; // Force reload
    };

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
                <img src="../img/logo.png" alt="Logo" width="40" />
              </span>
              <span className="app-brand-text menu-text fw-bolder ms-2" style={{ fontSize: '1.5rem' }}>
                Project NEXT
              </span>
            </a>
            <a
              href="javascript:void(0);"
              className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
            >
              <i className="bx bx-chevron-left bx-sm align-middle"></i>
            </a>
          </div>

          <div className="menu-inner-shadow"></div>

          <ul className="menu-inner py-1">
            {/* Dashboard */}
            <li className="menu-header small text-uppercase">
              <span className="menu-header-text">Dashboard</span>
            </li>
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

            {/* <li className={`menu-item ${isActive("/Formbuilder") ? "active" : ""}`}>
              <a
                href="/Formbuilder"
                className="menu-link"
                onClick={handleNavigation("/Formbuilder")}
              >
                <i className="menu-icon tf-icons bx bxs-edit"></i>
                <div data-i18n="Analytics">Form Builder</div>
              </a>
            </li> */}

            <li className={`menu-item ${isActive("/Formbuilder") || isActive("/Formbuilder/Formtemplate") ? "active open" : ""}`}>
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons bx bxs-edit"></i>
                <div data-i18n="Account Settings">Form</div>
              </a>
              <ul className="menu-sub">
                <li className={`menu-item ${isActive("/Formbuilder") ? "active" : ""}`}>
                  <a
                    href="/Formbuilder"
                    className="menu-link"
                    onClick={(e) => handleNavigation("/Formbuilder")} // Ensure you handle navigation properly
                  >
                    <div data-i18n="Account">Builder</div>
                  </a>
                </li>
                <li className={`menu-item ${isActive("/Formbuilder/Formtemplate") ? "active" : ""}`}>
                  <a
                    href="/Formbuilder/Formtemplate"
                    className="menu-link"
                    onClick={(e) => handleNavigation("/Formbuilder/Formtemplate")} // Ensure you handle navigation properly
                  >
                    <div data-i18n="Account">Templates</div>
                  </a>
                </li>
              </ul>
            </li>

            <li className="menu-header small text-uppercase">
              <span className="menu-header-text">Settings</span>
            </li>

            {/* Users */}
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
            </li>
          </ul>
        </aside>
        </>
    );
}
