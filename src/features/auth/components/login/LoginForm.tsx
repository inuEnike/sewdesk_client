'use client';

import React, { FormEvent, useState } from 'react';
import FormInput from '../FormInput';
import Logo from '@/components/ui/Logo';
import Button from '@/components/layout/Button';
import { LoginFormData, RegisterFormData } from '../../validations/auth.validation';
import useSignup from '../../hooks/useSignup';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLogin } from '../../hooks/useLogin';
import { useAuthContext } from '../../context/AuthContext';

const LoginForm = () => {
    const login = useLogin();
    const { state, me, getBusinesses } = useAuthContext();

    const router = useRouter();
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await login(formData);

            me();

            const businessData = await getBusinesses();

            console.log(businessData.length);

            if (businessData.length === 0) {
                router.push('/dashboard/create-business');
            } else {
                router.push('/dashboard');
            }
        } catch (error) {
            // API error is already handled by useLogin
        }
    };
    return (
        <section className="md:bg-white w-full md:w-130 m-auto md:p-10 md:rounded-xl md:shadow-xs">
            <div className="flex items-center flex-col gap-2 text-center not-md:pt-7 justify-center">
                <Logo />

                <h3 className="text-[18px] md:text-[22px] font-bold">
                    Login to your tailor account
                </h3>
            </div>

            <div className="bg-white py-5 not-md:my-10 not-md:mx-5 not-md:rounded-xl not-md:shadow-xs">
                <form action="" className="not-md:px-5" onSubmit={handleSubmit}>
                    <FormInput
                        id="email"
                        label="Email Address"
                        type="email"
                        placeholder="johndoe@test.com"
                        required
                        autoComplete="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <FormInput
                        id="password"
                        label="Password"
                        isPassword
                        placeholder="********"
                        required
                        autoComplete="new-password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    {state.error && <p className="text-xs text-red-500 mt-2">{state.error}</p>}

                    <div className="my-5">
                        <Button
                            children={state.isLoading ? 'Logining in..' : 'Login'}
                            variant="full"
                            type="submit"
                            disabled={state.isLoading}
                        />
                    </div>

                    <div className="text-center">
                        <h3 className="md:text-sm not-md:text-xs font-light text-text-muted">
                            Don't have an account?
                            <span className="text-primary cursor-pointer">
                                <Link href={'/register'}> Register</Link>
                            </span>
                        </h3>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default LoginForm;
