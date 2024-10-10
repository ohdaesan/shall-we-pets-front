import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 리다이렉트 위해 useNavigate 임포트
import { getMemberhasBusinessRegisteredAPI } from '../../apis/MyInfoAPICalls';
import './Navbar_Mypage.css';
import logo_image_navbar from '../../images/shallwepets_logo.png';
import default_profile_image from '../../images/default_pfp.png';


const Navbar_MyPage = () => {
    const [hasBusinessRegistered, setHasBusinessRegistered] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMemberInfo = async () => {
            try {
                const memberInfo = await getMemberhasBusinessRegisteredAPI();
                console.log('API 응답:', memberInfo); // API 응답 로깅
                setHasBusinessRegistered(memberInfo.hasBusinessRegistered);
            } catch (error) {
                console.error('회원 정보 가져오기 오류:', error);
            }
        };

        fetchMemberInfo();
    }, []);

    useEffect(() => {
        console.log('hasBusinessRegistered 상태:', hasBusinessRegistered); // 상태 변경 시 로깅
    }, [hasBusinessRegistered]);

    const handleBusinessListClick = (e) => {
        e.preventDefault();
        console.log('클릭 시 hasBusinessRegistered:', hasBusinessRegistered); // 클릭 시 상태 로깅
        if (hasBusinessRegistered) {
            navigate('/mypage/mybusinesslist');
        } else {
            alert('등록된 업체가 없습니다.');
            navigate('/post/registerPost');
        }
    };


    return (
        <nav className="navbar-wrapper">
            <h1 className='navbar-head'>마이페이지</h1>

            <div className="profile-section-navbar">
                <img className="profile-image" src={profileImage} alt="프로필 이미지" />
                <p className="profile-name">{nickname}</p>
                <small className="profile-status">{grade} 리뷰어</small>
            </div>

            <ul className="nav-items">
                <li className="nav-item"><a className="nav-link" href="/mypage/my_info">내 정보 조회</a></li>
                <li className="nav-item"><a className="nav-link" href="/mypage/myreviewlist">내 리뷰 조회</a></li>
                <li className="nav-item"><a className="nav-link" href="/mypage/pointhistory">내 포인트 내역</a></li>
                <li className="nav-item"><a className="nav-link" href="/mypage/bookmark">내가 저장한 장소 조회</a></li>
                <li className="nav-item"><a className="nav-link" href="#chat">내 채팅 내역</a></li>
                <li className="nav-item">
                    <a className="nav-link" href="/mypage/mybusinesslist" onClick={handleBusinessListClick}>내 업체 조회</a>
                </li>
            </ul>

            <div className="bottom-actions">
                <a className="action-link" href="http://localhost:3030">로그아웃</a>
                <div className="divider"></div>
                <a className="action-link" href="/deleteaccount">회원탈퇴</a>
                <div className="divider"></div>
                <a className="action-link" href="/post/registerPost">업체등록</a>
            </div>

            <div className="logo-section">
                <img className="logo_navbar" src={logo_image_navbar} alt="Shall We Pets Logo" />
            </div>
        </nav>
    );
};

export default Navbar_MyPage;
