import { request, requestChangePwd } from "./API.js"; 
import { login } from "../modules/MemberModule";

/* 로그인 정보 전달 받는 함수 */
export function callLoginAPI(loginInfo) {
    /* redux-thunk(미들 웨어)를 이용한 비동기 처리 */
    return async (dispatch, getState) => {
        /* Api의 axios 처리 참조  */
        const result = await request("POST", "/member/login", {
            memberId: loginInfo.memberId, 
            memberPwd: loginInfo.memberPwd
        });

        // console.log("result", result);  // token, message, memberNickname
        
        dispatch(login(result));
    }
}

export const findIdByPhoneAPI = async (searchBy, name1, phone) => {
    try {
        const data = await request('POST', '/member/findId', { searchBy, name1, phone });
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
};

export const findIdByEmailAPI = async (searchBy, name2, email) => {
    try {
        const data = await request('POST', '/member/findId', { searchBy, name2, email });
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
};

export const findPwdByPhoneAPI = async (searchBy, id1, name1, phone) => {
    try {
        const data = await request('POST', '/member/findPwd', { searchBy, id1, name1, phone });
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
};

export const findPwdByEmailAPI = async (searchBy, id2, name2, email) => {
    try {
        const data = await request('POST', '/member/findPwd', { searchBy, id2, name2, email });
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
};

export const changePwdNotLoggedInAPI = async (memberId, modifiedPw, modifiedPwConfirm) => {
    try {
        const data = await requestChangePwd('POST', '/member/changePwdNotLoggedIn', { memberId, modifiedPw, modifiedPwConfirm });
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
};

export const checkMemberId = async (memberId) => {
    try {
        const data = await request('GET', `/member/checkId?memberId=${memberId}`, { memberId });
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
}

export const checkMemberNickname = async (memberNickname) => {
    try {
        const data = await request('GET', `/member/checkNickname?memberNickname=${memberNickname}`, { memberNickname });
        return data;
    } catch (error) {
        console.error('Fetch 에러: ', error);
        throw error;
    }
}