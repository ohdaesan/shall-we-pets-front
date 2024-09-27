import { requestImage } from "./API.js";

export const uploadS3Image = async (file) => {
    try {
        const data = await requestImage('POST', `/images/upload`, { file });
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
}