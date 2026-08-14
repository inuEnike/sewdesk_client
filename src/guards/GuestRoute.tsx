'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const GuestRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (token) {
            router.replace('/dashboard');
            return;
        }

        setLoading(false);
    }, [router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default GuestRoute;
