'use client';

import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';

const ValidateAdmin: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
    const router = useRouter();
    const pathname = usePathname(); // Get current path
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(() => {
        return sessionStorage.getItem('showModal') !== 'false';
    });

    useEffect(() => {
        const authToken = sessionStorage.getItem('authToken');
        if (!authToken) {
            router.push('/Login');
            return;
        }

        // Check if admin validation exists in sessionStorage
        const adminValidated = sessionStorage.getItem('adminValidated');
        if (adminValidated === 'true') {
            setShowModal(false);
            setIsAdmin(true);
            onSuccess();
            return; // Skip verification
        }

        // Verify if the user is an admin
        const verifyAdmin = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/user', {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                if (response.data.usertype === 'admin') {
                    setIsAdmin(true);
                    onSuccess();
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

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            if (url != pathname) {
                sessionStorage.removeItem('adminValidated');
            }
        };

        // Listen for route changes
        router.events?.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events?.off('routeChangeStart', handleRouteChange);
        };
    }, [router, pathname]);

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
                onSuccess();
                sessionStorage.setItem('adminValidated', 'true'); // Store validation in sessionStorage
                setShowModal(false);
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
        </>
    );
};

export default ValidateAdmin;