import "./MemberDetail.css"
import Logo from "../../../images/shallwepets_logo.png"
import defaultProfilePic from '../../../images/default_pfp.png'
import React, { useState } from 'react';
import businessLogo from "../../../images/shallwepets_business_pic.png"
import businessLogo1 from "../../../images/shallwepets_business_pic1.png"
import { useNavigate } from "react-router-dom";

// 회원정보페이지
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

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", form);
    };

    const navigate = useNavigate();

    const naviMemberInfo = () => {
        navigate("/member_detail")
    }

    const naviMemberPoint = () => {
        navigate("/point_list")
    }


    return (
        // 왼쪽 navbar
        <div className="member-info-navbar">
            <h1 className="member-info-page">회원정보 페이지</h1>

            <div className="member-info-navbar1">
                <br /><a onClick={naviMemberInfo} className="member-info-navbar1-info">회원 정보</a><br /><br />
                <a href="" className="member-info-navbar1-review">회원 리뷰</a><br /><br />
                <a onClick={naviMemberPoint} className="member-info-navbar1-point">포인트 내역</a><br />
                <img className="member-detail-logo" src={Logo} />
            </div>


            {/* 회원정보 */}
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
                                placeholder="홍길동"
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
                                placeholder="2000-01-01"
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
                                placeholder="ShallWePets"
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
                                placeholder="아기강아지 리뷰어"
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
                                placeholder="Pet1004"
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
                                placeholder="010-5645-8976"
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
                                placeholder="shallwepets@gmail.com"
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
                                        placeholder="10223"
                                        disabled
                                    />

                                </div>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    placeholder="강원특별자치도 평창군 진부면 동산리"
                                    disabled
                                />
                                <input
                                    type="text"
                                    id='detailed-address'
                                    name="detailAddress"
                                    value={form.detailAddress}
                                    onChange={handleChange}
                                    placeholder="강원특별자치도 평창군 진부면 동산리"
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
            <div className="member-regist-business-navbar">
                        
                
                        <div>
                        
                            <a href="" className="member-regist-business-pic1"><img className="member-regist-business-pic" src={businessLogo}/></a>
                            <a href="" className="member-regist-business-name">쉘위펫즈</a><br/>
                            <a href="" className="member-regist-business-address">강원도 평창군 평창읍 백오로 123</a>
                            <p className="member-regist-business-ok">승인</p>
                            
                        </div>
                    
                        <div className="member-regist-business-line"></div>

                        <div>
                        
                            <a href="" className="member-regist-business-pic3"><img className="member-regist-business-pic2" src={businessLogo1}/></a>
                            <a href="" className="member-regist-business-name1">쉘위펫즈 서울지점</a><br/>
                            <a href="" className="member-regist-business-address1">서울시 서초구 사임당로 33</a>
                            <p className="member-regist-business-ok1">미승인</p>
                            
                        </div>

            </div>

        </div>





    )
}

export default MemberDetail;