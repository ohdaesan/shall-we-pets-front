import { request } from "./API.js";

export const sendAuthEmail = async (email) => {
    try {
        const data = await request('POST', '/sendMail', { email });
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
};

export const checkAuthEmail = async (key, insertKey, email) => {
    try {
        console.log(key);
        console.log(insertKey);
        
        const data = await request('POST', '/checkMail', { key, insertKey, email });
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
};