'use client';
import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { AuthState } from '../validations/auth.validation';
import { authReducer, initialAuthState } from '../hooks/reducers/AuthReducer';
import { AuthService } from '../services/auth.services';
import axios from 'axios';
import { BusinessApi } from '@/features/business/services/business.service';
import { get } from 'http';

interface AuthContextType {
    state: AuthState;
    dispatch: React.Dispatch<any>;
    getMe: any;
    businesses: any[];
    getBusinesses: () => Promise<any[]>;
    me: () => void;
}
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProviders = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);
    const [businesses, setBusinesses] = useState([]);
    const [getMe, setGetMe] = useState({});
    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (token) {
            me();
        }
    }, []);
    const me = async () => {
        try {
            const response = await AuthService.me();
            setGetMe(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data);
            }
        }
    };

    const getBusinesses = async () => {
        try {
            const res = await BusinessApi.getBusinesses();

            const data = res.data?.data ?? [];

            setBusinesses(data);

            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data);
            }

            return [];
        }
    };

    return (
        <AuthContext.Provider value={{ state, dispatch, getMe, me, businesses, getBusinesses }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider');
    }

    return context;
};
