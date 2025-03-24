'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';

const withAuth = (WrappedComponent: React.FC) => {
    return function AuthenticatedComponent(props: any) {
        const [isAuthorized, setIsAuthorized] = useState(false);
        const [authToken, setAuthToken] = useState<string | null>(null);
        const router = useRouter();
        const pathname = usePathname();

        useEffect(() => {
            // Ensure sessionStorage is accessed only in the browser
            const token = sessionStorage.getItem('authToken');
            setAuthToken(token);

            if (!token) {
                router.push('/Login'); // Redirect to login if no token
                return;
            }

            fetch(`http://127.0.0.1:8000/api/users/${token}/getUserPermissions`)
                .then(response => response.json())
                .then(data => {
                    if (data.permitted_route.includes(pathname)) {
                        setIsAuthorized(true);
                    } else {
                        toast.error("You're restricted from accessing this page.");
                        router.push('/Userface/Dashboard'); // Redirect unauthorized users
                    }
                })
                .catch(error => {
                    console.error('Error fetching permissions:', error);
                    router.push('/Userface/Dashboard'); // Redirect in case of an error
                });
        }, [pathname]);

        if (!isAuthorized) {
            return null; // Prevent rendering the page until permissions are checked
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
