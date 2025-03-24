'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Pusher from "pusher-js";
import "react-toastify/dist/ReactToastify.css";
import "../assets/vendor/fonts/boxicons.css";
import "../assets/vendor/css/core.css";
import "../assets/vendor/css/theme-default.css";
import "../assets/css/demo.css";
import "../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "../assets/vendor/libs/apex-charts/apex-charts.css";
import Sidebar from '../Components/Admin/Sidebar';
import Navbar from '../Components/Admin/Navbar';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import "./style.css"; // Ensure this file contains the necessary styles
import style from "./Loader.module.css"

export default function Notifications() {
    const [notifications, setNotifications] = useState<{ id: number; message: string; status: string; created_at: string; path: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [showUnread, setShowUnread] = useState(false);
    const [loadingPath, setLoadingPath] = useState<string | null>(null); // Track which notification is loading
    const [showAll, setShowAll] = useState(false); // State to manage showing all notifications

    const fetchNotifications = async () => {
        try {
            const authToken = sessionStorage.getItem("authToken");
            if (authToken) {
                const response = await fetch("http://127.0.0.1:8000/api/activities", {
                    headers: { Authorization: `Bearer ${authToken}` }
                });
                const data = await response.json();
                setNotifications(data);
            }
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications(); // Initial fetch

        // Initialize Pusher
        const pusher = new Pusher('c1693f80d13146933399', {
            cluster: 'ap1',
            encrypted: true,
        });

        const channel = pusher.subscribe('logs');

        channel.bind('AuditLogEvent', (data: any) => {
            console.log("New Notification Received:", data);

            if (!data || !data.message || !data.status) {
                console.error("Invalid notification data received:", data);
                return;
            }

            const formattedData = {
                id: data.id ?? new Date().getTime(),
                message: data.message ?? "No message provided",
                status: data.status ?? "unread",
                created_at: data.created_at ? new Date(data.created_at).toISOString() : new Date().toISOString(),
                path: data.path ?? '/' // Ensure path is included
            };

            setNotifications(prev => [formattedData, ...prev]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);

    const formatDate = (dateString: string) => {
        const now = new Date();
        const timeDiff = now.getTime() - new Date(dateString).getTime();
        const seconds = Math.floor(timeDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
        if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
        if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
        if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;
        return `${Math.floor(days / 30)} month${Math.floor(days / 30) === 1 ? '' : 's'} ago`;
    };

    const router = useRouter();
    
    const handleNotificationClick = async (path: string) => {
        setLoadingPath(path); // Set loading state for the clicked notification
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading delay
        router.push(path); // Redirect to the notification path
    };

    const filteredNotifications = showUnread
        ? notifications.filter(notification => notification.status === 'unread')
        : notifications;

    // Limit the number of notifications displayed
        // Limit the number of notifications displayed
        const displayedNotifications = showAll ? filteredNotifications : filteredNotifications.slice(0, 10);

        return (
            <>
                <Script src="/assets/vendor/js/helpers.js" strategy="afterInteractive" />
                <Script src="/assets/js/config.js" strategy="afterInteractive" />
                <Script src="/assets/vendor/libs/jquery/jquery.js" strategy="afterInteractive" />
                <Script src="/assets/vendor/libs/popper/popper.js" strategy="afterInteractive" />
                <Script src="/assets/vendor/js/bootstrap.js" strategy="afterInteractive" />
                <Script src="/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js" strategy="afterInteractive" />
                <Script src="/assets/vendor/js/menu.js" strategy="afterInteractive" />
                <Script src="/assets/vendor/libs/apex-charts/apexcharts.js" strategy="afterInteractive" />
                <Script src="/assets/js/main.js" strategy="afterInteractive" />
                <Script src="/assets/js/dashboards-analytics.js" strategy="afterInteractive" />
    
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
                        rel="stylesheet"
                    />
                    <script src="https://buttons.github.io/buttons.js" async defer></script>
                </Head>
    
                <div className="layout-wrapper layout-content-navbar light-style layout-menu-fixed layout-navbar-fixed">
                    <div className="layout-container">
                        <Sidebar />
                        <div className="layout-page">
                            <Navbar />
                            <div className="content-wrapper">
                                <div className="container-xxl flex-grow-1 container-p-y">
                                    <div className="divider">
                                        <div className="divider-text">
                                            <h4 className="text-3xl font-semibold text-right text-green-600 mb-6">📝 Audit Logs</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="col-12">
                                                <div className="card">
                                                    <div className="card-body" style={{ height: 'auto'}}>
                                                        <div className="mb-4">
                                                            <button
                                                                className={`btn ${showUnread ? 'btn-primary' : 'btn-secondary'}`}
                                                                onClick={() => setShowUnread(!showUnread)}
                                                            >
                                                                {showUnread ? 'Show All' : 'Show Unread'}
                                                            </button>
                                                        </div>
                                                        {loading ? (
                                                        <div className="loader">
                                                            <div className={`${style.spinner} ms-3`}>
                                                                <div></div>
                                                                <div></div>
                                                                <div></div>
                                                                <div></div>
                                                                <div></div>
                                                                <div></div>
                                                            </div>
                                                        </div>
                                                        ) : (
                                                        <div className="log-list">
                                                            {displayedNotifications.length === 0 ? (
                                                                <p>No notifications available.</p>
                                                            ) : (
                                                                displayedNotifications.map(notification => (
                                                                <div
                                                                    key={notification.id}
                                                                    className={`log-item ${notification.status === 'unread' ? 'unread' : ''}`}
                                                                    onClick={() => handleNotificationClick(notification.path)}
                                                                >
                                                                    <div className="log-content">
                                                                        <p>{notification.message}</p>
                                                                        <small>{formatDate(notification.created_at)}</small>
                                                                    </div>
                                                                    <div className="open-button-container">
                                                                        <div className="open-button">
                                                                            <div className="sign">
                                                                                <img src="/img/svg/dark-exit-svgrepo-com.svg" alt="Exit Icon" />
                                                                            </div>
                                                                        </div>
                                                                        <span className="ripple"></span>
                                                                    </div>
                                                                </div>
                                                                ))
                                                            )}
                                                        </div>
                                                        )}
                                                        {/* Button to show more notifications */}
                                                        {!showAll && filteredNotifications.length > 10 && (
                                                            <div className="text-center mt-4">
                                                                <button
                                                                    className="btn btn-secondary"
                                                                    onClick={() => setShowAll(true)}
                                                                >
                                                                    See Previous Logs
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="layout-overlay layout-menu-toggle"></div>
                </div>
            </>
        );
    }