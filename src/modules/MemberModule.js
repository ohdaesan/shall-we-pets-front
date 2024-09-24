import { createActions, handleActions } from "redux-actions";

/* 초기 state값 */
const initialState = {
    token: null,
    loggedIn: false,
    memberNickname: null,
    error: null
};

/* 액션 타입 설정 */
export const LOGIN = 'member/LOGIN';
export const RESET_LOGIN_USER = 'member/RESET_LOGIN_USER';

/* 유저 관련 액션 함수 */
export const { member : { login, resetLoginUser }} = createActions({
    [LOGIN]: (res) => ({ res }),
    [RESET_LOGIN_USER]: (res = initialState) => ({ res }),
});

/* 리듀서 함수 */
const loginReducer = handleActions(
    {   
        [LOGIN]: (state, { payload : {res} }) => {
            if(res.memberNickname) {
                /* localStorage에 로그인 상태 저장 */
                localStorage.setItem("loggedIn", true);
                localStorage.setItem("memberNickname", res.memberNickname);
                localStorage.setItem("token", res.token);
            } else {
                localStorage.removeItem("loggedIn");
                localStorage.removeItem("memberId");
                localStorage.removeItem("token");
                
                res = {
                    ...state,
                    loggedIn: false,
                    error: res.failType
                }
            }

            return res;
        },
        [RESET_LOGIN_USER]: (state, { payload : { res } }) => {
            return res;
        }
    },
    initialState
);

export default loginReducer;
