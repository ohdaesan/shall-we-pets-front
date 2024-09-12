import React from 'react';
import './Header.css';
import backIcon from '../../images/backicon.png';
import logo_image from '../../images/shallwepets_logo.png';

function Header() {
    return (
        <div className="header">
            <div className="headerLeft">
                <img className="back" src={backIcon} alt="Back Icon"></img>
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
