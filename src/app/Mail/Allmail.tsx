import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './google.css';
import { formatDistanceToNow } from 'date-fns';

export default function Allmail() {
    const [emails, setEmails] = useState<any[]>([]);
    const [authUrl, setAuthUrl] = useState<string>('');
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [activeFilter, setActiveFilter] = useState<string>('Allmail'); // Track active filter

    useEffect(() => {
        getAuthUrl();
        checkToken();
    }, []);

    useEffect(() => {
        if (token) {
            fetchEmails(activeFilter); // Fetch emails based on active filter
        }
    }, [token, activeFilter]); // Trigger when token or filter changes

    const getAuthUrl = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}gmail/auth`);
            setAuthUrl(response.data.url);
        } catch (error) {
            console.error("Error getting auth URL:", error);
        }
    };

    const checkToken = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get('token');
        const tokenFromStorage = sessionStorage.getItem('google_token');

        if (tokenFromUrl) {
            setToken(tokenFromUrl);
            sessionStorage.setItem('google_token', tokenFromUrl);
            window.history.replaceState({}, document.title, window.location.origin + window.location.pathname);
        } else if (tokenFromStorage) {
            setToken(tokenFromStorage);
        }
    };

    const fetchEmails = async (filter: string) => {
        if (!token) return;

        setLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}gmail/fetch-emails`, {
                params: { filter },
                headers: { 'Authorization': `Bearer ${token}` }
            });

            setEmails(response.data);
        } catch (error) {
            console.error("Error fetching emails:", error);
            if (error.response?.status === 401) {
                alert('Session expired. Please log in again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        const selectedEmails = emails.filter(email => email.isSelected);
        if (selectedEmails.length === 0) {
            alert("Please select an email to delete.");
            return;
        }
        setLoading(true);
        try {
            // Check the email IDs in the console
            console.log(selectedEmails.map(email => email.id)); // Log the email IDs
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}gmail/delete-emails`, {
                emailIds: selectedEmails.map(email => email.id), // Ensure email.id exists
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            console.log("fetched id: ", selectedEmails);
            // Refresh the emails list after deletion
            fetchEmails();
        } catch (error) {
            console.error("Error deleting emails:", error);
            alert("Failed to delete emails.");
            console.log("fetched id: ", selectedEmails);
        } finally {
            setLoading(false);
            console.log("fetched id: ", selectedEmails);
        }
    };

    const handleFilterChange = (filter: string) => {
        setActiveFilter(filter); // Update active filter
    };

    const refreshToken = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}refresh-token`, {
                // You may need to send the refresh token if you are storing it
            });

            if (response.data.access_token) {
                setToken(response.data.access_token);
                sessionStorage.setItem('google_token', response.data.access_token);
                fetchEmails(); // Retry fetching emails after refreshing the token
            } else {
                alert('Session expired. Please log in again.');
                window.location.href = authUrl; // Redirect to login
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
            alert('Session expired. Please log in again.');
            window.location.href = authUrl; // Redirect to login
        }
    };

    return (
        <div className="min-h-screen p-6">
            <div className="list-header flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-2 gap-2">
                <div className="list-actions flex flex-wrap items-center gap-2">
                    <button
                        className="action-button refresh bg-gray-200 px-2 py-1 text-xs md:text-sm md:px-3 rounded"
                        onClick={() => fetchEmails()}
                    >
                        <i className='bx bx-refresh'></i>
                    </button>
                </div>

                <div className="list-view-options flex gap-1 md:gap-2 self-start md:self-auto">
                    <button
                        className={`view-button ${activeFilter === 'Allmail' ? 'active' : ''} px-2 py-1 text-xs md:text-sm md:px-3 rounded`}
                        onClick={() => handleFilterChange('Allmail')}
                    >
                        All
                    </button>
                    <button
                        className={`view-button ${activeFilter === 'unread' ? 'active' : ''} px-2 py-1 text-xs md:text-sm md:px-3 rounded`}
                        onClick={() => handleFilterChange('unread')}
                    >
                        Unread
                    </button>
                </div>
                <label
                    className="view-button bg-gray-300 px-2 py-1 text-xs md:text-sm md:px-3 rounded ml-auto"
                    style={{ fontSize: 'small', color: '#3674B5', backgroundColor: '#FBF8EF' }}
                >
                    All Mail
                </label>
            </div>

            {/* Login with Google */}
            {!token && authUrl ? (
                <div className="flex flex-col items-center justify-center min-h-screen text-center gap-4" style={{ marginTop: '250px', paddingBottom: '400px'}}>
                    <label style={{ color: '#155E95'}}>Note: Please login the company account, thanks!</label><br />
                    <a href={authUrl} className="google-login-button">
                        <div className="google-icon-wrapper">
                            <svg className="google-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                                <path fill="none" d="M0 0h48v48H0z" />
                            </svg>
                        </div>
                        <span className="google-button-text">Login with Google</span>
                    </a>
                </div>
            ) : loading ? (
                <div className="emails mt-6">
                    {/* Skeleton items */}
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="email-item flex items-center border-b p-4 gap-1">
                            <Skeleton circle={true} height={40} width={40} />
                            <div className="email-sender"><Skeleton width={150} /></div>
                            <div className="email-subject flex-grow"><Skeleton width="100%" /></div>
                            <div className="email-time text-gray-500 text-sm"><Skeleton width={80} /></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={`emails mt-6 ${activeFilter === 'unread' ? 'bg-gray-900' : ''}`}>
                    {emails.length === 0 ? (
                        <p className="text-gray-500 p-4 text-center">No emails found.</p>
                    ) : (
                        emails.map((email, index) => (
                        <div key={index} className="email-item flex flex-col md:flex-row justify-between border-b">
                            {/* Main Left Content */}
                            <div className="flex flex-col">
                                {/* Subject + From */}
                                <div className="flex justify-between gap-1">
                                    <div className="email-sender font-semibold" style={{ fontSize: '20px' }}>
                                        {email.subject || '(no subject)'}
                                    </div>
                                    <div className="email-subject text-blue-600 hover:underline text-sm mt-1">
                                        {email.fromName || (Array.isArray(email.from) ? email.from.join(', ') : email.from)}
                                    </div>
                                </div>
                                <div className="email-to text-gray-500 text-sm">
                                    {Array.isArray(email.to) ? email.to.join(', ') : email.to}
                                </div>

                                {/* Action Buttons */}
                                <div className="email-actions-container mt-3">
                                    <div className="email-actions d-flex flex-col md:flex-row gap-2">
                                        <button className="email-action reply">
                                        <i className="bx bx-reply"></i>
                                        Reply
                                        </button>

                                        <button className="email-action forward">
                                        <i className="bx bx-share-alt"></i>
                                        Forward
                                        </button>

                                        <a
                                        className="email-action more"
                                        href={`https://mail.google.com/mail/u/0/#inbox/${email.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        >
                                        <i className="bx bx-link-external"></i>
                                        View
                                        </a>
                                    </div>
                                </div>

                            </div>

                                            {/* Right Side: Time + Snippet */}
                            <div className="flex flex-col items-end text-right">

                            </div>

                            {/* Right Side: Time + Snippet */}
                            <div className="flex flex-col items-end text-right" style={{ justifySelf: 'end', textAlign: 'end', marginLeft: '-200px'}}>
                                <div className="email-time text-gray-500 text-sm mb-4">
                                    {formatDistanceToNow(new Date(email.time), { addSuffix: true })}
                                </div>
                                <div
                                    className="email-preview text-gray-600"
                                    style={{
                                        backgroundColor: '#f9f9f9',
                                        padding: '12px',
                                        borderRadius: '12px',
                                        border: '1px solid rgb(147, 183, 255)',
                                        width: '300px',
                                    }}
                                    dangerouslySetInnerHTML={{ __html: email.snippet }}
                                ></div>
                            </div>
                        </div>                   
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
