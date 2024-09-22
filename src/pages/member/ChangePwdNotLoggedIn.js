import React from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import './ChangePwdNotLoggedIn.css';
import ChangePwdNotLoggedInForm from '../../components/form/ChangePwdNotLoggedInForm';

function ChangePwdNotLoggedIn() {
    const loginStatus = !!localStorage.getItem('loggedIn');
    const memberId = !!localStorage.getItem('memberId');

    /* 로그인 상태인데 호출할 경우 메인으로 */
    if(loginStatus) {
        return <Navigate to="/" replace={ true }/>
    } else if(!memberId) {   // 어떤 아이디에 해당하는 비밀번호인지를 알 수 없는 경우
        return <Navigate to="/member/findpwd" replace={ true }/>
    }

    return (
        <>
            <ChangePwdNotLoggedInForm/>
        </>
    );
}

export default ChangePwdNotLoggedIn;