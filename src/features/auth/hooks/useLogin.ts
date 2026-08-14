import axios, { AxiosError } from 'axios';
import { useAuthContext } from '../context/AuthContext';
import { AuthService } from '../services/auth.services';
import { LoginFormData } from '../validations/auth.validation';

export const useLogin = () => {
    const { dispatch } = useAuthContext();

    const login = async (data: LoginFormData) => {
        try {
            dispatch({ type: 'LOGIN_START' });

            const response = await AuthService.login(data);

            // Extract tokens safely
            const { accessToken, refreshToken } = response.data.token || {};

            if (!accessToken || !refreshToken) {
                throw new Error('Tokens missing from server response payload.');
            }

            // 1. Persist to LocalStorage (Exact key matching)
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            // 2. Update Auth Context State
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    email: response.data.email,
                    accessToken,
                    refreshToken,
                },
            });

            return response;
        } catch (error) {
            let errorMessage = 'Something went wrong';

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            dispatch({
                type: 'LOGIN_FAILURE',
                payload: errorMessage,
            });
            setTimeout(() => {
                dispatch({
                    type: 'LOGIN_FAILURE',
                    payload: '',
                });
            }, 30000);
            throw error;
        }
    };

    return login;
};
