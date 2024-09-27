import React from 'react';
import './Navbar_Mypage.css';
import logo_image_navbar from '../../images/shallwepets_logo.png';
import default_profile_image from '../../images/default_pfp.png';
const Navbar_MyPage = ({ hasbusinessregistered }) => {
    return (
        <div>
            <ul>
                <li><NavLink to='/my_info'>내 정보 조회</NavLink></li>
                <li><NavLink to='/my_review_list'>내 리뷰 조회</NavLink></li>
                <li><NavLink to='/point_history'>포인트 내역</NavLink></li>
                <li><NavLink to='/bookmark'>저장한 장소</NavLink></li>
                <li><NavLink to='/chat_history'>채팅 히스토리</NavLink></li>

                {/* TODO: 조건식 추가 - 업체가 등록되어있는 경우에만 보여주기 */}
                <li><NavLink to='/my_business_list'>내 업체 목록</NavLink></li>
            </ul>
        </div>
    );
};

export default Navbar_MyPage;