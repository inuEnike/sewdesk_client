'use client';
import { useAuthContext } from '@/features/auth/context/AuthContext';
import { BusinessApi } from '@/features/business/services/business.service';
import React from 'react';

const page = () => {
    const { state, getMe } = useAuthContext();

    const data = getMe.data;
    return (
        <main className=" w-full">
            <div>HomePage</div>
        </main>
    );
};

export default page;
