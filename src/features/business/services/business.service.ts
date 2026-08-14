import { apiClient } from '@/lib/api/axios';

interface IBusinessData {
    name: string;
    address: string;
    phone: string;
    city: string;
    state: string;
    description: string;
}

export const BusinessApi = {
    async getBusinesses() {
        const response = await apiClient.get('/businesses/me');
        return response;
    },
    async createBusiness(data: IBusinessData) {
        const response = await apiClient.post('/businesses/', data);
        return response
    },
};
