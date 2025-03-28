import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ user, visible, onClose }) => {
  const [showModal, setShowModal] = useState(visible);

  // Sync local state with the parent `visible` prop
  useEffect(() => {
    if (visible) {
      setShowModal(true); // Show modal instantly when opening
    }
  }, [visible]);

  // Handle close with delay for animation
  const handleClose = () => {
    setShowModal(false); // Start exit animation
    setTimeout(onClose, 500); // Wait for animation to finish, then close
  };

  if (!showModal) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {showModal && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={handleClose}
        >
          <motion.div
            className="modal-dialog modal-dialog-centered"
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onAnimationComplete={() => {
              if (!visible) setShowModal(false);
            }}
            style={{
              maxWidth: '90%', // Use max-width for responsiveness
              width: '500px', // Set a base width
              height: 'auto', // Allow height to adjust based on content
              margin: '0 10px', // Add some margin for small screens
            }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <div className="divider">
                <div className="divider-text">
                  <h4 className="text-3xl font-semibold text-green-600 mb-6">📄 User Information</h4>
                </div>
              </div>
              <div className="modal-body d-flex flex-column flex-md-row">
                <div className="me-3 d-flex justify-content-center align-items-center mb-3 mb-md-0">
                  <img
                    src={`http://127.0.0.1:8000/${user.profile_image}`}
                    alt="User  Image"
                    style={{ width: '100%', maxWidth: '150px', height: 'auto', borderRadius: '50%' }} // Responsive image
                  />
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between">
                    <p className="mb-0"><strong>Fullname:</strong></p>
                    <p className="mb-0">{user.title}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-0"><strong>Username:</strong></p>
                    <p className="mb-0">{user.username}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-0"><strong>Email:</strong></p>
                    <p className="mb-0">{user.email}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-0"><strong>Status:</strong></p>
                    <p className="mb-0">{user.status}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;