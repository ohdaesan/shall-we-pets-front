// components/NavBar.js
import React from 'react';
import './NavBar.css'; // NavBar에 대한 CSS 파일
import logo from '../../../images/charactor.avatar.png';
import logo2 from '../../../images/shallwepets_logo.png';


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

            <a href='/'>
            <img src={logo2} alt="logo2" className='navbar-logo2'></img>
            </a>
        </div>
    );
}

export default NavBar;
