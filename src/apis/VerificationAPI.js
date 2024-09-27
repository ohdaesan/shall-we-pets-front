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
        const data = await request('POST', '/checkMail', { key, insertKey, email });
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
};

export const sendAuthPhone = async (phone) => {
    try {
        const data = await request('POST', '/sendSms', { phone });
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
};

export const checkAuthPhone = async (key, insertKey, phone) => {
    try {
        const data = await request('POST', '/checkSms', { key, insertKey, phone });
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
};