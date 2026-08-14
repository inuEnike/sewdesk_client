import { LoginRequest } from './../types/auth.types';
import { apiClient } from '@/lib/api/axios';
import { RegisterFormData } from '../validations/auth.validation';

export const AuthService = {
    async register(data: RegisterFormData) {
        const response = await apiClient.post('/auth/signup', data);
        return response.data;
    },
    async login(data: LoginRequest) {
        const response = await apiClient.post('/auth/login', data);

        return response.data;
    },

    async me() {
        const response = await apiClient.get('/auth/me');
        return response;
    },
};
