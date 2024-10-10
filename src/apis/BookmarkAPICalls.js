import { requestWithToken } from "./API.js"; 

export const addBookmarkAPI = async (bookmarkInfo) => {
    try {
        const data = await requestWithToken('POST', `/bookmark/bookmark`, bookmarkInfo);
        
        console.log(data);
        
        // 리스폰 확인 후 에러가 뜬다면
        if (data.status === 409) {
            alert('로그인 후 이용해주세요'); 
            return data;
        }
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
}

export const removeBookmarkAPI = async (memberNo, postNo) => {
    try {
        const data = await requestWithToken('DELETE', `/bookmark/delete?postNo=${postNo}&memberNo=${memberNo}`,{postNo}, {memberNo});
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
};

export const memberBookmarkAPI = async (memberNo) => {
    try {
        const data = await requestWithToken('GET', `/bookmark/${memberNo}`);
        return data;
    } catch (error) {
        console.error('북마크 조회 에러: ', error);
        throw error;
    }
};