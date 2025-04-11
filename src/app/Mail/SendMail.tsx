'use client';

import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import FreeEditor from '@onetoteastack/ckeditor5-free-build'; // <-- updated import
import axios from 'axios';
import './mail.css';

export default function Mail() {
    const [to, setTo] = useState<string>('');
    const [cc, setCc] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [subject, setSubject] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

    const handleSendEmail = async () => {
        // Validate required fields
        if (!to) {
            setMessage('Please enter at least one email address in the To field');
            setMessageType('error');
            return;
        }

        if (!subject) {
            setMessage('Please enter a subject for your email');
            setMessageType('error');
            return;
        }

        setLoading(true);
        setMessage(null);

        const recipients = to.split(',').map(email => email.trim());
        const ccRecipients = cc;

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/send-email', {
                to: recipients,
                cc: ccRecipients,
                subject,
                body
            });

            setMessage(response.data.message || 'Email sent successfully');
            setMessageType('success');
            
            // Reset form
            setTo('');
            setCc([]);
            setInputValue('');
            setSubject('');
            setBody('');
        } catch (error) {
            setMessage('Failed to send email. Please try again.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue) {
            if (validateEmail(inputValue)) {
                setCc([...cc, inputValue]);
                setInputValue('');
            } else {
                setMessage('Please enter a valid email address');
                setMessageType('error');
                setTimeout(() => setMessage(null), 3000);
            }
        }
    };

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const removeEmail = (email: string) => {
        setCc(cc.filter((item) => item !== email));
    };

    return (
        <>
        <div className="email-container">
            <div className="email-card">
                <div className="email-header">
                    <h2 className="email-title">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        Compose Email
                    </h2>
                    <p className="email-description">Create and send emails to multiple recipients</p>
                </div>

                {message && (
                    <div className={`email-message ${messageType === 'error' ? 'email-message-error' : 'email-message-success'}`}>
                        {message}
                    </div>
                )}

                <div className="email-content">
                    <div className="form-group">
                        <label htmlFor="to" className="form-label">To</label>
                        <input
                            type="text"
                            id="email"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            placeholder="Enter email addresses (comma-separated)"
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cc" className="form-label">CC</label>
                        <div className="cc-container">
                            {cc.map((email, index) => (
                                <div key={index} className="email-tag">
                                    <span>{email}</span>
                                    <button 
                                        onClick={() => removeEmail(email)} 
                                        className="email-tag-remove"
                                        aria-label={`Remove ${email}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 6 6 18" />
                                            <path d="m6 6 12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            <input
                                type="text"
                                id="email"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type email and press Enter"
                                className="form-input"
                            />
                        </div>
                        
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject" className="form-label">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Enter email subject"
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="body" className="form-label">Message</label>
                        <div className="editor-container">
                        <div className="ckeditor-wrapper">
                        <CKEditor
                            editor={FreeEditor}
                            disableWatchdog={true}
                            data={body}
                            config={{
                                toolbar: [
                                    'heading', '|',
                                    'bold', 'italic', 'underline', 'strikethrough', '|',
                                    'link', 'blockQuote', 'code', '|',
                                    'bulletedList', 'numberedList', '|',
                                    'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells', '|',
                                    'undo', 'redo'
                                ],
                                table: {
                                    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
                                }
                            }}
                            
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setBody(data);
                            }}
                        />
                        </div>
                        </div>
                    </div>
                </div>

                <div className="email-footer">
                    <button 
                        onClick={handleSendEmail} 
                        className="send-button"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <svg className="spinners" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <circle className="spinners-circle" cx="12" cy="12" r="10" fill="none" strokeWidth="4" />
                                </svg>
                                Sending...
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
                                    <path d="m22 2-7 20-4-9-9-4Z" />
                                    <path d="M22 2 11 13" />
                                </svg>
                                Send Email
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    </>
    );
}
