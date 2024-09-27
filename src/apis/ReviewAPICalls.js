import { request } from "./API.js"; 

export const addReviewAPI = async (reviewData) => {
    try {
        const data = await request('POST', '/review/createReview', reviewData);
        console.log(data);
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
};


// 포스트 번호로 리뷰 조회
export const getReviewsByPostNo = async (postNo) => {
    try {
        const data = await request('GET', `/review/post/${postNo}`);
        console.log('리뷰 목록: ', data);
        return data; // 리뷰 목록 및 총 리뷰 개수 포함
    } catch (error) {
        console.error('리뷰 목록 가져오기 에러: ', error);
        throw error;
    }
};

// 포스트 번호로 평균 평점 조회
export const getAverageRateByPostNo = async (postNo) => {
    try {
        const data = await request('GET', `/review/post/${postNo}/average-rate`);
        console.log('평균 평점: ', data);
        return data; // 평균 평점 포함
    } catch (error) {
        console.error('평균 평점 가져오기 에러: ', error);
        throw error;
    }
};


// 리뷰 가져오기
export const getReadReviewLists = async (postNo, sortOrder) => {
    try {
        const data = await request('GET', `/review/post/${postNo}?sortOrder=${sortOrder}`, { postNo });
        console.log('리뷰 리스트: ', data);
        return data; // 리뷰 리스트
    } catch (error) {
        console.error('리뷰를 불러오지 못했습니다. ', error);
        throw error;
    }
};


// member의 리뷰 개수를 가져오는 API 호출 함수
export const getMemberReviewCountAPI = async (memberNo) => {
    try {
        const response = await request('GET', `/review/member/${memberNo}`); // GET 메소드 명시
        return response;
    } catch (error) {
        console.error('리뷰 개수 가져오기 실패:', error);
        throw error;
    }
};

// memberNo로 내가 쓴 리뷰들 불러오기
export const getReviewsByMemberNo = async (memberNo) => {
    try {
        const response = await request('GET', `/review/member/${memberNo}`, {memberNo}); // 리뷰 데이터 전달
        return response;
    } catch (error) {
        console.error('member가 쓴 리뷰 가져오기 실패!:', error);
        throw error;
    }
};


// memberNo가 local storage와 일치할 경우 해당 리뷰를 reviewNo로 수정할 수 있는 함수
export const putMemberReviewUpdate = async (reviewNo, reviewData) => {
    try {
        const response = await request('PUT', `/review/update/${reviewNo}`, reviewData); // 리뷰 데이터 전달
        return response;
    } catch (error) {
        console.error('리뷰 수정 실패:', error);
        throw error;
    }
};


// memberNo가 storage와 일치할 경우 해당 리뷰를 reviewNo로 삭제할 수 있는 함수
export const deleteMemberReview = async (reviewNo) => {
    try {
        const response = await request('DELETE', `/review/delete/${reviewNo}`); // POST 메소드 명시
        return response;
    } catch (error) {
        console.error('리뷰 삭제 실패:', error);
        throw error;
    }
};