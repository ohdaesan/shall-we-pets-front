import { request } from "./API.js"; 

// export const getPostDetailAPI = async (postNo) => {
//     return await fetch(`http://localhost:8080/post/${postNo}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });
// };

export const getPostDetailAPI = async (postNo) => {
    try {
        const data = await request('GET', `/post/${postNo}`, { postNo });
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
}