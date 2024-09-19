import { request } from "./API.js"; 
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
