import { request } from "./API.js"; 

export const addBookmarkAPI = async (bookmarkInfo) => {
    try {
        // post 보내고
        const response = await request('POST', `/bookmark/bookmark`, bookmarkInfo);
        const data = await response.json();  // json으로 리스폰 받음
        
        // 리스폰 확인 후 에러가 뜬다면
        if (data.status === 409) {
            alert('로그인 후 이용해주세요'); // 팝업이 보임
        } else {
            // 올바른 경로라면 데이터를 반환
            return data;
        }
    } catch (error) {
        // 그 외 에러
        console.error('Fetch 에러: ', error);
        throw error;
    }
}


export const removeBookmarkAPI = async (memberNo, postNo) => {
    try {
        const data = await request('DELETE', `/bookmark/delete?postNo=${postNo}&memberNo=${memberNo}`,{postNo}, {memberNo});
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
};