import React from 'react';
import { useNavigate } from 'react-router-dom'; // React Router의 useNavigate 훅 가져오기
import { useDispatch, useSelector } from 'react-redux';
import { resetLoginUser } from '../../modules/MemberModule.js';
import './Header.css';
import backIcon from '../../images/backicon.png';
import logo_image from '../../images/shallwepets_logo.png';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const isLoggedIn = useSelector(state => state.loginReducer.loggedIn);
    const loginStatus = !!localStorage.getItem('loggedIn');
    const nickname = localStorage.getItem('memberNickname');

    // 뒤로 가기 함수
    const goBack = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    const handleLogout = () => {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("memberNickname");
        localStorage.removeItem("token");
        dispatch(resetLoginUser());
        navigate('/');
    };

    return (
        <div className="header">
            <div className="headerLeft">
                <img className="back" src={backIcon} alt="Back Icon" onClick={goBack}></img>
            </div>

            <div>
                <a className="headerCenter" href="/">
                    <img className="logo" src={logo_image} alt="Shall We Pets Logo"></img>
                    <h1>쉘위펫즈</h1>
                </a>
            </div>
            
            <div className="headerRight">
                {loginStatus ? (
                    <span className='header-logout'>
                        <h3 className='header-logout'>{`안녕하세요, ${nickname}님! | `}
                            <a href='/' onClick={handleLogout} className='header-logout' style={{color:'rgba(91, 136, 90, 0.5)'}}>로그아웃</a>
                        </h3>
                    </span>
                ) : (
                    <a href="/member/login" id="login-header" className='header-login'><h3 className='header-login'>로그인/회원가입</h3></a>
                )}
            </div>
        </div>
    );
}

export default Header;
