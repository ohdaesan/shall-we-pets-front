import { request } from "./API.js"; 

export const getPostDetailAPI = async (postNo) => {
    return await fetch(`http://localhost:8080/post/${postNo}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};