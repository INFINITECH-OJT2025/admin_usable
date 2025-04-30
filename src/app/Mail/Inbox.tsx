import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { formatDistanceToNow } from 'date-fns';
import './mailmodal.css';
import { X } from 'lucide-react';


export default function Inboxes() {
    const [emails, setEmails] = useState<any[]>([]);
    const [authUrl, setAuthUrl] = useState<string>('');
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<{ name: string, email: string, picture: null } | null>(null);
    const [selectedEmail, setSelectedEmail] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = (email: any) => {
        setSelectedEmail(email);
        setIsModalOpen(true);
        console.log(email);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEmail(null);
    };

    useEffect(() => {
        getAuthUrl();
        checkToken();
    }, []);

    useEffect(() => {
        if (token) {
            fetchEmails();
            fetchUserInfo();
    
            const interval = setInterval(() => {
                fetchEmails('inbox', true); // Silent = true
            }, 30000);
    
            return () => clearInterval(interval); // Cleanup on unmount
        }
    }, [token]);
    
    const fetchUserInfo = async () => {
        if (!token) return;
        
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}gmail/user-info`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (response.data) {
            setUserInfo(response.data);
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      };
      

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

    const fetchEmails = async (filter = 'inbox', silent = false) => {
        if (!token) return;
    
        if (!silent) setLoading(true); // Only show loader if not silent
    
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}gmail/fetch-emails`, {
                params: { filter },
                headers: { 'Authorization': `Bearer ${token}` }
            });
    
            setEmails(response.data); // instantly reflect in UI
        } catch (error) {
            console.error("Error fetching emails:", error);
    
            try {
                // Get new auth URL
                const authResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}gmail/auth`);
                const newAuthUrl = authResponse.data.url;
    
                // Redirect the user to Google login
                window.location.href = newAuthUrl;
            } catch (authError) {
                console.error("Failed to fetch Google auth URL:", authError);
                alert('Session expired and re-authentication failed. Please try logging in again.');
            }
        } finally {
            if (!silent) setLoading(false);
        }
    };
    

    return (
        <>
        <div className="min-h-screen p-6">
            <div className="list-header">
                <div className="list-actions">
                    <button className="action-button refresh" onClick={() => fetchEmails()}>
                        <i className="bx bx-refresh"></i>
                    </button>
                </div>

                <label className="view-button">Inbox</label>
                <p className="text-xs text-gray-500 text-center mt-2">
                    Last updated {formatDistanceToNow(new Date(), { addSuffix: true })}
                </p>

                <div className="user-info">

                {userInfo ? (
                    <>
                        <img src={`${(userInfo.picture)}`} alt="Profile" className="profile-image w-10 h-10 rounded-full" />
                        <div className="user-details leading-tight">
                            <h3 className="user-name text-sm font-medium">{userInfo.name}</h3>
                            <p className="user-email text-xs text-gray-600">{userInfo.email}</p>
                        </div>
                    </>
                ) : (
                    <>
                        <Skeleton circle width={40} height={40} />
                        <div className="user-details flex flex-col gap-1 ml-2">
                            <Skeleton width={100} height={12} />
                            <Skeleton width={150} height={10} />
                        </div>
                    </>
                )}
                </div>
            </div>

            {isModalOpen && selectedEmail && (
            <div className="body">
                <div className="gmail-container">
                <div className="email-view">
                    <div className="email-toolbar">
                    <div className="back-button" onClick={closeModal}>←</div>
                    <div className="email-actions">
                        {/* <div className="email-action">Archive</div>
                        <div className="email-action">Delete</div>
                        <div className="email-action">Mark as unread</div>
                        <div className="email-action">More</div> */}
                    </div>
                    </div>

                    <div className="email-content">
                    <div className="email-header-info">
                        <div className="email-subjects">{selectedEmail.subject || "(no subject)"}</div>

                        <div className="email-metadata">
                        <div className="sender-info">
                            <div className="sender-avatar">
                            <img
                                src={`${(selectedEmail.gravatarUrl)}`}
                                alt={selectedEmail.fromName}
                                style={{ borderRadius: '50%' }}
                            />
                            </div>
                            <div className="sender-details">
                            <div className="sender-name">{selectedEmail.fromName}</div>
                            <div className="sender-email">{selectedEmail.fromEmail}</div>
                            <div>to {selectedEmail.to}</div>
                            </div>
                        </div>

                        <div className="email-date">{selectedEmail.time}</div>
                        </div>
                    </div>

                    <div className="email-body">
                        {selectedEmail.bodyHtml ? (
                        <div
                            className="email-html"
                            dangerouslySetInnerHTML={{ __html: selectedEmail.bodyHtml }}
                        />
                        ) : (
                        <pre className="email-text">{selectedEmail.bodyText}</pre>
                        )}
                    </div>

                    {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                        <div className="email-attachments">
                        <h4>Attachments:</h4>
                        <ul>
                            {selectedEmail.attachments.map((att, index) => (
                            <li key={index}>
                                <a
                                href={`data:${att.mimeType};base64,${att.base64}`}
                                download={att.filename}
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                📎 {att.filename}
                                </a>
                            </li>
                            ))}
                        </ul>
                        </div>
                    )}

                    {/* <div className="email-reply">
                        <div className="reply-actions">
                        <div className="formatting-options">
                            <div className="formatting-option">B</div>
                            <div className="formatting-option">I</div>
                            <div className="formatting-option">U</div>
                            <div className="formatting-option">Attach</div>
                        </div>

                        <button className="send-button">Send</button>
                        </div>
                    </div> */}
                    </div>
                </div>
                </div>
            </div>
            )}

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
            <div className="emails">
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
                                        {email.fromName || (Array.isArray(email.from) ? email.fromEmail.join(', ') : email.fromEmail)}
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

                                        <a className="email-action more" onClick={() => openModal(email)}>
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
        </>
    );
}
