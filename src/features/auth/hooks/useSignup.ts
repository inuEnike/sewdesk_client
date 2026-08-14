import { useState } from 'react';
import { RegisterFormData } from '../validations/auth.validation';
import { AuthService } from '../services/auth.services';
import axios from 'axios';

const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signup = async (data: RegisterFormData) => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await AuthService.register(data);
            
            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(
                    error?.response?.data?.message || 'Something went wrong. Please try again.',
                );
            }

            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        signup,
        isLoading,
        error,
    };
};

export default useSignup;
