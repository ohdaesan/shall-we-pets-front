import { requestWithToken } from "./API.js"; 

// member의 포인트 리스트를 가져오는 API 호출 함수
export const getPointListAPI = async (memberNo) => {
    try {
        const response = await requestWithToken('GET', `/points/${memberNo}`); 
        return response;
    } catch (error) {
        console.error('포인트 내역 가져오기 실패:', error);
        throw error;
    }
};

// member의 포인트 총 합을 가져오는 API 호출 함수
export const getMemberPointsAPI = async (memberNo) => {
    try {
        const response = await requestWithToken('GET', `/points/total/${memberNo}`); 
        return response;
    } catch (error) {
        console.error('포인트 총합 가져오기 실패:', error);
        throw error;
    }
};

// 포인트를 추가할 수 있는 기능
export const getAddPoint = async (pointData) => {
    try {
        const response = await requestWithToken('POST', `/points/add`, pointData); 
        return response;
    } catch (error) {
        console.error('포인트 총합 가져오기 실패:', error);
        throw error;
    }
};