import { z } from 'zod';

export const registerSchema = z
    .object({
        first_name: z.string().min(2, 'First name must be at least 2 characters'),

        last_name: z.string().min(2, 'Last name must be at least 2 characters'),

        email: z.string().email('Enter a valid email address'),

        password: z.string().min(8, 'Password must be at least 8 characters'),

        repeat_password: z.string().min(8, 'Please confirm your password'),
    })
    .refine((data) => data.password === data.repeat_password, {
        message: 'Passwords do not match',
        path: ['repeat_password'],
    });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    email: z.string().email('Enter a valid email address'),

    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export interface LoginResponse {
    success: boolean;
    statusCode: number;
    message: string;
    timeStamp: string;
    data: {
        email: string;
        token: {
            accessToken: string;
            refreshToken: string;
        };
    };
}

export interface AuthState {
    email: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}
