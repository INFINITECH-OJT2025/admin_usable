'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { useEffect } from "react";
import axios from "axios";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

import "@/app/assets/vendor/fonts/boxicons.css";
import "@/app/assets/vendor/css/core.css";
import "@/app/assets/vendor/css/theme-default.css";
import "@/app/assets/css/demo.css";
import "@/app/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "@/app/assets/vendor/libs/apex-charts/apex-charts.css";

import Sidebar from '@/app/Components/Userface/Sidebar';
import Navbar from '@/app/Components/Userface/Navbar';
import Script from 'next/script';
<<<<<<< Updated upstream
=======
import withAuth from '@/app/utils/withAuth';
>>>>>>> Stashed changes

// const schema = yup.object().shape({
//   username: yup.string().required("Username is required"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
// });

<<<<<<< Updated upstream
export default function Profile() {
=======
const Profile = () => {
>>>>>>> Stashed changes
    const [user, setUser] = useState({ 
        id: "", 
        username: "", 
        fullname: "", 
        email: "", 
        profile_image: "", 
        usertype: "", 
        created_at: "", 
        updated_at: "" 
    });

    const [formData, setFormData] = useState({
        username: "",
        fullname: "",
        email: "",
        profile_image: null as File | null
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    // Fetch User Data

        const fetchUserData = async () => {
            try {
                const authToken = sessionStorage.getItem("authToken");
                if (authToken) {
                    const response = await axios.get("http://127.0.0.1:8000/api/user", {
                        headers: { Authorization: `Bearer ${authToken}` }
                    });
                    setUser(response.data);
                    setFormData({
                        username: response.data.username,
                        fullname: response.data.fullname,
                        email: response.data.email,
                        profile_image: null
                    });
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

    useEffect(() => {
        fetchUserData();
    }, []);
    // Handle Input Change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Image Change
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, profile_image: file });

            // Generate image preview
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    // Handle Form Submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const authToken = sessionStorage.getItem("authToken");
            const formDataToSend = new FormData();

            formDataToSend.append("username", formData.username);
            formDataToSend.append("fullname", formData.fullname);
            formDataToSend.append("email", formData.email);

            if (formData.profile_image) {
                formDataToSend.append("profile_image", formData.profile_image);
            }

            await axios.post(`http://127.0.0.1:8000/api/updateUser/${user.id}`, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            setMessage("Profile updated successfully!");
            fetchUserData();
        } catch (error) {
            console.error("Update failed:", error);
            setMessage("Failed to update profile.");
        } finally {
            setLoading(false);
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
<<<<<<< Updated upstream
      <div className="layout-wrapper layout-content-navbar">
=======
      <div className="layout-wrapper layout-content-navbar light-style layout-menu-fixed">
>>>>>>> Stashed changes
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
                                <h5 className="mb-1">{user.fullname}</h5>
                                <p className="text-muted">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Second Card: Full User Information */}
                    <div className="col-lg-8 mb-4">
                        <div className="card shadow-sm border-0">
                            <div className="card-body p-4">
                                <h5 className="mb-3">User Information</h5>
                                <hr style={{ border: "1.5px solid"}}></hr>
                                <p><strong>ID:</strong> {user.id}</p>
                                <p><strong>Username:</strong> {user.username}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>User Type:</strong> {user.usertype}</p>
                                <p><strong>Created At:</strong> {user.created_at}</p>
                                <p><strong>Updated At:</strong> {user.updated_at}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* Second Card: Edit User Information */}
                                    {/* Profile Image Card */}
                                    {/* <div className="col-lg-4 mb-4">
                                        <div className="card shadow-sm border-0">
                                            <div className="card-body p-4 d-flex flex-column align-items-center justify-content-center">
                                                <Image
                                                    src={imagePreview || (user.profile_image ? `http://127.0.0.1:8000/${user.profile_image}` : "/assets/img/avatars/1.png")}
                                                    alt="Profile Image"
                                                    width={210}
                                                    height={210}
                                                    className="rounded-circle mb-3"
                                                    style={{
                                                        objectFit: "cover",
                                                        border: "4px solid #f8f9fa",
                                                    }}
                                                />
                                                <h5 className="mb-1">Image Preview</h5>
                                                <p className="text-muted">{user.email}</p>
                                            </div>
                                        </div>
                                    </div> */}

                                    {/* Edit Profile Form */}
                                    <div className="col-lg-12 mb-4">
                                        <div className="card shadow-sm border-0">
                                            <h5 className="card-header">Edit Profile</h5>
                                            <div className="card-body">
                                                {message && <div className="alert alert-info">{message}</div>}
                                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                                    <div className="mb-3">
                                                        <label className="form-label">Username</label>
                                                        <input 
                                                            className="form-control" 
                                                            type="text" 
                                                            name="username" 
                                                            value={formData.username} 
                                                            onChange={handleChange}
                                                            required 
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Full Name</label>
                                                        <input 
                                                            className="form-control" 
                                                            type="text" 
                                                            name="fullname" 
                                                            value={formData.fullname} 
                                                            onChange={handleChange}
                                                            required 
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Email</label>
                                                        <input 
                                                            className="form-control" 
                                                            type="email" 
                                                            name="email" 
                                                            value={formData.email} 
                                                            onChange={handleChange}
                                                            required 
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Profile Image</label>
                                                        <input 
                                                            className="form-control" 
                                                            type="file" 
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                        />
                                                    </div>
                                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                                        {loading ? "Saving..." : "Save Changes"}
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="card shadow-sm border-0">
                                            <div className="card-body p-4 d-flex flex-column align-items-center justify-content-center">
                                                <Image
                                                    src={imagePreview || (user.profile_image ? `http://127.0.0.1:8000/${user.profile_image}` : "/assets/img/avatars/1.png")}
                                                    alt="Profile Image"
                                                    width={210}
                                                    height={210}
                                                    className="rounded-circle mb-3"
                                                    style={{
                                                        objectFit: "cover",
                                                        border: "4px solid #f8f9fa",
                                                    }}
                                                />
                                                <h5 className="mb-1">Image Preview</h5>
                                                {/* <p className="text-muted">{user.email}</p> */}
                                            </div>
                                        </div>
                                    </div>
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
      <div className="layout-overlay layout-menu-toggle"></div>
    </div>

    
    </>
  );
}
<<<<<<< Updated upstream
=======


export default withAuth(Profile);
>>>>>>> Stashed changes
