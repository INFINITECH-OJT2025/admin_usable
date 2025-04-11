"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import "./styles.css";

const GoogleMailVerification = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [countdown, setCountdown] = useState(3); // Countdown state
  const router = useRouter();

  useEffect(() => {
    if (token && router) {
      handleVerify(token);
    }
  }, [token, router]);

  const handleVerify = async (token: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}verify-email?token=${token}`
      );
      setMessage(response.data.message);
      setStatus("success");
      startCountdown(); // Start countdown after successful verification
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Verification failed.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const startCountdown = () => {
    setCountdown(3); // Reset countdown to 3 seconds
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimeout(() => {
            if (typeof window !== "undefined") {
              try {
                router.push("/Login");
              } catch (error) {
                console.error("Redirection error:", error);
              }              
            }
          }, 500);
          return 0; // Stop countdown
        }
        return prev - 1; // Decrease countdown
      });
    }, 1000);
  };
  

  return (
    <div className="verification-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">Email Verification</h2>
          <p className="card-description">
            We're confirming your email address
          </p>
        </div>
      </div>
      <div className="card-content">
        <div className="content-wrapper">
          {loading ? (
            <div className="loader-container">
              <div className="loader">
                <div className="loader-icon">
                  <Loader2 />
                </div>
                <div className="loader-circle-bg"></div>
                <div className="loader-circle-spinner"></div>
              </div>
              <p className="loader-text">Verifying your email...</p>
            </div>
          ) : status === "success" ? (
            <div className="status-container">
              <div className="status-icon-success">
                <CheckCircle />
              </div>
              <p className="status-message">{message}</p>
              <p className="countdown-message">Redirecting in {countdown} seconds...</p> {/* Countdown message */}
            </div>
          ) : status === "error" ? (
            <div className="status-container">
              <div className="status-icon-error">
                <XCircle />
              </div>
              <p className="status-message">{message}</p>
              {token && (
                <button 
                  onClick={() => handleVerify(token)}
                  className="try-again-button"
                >
                  Try Again
                </button>
              )}
            </div>
          ) : (
            <div>
              <button
                onClick={() => token && handleVerify(token)}
                disabled={!token}
                className="verify-button"
              >
                Verify Email
              </button>
              {!token && (
                <p className="error-message">
                  No verification token found in URL
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoogleMailVerification;