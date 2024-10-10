import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 리다이렉트 위해 useNavigate 임포트
import { getMemberhasBusinessRegisteredAPI } from '../../apis/MyInfoAPICalls';
import './Navbar_Mypage.css';
import logo_image_navbar from '../../images/shallwepets_logo.png';
import profileImage from '../../images/default_pfp.png';
import { getMemberInfoAPI } from '../../apis/MyInfoAPICalls';


const Navbar_MyPage = () => {
    const [hasBusinessRegistered, setHasBusinessRegistered] = useState(false);
    const [nickname, setNickname] = useState(''); // nickname 상태 추가
    const [grade, setGrade] = useState(''); // grade 상태 추가
    const navigate = useNavigate();
    const memberNo = localStorage.getItem('memberNo'); // memberNo를 로컬 스토리지에서 가져오기

    useEffect(() => {
        const fetchMemberInfo = async () => {
            if (!memberNo) {
                console.error('memberNo가 없습니다.'); // memberNo가 없을 경우 로그
                return;
            }

            try {
                // 사업 등록 여부 확인 API 호출
                const businessInfo = await getMemberhasBusinessRegisteredAPI(memberNo); // memberNo를 인자로 전달
                setHasBusinessRegistered(businessInfo.hasBusinessRegistered);

                // 회원 정보 API 호출
                const memberData = await getMemberInfoAPI(memberNo); // memberNo를 인자로 전달
                setNickname(memberData.nickname); // nickname 업데이트
                setGrade(memberData.grade); // grade 업데이트
            } catch (error) {
                console.error('회원 정보 가져오기 오류:', error); // 에러 로그
            }
        };

        fetchMemberInfo();
    }, [memberNo]); // memberNo가 변경될 때마다 실행

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
                <small className="profile-status">{grade}</small> {/* 여기서 grade 출력 */}
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