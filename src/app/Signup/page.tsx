'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Script from "next/script";

import "../assets/vendor/fonts/boxicons.css";
import "../assets/vendor/css/core.css";
import "../assets/vendor/css/theme-default.css";
import "../assets/css/demo.css";
import "../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "../assets/vendor/libs/apex-charts/apex-charts.css";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  fullname: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function Signup() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
  const [csrfToken, setCsrfToken] = useState("");
  const router = useRouter();

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

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("fullname", data.fullname);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (image) {
        formData.append("profile_image", image);
      }

      await axios.post(
        "http://127.0.0.1:8000/api/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRF-TOKEN": csrfToken,
          },
          withCredentials: true,
        }
      );

      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => router.push("/Login"), 2000);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "An error occurred.");
    }
    setLoading(false);
  };

  return (
    <>
      <Script
        src="/assets/vendor/js/helpers.js"
        strategy="afterInteractive"
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
        src="/assets/js/main.js"
        strategy="afterInteractive"
      />

      <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner">
            {/* Register Card */}
            <div className="card">
              <div className="card-body">
                {/* Logo */}
                <div className="app-brand justify-content-center">
                  <a href="index.html" className="app-brand-link gap-2">
                    <span className="app-brand-logo demo">
                      <svg width="25" viewBox="0 0 25 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        {/* SVG content */}
                      </svg>
                    </span>
                    <span className="app-brand-text demo text-body fw-bolder">Sneat</span>
                  </a>
                </div>
                {/* /Logo */}
                <h4 className="mb-2">Adventure starts here 🚀</h4>
                <p className="mb-4">Make your app management easy and fun!</p>
                {message && <p>{message}</p>}
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
      </div>
    </>
  );
}
