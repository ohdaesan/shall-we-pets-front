import { requestWithToken } from "./API.js"; 

export const getPostRegisterAPI = async ({ page = 0, size = 8, searchTerm = '', sort = 'createdDate', order = 'desc' }) => {
    try {
        // 쿼리 파라미터를 URL에 추가합니다.
        const params = new URLSearchParams({
            page: page,
            size: size,
            searchTerm: searchTerm, // 장소명 검색어
            sort: sort, // 정렬 기준
            order: order // 정렬 순서
        });

        const data = await requestWithToken('GET', `/post/getAllPost?${params.toString()}`);
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 합니다.
    }
};
