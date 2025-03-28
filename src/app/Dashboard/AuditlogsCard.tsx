'use client';

import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { motion } from "framer-motion";
import './style.css';
import styles from './Card.module.css'; // Import the CSS module
import "@/app/assets/css/dark-mode.css";

export default function AuditlogsCard() {
    const [notifications, setNotifications] = useState<{ id: number; message: string; status: string, created_at: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date()); // Track current time for live updates

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date()); // Update the state every second
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    const fetchNotifications = async () => {
        try {
            const authToken = sessionStorage.getItem("authToken");
            if (authToken) {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}activities`, {
                    headers: { Authorization: `Bearer ${authToken}` }
                });
                const data = await response.json();
                setNotifications(data);
            }
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications(); // Initial fetch

        // Initialize Pusher
        const pusher = new Pusher('c1693f80d13146933399', {
            cluster: 'ap1',
            encrypted: true,
        });

        const channel = pusher.subscribe('logs');

        channel.bind('AuditLogEvent', (data: any) => {
            console.log("New Notification Received:", data);

            if (!data || !data.message || !data.status) {
                console.error("Invalid notification data received:", data);
                return;
            }

            const formattedData = {
                id: data.id ?? new Date().getTime(),
                message: data.message ?? "No message provided",
                status: data.status ?? "unread",
                created_at: data.created_at ? new Date(data.created_at).toISOString() : new Date().toISOString(),
            };

            setNotifications(prev => [formattedData, ...prev]); // Add new notification at the top
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);

    const formatDate = (dateString: string) => {
        const now = currentTime; // Use live updated currentTime
        const timeDiff = now - new Date(dateString);

        const seconds = Math.floor(timeDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
        if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;
        return `${Math.floor(days / 30)} month${Math.floor(days / 30) !== 1 ? 's' : ''} ago`;
    };

    return (
        <div className="card">
            <div className="card-body">
                <div className="card-title-container">
                    <h5 className="card-title">
                        Recent Activity <span>| Today</span>
                    </h5>
                    <a href="/Auditlogs">
                        <button>See all</button>
                    </a>
                </div>
                <hr />
                <div className="activity" style={{ height: "265px", overflowY: 'hidden', overflowX: 'hidden' }}>
                    {loading ? (
                        <div className={styles.loader}></div>
                    ) : notifications.length === 0 ? (
                        <p className="text-xs text-gray-500" style={{ fontSize: '12px' }}>No new notifications</p>
                    ) : (
                        <motion.div
                            key="notifications-list"
                            initial={{ y: 0 }}
                            animate={{ y: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {notifications.slice(0, 6).map((notification, index) => (
                                <motion.div
                                    key={notification.id || index}
                                    initial={{ opacity: 0, x: '100%' }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: index * 0.2,
                                        type: "spring",
                                        stiffness: 150,
                                        damping: 25,
                                    }}
                                    className={`activity-item d-flex items-center justify-between text-xs ${index === 0 ? styles.newNotification : ''}`}
                                    style={{ fontSize: '12px', padding: '8px', borderRadius: '8px', marginBottom: '6px', backgroundColor: '#fff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}
                                >
                                    <div 
                                        className="activity-label mr-2" 
                                        style={{ width: '90px', fontSize: '14px' }} 
                                        title={new Date(notification.created_at).toLocaleString()}
                                    >
                                        {formatDate(notification.created_at)}
                                    </div>

                                    <div className="activity-label ml-2" style={{ width: '20px' }}>
                                        <i
                                            className={`bx bxs-circle align-self-start ${notification.status === 'unread' ? '' : 'text-muted'}`}
                                            style={{ fontSize: '10px', color: notification.status === 'unread' ? '#6670ff' : 'inherit' }}
                                        ></i>
                                    </div>

                                    <div className="activity-content flex-1" style={{ fontSize: '14px' }}>
                                        {notification.message}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}