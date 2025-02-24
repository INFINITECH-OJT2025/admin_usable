'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Navbar() {
    const router = useRouter();
    const [user, setUser] = useState({ username: "", email: "", profile_image: "" });
    const [loading, setLoading] = useState(true);

    // Fetch user data on component mount
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
            router.push("/Login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
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
    );
}
