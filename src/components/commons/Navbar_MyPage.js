import React from 'react';
import './Navbar_Mypage.css';  
import logo_image_navbar from '../../images/shallwepets_logo.png';
import default_profile_image from '../../images/default_pfp.png';
const Navbar_MyPage = ({ hasbusinessregistered }) => {
    return (
        <nav className="navbar-wrapper">
            <h1 className='navbar-head'>마이페이지</h1>

            <div className="profile-section">
                <img className="profile-image" src={default_profile_image} alt="프로필 이미지"/>
                <p className="profile-name">nickname111</p>
                <small className="profile-status">🎄 새싹 리뷰어</small>
            </div>

            <ul className="nav-items">
                <li className="nav-item"><a className="nav-link" href="/mypage/my_info">내 정보 조회</a></li>
                <li className="nav-item"><a className="nav-link" href="#reviews">내 리뷰 조회</a></li>
                <li className="nav-item"><a className="nav-link" href="/mypage/pointhistory">내 포인트 내역</a></li>
                <li className="nav-item"><a className="nav-link" href="#bookmarks">내가 저장한 장소 조회</a></li>
                <li className="nav-item"><a className="nav-link" href="#chat">내 채팅 내역</a></li>
                {hasbusinessregistered && (
                    <li className="nav-item"><a className="nav-link" href="#business">내 업체 조회</a></li>
                )}
            </ul>

            <div className="bottom-actions">
                <a className="action-link" href="#logout">로그아웃</a>
                <div className="divider"></div>
                <a className="action-link" href="/deleteaccount">회원탈퇴</a>
                <div className="divider"></div>
                <a className="action-link" href="#register">업체등록</a>
            </div>

            <div className="logo-section">
            <img className="logo_navbar" src={logo_image_navbar} alt="Shall We Pets Logo"></img>
            </div>
        </nav>
    );
};

export default Navbar_MyPage;