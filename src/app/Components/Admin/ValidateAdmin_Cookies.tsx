'use client';

import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import the js-cookie library

const ValidateAdmin: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        const authToken = sessionStorage.getItem('authToken');
        if (!authToken) {
            router.push('/Login');
            return;
        }

        // Check if the admin validation cookie exists
        const adminValidated = Cookies.get('adminValidated');
        if (adminValidated === 'true') {
            setIsAdmin(true);
            onSuccess(); // Call the onSuccess callback
            setShowModal(false);
            return; // Skip the admin verification
        }

        // Verify if the user is an admin
        const verifyAdmin = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/user', {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                if (response.data.usertype === 'admin') {
                    setIsAdmin(true);
                    onSuccess(); // Call the onSuccess callback
                } else {
                    setShowModal(true);
                }
            } catch (error) {
                console.error('Error verifying admin:', error);
                setShowModal(true);
            } finally {
                setIsLoading(false);
            }
        };

        verifyAdmin();
    }, [router, onSuccess]);

    const handlePasswordSubmit = async () => {
        const authToken = sessionStorage.getItem('authToken');
        if (!authToken) {
            router.push('/Login');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/validate-password', {
                authToken,
                password,
            }, {
                headers: { Authorization: `Bearer ${authToken}` },
            });

            if (response.data.valid) {
                setIsAdmin(true);
                onSuccess(); // Call the onSuccess callback
                setShowModal(false);
                // Set a cookie to remember the admin validation
                Cookies.set('adminValidated', 'true', { expires: 1 }); // Expires in 1 day
                toast.success("Got In! Enjoy", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });
            } else {
                alert('Invalid password');
                toast.error("Oops! Wrong Password. Please Try again!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });
            }
        } catch {
            toast.error("Oops! Wrong Password. Please Try again!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        }
    };

    const handleCancel = () => {
        router.push('/Dashboard');
    };

    return (
        <>
            {showModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                        <div className="modal-header">
                                <h5 className="modal-title">Admin Access Required</h5>
                                <button type="button" className="btn-close" onClick={handleCancel}></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter admin password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={handlePasswordSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </>
    );
};

export default ValidateAdmin;