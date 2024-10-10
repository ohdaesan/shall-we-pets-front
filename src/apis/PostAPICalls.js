import { request, requestWithToken } from "./API.js"; 

export const getPostDetailAPI = async (postNo) => {
    try {
        const data = await request('GET', `/post/${postNo}`); // 데이터 인자 제거
        
        return data;
    } catch (error) {
        alert('존재하지 않은 장소입니다.');
        console.error('Fetch 에러: ', error);
        throw error;
    }
};

export const getPostsByCategoryAndCitiesAdminAPI = async (currentPage) => {
    try {
        const data = await requestWithToken('GET', `/post/getListAdmin?page=${currentPage}`);
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
};

export const getPostsByCategoryAndCityAPI = async (category, city, currentPage) => {
    try {
        const data = await request('GET', `/post/getList?category=${category}&city=${city}&page=${currentPage}`);
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
};

export const getPostsByCategoryAndCityAndSignguAPI = async (category, city, signgu, currentPage) => {
    try {
        const data = await request('GET', `/post/getFilteredList?category=${category}&city=${city}&signgu=${signgu}&page=${currentPage}`);
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
};

export const getPostsByCategoryAndCityAndKeywordAPI = async (category, city, keyword, currentPage) => {
    try {
        const data = await request('GET', `/post/getSearchedList?category=${category}&city=${city}&keyword=${keyword}&page=${currentPage}`);
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
};

export const getPostsByCategoryAndCityAndSignguAndKeywordAPI = async (category, city, signgu, keyword, currentPage) => {
    try {
        const data = await request('GET', `/post/getFilteredSearchedList?category=${category}&city=${city}&signgu=${signgu}&keyword=${keyword}&page=${currentPage}`);
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
};

export const getSignguByCategoryAndCityAPI = async (category, city) => {
    try {
        const data = await request('GET', `/post/getSigngu?cities=${city}&category=${category}`);
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
}

export const getPostByMemberNoAPI = async (memberNo) => {
    try {
        const data = await requestWithToken('GET', `/post/getPostByMemberNo/${memberNo}` ); // 데이터 인자 제거
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
};