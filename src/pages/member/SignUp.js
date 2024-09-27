import React from 'react';
import './SignUp.css';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';
import 'bootstrap-datepicker';
import { Navigate } from 'react-router-dom';
import SignUpForm from '../../components/form/SignUpForm';

function SignUp() {
    const loginStatus = !!localStorage.getItem('loggedIn');

    /* 로그인 상태인데 호출할 경우 메인으로 */
    if(loginStatus) {
        return <Navigate to="/" replace={ true }/>
    }

    return (
        <>
            <SignUpForm/>
        </>
    );
}

export default SignUp;
