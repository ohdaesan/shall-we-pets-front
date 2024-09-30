import { request, requestImage } from "./API.js";

export const uploadS3Image = async (file) => {
    try {
        const data = await requestImage('POST', `/images/upload`, { file });
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
}

export const findImageByImageNoAPI = async (imageNo) => {
    try {
        const data = await request('POST', `/images/findImageByNo`, { imageNo });
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
}

export const deleteImageByImageNoAPI = async (imageNo) => {
    try {
        const data = await request('DELETE', `/images/deleteImageByNo`, { imageNo });
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
}