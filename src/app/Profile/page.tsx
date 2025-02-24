'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
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

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  fullname: yup.string().required("Fullname is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function Profile() {
    const [admins, setAdmins] = useState([]);
    const [user, setUser] = useState({ id:"", username: "", fullname: "", email: "", profile_image: "", usertype: "", created_at: "", updated_at: "" });
    const [showModal, setShowModal] = useState(false);  // State for controlling modal visibility
    const [newAdmin, setNewAdmin] = useState({ username: "", email: "", dob: "" });
    const [selectedAdminId, setSelectedAdminId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 4;
    
    const [isEditing, setIsEditing] = useState(false);
    const [newFullname, setNewFullname] = useState(user.fullname);
    const [newUsername, setNewUsername] = useState(user.username);
    const [newEmail, setNewEmail] = useState(user.email);
    const [profileImage, setProfileImage] = useState<File | null>(null);

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
    const [csrfToken, setCsrfToken] = useState("");
    const router = useRouter();
    

      const fetchUserData = async () => {
        try {
            const authToken = sessionStorage.getItem("authToken");
            if (authToken) {
                const response = await axios.get("http://127.0.0.1:8000/api/user", {
                    headers: { Authorization: `Bearer ${authToken}` }
                });
                setUser({
                    id: response.data.id,
                    username: response.data.username,
                    fullname: response.data.fullname,
                    email: response.data.email,
                    profile_image: response.data.profile_image,
                    usertype: response.data.usertype,
                    created_at: response.data.created_at,
                    updated_at: response.data.updated_at
                });
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        }
    };


    const fetchAdmins = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/admins");
            setAdmins(response.data);
        } catch (error) {
            console.error("Failed to fetch admin users:", error);
        }
    };
    useEffect(() => {    
        fetchAdmins();
        fetchUserData();
    }, []);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/csrf-cookie", { withCredentials: true })
          .then(() => {
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";
            setCsrfToken(token);
          })
          .catch(() => setMessage("Failed to get CSRF token"));
      }, []);
    
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });
    
      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          const selectedImage = e.target.files[0];
          setImage(selectedImage);
          const previewUrl = URL.createObjectURL(selectedImage);
          setImagePreview(previewUrl); // Set the preview image
        }
      };


      const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          const selectedImage = e.target.files[0];
          setProfileImage(selectedImage); // Store the selected image file
          const previewUrl = URL.createObjectURL(selectedImage);
          setImagePreview(previewUrl); // Set the preview image for displaying
        }
      };
      


    
      const onSubmit = async (data: any) => {
        setLoading(true);
        setMessage(""); // Reset message before request
    
            try {
                const formData = new FormData();
                formData.append("username", data.username);
                formData.append("fullname", data.fullname);
                formData.append("email", data.email);
                formData.append("password", data.password);
                if (image) {
                    formData.append("profile_image", image);
                }
        
                const response = await axios.post(
                    "http://127.0.0.1:8000/api/registerAdmin",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "X-CSRF-TOKEN": csrfToken,
                        },
                        withCredentials: true,
                    }
                );
        
                if (response.status === 201) { // Ensure successful response
                    setMessage("Registration successful! Admin added.");
                } else {
                    setMessage("Registration completed, but unexpected response.");
                }
        
                setShowModal(false);
                fetchUserData();
                fetchAdmins();
            } catch (error: any) {
                setMessage(error.response?.data?.message || "An error occurred.");
            } finally {
                setLoading(false);
            }
        };


        const handleEditClick = () => {
          setNewFullname(user.fullname);
          setNewUsername(user.username);
          setNewEmail(user.email);
          setIsEditing(true);
        };

        const handleCancelClick = () => {
          setIsEditing(false);
          // Reset the fields to the original values
          setNewFullname(user.fullname);
          setNewUsername(user.username);
          setNewEmail(user.email);
        };

        // useEffect(() => {    
        //     handleCancelClick();
        // }, []);
      
        // Handle Save Changes button click
        const handleSaveChanges = async () => {
          setLoading(true);
          try {
            const formData = new FormData();
            // Add text fields (fullname, username, email)
            formData.append("fullname", newFullname);
            formData.append("username", newUsername);
            formData.append("email", newEmail);
            
            // Add profile image if it exists
            if (profileImage) {
              formData.append("profile_image", profileImage); // assuming profileImage is the file object
            }
        
            const response = await axios.post(
              `http://127.0.0.1:8000/api/updateUser/${user.id}`,
              formData,
              { 
                headers: {
                  "Authorization": `Bearer ${sessionStorage.getItem("authToken")}`,
                  "Content-Type": "multipart/form-data", // Important for file uploads
                }
              }
            );
        
            if (response.data.success) {
              setIsEditing(false);
              setMessage("User updated successfully!");
            }
          } catch (error) {
            setMessage("Error updating user.");
          }
          setLoading(false);
          toast.success("Profile updated!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
          handleCancelClick();
          fetchUserData();
          fetchAdmins();
        };
        
    

        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        const currentUsers = admins.slice(indexOfFirstUser, indexOfLastUser);
        const totalPages = Math.ceil(admins.length / usersPerPage);
        
        const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    



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
      <div className="layout-wrapper layout-content-navbar">
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
                  {/* First Card: Profile Image and Basic Info */}
                  <div className="col-lg-4 mb-4">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4 d-flex flex-column align-items-center justify-content-center">
                            {/* Profile Image */}
                            <div className="text-center" style={{ position: 'relative', height: 210, width: 210 }}>
                                {isEditing ? (
                                    // Profile Image Upload
                                    <div className="position-relative d-inline-block">
                                        {/* Existing or Uploaded Image */}
                                        <Image
                                            src={imagePreview || (user.profile_image ? `http://127.0.0.1:8000/${user.profile_image}` : "/assets/img/avatars/1.png")}
                                            alt="Profile Image"
                                            width={210}
                                            height={210}
                                            className="rounded-circle"
                                            style={{
                                                objectFit: "cover",
                                                border: "4px solid #f8f9fa",
                                                position: "relative",
                                            }}
                                        />
                                        {/* Overlay for Half Image Upload Effect */}
                                        <div
                                        className="position-absolute top-0 start-50 w-50 h-100 d-flex align-items-center justify-content-center"
                                        style={{
                                          background: "rgba(255, 255, 255, 0.5)",
                                          borderRadius: "50%",
                                          cursor: "pointer",
                                          position: "relative",
                                          transition: "transform 0.3s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                          const target = e.target as HTMLElement; // Cast to HTMLElement
                                          target.style.transform = "scale(1.2)";
                                        }}
                                        onMouseLeave={(e) => {
                                          const target = e.target as HTMLElement; // Cast to HTMLElement
                                          target.style.transform = "scale(1)";
                                        }}
                                      >
                                        <label htmlFor="profileUpload" className="p-0 m-0">
                                          <i className="bx bx-camera" style={{ fontSize: "36px", color: "#fff" }}></i> {/* Camera Icon */}
                                        </label>
                                        <input
                                          type="file"
                                          id="profileUpload"
                                          className="d-none"
                                          accept="image/*"
                                          onChange={handleImageChange}
                                        />
                                      </div>
                                    </div>
                                ) : (
                                    <Image
                                        src={user.profile_image ? `http://127.0.0.1:8000/${user.profile_image}` : "/assets/img/avatars/1.png"}
                                        alt="Profile Image"
                                        width={210}  // Explicit width
                                        height={210} // Explicit height
                                        className="rounded-circle mb-3"
                                        style={{
                                            objectFit: "cover",
                                            border: "4px solid #f8f9fa",
                                        }}
                                    />
                                )}
                            </div>

                            <h5 className="mb-1 mt-3">{user.fullname}</h5> {/* Added margin-top to keep space */}
                            <p className="text-muted">{user.email}</p>
                        </div>
                    </div>
                </div>




                    {/* Second Card: Full User Information */}
                    <div className="col-lg-8 mb-4">
                      <div className="card shadow-sm border-0">
                        <div className="card-body p-4">
                          <div className="d-flex justify-content-between">
                            <h5 className="mb-2">User Information</h5>
                            {isEditing ? (
                              <div>
                                <button className="btn btn-sm btn-success ml-2" onClick={handleSaveChanges}>
                                  Save Changes
                                </button>
                                <button className="btn btn-sm btn-secondary ml-2" onClick={handleCancelClick}>
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button className="btn btn-sm btn-primary ml-2" onClick={handleEditClick}>
                                Edit
                              </button>
                            )}
                          </div>
                          <hr style={{ border: "1.5px solid" }} />

                          <div className="row mb-3">
                            <div className="col-md-4">
                              <strong>Fullname:</strong>
                            </div>
                            <div className="col-md-8">
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={newFullname}
                                  onChange={(e) => setNewFullname(e.target.value)}
                                  className="form-control"
                                  style={{
                                    width: "300px",
                                    height: "23px", // Fixed width for input
                                    fontSize: "15px", // Adjust font size as needed
                                  }}
                                />
                              ) : (
                                <span>{user.fullname}</span>
                              )}
                            </div>
                          </div>

                          <div className="row mb-3">
                            <div className="col-md-4">
                              <strong>Username:</strong>
                            </div>
                            <div className="col-md-8">
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={newUsername}
                                  onChange={(e) => setNewUsername(e.target.value)}
                                  className="form-control"
                                  style={{
                                    width: "300px",
                                    height: "23px", // Fixed width for input
                                    fontSize: "15px", // Adjust font size as needed
                                  }}
                                />
                              ) : (
                                <span>{user.username}</span>
                              )}
                            </div>
                          </div>

                          <div className="row mb-3">
                            <div className="col-md-4">
                              <strong>Email:</strong>
                            </div>
                            <div className="col-md-8">
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={newEmail}
                                  onChange={(e) => setNewEmail(e.target.value)}
                                  className="form-control"
                                  style={{
                                    width: "300px",
                                    height: "23px", // Fixed width for input
                                    fontSize: "15px", // Adjust font size as needed
                                  }}
                                />
                              ) : (
                                <span>{user.email}</span>
                              )}
                            </div>
                          </div>


                          <div className="row mb-3">
                            <div className="col-md-4">
                              <strong>User Type:</strong>
                            </div>
                            <div className="col-md-8">
                              <span>{user.usertype}</span>
                            </div>
                          </div>

                          <div className="row mb-3">
                            <div className="col-md-4">
                              <strong>Created At:</strong>
                            </div>
                            <div className="col-md-8">
                              <span>{user.created_at}</span>
                            </div>
                          </div>

                          <div className="row mb-3">
                            <div className="col-md-4">
                              <strong>Updated At:</strong>
                            </div>
                            <div className="col-md-8">
                              <span>{user.updated_at}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>


                </div>
                <div className="row">
                    {/* Second Card: Edit User Information */}
                    <div className="col-lg-12 mb-4">
                        <div className="card shadow-sm border-0">
                            <div className="card-body p-4">
                               {/* Title and Button Side by Side */}
                               <div className="d-flex justify-content-between align-items-center mb-3">
                                   <h5 className="mb-0">Admin List</h5>
                                   <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                                       Add Admin
                                   </button>
                               </div>

                               <ul className="list-group">
                                   {currentUsers.map((admin) => (
                                       <li 
                                           key={admin.id} 
                                           className="list-group-item d-flex align-items-center justify-content-between"
                                           style={{ cursor: "pointer" }} // Makes list items clickable
                                       >
                                           <div className="d-flex align-items-center">
                                               <Image
                                                   src={admin.profile_image ? `http://127.0.0.1:8000/${admin.profile_image}` : "/assets/img/avatars/1.png"}
                                                   alt="Admin Profile"
                                                   width={50}
                                                   height={50}
                                                   className="rounded-circle me-3"
                                               />
                                               <div>
                                                   <strong>{admin.fullname}</strong> <br />
                                                   <span className="text-muted">{admin.email}</span>
                                               </div>
                                           </div>

                                           {/* Action Buttons */}
                                           <div>
                                               <button className="btn btn-sm btn-success me-2">
                                                   <i className='bx bx-user-check' ></i>
                                               </button>
                                               <button className="btn btn-sm btn-danger">
                                                   <i className='bx bxs-user-x' ></i>
                                               </button>
                                           </div>

                                       </li>
                                   ))}
                               </ul>
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


        {/* Modal with transition and darkened background */}
        <div
        className={`modal-backdrop ${showModal ? 'show' : ''}`}
        tabIndex={-1}
        style={{
            display: showModal ? 'block' : 'none',
            transition: 'background-color 0.3s ease',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darkened background
        }}
        ></div>

        <div
        className={`modal fade ${showModal ? 'show' : ''}`}
        id="addAdminModal"
        tabIndex={-1}
        aria-hidden="true"
        style={{ display: showModal ? 'block' : 'none', transition: 'opacity 0.3s ease-in-out' }}
        >
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Add Admin</h5>
                <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowModal(false)}
                ></button>
            </div>
            <div className="modal-body">
            <form id="formAuthentication" onSubmit={handleSubmit(onSubmit)} className="mb-3" action="index.html" method="POST">
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Enter your username"
                      autoFocus
                      {...register("username")}
                    />
                    {errors.username && <p>{errors.username.message}</p>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="fullname" className="form-label">Fullname</label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullname"
                      placeholder="Enter your fullname"
                      autoFocus
                      {...register("fullname")}
                    />
                    {errors.fullname && <p>{errors.fullname.message}</p>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" id="email" placeholder="Enter your email" {...register("email")} />
                    {errors.email && <p>{errors.email.message}</p>}
                  </div>
                  <div className="mb-3 form-password-toggle">
                    <label className="form-label" htmlFor="password">Password</label>
                    <div className="input-group input-group-merge">
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                        {...register("password")}
                      />
                      {errors.password && <p>{errors.password.message}</p>}
                    </div>
                  </div>
                  {/* Image Upload */}
                  <div className="mb-3">
                    <label htmlFor="profile_image" className="form-label">Profile Image</label>
                    <input
                      type="file"
                      id="profile_image"
                      className="form-control"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    {imagePreview && <img src={imagePreview} alt="Image preview" className="mt-3" width="100" />}
                  </div>
                  <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? "Loading..." : "Sign Up"}
                  </button>
                </form>
            </div>
            </div>
        </div>
        </div>

        {/* Custom CSS for darkening the backdrop */}
        <style jsx>{`
        .modal-backdrop {
            transition: background-color 0.3s ease;
            background-color: rgba(0, 0, 0, 0.7); /* Darker backdrop */
        }
        .modal.fade .modal-dialog {
            transition: transform 0.3s ease-out;
            transform: translateY(-50px); /* Initial position before fading in */
        }
        .modal.show .modal-dialog {
            transform: translateY(0); /* Final position */
        }
        `}</style>

          {/* / Navbar */}

          {/* Content wrapper */}

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
