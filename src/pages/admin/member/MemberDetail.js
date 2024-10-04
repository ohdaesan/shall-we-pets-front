import "./MemberDetail.css"
import Logo from "../../../images/shallwepets_logo.png"
import defaultProfilePic from '../../../images/default_pfp.png'
import React, { useState, useEffect } from 'react';
import businessLogo from "../../../images/shallwepets_business_pic.png"
import businessLogo1 from "../../../images/shallwepets_business_pic1.png"
import { useNavigate } from "react-router-dom";
import { getMemberList } from "../../../apis/MemberAPICalls"; // API 호출 임포트
import { getPostRegisterAPI } from "../../../apis/PostRegisterAPICalls"; // 게시물 API 호출 임포트

// 회원정보 페이지
function MemberDetail() {
    const [form, setForm] = useState({
        name: '',
        birthDate: '',
        id: '',
        grade: '',
        nickname: '',
        phone: '',
        email: '',
        zipcode: '',
        address: '',
        detailAddress: '',
    });

    const [profilePic, setProfilePic] = useState(defaultProfilePic);
    const [businessList, setBusinessList] = useState([]); // 업체 리스트 상태 추가

    // 컴포넌트 마운트 시 회원 데이터 가져오기
    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const response = await getMemberList(); // API 호출
                if (response.httpStatusCode === 200) {
                    const memberData = response.results.members.find(member => member.memberNo === 5); // 원하는 memberNo로 대체
                    if (memberData) {
                        setForm({
                            name: memberData.memberName,
                            birthDate: memberData.memberDob,
                            id: memberData.memberId,
                            grade: memberData.grade,
                            nickname: memberData.memberNickname,
                            phone: memberData.memberPhone,
                            email: memberData.memberEmail,
                            zipcode: memberData.memberZipcode || '', // null 처리
                            address: memberData.memberRoadAddress || '', // null 처리
                            detailAddress: memberData.memberDetailAddress || '', // null 처리
                        });
                        if (memberData.image) {
                            setProfilePic(memberData.image.imageUrl || defaultProfilePic); // 프로필 사진 설정
                        }
                    }
                } else {
                    console.error(response.message); // 에러 처리
                }
            } catch (error) {
                console.error("회원 데이터 가져오기 오류:", error);
            }
        };

        fetchMemberData();
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행

    // 업체 데이터 가져오기
    useEffect(() => {
        const fetchBusinessData = async () => {
            try {
                const data = await getPostRegisterAPI(); // 게시물 데이터 가져오기

                console.log("나오니?", data);
                
                if (data.httpStatusCode === 200) {
                    // 여기서 게시물 데이터를 통해 필요한 정보만 추출
                    const businesses = data.results.map(post => ({
                        fclty_nm: post.fclty_nm,
                        rdnmadr_nm: post.rdnmadr_nm,
                        status: post.status,
                    }));
                    setBusinessList(businesses); // 업체 리스트 상태 업데이트
                } else {
                    console.error(data.message); // 에러 처리
                }
            } catch (error) {
                console.error("업체 데이터 가져오기 오류:", error);
            }
        };

        fetchBusinessData();
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("제출된 폼:", form);
    };

    const navigate = useNavigate();

    const naviMemberInfo = () => {
        navigate("/member_detail")
    }

    const naviMemberPoint = () => {
        navigate("/point_list")
    }

    return (
        // 왼쪽 내비게이션 바
        <div className="member-info-navbar">
            <h1 className="member-info-page">회원정보 페이지</h1>

            <div className="member-info-navbar1">
                <br /><a onClick={naviMemberInfo} className="member-info-navbar1-info">회원 정보</a><br /><br />
                <a href="" className="member-info-navbar1-review">회원 리뷰</a><br /><br />
                <a onClick={naviMemberPoint} className="member-info-navbar1-point">포인트 내역</a><br />
                <img className="member-detail-logo" src={Logo} />
            </div>

            {/* 회원 정보 */}
            <div className="myinfo-body1">
                <h1 className="myinfo-h2">회원 정보</h1>
                <div className="myinfo-container1">
                    <div className="profile-section1">
                        <img src={profilePic} alt="Profile" className="profile-pic1" />
                    </div>
                    <hr />

                    <form onSubmit={handleSubmit}>
                        <div className="form-group1">
                            <label className="form-group1-name" htmlFor="name">이름</label>
                            <input className="form-group1-name-holder"
                                type="text"
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                disabled
                            />
                        </div>

                        <div className="form-group1">
                            <label className="form-group1-birthday" htmlFor="birthDate">생년월일</label>
                            <input className="form-group1-birthday-holder"
                                type="text"
                                id="birthDate"
                                name="birthDate"
                                value={form.birthDate}
                                onChange={handleChange}
                                disabled
                            />
                        </div>

                        <div className="form-group1">
                            <label className="form-group1-id" htmlFor="id">아이디</label>
                            <input className="form-group1-id-holder"
                                type="text"
                                id="id"
                                name="id"
                                maxLength="20"
                                value={form.id}
                                onChange={handleChange}
                                disabled
                            />
                        </div>

                        <div className="form-group1">
                            <label className="form-group1-grade" htmlFor="grade">회원등급</label>
                            <input className="form-group1-grade-holder"
                                type="text"
                                id="grade"
                                name="grade"
                                value={form.grade}
                                onChange={handleChange}
                                disabled
                            />
                        </div>

                        <div className="form-group1">
                            <label className="form-group1-nicname" htmlFor="nickname">닉네임</label>
                            <input className="form-group1-nicname-holder"
                                type="text"
                                id="nickname"
                                name="nickname"
                                value={form.nickname}
                                onChange={handleChange}
                                disabled
                            />
                        </div>

                        <div className="form-group1">
                            <label className="form-group1-phone" htmlFor="phone">휴대전화</label>
                            <input className="form-group1-phone-holder"
                                type="tel"
                                id="phone"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                disabled
                            />
                        </div>

                        <div className="form-group1">
                            <label className="form-group1-email" htmlFor="email">이메일</label>
                            <input className="form-group1-email-holder"
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                disabled
                            />
                        </div>

                        <div className="form-group2">
                            <label className="form-group1-address">주소</label>
                            <div className="address-group1">
                                <div className="zipcode-container1">
                                    <input
                                        type="text"
                                        id="zipcode"
                                        name="zipcode"
                                        value={form.zipcode}
                                        onChange={handleChange}
                                        disabled
                                    />
                                </div>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    disabled
                                />
                                <input
                                    type="text"
                                    id='detailed-address'
                                    name="detailAddress"
                                    value={form.detailAddress}
                                    onChange={handleChange}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="form-actions1">
                            <button type="button" className="btn-cancel1">회원정보 삭제</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* 회원이 등록한 업체 */}
            <h1 className="member-regist-business">회원이 등록한 업체</h1>
            <div className="business-list">
                {businessList.map((business, index) => (
                    <div key={index} className="business-item">
                        <h3>{business.fclty_nm}</h3>
                        <p>주소: {business.rdnmadr_nm}</p>
                        <p>상태: {business.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MemberDetail;
