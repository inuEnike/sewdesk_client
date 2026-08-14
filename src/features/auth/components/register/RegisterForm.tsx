'use client';

import React, { FormEvent, useState } from 'react';
import FormInput from '../FormInput';
import Logo from '@/components/ui/Logo';
import Button from '@/components/layout/Button';
import { RegisterFormData } from '../../validations/auth.validation';
import useSignup from '../../hooks/useSignup';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const RegisterForm = () => {
    const { signup, isLoading, error } = useSignup();
    const router = useRouter();
    const [formData, setFormData] = useState<RegisterFormData>({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        repeat_password: '',
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
            await signup(formData);
            router.push('/login');
        } catch (error) {
            // API error is already handled by useSignup
        }
    };

    return (
        <section className="md:bg-white w-full md:w-130 m-auto md:p-10 md:rounded-xl md:shadow-xs">
            <div className="flex items-center flex-col gap-2 text-center not-md:pt-7 justify-center">
                <Logo />

                <h3 className="text-[18px] md:text-[22px] font-bold">Create your tailor account</h3>
            </div>

            <div className="bg-white py-5 not-md:my-10 not-md:mx-5 not-md:rounded-xl not-md:shadow-xs">
                <form action="" className="not-md:px-5" onSubmit={handleSubmit}>
                    <FormInput
                        id="first_name"
                        label="First Name"
                        type="text"
                        placeholder="John"
                        required
                        autoComplete="given-name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                    />

                    <FormInput
                        id="last_name"
                        label="Last Name"
                        type="text"
                        placeholder="Doe"
                        required
                        autoComplete="family-name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                    />

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

                    <FormInput
                        id="repeat_password"
                        label="Confirm Password"
                        isPassword
                        placeholder="********"
                        required
                        autoComplete="new-password"
                        name="repeat_password"
                        value={formData.repeat_password}
                        onChange={handleChange}
                    />

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="terms"
                            className="cursor-pointer accent-primary-light rounded-md border-primary border-2 h-4 w-4"
                            required
                        />

                        <label
                            htmlFor="terms"
                            className="not-md:text-xs text-sm text-text-muted font-light"
                        >
                            I agree to the{' '}
                            <span className="text-primary cursor-pointer">Terms of Service</span>{' '}
                            and <span className="text-primary cursor-pointer">Privacy Policy</span>
                        </label>
                    </div>

                    {error && <p className="text-xs text-red-500 mt-2">{error}</p>}

                    <div className="my-5">
                        <Button
                            children={isLoading ? 'Creating Account...' : 'Create Account'}
                            variant="full"
                            type="submit"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="text-center">
                        <h3 className="md:text-sm not-md:text-xs font-light text-text-muted">
                            Already have an account?{' '}
                            <span className="text-primary cursor-pointer">
                                <Link href={'/login'}>Login</Link>
                            </span>
                        </h3>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default RegisterForm;
