import Logo from '@/components/ui/Logo';
import LoginForm from '@/features/auth/components/login/LoginForm';
import GuestRoute from '@/guards/GuestRoute';
import React from 'react';

const Login = () => {
    return (
        <GuestRoute>
            <section className="flex justify-center items-center h-screen">
                <LoginForm />
            </section>
        </GuestRoute>
    );
};

export default Login;
