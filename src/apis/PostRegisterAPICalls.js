import { request, requestWithToken } from "./API.js"; 

export const getPostRegisterAPI = async () => {
    try {
        const data = await requestWithToken('GET', `/post/getAllPost`);
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
};