import GoogleMailVerification from "./GoogleMailVerification";

export default function VerifyPage() {
  return (
    <div className="verification-container">
      <div className="verification-content">
        <div className="project-title">
          <h1 className="project-heading">
            Project <span>NEXT</span>
          </h1>
          <div className="title-underline"></div>
        </div>
        
        <GoogleMailVerification />
        
        <p className="footer-text">
          © {new Date().getFullYear()} Project NEXT. All rights reserved.
        </p>
      </div>
    </div>
  );
}