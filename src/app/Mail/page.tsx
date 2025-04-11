'use client';

import React, { useState, useEffect } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import axios from 'axios';
import Sidebar from '../Components/Admin/Sidebar';
import Navbar from '../Components/Admin/Navbar';
import './style.css';
import { Inbox, Star, Send, FileText, Archive, Trash2, ShieldAlert, Pencil, Ellipsis, X } from 'lucide-react';

import Inboxes from './Inbox';
import Starred from './Starred';
import Sent from './Sent';
import Drafts from './Drafts';
import Allmail from './Allmail';
import Trash from './Trash';
import Spam from './Spam';
import SendMail from './SendMail';

export default function Mail() {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState('inbox');
    const [showCompose, setShowCompose] = useState(false);
    const [sentEmails, setSentEmails] = useState<any[]>([]);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isHovered, setIsHovered] = useState(false);


    // Check if mobile on mount and when window resizes
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        // Initial check
        checkIfMobile();
        
        // Add event listener
        window.addEventListener('resize', checkIfMobile);
        
        // Cleanup
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    const editor = useEditor({
        extensions: [StarterKit],
        content: '',
        onUpdate: ({ editor }) => setBody(editor.getHTML()),
    });

    useEffect(() => {
        const storedSection = document.cookie
            .split('; ')
            .find(row => row.startsWith('activeSection='))?.split('=')[1];
        if (storedSection) setActiveSection(storedSection);
    }, []);

    useEffect(() => {
        document.cookie = `activeSection=${activeSection}; path=/; max-age=${60 * 60 * 24 * 7}`;
    }, [activeSection]);

    useEffect(() => {
        fetchSentEmails();
    }, []);

    // Close sidebar when changing sections on mobile
    useEffect(() => {
        if (isMobile) {
            setMobileSidebarOpen(false);
        }
    }, [activeSection, isMobile]);

    const fetchSentEmails = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/sent-emails');
            setSentEmails(response.data);
        } catch (error) {
            console.error('Failed to fetch emails', error);
        }
    };

    return (
        <div className="layout-wrapper layout-content-navbar light-style layout-menu-fixed layout-navbar-fixed">
            <div className="layout-container">
                <Sidebar />
                <div className="layout-page">
                    <Navbar />

                    <div className="container-xxl flex-grow-1 container-p-y">
                        <div className="row">
                            <div className="divider">
                                <div className="divider-text"><h4 className="text-3xl font-semibold text-right text-green-600 mb-6">📧 Mail House</h4></div>
                            </div>
                            <main className="app-content flex flex-col md:flex-row relative">
                                {/* Sidebar2 Desktop - Always visible on desktop */}
                                <aside className="sidebar2 hidden md:flex md:w-64">
                                    <SidebarContent
                                        activeSection={activeSection}
                                        setActiveSection={setActiveSection}
                                        editor={editor}
                                    />
                                </aside>



                                <section className="email-list flex-1">
                                {isMobile && (
                                <nav className="list-header flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-2 gap-2">
                                    <button 
                                    onClick={() => setMobileSidebarOpen(true)} 
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    className="mr-2 focus:outline-none"
                                    aria-label="Open sidebar menu"
                                    style={{
                                        backgroundColor: isHovered ? '#E0F2FF' : 'transparent',
                                        borderRadius: '6px',
                                        padding: '4px'
                                    }}
                                    >
                                    <Ellipsis size={24} color={isHovered ? '#3B82F6' : '#60B5FF'} />
                                    </button>
                                    <label className="view-button bg-gray-300 px-2 py-1 text-xs md:text-sm md:px-3 rounded" style={{ fontSize: 'large', color: '#60B5FF'}}> Mail</label>
                                </nav>
                                )}
                                {/* Sidebar2 Mobile Drawer - Slides from left */}
                                {isMobile && (
                                    
                                    <div
                                        className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${
                                            mobileSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                        }`}
                                        style={{ position: 'absolute', zIndex: '1000'}}
                                        onClick={() => setMobileSidebarOpen(false)}
                                    >
                                        {/* Top-right close button */}
                                        <div className="absolute" style={{ textAlign: 'end', marginBottom: '-50px', paddingLeft: '200px', zIndex: '1000'}}>
                                        <button
                                            onClick={() => setMobileSidebarOpen(false)}
                                            style={{
                                                backgroundColor: '#AFDDFF',     // light gray
                                                padding: '0.5rem',
                                                borderRadius: '9999px',        // full circle
                                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                                                border: 'none',
                                                cursor: 'pointer',
                                                transition: 'background-color 0.2s ease-in-out'
                                                
                                            }}
                                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#60B5FF')}
                                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#AFDDFF')}
                                            aria-label="Close sidebar"
                                        >
                                            <X size={10} color='gray' />
                                        </button>
                                        </div>
                                        <aside 
                                            className={`idebar2 absolute top-0 left-0 h-full w-64 bg-white shadow-lg p-4 overflow-y-auto ${
                                                mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                                            }`} 
                                            onClick={(e) => e.stopPropagation()}
                                        >

                                            <div className="p-1" style={{ height: '800px'}}>
                                                <SidebarContent
                                                    activeSection={activeSection}
                                                    setActiveSection={(val) => {
                                                        setActiveSection(val);
                                                        setMobileSidebarOpen(false);
                                                    }}
                                                    editor={editor}
                                                />
                                            </div>
                                        </aside>
                                    </div>
                                )}
                                    {activeSection === 'inbox' && <Inboxes />}
                                    {activeSection === 'starred' && <Starred />}
                                    {activeSection === 'sent' && <Sent />}
                                    {activeSection === 'drafts' && <Drafts />}
                                    {activeSection === 'allmail' && <Allmail />}
                                    {activeSection === 'spam' && <Spam />}
                                    {activeSection === 'trash' && <Trash />}
                                </section>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
            <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasBackdrop"
            aria-labelledby="offcanvasBackdropLabel"
            >
                <div>
                    <button
                        style={{
                            backgroundColor: '#AFDDFF',     // light gray
                            padding: '0.5rem',
                            margin: '0.5rem',
                            borderRadius: '9999px',        // full circle
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease-in-out',
                            color: 'gray'
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#60B5FF')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#AFDDFF')}
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    >
                        <X size={10} />
                    </button>
                    <SendMail />
                </div>
            </div>
            <div className="layout-overlay layout-menu-toggle"></div>
        </div>
    );
}

// Reusable Sidebar Content
const SidebarContent = ({ activeSection, setActiveSection, editor }: any) => (
    <nav className="folders">
        <button
            className="compose-button"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasBackdrop"
            aria-controls="offcanvasBackdrop"
        >
            <span className="text-sm">Compose...</span>
            <Pencil size={16} className="inline mr-2" />
            
        </button>

        <ul>
            <SidebarItem icon={<Inbox size={16} />} label="Inbox" active={activeSection === 'inbox'} onClick={() => setActiveSection('inbox')} />
            <SidebarItem icon={<Star size={16} />} label="Starred" active={activeSection === 'starred'} onClick={() => setActiveSection('starred')} />
            <SidebarItem icon={<Send size={16} />} label="Sent" active={activeSection === 'sent'} onClick={() => setActiveSection('sent')} />
            <SidebarItem icon={<FileText size={16} />} label="Drafts" active={activeSection === 'drafts'} onClick={() => setActiveSection('drafts')} />
            <SidebarItem icon={<Archive size={16} />} label="All Mail" active={activeSection === 'allmail'} onClick={() => setActiveSection('allmail')} />
            <SidebarItem icon={<ShieldAlert size={16} />} label="Spam" active={activeSection === 'spam'} onClick={() => setActiveSection('spam')} />
            <SidebarItem icon={<Trash2 size={16} />} label="Trash" active={activeSection === 'trash'} onClick={() => setActiveSection('trash')} />
        </ul>

        <div className="sidebar2-section">
            <h3>Labels</h3>
            <ul>
                <SidebarItem label="Work" className="label-color work" active={activeSection === 'work'} onClick={() => setActiveSection('work')} />
                <SidebarItem label="Personal" className="label-color personal" active={activeSection === 'personal'} onClick={() => setActiveSection('personal')} />
                <SidebarItem label="Important" className="label-color important" active={activeSection === 'important'} onClick={() => setActiveSection('important')} />
                <SidebarItem label="Projects" className="label-color projects" active={activeSection === 'projects'} onClick={() => setActiveSection('projects')} />
            </ul>
        </div>
    </nav>
);

const SidebarItem = ({ icon, label, active, onClick, className }: any) => (
    <li className={active ? 'active' : ''}>
        <a onClick={onClick} className="cursor-pointer">
            {icon && <span className="mr-2 inline-flex">{icon}</span>}
            {className && <span className={className}></span>}
            {label}
        </a>
    </li>
);