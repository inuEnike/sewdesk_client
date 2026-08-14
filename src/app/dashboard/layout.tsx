import Sidebar from '@/components/layout/dashbord/Sidebar';
import ProtectedRoute from '@/guards/ProtectedRoute';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <ProtectedRoute>
                <section className="flex">
                    <Sidebar />
                    {children}
                </section>
            </ProtectedRoute>
        </>
    );
};

export default layout;
