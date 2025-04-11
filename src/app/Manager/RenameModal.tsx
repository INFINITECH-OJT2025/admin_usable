'use client';

import React, { useState } from 'react';

interface RenameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRename: (oldName: string, newName: string) => void;
  oldName: string; // The current name of the file/folder
}

const RenameModal: React.FC<RenameModalProps> = ({ isOpen, onClose, onRename, oldName }) => {
  const [newName, setNewName] = useState('');

  const handleRename = () => {
    if (newName.trim()) {
      onRename(oldName, newName.trim());
      setNewName('');
    }
  };

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
        <h4>Rename {oldName}</h4>
        <input
          type="text"
          className="form-control mt-3"
          placeholder={`Enter new name for ${oldName}`}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '15px' }}>
          <button onClick={handleRename} className="btn btn-primary">
            Rename
          </button>
          <button onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenameModal;
