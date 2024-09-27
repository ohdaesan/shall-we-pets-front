import { request } from "./API.js"; 

export const getPostDetailAPI = async (postNo) => {
    try {
        const data = await request('GET', `/post/${postNo}`); // 데이터 인자 제거
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
};
