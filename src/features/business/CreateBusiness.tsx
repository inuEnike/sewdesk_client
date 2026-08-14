'use client';
import React, { FormEvent, useState } from 'react';
import FormInput from '../auth/components/FormInput';
import Button from '@/components/layout/Button';
import { BusinessApi } from './services/business.service';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const CreateBusiness = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        city: '',
        state: '',
        description: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();
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
            setIsLoading(true);
            await BusinessApi.createBusiness(formData);
            setIsLoading(false);

            alert('Business Added Successfully');
            router.push('/dashboard/businesses');
            setFormData({
                name: '',
                address: '',
                phone: '',
                city: '',
                state: '',
                description: '',
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                let errorMessage = error.response?.data;
                setError(errorMessage.message);
                setTimeout(() => {
                    setError(null);
                }, 10000);
            }
            setIsLoading(false);
        }
    };
    return (
        <form
            action=""
            onSubmit={handleSubmit}
            className="md:my-5 mt-3 bg-white w-full not-md:px-3 py-3 not-md:shadow-xs not-md:rounded-xl"
        >
            <div className="flex gap-2 not-md:block items-center">
                <FormInput
                    id="busiess name"
                    type="text"
                    required
                    label="Business Name"
                    placeholder="Stitch & Pattern Studio"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                />
                <FormInput
                    id="phone"
                    type="tel"
                    required
                    label="Phone Number"
                    placeholder="09012345678"
                    name="phone"
                    onChange={handleChange}
                    value={formData.phone}
                />
            </div>
            <FormInput
                id="address"
                // type="text"
                isTextArea
                required
                label="Address"
                name="address"
                onChange={handleChange}
                value={formData.address}
                placeholder="1042 Garment District, Suite B, New York"
            />
            <div className="flex gap-2 not-md:block items-center">
                <FormInput
                    id="city"
                    type="text"
                    required
                    label="City"
                    placeholder="Abuja"
                    name="city"
                    onChange={handleChange}
                    value={formData.city}
                />
                <FormInput
                    id="state"
                    type="text"
                    required
                    label="State"
                    placeholder="Edo state"
                    name="state"
                    onChange={handleChange}
                    value={formData.state}
                />
            </div>
            <FormInput
                id="description"
                // type="text"
                isTextArea
                required
                label="Business Description"
                name="description"
                onChange={handleChange}
                value={formData.description}
                placeholder="Bespoke tailoring specializing in modern menswear, wedding suits, and repairs."
            />
            {error && <span className="text-xs text-warning ">{error}</span>}
            <div className="">
                {isLoading ? (
                    <Button children="Adding Business....." variant="sm" type="submit" disabled />
                ) : (
                    <Button children="Create Business" variant="sm" type="submit" />
                )}
            </div>
        </form>
    );
};

export default CreateBusiness;
