import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar_Mypage.css';
import logo_image_navbar from '../../images/shallwepets_logo.png';
import default_profile_image from '../../images/default_pfp.png';
import { findGrade, findImageByMemberNo, findNickname } from '../../apis/ReviewAPICalls';
import { getMemberhasBusinessRegisteredAPI } from '../../apis/MyInfoAPICalls';

const Navbar_MyPage = () => {
    const [hasBusinessRegistered, setHasBusinessRegistered] = useState(false);
    const navigate = useNavigate();
    const [nickname, setNickname] = useState('');
    const [grade, setGrade] = useState('');
    const [profileImage, setProfileImage] = useState(default_profile_image); 

    useEffect(() => {
        const fetchMemberInfo = async () => {
            try {

                const businessInfo = await getMemberhasBusinessRegisteredAPI(memberNo); // memberNo를 인자로 전달
                setHasBusinessRegistered(businessInfo.hasBusinessRegistered);

                const memberNo = localStorage.getItem('memberNo');                 

                const [nicknameResponse, gradeResponse] = await Promise.all([
                    findNickname(memberNo),
                    findGrade(memberNo),
                ]);

                setNickname(nicknameResponse.results.nickname);
                setGrade(gradeResponse.results.grade);

                const imageResponse = await findImageByMemberNo(memberNo);
                const imageUrl = imageResponse.results.image?.imageUrl;
                if (imageUrl) {
                    setProfileImage(imageUrl); 
                } else {
                    setProfileImage(default_profile_image); 
                }
            } catch (error) {
                console.error('member info 못불러옴:', error);
            }
        };

        fetchMemberInfo();
    }, []);

    const handleBusinessListClick = (e) => {
        e.preventDefault();
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
                {/* <li className="nav-item"><a className="nav-link" href="/mypage/myreviewlist">내 리뷰 조회</a></li> */}
                <li className="nav-item"><a className="nav-link" href="/mypage/pointhistory">내 포인트 내역</a></li>
                <li className="nav-item"><a className="nav-link" href="/mypage/bookmark">내가 저장한 장소 조회</a></li>
                {/* <li className="nav-item"><a className="nav-link" href="#chat">내 채팅 내역</a></li> */}
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