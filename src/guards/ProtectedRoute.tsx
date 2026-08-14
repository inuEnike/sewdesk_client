'use client';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const pathName = usePathname();
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            // console.log('NO TOKEN');

            router.push(`/login?from=${encodeURI(pathName)}`);
        } else {
            setIsAuthorized(true);
            setLoading(false);
        }
    }, [router, pathName]);
    if (!isAuthorized || loading) {
        return <>Loading</>;
    }
    return <div>{children}</div>;
};

export default ProtectedRoute;
