'use client';

<<<<<<< Updated upstream
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";
=======
import React, { useEffect, useState, useRef  } from 'react';
import { useRouter } from "next/navigation";
import { FaMoon, FaSun } from 'react-icons/fa';
import axios from "axios";
import './style.css';
import styles from './Button.module.css'; // Import the CSS module
import Pusher from 'pusher-js';
import "@/app/assets/css/dark-mode.css";
>>>>>>> Stashed changes

export default function Navbar() {
    const router = useRouter();
    const [user, setUser] = useState({ username: "", email: "", profile_image: "" });
    const [loading, setLoading] = useState(true);
<<<<<<< Updated upstream

    // Fetch user data on component mount
=======
    const [notifications, setNotifications] = useState<{ id: number; message: string; status: string }[]>([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const drawerRef = useRef<HTMLDivElement>(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    const toggleDarkMode = () => {
        setIsDarkMode(prev => {
            const newMode = !prev;
            sessionStorage.setItem("darkMode", newMode.toString());
            if (newMode) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
            return newMode;
        });
    };

    // Function to fetch notifications
>>>>>>> Stashed changes
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const authToken = sessionStorage.getItem("authToken");
                if (authToken) {
                    const response = await axios.get("http://127.0.0.1:8000/api/user", {
                        headers: { Authorization: `Bearer ${authToken}` }
                    });
                    setUser({
                        username: response.data.username,
                        email: response.data.email,
                        profile_image: response.data.profile_image
                    });
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            } finally {
                setLoading(false);
            }
        };

<<<<<<< Updated upstream
        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            // Call Laravel logout API (if required)
            await axios.post("http://127.0.0.1:8000/api/logout", {}, {
                headers: { Authorization: `Bearer ${sessionStorage.getItem("authToken")}` }
            });

            // Remove the auth token
            sessionStorage.removeItem("authToken");

            // Redirect to Login page
=======
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

        fetchUserData();
        fetchNotifications(); // Initial fetch

        // Check for dark mode preference
        const darkModePreference = sessionStorage.getItem("darkMode");
        if (darkModePreference === "true") {
            setIsDarkMode(true);
            document.body.classList.add('dark-mode');
        }


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

    const markAsRead = async (id: number) => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/notifications/${id}/read`, {}, {
                headers: { Authorization: `Bearer ${sessionStorage.getItem("authToken")}` }
            });
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, status: "read" } : n));
        } catch (error) {
            console.error("Failed to update notification status:", error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await axios.put("http://127.0.0.1:8000/api/notifications/read-all", {}, {
                headers: { Authorization: `Bearer ${sessionStorage.getItem("authToken")}` }
            });
            setNotifications(prev => prev.map(n => ({ ...n, status: "read" })));
        } catch (error) {
            console.error("Failed to mark all notifications as read:", error);
        }
    };

    const formatTimeAgo = (timestamp) => {
        const now = new Date();
        const timeDiff = now - new Date(timestamp); // Difference in milliseconds
    
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
    

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        };

        if (showNotifications) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showNotifications]);

    const handleLogout = async () => {
        try {
            await axios.post("http://127.0.0.1:8000/api/logout", {}, {
                headers: { Authorization: `Bearer ${sessionStorage.getItem("authToken")}` }
            });
            sessionStorage.removeItem("authToken");
>>>>>>> Stashed changes
            router.push("/Login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
<<<<<<< Updated upstream
        <>
            <nav
                className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
                id="layout-navbar"
            >
                <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                    <a className="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                        <i className="bx bx-menu bx-sm"></i>
                    </a>
                </div>

                <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                    <div className="navbar-nav align-items-center">
                        <div className="nav-item d-flex align-items-center">
                            <i className="bx bx-search fs-4 lh-0"></i>
                            <input
                                type="text"
                                className="form-control border-0 shadow-none"
                                placeholder="Search..."
                                aria-label="Search..."
                            />
                        </div>
                    </div>

                    <ul className="navbar-nav flex-row align-items-center ms-auto">
                        <li className="nav-item lh-1 me-3">
                            <a
                                className="github-button"
                                href="https://github.com/themeselection/sneat-html-admin-template-free"
                                data-icon="octicon-star"
                                data-size="large"
                                data-show-count="true"
                                aria-label="Star themeselection/sneat-html-admin-template-free on GitHub"
                            >
                                Star
                            </a>
                        </li>

                        {/* User */}
                        <li className="nav-item navbar-dropdown dropdown-user dropdown">
                            <a className="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                                <div className="avatar avatar-online">
                                    <img 
                                        src={`http://127.0.0.1:8000/${user.profile_image}` ? `http://127.0.0.1:8000/${user.profile_image}` : "../assets/img/avatars/1.png"} 
                                        alt="User Avatar" 
                                        className="w-px-40 h-auto rounded-circle" 
                                    />
                                </div>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 me-3">
                                                <div className="avatar avatar-online">
                                                    <img 
                                                        src={`http://127.0.0.1:8000/${user.profile_image}` ? `http://127.0.0.1:8000/${user.profile_image}` : "../assets/img/avatars/1.png"} 
                                                        alt="User Avatar" 
                                                        className="w-px-40 h-auto rounded-circle" 
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                {loading ? (
                                                    <span className="fw-semibold d-block">Loading...</span>
                                                ) : (
                                                    <>
                                                        <span className="fw-semibold d-block">{user.username}</span>
                                                        <small className="text-muted">{user.email}</small>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <div className="dropdown-divider"></div>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <i className="bx bx-user me-2"></i>
                                        <span className="align-middle">My Profile</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <i className="bx bx-cog me-2"></i>
                                        <span className="align-middle">Settings</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <span className="d-flex align-items-center align-middle">
                                            <i className="flex-shrink-0 bx bx-credit-card me-2"></i>
                                            <span className="flex-grow-1 align-middle">Billing</span>
                                            <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <div className="dropdown-divider"></div>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={handleLogout}>
                                        <i className="bx bx-power-off me-2"></i>
                                        <span className="align-middle">Log Out</span>
                                    </button>
                                </li>
                            </ul>
                        </li>
                        {/*/ User */}
                    </ul>
                </div>
            </nav>
        </>
=======
        <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar" style={{ position: 'sticky', width: '100%'}}>
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                <a className="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                    <i className="bx bx-menu bx-sm"></i>
                </a>
            </div>
            <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                <ul className="navbar-nav flex-row align-items-center ms-auto gap-2">
                <li className="nav-item">
                        <button 
                            onClick={toggleDarkMode} 
                            className="dark-mode-toggle"
                        >
                            {/* Conditionally render moon or sun icon */}
                            {isDarkMode ? (
                                <FaSun size={20} color="yellow" /> // Sun icon for light mode
                            ) : (
                                <FaMoon size={20} color="gray" /> // Moon icon for dark mode
                            )}
                        </button>
                    </li>
                    <li className="nav-item dropdown" ref={drawerRef}>
                        <a className="nav-link position-relative" href="#" onClick={() => setShowNotifications(!showNotifications)}>
                            <i className="bx bx-bell fs-4"></i>
                            {notifications.some(n => n.status === "unread") && (
                                <span className="badge badge-center rounded-pill bg-danger w-px-20 h-px-20">
                                    {notifications.filter(n => n.status === "unread").length}
                                </span>
                            )}
                        </a>
                        {showNotifications && (
                            <div className="notification-drawer card shadow-sm p-3">
                                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                                    <h6 className="mb-0" style={{ color : 'white'}}>Notifications</h6>
                                    <a href="/Notifications">
                                        <button>See all</button>
                                    </a>
                                    <button className={styles.button} onClick={markAllAsRead}>Mark All as Read</button>
                                    {/* <button className="btn btn-sm btn-light" onClick={markAllAsRead}>Mark All as Read</button> */}
                                </div>
                                <div className="card-body p-2" style={{ 
                                    maxHeight: '300px', 
                                    overflowY: 'auto', 
                                    scrollbarWidth: 'thin', /* For Firefox */
                                    scrollbarColor: '#888 #f1f1f1', /* For Firefox */
                                }}>
                                    <h6 className="text-muted text-center">Unread Notifications</h6>
                                    <div className="border-bottom mb-2"></div>
                                    {notifications.filter(n => n.status === "unread").length > 0 ? (
                                        notifications.filter(n => n.status === "unread").map((notif) => (
                                            <div key={notif.id} className="notification-item p-2 border-bottom d-flex align-items-center justify-content-between" onClick={() => markAsRead(notif.id)}>
                                                <div className="d-flex align-items-center">
                                                    <i className="bx bx-info-circle me-2 text-primary"></i>
                                                    <span>{notif.message}</span>
                                                </div>
                                                
                                                {/* Wrapper container to isolate dot size */}
                                                <div className="dot-container" style={{ width: '15px', height: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <span className="dot bg-primary rounded-circle" style={{ width: '10px', height: '10px' }}></span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-muted p-2">No unread notifications</p>
                                    )}
                                    <h6 className="text-muted text-center mt-3">All Notifications</h6>
                                    <div className="border-bottom mb-2"></div>
                                    {notifications.length > 0 ? (
                                        notifications.map((notif) => (
                                            <div key={notif.id} className="notification-item p-2 border-bottom d-flex align-items-center justify-content-between" onClick={() => markAsRead(notif.id)}>
                                                <div className="d-flex align-items-center">
                                                    <i className="bx bx-info-circle me-2 text-primary"></i>
                                                    <span>{notif.message}</span>
                                                </div>

                                                {/* Wrapper container for the dot to ensure fixed size and isolation */}
                                                {notif.status === "unread" && (
                                                    <div className="dot-container" style={{ width: '15px', height: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <span className="dot bg-primary rounded-circle" style={{ width: '10px', height: '10px' }}></span>
                                                    </div>
                                                )}

                                                {/* Display the time ago */}
                                                <small className="text-muted">{formatTimeAgo(notif.created_at)}</small>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-muted p-2">No notifications</p>
                                    )}

                                </div>
                            </div>
                        )}
                    </li>

                    <li className="nav-item navbar-dropdown dropdown-user dropdown">
                        <a className="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                            <div className="avatar avatar-online">
                                <img 
                                    src={`http://127.0.0.1:8000/${user.profile_image}` ? `http://127.0.0.1:8000/${user.profile_image}` : "../assets/img/avatars/1.png"} 
                                    alt="User Avatar" 
                                    className="w-px-40 h-auto rounded-circle" 
                                />
                            </div>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <a className="dropdown-item" href="#">
                                    <div className="d-flex">
                                        <div className="flex-shrink-0 me-3">
                                            <div className="avatar avatar-online">
                                                <img 
                                                    src={`http://127.0.0.1:8000/${user.profile_image}` ? `http://127.0.0.1:8000/${user.profile_image}` : "../assets/img/avatars/1.png"} 
                                                    alt="User Avatar" 
                                                    className="w-px-40 h-auto rounded-circle" 
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            {loading ? (
                                                <span className="fw-semibold d-block">Loading...</span>
                                            ) : (
                                                <>
                                                    <span className="fw-semibold d-block">{user.username}</span>
                                                    <small className="text-muted">{user.email}</small>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <div className="dropdown-divider"></div>
                            </li>
                            <li>
                                <a className="dropdown-item" href="/Profile">
                                    <i className="bx bx-user me-2"></i>
                                    <span className="align-middle">My Profile</span>
                                </a>
                            </li>
                            <li>
                                <div className="dropdown-divider"></div>
                            </li>
                            <li>
                                <button className="dropdown-item" onClick={handleLogout}>
                                    <i className="bx bx-power-off me-2"></i>
                                    <span className="align-middle">Log Out</span>
                                </button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
>>>>>>> Stashed changes
    );
}
