'use client';

import React from 'react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
    className="modal"
    style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    }}
    >
    <div
        className="modal-content"
        style={{
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: 'white',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        }}
    >
        <h4>Confirm Deletion</h4>
        <p>Are you sure you want to delete this form? This action cannot be undone.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '15px' }}>
        <button onClick={onConfirm} className="btn btn-danger">Delete</button>
        <button onClick={onClose} className="btn btn-secondary">Cancel</button>
        </div>
    </div>
    </div>
  );
};

export default DeleteConfirmationModal;