import React from 'react';
import { useNavigate } from 'react-router-dom'; // React Router의 useNavigate 훅 가져오기
import './Header.css';
import backIcon from '../../images/backicon.png';
import logo_image from '../../images/shallwepets_logo.png';

function Header() {
    const navigate = useNavigate();

    // 뒤로 가기 함수
    const goBack = () => {
        navigate(-1); // 이전 페이지로 이동
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
                <h2>로그인/회원가입</h2>
                {/* <h2>안녕하세요, ~님</h2> */}
            </div>
        </div>
    );
}

export default Header;
