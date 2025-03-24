'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./Loader.module.css";

import "../assets/vendor/fonts/boxicons.css";
import "../assets/vendor/css/core.css";
import "../assets/vendor/css/theme-default.css";
import "../assets/css/demo.css";
import "../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "../assets/vendor/libs/apex-charts/apex-charts.css";
import Sidebar from '../Components/Admin/Sidebar';
import Navbar from '../Components/Admin/Navbar';

import Script from 'next/script';

interface User {
    id: number;
    username: string;
    fullname: string;
    email: string;
    usertype: string;
    status: string;
    created_at: string;
    updated_at: string;
    profile_image: string; // Add this field
}

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedUserType, setSelectedUserType] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('');

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 7;

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.usertype.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const fetchUsers = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/filteredUsers?userType=${selectedUserType}&status=${selectedStatus}&search=${searchTerm}`);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [selectedUserType, selectedStatus, searchTerm]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/allUsers');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const indexOfLastUser  = currentPage * usersPerPage;
    const indexOfFirstUser  = indexOfLastUser  - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser , indexOfLastUser );
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const exportData = async (type: string, openInNewTab = false) => {
        try {
            const queryParams = new URLSearchParams();
            if (selectedUserType) queryParams.append("usertype", selectedUserType);
            if (selectedStatus) queryParams.append("status", selectedStatus);
    
            const response = await fetch(`http://127.0.0.1:8000/api/export-users?${queryParams.toString()}&type=${type}`, {
                method: "GET",
            });
    
            if (!response.ok) {
                throw new Error(`Failed to generate ${type.toUpperCase()}`);
            }
    
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
    
            if (openInNewTab) {
                window.open(url, "_blank");
            } else {
                const a = document.createElement("a");
                a.href = url;
                a.download = type === "pdf" ? "users.pdf" : "users.csv";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }

            // Show success toast
            toast.success(`${type.toUpperCase()} export initiated successfully!`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        } catch (error) {
            console.error(`Error exporting ${type} data:`, error);

            // Show error toast
            toast.error(`Failed to generate ${type.toUpperCase()}. Please try again.`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        }
    };

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
                strategy="afterInteractive"
            />
            <Script src="/assets/js/config.js" strategy="afterInteractive" />
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
                src="/assets/js/main.js"
                strategy="afterInteractive"
            />
            <Script
                src="/assets/js/dashboards-analytics.js"
                strategy="afterInteractive"
            />
            <div className="layout-wrapper layout-content-navbar light-style layout-menu-fixed layout-navbar-fixed">
                <div className="layout-container">
                    <Sidebar />
                    <div className="layout-page">
                        <Navbar />
                        <div className="content-wrapper">
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <div className="row">
                                    <div className="col-lg-12 mb-4 order-0">
                                        <div className="card">
                                            <div className="d-flex align-items-end row">
                                                <div className="col-sm-12">
                                                    <div className="card-body">
                                                        <h5 className="card-title">Users List</h5>
                                                        <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                                                            <input
                                                                type="text"
                                                                className="form-control flex-grow-1"
                                                                placeholder="Search users..."
                                                                value={searchTerm}
                                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                            />

                                                            {/* User Type Filter */}
                                                            <select
                                                                className="form-select"
                                                                value={selectedUserType}
                                                                onChange={(e) => setSelectedUserType(e.target.value)}
                                                                style={{ width: '500px'}}
                                                            >
                                                                <option value="">All Types</option>
                                                                <option value="admin">Admin</option>
                                                                <option value="user">User </option>
                                                            </select>

                                                            {/* Status Filter */}
                                                            <select
                                                                className="form-select"
                                                                value={selectedStatus}
                                                                onChange={(e) => setSelectedStatus(e.target.value)}
                                                                style={{ width: '500px'}}
                                                            >
                                                                <option value="">All Status</option>
                                                                <option value="pending">Pending</option>
                                                                <option value="allowed">Allowed</option>
                                                                <option value="blocked">Blocked</option>
                                                            </select>

                                                            {/* Export Buttons */}
                                                            <div className="ms-auto d-flex flex-wrap gap-2">
                                                                <button className="btn btn-outline-success" onClick={() => exportData("pdf", true)}>
                                                                    <i className="bx bx-export"></i> Open
                                                                </button>
                                                                <button className="btn btn-outline-danger" onClick={() => exportData("pdf")}>
                                                                    <i className="bx bxs-file-pdf"></i> PDF
                                                                </button>
                                                                <button className="btn btn-outline-primary" onClick={() => exportData("csv")}>
                                                                    <i className="bx bx-file"></i> CSV
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="table-responsive">
                                                            <table className="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th style={{ width: "5%" }}>Image</th>
                                                                        <th style={{ width: "11%" }}>Username</th>
                                                                        <th style={{ width: "18%" }}>Fullname</th>
                                                                        <th style={{ width: "21%" }}>Email</th>
                                                                        <th style={{ width: "5%" }}>User  Type</th>
                                                                        <th style={{ width: "5%" }}>Status</th>
                                                                        <th style={{ width: "15%" }}>Created At</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {currentUsers.length > 0 ? (
                                                                        currentUsers.map((user) => (
                                                                            <tr key={user.id}>
                                                                                <td>
                                                                                    {user.profile_image ? (
                                                                                        <Image 
                                                                                            src={`http://127.0.0.1:8000/${user.profile_image}`} 
                                                                                            alt="User  Image" 
                                                                                            width={50} 
                                                                                            height={50} 
                                                                                            className="rounded-circle"
                                                                                        />
                                                                                    ) : (
                                                                                        <span>No Image</span>
                                                                                    )}
                                                                                </td>   
                                                                                <td>{user.username}</td>
                                                                                <td>{user.fullname}</td>
                                                                                <td>{user.email}</td>
                                                                                <td>{user.usertype}</td>
                                                                                <td>
                                                                                    <span
                                                                                        className={`badge
                                                                                            ${
                                                                                                user.status === "pending"
                                                                                                    ? "bg-label-warning me-10"
                                                                                                    : user.status === "Allowed"
                                                                                                    ? "bg-label-success me-10"
                                                                                                    : user.status === "Blocked"
                                                                                                    ? "bg-label-danger me-10"
                                                                                                    : "bg-label-secondary me-10"
                                                                                            }`}
                                                                                    >
                                                                                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                                                                    </span>
                                                                                </td>
                                                                                <td>{new Date(user.created_at).toLocaleString()}</td>
                                                                            </tr>
                                                                        ))
                                                                    ) : (
                                                                        <tr>
                                                                            <td colSpan={7} className="text-center">No users found</td>
                                                                        </tr>
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <nav>
                                                        <ul className="pagination justify-content-center">
                                                            {Array.from({ length: totalPages }, (_, index) => (
                                                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                                                    <button onClick={() => paginate(index + 1)} className="page-link">
                                                                        {index + 1}
                                                                    </button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </nav>
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