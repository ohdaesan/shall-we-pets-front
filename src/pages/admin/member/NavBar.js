// components/NavBar.js
import React from 'react';
import './NavBar.css'; // NavBar에 대한 CSS 파일
import logo from 'C:/Users/80418/Downloads/admin.point/src/images/charactor.avatar.png'


function NavBar() {
    return (
        <div className="navbar">
                <a href='/'>
                <img src={logo} alt="logo" className='navbar-logo'></img> 
                </a>


            <ul>
                <li><a href="/my_info">회원 정보</a></li>
                <li><a href="/my_review_list">회원 리뷰</a></li>
                <li><a href="/point_Detail">포인트 내역</a></li>
            </ul>
        </div>
    );
}

export default NavBar;
