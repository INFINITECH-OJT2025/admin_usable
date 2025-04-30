"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Head from "next/head";
import "../assets/vendor/fonts/boxicons.css";
import "../assets/vendor/css/core.css";
import "../assets/vendor/css/theme-default.css";
import "../assets/css/demo.css";
import "../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "../assets/vendor/css/pages/page-auth.css";
import "@/app/assets/css/dark-mode.css";


// import "./style.css";
import Script from "next/script";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // const router = useRouter();

    useEffect(() => {
        // Reinitialize or load any JS libraries after navigation
        if (typeof window !== 'undefined') {
        // Example: Reinitialize Bootstrap or other JS libraries
        }
    }, []);

    const handleLogin = async (event: React.FormEvent) => {
      event.preventDefault();
      setLoading(true);
      setMessage("");
    
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}login`,
          { username, password },
          { withCredentials: true }
        );
        console.log(response.data); // Log the response to check the structure
    
        if (response.data.token) {
          // Check if the user is verified
          if (response.data.user.if_verified === 'unverified') {
            toast.warn("You are not yet verified. Kindly check your email to verify!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
            });
          } else {
            // Proceed to check user status and display appropriate message
            switch (response.data.status) {
              case 'pending':
                toast.info("Your account is not yet allowed! Please wait for a bit, thanks for your patience!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  theme: "colored",
                });
                break;
              case 'Allowed':
                toast.success("You've successfully logged in. Enjoy!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  theme: "colored",
                });
                if (response.data.usertype === 'admin') {
                  sessionStorage.setItem("authToken", response.data.token); // Store token
                  window.location.href = '/Dashboard'; // Redirect to admin dashboard
                } else if (response.data.usertype === 'user') {
                  sessionStorage.setItem("authToken", response.data.token); // Store token
                  window.location.href = '/Userface/Dashboard'; // Redirect to user dashboard
                } else {
                  setMessage("User  type is unknown.");
                }
                break;
              case 'Blocked':
                toast.error("You have been blocked. Kindly contact the Customer Service! Thank you!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  theme: "colored",
                });
                break;
              default:
                setMessage("Unknown account status.");
                break;
            }
          }
        } else {
          setMessage("Invalid credentials. Please try again.");
        }
      } catch (error: any) {
        setMessage(error.response?.data?.message || "Login failed. Please check your credentials.");
      }
    
      setLoading(false);
    };
  


  return (
    <>
    <ToastContainer />
      <Script
        src="/assets/vendor/libs/popper/popper.js"
        strategy="beforeInteractive"
      />
      <Script
        src="/assets/vendor/js/bootstrap.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"
        strategy="afterInteractive"
      />
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"/>
        <script src="https://buttons.github.io/buttons.js" async defer></script>
      </Head>
      <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner">
            <div className="card">
              <div className="card-body p-3">
              <div className="app-brand justify-content-center">
                <a href="index.html" className="app-brand-link gap-2">
                  <span className="app-brand-logo demo">
                  <img className="logo-img" src="../img/NEXT_light_logo.png" alt="Logo" />
                  </span>
                  <span className="app-brand-text demo text-body fw-bolder">Projext NEXT</span>
                </a>
              </div>
                <h4 className="mb-1">Welcome to Project NEXT! 👋</h4>
                <p className="mb-2 text-sm">Please sign-in to your account</p>

                <form onSubmit={handleLogin} className="mb-2">
                  <div className="mb-2">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="username"
                      name="username"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-2 form-password-toggle">
                    <div className="d-flex justify-content-between">
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                      <a href="#">
                        <small>Forgot Password?</small>
                      </a>
                    </div>
                    <div className="input-group input-group-merge">
                      <input
                        type="password"
                        id="password"
                        className="form-control form-control-sm"
                        name="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <span className="input-group-text cursor-pointer">
                        <i className="bx bx-hide"></i>
                      </span>
                    </div>
                  </div>
                  {message && <p className="text-danger text-sm mt-2">{message}</p>}
                  <div className="mb-2">
                    <button className="btn btn-primary btn-sm d-grid w-100" type="submit" disabled={loading}>
                      {loading ? "Signing in..." : "Sign in"}
                    </button>
                  </div>
                </form>

                <p className="text-center mb-1">
                  <span>New on our platform?</span>
                  <a href="/Signup">
                    <span> Create an account</span>
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
