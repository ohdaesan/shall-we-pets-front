import { request } from './API';


export const getBusinesses = async () => {
    try {
        const data = await request('GET', '/select_location');
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
}