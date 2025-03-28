'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./Loader.module.css";
import style1 from "./Checkmark.module.css";
import Tooltip from "./Tooltip.module.css";
import "./image.css";

import "../assets/vendor/fonts/boxicons.css";
import "../assets/vendor/css/core.css";
import "../assets/vendor/css/theme-default.css";
import "../assets/css/demo.css";
import "../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "../assets/vendor/libs/apex-charts/apex-charts.css";
import Sidebar from '../Components/Admin/Sidebar';
import Navbar from '../Components/Admin/Navbar';
import ValidateAdmin from '../Components/Admin/ValidateAdmin';

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
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [updatedUsername, setUpdatedUsername] = useState('');
    const [updatedFullname, setUpdatedFullname] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: 'username', direction: 'ascending' });

    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [selectedUserCheck, setSelectedUserCheck] = useState<User | null>(null);
    const [permittedRoutes, setPermittedRoutes] = useState<string[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 4;

    // ✅ Ensure users is properly referenced inside the component
    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.usertype.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const handleUserClick = (user: User) => {
        setSelectedUser(user);
    };

    
    useEffect(() => {
        // Fetch users data from API
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users`); // Update API URL if needed
                const data = await response.json();
                setUsers(data); // Store user data in state
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);



    const handleEdit = (user: User) => {
        setEditingUser(user);
        setUpdatedUsername(user.username);
        setUpdatedFullname(user.fullname);
        setUpdatedEmail(user.email);
    };
    

    const handleUpdate = async () => {
        if (!editingUser) return;
    
        setLoading(true); // Start loading
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}update/${editingUser.id}`, {
                username: updatedUsername,
                fullname: updatedFullname,
                email: updatedEmail
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
    
            if (response.status === 200) {
                const updatedUser = response.data;
                setUsers(users.map(user => user.id === editingUser.id ? updatedUser : user));
                setEditingUser(null); // Close edit mode
            }
            toast.success("You've successfully updated a record!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        } catch (error) {
            console.error('Error updating user:', error.response?.data || error.message);
        } finally {
            setLoading(false); // Stop loading
        }
    };
    

    // Delete a user
    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this user?')) return;
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}users/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            setUsers(users.filter(user => user.id !== id)); // Remove user from UI
            toast.error("You've successfully deleted a record", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
              });
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleToggleStatus = async (user: User) => {
        try {
            // Determine new status
            const newStatus = user.status === "Allowed" ? "Blocked" : "Allowed";

            if(newStatus === "Allowed"){
                toast.success("You've allowed the user", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                  });
            } else {
                toast.error("You've blocked the user", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                  });
            }
    
            // Update status in the database
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}users/${user.id}/status`, {
                status: newStatus
            });
    
            // Update state
            setUsers(users.map(u => 
                u.id === user.id ? { ...u, status: newStatus } : u
            ));
            
            // Update selected user (if modal is open)
            if (selectedUser?.id === user.id) {
                setSelectedUser({ ...selectedUser, status: newStatus });
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };



    const availableRoutes = [
        { id: "perm1", path: "/Userface/Dashboard", label: "Dashboard" },
        { id: "perm2", path: "/Userface/Table", label: "Table" },
        { id: "perm3", path: "/Userface/Form", label: "Form" },
        { id: "perm4", path: "/Userface/User", label: "User" },
        { id: "perm5", path: "/Userface/Profile", label: "Profile" },
    ];
    
    // Handle user permission click
    const handlePermission = async (userId: number) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users/${userId}/permissions`);
            const data = await response.json();
            
            if (data) {
                setSelectedUserCheck(userId);
                
                // Ensure correct JSON parsing
                const routes = typeof data.permitted_route === "string"
                    ? JSON.parse(data.permitted_route)  // Parse only if it's a string
                    : data.permitted_route;
    
                setPermittedRoutes(Array.isArray(routes) ? routes : []);
            }
        } catch (error) {
            console.error("Error fetching user permissions:", error);
        }
    };


    
    
    // Handle checkbox change
    const togglePermission = (path: string) => {
        setPermittedRoutes((prev) =>
            prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
        );
    };
    
    // Save updated permissions
    const savePermissions = async () => {
        if (!selectedUserCheck) return;
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}users/${selectedUserCheck}/updatePermissions`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ permitted_route: permittedRoutes }) // Don't double stringify
            });
            setSaving(true);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API request
            setSaving(false);
            setSelectedUserCheck(null); // Reset highlight after saving
            setPermittedRoutes([]);
            toast.success("Permission Updated Successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
              });
        } catch (error) {
            console.error("Error updating permissions:", error);
        }
    };


    const handleAdminValidationSuccess = () => {
        // Logic to execute after successful admin validation
        console.log("Admin validated successfully.");
    };

    




    

        // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const sortedUsers = React.useMemo(() => {
        let sortableUsers = [...currentUsers];
        if (sortConfig !== null) {
            sortableUsers.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableUsers;
    }, [currentUsers, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

  
  const router = useRouter(); // ✅ Move useRouter() here
  useEffect(() => {
    // Reinitialize or load any JS libraries after navigation
    if (typeof window !== 'undefined') {
      // Example: Reinitialize Bootstrap or other JS libraries
    }
  }, []);

  return (
    <>
    <ValidateAdmin onSuccess={handleAdminValidationSuccess} />
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
                <div className="row">
                    <div className="col-lg-12 mb-4 order-0">
                        <div className="card">
                            <div className="d-flex align-items-end row">
                                <div className="col-sm-12">
                                    <div className="card-body">
                                        <h5 className="card-title">Users List</h5>
                                        <div className="mb-3">
                                            {/* ✅ Search Input */}
                                            <input
                                                type="text"
                                                className="form-control mb-3"
                                                placeholder="Search users..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>

                                        <div className="table-responsive">
                                            <table className="table data-table">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "5%" }}>Image</th>
                                                    <th style={{ width: "11%" }} onClick={() => requestSort('username')}>Username</th>
                                                    <th style={{ width: "18%" }} onClick={() => requestSort('fullname')}>Fullname</th>
                                                    <th style={{ width: "21%" }} onClick={() => requestSort('email')}>Email</th>
                                                    <th style={{ width: "10%" }} onClick={() => requestSort('usertype')}>User  Type</th>
                                                    <th style={{ width: "15%" }} onClick={() => requestSort('created_at')}>Created At</th>
                                                    <th style={{ width: "30%", position: 'sticky', right: 0, zIndex: 1 }}>Actions</th>
                                               </tr>
                                            </thead>
                                                <tbody>
                                                    {sortedUsers.length > 0 ? (
                                                        sortedUsers.map((user) => (
                                                            <tr key={user.id} className={selectedUserCheck === user.id ? "table-warning" : ""}>
                                                                <td>
                                                                    {user.profile_image ? (
                                                                        <div className="profile-image-circle">
                                                                        <img 
                                                                            src={`http://127.0.0.1:8000/${user.profile_image}`} 
                                                                            alt="User Image" 
                                                                            width={50} 
                                                                            height={50} 
                                                                            className="profile-image"
                                                                        />
                                                                        </div>
                                                                    ) : (
                                                                        <span>No Image</span>
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {editingUser?.id === user.id ? (
                                                                        <div className="w-100">
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                value={updatedUsername}
                                                                                onChange={(e) => setUpdatedUsername(e.target.value)}
                                                                                style={{ width: "100%" }}
                                                                            />
                                                                        </div>
                                                                    ) : (
                                                                        user.username
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {editingUser?.id === user.id ? (
                                                                        <div className="w-100">
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                value={updatedFullname}
                                                                                onChange={(e) => setUpdatedFullname(e.target.value)}
                                                                                style={{ width: "100%" }}
                                                                            />
                                                                        </div>
                                                                    ) : (
                                                                        user.fullname
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {editingUser?.id === user.id ? (
                                                                        <div className="w-100">
                                                                            <input
                                                                                type="email"
                                                                                className="form-control"
                                                                                value={updatedEmail}
                                                                                onChange={(e) => setUpdatedEmail(e.target.value)}
                                                                                style={{ width: "100%" }}
                                                                            />
                                                                        </div>
                                                                    ) : (
                                                                        user.email
                                                                    )}
                                                                </td>
                                                                <td>{user.usertype}</td>
                                                                <td>{new Date(user.created_at).toLocaleString()}</td>
                                                                <td style={{ position: 'sticky', right: 0, zIndex: 1 }}>
                                                                    {editingUser?.id === user.id ? (
                                                                        <>
                                                                            <div className="d-flex align-items-center"> {/* Flex container for proper alignment */}
                                                                                <button 
                                                                                    className="btn btn-sm btn-success me-2" 
                                                                                    onClick={handleUpdate} 
                                                                                    disabled={loading} // Disable while loading
                                                                                >
                                                                                    {loading ? "Saving..." : "Save"}
                                                                                </button>
                                                                                
                                                                                <button className="btn btn-sm btn-secondary" onClick={() => setEditingUser(null)} disabled={loading}>
                                                                                    Cancel
                                                                                </button>

                                                                                {loading && (
                                                                                    <div className={`${style.spinner} ms-3`}> {/* Add left margin */}
                                                                                        <div></div>
                                                                                        <div></div>
                                                                                        <div></div>
                                                                                        <div></div>
                                                                                        <div></div>
                                                                                        <div></div>
                                                                                    </div>
                                                                                )} 
                                                                            </div>
                                                                        </>
                                                                    ) : (
                                                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                                            <div className={Tooltip.tooltip}>
                                                                                <button className="btn btn-sm btn-primary me-2" onClick={() => handleUserClick(user)}><i className='bx bx-info-circle'></i></button>
                                                                                <div className={Tooltip.tooltiptext}>Show</div>
                                                                            </div>
                                                                            <div className={Tooltip.tooltip}>
                                                                                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(user)}><i className='bx bx-edit'></i></button>
                                                                                <div className={Tooltip.tooltiptext}>Edit</div>
                                                                            </div>
                                                                            <div className={Tooltip.tooltip}>
                                                                                <button className="btn btn-sm btn-danger me-2" onClick={() => handleDelete(user.id)}><i className='bx bx-trash' ></i></button>
                                                                                <div className={Tooltip.tooltiptext}>Delete</div>
                                                                            </div>
                                                                            <div className={Tooltip.tooltip}>
                                                                                <button className="btn btn-sm btn-success" onClick={() => handlePermission(user.id)}><i className='bx bx-check-square'></i></button>
                                                                                <div className={Tooltip.tooltiptext}>Permit</div>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan={6} className="text-center">No users found</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <nav>
                                        <ul className="pagination justify-content-center">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => paginate(currentPage - 1)}>&laquo;</button>
                                        </li>
                                        {Array.from({ length: totalPages }, (_, index) => (
                                            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                            <button className="page-link" onClick={() => paginate(index + 1)}>
                                                {index + 1}
                                            </button>
                                            </li>
                                        ))}
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => paginate(currentPage + 1)}>&raquo;</button>
                                        </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-lg-12 mb-4 order-0">
                        <div className="card shadow-sm p-4">
                            <div className="card-body">
                                <h4 className="mb-3 fw-bold">User Permission</h4>
                                <hr className="mb-3" />
                                <div className="row">
                                    {/* Permission Checkboxes */}
                                    {availableRoutes.map((route, index) => (
                                        <div className="col-md-6 mb-2" key={index}>
                                            <div className="form-check d-flex align-items-center">
                                                <input
                                                    className="form-check-input me-2 checkbox-effect"
                                                    type="checkbox"
                                                    id={route.id}
                                                    checked={permittedRoutes.includes(route.path)}
                                                    onChange={() => togglePermission(route.path)}
                                                />
                                                <label className="checkmark block" htmlFor={route.id}>
                                                    <span 
                                                        style={{
                                                            textTransform: "uppercase",
                                                            fontWeight: "bold",
                                                            color: "#0d6efd", // Bootstrap Primary Color (Blue)
                                                            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)"
                                                        }}
                                                    >
                                                        {route.label}
                                                    </span>
                                                    <br />
                                                    <span style={{ fontSize: "0.875rem", color: "#6c757d" }}>({route.path})</span>
                                                </label>

                                            </div>
                                        </div>
                                    ))}
                                    {/* Save Button */}
                                    <div className="col-md-6 mt-3">
                                    <button className="btn btn-primary w-100 rounded-pill shadow-sm fw-bold" onClick={savePermissions} disabled={saving}>
                                        {saving ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span> Saving...
                                            </>
                                        ) : (
                                            "Save Changes"
                                        )}
                                    </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <style jsx>{`
                        .checkbox-effect {
                            transition: transform 0.2s ease-in-out;
                        }
                        .checkbox-effect:checked {
                            transform: scale(1.2);
                        }
                        .btn-primary {
                            background-color: #007bff;
                            border-color: #007bff;
                        }
                        .btn-primary:hover {
                            background-color: #0056b3;
                            border-color: #0056b3;
                        }
                    `}</style>


                </div>
            </div>
        </div>


          {/* / Navbar */}

          {/* Content wrapper */}

          {/* Content wrapper */}
        </div>
        {/* / Layout page */}
      </div>

      {/* Overlay */}
      {selectedUser  && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                <button type="button" className="btn-close" onClick={() => setSelectedUser (null)}></button>
                </div>
                <div className="divider" style={{ marginTop: '-10px', marginBottom: '-10px' }}>
                <div className="divider-text">
                    <h4 className="text-3xl font-semibold text-right text-green-600 mb-6">📄 User Information</h4>
                </div>
                </div>
                <div className="modal-body d-flex flex-column flex-md-row"> {/* Use flex-column for mobile and flex-md-row for larger screens */}
                {/* Image Container */}
                <div className="me-3 d-flex justify-content-center align-items-center mb-3 mb-md-0"> {/* Add margin for mobile spacing */}
                    <div className="profile-image-circle" style={{ width: '150px', height: '150px'}}>
                    <img 
                        src={`http://127.0.0.1:8000/${selectedUser.profile_image}`} 
                        alt="User Image" 
                        width={50} 
                        height={50} 
                        className="profile-image"
                    />
                    </div>
                </div>
                {/* Info Container */}
                <div className="flex-grow-1">
                    <div className="d-flex justify-content-between">
                    <p className="mb-0"><strong>ID:</strong></p>
                    <p className="mb-0">{selectedUser.id}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                    <p className="mb-0"><strong>Username:</strong></p>
                    <p className="mb-0">{selectedUser.username}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                    <p className="mb-0"><strong>Email:</strong></p>
                    <p className="mb-0">{selectedUser.email}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                    <p className="mb-0"><strong>User Type:</strong></p>
                    <p className="mb-0">{selectedUser.usertype}</p>
                    </div>
                    {/* <div className="d-flex justify-content-between">
                    <p className="mb-0"><strong>Created At:</strong></p>
                    <p className="mb-0">{new Date(selectedUser.created_at).toLocaleString()}</p>
                    </div> */}
                    <div className="d-flex justify-content-between">
                    <p className="mb-0"><strong>Status:</strong></p>
                    <p className="mb-0">{selectedUser.status}</p>
                    </div>
                    <div className="mt-3 d-flex justify-content-between">
                    <strong>Action:</strong>
                    <button 
                        className={`btn ${selectedUser ?.status === "Allowed" ? "btn-danger" : "btn-success"}`}
                        onClick={() => selectedUser  && handleToggleStatus(selectedUser )}
                    >
                        {selectedUser ?.status === "Allowed" ? "Block" : "Allow"}
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        )}
        <div className="layout-overlay layout-menu-toggle"></div>
    </div>
    </>
  );
}
