import { request, requestImage, requestWithToken, requestImageWithToken } from "./API.js";

export const uploadS3Image = async (file) => {
    try {
        const data = await requestImage('POST', `/images/upload`, { file });
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
}

export const uploadReviewImages = async (reviewNo, file) => {
    try {
        const data = await requestImageWithToken('POST', `/images/uploadReviewImgs`, {reviewNo, file});
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
        const data = await requestWithToken('DELETE', `/images/deleteImageByNo`, { imageNo });
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
}

export const updateImageByImageNoAPI = async (imageNo, file) => {
    try {
        const data = await requestImageWithToken('PUT', `/images/updateImageByNo`, { imageNo, file });
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
}

export const getImagesByPostNoAPI = async (postNo, limit) => {
    try {
        const data = await request('POST', `/images/getImagesByPostNo`, {postNo, limit});
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
};

export const getPostImageByPostNoAPI = async (postNo, limit) => {
    try {
        const data = await request('POST', `/images/getPostImagesByPostNo`, {postNo, limit});
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
};

export const fetchImagesByReviewNo = async (reviewNo) => {
    try {
        const data = await request('POST', `/images/getImagesByReviewNo`, {reviewNo});
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
};

export const getImagesByPostNoAndPageNoAPI = async (postNo, pageNo) => {
    try {
        const data = await request('POST', `/images/getImagesByPostNoAndPageNo`, {postNo, pageNo});
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
};