import { ENV_DATA } from '@/config/env';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

export const apiClient = axios.create({
    baseURL: ENV_DATA.API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Prevent multiple refresh requests at the same time
let isRefreshing = false;

let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else if (token) {
            promise.resolve(token);
        }
    });

    failedQueue = [];
};

// Add access token to every request
apiClient.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

// Handle expired access tokens
apiClient.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig | undefined;

        // Only handle 401 responses
        if (
            error.response?.status !== 401 ||
            !originalRequest ||
            originalRequest._retry ||
            originalRequest.url?.includes('/auth/refresh')
        ) {
            return Promise.reject(error);
        }

        // If another request is already refreshing,
        // wait for that refresh to finish
        if (isRefreshing) {
            return new Promise<string>((resolve, reject) => {
                failedQueue.push({
                    resolve,
                    reject,
                });
            })
                .then((newAccessToken) => {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    return apiClient(originalRequest);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            const refresh_token = localStorage.getItem('refreshToken');

            // No refresh token means the user is no longer authenticated
            if (!refresh_token) {
                throw new Error('No refresh token found');
            }

            // Use plain axios so the refresh request
            // doesn't go through the apiClient interceptors
            const response = await axios.post(
                `${ENV_DATA.API_URL}/auth/refresh`,
                {
                    refresh_token,
                },
                {
                    withCredentials: true,
                },
            );

            /*
             * Backend response:
             *
             * {
             *   accessToken: "..."
             * }
             */

            const newAccessToken = response.data.accessToken;

            if (!newAccessToken) {
                throw new Error('No access token returned from refresh endpoint');
            }

            // Save the new access token
            localStorage.setItem('accessToken', newAccessToken);

            // Resolve all requests waiting for the refresh
            processQueue(null, newAccessToken);

            // Retry the original request
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return apiClient(originalRequest);
        } catch (refreshError) {
            // Reject all queued requests
            processQueue(refreshError, null);

            // Refresh failed, user is no longer authenticated
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

            // Optional:
            // window.location.href = '/login';

            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    },
);
