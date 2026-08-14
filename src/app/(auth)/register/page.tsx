import { ENV_DATA } from '@/config/env';
import RegisterForm from '@/features/auth/components/register/RegisterForm';
import GuestRoute from '@/guards/GuestRoute';
import React from 'react';

const Register = () => {
    return (
        <GuestRoute>
            <section className="flex justify-center items-center h-screen">
                <RegisterForm />
            </section>
        </GuestRoute>
    );
};

export default Register;
