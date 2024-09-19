import React from 'react';
import { Navigate } from 'react-router-dom';
import './Login.css';
import LoginForm from '../../components/form/LoginForm';

function Login() {
    const loginStatus = !!localStorage.getItem('loggedIn');

    /* 로그인 상태인데 호출할 경우 메인으로 */
    if(loginStatus) {
        return <Navigate to="/" replace={ true }/>
    }

    return (
        <>
            <LoginForm/>
        </>
    );
}

export default Login;
