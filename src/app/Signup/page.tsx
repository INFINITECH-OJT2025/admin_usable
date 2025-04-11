'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Script from "next/script";
import { ToastContainer, toast } from "react-toastify";
import "./style.css";

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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null); // State for username availability
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null); // State for username availability
  const [isUppercase, setIsUppercase] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isSpecialChar, setIsSpecialChar] = useState(false);
  const [isLengthValid, setIsLengthValid] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}csrf-cookie`, { withCredentials: true })
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
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const username = watch("username") || ""; // Ensure username is always a string

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      const previewUrl = URL.createObjectURL(selectedImage);
      setImagePreview(previewUrl);
    }
  };

  const validatePassword = (password: string) => {
    setIsUppercase(/[A-Z]/.test(password));
    setIsNumber(/[0-9]/.test(password));
    setIsSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(password));
    setIsLengthValid(password.length > 8);
  };

  const onSubmit = async (data: any) => {
    // Check if username is available before proceeding with registration
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}check-username/${data.username}`);
      setUsernameAvailable(response.data.available);

      if (response.data.available === false) {
        toast.error("Username is already taken.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        return; // Stop submission if username is taken
      }
    } catch (error) {
      toast.error("Error checking username availability.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}check-email/${data.email}`);
      setEmailAvailable(response.data.available);

      if (response.data.available === false) {
        toast.error("Email is already taken.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        return; // Stop submission if username is taken
      }
    } catch (error) {
      toast.error("Error checking email availability.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

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
        `${process.env.NEXT_PUBLIC_API_URL}register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRF-TOKEN": csrfToken,
          },
          withCredentials: true,
        }
      );
      toast.success("Registration successful! Redirecting to login...", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      setTimeout(() => router.push("/Login"), 2000);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <ToastContainer />
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
            <div className="card responsive-card">
              <div className="card-body">
                {/* Logo */}
                <div className="app-brand justify-content-center">
                  <a href="index.html" className="app-brand-link gap-2">
                    <h2 className="app-brand-text text-body fw-bolder">Project NEXT</h2>
                  </a>
                </div>
                <br />
                {/* /Logo */}
                <h4 className="mb-2">Adventure starts here 🚀</h4>
                <p className="mb-4">Make your app management easy and fun!</p>
                <form id="formAuthentication" onSubmit={handleSubmit(onSubmit)} className="mb-3" action="index.html" method="POST">
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                      type="text"
                      className={`form-control ${usernameAvailable === false ? 'is-invalid' : ''}`}
                      id="username"
                      placeholder="Enter your username"
                      autoFocus
                      {...register("username")}
                    />
                    {errors.username && <p>{errors.username.message}</p>}
                    {usernameAvailable === false && <p className="text-danger">* Username is already taken.</p>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="fullname" className="form-label">Fullname</label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullname"
                      placeholder="Enter your fullname"
                      {...register("fullname")}
                    />
                    {errors.fullname && <p>{errors.fullname.message}</p>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="text"
                      className={`form-control ${emailAvailable === false ? 'is-invalid' : ''}`}
                      id="email"
                      placeholder="Enter your email"
                      autoFocus
                      {...register("email")}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                    {emailAvailable === false && <p className="text-danger">* Email is already taken.</p>}
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
                      onChange={(e) => validatePassword(e.target.value)} // Remove the call to register("password").onChange
                    />
                    </div>
                    {errors.password && <p>{errors.password.message}</p>}
                    <div className="password-requirements">
                      <label className="form-label" style={{ color: 'blue', opacity: 0.5 }}>Requirements:</label>
                      <ul>
                        <li style={{ color: isUppercase ? 'blue' : 'gray' }}>
                          {isUppercase ? (
                            <i className="bx bx-checkbox-checked" style={{ color: 'blue'}}></i>
                          ) : (
                            <i className="bx bx-checkbox"></i>
                          )}
                          At least one uppercase letter
                        </li>
                        <li style={{ color: isNumber ? 'blue' : 'gray' }}>
                          {isNumber ? (
                            <i className="bx bx-checkbox-checked" style={{ color: 'blue' }}></i>
                          ) : (
                            <i className="bx bx-checkbox"></i>
                          )}
                          At least one number
                        </li>
                        <li style={{ color: isSpecialChar ? 'blue' : 'gray' }}>
                          {isSpecialChar ? (
                            <i className="bx bx-checkbox-checked" style={{ color: 'blue' }}></i>
                          ) : (
                            <i className="bx bx-checkbox"></i>
                          )}
                          At least one special character
                        </li>
                        <li style={{ color: isLengthValid ? 'blue' : 'gray' }}>
                          {isLengthValid ? (
                            <i className="bx bx-checkbox-checked" style={{ color: 'blue' }}></i>
                          ) : (
                            <i className="bx bx-checkbox"></i>
                          )}
                          At least 8 characters long
                        </li>
                      </ul>
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
                  <button
                    type="submit"
                    className={`btn btn-primary w-100 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={loading || !(isUppercase && isNumber && isSpecialChar && isLengthValid)}
                  >
                    {loading ? "Loading..." : "Sign Up"}
                  </button>
                </form>
                <p className="text-center mb-1">
                  <span>Already have an account?</span>
                  <a href="/Login">
                    <span> Login now</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}