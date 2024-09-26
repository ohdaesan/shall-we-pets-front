import { request } from './API';

const BASE_URL = '/map'; // API의 기본 URL

export const getBusinesses = async () => {
    return await request('GET', BASE_URL);
};
